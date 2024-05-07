import { Exclude } from 'class-transformer';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
  } from 'typeorm';
  
  
  @Entity({
    name: 'REQUESTS',
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
    role: string;
  
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
        type: 'time',
    })
    open: string;
  
    @Column({
        nullable: true,
        type: 'time',
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
        nullable: false,
        type: 'varchar',
    })
    status: string;
  
    @Column({
        nullable: false,
        type: 'text',
    })
    observation: string;
    @Column({
        nullable: false,
        type: 'varchar',
    })
    type: string;

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
  
   
  }