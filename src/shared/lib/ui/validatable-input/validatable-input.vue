<template>
  <div class="input">
    <Password
      v-if="type === 'password'"
      v-model="modelValue"
      class="input__body"
      :class="{ invalid: errors?.length }"
      toggleMask
      fluid
    />
    <InputText
      v-else
      v-model="modelValue"
      placeholder="Введите значения через ;"
      class="input__body"
      :class="{ invalid: errors?.length }"
    />

    <div
      v-if="errors?.length"
      class="input__warnings warning-text invalid"
    >
      <span
        v-for="(error, index) in errors"
        :key="error + index"
      >
        {{ error }}{{ index !== 0 ? "," : "" }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    errors?: string[]
    type?: "text" | "password"
  }>(),
  {
    type: "text",
  },
)

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
