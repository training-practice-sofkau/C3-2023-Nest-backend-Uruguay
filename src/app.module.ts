import { Module } from '@nestjs/common';

// Modules
import { SecurityModule, AccountModule, CustomerModule, DepositModule, TransferModule } from './application/modules';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [SecurityModule, AccountModule, CustomerModule, DepositModule, TransferModule, JwtModule.register({ secret: 'Sofka' })],
    controllers: [],
    providers: [],
})
export class AppModule {}
