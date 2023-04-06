const userToken = localStorage.getItem("x-token");

if (userToken) {
    var userData = userToken ? JSON.parse(userToken):''
}

export default userData;