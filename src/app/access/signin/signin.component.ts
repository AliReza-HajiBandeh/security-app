import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {SecurityService} from '../../common/security/security.service';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {UserIdentityStore} from '@rbcorp/ui-infra';
import {SubsystemDto} from "../../common/main.dto";
import {AppUserIdentity} from "../../common/security";
import {Token} from "../../common/security/types";

@Component({
  selector: 'app-access-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.less'],
})
export class SigninComponent implements OnInit {
  @ViewChild('frm') form: any;
  @ViewChild('pass', {read: ElementRef}) passwordElement?: ElementRef;
  activeSubsystemId: number | null = null;
  userSubsystems: any = null;
  authenticated = false;
  username = '';
  password = '';
  captcha = {value: '', uniqueId: ''};
  captchaImg: any;
  loading = false;
  verificationCode = '';

  constructor(
    private router: Router,
    private service: SecurityService,
    private identityStore: UserIdentityStore<AppUserIdentity>,
    private notification: NzNotificationService,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.reloadCaptcha();
  }

  reloadCaptcha() {
    this.captcha = {value: '', uniqueId: ''};
    this.service.getCaptcha().subscribe((res) => {
      const text = atob(res?.image);
      this.captcha.uniqueId = res?.uniqueId;
      this.captchaImg = this.sanitizer.bypassSecurityTrustUrl(
        `data:image/jpg;base64,${text}`
      );
    });
  }

  onFormSubmit(): void {
    this.loading = true;
    this.service.signin(this.username, this.password, this.captcha).subscribe({
      next: (result: Token) => {
        this.service.getUserIdentity().subscribe((res: AppUserIdentity) => {
          if (this.service.hasSecurityAccess(res.claims)) {
            if (res.forcePasswordChange) {
              this.service.sendVerificationSMS().subscribe(verificationCode => {
                this.router.navigateByUrl('access/force-change-password', {state: {currentPassword: this.password}}).then(r => {
                });
              })
            } else {
              if (res.vip) {
                this.activeSubsystemId = -1;
                this.setActiveSubsystem();
              } else {
                if (res?.subsystems) {
                  this.userSubsystems = res.subsystems?.filter((item: any) => item?.title !== 'امنیت');
                  // this.userSubsystems = res.subsystems;
                  if (this.userSubsystems?.length === 1) {
                    this.activeSubsystemId = this.userSubsystems[0]?.id;
                    this.setActiveSubsystem();
                  } else {
                    this.authenticated = true;
                  }
                }
              }
            }
          } else {
            this.notification.warning('توجه!', 'حساب کابری شما به زیرسامانه مدیریت کاربران دسترسی ندارد');
            this.service.clearUser();
          }
          this.loading = false;
        })
      },
      error: (err) => {
        this.authenticated = false;
        const un = this.username;
        this.form.reset();
        this.passwordElement?.nativeElement?.focus();

        setTimeout(() => {
          this.username = un;
        }, 0);
        this.reloadCaptcha();
        this.loading = false;
      }
    });
  }

  setActiveSubsystem() {
    if (this.activeSubsystemId) {
      // @ts-ignore
      this.service.setActiveSubsystem(this.activeSubsystemId).subscribe(res => {
        this.service.getUserIdentity().subscribe((result: AppUserIdentity) => {
          this.identityStore.set(result);
          if (result?.claims.includes('user_search')) {
            this.router.navigateByUrl(
              'workspace/mng/user').then(r => {
            });
          } else if (result?.claims.includes('group_search')) {
            this.router.navigateByUrl(
              'workspace/mng/group').then(r => {
            });
          } else if (result?.claims.includes('role_search')) {
            this.router.navigateByUrl(
              'workspace/mng/role').then(r => {
            });
          } else if (result?.claims.includes('permission_search')) {
            this.router.navigateByUrl(
              'workspace/mng/permission').then(r => {
            });
          } else if (result?.claims.includes('action_search')) {
            this.router.navigateByUrl(
              'workspace/mng/action').then(r => {
            });
          } else if (result?.claims.includes('subsystem_search')) {
            this.router.navigateByUrl(
              'workspace/mng/subsystem').then(r => {
            });
          } else {
            this.router.navigateByUrl(
              'workspace').then(r => {
            });
          }
        })
      })
    }
  }
}
