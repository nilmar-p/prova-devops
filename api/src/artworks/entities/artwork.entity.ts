import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'artworks' })
export class ArtworkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  artist: string;

  @Column({ type: 'int' })
  year: number;

  // decimal volta como string do Postgres, o transformer converte para number
  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  price: number;
}
