import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCancionDto {
  @ApiProperty()
  @IsDefined({ message: 'El id del álbum es obligatorio' })
  @IsInt({ message: 'El id del álbum debe ser tipo numérico' })
  readonly idAlbum: number;

  @ApiProperty()
  @IsDefined({ message: 'El id del género es obligatorio' })
  @IsInt({ message: 'El id del género debe ser tipo numérico' })
  readonly idGenero: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser de tipo cadena' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value == 'string' ? value.trim() : value))
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La duración es obligatoria' })
  @IsString({ message: 'La duración debe ser de tipo cadena' })
  @MaxLength(8, { message: 'La duración no puede tener más de 8 caracteres' })
  readonly duracion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Los tags son obligatorios' })
  @IsString({ message: 'Los tags deben ser de tipo cadena' })
  @MaxLength(50, { message: 'Los tags no pueden tener más de 50 caracteres' })
  readonly tags: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La URL es obligatoria' })
  @IsString({ message: 'La URL debe ser de tipo cadena' })
  @MaxLength(250, { message: 'La URL no puede tener más de 250 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value == 'string' ? value.trim() : value))
  readonly url: string;
}
