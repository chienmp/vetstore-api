import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ProductsController } from './products/products.controller';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductsModule, ManufacturersModule, SharedModule, AuthModule],
  controllers: [AppController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
