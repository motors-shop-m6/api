import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { AddressEntity } from "./AddressEntity";
import { AdvertisementEntity } from "./AdvertisementEntity";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "varchar", length: 127, unique: true })
  email: string;

  @Column({ type: "varchar" })
  @Exclude()
  password: string;

  @Column({ type: "varchar", length: 11, unique: true })
  cpf: string;

  @Column({ type: "varchar", length: 11 })
  phone: string;

  @Column({default: "anunciante"})
  type_user: string;

  @Column({ name: "birth_date", type: "date" })
  birthDate: string;

  @Column({ type: "text" })
  description: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => AdvertisementEntity, (Advertisement) => Advertisement.user)
  vehicle: AdvertisementEntity[];

  @OneToOne(() => AddressEntity, (Address) => Address)
  @JoinColumn()
  address: AddressEntity;
}
