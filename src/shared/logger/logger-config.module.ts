import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import {
  LOGGER_CONFIG_REPOSITORY,
  LoggerConfigMongo,
  LoggerConfigMongoModel,
} from "@inlaze_techlead/inlaze-common";

@Module({
  imports: [MongooseModule.forFeature([LoggerConfigMongoModel])],
  providers: [
    {
      provide: LOGGER_CONFIG_REPOSITORY,
      useClass: LoggerConfigMongo,
    },
  ],
  exports: [LOGGER_CONFIG_REPOSITORY],
})
export class LoggerConfigModule {}
