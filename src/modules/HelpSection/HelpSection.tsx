import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useState } from "react";

const helpDialogId = "help-dialog";

const MESSAGES = [
  "This simple application lets you compare 2 different currencies.",
  "Hover on thumb icon to know more about current conversion profitability.",
  "Click on location button to set currency by your IP address.",
  "Table at the bottom shows current rate, last 3 weeks average rate and last 3 months average rate.",
  "Your last selections will be restored on every page enter until you close your browser.",
];

export const HelpSection = () => {
  const [isHelpOpen, setHelpOpen] = useState(false);

  const handleOpen = () => setHelpOpen(true);
  const handleClose = () => setHelpOpen(false);

  return (
    <>
      <IconButton
        sx={{ alignSelf: "end" }}
        color="primary"
        onClick={handleOpen}
      >
        <HelpOutlineIcon fontSize="medium" />
      </IconButton>
      <Dialog
        PaperProps={{ sx: { m: 2 } }}
        id={helpDialogId}
        open={isHelpOpen}
        onClose={handleClose}
      >
        <DialogTitle>Welcome to the Currency Assistant</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {MESSAGES.map((msg) => (
            <DialogContentText key={msg} fontSize={15}>
              {msg}
            </DialogContentText>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>All clear!</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
