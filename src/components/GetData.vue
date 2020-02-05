<script>
import { csv } from "d3";
import { get } from "axios";

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
        csv(this.url).then(data => {
          // const handler = () => {
          //   this.loading = false;
          //   this.response = data;
          // };
          // this.randomDelay(handler, 1);
          this.loading = false;
          this.response = data;
        });
      } else if (lastExtension === "json") {
        get(this.url).then(response => {
          // const handler = () => {
          //   this.loading = false;
          //   this.response = response.data;
          // };
          // this.randomDelay(handler, 1);
          this.loading = false;
          this.response = response.data;
        });
      } else {
        get(this.url).then(response => {
          this.loading = false;
          this.response = response.data;
        });
      }
    }
  }
};
</script>
