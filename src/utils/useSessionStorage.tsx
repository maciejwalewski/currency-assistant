import { sessionStorageService, SS } from "@/utils/sessionStorageService";
import {
  Currencies,
  useSelectedCurrencies,
} from "@/state/useSelectedCurrencies";
import { useEffect, useState } from "react";

export const useSessionStorageValues = () => {
  const [initialCurrencies, setInitialCurrencies] = useState(false);

  const { getSS } = sessionStorageService();
  const { selectBaseCurrency, selectComparisonCurrency } =
    useSelectedCurrencies();

  const baseCurrency = getSS(SS.BASE_CURRENCY);
  const comparisonCurrency = getSS(SS.COMPARISON_CURRENCY);

  useEffect(() => {
    if (!baseCurrency || !comparisonCurrency || initialCurrencies) return;

    selectBaseCurrency(baseCurrency as Currencies);
    selectComparisonCurrency(comparisonCurrency as Currencies);

    setInitialCurrencies(true);
  }, [
    initialCurrencies,
    baseCurrency,
    comparisonCurrency,
    selectBaseCurrency,
    selectComparisonCurrency,
  ]);
};
