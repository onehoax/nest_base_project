import { MongoService } from "@app/shared/database/mongo/service/mongo.service";
import { Module } from "@nestjs/common";

@Module({
  providers: [MongoService],
  exports: [MongoService],
})
export class DatabaseModule {}
