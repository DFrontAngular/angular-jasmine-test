import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mayus'
})
export class MayusPipe implements PipeTransform {

  transform(value: string): string {
    return value.toUpperCase();
  }

}
