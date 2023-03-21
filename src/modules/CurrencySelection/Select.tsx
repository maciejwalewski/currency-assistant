import { availableCurrencyCodes } from "@/constants/availableCurrencies";
import { Currencies } from "@/state/useSelectedCurrencies";
import { Autocomplete, Box, TextField } from "@mui/material";
import { LocationButton } from "./LocationButton";

interface SelectProps {
  onChange: (event: React.SyntheticEvent, value: Currencies) => void;
  value: Currencies;
  id: string;
  inputLabel: string;
  isLocationDisabled: boolean;
  setByLocation: () => void;
}

export const Select = ({
  value,
  onChange,
  id,
  inputLabel,
  isLocationDisabled,
  setByLocation,
}: SelectProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 0.5,
        flexGrow: 1,
      }}
    >
      <Autocomplete
        sx={{ minWidth: "90%" }}
        id={id}
        value={value}
        onChange={onChange}
        options={availableCurrencyCodes}
        renderInput={(params) => <TextField {...params} label={inputLabel} />}
      />
      <LocationButton isDisabled={isLocationDisabled} onClick={setByLocation} />
    </Box>
  );
};
