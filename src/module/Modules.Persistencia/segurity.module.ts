import { Module } from '@nestjs/common';
import { SegurityService } from './segurity.service';
import { SegurityController } from './segurity.controller';
import { CustomerRepository } from '../customer';

@Module({
  imports: [],
  controllers: [SegurityController],
  providers: [SegurityService,CustomerRepository]
})
export class SegurityModule {}
