import bcrypt from 'bcryptjs';
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    Index, 
    OneToMany, 
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Plant } from './plant';
import { Role } from './types';

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

    @Column("varchar", {array: true, nullable: true})
    locations?: string[];

    // @Column("json", {array: true, nullable: true})
    // locationsObj?: string[];

    @Column("varchar", { nullable: true })
    guestId?: string;

    @Column("date", { nullable: true })
    guestStartDate?: string;

    @Column("date", { nullable: true })
    guestEndDate?: string;

    @Column({
        default: 'STANDARD' as Role,
        length: 30,
      })
    role: string;

    @OneToMany(() => Plant, (plant: Plant) => plant.user.id, {
        cascade: true
    })
    plants: Plant[];
  
    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    passwordMatch(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}