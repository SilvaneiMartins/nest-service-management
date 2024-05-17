import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { envSchema } from "@/infra/env";
import { HttpModule } from "./http/http.module";
import { AuthModule } from "@/infra/auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            validate: (env) => envSchema.parse(env),
            isGlobal: true,
        }),
        AuthModule,
        HttpModule,
    ],
})
export class AppModule { }
