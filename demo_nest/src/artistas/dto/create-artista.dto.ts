import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateArtistaDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El nombres es obligatorio' })
  @IsString({ message: 'El nombre debe ser de tipo cadena' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value == 'string' ? value.trim() : value))
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La nacionalidad es obligatorio' })
  @IsString({ message: 'La nacionalidad debe ser de tipo cadena' })
  @MaxLength(25, { message: 'La nacionalidad no puede tener más de 25 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value == 'string' ? value.trim() : value))
  readonly nacionalidad: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La fotografia es obligatorio' })
  @IsString({ message: 'La fotografia debe ser de tipo cadena' })
  @MaxLength(800, { message: 'La fotografia no puede tener más de 800 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value == 'string' ? value.trim() : value))
  readonly fotografia: string;
}
