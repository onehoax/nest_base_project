import { PermissionController } from "@app/entity/permission/controller/permission.controller";
import { PERMISSION_REPOSITORY } from "@app/entity/permission/interface/permission.repository.interface";
import { PermissionMongoRepository } from "@app/entity/permission/repository/mongo/permission-mongo.repository";
import { PermissionModel } from "@app/entity/permission/repository/mongo/permission-mongo.schema";
import { PermissionGeneralService } from "@app/entity/permission/service/permission-general.service";
import { PermissionRefreshService } from "@app/entity/permission/service/permission-refresh.service";
import { EndPointsModule } from "@app/shared/endpoint/endpoint.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([PermissionModel]), EndPointsModule],
  exports: [PERMISSION_REPOSITORY],
  providers: [
    PermissionGeneralService,
    PermissionRefreshService,
    { provide: PERMISSION_REPOSITORY, useClass: PermissionMongoRepository },
  ],
  controllers: [PermissionController],
})
export class PermissionModule {}
