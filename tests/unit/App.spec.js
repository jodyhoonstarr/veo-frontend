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

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("contains the header", () => {
    expect(wrapper.contains("header-stub")).toBe(true);
  });

  it("contains the footer", () => {
    expect(wrapper.contains("footer-stub")).toBe(true);
  });

  it("contains the navbar", () => {
    expect(wrapper.contains("navbar-stub")).toBe(true);
  });

  it("contains the router-view", () => {
    expect(wrapper.contains("router-view-stub")).toBe(true);
  });
});
