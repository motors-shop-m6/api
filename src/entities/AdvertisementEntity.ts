import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ImageEntity } from "./ImageEntity";
import { ReviewEntity } from "./ReviewEntity";
import { UserEntity } from "./UserEntity";

@Entity("advertisements")
export class AdvertisementEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 127 })
  title: string;

  @Column({ type: "varchar", length: 4 })
  year: string;

  @Column({ type: "varchar", length: 6 })
  km: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ type: "text" })
  description: string;

  @Column({ name: "type_of_vehicle", length: 5, default: "carro" })
  typeOfVehicle: string;

  @Column({ name: "is_active", default: "true" })
  isActive: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column({name: "cover_image", type: "text"})
  coverImage: string;

  @ManyToOne(() => UserEntity)
  @Exclude()
  user: UserEntity;

  @OneToMany(() => ImageEntity, (Image) => Image.advertisement)
  image: ImageEntity[];

  @OneToMany(() => ReviewEntity, (Review) => Review)
  review: ReviewEntity[];
}
