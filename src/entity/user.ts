import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Index(["email"], { unique: true })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column({length: 100})
    email: string;

    @Column()
    password: string;

    @Column("varchar", {array: true, nullable: true}) // this might break
    locations?: string[];

    @Column("varchar", { nullable: true })
    guestId?: string;

    @Column("date", { nullable: true })
    guestStartDate?: string;

    @Column("date", { nullable: true })
    guestEndDate?: string;

    @Column("text")
    role: string;
}