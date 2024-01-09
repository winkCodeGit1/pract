import { format } from 'date-fns';

/**
 * Generate a date in a specific output format from a given input Date object and format.
 * @param {Date} inputDate - Input Date object.
 * @param {string} inputDate - Input Date object.
 * @param {string} outputFormat - Desired output date format.
 * @returns {string} - Formatted date in the specified output format.
 */
export function generateDateFormat(inputDate, outputFormat = 'yyyy-MM-dd') {
  try {
    const formattedDate = format(inputDate, outputFormat);
    return formattedDate;
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

export function viewDateFormat(inputDate, outputFormat = 'dd-MM-yyyy') {
  try {
    if (typeof inputDate === 'object') {
      const formattedDate = format(inputDate, outputFormat);
      return formattedDate;
    } else {
      return inputDate.split('-').reverse().join('-');
    }
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

export function calculateAge(birthDate) {
  const birthDateObj = new Date(birthDate);
  console.log(birthDate);
  if (isNaN(birthDateObj.getTime())) {
    return '-';
  }
  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in years
  const age = currentDate.getFullYear() - birthDateObj.getFullYear();

  // Adjust the age based on the month and day
  if (
    currentDate.getMonth() < birthDateObj.getMonth() ||
    (currentDate.getMonth() === birthDateObj.getMonth() &&
      currentDate.getDate() < birthDateObj.getDate())
  ) {
    return age - 1;
  } else {
    return age;
  }
}

export function parseFrom24HourFormat(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  const parsedDate = new Date();
  parsedDate.setHours(hours);
  parsedDate.setMinutes(minutes);
  return parsedDate;
}
