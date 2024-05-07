import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { CoworkingStatus } from 'src/models/coworkingStatus.enum';

@Entity('coworkings')
export class Coworkings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 10 })
  phone: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'time' })
  open: Date;

  @Column({ type: 'time' })
  close: Date;

  @Column({ type: 'varchar', length: 250 })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lat: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  long: string;

  @Column({ type: 'int' })
  capacity: number;

  @Column({
    type: 'enum',
    enum: CoworkingStatus,
    default: CoworkingStatus.PENDING,
  })
  status: CoworkingStatus;

  @Column({ type: 'varchar', length: 255 })
  thumbnail: string;

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createddAt: Date;

  @Exclude()
  @CreateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToMany(() => Users, (user) => user.coworkings, { nullable: true })
  @JoinTable({
    name: 'users_coworkings',
    joinColumn: {
      name: 'coworking_id', // Relación con la entidad donde estas situado.
    },
    inverseJoinColumn: {
      name: 'user_id', // Relación con la otra entidad.
    },
  })
  user: Users[];
}
