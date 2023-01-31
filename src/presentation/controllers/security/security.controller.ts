// Libraries
import { Controller, Post, Body } from '@nestjs/common';
import { SecurityService } from 'src/business/services';
import { SignInDto, SignUpDto } from 'src/data/dtos';

@Controller('security')
export class SecurityController {

    constructor(private readonly securityService: SecurityService) { }

    @Post("signup")
    signUp(@Body() signUp: SignUpDto): string{
        return this.securityService.signUp(signUp);
    }

    @Post("signin")
    signIn(@Body() signIn: SignInDto): string{
        return this.securityService.signIn(signIn)
    }


}
