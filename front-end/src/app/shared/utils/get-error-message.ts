import { ValidationErrors } from '@angular/forms';

export const getErrorValidationMessage = (
  validatorName: string,
  validatorErrors?: ValidationErrors
): string | undefined => {
  let args = messages
    .get(validatorName)
    ?.validatorErrorsKey?.map((name) => validatorErrors?.[name]);

  return args
    ? stringFormat(messages.get(validatorName)?.message, ...args)
    : validatorErrors?.['message'];
  // messages.get(validatorName)?.message;
};

const messages = new Map<
  string,
  { message: string; validatorErrorsKey?: string[] }
>([
  ['required', { message: 'Це поле не може бути порожнім' }],
  [
    'minlength',
    {
      message: 'Має містити не менше {0} символів',
      validatorErrorsKey: ['requiredLength'],
    },
  ],
  [
    'maxlength',
    {
      message: 'Не має містити понад {0} символів',
      validatorErrorsKey: ['requiredLength'],
    },
  ],
  // ['email', { message: 'Email має бути коректним' }],
  // ['confirmPassword', { message: 'Паролі мають збігатися' }],
  // ['name', { message: 'Використовуйте лише букви' }],
  // [
  //   'password',
  //   {
  //     message:
  //       'Пароль має містити хочаб один символ, одну заголовну літеру та цифру',
  //   },
  // ],
]);

function stringFormat(template: string | undefined, ...args: any[]) {
  if (template) {
    return template.replace(/{(\d+)}/g, (match, index) => {
      return typeof args[index] !== 'undefined' ? args[index] : match;
    });
  }
  return undefined;
}
