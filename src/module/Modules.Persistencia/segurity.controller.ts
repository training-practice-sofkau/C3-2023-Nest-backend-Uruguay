import { Controller,Post,Body } from '@nestjs/common';
import { SegurityService } from './segurity.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('segurity')
export class SegurityController {

    constructor(private readonly securityService:SegurityService) { }

    @Post()
    signUp(@Body() signUp: SignUpDto): string{
        return this.securityService.signUp(signUp);
    }

    @Post()
    signIn(@Body() signIn: SignInDto): string{
        return this.securityService.signIn(signIn)
    }
    
}
