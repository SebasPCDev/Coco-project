import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Employees } from './employees.entity';
import { CompanySize } from 'src/models/companySize.enum';
import { CompanyStatus } from 'src/models/companyStatus.enum';

@Entity('companies')
export class Companies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 150 })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Column({ type: 'int', name: 'quantity_beneficiaries' })
  quantityBeneficiaries: number;

  @Column({ type: 'varchar', name: 'business_sector', length: 150 })
  businessSector: string;

  @Column({ type: 'enum', enum: CompanySize })
  size: CompanySize;

  @Column({ type: 'int', nullable: true })
  total_passes: number;

  @Column({
    type: 'enum',
    enum: CompanyStatus,
    default: CompanyStatus.PENDING,
  })
  status: CompanyStatus;

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

  @OneToMany(() => Employees, (employee) => employee.company, {
    nullable: true,
  })
  employees: Employees[];
}
