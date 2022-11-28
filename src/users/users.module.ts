import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity]),  
  MulterModule.registerAsync({
    useFactory: () => ({
      dest: './pfp',
    }),
  })],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
