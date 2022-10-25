import { IsNotEmpty, IsUUID } from "class-validator";

export class GetBalanceDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;
  }