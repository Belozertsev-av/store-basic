<template>
  <div class="accounts card">
    <div class="accounts__header title">
      <span>{{ t("accounts") }}</span>
      <Button
        icon="pi pi-plus"
        size="small"
        variant="outlined"
      />
    </div>
    <div class="accounts__alert alert">
      <i class="accounts__alert-icon pi pi-question" />
      <span class="accounts__alert-text">{{ t("alertText") }}</span>
    </div>
    <div class="accounts__body">
      <div
        class="accounts__body-header"
        style="grid-template-columns: repeat(4, 1fr) 4rem"
      >
        <div class="accounts__body-header-item label">{{ t("labels") }}</div>
        <div class="accounts__body-header-item label">{{ t("type") }}</div>
        <div class="accounts__body-header-item label">{{ t("login") }}</div>
        <div class="accounts__body-header-item label">
          {{ t("password") }}
        </div>
      </div>
      <div class="accounts__body-content">
        <div
          class="accounts__row"
          :style="
            isLDAP
              ? 'grid-template-columns: repeat(2, 1fr) 2fr 4rem;'
              : 'grid-template-columns: repeat(4, 1fr) 4rem;'
          "
        >
          <InputText
            v-model="formValues.labels"
            placeholder="Введите значения через ;"
            :class="{ 'p-invalid': formErrors.labels?.length }"
          />
          <span
            v-if="formErrors.labels?.length"
            class="accounts__warning p-invalid"
          >
            {{ formErrors.labels }}
          </span>
          <Select
            v-model="formValues.type"
            :options="typeOptions"
          />
          <InputText v-model="formValues.login" />
          <InputText
            v-if="!isLDAP"
            v-model="formValues.password"
          />
          <Button
            icon="pi pi-trash"
            severity="danger"
            size="small"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { computed, reactive } from "vue"
import { type AccountInput, AccountTypes } from "@/pages/entities"
import { useFormValidation, type ValidationRules } from "@/shared/lib"

const { t } = useI18n()

const isLDAP = computed(() => form.type === AccountTypes.LDAP)

const form = reactive<AccountInput>({
  type: t(AccountTypes.LOCAL),
  labels: null,
  login: null,
})
const validationRules: ValidationRules<AccountInput> = {
  labels: [
    {
      validator: (value) => !!value,
      message: () => t("problems.required"),
    },
  ],
  login: [
    {
      validator: (value) => !!value,
      message: () => t("problems.required"),
    },
  ],
  password: [
    {
      validator: (value) => (value === AccountTypes.LOCAL ? !!value : true),
      message: () => t("problems.required"),
    },
  ],
}
const { formValues, formErrors } = useFormValidation<AccountInput>(form, validationRules)

const typeOptions = reactive([t(AccountTypes.LOCAL), t(AccountTypes.LDAP)])
</script>

<style lang="scss" scoped>
.accounts {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100%;

  &__header {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  &__alert {
    display: flex;
    align-items: center;
    width: fit-content;
    gap: 0.5rem;
    margin-bottom: 1rem;

    &-icon {
      border: 1.5px solid var(--p-primary-900);
      color: var(--p-primary-900);
      padding: 0.25rem;
      border-radius: 50%;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;

    &-header {
      display: grid;
      grid-gap: 1rem;
      text-align: left;
      padding-bottom: 0.5rem;
    }
  }

  &__row {
    display: grid;
    grid-gap: 1rem;
  }
}

.p-invalid {
  border-color: var(--p-red-500);
  color: var(--p-red-500);
}
</style>
