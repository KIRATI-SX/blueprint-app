/**
 * สแนปชอต path ก่อนเข้า flow auth (login / signup) สำหรับส่งผ่าน `location.state`
 */
export type AppLocationSnapshot = {
  pathname: string
  search: string
  hash: string
}

/**
 * ค่า state ที่ React Router ส่งระหว่าง /signup -> /registration-success
 */
export type SignUpToRegistrationSuccessState = {
  returnTo: string | null
  fromLoginFlow: boolean
}

/**
 * state ที่ Link กำหนดตอนไป /login หรือ /signup
 */
export type AuthLinkLocationState = {
  from?: AppLocationSnapshot
  fromBeforeAuth?: AppLocationSnapshot
  fromLogin?: boolean
}
