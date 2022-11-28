import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersEntity{
    @PrimaryGeneratedColumn()
    user_id: number

    @Column({nullable: true})
    user_pfp: string

    @Column({unique: true})
    email: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    department: string;

    @Column()
    password: string;

}