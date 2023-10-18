import {ValidationErrors} from "@angular/forms";

export enum FileTypes {
  IMG = '.png,.jpg,.tif',
  DOC = '.doc,.docx,.pdf',
  COMPRESSED = '.rar,.zip',
  XLS = '.xls,.xlsx'
}

export class FileUtil {
    private static cssInjected = false;

    constructor() {
    }

    static getBase64(file: File): Promise<string | ArrayBuffer | null> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    static validate(file: File, type: FileTypes | string = FileTypes.IMG, KB: number = 10000): null | ValidationErrors {
      if (!(type.split(',').includes(`.${file.name.split('.')[file.name.split('.').length - 1]}`))) {
        return {type: {required: type, value: file.type}};
      } else if (+file.size > (KB * 1024)) {
        return {size: {required: KB, value: file.size / 1024}};
      } else {
        return null;
      }
    }
}

