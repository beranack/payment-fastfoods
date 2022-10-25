import { DefaultEntity } from 'src/common/default.entity';
import { TransactionType } from 'src/enum/transaction-type.enum';
import { Column, Entity } from 'typeorm';

@Entity()
export class Transaction extends DefaultEntity {
  @Column({ nullable: false, type: 'decimal', precision: 10, scale : 2 })
  amount: string;

  @Column({nullable: false, type: 'enum', enum : TransactionType})
  transactionType: TransactionType; 

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: false, type: 'uuid' })
  userId: string;

  @Column({ nullable: false, type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  description: string;
  
}
