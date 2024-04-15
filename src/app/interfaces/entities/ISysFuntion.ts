export interface ISysFunction {
  id: number;
  moduleId: number;
  code: string;
  name: string;
  path: string;
  pathFullMatch?: boolean;
  isActive?: boolean;
  groupId?: number;
}
