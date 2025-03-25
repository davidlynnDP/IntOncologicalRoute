import { Global, Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { DatabaseService } from './services/database.service';

@Global()
@Module({
  imports: [
    CommonModule
  ],
  providers: [
    DatabaseService
  ],
  exports: [
    DatabaseService
  ],
})
export class DatabaseModule { }
