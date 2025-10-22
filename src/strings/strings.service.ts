import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StringEntity } from './entities/string.entity';
import { analyzeString } from '../common/utils/analyzer.util';
import { parseNaturalLanguageQuery } from './nl-parser.util';

@Injectable()
export class StringsService {
  constructor(
    @InjectRepository(StringEntity)
    private repo: Repository<StringEntity>,
  ) {}

  async create(value: string) {
    const { id, properties } = analyzeString(value);
    // ensure value uniqueness
    const exists = await this.repo.findOne({ where: [{ id }, { value }] });
    if (exists) throw new ConflictException('String already exists');

    const entity = this.repo.create({ id, value, properties });
    await this.repo.save(entity);
    return entity;
  }

  async findByValue(value: string) {
    const entity = await this.repo.findOne({ where: { value } });
    if (!entity) throw new NotFoundException('String not found');
    return entity;
  }

  async deleteByValue(value: string) {
    const res = await this.repo.delete({ value });
    if (res.affected === 0) throw new NotFoundException('String not found');
  }

  async findAll(filters: any = {}) {
    const qb = this.repo.createQueryBuilder('s');

    if (filters.is_palindrome !== undefined) {
      qb.andWhere(`(s.properties->>'is_palindrome')::boolean = :is_palindrome`, {
        is_palindrome: !!filters.is_palindrome,
      });
    }
    if (filters.min_length !== undefined) {
      qb.andWhere(`(s.properties->>'length')::int >= :min_length`, { min_length: filters.min_length });
    }
    if (filters.max_length !== undefined) {
      qb.andWhere(`(s.properties->>'length')::int <= :max_length`, { max_length: filters.max_length });
    }
    if (filters.word_count !== undefined) {
      qb.andWhere(`(s.properties->>'word_count')::int = :word_count`, { word_count: filters.word_count });
    }
    if (filters.contains_character !== undefined) {
      const char = filters.contains_character;
      qb.andWhere(`(s.properties->'character_frequency_map'->>:char) IS NOT NULL AND (s.properties->'character_frequency_map'->>:char)::int > 0`, { char });
    }

    const data = await qb.getMany();
    return { data, count: data.length, filters_applied: filters };
  }

  async filterByNaturalLanguage(query: string) {
    const parsed = parseNaturalLanguageQuery(query);
    const filters = parsed.parsed_filters;

    if (filters.min_length && filters.max_length && filters.min_length > filters.max_length) {
      throw new BadRequestException('Parsed filters conflict: min_length > max_length');
    }

    const result = await this.findAll(filters);
    return { ...result, interpreted_query: parsed };
  }
}
