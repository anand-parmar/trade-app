import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TradeService } from 'src/trade/trade.service';
import { Portfolio, PortfolioDocument } from './portfolio.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TradeDocument } from 'src/trade/trade.schema';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(Portfolio.name)
    private readonly portfolioModel: Model<PortfolioDocument>,
    private readonly tradeService: TradeService,
  ) {}

  async get() {
    let portFolioList = await this.portfolioModel
      .find({})
      .populate('stock', 'name');

    let result = [];
    portFolioList.forEach((portFolio) => {
      result.push(this.getReturn(portFolio));
    });

    return await Promise.all(result);
  }

  async getReturn(portFolio) {
    // let fixed current stock price
    let todayStockPrice = 15;

    let buyPrice = portFolio.quantity * portFolio.avgPrice;
    let sellAmount = portFolio.quantity * todayStockPrice;

    let stockReturn = sellAmount - buyPrice;
    let stockReturnPercent = ((sellAmount - buyPrice) * 100) / buyPrice;

    return {
      portFolio,
      todayStockPrice,
      buyPrice,
      sellAmount,
      stockReturn,
      stockReturnPercent,
    };
  }

  /**
   * Event for updating portfolio when trade happen
   *
   * @param data
   * @returns
   */
  @OnEvent('update-portfolio')
  async updatePortfolio(data: TradeDocument) {
    let stock = data.stock.toString();
    let trades = await this.tradeService.findBySearch({ stock: Object(stock) });

    let stockTable = [];

    let avgAllBuy = 0;

    trades.forEach((trade) => {
      if (trade.type == 'buy') {
        stockTable.push({
          quantity: trade.quantity,
          avgPrice: trade.price / trade.quantity,
        });
        avgAllBuy += trade.price;
      }
      if (trade.type == 'sell') {
        stockTable[stockTable.length - 1]['quantity'] -= trade.quantity;
      }
    });

    let totalStock = stockTable.reduce((prev, cur) => prev + cur.quantity, 0);

    let totalAvgPrice = stockTable.reduce(
      (prev, cur) => prev + cur.avgPrice,
      0,
    );

    let avgPrice = totalAvgPrice / stockTable.length;

    let portfolio = await this.portfolioModel.findOne({ stock: Object(stock) });
    if (portfolio) {
      // update portfolio if  found
      await this.portfolioModel.findOneAndUpdate(
        { stock: Object(stock) },
        {
          $set: {
            quantity: totalStock,
            avgPrice: avgPrice,
            avgTotal: avgAllBuy / stockTable.length,
          },
        },
      );
    } else {
      // create portfolio if not found
      await this.portfolioModel.create({
        stock: Object(stock),
        quantity: totalStock,
        avgPrice: avgPrice,
        avgTotal: avgAllBuy / stockTable.length,
      });
    }

    return {
      avgAllBuy: avgAllBuy / stockTable.length,
      totalStock,
      totalAvgPrice,
      avgPrice,
      stockTable,
      total: totalStock * avgPrice,
    };
  }
}
