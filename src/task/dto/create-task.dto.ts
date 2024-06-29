import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string; 

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString()
    @IsNotEmpty()
    priority: string;

    @IsDateString()
    @IsOptional() 
    createdAt?: Date;

    @IsDateString()
    @IsOptional()
    updatedAt?: Date;
}
