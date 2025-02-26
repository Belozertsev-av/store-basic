export interface AccountInput {
  labels: string | null
  type: string | null
  login: string | null
  password?: string | null
}

export enum AccountTypes {
  LOCAL = "local",
  LDAP = "LDAP",
}
