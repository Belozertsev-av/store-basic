<template>
  <form
    class="accounts__row"
    :style="
      isLDAP
        ? 'grid-template-columns: repeat(2, 1fr) 2fr 4rem;'
        : 'grid-template-columns: repeat(4, 1fr) 4rem;'
    "
  >
    <ValidatableInput
      v-model="formValues.labels"
      :errors="formErrors.labels"
      disabled
    />
    <Select
      v-model="formValues.type"
      :options="typeOptions"
    />
    <ValidatableInput
      v-model="formValues.login"
      :errors="formErrors.login"
    />
    <ValidatableInput
      v-if="!isLDAP"
      v-model="formValues.password"
      type="password"
      :errors="formErrors.labels"
    />
    <Button
      icon="pi pi-trash"
      severity="danger"
      size="small"
    />
  </form>
</template>

<script setup lang="ts">
import { ValidatableInput } from "@/shared/ui/validatable-input"
import { computed } from "vue"
import { Account, AccountInput, AccountTypes } from "@/entities/account"
import { Required, useFormValidation, ValidationRules } from "@/shared/lib"
import { useI18n } from "vue-i18n"

const props = defineProps<{
  accoun: Account
}>()

const emit = defineEmits<(e: "deleteForm", form: AccountInput) => void>()

const { t } = useI18n()
const typeOptions = computed(() => [t(AccountTypes.LOCAL), t(AccountTypes.LDAP)])

const isLDAP = computed(() => props.accountForm.type === AccountTypes.LDAP)

const validationRules: ValidationRules<AccountInput> = {
  labels: [Required],
  login: [Required],
  password: [Required],
}
const { formValues, formErrors } = useFormValidation<AccountInput>(
  props.accountForm,
  validationRules,
)
</script>
