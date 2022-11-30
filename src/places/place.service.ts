import { CreatePlaceDto } from './dto/create.dto';
import { PlaceEntity } from './entities/place.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePlaceDto } from './dto/update.dto';

@Injectable()
export class PlaceService {
    constructor (
        @InjectRepository(PlaceEntity)
        private readonly placeRepo: Repository<PlaceEntity>){}

    async getAll(){
        return await this.placeRepo.find()
    }

    async getOne(id: number): Promise<PlaceEntity>{
        return await this.placeRepo.findOne({where: {place_id: id}})
    }

    async postOne(place: CreatePlaceDto): Promise<PlaceEntity>{
        return await this.placeRepo.save(place)
    }

    async putOne(id: number, newPlace: UpdatePlaceDto){
        let place = await this.placeRepo.findOne({where: {place_id: id}})
        newPlace = Object.assign(place, newPlace)
        return await this.placeRepo.save(newPlace)
    }

    async deleteOne(id: number){
        const place = await this.placeRepo.findOne({where: {place_id: id}})
        return await this.placeRepo.remove(place)
    }
}
