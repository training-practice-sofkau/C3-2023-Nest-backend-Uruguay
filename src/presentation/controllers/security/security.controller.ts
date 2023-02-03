// Libraries
import { Controller, Param, ParseUUIDPipe, Put, Post, Body } from '@nestjs/common';
import { SecurityService } from '../../../business/services/security/security.service';
import { SignUpDto } from '../../../business/dtos/sign-up.dto';
import { SignInDto } from '../../../business/dtos/sign-in.dto';

@Controller('security')
export class SecurityController {

    constructor(private readonly securityService: SecurityService) { }

    @Post('newUser')
    signUp(@Body() signUp: SignUpDto): string{
        return this.securityService.signUp(signUp);
    }

    @Post('SignIn')
    signIn(@Body() signIn: SignInDto): string{
       
        return this.securityService.signIn(signIn)
    }

    @Post('/SignOut/:JWToken')
    signOut(@Param('JWToken')JWToken: string): void{
        this.securityService.signOut(JWToken)
    }


}
