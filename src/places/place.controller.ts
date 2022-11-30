import { JwtAuthGuard } from './../auth/guards/jwt-auth.guards';
import { UpdatePlaceDto } from './dto/update.dto';
import { CreatePlaceDto } from './dto/create.dto';
import { PlaceService } from './place.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

const emails = ['sardarkasmaliev@gmail.com', 'example.email@gmail.com']

const validateEmail = (email: string) => {
    return emails.includes(email)
}
@Controller('place')
export class PlaceController {
    constructor(private readonly placeServise: PlaceService){}
    @ApiTags("Endpionts for places")
    @ApiOperation({description:'Endpoint for getting all places'})
    @Get()
    async getPlaces(){
        return await this.placeServise.getAll()
    }

    @ApiTags("Endpionts for places")
    @ApiOperation({description: 'Endpoint for getting one place'})
    @Get(':id')
    async geOnePlace(@Param('id') id: string){
        return await this.placeServise.getOne(+id)
    }

   
   
    @UsePipes(new ValidationPipe())
    @ApiTags("Endpionts for admins")
    @ApiOperation({description: 'Endpoint for adding place'})
    @ApiBearerAuth()
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Post()
    async addPlace(@Request() req, @Body() placeDto: CreatePlaceDto){
        if(!validateEmail(req.user.email)) throw new BadRequestException('You have no access to this endpoint')
        return await this.placeServise.postOne(placeDto)
    }


    @UsePipes(new ValidationPipe())
    @ApiTags("Endpionts for admins")
    @ApiOperation({description: 'Endpoint for editing place'})
    @ApiBearerAuth()
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async editPlace(@Request() req, @Param('id') id: string, @Body() newPlace: UpdatePlaceDto){
        if(!validateEmail(req.user.email)) throw new BadRequestException('You have no access to this endpoint')
        return await this.placeServise.putOne(+id, newPlace)
    }


    @UsePipes(new ValidationPipe())
    @ApiTags("Endpionts for admins")
    @ApiOperation({description: 'Endpoint for removing place'})
    @ApiBearerAuth()
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletePlace(@Request() req, @Param('id') id: string){
        if(!validateEmail(req.user.email)) throw new BadRequestException('You have no access to this endpoint')
        return await this.placeServise.deleteOne(+id)
    }

}
