import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Coworkings } from './coworkings.entity';
import { Users } from './users.entity';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Reviews {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    type: 'int',
  })
  coworking_rating: number;

  @Column({
    name: 'date_created',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Column({
    nullable: true,
    type: 'text',
  })
  comment: string;

  //! falta respuesta coworking
  //? agregado
  @Column({
    nullable: true,
    type: 'text',
  })
  res_coworking: string;

  @Exclude()
  @ApiHideProperty()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Exclude()
  @ApiHideProperty()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'now()',
  })
  updatedAt: Date;

  // Relacion hacia users
  @ManyToOne(() => Users, (user) => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  // Relacion hacia Coworkings
  @ManyToOne(() => Coworkings, (coworking) => coworking.reviews)
  @JoinColumn({ name: 'coworking_id' })
  coworking: Coworkings;
}
