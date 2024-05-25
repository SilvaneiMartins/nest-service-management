import { Module } from "@nestjs/common";

import { DatabaseModule } from "../database/database.module";

import { CreateAccountController } from "./controllers/create-account.controller";
import { AuthenticatedController } from "./controllers/authenticated.controller";
import { CreateQuestionsController } from "./controllers/create-question.controller";
import { FetchRecentQuestionsController } from "./controllers/fetch-recent-questions.controller";

import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions";

@Module({
    imports: [DatabaseModule],
    controllers: [
        CreateAccountController,
        AuthenticatedController,
        CreateQuestionsController,
        FetchRecentQuestionsController,
    ],
    providers: [CreateQuestionUseCase, FetchRecentQuestionsUseCase],
})
export class HttpModule {}
