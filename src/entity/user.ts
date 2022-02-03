import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column({length: 100})
    email: string;

    @Column()
    password: string;

    @Column("varchar", {array: true}) // this might break
    locations: string[];

    @Column("varchar")
    guestId: string;

    @Column("date")
    guestStartDate: string;

    @Column("date")
    guestEndDate: string;

    @Column("text")
    role: string;
}