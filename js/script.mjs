import { registerFormHandler } from "./handlers/auth/registerFormHandler.mjs";
import { loginFormHandler } from "./handlers/auth/loginFormHandler.mjs";
import { logoutHandler } from "./handlers/auth/logoutHandler.mjs";
import { displayListingsHandler } from "./handlers/posts/displayListingsHandler.mjs";
import { displayAvatarHandler } from "./handlers/posts/displayAvatarHandler.mjs";
import { displayProfileHandler } from "./handlers/posts/displayProfileHandler.mjs";
import { displaySingleListingHandler } from "./handlers/posts/displaySingleListingHandler.mjs";
import { createListingHandler } from "./handlers/posts/createListingHandler.mjs";
import { searchListingsHandler } from "./handlers/posts/searchListingsHandler.mjs";
import { searchListingsSetup } from "./handlers/posts/searchSetupHandler.mjs";
import { updateNavHandler } from "./ui/navigation/updateNavHandler.mjs";

function router() {
  const pathname = window.location.pathname;

  console.log(pathname);

  switch (pathname) {
    case "/login/":
    case "/login/index.html":
      loginFormHandler();
      console.log("Login page");
      break;
    case "/register/":
    case "/register/index.html":
      registerFormHandler();
      console.log("This is the registration page");
      break;
    case "/feed/":
    case "/feed/index.html":
      logoutHandler();
      displayListingsHandler();
      searchListingsHandler();
      searchListingsSetup();
      updateNavHandler();
      console.log("This is the feed page");
      break;
    case "/listing/":
    case "/listing/index.html":
      logoutHandler();
      displaySingleListingHandler();
      updateNavHandler();
      console.log("SingleListingPage");
      break;
    case "/profile/":
    case "/profile/index.html":
      logoutHandler();
      displayProfileHandler();
      displayAvatarHandler();
      console.log("this is the profile page");
      break;
    case "/feed/createListing.html":
      createListingHandler();
      console.log("create listing page");
      break;
  }
}

router();
