import { getEnvFilePath } from "@inlaze_techlead/gannar-core";
import { MongoService } from "@app/shared/database/mongo/service/mongo.service";
import { mongoConfig } from "@app/shared/env";
import { TestingModule, Test } from "@nestjs/testing";
import { ConfigService, ConfigModule as NestConfigModule } from "@nestjs/config";
import { EnvVarInterface } from "@app/shared/env/env.var.interface";

describe("Mongo Service", () => {
  let mongoService: MongoService;
  const configService = new ConfigService<EnvVarInterface, true>();

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        NestConfigModule.forRoot({
          envFilePath: getEnvFilePath("env/"),
          load: [mongoConfig],
        }),
      ],
      providers: [MongoService],
      exports: [MongoService],
    }).compile();

    mongoService = moduleRef.get<MongoService>(MongoService);
  });

  test("Mongo connection", () => {
    const user: string = configService.get("MONGO_DB_USER");
    const pwd: string = configService.get("MONGO_DB_PWD");
    const host: string = configService.get("MONGO_DB_HOST");
    const port: string = configService.get("MONGO_DB_PORT");
    const db: string = configService.get("MONGO_DB_NAME");
    expect(mongoService.gannarDbConfig).toEqual({
      maxPoolSize: 5,
      uri: `mongodb://${user}:${pwd}@${host}:${port}`,
      dbName: `${db}`,
    });
  });
});
