import { Exclude } from 'class-transformer';

import { CoworkingStatus } from 'src/models/coworkingStatus.enum';
import { TypeCompany } from 'src/models/typeCompany.enum';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({
  name: 'requests',
})
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  name: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  lastname: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  phone: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  email: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  identification: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  position: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  companyName: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  companyEmail: string;

  @Column({
    nullable: false,
    type: 'varchar',
  })
  companyPhone: string;

  @Column({
    nullable: true,
    type: 'int',
  })
  quantityBeneficiaries: number;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  businessSector: string;

  @Column({
    nullable: true,
    type: 'int',
  })
  size: number;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  address: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  website: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  open: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  close: string;

  @Column({
    nullable: true,
    type: 'int',
  })
  capacity: number;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  message: string;

  @Column({
    type: 'enum',
    enum: CoworkingStatus,
    default: CoworkingStatus.PENDING,
  })
  status: CoworkingStatus;

  @Column({
    nullable: false,
    type: 'text',
  })
  observation: string;

  @Column({
    type: 'enum',
    enum: TypeCompany,
    nullable: false,
  })
  type: TypeCompany;

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
}
