import bcrypt from 'bcryptjs';
import { 
    Column, 
    CreateDateColumn, 
    Entity,
    OneToMany, 
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Plant } from './plant';
import { Role } from './types';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    // TODO create a location entity
    @Column("varchar", {array: true, nullable: true})
    locations?: string[];

    @Column("varchar", { nullable: true })
    guestId?: string;

    @Column("date", { nullable: true })
    guestStartDate?: string;

    @Column("date", { nullable: true })
    guestEndDate?: string;

    @Column({
        default: 'USER' as Role,
        length: 30,
      })
    role: string;

    @OneToMany(() => Plant, (plant: Plant) => plant.user)
    plants: Array<Plant>;
  
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