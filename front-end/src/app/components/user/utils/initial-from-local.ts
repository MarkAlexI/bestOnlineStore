import { FormGroup } from '@angular/forms';
import { isValid } from './is-valid';

// get initial value from localStorage and apply it to form field
export const setupInitialValue = (form: FormGroup, controls?: any): void => {
  const value = JSON.parse(localStorage.getItem('user')!).payload;
  if (controls) {
    for (const control in controls) {
      form.get(control)?.setValue('');
      isValid(form, control);
    }
  }
  for (const key in value) {
    if (form.get(key) && value[key]) {
      form.get(key)?.setValue(value[key]);
      isValid(form, key);
    }
  }
};
