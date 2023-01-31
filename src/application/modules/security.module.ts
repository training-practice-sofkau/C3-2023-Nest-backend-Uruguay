import { Module } from '@nestjs/common';
import { SecurityController } from '../../presentation/controllers';
import { AccountService, CustomerService, SecurityService } from '../../business/services';
import { JwtService } from '@nestjs/jwt';
import { AccountRepository, AccountTypeRepository, CustomerRepository, DocumentTypeRepository } from '../../data/persistence';

@Module({
    imports: [],
    controllers: [SecurityController],
    providers: [SecurityService, CustomerService, AccountService, JwtService, CustomerRepository, DocumentTypeRepository, AccountRepository, AccountTypeRepository],
})
export class SecurityModule {}