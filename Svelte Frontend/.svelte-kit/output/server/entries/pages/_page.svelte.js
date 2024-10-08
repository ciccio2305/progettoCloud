import { c as create_ssr_component, v as validate_component } from "../../chunks/index.js";
import { L as Login } from "../../chunks/Login.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Login, "Login").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
