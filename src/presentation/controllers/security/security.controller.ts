// Libraries
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

//DTOs
import { SignUpDto, SignInDto, AccountTypeDto, DocumentTypeDto } from 'src/business/dtos';
import { SecurityService } from 'src/business/services';
import { DocumentTypeEntity, AccountTypeEntity } from '../../../data/persistence/entities';
import { DocumentTypeRepository, AccountTypeRepository } from '../../../data/persistence/repositories';


@Controller('security')
export class SecurityController {

    constructor(
        private readonly securityService: SecurityService,
        private readonly documentTypeRepository: DocumentTypeRepository,
        private readonly accountTypeRepository: AccountTypeRepository) {}

    //sign in    
    @Post('/signin')
    async signIn(@Body() user: SignInDto): Promise<string> {
        return this.securityService.signIn(user);
    }


    //sign up - new customer    
    @Post('/signup')
    async signUp(@Body() customer: SignUpDto): Promise<string> {
        return await this.securityService.signUp(customer);
    }


    //logging out
    @Post('signout/:token')
    signOut(@Param('token') token: string): void {
        this.securityService.signOut(token);
    }

    
    //Create an Account-Type
    @Post('createAccountType')
    createAccountType(@Body() accountType: AccountTypeDto): AccountTypeEntity {
        return this.accountTypeRepository.register(accountType);
    }

    //Get list od Account-Type
    @Get('accountType')
    getAccountType(): AccountTypeEntity[]{
        return this.accountTypeRepository.findAll()
    }


    //Create an Document-Type
    @Post('createDocumentType')
    createDocumentType(@Body() documentType: DocumentTypeDto): DocumentTypeEntity {
        return this.documentTypeRepository.register(documentType);
    }

    //Get list of Document-Type 
    @Get('documentType')
    getDocumentType(): DocumentTypeEntity[]{
        return this.documentTypeRepository.findAll()
    }

    

    
}
