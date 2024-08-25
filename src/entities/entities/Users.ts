import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tasks } from "./Tasks";
import { Position } from "./Position";

@Index("fk_users_position1_idx", ["positionId"], {})
@Index("fk_users_role1_idx", ["roleId"], {})
@Index("fk_users_staff_shedule1_idx", ["staffSheduleId"], {})
@Entity("users", { schema: "Hotel_DB" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "idusers" })
  idusers: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("varchar", { name: "last_name", length: 45 })
  lastName: string;

  @Column("varchar", { name: "email", length: 45 })
  email: string;

  @Column("varchar", { name: "password", length: 200 })
  password: string;

  @Column("int", { primary: true, name: "role_id" })
  roleId: number;

  @Column("int", { name: "position_id", nullable: true })
  positionId: number | null;

  @Column("int", { name: "staff_shedule_id", nullable: true })
  staffSheduleId: number | null;

  @OneToMany(() => Tasks, (tasks) => tasks.usersIdCreated2)
  tasks: Tasks[];

  @OneToMany(() => Tasks, (tasks) => tasks.usersIdStaff2)
  tasks2: Tasks[];

  @ManyToOne(() => Position)
  @JoinColumn({ name: "position_id" })
  position: Position;
  
}
