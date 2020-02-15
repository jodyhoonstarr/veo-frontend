//setup
import "../setup.js";

// Libraries

// Components
import App from "@/App.vue";

// Utilities
import { shallowMount, createLocalVue } from "@vue/test-utils";

describe("App.vue", () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue();
    wrapper = shallowMount(App, { localVue });
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });
});
