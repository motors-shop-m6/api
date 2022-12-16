import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("images")
export class CoverImageEntity{
  @PrimaryGeneratedColumn("uuid")
  readonly id: string

  @Column({type: "varchar"})
  image: string

  @CreateDateColumn({name: "added_at"})
  addedAt: Date;

  @UpdateDateColumn({name: "removed_at"})
  updatedAt: Date;
}