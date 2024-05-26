import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { State } from "./state.entity";


@Entity('cities')
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 10 })
    lat: string;
    
    @Column({ length: 10 })
    long: string;

    @ManyToOne(() => State, state => state.cities)
    state: State;

    // @OneToMany(() => Users, user => user.city)
    // user: Users[];

}