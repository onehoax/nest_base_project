import { IUser } from "@app/entity/user/interface/user.interface";
import { IUserRepository } from "@app/entity/user/interface/user.repository.interface";
import { User } from "@app/entity/user/repository/mongo/user-mongo.schema";
import { MongoRepository } from "@inlaze_techlead/gannar-core";
import { InjectModel } from "@nestjs/mongoose";
import { UpdateWriteOpResult, Model } from "mongoose";

export class UserMongoRepository extends MongoRepository<IUser> implements IUserRepository {
  public constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }

  public async findByUsernameOrEmail(userName?: string, email?: string): Promise<IUser | null> {
    return this.userModel
      .findOne({
        $and: [{ $or: [{ userName: userName }, { email: email }] }, { isDeleted: false }],
      })
      .exec();
  }

  public async updateRefreshToken(id: string, token: string): Promise<number> {
    return this.userModel
      .updateOne({ _id: id }, { $set: { refreshToken: token } })
      .exec()
      .then((result: UpdateWriteOpResult): number => result.modifiedCount);
  }

  public async updateLastLogin(id: string): Promise<number> {
    return this.userModel
      .updateOne({ _id: id }, { $set: { lastLogin: new Date() } })
      .exec()
      .then((result: UpdateWriteOpResult): number => result.modifiedCount);
  }

  // TODO - mv to mongo repo
  public async getCount(filter: {}): Promise<number> {
    return this.userModel.countDocuments(filter).exec();
  }
}
