import { Controller, Post, Body, } from '@nestjs/common';
import { SignInDto, SignUpDto } from 'src/business';
import { SecurityService } from 'src/business/services/security/security.service';


@Controller('security')
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('sign-in')
   signIn(@Body() signInDto: SignInDto): boolean {
   
      return  this.securityService.signIn(signInDto);
    
  }

  @Post('sign-up')
   signUp(@Body() signUpDto: SignUpDto): string {    
      return  this.securityService.signUp(signUpDto);
     
  }

  @Post('sign-out')
   signOut(@Body() jwt: string) {
          return  this.securityService.signOut(jwt);
    } 
}
