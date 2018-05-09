import { withRouter } from "react-router-dom";
import AuthService from "./AuthService.js";

const apiBase = process.env.REACT_APP_API_ENDPOINT;
const catchApiBase = process.env.REACT_APP_CATCH_ENDPOINT + '/admin/api/';
//const catchApiBase = 'http://localhost:8080/admin/api/';
//const catchApiBase = 'https://clientapps.relay.tagtheagency.com/admin/api/';
const pitchApiBase = apiBase + '/pitch/';
const briefApiBase = apiBase + '/briefs/';

const Auth = new AuthService();

const Service = {

  getClients: () => {
    return Auth.fetch(briefApiBase + 'clients');
  },

  getProjects: (client) => {
    return Auth.fetch(briefApiBase + 'projects/' + client);
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

  createCatchApplication: (name) => {
    const url = catchApiBase + 'application?name='+name;
    return Auth.fetch(url, {
      method: 'POST'
    });
  },

  uploadCatchFile: (catchId, file) => {
    const uploadURL = catchApiBase+'application/'+catchId+'/uploadFile';
    var data = new FormData();
    data.append('file', file);
    return Auth.fetch(uploadURL, {
      method: 'POST',
      body: data,
    }, false);
  },

  getFacebookApps: () => {
    const url = catchApiBase + 'applications';
    return Auth.fetch(url);
  },

  getFacebookApplication: (id) => {
    const url = catchApiBase + 'application/'+id;
    return Auth.fetch(url);
  },

  getCatchImages: (id) => {
    const url = catchApiBase + 'application/'+id+'/images';
    return Auth.fetch(url);
  },

  getFacebookTemplate: (id) => {
    const url = catchApiBase + 'template/1';// FIXME +id;
    return Auth.fetch(url);
  },

  updateCatchSchemaValues: (id, schemaValues) => {
    const url = catchApiBase + 'application/' +id+'/schema';
    return Auth.fetch(url, {
      method: 'PUT',
      body: JSON.stringify(schemaValues)
    });
  },

  updateApplicationFields: (id, fields) => {
    const url = catchApiBase + 'application/' + id + '/fields';
    return Auth.fetch(url, {
      method: 'PUT',
      body: JSON.stringify(fields)
    });
  },

  updateCatchApplication: (id, app) => {
    const url = catchApiBase + 'application/' + id;
    const update = {
      name: app.name,
      facebookId: app.facebookId,
      facebookPath: app.facebookPath,
      dropboxPath: app.dropboxPath
    }

    return Auth.fetch(url, {
      method: 'PUT',
      body: JSON.stringify(update)
    });
  },

//  updateCatchValues: (id, name, value) => {
//    const url = catchApiBase + 'application/' +id+'/'+name;
//    return Auth.fetch(url, {
//      method: 'POST',
//      body: JSON.stringify(schemaValues)
//    });
//  },

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
