import { PlaceEntity } from 'src/place/entities/place.entity';
import { BookEntity } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, PlaceEntity])],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
