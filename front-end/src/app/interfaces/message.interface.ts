export interface Message {
  text: string;
  errorText?: string;
  type: Type;
}

export type Type = 'success' | 'danger' | 'warning';

export interface ResMessage extends Message {
  payload: {};
}
