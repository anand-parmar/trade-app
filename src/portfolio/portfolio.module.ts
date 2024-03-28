import { Module } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { PortfolioController } from './portfolio.controller';
import { TradeModule } from 'src/trade/trade.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Portfolio, PortfolioSchema } from './portfolio.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Portfolio.name, schema: PortfolioSchema },
    ]),
    TradeModule,
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
