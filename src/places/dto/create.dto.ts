import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePlaceDto{
    @ApiProperty({example: "photo path from server (can be null)", required: false})
    @IsOptional()
    @IsString()
    place_photo: string;

    @ApiProperty({example: "Basketball court"})
    @IsNotEmpty()
    @IsString()
    place_name: string;
}