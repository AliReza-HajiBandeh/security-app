import { ValidationErrors } from '@angular/forms';

export function getErrorText(err: ValidationErrors): string {
  if (err.required) {
    return 'الزامی';
  } else if (err.min) {
    return `حداقل ${err.min.requiredMin}`;
  } else if (err.max) {
    return `حداکثر ${err.min.requiredMax}`;
  } else if (err.minlength) {
    return `حداقل طول ${err.minlength.requiredLength}`;
  } else if (err.maxlength) {
    return `حداکثر طول ${err.maxlength.requiredLength}`;
  } else if(err.exactLength){
    return `طول باید ${err.exactLength} باشد.`
  } else if (err?.userName) {
    return 'عبارت وارد شده بایستی تنها شامل حروف انگلیسی، اعداد یا کارکترهای مجاز باشد!'
  } else if(err?.english) {
    return 'فقط ترکیب حروف انگلیسی با "_" و بدون فاصله!'
  } else if(err?.persian) {
    return 'فقط با حروف فارسی!'
  } else if (err.email) {
    return `ایمیل نامعتبر است`;
  } else if (err.iranianMobileNumber) {
    return `شماره موبایل نامعتبر است`;
  } else if (err.iranianNationalCode) {
    return `کد ملی نامعتبر است`;
  } else if (err.iranianNationalId) {
    return `شناسه ملی نامعتبر است`;
  } else if (err.iranianPhoneNumber) {
    return `شماره تلفن نامعتبر است`;
  } else if (err.fileSize?.maxSize) {
    return `حداکثر ${(err.fileSize?.maxSize / 1024 ).toFixed(1)} کیلو بایت`
  } else if(err.fileTypeَAccept){
    return `فایل باید ${err.fileTypeَAccept} باشد.`
  } else if (err.equalWith?.message) {
    return err.equalWith?.message
  } else if(err.shareholdingCode){
    return `کد سهامداری نامعتبر است.`
  } else {
    return `معتبر نیست`;
  }
}
