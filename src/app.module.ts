import { Module } from '@nestjs/common';
import { SecurityController } from './controllers';
import { AccountService } from './services';
import { ModuleModule } from './module/module.module';
import { AccountController } from "./controllers/account/account.controller";
import { CusotmerController } from "./controllers/cusotmer/cusotmer.controller";
import { DepositController } from "./controllers/deposit/deposit.controller";
import { TansferController } from "./controllers/tansfer/tansfer.controller";

@Module({
  imports: [ModuleModule],
  controllers: [SecurityController,AccountController,CusotmerController,DepositController,TansferController],
  providers: [AccountService],
})
export class AppModule {}
