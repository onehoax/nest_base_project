import { IPermission } from "@app/entity/permission/interface/permission.interface";
import { IPermissionRepository } from "@app/entity/permission/interface/permission.repository.interface";
import { Permission } from "@app/entity/permission/repository/mongo/permission-mongo.schema";
import { MongoRepository } from "@inlaze_techlead/gannar-core";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class PermissionMongoRepository
  extends MongoRepository<IPermission>
  implements IPermissionRepository
{
  public constructor(
    @InjectModel(Permission.name) private readonly permissionModel: Model<Permission>,
  ) {
    super(permissionModel);
  }

  public async findByModuleAndMethod(module: string, method: string): Promise<IPermission | null> {
    return this.permissionModel
      .findOne({ $and: [{ module: module }, { method: method }, { isDeleted: false }] })
      .exec();
  }
}
