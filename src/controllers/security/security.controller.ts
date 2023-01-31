// Libraries
import { Controller, Param, ParseUUIDPipe, Put, Post, Body } from '@nestjs/common';
import { SecurityService } from '../../services/security/security.service';
import { SignUpDto } from '../../dtos/sign-up.dto';
import { SignInDto } from '../../dtos/sign-in.dto';

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
