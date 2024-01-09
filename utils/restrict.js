export function inputRestrict(e, removeListRegex) {
  const input = e.target;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const initialLen = input.value.length;
  input.value = input.value.replace(removeListRegex, '');
  const lengthDifference = input.value.length - initialLen;
  if (lengthDifference) {
    const newStart = start + lengthDifference;
    const newEnd = end + lengthDifference;
    input.setSelectionRange(newStart, newEnd);
  }
}

export function inputToUpper(e) {
  const input = e.target;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  input.value = input.value.toLocaleUpperCase();
  input.value = input.value.endsWith(' ') ? `${input.value.trim()} ` : input.value.trim();
  input.setSelectionRange(start, end);
}

export function inputTrim(e) {
  const input = e.target;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  input.value = input.value.endsWith(' ') ? `${input.value.trim()} ` : input.value.trim();
  input.setSelectionRange(start, end);
}

export function inputPhoneNumber(num) {
  const first = num % 10;
  while (num) {
    if (num % 10 !== first) return false;
    num = Math.floor(num / 10);
  }
  return true;
}

export const restrict = {
  email(e) {
    inputRestrict(e, /[^@a-zA-Z-_.\d]/g);
  },
  abhaAddress(e) {
    inputRestrict(e, /[^a-zA-Z0-9-_.\d]/g);
  },
  name(e) {
    inputRestrict(e, /[^a-zA-Z-.,() ]/g);
  },
  remarks(e) {
    inputRestrict(e, /[^a-z- A-Z 0-9.&%',()/@#]/g);
  },
  onlyCharacter(e) {
    inputRestrict(e, /[^a-zA-Z ]/g);
  },
  address(e) {
    inputRestrict(e, /[^a-z- A-Z 0-9.&',()/@#]/g);
  },
  equivalentStatus(e) {
    inputRestrict(e, /[^a-zA-Z0-9.()& \d]/g);
  },
  digits(e) {
    inputRestrict(e, /\D/g);
  },
  number(e) {
    inputRestrict(e, /[^\d.-]/g);
  },
  decimal(e) {
    inputRestrict(e, /[^0-9.-]|(\.[0-9]*\.)|(\.-)|(^\.)/g);
  },
  venueName(e) {
    inputRestrict(e, /[^-a-zA-Z0-9.,()& ]/g);
  },
  departmentName(e) {
    inputRestrict(e, /[^a-zA-Z +.,()& ]/g);
  },
  designationName(e) {
    inputRestrict(e, /[^a-zA-Z0-9 .,()/&/-]/g);
  },
  eventDescription(e) {
    inputRestrict(e, /[^-_a-zA-Z0-9 +@#.,:()&' ]/g);
  },
  alphaNumericWithNoSpace(e) {
    inputRestrict(e, /[^a-zA-Z0-9]/g);
  },
  alphaNumericWithSpace(e) {
    inputRestrict(e, /[^a-z A-Z 0-9]/g);
  },

  alphanumerichypenbracketscommaspacedotunderscore(e) {
    inputRestrict(e, /[^-a-zA-Z._(), \d,]/g);
  },
};
export class TokenGenerator {
  constructor({ title = 'Token', count = 100 }) {
    this.count = count;
    this.title = title;
  }

  generateToken() {
    const id = Date.now();
    const token = {
      id,
      count: this.count,
      title: `${this.title}:-${this.count}`,
    };
    this.count++;
    return token;
  }
}
