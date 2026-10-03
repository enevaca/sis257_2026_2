import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Artista } from '../../artistas/entities/artista.entity';
import { Cancion } from '../../canciones/entities/cancion.entity';

@Entity('albumes')
export class Album {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('integer', { name: 'id_artista' })
  idArtista: number;

  @Column('varchar', { length: '50' })
  nombre: string;

  @Column('date', { name: 'fecha_lanzamiento' })
  fechaLanzamiento: Date;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @ManyToOne(() => Artista, artista => artista.albumes)
  @JoinColumn({ name: 'id_artista', referencedColumnName: 'id' })
  artista: Artista;

  @OneToMany(() => Cancion, cancion => cancion.album)
  canciones: Cancion[];
}
