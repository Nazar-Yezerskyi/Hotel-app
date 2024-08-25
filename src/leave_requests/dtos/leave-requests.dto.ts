import { IsEnum, IsInt } from 'class-validator';

export class UpdateLeaveRequestStatusDto {
  @IsInt()
  idleaveRequests: number;

  @IsEnum(["Sent", "Rejected", "Approved"])
  status: "Sent" | "Rejected" | "Approved";
}