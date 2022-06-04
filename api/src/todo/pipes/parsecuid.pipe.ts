import { Injectable, PipeTransform } from '@nestjs/common';
import { isCuid } from 'cuid';

@Injectable()
export class ParseCuidPipe implements PipeTransform {
  transform(value: any) {
    console.log('Going through ParseCuidPipe');

    if (!isCuid(value)) {
      throw new Error('Invalid id');
    }
    return value;
  }
}
