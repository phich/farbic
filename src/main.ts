import App from "./App.vue";
import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import router from "./router";
import i18n from "./language";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import "@/Assets/styles.scss";
import "@/Assets/tailwind.css";
import "@cyhnkckali/vue3-color-picker/dist/style.css";

import Tooltip from "primevue/tooltip";
const app = createApp(App);
app.use(ToastService);
app.use(ConfirmationService);
app.use(router);
app.use(i18n);
app.directive("tooltip", Tooltip);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".app-dark",
    },
  },
});
app.mount("#app");
