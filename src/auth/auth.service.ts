import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UsersEntity } from './entities/users.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,    
        @InjectRepository(UsersEntity)
        private readonly userRepo: Repository<UsersEntity>) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepo.findOne({where:{email: email}});
        
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('Could not find the user');
        }
        if (user && passwordValid) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: UsersEntity) {
        user = await this.userRepo.findOne({where: {email: user.email}})        
        const payload = { 
            sub: user.user_id, 
            email: user.email, 
            pfp: user.user_pfp, 
            first_name:user.first_name, 
            last_name: user.last_name,
            department: user.department
        };
        return {
            access_token: this.jwtService.sign(payload,{secret: process.env.SECRET, expiresIn: '1h'}),
            refresh_token: this.jwtService.sign(payload,{secret: process.env.SECRET, expiresIn: '7d'})
        };
    }

    async refresh(token: string, id: number){
        return
        
    }

    async createUser(user: CreateUserDto): Promise<UsersEntity>{
        return await this.userRepo.save(user);
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
