import { Button } from "@mui/material";

import MyLocationIcon from "@mui/icons-material/MyLocation";

interface Props {
  onClick: () => void;
  isDisabled: boolean;
}

export const LocationButton = ({ onClick, isDisabled }: Props) => {
  return (
    <Button
      sx={{ fontSize: 11, minWidth: "90%" }}
      disabled={isDisabled}
      onClick={onClick}
      variant="outlined"
      endIcon={<MyLocationIcon />}
    >
      By Location
    </Button>
  );
};
