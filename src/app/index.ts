import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./app.vue"
import PrimeVue from "primevue/config"
import Aura from "@primeuix/themes/aura"

import "primeicons/primeicons.css"
import "./styles/main.scss"

import { i18n } from "@/shared/lib/i18n"
import { Button, Card, InputText, Password, Select } from "primevue"
import { definePreset } from "@primeuix/themes"

const preset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{amber.50}",
      100: "{amber.100}",
      200: "{amber.200}",
      300: "{amber.300}",
      400: "{amber.400}",
      500: "{amber.500}",
      600: "{amber.600}",
      700: "{amber.700}",
      800: "{amber.800}",
      900: "{amber.900}",
      950: "{amber.950}",
    },
  },
})

export const app = createApp(App)
  .use(i18n)
  .use(PrimeVue, {
    theme: {
      preset: preset,
    },
  })
  .use(createPinia())
  .component("Button", Button)
  .component("InputText", InputText)
  .component("Password", Password)
  .component("Select", Select)
  .component("Card", Card)
