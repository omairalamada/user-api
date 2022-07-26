import { UserRoles } from './../../auth/user-roles';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'enum', enum: UserRoles, default: UserRoles.User}) 
    roles: UserRoles;

    @Column({ name: 'first_name', type: "varchar" })
    firstName: string

    @Column({ name: 'last_name', type: "varchar" })
    lastName: string
    
    @Column({ name: 'address'})
    address: string

    @Column({ name: 'post_code', nullable: true})
    postCode: string

    @Column({ name: 'contact_number', nullable: true})
    contactNumber: string
    
    @Column({ name: 'email_address'})
    email: string

    @Column({unique: true, name: 'username'})
    username: string

    @Column({ name: 'password' })
    password: string
}