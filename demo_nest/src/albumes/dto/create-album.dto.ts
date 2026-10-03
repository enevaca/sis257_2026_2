import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsDefined, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsDefined({ message: 'El id del artista es obligatorio' })
  @IsInt({ message: 'El id del artista debe ser tipo numérico' })
  readonly idArtista: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser de tipo cadena' })
  @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value == 'string' ? value.trim() : value))
  readonly nombre: string;

  @ApiProperty()
  @IsDefined({ message: 'La fecha de lanzamiento es obligatoria' })
  @IsDateString({}, { message: 'La fecha de lanzamiento debe ser de tipo fecha' })
  readonly fechaLanzamiento: Date;
}
