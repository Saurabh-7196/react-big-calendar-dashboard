import { useState } from "react";
import { Container, Box } from "@mui/material";
import CalendarView from "../components/Calendar/CalenderView";
import DataPopup from "../components/Popup/DataPopup";

const Dashboard = () => {
    const [open, setOpen] = useState(false);

    return (
        <Container
            maxWidth="lg"   
            sx={{py: 4,}}
        >
            <Box
                sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: 2,
                    p: { xs: 2, md: 3 }, 
                    boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                }}
            >
                <CalendarView onDateSelect={() => setOpen(true)} />
            </Box>

            <DataPopup
                open={open}
                onClose={() => setOpen(false)}
            />
        </Container>
    );
};

export default Dashboard;
