import { Dialog, DialogTitle, DialogContent, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import BarChart from "../Chart/BarChart";
import { mapUsersToChartData } from "../Chart/chartUtils";

const DataPopup = ({ open, onClose }) => {
  const selectedDate = useSelector(
    (state) => state.calendar.selectedDate
  );
  const data = useSelector((state) => state.calendar.data);

  if (!selectedDate) return null;

  const formattedDate = format(
    new Date(selectedDate),
    "dd-MM-yyyy"
  );

  const dayData = data[formattedDate];

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
          <span>Data for {formattedDate}</span>

          <IconButton
            aria-label="close"
            onClick={onClose}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {!dayData ? (
          <Typography color="error">
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
