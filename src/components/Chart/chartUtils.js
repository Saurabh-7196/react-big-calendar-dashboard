export const mapUsersToChartData = (usersData = []) => {

    // For convert obj to amCharts compatible data
  return usersData.map((item) => {
    const [key, value] = Object.entries(item)[0];
    return {
      name: key,
      value: value
    };
  });
};
