import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { State } from './state.entity';
import { Exclude, Expose } from 'class-transformer';

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

  @Exclude()
  @ManyToOne(() => State, (state) => state.cities)
  state: State;

  @Expose()
  get stateId() {
    return this.state.id
  }

  // @OneToMany(() => Users, user => user.city)
  // user: Users[];
}
