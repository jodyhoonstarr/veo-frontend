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
  watch: {
    response: function() {
      this.emitEvent();
    },
    url: function() {
      this.getData();
    }
  },
  created() {
    this.getData();
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
    getData: function() {
      this.loading = true;
      this.response = null;
      const urlArray = this.url.split(".");
      const lastExtension = urlArray[urlArray.length - 1].toLocaleLowerCase();

      http
        .get(this.url)
        .then(response => {
          this.loading = false;
          if (response.status === 200) {
            if (lastExtension === "csv") {
              this.response = csvParse(response.data);
            } else {
              this.response = response.data;
            }
          } else {
            this.response = null;
          }
        })
        .catch(() => {
          this.loading = false;
          this.response = null;
        });
    }
  },
  render() {
    return this.$scopedSlots.default({
      response: this.response,
      loading: this.loading
    });
  }
};
</script>
