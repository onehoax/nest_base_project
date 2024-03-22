import { PermissionCreateDto } from "@app/entity/permission/dto/permission-create.dto";
import { PartialType } from "@nestjs/swagger";

export class PermissionUpdateDto extends PartialType(PermissionCreateDto) {}
