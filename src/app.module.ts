import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService,CusotmerService,DepositService,TransferService} from './services';
import { ModuleModule } from './module/module.module';
import { AccountController } from "./controllers/account/account.controller";
import { CusotmerController } from "./controllers/cusotmer/cusotmer.controller";
import { DepositController } from "./controllers/deposit/deposit.controller";
import { TansferController } from "./controllers/tansfer/tansfer.controller";
import { AccountTypeRepository,CustomerRepository,DepositRepository,DocumentTypeRepository,AccountRepository } from "./persistence/repositories";
import { SegurityService } from './module/Modules.Presistencia/segurity.service';


@Module({
  imports: [ModuleModule],
  controllers: [SecurityController,AccountController,CusotmerController,DepositController,TansferController],
  providers: []
})
export class AppModule {}
