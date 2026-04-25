import {
  AccountSettingsLayout,
  ProfileSettingsForm,
} from "@/features/account-settings"

export default function ProfilePage() {
  return (
    <AccountSettingsLayout activeTab="profile" pageTitle="Profile">
      <ProfileSettingsForm />
    </AccountSettingsLayout>
  )
}
