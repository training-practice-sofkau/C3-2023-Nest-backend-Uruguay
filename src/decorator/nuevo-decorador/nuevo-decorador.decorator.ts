import { SetMetadata } from '@nestjs/common';

export const NuevoDecorador = (...args: string[]) => SetMetadata('nuevo-decorador', args);
