import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Coworkings } from './coworkings.entity';
import { Users } from './users.entity';


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



 // Relacion hacia users 
 @ManyToOne(() => Users, (user) => user.bookings)
 @JoinColumn({ name: 'user_id' })
 user: Users

 // Relacion hacia Coworkings
 @ManyToOne(() => Coworkings, (coworking) => coworking.bookings)
 @JoinColumn({ name: 'coworking_id' })
 coworking: Coworkings
}