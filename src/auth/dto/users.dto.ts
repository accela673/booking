import { IsEmail, IsNotEmpty, IsOptional, IsString, Validate } from "class-validator";



export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @IsString()
    user_pfp: string
    
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @IsString()
    @IsNotEmpty()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    department: string;

}