import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { wiki_articles } from './data/data.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("/")
  @Render('index')
  getHello() {
    return {
      data: wiki_articles
    }
  }

  @Get("/filter")
  @Render('minViews')
  getMinViews(@Query("minViews") minViews: number) {
    if (!minViews) {
      return {
        data: wiki_articles.toSorted((a, b) => a.views - b.views)
      }
    }
    return {
      data: wiki_articles.filter(item => item.views > minViews).toSorted((a, b) => a.views - b.views)
    }
  }
}
