import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
export class AddressEntity {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 8 })
  cep: string;

  @Column({ type: "varchar", length: 2 })
  state: string;

  @Column({ type: "varchar", length: 20 })
  city: string;

  @Column({ type: "varchar", length: 127 })
  street: string;

  @Column({ type: "varchar", length: 10 })
  number: string;

  @Column({ type: "varchar", length: 20 })
  complement: string;
}
