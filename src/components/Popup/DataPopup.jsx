import { Dialog, DialogTitle, DialogContent, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import BarChart from "../Chart/BarChart";
import { mapUsersToChartData } from "../Chart/chartUtils";

const DataPopup = ({ open, onClose }) => {
  const selectedDate = useSelector((state) => state.calendar.selectedDate);
  const data = useSelector((state) => state.calendar.data);

  if (!selectedDate || !open) return null;

  const dayData = data?.[selectedDate];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      disableEnforceFocus
      disableRestoreFocus
    >
      <DialogTitle>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Data for {selectedDate}
          </Typography>

          <IconButton
            aria-label="close"
            onClick={onClose}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {!dayData ? (
          <Typography color="error" sx={{ py: 1 }}>
            No data found for the selected date.
          </Typography>
        ) : (
          <BarChart data={mapUsersToChartData(dayData)} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DataPopup;