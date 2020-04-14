import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {

  transform(data: Object) {
    const keys = Object.keys(data);
    // first half is numeric, the 2nd half is strings
    return keys.slice(keys.length / 2);
  }

}
