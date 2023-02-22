<template>
  <v-row>
    <v-col cols="2">
      <v-row class="justify-center">
        <v-btn
          icon
          :loading="loading"
          :ripple="false"
          color="primary"
          :class="{
            'v-input--selection-controls': true,
            'mt-0': $vuetify.breakpoint.xs
          }"
          @click="activeToggleChange"
        >
          <v-icon
            :color="toggle ? 'primary' : 'grey'"
            large
          >
            {{
              radioIcon
            }}
          </v-icon>
        </v-btn>
      </v-row>
    </v-col>
    <v-col cols="10">
      <DetailDropDown
        v-if="detailed"
        v-model="selected"
        :items="dropDownItems"
        :label="label"
        :loading="loading"
        :multiple="toggle"
        :persistent-hint="toggle"
        :selectallable="selectallable && toggle"
        close
      />
      <DropDown
        v-else
        v-model="selected"
        :items="dropDownItems"
        :label="label"
        :loading="loading"
        :multiple="toggle"
        :persistent-hint="toggle"
        :selectallable="selectallable && toggle"
      />
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
    },
    selectallable: {
      type: Boolean,
      default: true
    },
    value: {
      type: Object,
      default: function() {
        return { selected: null, toggle: false };
      },
      validator: function(obj) {
        return obj.hasOwnProperty("selected") && obj.hasOwnProperty("toggle");
      }
    }
  },
  data() {
    return {
      selected: null,
      toggle: null
    };
  },
  computed: {
    dropDownItems: function() {
      if (this.items != null && this.items.hasOwnProperty(this.propname)) {
        return this.items[this.propname];
      } else {
        return this.items;
      }
    },
    radioIcon: function() {
      return this.toggle ? "mdi-radiobox-marked" : "mdi-radiobox-blank";
    }
  },
  watch: {
    value: {
      handler(val) {
        this.toggle = val.toggle;
      },
      deep: true
    },
    items: function() {
      if (this.value.selected == null) {
        this.selectDefaults();
      }
    },
    selected: function() {
      this.emitChangeEvent();
    },
    toggle: function() {
      this.selectDefaults();
    }
  },
  mounted() {
    this.toggle = this.value.toggle;
    this.selected = this.value.selected;
  },
  methods: {
    selectDefaults() {
      if (this.dropDownItems != null && this.items != null) {
        // if it's the active toggle and there are 2 options available, select both
        if (this.toggle && this.dropDownItems.length >= 2) {
          this.selected = [this.dropDownItems[0], this.dropDownItems[1]];
          // if its the active toggle but only one option is available, select it
        } else if (this.toggle && this.dropDownItems.length >= 1) {
          this.selected = [this.dropDownItems[0]];
          // if it's not the active toggle and there's at least one option, select it as an object
        } else if (!this.toggle && this.dropDownItems.length >= 1) {
          this.selected = this.dropDownItems[0];
        }
      }
    },
    emitChangeEvent() {
      this.changeArraytoObj();
      this.changeObjtoArray();
      this.$emit("input", {
        selected: this.toArray(this.selected), //always return array
        toggle: this.toggle
      });
    },
    toArray: function(obj) {
      return !Array.isArray(obj) ? [obj] : obj;
    },
    activeToggleChange() {
      if (this.toggle !== true) {
        this.toggle = true;
        this.emitChangeEvent();
      }
    },
    changeArraytoObj() {
      if (
        this.toggle === false &&
        Array.isArray(this.selected) &&
        this.selected.length >= 1
      ) {
        this.selected = this.selected[0];
      }
    },
    changeObjtoArray() {
      if (this.toggle && this.selected && !Array.isArray(this.selected)) {
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
