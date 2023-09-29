export interface ChartAggregation {
  eventDate: Date;
  periodAggregatedDecimalValue: number;
  periodAggregatedValue: number;
  dateMeasures: Array<DailyEventAggregation>;
}

export interface DailyEventAggregation {
  aggregatedDecimalValue: number;
  aggregatedValue: number;
  preFullValue?: number;
  postFullValue?: number;
  eventDate: Date;
}
