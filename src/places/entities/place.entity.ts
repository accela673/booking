import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PlaceEntity{
    @PrimaryGeneratedColumn()
    place_id: number;

    @Column({nullable: true})
    place_photo: string;

    @Column()
    place_name: string;
}