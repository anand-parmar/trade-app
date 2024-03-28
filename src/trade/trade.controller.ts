import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('trade')
@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post()
  create(@Body() createTradeDto: CreateTradeDto) {
    return this.tradeService.create(createTradeDto);
  }

  @Get()
  async getAll() {
    return this.tradeService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTradeDto: CreateTradeDto,
  ) {
    return await this.tradeService.update(id, updateTradeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tradeService.remove(id);
  }
}
