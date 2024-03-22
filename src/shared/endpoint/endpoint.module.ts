import { EndPointsService } from "@app/shared/endpoint/service/endpoint.service";
import { Module } from "@nestjs/common";

@Module({
  providers: [EndPointsService],
  exports: [EndPointsService],
})
export class EndPointsModule {}
