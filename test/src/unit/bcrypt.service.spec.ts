import { BcryptService } from "@app/shared/bcrypt/service/bcrypt.service";
import { TestingModule, Test } from "@nestjs/testing";

describe("Bcrypt Service", () => {
  let bcryptService: BcryptService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
      exports: [BcryptService],
    }).compile();

    bcryptService = moduleRef.get<BcryptService>(BcryptService);
  });

  test("Hash a string", async () => {
    const unhashedString: string = "password";
    const hashedString: string = await bcryptService.hash(unhashedString);
    expect(await bcryptService.compare(unhashedString, hashedString)).toBe(true);
  });
});
