import { UpdatePlace } from './dto/update.place.dto';
import { CreatePlace } from './dto/create.place.dto';
import { PlaceEntity } from './entities/place.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlaceService {
    constructor(
        @InjectRepository(PlaceEntity)
        private readonly placeRepo: Repository<PlaceEntity>
    ){}

    async getPlace(id: number){
        return await this.placeRepo.findOne({where:{id:id}})
    }


    async getPlaces(){
        return await this.placeRepo.find()
    }

    async addPlace(placeDto: CreatePlace){
        const place = await this.placeRepo.findOne({where: {place_name: placeDto.place_name}})
        if(place) throw new BadRequestException('Place with this name already exists')
        return await this.placeRepo.save(placeDto)
    }

    async deletePlace(id: number){
        const place = await this.placeRepo.findOne({where: {id: id}})
        if(!place) throw new BadRequestException("Place with this id doesn't exists")
        return await this.placeRepo.remove(place)
    }

    async editPlace(id: number, placeDto: UpdatePlace){
        const place = await this.placeRepo.findOne({where: {id: id}})
        if(!place) throw new BadRequestException("Place with this id doesn't exists")
        if(!place.place_image) delete place.place_image
        Object.assign(place, placeDto)
        return await this.placeRepo.save(place)
    }
}
