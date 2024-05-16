import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        
        // Retira os logs do terminal no momento de execução
        // logger: false
    });

    await app.listen(3333);
}

bootstrap();
