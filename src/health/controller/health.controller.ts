import { Public } from "@app/shared/decorator/public.decorator";
import { GeneralResponseDocumentation } from "@app/shared/doc/generic.doc";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

const controllerName: string = "health";

@ApiTags(`1. ${controllerName}`)
@Controller(controllerName)
@Public()
export class HealthController {
  @Get()
  @GeneralResponseDocumentation("App Health")
  public run(): string {
    return "OK";
  }
}
