import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { State } from './state.entity';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 50 })
  lat: string;

  @Column({ length: 50 })
  long: string;

  @ManyToOne(() => State, (state) => state.cities)
  state: State;

  // @OneToMany(() => Users, user => user.city)
  // user: Users[];
}
