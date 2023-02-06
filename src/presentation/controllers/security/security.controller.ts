import { Controller, Post, Body,  Param } from '@nestjs/common';
import { SignInDto, SignUpDto } from 'src/business';
import { SecurityService } from 'src/business/services/security/security.service';


@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('sign-in')
   signIn(@Body() signInDto: SignInDto): string {
   
      return   this.securityService.signIn(signInDto);
    
  }

  @Post('sign-up')
   signUp(@Body() signUpDto: SignUpDto): string {    
      return  this.securityService.signUp(signUpDto);
     
  }

  @Post('SignOut/:JWToken')
  signOut(@Param('JWToken')JWToken: string): void{
      this.securityService.signOut(JWToken)
  }
}
