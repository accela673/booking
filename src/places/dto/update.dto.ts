import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdatePlaceDto{
    @ApiProperty({example: "photo path from server (can be null)", nullable: true, required: false})
    @IsOptional()
    @IsString()
    place_photo: string;

    @ApiProperty({example: "Basketball court"},)
    @IsNotEmpty()
    @IsString()
    place_name: string;
}