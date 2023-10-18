import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';

export function convertPersianToEnglish(code: string) {
  let persianNumbers = [
    /۰/g,
    /۱/g,
    /۲/g,
    /۳/g,
    /۴/g,
    /۵/g,
    /۶/g,
    /۷/g,
    /۸/g,
    /۹/g,
  ];
  if (typeof code === 'string') {
    for (let i = 0; i < 10; i++) {
      code = code.replace(persianNumbers[i], `${i}`).replace(persianNumbers[i], `${i}`);
    }
  }
  return code;
}


export function convertEnglishToPersian(code: string) {
  const chars = code.split('');
  for (const char of chars) {
    if (!isNaN(Number(char))) {
      //@ts-ignore
      code = code.replace(char, ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'][char]);
    }
  }
  return code;
}

export function UserNameValidator(): ValidatorFn {
  const regExp: RegExp = new RegExp(/^[a-zA-Z0-9$@-_.]+$/);
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    return regExp.test(control.value) || !control.value ? null : {
      'userName': true
    }
  };
}

export function EntityEnglishCharsValidator(): ValidatorFn {
  const regExp: RegExp = new RegExp(/^[A-Za-z\d_\/-]+$/);
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    return regExp.test(control.value) || !control.value ? null : {
      'english': true
    }
  };
}

export function PersianCharsValidator(): ValidatorFn {
  const regExp: RegExp = new RegExp(/^[\u0600-\u06FF\s]+$/);
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    return regExp.test(control.value) || !control.value ? null : {
      'persian': true
    }
  };
}

export function NationalIdValidatorFn(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    return nationalIdVerify(control.value) || !control.value
      ? null
      : {
        iranianNationalId: true,
      };
  };
}

export function nationalIdVerify(code: any): any {
  if (code) {
    let convertedNum = convertPersianToEnglish(code);
    let L = convertedNum?.length;
    if (L < 11 || parseInt(convertedNum, 10) == 0) return false;
    if (parseInt(convertedNum.substr(3, 6), 10) == 0) return false;

    let c = parseInt(convertedNum.substr(10, 1), 10);
    let d = parseInt(convertedNum.substr(9, 1), 10) + 2;
    let z = new Array(29, 27, 23, 19, 17);
    let s = 0;

    for (let i = 0; i < 10; i++)
      s += (d + parseInt(convertedNum.substr(i, 1), 10)) * z[i % 5];
    s = s % 11;
    if (s == 10) s = 0;
    return c == s;
  }
}

export function NationalCodeValidatorFn(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    return nationalCodeVerify(control.value) || !control.value ? null : {
      'iranianNationalCode': true
    }
  };
}

export function nationalCodeVerify(params: any): any {
  if (!params) { return true; }
  if (params === '1111111111' || params === '2222222222' || params === '3333333333' ||
    params === '4444444444' || params === '5555555555' || params === '6666666666' ||
    params === '7777777777' || params === '8888888888' || params === '9999999999' || !/^\d{10}$/.test(params)) {
    return false;
  } else {
    const check = parseInt(params[9], undefined);
    let sum = 0;
    let i;
    for (i = 0; i < 9; ++i) {
      sum += parseInt(params[i], undefined) * (10 - i);
    }
    sum %= 11;
    if ((sum < 2 && check === sum) || (sum >= 2 && check + sum === 11)) {
      return true;
    }
  }
}
