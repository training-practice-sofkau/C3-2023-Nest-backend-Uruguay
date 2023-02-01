import { Body, Post, Controller, Query, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SecurityService } from '../../business/services';
import { SignInDto, SignUpDto } from '../../business/dtos';

@ApiTags('security')
@Controller('api/security')
export class SecurityController {

    constructor(private readonly securityService: SecurityService) {}

    @Post('/sign-up')
    signUp(@Body() signUp: SignUpDto): Array<Object> {
        return this.securityService.signUp(signUp);
    }

    @Post('/sign-in')
    signIn(@Body() signIn: SignInDto): Array<Object> {
        return this.securityService.signIn(signIn);
    }

    @Get('/sign-out')
    singOut(@Query('jwtToken') jwtToken: string): string {
        return this.securityService.signOut(jwtToken);
    }
}