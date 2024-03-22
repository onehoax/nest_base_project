import { TestingModule, Test } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "@app/app/app.module";
import { EnvironmentEnum } from "@inlaze_techlead/gannar-core";

describe("App Controller (e2e)", () => {
  let app: INestApplication;

  process.env.NODE_ENV = EnvironmentEnum.TEST;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test("/health (GET)", async () => {
    expect((await request(app.getHttpServer()).get("/health")).status).toBe(200);
  });
});
