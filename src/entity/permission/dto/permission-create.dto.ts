import { PermissionDto } from "@app/entity/permission/dto/permission.dto";
import { OmitType } from "@nestjs/swagger";

export class PermissionCreateDto extends OmitType(PermissionDto, [
  "id",
  "isDeleted",
  "createdAt",
  "updatedAt",
] as const) {}
