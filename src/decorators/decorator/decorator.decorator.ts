import { SetMetadata } from '@nestjs/common';

export const Decorator = (...args: string[]) => SetMetadata('decorator', args);
