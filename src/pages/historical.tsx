import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CurrencySelection } from "@/modules/CurrencySelection/CurrencySelection";
import { CurrencyData } from "@/modules/CurrencyData/CurrencyData";
import { Container } from "@mui/material";

import dynamic from "next/dynamic";
import { HelpSection } from "@/modules/HelpSection/HelpSection";

const Historical = () => {
  const queryClient = new QueryClient();

  const ClientSideOperations = dynamic(
    () => import("@/modules/ClientSideOperations/ClientSideOperations"),
    {
      ssr: false,
    }
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Container
        maxWidth="xs"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <HelpSection />
        <CurrencySelection />
        <CurrencyData />
        <ClientSideOperations />
      </Container>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Historical;
