import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { wiki_articles } from './data/data.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      data: wiki_articles
    }
  }
}
