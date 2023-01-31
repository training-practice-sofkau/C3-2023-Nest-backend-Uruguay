import { Controller,Post,Body } from '@nestjs/common';

import { SignInDto } from '../../capaLogicaDeNegocio/dto/sign-in.dto';
import { SignUpDto } from '../../capaLogicaDeNegocio/dto/sign-up.dto';
import { SegurityService } from '../../capaLogicaDeNegocio/service/segurity.service';

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
