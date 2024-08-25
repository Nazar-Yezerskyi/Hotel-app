import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("services", { schema: "Hotel_DB" })
export class Services {
  @PrimaryGeneratedColumn({ type: "int", name: "idservices" })
  idservices: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("varchar", { name: "description", length: 300 })
  description: string;

  @Column("int", { name: "term_in_month" })
  termInMonth: number;

  @Column("float", { name: "price", precision: 12 })
  price: number;
}
