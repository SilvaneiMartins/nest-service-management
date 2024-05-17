import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

import { Env } from "@/infra/env";
import { AppModule } from "@/infra/app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        // Retira os logs do terminal no momento de execução
        // logger: false
    });

    const configService = app.get<ConfigService<Env, true>>(ConfigService);
    const port = configService.get("PORT", { infer: true });

    await app.listen(port);
}

bootstrap();
