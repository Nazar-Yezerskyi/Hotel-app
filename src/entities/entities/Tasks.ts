import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("fk_tasks_users1_idx", ["usersIdCreated"], {})
@Index("fk_tasks_users2_idx", ["usersIdStaff"], {})
@Entity("tasks", { schema: "Hotel_DB" })
export class Tasks {
  @PrimaryGeneratedColumn({ type: "int", name: "idtasks" })
  idtasks: number;

  @Column("set", { name: "status", enum: ["created", "in process", "done"] })
  status: ("created" | "in process" | "done")[];

  @Column("varchar", { name: "task_name", length: 45 })
  taskName: string;

  @Column("varchar", { name: "description", length: 500 })
  description: string;

  @Column("int", { primary: true, name: "users_id_created" })
  usersIdCreated: number;

  @Column("int", { primary: true, name: "users_id_staff" })
  usersIdStaff: number;

  @ManyToOne(() => Users, (users) => users.tasks, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "users_id_created", referencedColumnName: "idusers" }])
  usersIdCreated2: Users;

  @ManyToOne(() => Users, (users) => users.tasks2, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "users_id_staff", referencedColumnName: "idusers" }])
  usersIdStaff2: Users;
}
