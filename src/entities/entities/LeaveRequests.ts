import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("fk_leave_requests_users1_idx", ["usersId"], {})
@Entity("leave_requests", { schema: "Hotel_DB" })
export class LeaveRequests {
  @PrimaryGeneratedColumn({ type: "int", name: "idleave_requests" })
  idleaveRequests: number;

  @Column("varchar", { name: "leave_type", length: 45 })
  leaveType: string;

  @Column("date", { name: "start_date" })
  startDate: string;

  @Column("date", { name: "end_date" })
  endDate: string;

  @Column("varchar", { name: "reason", length: 500 })
  reason: string;

  @Column("set", {
    name: "status",
    enum: ["Sent", "Rejected", "Approved"],
  })
  status: ("Sent" | "Rejected" | "Approved")[];

  @Column("int", { name: "users_id" })
  usersId: number;
}
