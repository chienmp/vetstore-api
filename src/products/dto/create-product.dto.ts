import { IsEnum, IsOptional, IsString, IsNumber } from 'class-validator';
import { ProductType } from './product-type.enum';
import { IsEntityExists } from 'src/common/validators/exist-entity.decorator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsEnum(ProductType)
  type: ProductType;

  @IsString()
  unit: string;

  @IsNumber()
  retailPrice: number;

  @IsNumber()
  wholesalePrice: number;

  @IsOptional()
  @IsNumber()
  retailPricePerKg?: number;

  @IsNumber()
  stock: number;

  @IsEntityExists('manufacturer', 'id', { message: 'Không tìm thấy nhà sản xuất' })
  manufacturerId: number;
}
