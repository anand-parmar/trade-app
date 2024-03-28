import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Stock {
  @Prop()
  name: string;
}

export const StockSchema = SchemaFactory.createForClass(Stock);
