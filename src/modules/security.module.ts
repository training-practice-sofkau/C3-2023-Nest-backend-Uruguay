import { Module } from '@nestjs/common';
import { SecurityController } from '../controllers';
import { AccountService, SecurityService } from '../services';
import { JwtService } from '@nestjs/jwt';
import { AccountRepository, AccountTypeRepository, CustomerRepository } from '../persistence';

@Module({
    imports: [],
    controllers: [SecurityController],
    providers: [SecurityService, AccountService, CustomerRepository, AccountRepository, AccountTypeRepository, JwtService],
})
export class SecurityModule {}