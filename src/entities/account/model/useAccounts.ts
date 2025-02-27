import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { Account } from "@/entities/account"

export const useAccounts = defineStore("Accounts", () => {
  const accounts = ref<Account[]>([])

  const isInProcess = ref<boolean>(false)
  const isCreationInProcess = computed(() => isInProcess.value)

  const addNewAccount = () => (isInProcess.value = true)

  const removeAccount = (login: string) =>
    (accounts.value = accounts.value.filter((it) => it.login !== login))

  const saveAccount = (account: Account) => {
    isInProcess.value = false
    accounts.value = [...accounts.value, account]
  }

  const editAccount = (login: string, newValues: Account) => {
    const accountToEdit = accounts.value.find((account) => account.login === login)
    if (accountToEdit) {
      accountToEdit.login = newValues.login
      accountToEdit.labels = newValues.labels
      accountToEdit.type = newValues.type
      accountToEdit.password = newValues.password
    }
  }

  return {
    accounts,
    isCreationInProcess,
    editAccount,
    addNewAccount,
    removeAccount,
    saveAccount,
  }
})
