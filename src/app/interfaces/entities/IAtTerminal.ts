export interface IAtTerminal{
  id: number;
  terminalCode: string;
  terminalName: string;
  addressPlace: string;
  terminalPort: string;
  terminalIp: string;
  pass?: string;
  isActive?: boolean;
  note?: string;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}