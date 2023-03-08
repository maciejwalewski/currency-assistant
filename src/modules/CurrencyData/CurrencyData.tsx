import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  IconButton,
  Tooltip,
  Typography,
  Skeleton,
} from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useHistoricalData } from "@/api/useHistoricalData/useHistoricalData";
import { useSelectedCurrencies } from "@/state/useSelectedCurrencies";
import { Profitability } from "@/api/useHistoricalData/types";
import { API_ERROR } from "@/constants/app";

const Skeletons = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
    }}
  >
    <Skeleton animation="wave" variant="circular" width={86} height={86} />
    <Skeleton animation="wave" variant="rounded" width="100%" height={250} />
  </Box>
);

const createData = (dateRange: string, avgRate: number) => {
  return { dateRange, avgRate };
};

export const CurrencyData = () => {
  const { selectedBaseCurrency, selectedComparisonCurrency } =
    useSelectedCurrencies();
  const { queryResult, additionalInfo } = useHistoricalData(
    selectedBaseCurrency,
    selectedComparisonCurrency
  );

  if (queryResult.isLoading) return <Skeletons />;
  if (queryResult.error || !additionalInfo)
    return <Typography>{API_ERROR}</Typography>;

  const { yesterdaysRate, lastWeekAvgRate, last3MonthsAvgRate, profitability } =
    additionalInfo;

  const rows = [
    createData("Yesterday", yesterdaysRate),
    createData("Last week", lastWeekAvgRate),
    createData("Last 3 months", last3MonthsAvgRate),
  ];

  const tooltipTitle =
    profitability === Profitability.success
      ? `Current ${selectedBaseCurrency} price is lower or similar to average from last 3 months, seems like a good day to buy.`
      : `Current ${selectedBaseCurrency} price is higher than average from last 3 months. Perhaps we should wait a little.`;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <Tooltip
        title={<Typography fontSize={15}>{tooltipTitle}</Typography>}
        arrow
        placement="top"
        enterTouchDelay={0}
        leaveTouchDelay={8000}
      >
        <IconButton aria-label="profitability">
          {profitability === Profitability.success ? (
            <SentimentSatisfiedAltIcon
              color={profitability}
              sx={{ fontSize: 50 }}
            />
          ) : (
            <SentimentVeryDissatisfiedIcon
              color={profitability}
              sx={{ fontSize: 50 }}
            />
          )}
        </IconButton>
      </Tooltip>
      <TableContainer sx={{ maxWidth: 400, mt: 2 }} component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#e0e0e0" }}>
            <TableRow>
              <TableCell>Date range</TableCell>
              <TableCell align="right">Avg Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.dateRange}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.dateRange}
                </TableCell>
                <TableCell align="right">{row.avgRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
