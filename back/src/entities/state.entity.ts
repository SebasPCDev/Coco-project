import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Country } from "./country.entity";
import { City } from "./city.entity";

@Entity('states')
export class State {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 10 })
    lat: string;
    
    @Column({ length: 10 })
    long: string;

    @ManyToOne(() => Country, country => country.states)
    country: Country;

    @OneToMany(() => City, city => city.state)
    cities: City[];
}