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
      :options="translatedTypeOptions"
      class="form__element-select"
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
        icon="pi pi-save"
        severity="success"
        :disabled="hasErrors"
        size="small"
        @click="emit('saveAccount', formValues)"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ValidatableInput } from "@/shared/ui/validatable-input"
import { computed, ref, watch } from "vue"
import { Account, AccountTypes, accountValidationRules, emptyAccount } from "@/entities/account"
import { useFormValidation } from "@/shared/lib"
import { ValidatableMultiInput } from "@/shared/ui/validatable-multi-input"
import { useI18n } from "vue-i18n"

const emit = defineEmits<(e: "saveAccount", account: Account) => void>()

const { t } = useI18n()

const typeOptions = computed(() => [AccountTypes.LOCAL, AccountTypes.LDAP])
const translatedTypeOptions = computed(() => {
  return typeOptions.value.map((option) => ({
    label: t(option),
    value: option,
  }))
})
const account = ref<Account>({ ...emptyAccount })
const isLDAP = computed(() => account.value.type === AccountTypes.LDAP)

const { formValues, formErrors, hasErrors } = useFormValidation<Account>(account.value, {
  ...accountValidationRules,
  password: isLDAP.value ? [] : accountValidationRules.password,
})

watch(isLDAP, (newVal) => {
  if (newVal) {
    formErrors.value.password = []
  }
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
