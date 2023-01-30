import { Module } from '@nestjs/common';
import { SecurityController } from '../controllers';
import { AccountService, CustomerService, SecurityService } from '../services';
import { JwtService } from '@nestjs/jwt';
import { AccountRepository, AccountTypeRepository, CustomerRepository, DocumentTypeRepository } from '../persistence';

@Module({
    imports: [],
    controllers: [SecurityController],
    providers: [SecurityService, CustomerService, AccountService, JwtService, CustomerRepository, DocumentTypeRepository, AccountRepository, AccountTypeRepository],
})
export class SecurityModule {}