import { availableCurrencies } from "@/constants/availableCurrencies";
import { create } from "zustand";
import { sessionStorageService, SS } from "@/utils/sessionStorageService";

export type Currencies = keyof typeof availableCurrencies | null;

const { setSS } = sessionStorageService();

const initialState = {
  selectedBaseCurrency: "EUR" as Currencies,
  selectedComparisonCurrency: "EUR" as Currencies,
  locationCurrency: null,
};

interface State {
  selectedBaseCurrency: Currencies;
  selectedComparisonCurrency: Currencies;
  locationCurrency: Currencies;
  selectBaseCurrency: (currency: Currencies) => void;
  selectComparisonCurrency: (currency: Currencies) => void;
  setLocationCurrency: (currency: Currencies) => void;
  swapCurrencies: () => void;
}

export const useSelectedCurrencies = create<State>((set, get) => ({
  ...initialState,
  selectBaseCurrency: (currency: Currencies) => {
    setSS(SS.BASE_CURRENCY, currency);
    set(() => ({ selectedBaseCurrency: currency }));
  },
  selectComparisonCurrency: (currency: Currencies) => {
    setSS(SS.COMPARISON_CURRENCY, currency);
    set(() => ({ selectedComparisonCurrency: currency }));
  },
  swapCurrencies: () => {
    const baseCurrency = get().selectedBaseCurrency;
    const comparisonCurrency = get().selectedComparisonCurrency;

    setSS(SS.BASE_CURRENCY, comparisonCurrency);
    setSS(SS.COMPARISON_CURRENCY, baseCurrency);

    set(() => ({
      selectedBaseCurrency: comparisonCurrency,
      selectedComparisonCurrency: baseCurrency,
    }));
  },
  setLocationCurrency: (currency) =>
    set(() => ({
      locationCurrency: currency,
    })),
}));
