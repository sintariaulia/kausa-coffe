export function isLoggedIn() {
    // console.log("authToken:", localStorage.getItem("authToken"));
    return localStorage.getItem('token') !== null;
}