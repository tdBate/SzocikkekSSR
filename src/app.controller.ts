import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { wiki_articles } from './data/data.js';
import type { CreateArticleViewDto } from './models/CreateArticleView.dto.js';
import { ArticleView } from './models/ArticleView.js';
import { error } from 'console';

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

  @Get("/new")
  @Render("new")
  newArcticleForm() {
    return { data: wiki_articles }
  }

  @Post("/new")
  @Render("new")
  newArcticle(@Body() body: CreateArticleViewDto) {
    if (!body.title || !body.url || !body.views) {
      return {
        error: "Nincs megadva mindhárom mező",
        success: false
      }
    }

    if (!(parseInt(body.views) >= 0)) {
      return {
        error: "A views nem lehet 0-nál kisebb",
        success: false
      }
    }

    if (!(body.title.length >= 1)) {
      return {
        error: "A titlenek legalább 1 karakter hosszúságúnak kell lennie",
        success: false
      }
    }

    if (!(body.url.startsWith("https://"))) {
      return {
        error: 'Az URL "https://" -rel kell kezdődjön',
        success: false
      }
    }

    const arcitcle: ArticleView = {
      title: body.title,
      url: body.url,
      views: parseInt(body.views)
    }

    wiki_articles.push(arcitcle);
    return {
      error: "",
      success: true
    }
  }
}
