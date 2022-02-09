import { 
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class Plant {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user: User) => user.plants)
    @JoinColumn()
    user: User;

    @Column({length: 100})
    name: string;

    @Column({length: 100, nullable: true})
    species?: string;

    @Column()
    locationId: number;

    @Column({length: 2, nullable: true})
    waterFreq?: string;

    @Column("varchar", {nullable: true})
    fertilizer?: string[];

    @Column({nullable: true})
    imageUrl?: string;

    @Column("varchar", {length: 300})
    notes?: string;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;
}