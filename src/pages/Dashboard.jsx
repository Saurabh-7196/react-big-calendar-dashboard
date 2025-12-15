import { useSelector } from "react-redux";

const Dashboard = () => {
    const calendarData = useSelector((state) => state.calendar.data);

    console.log("Dummy data:", calendarData);

    return <h2> Dashboard</h2>;
};

export default Dashboard;
