// Libraries
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { Response } from 'express';
import { SecurityService } from 'src/business/services/security/security.service';
import { SingInDTO, SingUpDTO } from 'src/business/dtos';
import { SingOutDTO } from 'src/business/dtos/sing-out.dto';
import { get } from 'http';


@Controller('security')
export class SecurityController {

    constructor(private readonly securityService: SecurityService) {}

    @Post('/singIn')
    singIn(@Body() user: SingInDTO): string {
        return this.securityService.signIn(user);
    }

    @Post('/singUp')
    singUp(@Body() user: SingUpDTO) {
        return this.securityService.signUp(user);
    }

    @Post('/singOut/:token')
    singOut(@Param('token') token: string): void {
        this.securityService.signOut(token);
    }
}
