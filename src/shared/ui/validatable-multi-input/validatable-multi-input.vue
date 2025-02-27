<template>
  <div class="input">
    <InputText
      v-model="inputValue"
      :placeholder="t('placeholders.labels')"
      class="input__body"
      :class="{ invalid: errors?.length && isFocused }"
      @focusin="isFocused = true"
      @input="updateModelValue"
    />

    <div
      v-if="errors?.length && isFocused"
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

const isFocused = ref<boolean>(false)
const inputValue = ref(modelValue.value.map((item) => item.text).join(";"))

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
    left: 0;
    width: 100%;
    margin-top: 0.15rem;
    overflow-x: hidden;
  }
}

.invalid {
  color: var(--p-red-500);
  border-color: var(--p-red-500);
}
</style>
