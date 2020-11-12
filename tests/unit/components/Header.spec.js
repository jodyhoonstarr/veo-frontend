//setup
import "../../setup.js";

// Libraries
// Components
import Header from "@/components/Header";

// Utilities
import { createLocalVue, shallowMount } from "@vue/test-utils";

describe("Header.vue", () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue();
    wrapper = shallowMount(Header, { localVue });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("should have title text on sm+", () => {
    const title = wrapper.find("v-toolbar-title-stub.hidden-xs-only");
    expect(title.text()).toBe("Veteran Employment Outcomes (VEO) Explorer");
  });

  it("should have title abbrev on xs", () => {
    const title = wrapper.find("v-toolbar-title-stub.hidden-sm-and-up");
    expect(title.text()).toBe("VEO");
  });

  it("should have lehd button on sm+", () => {
    const text = wrapper.find("v-btn-stub > span.hidden-xs-only");
    expect(text.text()).toBe("LEHD Home");
  });
});
