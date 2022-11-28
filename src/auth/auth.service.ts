import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UsersEntity } from 'src/users/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
        console.log(user);
        
        const payload = { 
            sub: user.user_id, 
            email: user.email, 
            pfp: user.user_pfp, 
            first_name:user.first_name, 
            last_name: user.last_name,
            department: user.department
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
