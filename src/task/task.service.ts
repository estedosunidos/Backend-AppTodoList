import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './entities/task.entity';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = await this.taskModel.create(createTaskDto);
      return { task };
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException(`Task exists in DB: ${JSON.stringify(err.keyValue)}`);
      }
      throw new InternalServerErrorException('Cannot create this task - check server logs');
    }
  }

  async findAll() {
    try {
      const tasks = await this.taskModel.find();
      return tasks;
    } catch (err) {
      throw new InternalServerErrorException('Cannot retrieve tasks - check server logs');
    }
  }

  async findOne(id: string): Promise<Task> {
    try {
      const task = await this.taskModel.findById(id).exec();
      if (!task) {
        throw new Error(`Task not found`);
      }
      return task;
    } catch (error) {
      throw new Error(`Error finding task: ${error.message}`);
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const taks = await this.taskModel.findById(id).exec();
    if(!taks) {
      throw new Error(`Task not found`)
    }
    try{
      await taks.updateOne(updateTaskDto)
      return { ...taks.toJSON(), ...updateTaskDto}
    }catch(err){
      if(err.coder === 11000){
        throw new  BadRequestException(`Product exists in db ${JSON.stringify(err.keyValue)}`)
      }
      throw new InternalServerErrorException(`Can  not create Product - check server logs `)
    }    
  }

  async remove(id: string) {
    const { deletedCount} = await this.taskModel.deleteOne({_id:id})
    if(!deletedCount){
      throw new BadRequestException(`Task ${id} not already exists`)
    }
    return 


  }


}

