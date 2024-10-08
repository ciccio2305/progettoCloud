import { writable } from "svelte/store";
export const chats = writable([]);
export const currentChat = writable("");
export const currentChatTopic = writable("");
export const messages = writable([]);
export const Messages = writable([]);
export const newMessages = writable([]);
export const msgToSend = writable({});
export const msgNumber = writable(0);
export const imgToSend = writable({});
export const Token = writable("");
export const lastMsg = writable("");
export const lastMsgTime = writable("");
export const lastMsgUser = writable("");
export const attachment = writable({});

export var currentPath = writable("");
export const refresh = writable(false);

export const userSearch = writable("");
export const searchFlag = writable(false);
export const addChat = writable("");
export const secretKey = writable("");

export const timestamp = writable(0);
export const totalWords = writable(0);
export const myWords = writable(0);

export const lastPad = writable("");

export const Data = writable("");
export const Hour = writable("00");
export const Minute = writable("00");

export const refreshChatList = writable(false);
export const currentImage = writable("");
