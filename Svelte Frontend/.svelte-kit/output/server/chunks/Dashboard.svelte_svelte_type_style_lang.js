import { o as onDestroy } from "./index.js";
const CardCalendar_svelte_svelte_type_style_lang = "";
const TopTab_svelte_svelte_type_style_lang = "";
const topLeft_svelte_svelte_type_style_lang = "";
const topRightWeek_svelte_svelte_type_style_lang = "";
const topRightMonth_svelte_svelte_type_style_lang = "";
const middleLeft_svelte_svelte_type_style_lang = "";
const eventPrefix = /^on/;
const events = [];
Object.keys(globalThis).forEach((key) => {
  if (eventPrefix.test(key)) {
    events.push(key.replace(eventPrefix, ""));
  }
});
function useForwardEvents(getRef) {
  const destructors = [];
  onDestroy(() => {
    while (destructors.length) {
      destructors.pop()();
    }
  });
}
const middleRight_svelte_svelte_type_style_lang = "";
const LeftTab_svelte_svelte_type_style_lang = "";
const Card_svelte_svelte_type_style_lang = "";
const MemoCard_svelte_svelte_type_style_lang = "";
const CardHours_svelte_svelte_type_style_lang = "";
const RightTab_svelte_svelte_type_style_lang = "";
const Dashboard_svelte_svelte_type_style_lang = "";
export {
  useForwardEvents as u
};
