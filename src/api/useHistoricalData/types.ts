export type CurrenciesObject = {
  [key: string]: number;
};

export interface HistoricalDataApi {
  [key: string]: CurrenciesObject;
}

export enum Profitability {
  success = "success",
  warning = "warning",
}
