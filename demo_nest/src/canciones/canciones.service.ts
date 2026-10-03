import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCancionDto } from './dto/create-cancion.dto';
import { UpdateCancionDto } from './dto/update-cancion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cancion } from './entities/cancion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CancionesService {
  constructor(@InjectRepository(Cancion) private cancionRepository: Repository<Cancion>) {}

  async create(createCancionDto: CreateCancionDto): Promise<Cancion> {
    let cancion = await this.cancionRepository.findOneBy({
      idAlbum: createCancionDto.idAlbum,
      nombre: createCancionDto.nombre,
    });
    if (cancion) throw new ConflictException('La canción ya existe en el álbum');

    cancion = new Cancion();
    Object.assign(cancion, createCancionDto);
    return this.cancionRepository.save(cancion);
  }

  async findAll(): Promise<Cancion[]> {
    // return this.cancionRepository.find({
    //   select: {
    //     id: true,
    //     nombre: true,
    //     duracion: true,
    //     tags: true,
    //     url: true,
    //     album: { id: true, nombre: true, artista: { nombre: true, fotografia: true } },
    //     genero: { id: true, descripcion: true },
    //   },
    //   relations: { album: { artista: true }, genero: true },
    //   order: { nombre: 'ASC' },
    // });
    return this.cancionRepository
      .createQueryBuilder('canciones')
      .innerJoin('canciones.album', 'album')
      .innerJoin('album.artista', 'artista')
      .innerJoin('canciones.genero', 'genero')
      .select([
        'canciones.id',
        'canciones.nombre',
        'canciones.duracion',
        'canciones.tags',
        'canciones.url',
        'album.id',
        'album.nombre',
        'artista.nombre',
        'artista.fotografia',
        'genero.id',
        'genero.descripcion',
      ])
      .orderBy('canciones.nombre', 'ASC')
      .getMany();
  }

  async findOne(id: number): Promise<Cancion> {
    const cancion = await this.cancionRepository.findOne({
      where: { id },
      relations: { album: { artista: true }, genero: true },
    });
    if (!cancion) throw new NotFoundException(`La canción con id ${id} no existe`);
    return cancion;
  }

  async update(id: number, updateCancionDto: UpdateCancionDto): Promise<Cancion> {
    const cancion = await this.findOne(id);
    Object.assign(cancion, updateCancionDto);
    return this.cancionRepository.save(cancion);
  }

  async remove(id: number): Promise<Cancion> {
    const cancion = await this.findOne(id);
    return this.cancionRepository.softRemove(cancion);
  }
}
