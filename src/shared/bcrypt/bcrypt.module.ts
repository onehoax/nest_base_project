import { BcryptService } from "@app/shared/bcrypt/service/bcrypt.service";
import { Module } from "@nestjs/common";

@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}
