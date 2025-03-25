import { Module } from '@nestjs/common';

import { QueriesController } from './controllers/queries.controller';
import { QueriesService } from './services/queries.service';

@Module({
  controllers: [
    QueriesController,
  ],
  providers: [
    QueriesService,
  ],
  exports: [
    QueriesService,
  ],
})
export class QueriesModule {}
