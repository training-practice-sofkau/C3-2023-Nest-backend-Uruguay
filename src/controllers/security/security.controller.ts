import { Controller, Post, Body, } from '@nestjs/common';
import { SignInDto, SignUpDto } from 'src/dtos';
import { SecurityService } from 'src/services/security/security.service';

@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
   
      return  this.securityService.signIn(signInDto);
    
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {    
      return  this.securityService.signUp(signUpDto);
     
  }

  @Post('sign-out')
  async signOut(@Body() jwt: string) {
          return  this.securityService.signOut(jwt);
    } 
}
