<template>
  <v-row>
    <v-col cols="2">
      <v-btn
        icon
        :ripple="false"
        color="primary"
        @click="activeToggleChange"
        class="v-input--selection-controls"
      >
        <v-icon v-if="activeToggle">mdi-radiobox-marked</v-icon>
        <v-icon v-else>mdi-radiobox-blank</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="10">
      <DropDown
        :label="label"
        :items="items"
        v-model="selected"
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
    toggle: function() {
      this.activeToggle = this.toggle;
      this.changeArraytoObj();
      this.changeObjtoArray();
    },
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
      if (this.activeToggle === false) {
        this.activeToggle = true;
        this.changeArraytoObj();
        this.changeObjtoArray();
        this.$emit("change", {
          id: this.id,
          selected: this.selected,
          toggle: this.activeToggle
        });
      }
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

<style lang="scss" scoped>
.v-btn:before {
  display: none;
}
.v-btn.v-ripple__animation {
  display: none;
}
.v-btn:focus {
  outline: none;
}
</style>
