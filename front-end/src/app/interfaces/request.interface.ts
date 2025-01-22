export interface REQUEST<T> {
  body: PAYLOAD<T>;
}

export interface PAYLOAD<T> {
  message: string;
  payload: { user: T; token: string };
  isAdmin: boolean;
  text: string;
}
