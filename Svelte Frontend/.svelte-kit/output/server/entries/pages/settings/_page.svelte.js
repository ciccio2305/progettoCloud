import { c as create_ssr_component, v as validate_component } from "../../../chunks/index.js";
import "../../../chunks/SideMenu.svelte_svelte_type_style_lang.js";
import "../../../chunks/Dashboard.svelte_svelte_type_style_lang.js";
import "../../../chunks/endpoints.js";
const SettingsContainer_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');",
  map: null
};
const SettingsContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return ``;
});
const Settings_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');.homePage{width:100vw;height:100vh;display:flex;align-items:center;justify-content:left}",
  map: null
};
const Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(SettingsContainer, "SettingManager").$$render($$result, {}, {}, {})}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Settings, "Settings").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
