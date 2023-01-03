import {
  Column,
  CreateDateColumn,
  Entity, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { AdvertisementEntity } from "./AdvertisementEntity";
import { UserEntity } from "./UserEntity";

@Entity("reviews")
export class ReviewEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "text" })
  comments: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => AdvertisementEntity, (Advertisement) => Advertisement.user)
  vehicle: AdvertisementEntity;

  @ManyToOne(() => UserEntity, (User) => User)
  user: UserEntity;
}
