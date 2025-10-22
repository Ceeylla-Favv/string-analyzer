import {
  Controller, Post, Body, Get, Param, Delete, Query, UsePipes, ValidationPipe, HttpCode, BadRequestException
} from '@nestjs/common';
import { StringsService } from './strings.service';
import { CreateStringDto } from './dto/create-string.dto';
import { FilterStringsDto } from './dto/filter-strings.dto';

@Controller('strings')
export class StringsController {
  constructor(private readonly svc: StringsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() body: CreateStringDto) {
    if (typeof body.value !== 'string') throw new BadRequestException('"value" must be a string');
    const created = await this.svc.create(body.value);
    return {
      id: created.id,
      value: created.value,
      properties: created.properties,
      created_at: created.created_at,
    };
  }

  @Get(':value')
  async getByValue(@Param('value') value: string) {
    const e = await this.svc.findByValue(value);
    return {
      id: e.id,
      value: e.value,
      properties: e.properties,
      created_at: e.created_at,
    };
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async getAll(@Query() query: FilterStringsDto) {
    const filters: any = {};
    if (query.is_palindrome !== undefined) filters.is_palindrome = (query.is_palindrome === 'true');
    if (query.min_length !== undefined) filters.min_length = parseInt(query.min_length, 10);
    if (query.max_length !== undefined) filters.max_length = parseInt(query.max_length, 10);
    if (query.word_count !== undefined) filters.word_count = parseInt(query.word_count, 10);
    if (query.contains_character !== undefined) filters.contains_character = query.contains_character;
    return this.svc.findAll(filters);
  }

  @Get('filter-by-natural-language')
  async filterByNL(@Query('query') queryString: string) {
    if (!queryString) throw new BadRequestException('Missing query param');
    return this.svc.filterByNaturalLanguage(queryString);
  }

  @Delete(':value')
  @HttpCode(204)
  async delete(@Param('value') value: string) {
    await this.svc.deleteByValue(value);
  }
}
