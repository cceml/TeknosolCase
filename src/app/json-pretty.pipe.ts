import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonPretty'
})
export class JsonPrettyPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) {
      return '';
    }
    return JSON.stringify(value, null, 2);
  }
}
