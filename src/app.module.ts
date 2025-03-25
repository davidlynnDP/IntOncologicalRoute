import { Module } from '@nestjs/common';

import { QueriesModule } from './queries/queries.module';

@Module({
  imports: [
    QueriesModule
  ],
  controllers: [
    
  ],
  providers: [
    
  ],
})
export class AppModule {}
