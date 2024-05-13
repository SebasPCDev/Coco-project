import { Exclude } from 'class-transformer';

import { StatusRequest } from 'src/models/statusRequest.enum';
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
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  lastname: string;

  @Column({
    type: 'varchar',
    length: 15
  })
  phone: string;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  identification: string;

  @Column({
    type: 'varchar',
  })
  position: string;

  @Column({
    type: 'varchar',
  })
  companyName: string;

  @Column({
    type: 'varchar',
  })
  companyEmail: string;

  @Column({
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
    enum: StatusRequest,
    default: StatusRequest.PENDING,
  })
  status: StatusRequest;

  @Column({
    nullable: true,
    type: 'text',
  })
  observation: string;

  @Column({
    type: 'enum',
    enum: TypeCompany,
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
