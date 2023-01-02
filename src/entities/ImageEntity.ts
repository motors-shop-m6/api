import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { AdvertisementEntity } from "./AdvertisementEntity";

@Entity("images")
export class ImageEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar" })
  image: string;

  @CreateDateColumn({ name: "added_at" })
  addedAt: Date;

  @UpdateDateColumn({ name: "removed_at" })
  updatedAt: Date;

  @ManyToOne(() => AdvertisementEntity)
  advertisement: AdvertisementEntity;
}
