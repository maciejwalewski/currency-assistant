import { IconButton } from "@mui/material";

import MyLocationIcon from "@mui/icons-material/MyLocation";

interface Props {
  onClick: () => void;
  isDisabled: boolean;
}

export const LocationButton = ({ onClick, isDisabled }: Props) => {
  return (
    <IconButton
      sx={{ maxHeight: 40, maxWidth: 40 }}
      disabled={isDisabled}
      onClick={onClick}
    >
      <MyLocationIcon />
    </IconButton>
  );
};
