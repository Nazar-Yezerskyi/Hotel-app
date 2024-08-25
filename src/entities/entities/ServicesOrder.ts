import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_services_order_services1_idx", ["servicesId"], {})
@Index("fk_services_order_users_idx", ["usersId"], {})
@Entity("services_order", { schema: "Hotel_DB" })
export class ServicesOrder {
  @PrimaryGeneratedColumn({ type: "int", name: "idservices_order" })
  idservicesOrder: number;

  @Column("float", { name: "total_price", precision: 12 })
  totalPrice: number;

  @Column("date", { name: "date_of_order" })
  dateOfOrder: string;

  @Column("date", { name: "expiration_date" })
  expirationDate: string;

  @Column("int", { primary: true, name: "users_id" })
  usersId: number;

  @Column("int", { primary: true, name: "services_id" })
  servicesId: number;
}
