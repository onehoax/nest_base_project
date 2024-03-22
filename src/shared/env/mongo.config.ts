import { validateEnvironment } from "@inlaze_techlead/gannar-core";
import { registerAs } from "@nestjs/config";
import { Expose, Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class MongoEnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  @Expose()
  public readonly MONGO_DB_USER!: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  @Expose()
  public readonly MONGO_DB_PWD!: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  @Expose()
  public readonly MONGO_DB_HOST!: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  @Expose()
  public readonly MONGO_DB_PORT!: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  @Expose()
  public readonly MONGO_DB_NAME!: string;
}

export interface MongoEnvironment {
  readonly user: string;
  readonly pwd: string;
  readonly host: string;
  readonly port: string;
  readonly dbName: string;
  readonly uri: string;
}

export default registerAs("mongo", (): MongoEnvironment => {
  const env = validateEnvironment<MongoEnvironmentVariables>(
    process.env,
    MongoEnvironmentVariables,
  );
  const user: string = env.MONGO_DB_USER;
  const pwd: string = env.MONGO_DB_PWD;
  const host: string = env.MONGO_DB_HOST;
  const port: string = env.MONGO_DB_PORT;
  const dbName: string = env.MONGO_DB_NAME;
  const uri: string = `mongodb://${user}:${pwd}@${host}:${port}`;
  return {
    user: user,
    pwd: pwd,
    host: host,
    port: port,
    dbName: dbName,
    uri: uri,
  };
});
