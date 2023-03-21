import { ROUTES } from "@/constants/app";
import { Typography, Button, Box } from "@mui/material";
import Link from "next/link";

const Home = () => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: 35,
          fontWeight: "bold",
        }}
        color="text.primary"
        gutterBottom
      >
        Currency Assistant
      </Typography>
      <Typography color="text.secondary" variant="body1">
        Compare.
      </Typography>
      <Typography color="text.secondary" variant="body1">
        Analyse.
      </Typography>
      <Typography color="text.secondary" variant="body1">
        Decide.
      </Typography>
      <Button size="large" variant="contained" sx={{ mt: 5 }}>
        <Link
          style={{ textDecoration: "none", color: "white", fontSize: 18 }}
          href={ROUTES.HISTORICAL}
        >
          Start
        </Link>
      </Button>
    </Box>
  );
};

export default Home;
