const parseISTtoUTC = (istTime) => {
  const [date, time] = istTime.split(" ");
  const dateTime = new Date(`${date}T${time.replace("IST", "").trim()}+05:30`);
  return dateTime;
};

module.exports = parseISTtoUTC;
