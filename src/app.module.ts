import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { envSchema } from "./env";
import { AuthModule } from "./auth/auth.module";
import { PrismaService } from "./prisma/prisma.service";

import { AuthenticatedController } from "./controllers/authenticated.controller";
import { CreateAccountController } from "./controllers/create-account.controller";
import { CreateQuestionsController } from "./controllers/create-question.controller";

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: (env) => envSchema.parse(env),
            isGlobal: true,
        }),
        AuthModule,
    ],
    controllers: [
        CreateAccountController,
        AuthenticatedController,
        CreateQuestionsController,
    ],
    providers: [PrismaService],
    exports: [],
})
export class AppModule {}
