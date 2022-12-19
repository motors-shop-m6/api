import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CoverImageEntity } from "./CoverImageEntity";
import { UserEntity } from "./UserEntity";

@Entity("advertisements")
export class AdvertisementEntity{
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({type: "varchar", length: 127})
  title: string;

  @Column({type: "varchar", length: 4})
  year: string;
  
  @Column({type: "varchar", length:6})
  km: string;

  @Column({type: "decimal", precision:10, scale:2, default:0})
  price: number;

  @Column({type: "text"})
  description: string;

  @Column({name: "type_of_vehicle"})
  typeOfVehicle: boolean;

  @Column({name: "is_active", default: "true"})
  isActive: boolean;

  @CreateDateColumn({name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({name: "updated_at"})
  updatedAt: Date;

  @ManyToOne(()=> UserEntity)
  @Exclude()
  user: UserEntity; 

  @OneToMany(()=> CoverImageEntity, (CoverImage)=> CoverImage.advertisement)
  coverImage: CoverImageEntity[];
}