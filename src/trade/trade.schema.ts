import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document } from 'mongoose';

export let TradeType = ['buy', 'sell'] as const;

export type TradeDocument = Trade & Document;

@Schema()
export class Trade {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Stock' })
  stock: MongooseSchema.Types.ObjectId;

  @Prop({ type: String })
  date: String;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: String, enum: TradeType })
  type: (typeof TradeType)[number];

  @Prop({ type: Number })
  quantity: number;
}

export const TradeSchema = SchemaFactory.createForClass(Trade);
