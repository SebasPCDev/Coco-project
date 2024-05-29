import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { State } from './state.entity';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 50 })
  lat: string;

  @Column({ length: 50 })
  long: string;

  @OneToMany(() => State, (state) => state.country)
  states: State[];
}
