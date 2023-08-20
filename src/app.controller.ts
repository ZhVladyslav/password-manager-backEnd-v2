import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  info() {
    return {
      version: '0.0.1',
      name: 'Password manager V2',
      author: 'ZhVladyslav',
      gitHub: 'https://github.com/ZhVladyslav',
    };
  }
}
