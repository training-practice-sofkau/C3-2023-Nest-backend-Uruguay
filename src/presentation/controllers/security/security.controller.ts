// Libraries
import { Body, Controller, Param, Post } from '@nestjs/common';

//DTOs
import { SignUpDto, SignInDto } from 'src/business/dtos';
import { SecurityService } from 'src/business/services';

@Controller('security')
export class SecurityController {

    constructor(private readonly securityService: SecurityService) {}

    //sign in    
    @Post('/signin')
    async signIn(@Body() user: SignInDto): Promise<string> {
        return this.securityService.signIn(user);
    }


    //sign up - new customer    
    @Post('/signup')
    async signUp(@Body() customer: SignUpDto): Promise<string> {
        return await this.securityService.signUp(customer);
    }


    //logging out
    @Post('signout/:token')
    signOut(@Param('token') token: string): void {
        this.securityService.signOut(token);
    }

}
