import { FormGroup } from '@angular/forms';
import { isValid } from './is-valid';

// get initial value from localStorage and apply it to form field
export const setupInitialValue = (form: FormGroup, controls?: any): void => {
  if (controls) {
    for (const control in controls) {
      if (control !== 'allImages') {
        form.get(control)?.patchValue(controls[control]);
        isValid(form, control);
      }
    }
  }
};
