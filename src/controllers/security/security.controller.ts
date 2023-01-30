// Libraries
import { Body, Controller, Param, Post } from '@nestjs/common';

import { CustomerModel } from '../../models';
import { SignUpDto } from '../../dtos';
import { SignInDto } from '../../dtos/sign-in.dto';

@Controller('security')
export class SecurityController {

    constructor(private securityService: SecurityController) {}

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
