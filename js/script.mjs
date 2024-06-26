console.log("Here we add the switch function router");
("");

import { registerFormHandler } from "./handlers/auth/registerFormHandler.mjs";
import { loginFormHandler } from "./handlers/auth/loginFormHandler.mjs";

function router() {
  const pathname = window.location.pathname;

  console.log(pathname);

  switch (pathname) {
    case "/":
    case "/index.html":
      loginFormHandler();
      console.log("this is the log in page");
      break;
    case "/register/":
    case "/register/index.html":
      registerFormHandler();
      console.log("This is the registration page");
      break;
  }
}

router();
