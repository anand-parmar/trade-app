import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from './stock.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
  ],
  controllers: [],
  providers: [],
})
export class StockModule {}
