import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("staff_shedule", { schema: "Hotel_DB" })
export class StaffShedule {
  @PrimaryGeneratedColumn({ type: "int", name: "idstaff_shedule" })
  idstaffShedule: number;

  @Column("time", { name: "start_time" })
  startTime: string;

  @Column("time", { name: "end_time" })
  endTime: string;

  @Column("int", { name: "hours_per_day" })
  hoursPerDay: number;

  @Column("varchar", { name: "working_days", length: 45 })
  workingDays: string;
}
