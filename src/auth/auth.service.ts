import { Injectable, UnauthorizedException } from '@nestjs/common';
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

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userRepo.findOne({where:{username: username}});
        
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new UnauthorizedException('Incorrect password');
        }
        if (user && passwordValid) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    
    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
