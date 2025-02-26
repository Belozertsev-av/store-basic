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
        <AccountForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { AccountForm } from "@/widgets/account-form"

const { t } = useI18n()
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
    gap: 0.5rem;
    align-items: center;
    width: fit-content;
    margin-bottom: 1rem;

    &-icon {
      padding: 0.25rem;
      color: var(--p-primary-900);
      border: 1.5px solid var(--p-primary-900);
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
      padding-bottom: 0.5rem;
      text-align: left;
    }
  }

  &__row {
    display: grid;
    grid-gap: 1rem;
  }
}
</style>
