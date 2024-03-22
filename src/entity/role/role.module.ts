import { RoleController } from "@app/entity/role/controller/role.controller";
import { ROLE_REPOSITORY } from "@app/entity/role/interface/role.repository.interface";
import { RoleMongoRepository } from "@app/entity/role/repository/mongo/role-mongo.repository";
import { RoleModel } from "@app/entity/role/repository/mongo/role-mongo.schema";
import { RoleService } from "@app/entity/role/service/role.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([RoleModel])],
  exports: [ROLE_REPOSITORY],
  providers: [RoleService, { provide: ROLE_REPOSITORY, useClass: RoleMongoRepository }],
  controllers: [RoleController],
})
export class RoleModule {}
