import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetBalanceDto } from './dto/get-balance.dto';
import { TransactionCreateDto } from './dto/transaction-create.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}
  private logger = new Logger('TransactionService');

  async balanceCheckById(
    inputUserId: GetBalanceDto,
  ): Promise<{ balance: string }> {
    const { userId } = inputUserId;
    const transaction = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .andWhere(
        '(transaction.isDeleted = false AND transaction.userId = :id)',
        {
          id: userId,
        },
      )
      .select('SUM(transaction.amount)')
      .getRawMany();
    const balance = transaction[0].sum === null ? '0.00' : transaction[0].sum
    
    return { balance };
  }

  async transaction(data: TransactionCreateDto): Promise<Transaction> {
    const { amount, transactionType, email, phoneNumber, userId, description } =
      data;
    const transaction = this.transactionsRepository.create({
      amount,
      transactionType,
      email,
      phoneNumber,
      userId,
      description,
    });
    const balanceObj = await this.balanceCheckById({ userId })

    if (Number(balanceObj.balance) + Number(amount) < 0)
      this.logger.error('Your Balance is Not Enough(IMPOsiblee)');
      return ;
      
    await this.transactionsRepository.save(transaction);
    return transaction;
  }
}
