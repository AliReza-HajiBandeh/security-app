import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-jalaali';

@Pipe({
  name: 'toJalaali'
})
export class JalaaliPipe implements PipeTransform {
  transform(value: string): string {
    return moment(value).format('jYYYY/jMM/jDD');
  }
}
