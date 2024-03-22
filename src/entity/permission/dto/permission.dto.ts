import { IPermission } from "@app/entity/permission/interface/permission.interface";
import { BaseDto } from "@inlaze_techlead/gannar-core";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PermissionDto extends BaseDto implements IPermission {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Module",
    type: String,
    required: true,
    example: "user",
  })
  public module!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Path",
    type: String,
    required: true,
    example: "/api/user",
  })
  public path!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Method",
    type: String,
    required: true,
    example: "get",
  })
  public method!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Description",
    type: String,
    required: true,
    example: "View user(s)",
  })
  public description!: string;
}
