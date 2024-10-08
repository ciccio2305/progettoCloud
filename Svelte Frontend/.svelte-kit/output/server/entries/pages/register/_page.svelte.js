import { c as create_ssr_component, b as add_attribute, d as each, e as escape, v as validate_component } from "../../../chunks/index.js";
import { c as config } from "../../../chunks/config.js";
import "../../../chunks/endpoints.js";
/* empty css                                                   */const Register_svelte_svelte_type_style_lang = "";
const css = {
  code: '@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap");.svelte-13ecmqh.svelte-13ecmqh{font-family:"Montserrat"}.avviso{position:relative;color:red;margin-bottom:10px}.input{color:black;font-size:17px;word-wrap:break-word;word-break:break-all}.inputError{color:red;font-size:15px;word-wrap:break-word;word-break:break-all}.register_page.svelte-13ecmqh.svelte-13ecmqh{display:flex;position:absolute;top:0%;left:0%;width:100vw;height:100vh;justify-content:center;align-items:center;background-image:url("../../img/bg2.png");background-size:cover;overflow:hidden}.register_container.svelte-13ecmqh.svelte-13ecmqh{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex;width:400px;height:550px;background-color:rgb(255, 255, 255);border-radius:10px;align-items:center;justify-content:space-evenly;flex-direction:column;overflow:hidden}#title.svelte-13ecmqh.svelte-13ecmqh{font-size:30px;font-weight:bold}#form.svelte-13ecmqh.svelte-13ecmqh{display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;width:100%;height:450px}input.svelte-13ecmqh.svelte-13ecmqh{width:90%;height:40px;border-radius:5px;border:none;background-color:rgba(188, 197, 240, 0.5);padding:8px;outline:none}.placeholder.svelte-13ecmqh.svelte-13ecmqh{width:90%;margin-bottom:-15px}#namePlaceholder.svelte-13ecmqh.svelte-13ecmqh{font-weight:bold}#mailPlaceholder.svelte-13ecmqh.svelte-13ecmqh{font-weight:bold}#passPlaceholder.svelte-13ecmqh.svelte-13ecmqh{font-weight:bold}#rPassPlaceholder.svelte-13ecmqh.svelte-13ecmqh{font-weight:bold}#Sezione.svelte-13ecmqh.svelte-13ecmqh{font-weight:bold}.errorPlaceholder.svelte-13ecmqh.svelte-13ecmqh{font-weight:bold;color:red;width:90%;margin-top:-15px}#passIntel.svelte-13ecmqh.svelte-13ecmqh{width:25px;height:25px;position:absolute;top:calc(50% + 28px);left:calc(50% + 220px);transform:translate(-50%, -50%);z-index:2;cursor:pointer;opacity:0}#decoration.svelte-13ecmqh.svelte-13ecmqh{width:20px;height:20px;position:absolute;top:calc(50% + 18px);left:calc(50% + 240px);z-index:2;cursor:pointer;opacity:0}#intel.svelte-13ecmqh.svelte-13ecmqh{width:300px;height:260px;position:absolute;top:calc(50% + 23px);left:calc(50% + 405px);transform:translate(-50%, -50%);cursor:pointer;background-color:white;border-radius:15px;opacity:0;font-weight:600}#submit.svelte-13ecmqh.svelte-13ecmqh{width:90%;height:40px;background-color:rgb(57, 111, 211);color:white;font-size:24px;font-weight:bold;border-radius:5px;cursor:pointer;text-align:center;line-height:40px}.return_login.svelte-13ecmqh.svelte-13ecmqh{text-decoration:underline;cursor:pointer;display:inline-block}#cover{width:100%;height:100%;background-color:rgba(255, 255, 255, 0.5);position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}.errorBanner.svelte-13ecmqh.svelte-13ecmqh{position:absolute;top:calc(50% - 310px);left:50%;transform:translate(-50%, -50%);width:400px;height:50px;background-color:white;border-radius:15px;opacity:0;color:red;font-size:17px;line-height:30px;padding:10px;text-align:center;transition:opacity 0.5s}#homepage.svelte-13ecmqh.svelte-13ecmqh{width:100px;height:50px;background-color:rgb(57, 111, 211);color:white;position:absolute;top:100%;right:100%;transform:translate(-50%, -50%)}.register_container.svelte-13ecmqh span.svelte-13ecmqh{position:absolute;top:0;left:0;width:100%;height:100%;display:none;box-sizing:border-box}.register_container.svelte-13ecmqh span.svelte-13ecmqh:nth-child(1){transform:rotate(0deg)}.register_container.svelte-13ecmqh span.svelte-13ecmqh:before{content:"";position:absolute;width:100%;height:3px;background:rgb(57, 111, 211);animation:svelte-13ecmqh-animate 3s linear infinite}@keyframes svelte-13ecmqh-animate{0%{transform:scaleX(0);transform-origin:left}50%{transform:scaleX(1);transform-origin:left}50.1%{transform:scaleX(1);transform-origin:right}100%{transform:scaleX(0);transform-origin:right}}',
  map: null
};
const Register = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let name = "";
  let email = "";
  let pass = "";
  let confirmed = "";
  let sezioni = [];
  fetch(config.getHost() + "/api/get_all_sections", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  }).then((response) => response.json()).then((data) => {
    sezioni = data;
  });
  $$result.css.add(css);
  return `<div class="register_page svelte-13ecmqh"><div class="errorBanner svelte-13ecmqh"></div>
    <div id="passIntel" class="svelte-13ecmqh"><svg width="100%" height="100%" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-13ecmqh"><path d="M400.344 0.353149C400.238 0.353149 400.097 0.370805 399.991 0.370805C399.868 0.370805 399.762 0.353149 399.638 0.353149C178.941 0.353149 0 179.277 0 400.009C0 620.706 178.941 799.647 399.638 799.647C399.762 799.647 399.868 799.647 399.991 799.647C400.097 799.647 400.238 799.647 400.344 799.647C621.041 799.647 799.982 620.706 799.982 400.009C800 179.277 621.059 0.353149 400.344 0.353149ZM400.344 685.238C400.238 685.238 400.097 685.22 399.991 685.22C399.868 685.22 399.762 685.238 399.638 685.238C363.514 685.238 334.223 655.964 334.223 619.823C334.223 583.717 363.514 554.444 399.638 554.444C399.762 554.444 399.868 554.444 399.991 554.444C400.097 554.444 400.238 554.444 400.344 554.444C436.45 554.444 465.777 583.717 465.777 619.823C465.777 655.947 436.503 685.238 400.344 685.238ZM494.149 186.763C489.877 252.036 460.038 446.161 460.038 446.161C460.038 478.895 433.219 505.414 400.486 505.414C400.309 505.414 400.132 505.414 399.973 505.414C399.815 505.414 399.62 505.414 399.461 505.414C366.745 505.414 339.926 478.859 339.926 446.161C339.926 446.161 310.106 252.036 305.833 186.763C303.714 154.082 328.75 93.399 399.479 93.399C399.656 93.399 399.832 93.4166 399.991 93.4166C400.15 93.4166 400.327 93.399 400.503 93.399C471.214 93.399 496.286 154.082 494.149 186.763Z" fill="#E4DD3C" class="svelte-13ecmqh"></path></svg></div>
    <div id="decoration" class="svelte-13ecmqh"><svg width="100%" height="100%" viewBox="0 0 97 97" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-13ecmqh"><path d="M74.6254 8.5441C73.9716 8.20403 73.2375 8.04843 72.502 8.094C71.7664 8.13957 71.0572 8.38459 70.4504 8.80276L17.9087 45.1778C17.3718 45.5497 16.9331 46.0463 16.6301 46.6249C16.327 47.2034 16.1687 47.8469 16.1687 48.5C16.1687 49.1532 16.327 49.7966 16.6301 50.3752C16.9331 50.9538 17.3718 51.4503 17.9087 51.8223L70.4504 88.1973C71.0567 88.6168 71.7663 88.8625 72.5023 88.9077C73.2382 88.9529 73.9726 88.7959 74.6257 88.4537C75.2788 88.1116 75.8259 87.5972 76.2077 86.9664C76.5895 86.3356 76.7915 85.6124 76.7917 84.875V12.125C76.7919 11.3873 76.5901 10.6635 76.2082 10.0323C75.8263 9.40108 75.2789 8.88642 74.6254 8.5441Z" fill="#FFFFFF" class="svelte-13ecmqh"></path></svg></div>
    <div id="intel" class="svelte-13ecmqh"><ul class="svelte-13ecmqh"><li class="svelte-13ecmqh">La password deve contenere almeno 8 caratteri.</li>
            <br class="svelte-13ecmqh">
            <li class="svelte-13ecmqh">La password deve contenere almeno una lettera maiuscola.</li>
            <br class="svelte-13ecmqh">
            <li class="svelte-13ecmqh">La password deve contenere almeno un numero.</li>
            <br class="svelte-13ecmqh">
            <li class="svelte-13ecmqh">La password deve contenere almeno un carattere speciale. <br class="svelte-13ecmqh"> [
                ] . , : ; ! ?
            </li></ul></div>
    <div class="register_container svelte-13ecmqh"><span id="loader" class="svelte-13ecmqh"></span>
        <div id="title" class="svelte-13ecmqh">Registrati</div>

        <div id="form" class="svelte-13ecmqh"><div class="placeholder svelte-13ecmqh"><div id="namePlaceholder" class="svelte-13ecmqh">Nome</div></div>
            <input class="input svelte-13ecmqh" type="text" name="Nome"${add_attribute("value", name, 0)}>
            <div class="errorPlaceholder svelte-13ecmqh" id="errorName"></div>

            <div class="placeholder svelte-13ecmqh"><div id="mailPlaceholder" class="svelte-13ecmqh">Email</div></div>
            <input class="input svelte-13ecmqh" type="text" name="Email"${add_attribute("value", email, 0)}>
            <div class="errorPlaceholder svelte-13ecmqh" id="errorMail"></div>

            <div class="placeholder svelte-13ecmqh"><div id="passPlaceholder" class="svelte-13ecmqh">Password</div></div>
            <input class="input svelte-13ecmqh" type="password" name="Password"${add_attribute("value", pass, 0)}>
            <div class="errorPlaceholder svelte-13ecmqh" id="errorPass"></div>

            <div class="placeholder svelte-13ecmqh"><div id="rPassPlaceholder" class="svelte-13ecmqh">Ripeti Password</div></div>
            <input class="input svelte-13ecmqh" type="password" name="Password_confirmed"${add_attribute("value", confirmed, 0)}>
            <div class="errorPlaceholder svelte-13ecmqh" id="errorRPass"></div>
            <div class="placeholder svelte-13ecmqh"><div id="Sezione" class="svelte-13ecmqh">Sezione</div></div>
            <select name="sezioni" id="sezioni" class="svelte-13ecmqh">${each(sezioni, (sezione) => {
    return `<option${add_attribute("value", sezione["sezione"], 0)} class="svelte-13ecmqh">${escape(sezione["sezione"])}</option>`;
  })}</select>
            <div id="submit" class="svelte-13ecmqh">Registrati</div></div>

        <div class="svelte-13ecmqh">Hai già un account? <div class="return_login svelte-13ecmqh">Log in
            </div></div></div>
    <div id="homepage" class="svelte-13ecmqh">Homepage</div>
</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Register, "Register").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
