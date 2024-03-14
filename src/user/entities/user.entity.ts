import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Sun } from 'src/suns/entities/sun.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;
  /*
  @OneToOne((type) => Sun, (sun) => sun.username)
  suns: Sun[]; //перенести в солнышки
  */
}
