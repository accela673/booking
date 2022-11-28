import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/users/dto/login.dto';

@ApiTags("Registration and login")
@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('auth/login')
    async login(@Request() req: any, @Body() user: LoginDto){   
           
        return this.authService.login(req.body);
    }
}