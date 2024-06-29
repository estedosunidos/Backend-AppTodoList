import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost:27018/nest-task',{
    dbName:'Taskdb'
  }),TaskModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
