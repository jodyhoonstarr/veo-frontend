<template>
  <v-row>
    <v-col>
      <DropDown
        v-model="selected"
        :items="dropDownItems"
        :label="label"
        :loading="loading"
        :multiple="true"
        :persistent-hint="false"
        :selectallable="selectallable"
      />
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
      type: [String, Number],
      default: null
    },
    items: {
      type: [Object, Array],
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
  computed: {
    dropDownItems: function() {
      if (this.items != null && Object.prototype.hasOwnProperty.call(this.items, this.propname)){
        return this.items[this.propname];
      } else {
        return this.items;
      }
    }
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
        this.value == null &&
        Array.isArray(this.items.labels) &&
        this.items.labels.length >= 2
      ) {
        this.selected = this.items.labels.slice(0, 2);
      }
    }
  },
  mounted() {
    this.selected = this.value;
  }
};
</script>

<style scoped></style>
