import { Global, Module } from '@nestjs/common';

import { LogFormatterService } from './services/log-formatter.service';

@Global()
@Module({
  providers: [
    LogFormatterService,
  ],
  exports: [
    LogFormatterService,
  ]
})
export class CommonModule {}
