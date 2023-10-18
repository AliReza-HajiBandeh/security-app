import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PagingRequest} from "./pagination";

@Injectable({providedIn: "root"})
export class DataService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'api/security'
  }

  create(controller: string, dto: any): Observable<any> {
    return this.http.post<any>(`/${this.baseUrl}/${controller}/create`, dto)
  }

  update(controller: string, dto: any): Observable<any> {
    return this.http.put<any>(`/${this.baseUrl}/${controller}/update`, dto)
  }

  delete(controller: string, id: number): Observable<any> {
    return this.http.delete<any>(`/${this.baseUrl}/${controller}/delete/${id}`)
  }

  find(controller: string, id: number): Observable<any> {
    return this.http.get<any>(`/${this.baseUrl}/${controller}/find-by-id/${id}`)
  }

  get(controller: string): Observable<any> {
    return this.http.get<any>(`/${this.baseUrl}/${controller}/find-all`)
  }

  paginate(controller: string, req: PagingRequest): Observable<any> {
    return this.http.post<any>(`/${this.baseUrl}/${controller}/find-paging`, req)
  }
}
