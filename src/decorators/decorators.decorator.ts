import { SetMetadata } from '@nestjs/common';

export const Decorators = (...args: string[]) => SetMetadata('decorators', args);
