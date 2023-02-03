import { Controller, Post, Body, Param } from '@nestjs/common';

import { SignInDto } from '../../capaLogicaDeNegocio/dto/sign-in.dto';
import { SignUpDto } from '../../capaLogicaDeNegocio/dto/sign-up.dto';
import { SegurityService } from '../../capaLogicaDeNegocio/service/segurity.service';

@Controller('security')
export class SegurityController {

    constructor(private readonly securityService:SegurityService) { }

    @Post(`/singIn`) //Hecho falta token
    signIn(@Body() user: SignInDto): string{
        return this.securityService.signIn(user)
    }

    @Post( `/singUp`)//HECHO pero falta el token
    signUp(@Body() user: SignUpDto): string{
        return this.securityService.signUp(user);
    }

   

    // @Post('/singOut/:token')
    // singOut(@Param('token') token: string): void {
    //     this.securityService.signOut(token);
    // }

    
    

   
    
}
