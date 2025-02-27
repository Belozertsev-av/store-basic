<template>
  <div class="input">
    <Password
      v-if="type === 'password'"
      v-model="modelValue as string"
      :placeholder="t('placeholders.classicInput')"
      class="input__body"
      :class="{ invalid: errors?.length && isFocused }"
      toggleMask
      fluid
      @focusin="isFocused = true"
    />
    <InputText
      v-else
      v-model="modelValue"
      :placeholder="t('placeholders.classicInput')"
      class="input__body"
      :class="{ invalid: errors?.length && isFocused }"
      @focusin="isFocused = true"
    />

    <div
      v-if="errors?.length && isFocused"
      class="input__warnings warning-text invalid"
    >
      <span
        v-for="(error, index) in errors"
        :key="error + index"
      >
        {{ t(error) }}{{ index !== 0 ? "," : "" }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { ref } from "vue"

withDefaults(
  defineProps<{
    errors?: string[]
    type?: "text" | "password"
  }>(),
  {
    type: "text",
  },
)

const { t } = useI18n()

const modelValue = defineModel<string | null>()
const isFocused = ref<boolean>(false)
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  width: 100%;

  &__body {
    width: 100%;
  }

  &__warnings {
    position: absolute;
    left: 0;
    width: 100%;
    margin-top: 0.15rem;
    overflow-x: hidden;
  }
}

.invalid {
  color: var(--p-red-500);
  border-color: var(--p-red-500);

  :deep(.p-password-input) {
    border-color: var(--p-red-500) !important;
  }
}
</style>
