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
    case "/":
    case "index.html":
      break;
    case "/login/":
    case "/login/index.html":
      loginFormHandler();
      break;
    case "/register/":
    case "/register/index.html":
      registerFormHandler();
      break;
    case "/feed/":
    case "/feed/index.html":
      logoutHandler();
      displayListingsHandler();
      searchListingsHandler();
      searchListingsSetup();
      updateNavHandler();
      break;
    case "/listing/":
    case "/listing/index.html":
      logoutHandler();
      displaySingleListingHandler();
      updateNavHandler();
      break;
    case "/profile/":
    case "/profile/index.html":
      logoutHandler();
      displayProfileHandler();
      displayAvatarHandler();
      break;
    case "/feed/createListing.html":
      createListingHandler();
      break;
    case "/likes/":
    case "/likes/index.html":
      logoutHandler();
      updateNavHandler();
      break;
    case "/about/":
    case "/about/index.html":
      logoutHandler();
      updateNavHandler();
  }
}

router();
