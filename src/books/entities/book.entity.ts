import { UsersEntity } from "src/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BookEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    place_id: number

    @Column()
    place_name: string

    @Column({type: 'timestamptz'})
    start: Date

    @Column({type: 'timestamptz'})
    end: Date

    @ManyToOne(type => UsersEntity, user => user.book)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: UsersEntity

}