import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGeographyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lat: string;

  @IsString()
  @IsNotEmpty()
  long: string;
}

export class UpdateGeographyDto extends PartialType(CreateGeographyDto) {}

export class CreateStateDto extends CreateGeographyDto {
  @IsNumber()
  @IsNotEmpty()
  countryId: number;
}

export class CreateCityDto extends CreateGeographyDto {
  @IsNumber()
  @IsNotEmpty()
  stateId: number;
}
