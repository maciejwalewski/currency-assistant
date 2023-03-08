import { useSelectedCurrencies } from "@/state/useSelectedCurrencies";

export const useLocationCurrency = async () => {
  const { setLocationCurrency, locationCurrency } = useSelectedCurrencies();
  if (locationCurrency) return;

  try {
    const data = await fetch("http://ip-api.com/json/?fields=currency");
    const { currency } = await data.json();

    setLocationCurrency(currency);
  } catch (error) {
    throw "Sorry, I can't locate you right now :(";
  }
};
