import { c as create_ssr_component } from "./index.js";
import "./endpoints.js";
/* empty css                                     */const css = {
  code: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400&display=swap');.svelte-11ixyb0.svelte-11ixyb0{font-family:'Montserrat';margin:0px;padding:0px;box-sizing:border-box}.login_page.svelte-11ixyb0.svelte-11ixyb0{display:flex;justify-content:center;width:100vw;height:100vh;background-image:url("../../img/bg2.png");background-size:cover}.login_container.svelte-11ixyb0.svelte-11ixyb0{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex;width:400px;height:400px;background-color:rgb(255, 255, 255);border-radius:10px;align-items:center;justify-content:space-evenly;flex-direction:column;overflow:hidden}#title.svelte-11ixyb0.svelte-11ixyb0{font-size:30px;font-weight:bold;margin-top:10px;margin-bottom:-20px}#form.svelte-11ixyb0.svelte-11ixyb0{display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;width:100%;height:280px}.placeholder.svelte-11ixyb0.svelte-11ixyb0{width:90%;margin-bottom:-15px}#namePlaceholder.svelte-11ixyb0.svelte-11ixyb0{font-weight:bold}#passPlaceholder.svelte-11ixyb0.svelte-11ixyb0{font-weight:bold}.errorPlaceholder.svelte-11ixyb0.svelte-11ixyb0{font-weight:bold;color:red;width:90%;margin-top:-15px}input.svelte-11ixyb0.svelte-11ixyb0{width:90%;height:40px;border-radius:5px;border:none;background-color:rgba(188, 197, 240, 0.5);font-size:20px;outline:none;padding:8px}#submit.svelte-11ixyb0.svelte-11ixyb0{width:90%;height:40px;background-color:rgb(57, 111, 211);color:white;font-size:24px;font-weight:bold;border-radius:5px;cursor:pointer;text-align:center;line-height:40px}#register.svelte-11ixyb0.svelte-11ixyb0{text-decoration:underline;font-size:15px;cursor:pointer;display:inline-block}#cover{width:100%;height:100%;background-color:rgba(255, 255, 255, 0.5);position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.errorBanner.svelte-11ixyb0.svelte-11ixyb0{position:absolute;top:calc(50% - 240px);left:50%;transform:translate(-50%,-50%);width:400px;height:50px;background-color:white;border-radius:15px;opacity:0;color:red;font-size:17px;line-height:30px;padding:10px;text-align:center;transition:opacity 0.5s}#homepage.svelte-11ixyb0.svelte-11ixyb0{width:150px;height:50px;background-color:rgb(57, 111, 211);color:white;position:absolute;top:95vh;right:0px;transform:translate(-50%,-50%);border-radius:15px;text-align:center;line-height:50px;font-style:normal;font-size:20px;cursor:pointer}@media only screen and (max-width: 768px){}.login_container.svelte-11ixyb0 span.svelte-11ixyb0{position:absolute;top:0;left:0;width:100%;height:100%;display:none;box-sizing:border-box}.login_container.svelte-11ixyb0 span.svelte-11ixyb0:nth-child(1){transform:rotate(0deg)}.login_container.svelte-11ixyb0 span.svelte-11ixyb0:before{content:'';position:absolute;width:100%;height:3px;background:rgb(57, 111, 211);animation:svelte-11ixyb0-animate 3s linear infinite}@keyframes svelte-11ixyb0-animate{0%{transform:scaleX(0);transform-origin:left}50%{transform:scaleX(1);transform-origin:left}50.1%{transform:scaleX(1);transform-origin:right}100%{transform:scaleX(0);transform-origin:right}}`,
  map: null
};
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="login_page svelte-11ixyb0">
    <div class="errorBanner svelte-11ixyb0"></div>
    <div class="login_container svelte-11ixyb0"><span id="loader" class="svelte-11ixyb0"></span>
            
        
        <div id="title" class="svelte-11ixyb0">Login</div>
        
            <div id="form" class="svelte-11ixyb0"><div class="placeholder svelte-11ixyb0"><div id="namePlaceholder" class="svelte-11ixyb0">Email</div></div>
                <input type="text" name="email" class="svelte-11ixyb0">
                <div class="errorPlaceholder svelte-11ixyb0" id="errorName"></div>

                <div class="placeholder svelte-11ixyb0"><div id="passPlaceholder" class="svelte-11ixyb0">Password</div></div>
                <input type="password" name="password" class="svelte-11ixyb0">
                <div class="errorPlaceholder svelte-11ixyb0" id="errorPass"></div>

                <div id="submit" class="svelte-11ixyb0">Submit</div></div>
            
            
            <div class="svelte-11ixyb0">Non hai un account?
            <div id="register" class="svelte-11ixyb0">Registrati</div></div>
            </div>
    <div id="homepage" class="svelte-11ixyb0">Homepage</div>
</div>`;
});
export {
  Login as L
};
