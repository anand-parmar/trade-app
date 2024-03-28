import { Controller, Get } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  async create() {
    return {
      portfolio: await this.portfolioService.get(),
    };
  }
}
