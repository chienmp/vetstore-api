import { Injectable } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { paginate } from '../common/utils/prisma-pagination.util';

@Injectable()
export class ManufacturersService {
  constructor(private prisma: PrismaService) {}
  create(data: CreateManufacturerDto) {
    return this.prisma.manufacturer.create({ data });
  }

  async findAll(
    filters: { name?: string; address?: string; phone?: string },
    pagination: { page: number; limit: number },
  ) {
    const where = {
      ...(filters.name && { name: { contains: filters.name, mode: 'insensitive' } }),
      ...(filters.address && { address: { contains: filters.address, mode: 'insensitive' } }),
      ...(filters.phone && { phone: { contains: filters.phone, mode: 'insensitive' } }),
    };

    return paginate(this.prisma.manufacturer, {
      page: pagination.page,
      limit: pagination.limit,
      where,
      orderBy: { name: 'asc' },
      include: { products: true },
    });
  }

  findOne(id: number) {
    return this.prisma.manufacturer.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  update(id: number, data: UpdateManufacturerDto) {
    return this.prisma.manufacturer.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.manufacturer.delete({ where: { id } });
  }
}
