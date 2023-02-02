// Libraries
import { Controller, Post, Body, Param } from '@nestjs/common';
import { SecurityService } from 'src/business/services/security/security.service';
import { SignInDTO, SignUpDTO } from 'src/business/dtos';


@Controller('security')
export class SecurityController {

    constructor(private readonly securityService: SecurityService) {}

    @Post('/signIn')
    signIn(@Body() user: SignInDTO): string {
        return this.securityService.signIn(user);
    }

    @Post('/signUp')
    signUp(@Body() user: SignUpDTO) {
        return this.securityService.signUp(user);
    }

    @Post('/signOut/:token')
    signOut(@Param('token') token: string): void {
        this.securityService.signOut(token);
    }
}
