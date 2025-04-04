import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { paginate } from 'src/common/utils/prisma-pagination.util';
@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProductDto) {
    return this.prisma.product.create({ data });
  }

  async findAll(
    filters: { name?: string; type?: string; manufacturerId?: number },
    pagination: { page: number; limit: number },
  ) {
    const where = {
      ...(filters.name && { name: { contains: filters.name, mode: 'insensitive' } }),
      ...(filters.type && { type: filters.type }),
      ...(filters.manufacturerId && { manufacturerId: filters.manufacturerId }),
    };

    return paginate(this.prisma.product, {
      page: pagination.page,
      limit: pagination.limit,
      where,
      orderBy: { name: 'asc' },
      include: { manufacturer: true },
    });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
