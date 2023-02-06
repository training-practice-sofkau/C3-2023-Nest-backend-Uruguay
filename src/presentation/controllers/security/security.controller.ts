// Libraries
import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';

import { CustomerService, SecurityService } from '../../../business/services';
import { CustomerDto, SignInDto, SignOutDto, SignUpDto } from '../../../business/dtos';
import { CustomerEntity } from '../../../data/persistence/entities';

@Controller('security')
export class SecurityController {
    constructor(
        private readonly securityService: SecurityService,
        private readonly customerService: CustomerService
    ) { }

    @Post('signup')
    @UsePipes(new ValidationPipe())
    signUp(@Body() signUp: SignUpDto): string{
        return this.securityService.signUp(signUp);
    }

    @Post('signin')
    @UsePipes(new ValidationPipe())
    signIn(@Body() signIn: SignInDto): string{
        return this.securityService.signIn(signIn);
    }

    @Post('signout')
    @UsePipes(new ValidationPipe())
    signOut(@Body() signIn: SignOutDto): void{
        this.securityService.signOut(signIn);
    }

    @Post('customer')
    @UsePipes(new ValidationPipe())
    createCustomer(@Body() customer: CustomerDto): CustomerEntity {
        return this.customerService.createCustomer(customer);
    }
}