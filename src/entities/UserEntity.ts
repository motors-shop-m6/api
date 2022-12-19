import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class UserEntity{
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({type: "varchar", length: 100})
  name: string;

  @Column({type: "varchar", length: 127, unique: true})
  email: string;

  @Column({type: "varchar"})
  @Exclude()
  password: string;
  
  @Column({type: "varchar", length:11, unique: true})
  cpf: string;

  @Column({type: "varchar", length:11})
  phone: string;

  @Column({name: "birth_date", type: "date"})
  birthDate: string;

  @Column({type: "text"})
  description: string;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;

  // @OneToOne(()=> Address)
  // address: Address
}