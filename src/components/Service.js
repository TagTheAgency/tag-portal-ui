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

  uploadFile: (pitch, page, file) => {
    const uploadURL = apiBase+pitch+'/'+page+'/uploadFile';
    var data = new FormData();
    data.append('file', file);
    return Auth.fetch(uploadURL, {
      method: 'POST',
      body: data,
    }, false);
  },

  updatePage: (pitch, page, name, data) => {
    const updateURL = apiBase + pitch + '/' + page + '/' + name;
    return Auth.fetch(updateURL, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  removeImage: (pitch, page, image) => {
    const updateURL = apiBase+pitch+'/'+page+'/image/' + image;

    return Auth.fetch(updateURL, {
      method: 'DELETE'
    }, true, false);
  },

  updateImage: (pitch, page, image) => {
    const updateURL = apiBase+pitch+'/'+page+'/image';
    return Auth.fetch(updateURL, {
      method: 'PUT',
      body: JSON.stringify(image)
    }, true, false);
  },

  renderImage: (pitch, page, filename) => {
    const url = apiBase +pitch + "/" + page + "/files64/" + filename;
    return Auth.fetch(url, {}, false, false)
    .catch(e => {console.log("Caught e",e); return {text: () => ""}})
    .then(response => {return response.text()});

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
