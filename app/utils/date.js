
export function getDateTime(timestamp) {
  return timestamp ? ScalaDate.tsToDate(timestamp) : null;
}

export function getTimeStamp(datetime) {
  return datetime ? ScalaDate.dateToTs(datetime) : null;
}

export const getDateTimeInterval = (timestampStart, timestampEnd) => ({
  startDateTime: getDateTime(timestampStart),
  endDateTime: getDateTime(timestampEnd)
});

export const getTimeStampInterval = (datetimeStart, datetimeEnd) => ({
  startDateTime: getTimeStamp(datetimeStart),
  endDateTime: getTimeStamp(datetimeEnd)
});
