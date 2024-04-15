export interface ISyAuditlong {
  auditlogId: number;
  userId?: number;
  eventDate: Date;
  eventType?: string;
  tableName?: string;
  recordId?: string;
  columnName?: string;
  originalValue?: string;
  newValue?: string;
}
