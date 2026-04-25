import {
  AccountSettingsLayout,
  ResetPasswordForm,
} from "@/features/account-settings"

export default function ResetPasswordPage() {
  return (
    <AccountSettingsLayout activeTab="reset-password" pageTitle="Reset password">
      <ResetPasswordForm />
    </AccountSettingsLayout>
  )
}
