// Libraries
import { Body, Controller, Post } from '@nestjs/common';
import { SecurityService } from '../../services/security/security.service';
import { SignUpDto } from '../../dtos/sign-up.dto';
import { SignInDto } from 'src/dtos/sign-in.dto';

@Controller('security')
export class SecurityController {
    constructor (private readonly securityService : SecurityService) {}


    @Post()
    signUp(@Body() signUp: SignUpDto): string{
        return this.securityService.signUp(signUp);
    }

    @Post()
    signIn(@Body() signIn: SignInDto): string{
        return this.securityService.signIn(signIn);
    }


}
