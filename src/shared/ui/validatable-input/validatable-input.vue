<template>
  <div class="input">
    <Password
      v-if="type === 'password'"
      v-model="modelValue as string"
      :placeholder="t('placeholders.classicInput')"
      class="input__body"
      :class="{ invalid: errors?.length }"
      toggleMask
      fluid
    />
    <InputText
      v-else
      v-model="modelValue"
      :placeholder="t('placeholders.classicInput')"
      class="input__body"
      :class="{ invalid: errors?.length }"
      Z
    />

    <div
      v-if="errors?.length"
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
    bottom: -1rem;
    left: 0;
    width: 100%;
    overflow-x: hidden;
  }
}

.invalid {
  color: var(--p-red-500);
  border-color: var(--p-red-500);
}
</style>
