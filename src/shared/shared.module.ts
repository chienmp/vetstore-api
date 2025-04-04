import { Module, Global } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IsEntityExistsConstraint } from '../common/validators/exist-entity.decorator';

@Global() // 👈 cho phép inject toàn app
@Module({
  providers: [PrismaService, IsEntityExistsConstraint],
  exports: [PrismaService, IsEntityExistsConstraint],
})
export class SharedModule {}
