import Endpoints from "./endpoints";
export default {
  login: async (username, password) => {
    const payload = { username, password };
    return fetch(Endpoints.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },

  stampa: async () => {
    console.log("ciao");
  },

  register: async (name, email, pass, confirmed, sezione, role) => {
    const payload = { name, email, pass, confirmed, sezione, role };
    return fetch(Endpoints.REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },
};
