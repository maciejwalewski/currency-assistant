import { Currencies } from "@/state/useSelectedCurrencies";
import { useQuery } from "react-query";
import { format, subDays } from "date-fns";
import {
  TransformedHistoricalData,
  transformHistoricalDataApi,
} from "./transformHistoricalDataApi";
import { HistoricalDataApi, Profitability } from "./types";
import { API_ENDPOINTS, API_URL } from "@/constants/app";

const dateParamFormat = "yyyy-MM-dd";

const getFetchingDetails = (baseCurrency: Currencies) => {
  const today = new Date();
  const yesterday = subDays(today, 1);
  const todayMinus90 = subDays(today, 90);

  const dateFrom = format(todayMinus90, dateParamFormat);
  const dateTo = format(yesterday, dateParamFormat);

  const params = {
    apikey: process.env.NEXT_PUBLIC_FREE_CURRENCY_KEY || "",
    base_currency: baseCurrency as string,
    date_from: dateFrom,
    date_to: dateTo,
  };

  const urlParams = new URLSearchParams(params);
  const address = `${API_URL}${API_ENDPOINTS.HISTORICAL}?${urlParams}`;

  return address;
};

const getAverage = (values: number[]) => {
  const sum = values.reduce((acc, curr) => acc + curr, 0);
  const avg = sum / values.length;
  return Number(avg.toFixed(2));
};

const getDataInfo = (data: TransformedHistoricalData[]) => {
  const yesterdaysData = data.at(-1);
  const lastWeekData = data.slice(-7);
  const last3MonthsData = data.slice(-90);

  const yesterdaysRate = getAverage([yesterdaysData?.rate || 0]);
  const lastWeekAvgRate = getAverage(lastWeekData.map((data) => data.rate));
  const last3MonthsAvgRate = getAverage(
    last3MonthsData.map((data) => data.rate)
  );

  const profitability =
    last3MonthsAvgRate >= yesterdaysRate
      ? Profitability.success
      : Profitability.warning;

  return {
    currency: yesterdaysData?.currency,
    yesterdaysRate,
    lastWeekAvgRate,
    last3MonthsAvgRate,
    profitability,
  };
};

const fetchData = async (url: string): Promise<HistoricalDataApi> => {
  try {
    const response = await fetch(url);
    const { data } = await response.json();

    return data;
  } catch (err) {
    throw err;
  }
};

export const useHistoricalData = (
  baseCurrency: Currencies,
  comparisonCurrency: Currencies
) => {
  const url = getFetchingDetails(baseCurrency);

  const queryResult = useQuery(
    ["historicalData", baseCurrency],
    () => fetchData(url),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  if (queryResult.error || !queryResult.data) return { queryResult };

  const transformedData = transformHistoricalDataApi(
    queryResult?.data || {},
    comparisonCurrency
  );

  const additionalInfo = getDataInfo(transformedData);

  return { queryResult, transformedData, additionalInfo };
};
