import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let isTrue: boolean = false;
    // it should pass only letters and white spaces
    const nameRegExp =
      /^[A-Za-zА-Яа-яІіЇїЄєҐґ']{3,30}([A-Za-zА-Яа-яІіЇїЄєҐґ'\s'`-]{3,30}){0,1}$/g;
    let res!: string[] | null;

    if (control.value) {
      res = control.value.match(nameRegExp);

      if (res) {
        isTrue = res.join('') === control.value;
      }
    }

    return !isTrue
      ? { name: { message: "ім'я може містити лише букви" } }
      : null;
  };
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/g;
    let isTrue: boolean = false;
    if (control.value) {
      const res = control.value.trim().match(emailRegExp);
      if (res) {
        isTrue = res.join('') === control.value;
      }
    }
    control.parent?.get('email')?.errors;
    return !isTrue ? { email: { message: 'введіть коректний e-mail' } } : null;
  };
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordRegExp =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@#$_!%*?&]{8,16}$/g;
    let isTrue: boolean = false;
    if (control.value) {
      const res = control.value.trim().match(passwordRegExp);
      if (res) {
        isTrue = res.join('') === control.value;
      }
    }

    return !isTrue
      ? {
          password: {
            message:
              'Пароль має містити хочаб один символ, одну заголовну літеру та цифру',
          },
        }
      : null;
  };
}

export function confirmValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.parent?.getRawValue().password;
    const confirmPassword = control.parent?.getRawValue().confirmPassword;

    if (!confirmPassword) {
      return null;
    }

    return confirmPassword !== password
      ? { confirmPassword: { message: 'паролі мають збігатися' } }
      : null;
  };
}

export function phoneValidator(): ValidatorFn {
  const phoneRegExp = /[0-9]{9,9}$/g;

  return (control: AbstractControl): ValidationErrors | null => {
    const res = control.value?.match(phoneRegExp);
    let isTrue = false;

    if (res) {
      isTrue = res.join('') === control.value;
    }

    return isTrue ? null : { phone: { message: 'Некоректний номер телефону' } };
  };
}
