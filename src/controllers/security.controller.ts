import { Body, Post, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SecurityService } from '../services';
import { SignInDto, SignUpDto } from '../dtos';

@ApiTags('security')
@Controller('api/security')
export class SecurityController {

    constructor(private readonly securityService: SecurityService) {}

    @Post()
    signUp(@Body() signUp: SignUpDto): string{
        return this.securityService.signUp(signUp);
    }

    @Post()
    signIn(@Body() signIn: SignInDto): string{
        return this.securityService.signIn(signIn)
    }
}