import { useSelectedCurrencies } from "@/state/useSelectedCurrencies";
import { useState } from "react";

export const useLocationCurrency = async () => {
  const { setLocationCurrency, locationCurrency } = useSelectedCurrencies();
  const [isLoading, setLoading] = useState(false);
  if (locationCurrency || isLoading) return;

  try {
    setLoading(true);
    const data = await fetch("https://ipapi.co/json/");
    const { currency } = await data.json();

    setLocationCurrency(currency);
    setLoading(false);
  } catch (error) {
    setLoading(false);
    throw Error("Sorry, I can't locate you right now :(");
  }
};
