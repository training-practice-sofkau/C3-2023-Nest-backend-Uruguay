import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class ExceptionFiltersFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    throw new Error('Method not implemented.')
  }
}
