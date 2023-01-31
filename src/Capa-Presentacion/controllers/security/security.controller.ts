// Libraries
import { Body, Controller, Post } from '@nestjs/common';
import { SecurityService } from 'src/Capa-Negocio/services';
import { SignInDto } from 'src/Capa-Presentacion/dtos/sign-in.dto';

import { SignUpDto } from '../../dtos/sign-up.dto';


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
