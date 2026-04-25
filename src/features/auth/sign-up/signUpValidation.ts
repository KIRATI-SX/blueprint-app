import type {
  SignUpFieldName,
  SignUpFormErrors,
  SignUpFormValues,
} from "./signUp.types"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USERNAME_PATTERN = /^[a-zA-Z0-9_.-]+$/

function validateFullName(value: string): string | null {
  if (!value.trim()) {
    return "Please enter your full name."
  }
  if (value.trim().length < 2) {
    return "Full name must be at least 2 characters."
  }
  return null
}

function validateUsername(value: string): string | null {
  if (!value.trim()) {
    return "Please enter a username."
  }
  if (value.trim().length < 3) {
    return "Username must be at least 3 characters."
  }
  if (!USERNAME_PATTERN.test(value.trim())) {
    return "Username can use letters, numbers, _, ., and - only."
  }
  return null
}

function validateEmail(value: string): string | null {
  if (!value.trim()) {
    return "Please enter your email."
  }
  if (!EMAIL_PATTERN.test(value.trim())) {
    return "Please enter a valid email address."
  }
  return null
}

function validatePassword(value: string): string | null {
  if (!value) {
    return "Please enter a password."
  }
  if (value.length < 8) {
    return "Password must be at least 8 characters."
  }

  const hasUpper = /[A-Z]/.test(value)
  const hasLower = /[a-z]/.test(value)
  const hasNumber = /[0-9]/.test(value)

  if (!hasUpper || !hasLower || !hasNumber) {
    return "Password must include uppercase, lowercase, and a number."
  }

  return null
}

const VALIDATION_BY_FIELD: Record<
  SignUpFieldName,
  (value: string) => string | null
> = {
  fullName: validateFullName,
  username: validateUsername,
  email: validateEmail,
  password: validatePassword,
}

export function validateSignUpField(
  field: SignUpFieldName,
  value: string,
): string | null {
  return VALIDATION_BY_FIELD[field](value)
}

export function validateSignUpForm(values: SignUpFormValues): SignUpFormErrors {
  return (Object.keys(values) as SignUpFieldName[]).reduce<SignUpFormErrors>(
    (errors, field) => {
      const error = validateSignUpField(field, values[field])
      if (error) {
        errors[field] = error
      }
      return errors
    },
    {},
  )
}
