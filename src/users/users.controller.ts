import { Body, Controller, Post, UsePipes, ValidationPipe, Get, Param, Delete, Patch, Put, UseGuards, Request, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';



@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @ApiTags("Registration and login")
  @ApiConsumes('multipart/form-data')
  @ApiOperation({description: "This endpoint for creating post"})
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', nullable: false },
        password: { type: 'string', nullable: false },
        password_cofirm: {type: 'string', nullable: false},
        first_name: { type: 'string', nullable: false },
        last_name: { type: 'string', nullable: false },
        department: { type: 'string', description:`Example - "COM21"`, nullable: false },
        post_image: {
          type: 'string',
          format: 'binary', nullable: true
        },
      },
    },
  
  })
  @UseInterceptors(FileInterceptor('post_image'))
  @ApiOperation({description: "This endpoint for registrating user"})
  @Post('/registration')
  async createUser(@Request() req ,@Body() newUser:CreateUserDto){
      if (newUser.password !== req.body.password_cofirm) throw new BadRequestException("Passwords don't match")
      const hashedPassword = await bcrypt.hash(newUser.password, 8)
      newUser.password = hashedPassword
      return await this.usersService.createUser(newUser)      
  }

    
  @ApiTags("Delete logined user")
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({description: "This endpoint for deleting post"})
  @Delete('/delete')
    async deleteUserByID(@Request() req){
        return await this.usersService.delete(req.user.userId, req.user.email)
    }

  @ApiTags("Users(Profiles) endpoints")
  @ApiOperation({description: "This endpoint shows all users in database"})
  @Get('/users')
  async getUsers(){
      return await this.usersService.findUsers()
    }

  @ApiTags("Users(Profiles) endpoints")
  @ApiOperation({description: "This endpoint finds by id one users from database"})
  @Get('/users/:id')
  async getUserByID(@Param('id') id: string){
      return await this.usersService.findOne(+id)
  }

}