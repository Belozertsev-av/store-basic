<template>
  <div class="input">
    <InputText
      v-model="inputValue"
      :placeholder="t('placeholders.labels')"
      class="input__body"
      :class="{ invalid: errors?.length }"
      @input="updateModelValue"
    />

    <div
      v-if="errors?.length"
      class="input__warnings warning-text invalid"
    >
      <span
        v-for="(error, index) in errors"
        :key="error"
      >
        {{ t(error) }}{{ index !== 0 ? "," : "" }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { debounce } from "@/shared/utils"

defineProps<{
  errors?: string[]
}>()

const { t } = useI18n()

const modelValue = defineModel<{ text: string }[]>({
  required: true,
})

const inputValue = ref(modelValue.value.map((item) => item.text).join("; "))

const updateModelValue = debounce(() => {
  const texts = inputValue.value
    .split(";")
    .map((text) => text.trim())
    .filter((text) => text.length > 0)
    .map((text) => ({ text }))
  modelValue.value = texts
}, 500)
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
