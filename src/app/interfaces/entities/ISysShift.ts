export interface ISysShift {
  id: number;
  code: string;
  name: string;
  areaId: number;
  hoursStart: Date;
  hoursStop: Date;
  breaksFrom: Date;
  breaksTo: Date;
  timeLate?: number;
  timeEarly?: number;
  timeTypeId: number;
  isNoon?: boolean;
  isBreak?: boolean;
  note?: string;
  isActive: boolean;
  monId?: number;
  tueId?: number;
  wedId?: number;
  thuId?: number;
  friId?: number;
  satId?: number;
  sunId?: number;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}
