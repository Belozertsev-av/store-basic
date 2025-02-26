export interface AccountInput {
  labels: string
  type: string
  login: string
  password?: string
}

export enum AccountTypes {
  LOCAL = "local",
  LDAP = "LDAP",
}
