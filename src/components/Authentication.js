const Authentication = {
		isAuthenticated() {
			return sessionStorage.getItem("oauth-token") != null;
		},
		authenticate(props) {
			sessionStorage.setItem("oauth-token", props.tokenId)
		},
		getSessionToken() {
			return sessionStorage.getItem("oauth-token");
		}
};

export default Authentication;