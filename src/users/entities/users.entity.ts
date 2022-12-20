import { BookEntity } from "src/books/entities/book.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersEntity{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({unique: true})
    username: string;
    
    @Column()
    password: string;

    @OneToMany(type => BookEntity, book => book.user)
    book: BookEntity[]
}