import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { ArtworkEntity } from './entities/artwork.entity';

@Injectable()
export class ArtworksService {
  constructor(
    @InjectRepository(ArtworkEntity)
    private readonly artworkRepository: Repository<ArtworkEntity>,
  ) {}

  findAll() {
    return this.artworkRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const artwork = await this.artworkRepository.findOne({ where: { id } });

    if (!artwork) throw new NotFoundException('Artwork not found');

    return artwork;
  }

  create(createArtworkDto: CreateArtworkDto) {
    const artwork = this.artworkRepository.create(createArtworkDto);
    return this.artworkRepository.save(artwork);
  }

  async update(id: number, updateArtworkDto: UpdateArtworkDto) {
    const artwork = await this.findOne(id);
    const updated = this.artworkRepository.merge(artwork, updateArtworkDto);
    return this.artworkRepository.save(updated);
  }

  async remove(id: number) {
    const artwork = await this.findOne(id);
    await this.artworkRepository.remove(artwork);
    return { message: 'Artwork removed' };
  }
}
