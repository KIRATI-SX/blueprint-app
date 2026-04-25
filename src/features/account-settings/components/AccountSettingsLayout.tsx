import BlogPageLayout from "@/components/layout/BlogPageLayout"
import { PLACEHOLDER_AUTH_USER } from "@/constants/authUserPlaceholder"
import type { AccountSettingsTab } from "@/features/account-settings/model/types"
import type { ReactNode } from "react"
import AccountSettingsSidebar from "./AccountSettingsSidebar"

type AccountSettingsLayoutProps = Readonly<{
  activeTab: AccountSettingsTab
  pageTitle: string
  children: ReactNode
}>

export default function AccountSettingsLayout({
  activeTab,
  pageTitle,
  children,
}: AccountSettingsLayoutProps) {
  return (
    <BlogPageLayout
      mainAriaLabel={`${pageTitle} page`}
      mainClassName="flex flex-1 flex-col"
    >
      <section className="flex flex-1 px-4 py-8 sm:px-6 md:px-12 lg:px-[120px]">
        <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-6 lg:flex-row lg:gap-12">
          <AccountSettingsSidebar activeTab={activeTab} />
          <section className="flex-1">
            <header className="mb-6 flex flex-wrap items-center gap-3">
              <p className="headline-3 text-brown-400">
                {PLACEHOLDER_AUTH_USER.displayName}
              </p>
              <h1 className="headline-3 text-brown-600">{pageTitle}</h1>
            </header>
            <article className="w-full max-w-[560px] rounded-2xl bg-brown-200 p-6 sm:p-8">
              {children}
            </article>
          </section>
        </div>
      </section>
    </BlogPageLayout>
  )
}
