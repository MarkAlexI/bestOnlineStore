import { FormGroup } from "@angular/forms";

type IsValid = {
  'box-danger': boolean | undefined;
  'box-success': boolean | undefined;
};

export const isValid = (form: FormGroup, name: string): IsValid => {

  return {
    'box-danger':
      !form.get(name)?.valid && form.get(name)?.touched,
    'box-success':
      form.get(name)?.valid && form.get(name)?.touched,
  };
}
