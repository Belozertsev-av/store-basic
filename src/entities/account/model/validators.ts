import { MaxSymbols100, Required, ValidationRules } from "@/shared/lib"
import { Account, useAccounts } from "@/entities/account"

export const accountValidationRules: ValidationRules<Account> = {
  labels: [
    {
      validator: (value: { text: string }[]) =>
        value.length === 0 || value.every((label) => label.text.length <= 50),
      message: () => "warnings.maxSymbols50",
    },
  ],
  login: [
    Required,
    MaxSymbols100,
    {
      validator: (value: string) => !useAccounts().accounts.some((it) => it.login === value),
      message: () => "warnings.uniqueLogin",
    },
  ],
  password: [
    {
      validator: (value: string | undefined) => !!(value && value.length <= 100),
      message: () => "warnings.maxSymbols100",
    },
  ],
}
