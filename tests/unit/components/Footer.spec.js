//setup
import "../../setup.js";

// Libraries

// Components
import Footer from "@/components/Footer";

// Utilities
import { shallowMount, createLocalVue } from "@vue/test-utils";

describe("Footer.vue", () => {
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue();
    wrapper = shallowMount(Footer, { localVue });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it("contains link text Acessibility", () => {
    const text = "Accessibility";
    expect(wrapper.text()).toContain(text);
  });

  it("contains link text Information Quality", () => {
    const text = "Information Quality";
    expect(wrapper.text()).toContain(text);
  });

  it("contains link text FOIA", () => {
    const text = "FOIA";
    expect(wrapper.text()).toContain(text);
  });

  it("contains link text Data Protection and Privacy Policy", () => {
    const text = "Data Protection and Privacy Policy";
    expect(wrapper.text()).toContain(text);
  });

  it("contains link text US DOC", () => {
    const text = "U.S. Department of Commerce";
    expect(wrapper.text()).toContain(text);
  });

  it("contains link text FAQ", () => {
    const text = "Release Notes and FAQs";
    expect(wrapper.text()).toContain(text);
  });

  it("contains link text Slogan", () => {
    const text = "Measuring America's People, Places and Economy";
    expect(wrapper.text()).toContain(text);
  });
});
