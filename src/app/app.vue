<template>
  <div class="wrapper">
    <main>
      <div class="container">
        <accounts />
      </div>
    </main>
    <footer>
      <div class="container">
        <div class="footer-body">
          <Button
            :label="oppositeLocale"
            @click="locale === AppLocales.RU ? (locale = AppLocales.EN) : (locale = AppLocales.RU)"
          />
        </div>
      </div>
    </footer>
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
  padding: 4rem 0;
}

.footer-body {
  display: flex;
  justify-content: flex-end;
}

main {
  height: 100%;
}
</style>
