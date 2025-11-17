import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default defineNuxtPlugin((nuxtApp) => {
  NProgress.configure({
    showSpinner: false,
    trickleSpeed: 125,
    easing: "ease",
    speed: 400,
  });

  nuxtApp.hook("page:start", () => {
    NProgress.start();
  });

  nuxtApp.hook("page:finish", () => {
    NProgress.done();
  });

  nuxtApp.hook("app:error", () => {
    NProgress.done();
  });
});


