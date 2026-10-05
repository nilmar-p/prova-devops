import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateArtworkDto {
  @ApiProperty({ example: 'Abaporu' })
  @IsString({ message: 'campo title deve ser uma string' })
  @MaxLength(255)
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ example: 'Tarsila do Amaral' })
  @IsString({ message: 'campo artist deve ser uma string' })
  @MaxLength(255)
  @IsNotEmpty()
  readonly artist: string;

  @ApiProperty({ example: 1928 })
  @IsInt({ message: 'campo year deve ser um número inteiro' })
  @Min(1)
  @Max(2100)
  readonly year: number;

  @ApiProperty({ example: 5000000 })
  @IsNumber({}, { message: 'campo price deve ser um número' })
  @Min(0)
  readonly price: number;
}
