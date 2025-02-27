export interface AccountInput {
  labels: string
  type: string
  login: string
  password?: string
}

export interface Account {
  labels: { text: string }[]
  type: "local" | "LDAP"
  login: string
  password?: string
}

export enum AccountTypes {
  LOCAL = "local",
  LDAP = "LDAP",
}

export const emptyAccount: Account = {
  login: "",
  type: "local",
  labels: [],
  password: "",
}
