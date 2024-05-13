import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { CoworkingStatus } from 'src/models/coworkingStatus.enum';
import { Amenities } from './amenities.entity';

@Entity('coworkings')
export class Coworkings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'time' })
  open: Date;

  @Column({ type: 'time' })
  close: Date;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  country: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  state?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lat: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  long: string;

  @Column({ type: 'int' })
  capacity: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  message: string;

  @Column({
    type: 'enum',
    enum: CoworkingStatus,
    default: CoworkingStatus.PENDING,
  })
  status: CoworkingStatus;

  @Column({ type: 'varchar', length: 255, nullable: true })
  thumbnail?: string;

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @CreateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToMany(() => Amenities, (amenities) => amenities.coworkings, {
    nullable: true,
  })
  @JoinTable({
    name: 'amenities_coworkings',
    joinColumn: {
      name: 'coworking_id', // Relación con la entidad donde estas situado.
    },
    inverseJoinColumn: {
      name: 'amenitie_id', // Relación con la otra entidad.
    },
  })
  amenitie: Amenities[];

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

  @ManyToOne(() => Coworkings, (coworking) => coworking.images)
  @JoinColumn({ name: 'coworking_id' })
  images: Coworkings[];
}
