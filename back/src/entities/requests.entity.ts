import { Exclude } from 'class-transformer';
import { CompanySize } from 'src/models/companySize.enum';

import { StatusRequest } from 'src/models/statusRequest.enum';
import { CompanyType } from 'src/models/companyType.enum';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';

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
    length: 15,
  })
  phone: string;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  position: string;

  @Column({
    type: 'varchar',
  })
  companyName: string;

  /////////////////
  //   COMPANY   //
  /////////////////

  @Column({ type: 'enum', enum: CompanySize, nullable: true })
  size: CompanySize;

  ///////////////////
  //   COWORKING   //
  ///////////////////

  @Column({
    type: 'varchar',
    nullable: true,
  })
  identification: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  companyEmail: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  companyPhone: string;

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

  /////////
  // ALL //
  /////////

  @CreateDateColumn({
    name: 'date_created',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dateCreated: Date;

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
    enum: CompanyType,
  })
  type: CompanyType;

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
}
