export default function getPregnancyData() {
  const dueDate = "2024-04-01";
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const today = new Date();
  const startDate = new Date(dueDate);
  startDate.setDate(startDate.getDate() - 280);
  const formattedStartDate = startDate.toISOString().split("T")[0];

  const totalTimePregnant = Math.abs(today.getTime() - startDate.getTime());
  const totalDaysPregnant = Math.ceil(totalTimePregnant / oneDay);
  const percentageComplete = Math.round((totalDaysPregnant / 280) * 100);
  const weekOfPregnancy = Math.floor(totalDaysPregnant / 7);

  //console.log("Start Date:", formattedStartDate);
  //console.log("How many percent is done:", percentageComplete + "%");
  //console.log("Week of pregnancy:", weekOfPregnancy);
  //console.log("Total days pregnant:", totalDaysPregnant);
  return {
    totalDaysPregnant,
    percentageComplete,
    weekOfPregnancy,
    formattedStartDate,
  };
}
getPregnancyData();
