import { Module } from '@nestjs/common';
import { BaseRepository } from '.';

@Module({
    imports: [],
    controllers: [],
    providers: [BaseRepository]
})
export class BaseModule {}
