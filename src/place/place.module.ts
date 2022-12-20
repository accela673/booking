import { PlaceEntity } from './entities/place.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceEntity]),
  MulterModule.registerAsync({
    useFactory: () => ({
      dest: './uploads',
    }),
  })],
  controllers: [PlaceController],
  providers: [PlaceService]
})
export class PlaceModule {}
