import { Module } from '@nestjs/common';
import { SegurityService } from './segurity.service';
import { SegurityController } from './segurity.controller';

@Module({
    imports: [],
  controllers: [SegurityController],
  providers: [SegurityService]
})
export class SegurityModule {}
