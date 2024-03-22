import { ILoginLog } from "@app/entity/login-log/interface/login-log.interface";
import { BaseDto } from "@inlaze_techlead/gannar-core";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginLogDto extends BaseDto implements ILoginLog {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User id",
    type: String,
    required: true,
    example: "65b26bb3efd4af019cfade9c",
  })
  public userId!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Ip address",
    type: String,
    required: true,
    example: "101.188.67.134",
  })
  public ipAddress!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User agent",
    type: String,
    required: true,
    example: "Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion",
  })
  public userAgent!: string;
}
