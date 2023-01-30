// Libraries
import { Controller, Post, Body } from '@nestjs/common';
import { SecurityService } from '../../services/security';
import { SignUpDto, SignInDto } from '../../dtos';


@Controller('security')
export class SecurityController {
    
    constructor(private readonly securityService: SecurityService) { }

    @Post('signUp')
    signUp(@Body() signUp: SignUpDto): string{
        return this.securityService.signUp(signUp);
    }

    @Post('signIn')
    signIn(@Body() signIn: SignInDto): string{
        return this.securityService.signIn(signIn)
    }

    @Post('signOut')
    signOut(JWToken: string): void {
        return this.securityService.signOut(JWToken);
    }
}
