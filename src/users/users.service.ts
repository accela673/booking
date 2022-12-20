import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/users.dto';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userRepo: Repository<UsersEntity>
    ){}


    async createUser(data: CreateUserDto){
        const newUser = await this.userRepo.findOne({where:{username: data.email}})
        if(newUser) throw new BadRequestException(`User ${data.email} is already exists`)
        const user = {username: data.email, password: data.password}
        return await this.userRepo.save(user);
      }
}


