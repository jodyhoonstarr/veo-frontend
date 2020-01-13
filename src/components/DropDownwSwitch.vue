<template>
  <v-row>
    <v-col cols="2">
      <v-switch color="primary" @change="activeToggleChange" v-model="activeToggle"></v-switch>
    </v-col>
    <v-col cols="10">
      <DropDown
        :label="label"
        :items="items"
        v-model="selected"
        clearable
        :multiple="activeToggle"
        @input="dropDownSelect"
        :persistentHint="activeToggle"
      ></DropDown>
    </v-col>
  </v-row>
</template>

<script>
import DropDown from "@/components/DropDown.vue";

export default {
  name: "DropDownwSwitch",
  components: {
    DropDown
  },
  props: ["id", "items", "label", "toggle"],
  data() {
    return {
      selected: null,
      activeToggle: this.toggle
    };
  },
  watch: {
    activeToggle: function() {
      this.changeArraytoObj();
      this.changeObjtoArray();
    }
  },
  methods: {
    dropDownSelect() {
      this.$emit("change", {
        id: this.id,
        selected: this.selected,
        toggle: this.activeToggle
      });
    },
    activeToggleChange() {
      this.changeArraytoObj();
      this.changeObjtoArray();
      this.$emit("change", {
        id: this.id,
        selected: this.selected,
        toggle: this.activeToggle
      });
    },
    changeArraytoObj() {
      if (
        this.activeToggle === false &&
        Array.isArray(this.selected) &&
        this.selected.length >= 1
      ) {
        this.selected = this.selected[0];
      }
    },
    changeObjtoArray() {
      if (this.activeToggle && this.selected && !Array.isArray(this.selected)) {
        this.selected = [this.selected];
      }
    }
  }
};
</script>

