<template>
  <v-row>
    <v-col cols="2">
      <v-row class="justify-center">
        <v-btn
          icon
          :loading="loading"
          :ripple="false"
          color="primary"
          @click="activeToggleChange"
          class="v-input--selection-controls"
        >
          <v-icon v-if="activeToggle">mdi-radiobox-marked</v-icon>
          <v-icon v-else>mdi-radiobox-blank</v-icon>
        </v-btn>
      </v-row>
    </v-col>
    <v-col cols="10">
      <DetailDropDown
        v-if="detailed"
        :items="dropDownItems"
        :label="label"
        :loading="loading"
        v-model="selected"
        :multiple="activeToggle"
        @input="emitChangeEvent"
        :persistentHint="activeToggle"
        close
      ></DetailDropDown>
      <DropDown
        v-else
        :items="dropDownItems"
        :label="label"
        :loading="loading"
        v-model="selected"
        :multiple="activeToggle"
        @input="emitChangeEvent"
        :persistentHint="activeToggle"
      ></DropDown>
    </v-col>
  </v-row>
</template>

<script>
import DropDown from "@/components/DropDown.vue";
import DetailDropDown from "@/components/DetailDropDown";

export default {
  name: "DropDownwRadio",
  components: {
    DropDown,
    DetailDropDown
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
    toggle: {
      type: Boolean,
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
      selected: null,
      activeToggle: null
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
    },
    items: function() {
      if (this.selected == null && this.items != null) {
      }
      if (this.dropDownItems != null) {
        // if it's the active toggle and there are 2 options available, select both
        if (this.activeToggle && this.dropDownItems.length >= 2) {
          this.selected = [this.dropDownItems[0], this.dropDownItems[1]];
          // if its the active toggle but only one option is available, select it
        } else if (this.activeToggle && this.dropDownItems.length >= 1) {
          this.selected = [this.dropDownItems[0]];
          // if it's not the active toggle and there's at least one option, select it as an object
        } else if (!this.activeToggle && this.dropDownItems.length >= 1) {
          this.selected = this.dropDownItems[0];
        }
      }
    },
    selected: function() {
      this.emitChangeEvent();
    }
  },
  methods: {
    emitChangeEvent() {
      this.changeArraytoObj();
      this.changeObjtoArray();
      this.$emit("change", {
        id: this.id,
        selected: this.toArray(this.selected), //always return array
        toggle: this.activeToggle
      });
    },
    toArray: function(obj) {
      return !Array.isArray(obj) ? [obj] : obj;
    },
    activeToggleChange() {
      if (this.activeToggle === false) {
        this.activeToggle = true;
        this.emitChangeEvent();
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
  },
  computed: {
    dropDownItems: function() {
      if (this.items != null && this.items.hasOwnProperty(this.propname)) {
        return this.items[this.propname];
      } else {
        return this.items;
      }
    }
  },
  mounted() {
    this.activeToggle = this.toggle;
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
