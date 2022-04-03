import { Module } from '@nestjs/common';
import { JsonApiService } from './json-api.service';

@Module({
  providers: [JsonApiService],
  exports: [JsonApiService],
})
export class JsonApiModule {}
