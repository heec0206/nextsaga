import "@/styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Top from "/src/component/Top";
import Footer from "/src/component/Footer";
import SideMenu from "/src/component/SideMenu";
import PopupModalContent from "/src/component/PopupModalContent";
import "@/styles/layout.css";
import "@/styles/styles.css";
import "../styles/custom.css";
import Axios from "axios";
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import rootReducer from "/src/modules";
import rootSaga from "/src/modules/sagas";
import createSagaMiddleware from "redux-saga";
import wrapper from "../utils/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import actions from "/src/modules/actions/searchFilterActions";
//import { sagaMiddleware, persistor, store } from "./store";
import Loading from "/src/component/Loading";
import * as commonUtils from "/src/utils/common";
import * as api from "/src/modules/api";
function App({ Component, pageProps }) {  
  /*
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  */

  return (
    //<Provider store={store}>

    <>
      <Loading />
      {pageProps &&
      (pageProps.pathname === "/" || pageProps.pathname === "/login") ? (
        <div style={{ width: "100%", margin: "0 auto", height: "100%" }}>
          <Component {...pageProps} />
        </div>
      ) : (
        <>
          <div className="parent">
            <div className="topLayer">
              <Top />
            </div>
            <div className="main">
              <SideMenu />
              <div className="bodyLayer content">
                <Component {...pageProps} />
                <div className="footerLayer">
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <PopupModalContent />
    </>
  );
}

App.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};

  const searchParams = {
    period_week : commonUtils.settingInitWeekSelectOptions(),
    period_month : commonUtils.settingInitMonthSelectOptions(),
    period_quarter :commonUtils.settingInitQuarterSelectOptions(),
  };

  
  if (Component.getInitialProps) {
    pageProps = { ...(await Component.getInitialProps(ctx)), ...searchParams  } || {};
    return { pageProps };
  }
};

export default wrapper.withRedux(App);
