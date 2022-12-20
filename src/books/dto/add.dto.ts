import { ApiProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";

export class AddDto{
    @ApiProperty({description: 'Wed Dec 21 2022 00:19:16 GMT+0600'})
    start: Date

    @ApiProperty({description: 'Wed Dec 21 2022 00:19:16 GMT+0600'})
    end: Date
}