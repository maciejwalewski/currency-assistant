export enum SS {
  BASE_CURRENCY = "BASE_CURRENCY",
  COMPARISON_CURRENCY = "COMPARISON_CURRENCY",
}

export const sessionStorageService = () => {
  const getSS = (itemName: string) => localStorage.getItem(itemName);
  const setSS = (itemName: string, value: string | null) => {
    if (!value) return;
    localStorage.setItem(itemName, value);
  };

  return {
    getSS,
    setSS,
  };
};
