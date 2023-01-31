import { Body, Post, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SecurityService } from '../../business/services';
import { SignInDto, SignUpDto } from '../../business/dtos';

@ApiTags('security')
@Controller('api/security')
export class SecurityController {

    constructor(private readonly securityService: SecurityService) {}

    @Post('/sign-up')
    signUp(@Body() signUp: SignUpDto) {
        const res = this.securityService.signUp(signUp);
        return res
    }

    @Post('/sign-in')
    signIn(@Body() signIn: SignInDto): string {
        return this.securityService.signIn(signIn);
    }
}