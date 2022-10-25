import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TransactionType } from '../../enum/transaction-type.enum';

export class TransactionCreateDto {
  @IsNotEmpty()
  amount: string;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  transactionType: TransactionType;

  @IsOptional()
  email: string;

  @IsOptional()
  phoneNumber: string;

  @IsNotEmpty()
  userId: string;

  @IsOptional()
  description: string;
}
