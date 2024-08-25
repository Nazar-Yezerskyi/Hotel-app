import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Entity("position", { schema: "Hotel_DB" })
export class Position {
  @PrimaryGeneratedColumn({ type: "int", name: "idposition" })
  idposition: number;

  @Column("varchar", { name: "position_name", length: 45 })
  positionName: string;

  @Column("float", { name: "salary", precision: 12 })
  salary: number;

  @Column("date", { name: "date_of_employ" })
  dateOfEmploy: string;

  @Column("varchar", { name: "main_duties", length: 500 })
  mainDuties: string;


}
