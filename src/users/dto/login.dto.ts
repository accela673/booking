import { IsNotEmpty, IsString} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";



export class LoginDto {
    @ApiProperty({example: "example.email@gmail.com"})
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({example: "example_password"})
    @IsNotEmpty()
    @IsString()
    password: string;
     
}
