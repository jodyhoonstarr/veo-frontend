<script>
import { csv } from "d3";
import { get } from "axios";

export default {
  name: "GetData",
  props: ["url"],
  data() {
    return {
      response: null,
      loading: true
    };
  },
  created() {
    const urlArray = this.url.split(".");
    const lastExtension = urlArray[urlArray.length - 1].toLocaleLowerCase();
    if (lastExtension === "csv") {
      csv(this.url).then(data => {
        this.response = data;
        this.loading = false;
      });
    } else if (lastExtension === "json") {
      get(this.url).then(response => {
        this.response = response.data;
        this.loading = false;
      });
    } else {
      get(this.url).then(response => {
        this.response = response.data;
        this.loading = false;
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
