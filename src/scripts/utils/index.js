import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function showFormattedDate(date, locale = 'en-US', options = {}) {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

/**
 * Ref: https://stackoverflow.com/questions/18650168/convert-blob-to-base64
 */
export function convertBlobToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Ref: https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 */
export function convertBase64ToBlob(base64Data, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

export function convertBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function setupSkipToContent(element, mainContent) {
  element.addEventListener('click', () => mainContent.focus());
}

export async function getHolidayDates() {
  const apiKey = 'AIzaSyC8_Qm9XZtVTM_2wtuLUzRf80AgzCkPdGA';
  const calendarId = 'id.indonesian%23holiday%40group.v.calendar.google.com';
  const timeMin = '2025-01-01T00:00:00Z';
  const timeMax = '2025-12-31T23:59:59Z';

  const [vercelData, googleData] = await Promise.all([
    fetch('https://api-harilibur.vercel.app/api').then(res => res.json()),
    fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${timeMin}&timeMax=${timeMax}`).then(res => res.json()),
  ]);

  const vercelDates = vercelData.map(item => item.holiday_date);
  const googleDates = googleData.items
    .filter(item => item.start?.date)
    .map(item => item.start.date);

  return [...new Set([...vercelDates, ...googleDates])];
}

export function getPreviousWorkingDate(holidays) {
  const holidaySet = new Set(holidays);

  function isWorkingDay(date) {
    const isoDate = date.toISOString().split('T')[0];
    const day = date.getDay();
    return day !== 0 && day !== 6 && !holidaySet.has(isoDate);
  }

  let candidate = new Date();
  candidate.setDate(candidate.getDate() - 1);

  while (!isWorkingDay(candidate)) {
    candidate.setDate(candidate.getDate() - 1);
  }

  return candidate.toISOString().split('T')[0];
}

export async function setupDatePicker() {
  const holidays = await getHolidayDates();
  const defaultDate = getPreviousWorkingDate(holidays);

  // Set default value ke input
  document.getElementById('datePicker').value = defaultDate;

  // Inisialisasi Flatpickr
  flatpickr('#datePicker', {
    dateFormat: 'Y-m-d',
    disable: [
      function (date) {
        return date.getDay() === 0 || date.getDay() === 6;
      },
      ...holidays,
    ],
    maxDate: 'today',
    defaultDate: defaultDate,
  });
}

// expected output: if from input 2025-06-05, should be just returning "10 Juni 2025", cause 2025-06-05 untill 2025-06-09 is long weekend and try to use flatpickr to know the next working date 
export async function getWorkingDateAfterInputDate(inputDate) {
  const holidays = await getHolidayDates();
  const holidaySet = new Set(holidays);

  function isWorkingDay(date) {
    const isoDate = date.toISOString().split('T')[0];
    const day = date.getDay();
    return day !== 0 && day !== 6 && !holidaySet.has(isoDate);
  }

  let date = new Date(inputDate);
  date.setDate(date.getDate() + 1); // Mulai dari hari setelah input

  while (!isWorkingDay(date)) {
    date.setDate(date.getDate() + 1);
  }

  // Format ke "10 Juni 2025"
  const formatter = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return formatter.format(date);
}

export function resetPredict(predictResult = null) {
  const inputFields = document.querySelectorAll('#predict-form input[type="number"], #predict-form input[type="text"]');
  inputFields.forEach((input) => {
    if (input.type === 'number') {
      input.value = '';
    } else if (input.type === 'text') {
      input.value = '';
    }
  });

  const datePicker = document.getElementById('datePicker');
  if (datePicker) {
    datePicker.value = '';
    datePicker.readOnly = false;
    datePicker.placeholder = '2025-01-01';
  }

  // Unmount predict result
  if (predictResult) {
    predictResult.unmount();
  }

  // Scroll ke atas
  window.scrollTo({ top: 0, behavior: 'smooth' });
}