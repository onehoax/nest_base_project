import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class BcryptService {
  private readonly rounds: number = 10;

  public async hash(input: string): Promise<string> {
    return bcrypt.hash(input, this.rounds);
  }

  public async compare(unHashed: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(unHashed, hashed);
  }
}
