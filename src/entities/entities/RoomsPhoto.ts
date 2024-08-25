import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_rooms_photo_rooms1_idx", ["roomsId"], {})
@Entity("rooms_photo", { schema: "Hotel_DB" })
export class RoomsPhoto {
  @PrimaryGeneratedColumn({ type: "int", name: "idrooms_photo" })
  idroomsPhoto: number;

  @Column("varchar", { name: "room_photo", length: 100 })
  roomPhoto: string;

  @Column("int", { primary: true, name: "rooms_id" })
  roomsId: number;
}
