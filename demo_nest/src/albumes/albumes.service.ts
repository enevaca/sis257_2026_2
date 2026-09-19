import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumesService {
  create(createAlbumeDto: CreateAlbumDto) {
    return 'This action adds a new albume';
  }

  findAll() {
    return `This action returns all albumes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} albume`;
  }

  update(id: number, updateAlbumeDto: UpdateAlbumDto) {
    return `This action updates a #${id} albume`;
  }

  remove(id: number) {
    return `This action removes a #${id} albume`;
  }
}
