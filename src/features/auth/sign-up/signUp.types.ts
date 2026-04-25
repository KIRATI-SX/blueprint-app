export type SignUpFormValues = {
  fullName: string
  username: string
  email: string
  password: string
}

export type SignUpFieldName = keyof SignUpFormValues

export type SignUpFormErrors = Partial<Record<SignUpFieldName, string>>
