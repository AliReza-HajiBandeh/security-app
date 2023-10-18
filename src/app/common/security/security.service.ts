import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserIdentityStore} from '@rbcorp/ui-infra';
import {from, Observable, of} from 'rxjs';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ForgetPasswordDto, PasswordDto, SignupDto, Token} from './types';
import {AppUserIdentity} from './user-identity';
import {Dto} from "../types";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  hasVerifyResetPassCode = false;
  baseUrl = 'api/security';

  constructor(private http: HttpClient, private userIdentity: UserIdentityStore<AppUserIdentity>,) {
  }

  getCaptcha(): Observable<{ image: string, uniqueId: string }> {
    return this.http.post<{ image: string, uniqueId: string }>(`${this.baseUrl}/resource/get-captcha`, {operation: 'captcha'});
  }

  signup(dto: SignupDto): Observable<any> {
    if (dto.isReal) {
      dto.name = dto.nationalId = dto.registerNumber = undefined;
    } else {
      dto.firstName = dto.lastName = dto.nationalCode = undefined;
    }

    return this.http.post('/api/complaints/signup', dto);
  }

  signin(username: string, password: any, captcha: { value: string, uniqueId: string }): Observable<Token> {
    this.clearUser();
    return this.http.post<any>(`${this.baseUrl}/login/web`, {
        client_id: 'SECURITY',
        client_secret: 'security@35',
        username,
        password,
        captcha: captcha?.value,
        grant_type: 'password'
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'captcha-identifier': `${captcha?.uniqueId}`,
        })
      }).pipe(tap(result => this.setToken(result)))
  }

  sendSms(userName: string, captcha: { value: string, uniqueId: string }) {
    return this.http.post(`${this.baseUrl}/resource/sms-send`, {userName, answer: captcha?.value, key: captcha?.uniqueId})
  }


  resetPassword(data: { mobileNumber: string, referralCode: number }) {
    return this.http.post(`${this.baseUrl}/resource/reset-password`, data)
  }

  getUserIdentity(): Observable<AppUserIdentity> {
    return this.http.post<any>(`${this.baseUrl}/user/get-user-info`, {operation: 'user-info'})
      .pipe(
        map(res => new AppUserIdentity(res.id, res.userName, res.nationalCode, res.nationalCode, res.firstName, res.lastName, res.title,
          res.forcePasswordChange, res.real, res.activeSubsystemId, res.activeSubsystemName, res.vip, res.subsystems, res.permissions)),
      )
  }

  signout(): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/user/logout`, {operation: 'logout'}).pipe(
      tap(res => {
        this.clearUser();
      })
    )
  }

  setToken(token: Token) {
    sessionStorage.setItem('auth', '1')
  }

  clearUser() {
    sessionStorage.clear();
    this.userIdentity.set(undefined);
  }

  isUserAuthenticated() {
    const auth = sessionStorage.getItem('auth')
    return !!auth;
  }

  sendVerificationSMS(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/send-verification-sms`);
  }

  changePassword(model: { currentPassword: string, newPassword: string }) {
    return this.http.post(`${this.baseUrl}/user/change-user-password`, model)
  }

  forceChangePassword(req: PasswordDto) {
    return this.http.post(`${this.baseUrl}/user/change-password`, req)
  }

  setActiveSubsystem(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/set-active-subsystem/${id}`)
  }

  forgetPassword(req: ForgetPasswordDto, captcha: { value: string, uniqueId: string }) {
    return this.http.post(`${this.baseUrl}/resource/forget-password`, Object.assign(req, {answer: captcha?.value, key: captcha?.uniqueId}))
  }

  hasSecurityAccess(permissions: any = []): boolean {
    const keys: string[] = [];
    let result = false;
    Object.values(Dto).forEach(value => {
      keys.push(`${value}_create`);
      keys.push(`${value}_update`);
      keys.push(`${value}_search`);
      keys.push(`${value}_delete`);
    });
    for (let i = 0; i < permissions?.length; ++i) {
      if (keys.includes(permissions[i])) {
        result = true;
        break;
      }
    }
    return result;
  }
}
