import { BookService } from './book.service';
import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { AddDto } from './dto/add.dto';

@ApiTags("Book")
@Controller('book')
export class BookController {
    constructor (private readonly bookService: BookService){}

    @ApiBearerAuth()
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({description: "This endpoint to get all places from your book"})
    @Get()
    async getAllBusket(@Req() req){
        return await this.bookService.findAll(req.user.userId)        
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({description: "This endpoint to add places to your book"})
    @Post('post/:id/:count')
    async postToBusket(@Param('id') place_id: string,@Body() dates: AddDto, @Req() req){
        console.log(req.user);
        
        return await this.bookService.addOne(req.user.userId, +place_id, dates.start, dates.end)
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({description: "This endpoint to delete place from your book"})
    @Delete('/delete/:id')
    async deleteFromBusket(@Param('id') id: string){
        return await this.bookService.deleteOne(+id)
    }
}
