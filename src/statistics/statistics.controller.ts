import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // ----------------------------------------------------------------------

  //
  // GET
  //

  // ----------------------------------------------------------------------

  // get all sessions
  @Get('users')
  async all() {
    return await this.statisticsService.userList();
  }
}
