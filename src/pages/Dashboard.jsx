import { useState } from "react";
import CalendarView from "../components/Calendar/CalenderView";
import DataPopup from "../components/Popup/DataPopup";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <h2>Dashboard</h2>
      <CalendarView onDateSelect={() => setOpen(true)} />
      <DataPopup
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default Dashboard;
