import { IsString, IsOptional } from 'class-validator';

export class CreateManufacturerDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
