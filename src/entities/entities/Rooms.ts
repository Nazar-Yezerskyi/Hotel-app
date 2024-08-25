import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rooms", { schema: "Hotel_DB" })
export class Rooms {
  @PrimaryGeneratedColumn({ type: "int", name: "idrooms" })
  idrooms: number;

  @Column("varchar", { name: "description", length: 45 })
  description: string;

  @Column("varchar", { name: "room_number", length: 400 })
  roomNumber: string;

  @Column("float", { name: "price_per_day", precision: 12 })
  pricePerDay: number;

  @Column("int", { name: "number_of_guests" })
  numberOfGuests: number;
}
