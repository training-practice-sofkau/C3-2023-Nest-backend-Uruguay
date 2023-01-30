import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SecurityService } from '../services';

@ApiTags('security')
@Controller('api/security')
export class SecurityController {
    constructor(private securityService: SecurityService) {}
    @Get()
    All(): string {
      return 'Not implemented';
    }
}