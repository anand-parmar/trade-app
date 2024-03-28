import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type PortfolioDocument = Portfolio & Document;

@Schema()
export class Portfolio {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Stock' })
  stock: MongooseSchema.Types.ObjectId;

  @Prop({ type: Number })
  quantity: number;

  @Prop({ type: Number })
  avgPrice: number;

  @Prop({ type: Number })
  avgTotal: number;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
