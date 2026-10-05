import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtworksController } from './artworks.controller';
import { ArtworksService } from './artworks.service';
import { ArtworkEntity } from './entities/artwork.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtworkEntity])],
  controllers: [ArtworksController],
  providers: [ArtworksService],
})
export class ArtworksModule {}
