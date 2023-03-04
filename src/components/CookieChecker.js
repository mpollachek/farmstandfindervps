import { useContext } from "react";
import axios from "axios";
import { UserContext } from "../App";

const CookieChecker = () => {

  const { userId, setUserId, userName, setUserName } = useContext(UserContext);
  
  // on page load:
  // check for cookies
  // split cookies
  // for each cookie in array:
  // if google or facebook save to local storage
  // do api call and set username and userId
  // set axios calls to include tokens and ensure they work for verify middleware

  let currentCookies = document.cookie;
  console.log("currentCookies", currentCookies)
  let cookieArray = currentCookies.split('; ')
  console.log("cookieArray", cookieArray)
  for (const item of cookieArray) {
    console.log("cookie array item", item)
    let singleCookieArray = item.split('=');
    console.log("singleCookieArray", singleCookieArray)
    if (singleCookieArray[0] === 'google') {
      localStorage.setItem("token", singleCookieArray[1]);
    } else if (singleCookieArray[0] === 'facebook') {
      localStorage.setItem("token", singleCookieArray[1]);
    } else if (singleCookieArray[0] === 'userId') {
      localStorage.setItem("userId", singleCookieArray[1]);
      setUserId(singleCookieArray[1])
    } else if (singleCookieArray[0] === 'userName'){
      localStorage.setItem("userName", singleCookieArray[1]);
      setUserName(singleCookieArray[1])
    }}
}

export default CookieChecker;
