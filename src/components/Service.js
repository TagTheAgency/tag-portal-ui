import { withRouter } from "react-router-dom";
import AuthService from "./AuthService.js";
const apiBase = 'http://localhost:82/tagportal/pitch/';

const Auth = new AuthService();

const Service = {

  getPitches: () => {
    return Auth.fetch(apiBase);
  },

  getPitch: (id) => {
    return Auth.fetch(apiBase+id);
  },

  getPageTypes: () => {
    return Auth.fetch(apiBase + 'pageTypes');
  },

  catchErrors: (error) => {
    console.warn(error);
    sessionStorage.clear();
  },

  handleErrors: (response) => {
    console.log("handling errors ", response);
      if (!response.ok) {
        console.log(response);
//        sessionStorage.clear();
      }
      return response;
  }
};

export default withRouter(Service);
