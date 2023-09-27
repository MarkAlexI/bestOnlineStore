export interface REQUEST {
  body: PAYLOAD;
}

export interface PAYLOAD {
  message: string;
  payload: {
    name?: string;
    email: string;
    _id: string;
    token: string;
    expDate?: string;
    phone?: string;
    isAdmin?: boolean;
    isAnonymous?: boolean;
  };
  isAdmin: boolean;
  text: string;
}
