import { Injectable } from '@angular/core';
import {from, Observable, of} from "rxjs";
import {Labels} from "./labels";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  labels = Labels;
  constructor() { }

  translate(key: string): string {
    return (this.labels?.[key] ? this.labels[key] : key);
  }
}
