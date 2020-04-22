<template>
  <v-row>
    <v-col>
      <DropDown
        :items="dropDownItems"
        :label="label"
        :loading="loading"
        v-model="selected"
        :multiple="true"
        :persistent-hint="false"
        :selectallable="selectallable"
      ></DropDown>
    </v-col>
  </v-row>
</template>

<script>
import DropDown from "@/components/DropDown";

export default {
  name: "DropDownNoRadio",
  components: {
    DropDown
  },
  props: {
    id: {
      type: String | Number,
      default: null
    },
    items: {
      type: Object | Array,
      default: null
    },
    value: {
      type: Array,
      default: null
    },
    propname: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: null
    },
    detailed: {
      type: Boolean,
      default: false
    },
    selectallable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selected: null
    };
  },
  watch: {
    selected: function() {
      this.$emit("input", this.selected);
    },
    value: function() {
      if (Array.isArray(this.value) && this.value.length >= 1) {
        this.selected = this.value;
      }
    },
    items: function() {
      // select the first two items by default
      if (
        this.value == null ||
        (Array.isArray(this.items.labels) && this.items.labels.length >= 2)
      ) {
        this.selected = this.items.labels.slice(0, 2);
      }
    }
  },
  computed: {
    dropDownItems: function() {
      if (this.items != null && this.items.hasOwnProperty(this.propname)) {
        return this.items[this.propname];
      } else {
        return this.items;
      }
    }
  }
};
</script>

<style scoped></style>
