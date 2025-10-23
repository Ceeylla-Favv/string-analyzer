import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StringsModule } from './strings/strings.module';
import { StringEntity } from './strings/entities/string.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST || process.env.PGHOST  || 'db',
        port: parseInt(process.env.POSTGRES_PORT || process.env.PGPORT || '5432', 10),
        username: process.env.POSTGRES_USER || process.env.PGUSER,
        password: process.env.POSTGRES_PASSWORD || process.env.PGPASSWORD,
        database: process.env.POSTGRES_DB || process.env.PGDATABASE,
        entities: [StringEntity],
        synchronize: process.env.NODE_ENV !== 'production',
        logging: true,
      }),
    }),

    StringsModule,
  ],
})
export class AppModule {}
