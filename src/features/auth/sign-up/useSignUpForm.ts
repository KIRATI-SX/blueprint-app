import { useMemo, useState } from "react"

import type {
  SignUpFieldName,
  SignUpFormErrors,
  SignUpFormValues,
} from "./signUp.types"
import { validateSignUpField, validateSignUpForm } from "./signUpValidation"

const INITIAL_VALUES: SignUpFormValues = {
  fullName: "",
  username: "",
  email: "",
  password: "",
}

export function useSignUpForm() {
  const [values, setValues] = useState<SignUpFormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<SignUpFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isFormValid = useMemo(
    () => Object.keys(errors).length === 0,
    [errors],
  )

  const handleFieldChange = (field: SignUpFieldName, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }))
    setErrors((previous) => {
      if (!previous[field]) {
        return previous
      }

      const next = { ...previous }
      delete next[field]
      return next
    })
  }

  const handleFieldBlur = (field: SignUpFieldName) => {
    const error = validateSignUpField(field, values[field])
    setErrors((previous) => {
      const next = { ...previous }

      if (error) {
        next[field] = error
      } else {
        delete next[field]
      }

      return next
    })
  }

  const validateBeforeSubmit = () => {
    const nextErrors = validateSignUpForm(values)
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const startSubmitting = () => setIsSubmitting(true)
  const stopSubmitting = () => setIsSubmitting(false)

  return {
    values,
    errors,
    isFormValid,
    isSubmitting,
    handleFieldChange,
    handleFieldBlur,
    validateBeforeSubmit,
    startSubmitting,
    stopSubmitting,
  }
}
