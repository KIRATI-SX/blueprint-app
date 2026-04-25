export type AuthUser = Readonly<{
  displayName: string
  avatarUrl: string
}>

/** Dev placeholder profile when auth is the localStorage flag. */
export const PLACEHOLDER_AUTH_USER: AuthUser = {
  displayName: "Moodeng ja",
  avatarUrl:
    "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=128&h=128&fit=crop&auto=format",
}
