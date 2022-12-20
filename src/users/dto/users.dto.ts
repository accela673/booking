import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";



export class CreateUserDto {
    @ApiProperty({example: "email@gmail.com"})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({example: "MyPassword673"})
    @IsNotEmpty()
    @IsString()
    password: string;
     
}
