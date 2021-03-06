const Authentication = {
	exchangeToken: (token) => {
		const form = new FormData();
		form.append("token", token);
    return fetch(process.env.REACT_APP_API_ENDPOINT + '/security/', {
      method: "POST",
      body: form
    }).then(response => response.json());
  },

		isAuthenticated() {
			return sessionStorage.getItem("jwt") != null;
		},
		authenticate(props) {
			sessionStorage.setItem("oauth-token", props.tokenId);
			sessionStorage.setItem("profileObj", JSON.stringify(props.profileObj));
		},
		getSessionToken() {
			return sessionStorage.getItem("oauth-token");
		},
		getUsername() {
			return JSON.parse(sessionStorage.getItem("profileObj")).name;
		}
};

export default Authentication;
