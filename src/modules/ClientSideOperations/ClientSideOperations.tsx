import { useLocationCurrency } from "@/utils/useLocationCurrency";
import { useSessionStorageValues } from "@/utils/useSessionStorage";

const ClientSideOperations = () => {
  useLocationCurrency();
  useSessionStorageValues();

  return null;
};

export default ClientSideOperations;
