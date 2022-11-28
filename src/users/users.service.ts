import { BadRequestException, Injectable, Logger } from '@nestjs/common';
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



    async createUser(user: CreateUserDto){
        await this.userRepo.save(user);
        return "User created succesfully"
      }

    async findUsers(){
        const [...users] = await this.userRepo.find()
        if(![...users].length) return {message: "There are no users here yet, be the first!"}
        for(let user of users){delete user.password}
        return users
    } 

    async findOne(id: number){
        const user =  await this.userRepo.findOne({where: {user_id: id}})
        if(!user) return{message: `User with id ${id} doesn't exist`}
        delete user.password
        return user
    }

    async delete(id: number, email: string){
        const user = await this.userRepo.findOne({where:{user_id: id}})
        if(!user) throw new BadRequestException(`User does not exists`)
        await this.userRepo.remove(user)
        return `User ${email} removed`
    }



}


