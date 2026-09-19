import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGeneroDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'La descripcions es obligatorio' })
  @IsString({ message: 'La descripcion debe ser de tipo cadena' })
  @MaxLength(25, { message: 'La descripcion no puede tener más de 25 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value == 'string' ? value.trim() : value))
  readonly descripcion: string;
}
