// Libraries
import { Controller, Param, ParseUUIDPipe, Put, Post, Body } from '@nestjs/common';
import { SecurityService } from '../../services/security/security.service';
import { SignInDto, SignUpDto } from '../../business/dtos';

@Controller('security')
export class SecurityController {

    constructor(private readonly securityService: SecurityService) { }

    @Post('signup')
    signUp(@Body() signUp: SignUpDto): string{
        return this.securityService.signUp(signUp);
    }

    @Post('signin')
    signIn(@Body() signIn: SignInDto): string{
        return this.securityService.signIn(signIn);
    }

    // @Post('signout')
    // signOut(@Body() signIn: SignInDto): void{
    //     this.securityService.signOut(signIn);
    // }

}