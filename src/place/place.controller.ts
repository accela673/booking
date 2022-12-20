import { UpdatePlace } from './dto/update.place.dto';
import { CreatePlace } from './dto/create.place.dto';
import { PlaceService } from './place.service';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags("Place")
@Controller('place')
export class PlaceController {
    constructor (private readonly placeService: PlaceService){}

    @ApiOperation({description: "This endpoint to get one place from shop"})
    @Get('/get/:id')
    async getOne(@Param('id') id: string){
      return await this.placeService.getPlace(+id)
    }


    @ApiOperation({description: "This endpoint to get all place from shop"})
    @Get('/getall')
    async getAll(){
        return await this.placeService.getPlaces()
    }

    @ApiOperation({description: "This endpoint to adding place to shop"})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
            place_image: {
            type: 'string',
            format: 'binary',
          },
          place_name: { type: 'string' },
          description: { type: 'string' }
        },
      },
    })
    @UseInterceptors(FileInterceptor('place_image'))
    @Post('/add')
    async postOne(@Body() body, @UploadedFile() file){
        const place = new CreatePlace()
        if(!file) file = {}
        place.place_image = file.path
        place.place_name = body.place_name
        place.description = body.description
        if(!place.description || !place.place_name.length) throw new BadRequestException('description and place name cannot be empty')
        return await this.placeService.addPlace(place)
    }

    @ApiOperation({description: "This endpoint to deleting place from shop"})
    @Delete('/delete/:id')
    async deleteOne(@Param('id') id: string){
        return this.placeService.deletePlace(+id)
    }

    @ApiOperation({description: "This endpoint to editing place in shop"})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
            place_image: {
                nullable: true,
                type: 'string',
                format: 'binary',
          },
          place_name: { type: 'string' },
          description: { type: 'string' }
        },
      },
    })
    @UseInterceptors(FileInterceptor('place_image'))
    @UsePipes(new ValidationPipe())
    @Put('/put/:id')
    async putOne(@Param('id') id: string, @Body() body, @UploadedFile() file){
        const place = new UpdatePlace()
        if(!file) file = {}
        place.place_image = file.path
        place.place_name = body.place_name
        place.description = body.description      
        if(!place.description || !place.place_name.length) throw new BadRequestException('description and place name cannot be empty')  
        return await this.placeService.editPlace(+id ,place)
    }

}
