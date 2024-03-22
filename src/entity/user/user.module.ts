import { UserController } from "@app/entity/user/controller/user.controller";
import { USER_REPOSITORY } from "@app/entity/user/interface/user.repository.interface";
import { UserMongoRepository } from "@app/entity/user/repository/mongo/user-mongo.repository";
import { UserModel } from "@app/entity/user/repository/mongo/user-mongo.schema";
import { UserService } from "@app/entity/user/service/user.service";
import { BcryptModule } from "@app/shared/bcrypt/bcrypt.module";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([UserModel]), BcryptModule],
  exports: [USER_REPOSITORY],
  providers: [UserService, { provide: USER_REPOSITORY, useClass: UserMongoRepository }],
  controllers: [UserController],
})
export class UserModule {}
