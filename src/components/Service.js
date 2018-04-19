import { withRouter } from "react-router-dom";
import AuthService from "./AuthService.js";

const apiBase = process.env.REACT_APP_API_ENDPOINT;
const pitchApiBase = apiBase + '/pitch/';
const briefApiBase = apiBase + '/briefs/';

const Auth = new AuthService();

const Service = {

  getClients: () => {
    return Auth.fetch(briefApiBase + 'clients');
  },

  getPitches: () => {
    return Auth.fetch(pitchApiBase);
  },

  getPitch: (id) => {
    return Auth.fetch(pitchApiBase+id);
  },

  createPitch: (id) => {
    return Auth.fetch(pitchApiBase+'create',{
      method: 'POST'
    });
  },

  updatePitch: (id, state) => {
    return Auth.fetch(pitchApiBase+id, {
      method: 'POST',
      body: JSON.stringify({'title':state.title})
    });
  },

  addPage: (id) => {
    return Auth.fetch(pitchApiBase + id + '/create', {
      method: 'POST'
    });
  },

  getPageTypes: () => {
    return Auth.fetch(pitchApiBase + 'pageTypes');
  },

  uploadFile: (pitch, page, file) => {
    const uploadURL = pitchApiBase+pitch+'/'+page+'/uploadFile';
    var data = new FormData();
    data.append('file', file);
    return Auth.fetch(uploadURL, {
      method: 'POST',
      body: data,
    }, false);
  },

  updatePage: (pitch, page, name, data) => {
    const updateURL = pitchApiBase + pitch + '/' + page + '/' + name;
    return Auth.fetch(updateURL, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  },

  removeImage: (pitch, page, image) => {
    const updateURL = pitchApiBase+pitch+'/'+page+'/image/' + image;

    return Auth.fetch(updateURL, {
      method: 'DELETE'
    }, true, false);
  },

  updateImage: (pitch, page, image) => {
    const updateURL = pitchApiBase+pitch+'/'+page+'/image';
    return Auth.fetch(updateURL, {
      method: 'PUT',
      body: JSON.stringify(image)
    }, true, false);
  },

  renderImage: (pitch, page, filename) => {
    const url = pitchApiBase +pitch + "/" + page + "/files64/" + filename;
    return Auth.fetch(url, {}, false, false)
    .catch(e => {console.log("Caught e",e); return {text: () => ""}})
    .then(response => {return response.text()});

  },

  downloadPdf: (pitch, title) => {
    const url = pitchApiBase + pitch + '/'+title+'.pdf';
    Auth.fetch(url, {}, false, false)
    .then(response => response.blob())
    .then(blob => {
      var objectURL = URL.createObjectURL(blob);  //new Blob([blob], {type: "application/pdf"})
      var a = document.createElement('a');
      a.style = "display: none";
      a.href = objectURL;
      a.download = title+'.pdf';
      a.click();
      setTimeout(function(){
        a = null;
        window.URL.revokeObjectURL(objectURL);
      }, 100);

    })
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
