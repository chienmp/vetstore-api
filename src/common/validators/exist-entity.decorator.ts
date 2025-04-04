import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEntityExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [modelName, field = 'id'] = args.constraints as [string, string];

    if (!value || !this.prisma[modelName]) return false;

    try {
      const whereClause: Record<string, unknown> = { [field]: value as unknown };
      const entity = await this.prisma[modelName].findUnique({
        where: whereClause,
      });
      return Boolean(entity);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    const [modelName, field = 'id'] = args.constraints as [string, string];
    return `${modelName} with ${field} = ${args.value} does not exist`;
  }
}

export function IsEntityExists(
  model: keyof PrismaService,
  field: string = 'id',
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsEntityExists',
      target: object.constructor as ObjectConstructor,
      propertyName,
      constraints: [model, field],
      options: validationOptions,
      validator: IsEntityExistsConstraint,
    });
  };
}
