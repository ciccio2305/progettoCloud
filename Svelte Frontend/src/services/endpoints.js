import Config from './config';

export default {
    LOGIN : Config.getHost()+"/api/login",
    REGISTER: Config.getHost()+"/api/register",
    LOGOUT: Config.getHost()+"/api/logout"
}