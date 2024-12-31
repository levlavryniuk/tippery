import { OmitType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class CreateJarDto {
  @IsString()
  ownerId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  minimalPrice: string;

  @IsString()
  currency: string;
}

export class CreateJarBodyDto extends OmitType(CreateJarDto, ['ownerId']) {}
