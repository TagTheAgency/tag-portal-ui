const Authentication = {
		isAuthenticated() {
			return sessionStorage.getItem("oauth-token") != null;
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
