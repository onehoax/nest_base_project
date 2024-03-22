import { IPermission } from "@app/entity/permission/interface/permission.interface";
import { IRole } from "@app/entity/role/interface/role.interface";
import { BaseDto } from "@inlaze_techlead/gannar-core";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class RoleDto extends BaseDto implements IRole {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Slug",
    type: String,
    required: true,
    example: "admin-role",
  })
  public slug!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "name",
    type: String,
    required: true,
    example: "Administrator",
  })
  public name!: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({
    description: "Permission[s]",
    type: Array,
    required: true,
    example: ["24124124", "23874612"],
  })
  public permissions!: IPermission[];
}
