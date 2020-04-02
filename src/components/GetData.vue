<script>
import { csvParse } from "d3-dsv";
import axios from "axios";

import {
  cacheAdapterEnhancer,
  throttleAdapterEnhancer
} from "axios-extensions";

const http = axios.create({
  baseURL: "/",
  headers: { "Cache-Control": "no-cache" },
  adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter))
});

export default {
  name: "GetData",
  props: {
    url: {
      type: String,
      required: true
    },
    emit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      response: null,
      loading: true
    };
  },
  created() {
    this.getData();
  },
  render() {
    return this.$scopedSlots.default({
      response: this.response,
      loading: this.loading
    });
  },
  watch: {
    response: function() {
      this.emitEvent();
    },
    url: function() {
      this.getData();
    }
  },
  methods: {
    emitEvent: function() {
      if (this.emit) {
        this.$emit("change", {
          response: this.response,
          loading: this.loading
        });
      }
    },
    randomDelay: (handler, seconds) => {
      const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
      const delay =
        (Math.floor((Math.random() * seconds) / 2) + 1) * plusOrMinus;
      return new Promise((resolve, reject) => {
        setTimeout(handler, (seconds + delay) * 1000);
      });
    },
    getData: function() {
      this.loading = true;
      this.response = null;
      const urlArray = this.url.split(".");
      const lastExtension = urlArray[urlArray.length - 1].toLocaleLowerCase();

      if (lastExtension === "csv") {
        http.get(this.url).then(response => {
          this.loading = false;
          if (response.status === 200) {
            this.response = csvParse(response.data);
          } else {
            this.response = null;
          }
        });
      } else if (lastExtension === "json") {
        http.get(this.url).then(response => {
          this.loading = false;
          if (response.status === 200) {
            this.response = response.data;
          } else {
            this.response = null;
          }
        });
      } else {
        http.get(this.url).then(response => {
          this.loading = false;
          if (response.status === 200) {
            this.response = response.data;
          } else {
            this.response = null;
          }
        });
      }
    }
  }
};
</script>
