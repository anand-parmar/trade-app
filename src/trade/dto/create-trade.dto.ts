import { ApiProperty } from '@nestjs/swagger';
import { TradeType } from '../trade.schema';

export class CreateTradeDto {
  @ApiProperty({
    description:
      'RELIANCE - 6604585dd50e10c29ad9ad7c, HDFCBANK - 66045873d50e10c29ad9ad7d',
    example: '6604585dd50e10c29ad9ad7c',
  })
  stock: string;

  @ApiProperty({
    example: '27-03-2024',
  })
  date: string;

  @ApiProperty({
    example: 900,
  })
  price: number;

  @ApiProperty({
    example: 'buy',
    enum: TradeType,
  })
  type: (typeof TradeType)[number];

  @ApiProperty({
    example: 100,
  })
  quantity: number;
}
