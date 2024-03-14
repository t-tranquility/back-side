import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Sun {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'number', length: 255 })
  suns: number;
}
