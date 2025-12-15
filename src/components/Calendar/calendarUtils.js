import { parse } from "date-fns";

// For convert dummy JSON to calendar events
export const mapDataToEvents = (data) => {
  return Object.keys(data).map((dateStr) => {
    const date = parse(dateStr, "dd-MM-yyyy", new Date());

    return {
      title: "Data Available",
      start: date,
      end: date,
      allDay: true,
      hasData: true
    };
  });
};
