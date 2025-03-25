import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { QueriesModule } from './queries/queries.module';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    QueriesModule,
  ],
  controllers: [
    
  ],
  providers: [
    
  ],
})
export class AppModule {}
