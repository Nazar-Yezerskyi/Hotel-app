import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("role", { schema: "Hotel_DB" })
export class Role {
  @PrimaryGeneratedColumn({ type: "int", name: "idrole" })
  idrole: number;

  @Column("varchar", { name: "role", length: 45 })
  role: string;
}
