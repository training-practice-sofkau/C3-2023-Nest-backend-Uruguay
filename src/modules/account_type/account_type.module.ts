import { Module } from '@nestjs/common';
import { AccountTypeController } from '../../controllers/account_type/account_type.controller';
import { AccountTypeService } from '../../services/account_type/account_type.service';

@Module({
    imports: [],
    controllers: [AccountTypeController],
    providers: [AccountTypeService],
})
export class AccountTypeModule {}
