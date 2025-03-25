import { Controller } from '@nestjs/common';

import { QueriesService } from '../services/queries.service';

@Controller('queries')
export class QueriesController {

  constructor(
    private readonly queriesService: QueriesService
  ) { }
  
}
