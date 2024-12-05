import { IsOptional, IsString } from "class-validator";

export class PutDocenteRequestDTO {

@IsString()
@IsOptional()
nombre: string;

@IsString()
@IsOptional()
apellido?: string;

email?: string;

dni?: number;

password?: string;
}