import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

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

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;
}