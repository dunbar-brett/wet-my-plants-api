import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class Plant {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user: User) => user.id)
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column({length: 100})
    name: string;

    @Column({length: 100})
    species?: string;

    @Column()
    locationId: number;

    @Column({length: 2})
    waterFreq: string;

    @Column("varchar", {nullable: true})
    fertilizer?: string[];

    @Column({nullable: true})
    imageUrl?: string;

    @Column("varchar", {length: 300})
    notes?: string;


}