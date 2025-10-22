import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StringsController } from './strings.controller';
import { StringsService } from './strings.service';
import { StringEntity } from './entities/string.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StringEntity])],
  controllers: [StringsController],
  providers: [StringsService],
})
export class StringsModule {}