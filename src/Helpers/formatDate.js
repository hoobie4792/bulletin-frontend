export default (inputDate) => {
  const date = new Date(Date.parse(inputDate));

  const timeOptions = {
    hour: 'numeric', minute: 'numeric'
  }
  const dateOptions = {
    month: 'short', day: 'numeric', year: 'numeric'
  }

  const timeFormat = new Intl.DateTimeFormat('en-US', timeOptions).format(date);
  const dateFormat = new Intl.DateTimeFormat('en-US', dateOptions).format(date);

  return `${timeFormat} - ${dateFormat}`;
}