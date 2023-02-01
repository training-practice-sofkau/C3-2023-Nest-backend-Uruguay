import { Module, forwardRef } from '@nestjs/common';
import { SecurityController } from '../../presentation/controllers';
import { SecurityService } from '../../business/services';
import { JwtService } from '@nestjs/jwt';
import { AccountModule, CustomerModule } from '.';

@Module({
  imports: [forwardRef( () => AccountModule), forwardRef( () => CustomerModule)],
  controllers: [SecurityController],
  providers: [SecurityService, JwtService],
})
export class SecurityModule {}