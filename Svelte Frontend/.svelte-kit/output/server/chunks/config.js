const config = {
  PROTOCOL_SERVER: "http",
  URL_SERVER: "justsmart.it",
  PORT_SERVER: 80,
  getHost: function() {
    return this.PROTOCOL_SERVER + "://" + this.URL_SERVER + ":" + this.PORT_SERVER;
  }
};
export {
  config as c
};
