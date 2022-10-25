import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetBalanceDto } from './dto/get-balance.dto';
import { TransactionCreateDto } from './dto/transaction-create.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
    constructor(
    private transactionService: TransactionsService
    ){}
    
    
    @Get('/:id')
    async balanceCheckById(@Param() userId:GetBalanceDto):Promise<{balance:string}>{
      return this.transactionService.balanceCheckById(userId);  
    }

    @Post()
    async transaction(@Body() data: TransactionCreateDto): Promise<Transaction> {
        return this.transactionService.transaction(data);
    }

}
