import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task  extends Document {
    @Prop({required: true})
    title:string

    @Prop({required: true})
    description: string

    @Prop({enum:['pediente','en progreso', 'completado']})
    status: string

    @Prop({enum:['baja','media','alta'],default:'media'})
    priority: string

    @Prop({type:Date, default: Date.now})
    createdAt?:Date

    @Prop({type:Date, default: Date.now})
    updatedAt?:Date
}

export const TaskSchema =SchemaFactory.createForClass(Task)