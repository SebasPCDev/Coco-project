/* eslint-disable @typescript-eslint/no-unused-vars */
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class QueryParamsValidator implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value === 'coworking' || value === 'company') {
      return value;
    }
    if (value === 'pending' || value === 'close') {
      return value;
    }
    return null;
  }
}
