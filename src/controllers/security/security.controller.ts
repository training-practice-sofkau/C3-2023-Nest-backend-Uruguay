// Libraries
import { Controller, Post, Body } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { SingInDTO, SingUpDTO } from '../../dtos/';
import { SecurityService } from '../../services/security/security.service';

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

    @Post('/singOut/:JWToken')
    singOut(@Param() JWToken: string): void {
        this.securityService.signOut(JWToken);
    }
}
