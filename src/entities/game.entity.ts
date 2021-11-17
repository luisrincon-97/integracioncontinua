import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('money')
  price: number;

  @Column('text', { array: true })
  tags: string[];

  @Column('date')
  releaseDate: Date;
}