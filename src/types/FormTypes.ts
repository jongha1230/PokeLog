export type BaseFormState = {
  email: string;
  password: string;
};

export type SignUpFormState = BaseFormState & {
  nickname: string;
};

export type BaseFormErrors = {
  email: string;
  password: string;
};

export type SignUpFormErrors = BaseFormErrors & {
  nickname: string;
};
