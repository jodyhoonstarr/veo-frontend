<template>
  <v-row>
    <v-col cols="2">
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
    </v-col>
    <v-col cols="10">
      <DropDown
        :label="label"
        :items="dropDownItems"
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

export default {
  name: "DropDownwRadio",
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
    toggle: {
      type: Boolean,
      default: null
    },
    loading: {
      type: Boolean,
      default: null
    }
  },
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
    emitChangeEvent() {
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
        this.changeArraytoObj();
        this.changeObjtoArray();
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
