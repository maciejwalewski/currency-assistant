import { HistoricalDataApi } from "@/api/useHistoricalData/types";
import { Currencies } from "@/state/useSelectedCurrencies";

export type TransformedHistoricalData = {
  date: string;
  rate: number;
  currency: Currencies;
};

export const transformHistoricalDataApi = (
  data: HistoricalDataApi,
  comparisonCurrency: Currencies
): TransformedHistoricalData[] => {
  if (!comparisonCurrency) return [];

  return Object.entries(data).map(([date, rates]) => {
    return {
      currency: comparisonCurrency,
      rate: rates[comparisonCurrency],
      date,
    };
  });
};
