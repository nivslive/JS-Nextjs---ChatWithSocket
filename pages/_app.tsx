import "../styles/globals.css";
import "../styles/Home.module.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import { wrapper } from "../store";
function MyApp({ Component, pageProps }: any) {
  return (
    <Component {...pageProps} />
  );
}
export default wrapper.withRedux(MyApp);

