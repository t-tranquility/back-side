import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Theory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  page: string;

  @Column({ type: 'varchar' })
  theory: string;
}
