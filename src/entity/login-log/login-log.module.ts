import { LoginLogController } from "@app/entity/login-log/controller/login-log.controller";
import { LOGIN_LOG_REPOSITORY } from "@app/entity/login-log/interface/login-log.repository.interface";
import { LoginLogMongoRepository } from "@app/entity/login-log/repository/mongo/login-log-mongo.repository";
import { LoginLogModel } from "@app/entity/login-log/repository/mongo/login-log-mongo.schema";
import { LoginLogService } from "@app/entity/login-log/service/login-log.service";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([LoginLogModel])],
  exports: [LOGIN_LOG_REPOSITORY],
  providers: [
    LoginLogService,
    { provide: LOGIN_LOG_REPOSITORY, useClass: LoginLogMongoRepository },
  ],
  controllers: [LoginLogController],
})
export class LoginLogModule {}
