import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


 
@Pipe({
  name: 'relativetime',
})
export class RelativetimePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return  moment(value).toNow();
  }
}
