import { Injectable } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Trade, TradeDocument } from './trade.schema';
import { Model } from 'mongoose';
import * as dayjs from 'dayjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

@Injectable()
export class TradeService {
  constructor(
    @InjectModel(Trade.name) private readonly tradeModel: Model<TradeDocument>,
    private event: EventEmitter2,
  ) {}

  async create(data: CreateTradeDto) {
    let trade = await this.tradeModel.create({
      ...data,
    });

    // fire event for portfolio update
    this.event.emit('update-portfolio', trade.toObject());

    return trade;
  }

  async findBySearch(filter): Promise<TradeDocument[]> {
    return await this.tradeModel.find(filter).lean();
  }

  async findAll(): Promise<TradeDocument[]> {
    return await this.tradeModel.find().populate('stock').lean();
  }

  async update(id: string, updateTradeDto: CreateTradeDto) {
    let trade = await this.tradeModel.findOneAndUpdate(
      { _id: Object(id) },
      { $set: updateTradeDto },
      { new: true },
    );

    // fire event for portfolio update
    this.event.emit('update-portfolio', trade);

    return trade;
  }

  async remove(id: string) {
    let trade = await this.tradeModel.findByIdAndDelete({ _id: Object(id) });

    // fire event for portfolio update
    this.event.emit('update-portfolio', trade);

    return trade;
  }
}
