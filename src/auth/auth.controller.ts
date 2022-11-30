import { Body, Controller, Post, UsePipes, ValidationPipe, Get, Param, Delete, Patch, Put, UseGuards, Request, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/users.dto'; 

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @UsePipes(new ValidationPipe())
    @ApiTags("Registration and login")
    @ApiOperation({description: "Registrate user"})
    @ApiConsumes('multipart/form-data')
    @ApiOperation({description: "This endpoint for registrating user"})
    @ApiBody({schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: "example.email@gmail.com", nullable: false },
        password: { type: 'string', example: "example_password", nullable: false },
        password_cofirm: {type: 'string', nullable: false},
        first_name: { type: 'string',  nullable: false },
        last_name: { type: 'string', nullable: false },
        department: { type: 'string', description:`Example - "COM21"`, nullable: false },
        post_image: {
          type: 'string',
          format: 'binary', nullable: true
        },
      },
    },})
    @UseInterceptors(FileInterceptor('post_image'))
    @Post('/registration')
    async createUser(@Request() req ,@Body() newUser:CreateUserDto){
        if (newUser.password !== req.body.password_cofirm) throw new BadRequestException("Passwords don't match")
        const hashedPassword = await bcrypt.hash(newUser.password, 8)
        newUser.password = hashedPassword
        return await this.authService.createUser(newUser)      
    }
  
    
    @ApiTags("Registration and login")
    @ApiBody({schema: {properties: {
      email: {example: "example.email@gmail.com"},
      password: {example: "example_password"}
    }}})
    @ApiOperation({description: "Login to system"})
    @Post('auth/login')
    async login(@Request() req: any){   
           
        return this.authService.login(req.body);
    }
      

    @ApiTags("Registration and login")
    @Post('auth/refresh')
    @ApiBody({schema: {properties: {refresh_token: {type: 'string'}}}})
    async refresh(refresh_token: string){ 
        return this.authService.refresh(refresh_token);
    }


    @ApiTags("Users endpoints")
    @ApiBearerAuth()
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({description: "This endpoint for deleting user"})
    @Delete('/delete')
      async deleteUserByID(@Request() req){
        return await this.authService.delete(req.user.userId, req.user.email)
      }
  
    @ApiTags("Users endpoints")
    @ApiOperation({description: "This endpoint shows all users in database"})
    @Get('/users')
    async getUsers(){
        return await this.authService.findUsers()
      }
  
    @ApiTags("Users endpoints")
    @ApiOperation({description: "This endpoint finds by id one users from database"})
    @Get('/users/:id')
    async getUserByID(@Param('id') id: string){
        return await this.authService.findOne(+id)
    }
  
}