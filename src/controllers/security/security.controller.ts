// Libraries
import { Body, Controller, Param, Post } from '@nestjs/common';

import { CustomerModel } from '../../models';

@Controller('security')
export class SecurityController {

    constructor(private securityService: SecurityController) {}

    //sign in
    //TODO: generate userDTO and use it instead of customerModel
    @Post('signin')
    async signIn(@Body() user: CustomerModel): Promise<string> {
        return this.securityService.signIn(user);
    }


    //sign up - new customer
    //TODO: generate customerDTO and use it instead of customerModel
    @Post('signup')
    async signUp(@Body() customer: CustomerModel): Promise<string> {
        return await this.securityService.signUp(customer);
    }


    //logging out
    @Post('signout/:token')
    signOut(@Param('token') token: string): void {
        this.securityService.signOut(token);
    }

}
