import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BankQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'boolean' })
  correctAnswer: boolean;
}
