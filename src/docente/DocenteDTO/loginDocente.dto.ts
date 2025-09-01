import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDocenteDto {
  @ApiProperty({ example: 12345678, description: 'DNI del docente' })
  @IsInt()
  @IsNotEmpty()
  dni: number;

  @ApiProperty({ example: 'asdf1234', description: 'Contraseña del docente' })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}
