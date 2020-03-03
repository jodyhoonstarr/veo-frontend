<template>
  <v-row>
    <v-col cols="2"></v-col>
    <v-col cols="10">
      <DropDown
        :items="dropDownItems"
        :label="label"
        :loading="loading"
        v-model="selected"
        :multiple="true"
        @input="emitChangeEvent"
        :persistentHint="true"
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
    }
  },
  data() {
    return {
      selected: null
    };
  },
  methods: {
    emitChangeEvent() {
      console.log("emit event here");
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
