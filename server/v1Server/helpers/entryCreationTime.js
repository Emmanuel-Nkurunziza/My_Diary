const entryTimeStamp = () => {
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const precisedTime = `${date} ${time}`;
  return precisedTime;
};

export default entryTimeStamp;
