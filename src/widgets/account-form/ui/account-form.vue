<template>
  <form
    class="form__row"
    :style="
      isLDAP
        ? 'grid-template-columns: repeat(2, 1fr) 2fr 2rem;'
        : 'grid-template-columns: repeat(4, 1fr) 2rem;'
    "
  >
    <ValidatableMultiInput
      v-model="formValues.labels"
      class="form__element"
      :errors="formErrors.labels as string[]"
    />
    <Select
      v-model="formValues.type"
      class="form__element-select"
      :options="translatedTypeOptions"
      :placeholder="t('placeholders.type')"
      option-label="label"
      option-value="value"
    />
    <ValidatableInput
      v-model="formValues.login"
      class="form__element"
      :errors="formErrors.login"
    />
    <ValidatableInput
      v-if="!isLDAP"
      v-model="formValues.password"
      class="form__element"
      type="password"
      :errors="formErrors.password"
    />
    <div class="form__button">
      <Button
        v-if="isEditing"
        icon="pi pi-save"
        severity="success"
        :disabled="hasErrors"
        size="small"
        @click="accountsStore.editAccount(account.login, formValues)"
      />
      <Button
        v-else
        icon="pi pi-trash"
        severity="danger"
        size="small"
        @click="accountsStore.removeAccount(account.login)"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ValidatableInput } from "@/shared/ui/validatable-input"
import { computed, ref } from "vue"
import { Account, AccountTypes, useAccounts, accountValidationRules } from "@/entities/account"
import { MaxSymbols100, Required, useFormValidation } from "@/shared/lib"
import { ValidatableMultiInput } from "@/shared/ui/validatable-multi-input"
import { useI18n } from "vue-i18n"
import { deepCompare } from "@/shared/utils"

const props = defineProps<{
  account: Account
}>()

const accountsStore = useAccounts()
const { t } = useI18n()

const typeOptions = computed(() => [AccountTypes.LOCAL, AccountTypes.LDAP])
const translatedTypeOptions = computed(() => {
  return typeOptions.value.map((option) => ({
    label: t(option),
    value: option,
  }))
})

const tempAccount = ref<Account>({ ...props.account })

const isEditing = computed(() => {
  return !deepCompare(tempAccount.value, props.account)
})
const isLDAP = computed(() => tempAccount.value.type === AccountTypes.LDAP)

const { formValues, formErrors, hasErrors } = useFormValidation<Account>(tempAccount.value, {
  ...accountValidationRules,
  login: [
    Required,
    MaxSymbols100,
    {
      validator: (value: string) =>
        value === props.account.login || !accountsStore.accounts.some((it) => it.login === value),
      message: () => "warnings.uniqueLogin",
    },
  ],
})
</script>

<style lang="scss" scoped>
.form {
  &__row {
    display: grid;
    padding: 0.5rem 0;
  }

  &__element-select {
    margin-right: 1rem;
  }

  &__element {
    padding-right: 1rem;
  }

  &__button {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
