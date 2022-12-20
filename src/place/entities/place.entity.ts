import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class PlaceEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    place_image: string;

    @Column()
    place_name: string;

    @Column()
    description: string;
}