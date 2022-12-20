import { PlaceEntity } from 'src/place/entities/place.entity';
import { BookEntity } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepo: Repository<BookEntity>,
        @InjectRepository(PlaceEntity)
        private readonly placesRepo: Repository<PlaceEntity>
    ){}

    async findAll(userId: number){

        const user = await this.bookRepo.find({
            relations: ['user'],
            where: { user: {id: userId} },
          });
        for (let i = 0; i < user.length; i++){
            delete user[i].user.password
        }
        return user
        
    }

    async deleteOne(id: number){
        const order = await this.bookRepo.findOne({where:{id:id}})
        if(!order) throw new BadRequestException('There is no order with this id')       
        return await this.bookRepo.remove(order)
    }

    async addOne(userId: number, place_id: number, start: Date, end: Date ){
        const place = await this.placesRepo.findOne({where: {id:place_id}})
        if(!place) throw new BadRequestException('This place does not exists')
        const obj = {user: {}, place_id:0,place_name:'', start: start, end: end}
        obj.place_id = place_id
        obj.place_name = place.place_name
        obj.user = {id: userId}
        return await this.bookRepo.save(obj)
    }
}
