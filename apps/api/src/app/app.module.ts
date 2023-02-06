import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '../environments/environment';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    MoviesModule,
    MongooseModule.forRoot(environment.mongoConnectionString),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
