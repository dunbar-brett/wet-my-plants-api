import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Plant } from './plant';

import { User } from './user';

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user: User) => user.locations)
    @JoinColumn()
    user: User;

    @Column({length: 100})
    name: string;

    @ManyToMany(() => Plant)
    @JoinTable()
    plants?: Array<Plant>;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;
}