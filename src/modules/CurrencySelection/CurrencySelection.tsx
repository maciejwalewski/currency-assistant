import { Container, IconButton } from "@mui/material";

import { useSelectedCurrencies } from "@/state/useSelectedCurrencies";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { Select } from "./Select";

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
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        pt: 8,
        pb: 3,
      }}
    >
      <Select
        value={selectedBaseCurrency}
        onChange={(e, val) => selectBaseCurrency(val)}
        id="currencySelectBase"
        inputLabel="Base"
        isLocationDisabled={!locationCurrency}
        setByLocation={() => selectBaseCurrency(locationCurrency)}
      />
      <IconButton onClick={swapCurrencies} sx={{ maxHeight: 40, maxWidth: 40 }}>
        <SwapHorizIcon />
      </IconButton>
      <Select
        value={selectedComparisonCurrency}
        onChange={(e, val) => selectComparisonCurrency(val)}
        id="currencySelectComparison"
        inputLabel="Compare to"
        isLocationDisabled={!locationCurrency}
        setByLocation={() => selectComparisonCurrency(locationCurrency)}
      />
    </Container>
  );
};
