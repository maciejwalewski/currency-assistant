import {
  Container,
  Box,
  IconButton,
  TextField,
  Autocomplete,
} from "@mui/material";

import { availableCurrencyCodes } from "@/constants/availableCurrencies";
import { useSelectedCurrencies } from "@/state/useSelectedCurrencies";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { LocationButton } from "./LocationButton";

export const CurrencySelection = () => {
  const {
    selectedBaseCurrency,
    selectedComparisonCurrency,
    selectBaseCurrency,
    selectComparisonCurrency,
    swapCurrencies,
    locationCurrency,
  } = useSelectedCurrencies();

  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 0,
      }}
    >
      <IconButton onClick={swapCurrencies} sx={{ maxHeight: 40, maxWidth: 40 }}>
        <SwapHorizIcon />
      </IconButton>
      <Box
        sx={{
          pb: 3,
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Autocomplete
          sx={{ flexGrow: 1 }}
          id="currencySelectBase"
          value={selectedBaseCurrency}
          onChange={(e, val) => selectBaseCurrency(val)}
          options={availableCurrencyCodes}
          renderInput={(params) => <TextField {...params} label="Base" />}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
            }}
          >
            <LocationButton
              isDisabled={!locationCurrency}
              onClick={() => selectBaseCurrency(locationCurrency)}
            />
            <LocationButton
              isDisabled={!locationCurrency}
              onClick={() => selectComparisonCurrency(locationCurrency)}
            />
          </Box>
        </Box>
        <Autocomplete
          sx={{ flexGrow: 1 }}
          id="currencySelectComparison"
          value={selectedComparisonCurrency}
          onChange={(e, val) => selectComparisonCurrency(val)}
          options={availableCurrencyCodes}
          renderInput={(params) => <TextField {...params} label="Compare to" />}
        />
      </Box>
    </Container>
  );
};
