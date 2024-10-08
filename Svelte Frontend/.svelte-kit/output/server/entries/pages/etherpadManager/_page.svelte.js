import { c as create_ssr_component, b as add_attribute, v as validate_component } from "../../../chunks/index.js";
const EtherpadManager_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');.svelte-1lna2c7{font-family:'Montserrat';margin:0px;padding:0px;box-sizing:border-box}.homePage{width:100vw;height:100vh;display:flex}#etherpadContainer.svelte-1lna2c7{width:100%;height:100%;display:flex;align-items:center;justify-content:center}#iframe.svelte-1lna2c7{width:100%;height:100%}",
  map: null
};
const EtherpadManager = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let padSrc = localStorage.getItem("padSrc");
  $$result.css.add(css);
  return `<div id="etherpadContainer" class="svelte-1lna2c7"><iframe title="etherpad" id="iframe"${add_attribute("src", padSrc, 0)} width="600" height="400" frameborder="0" class="svelte-1lna2c7"></iframe> 
    </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(EtherpadManager, "EtherpadManager").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
