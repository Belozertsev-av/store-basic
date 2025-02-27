<template>
  <div class="wrapper">
    <div class="container">
      <main>
        <accounts />
      </main>
      <footer>
        <Button
          :label="oppositeLocale"
          @click="locale === AppLocales.RU ? (locale = AppLocales.EN) : (locale = AppLocales.RU)"
        />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Accounts } from "@/pages/accounts"
import { useI18n } from "vue-i18n"
import { AppLocales } from "@/shared/lib/i18n"
import { computed } from "vue"

const { locale } = useI18n()

const oppositeLocale = computed(() =>
  locale.value === AppLocales.RU ? AppLocales.EN.toUpperCase() : AppLocales.RU.toUpperCase(),
)
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  padding: 2rem 0;
  overflow: hidden;
}

main {
  display: flex;
  height: 95%;
}

footer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-top: 1rem;
}
</style>
