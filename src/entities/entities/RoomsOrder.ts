import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_rooms_order_rooms1_idx", ["roomsId"], {})
@Index("fk_rooms_order_users1_idx", ["usersId"], {})
@Entity("rooms_order", { schema: "Hotel_DB" })
export class RoomsOrder {
  @Column("date", { name: "check_in" })
  checkIn: string;

  @Column("date", { name: "check_out" })
  checkOut: string;

  @Column("float", { name: "total_price", precision: 12 })
  totalPrice: number;

  @Column("date", { name: "date_of_order" })
  dateOfOrder: string;

  @PrimaryGeneratedColumn({ type: "int", name: "idrooms_order" })
  idroomsOrder: number;

  @Column("int", { primary: true, name: "users_id" })
  usersId: number;

  @Column("int", { primary: true, name: "rooms_id" })
  roomsId: number;
}
