import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";
import SolidLine from "@/assets/icons/SolidLine.vue";
import DashedLine from "@/assets/icons/DashedLine.vue";
import DottedLine from "@/assets/icons/DottedLine.vue";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
    values: {
      solidline: {
        component: SolidLine
      },
      dashedline: {
        component: DashedLine
      },
      dottedline: {
        component: DottedLine
      }
    }
  },
  theme: {
    themes: {
      light: {
        primary: "#112e51",
        secondary: "#78909c",
        accent: "#82b1ff",
        error: "#ff5252",
        info: "#2196f3",
        success: "#4caf50",
        warning: "#ffc107"
      }
    }
  }
});
