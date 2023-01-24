export const formatDate = (date = "2019-08-04T20:11Z") => {
  console.log("date: ", date);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date(Date.parse(date)));
};
