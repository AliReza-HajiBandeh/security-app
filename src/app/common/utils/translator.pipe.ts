import { Pipe, PipeTransform } from '@angular/core';
import {TranslationService} from "../translation.service";

@Pipe({
  name: 'translator'
})
export class TranslatorPipe implements PipeTransform {

  constructor(private service: TranslationService) {
  }
  transform(value: any): string {
    return this.service.translate(value);
  }
}
