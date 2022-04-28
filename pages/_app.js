import { useEffect } from "react";
import { Provider, useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import dynamic from "next/dynamic";
import { wrapper } from "../store/index.js";
import Layout from "../components/layout";
import { actions as DemoAction } from "../store/demo";
import absoluteUrl from "next-absolute-url";
import "../styles/vendor/bootstrap.min.css";
import "../styles/vendor/fontawesome-free/css/all.min.css";
import "../styles/vendor/simple-line-icons/css/simple-line-icons.min.css";
import "../styles/sass/style.scss";
import Head from "next/head";

const Wrapper = dynamic(() => import("../components/Wrapper.js"), {
  ssr: true,
});
const App = ({ Component, pageProps, SEO: seo }) => {
  const store = useStore();
  useEffect(() => {
    if (store.getState().demo.current !== 12) {
      store.dispatch(DemoAction.refreshStore(12));
    }
  }, []);

  return (
    <Provider store={store}>
      <Wrapper>
        <PersistGate
          persistor={store.__persistor}
          loading={
            <div className="loading-overlay">
              <div className="bounce-loader">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
              </div>
            </div>
          }
        >
          <Head>
            <meta charSet="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>{seo?.title}</title>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <meta name="description" content={`${seo?.desc}`} />
            <meta property="og:title" content={seo?.title} />
            <meta property="og:type" content={seo?.type} />
            <meta property="og:url" content={`${seo?.url}`} />
            <meta property="og:image" content={`${seo?.img}`} />
            <meta name="keywords" content="React Template" />

            <meta name="author" content="SW-THEMES" />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Open+Sans:200,300,400,500,600,700,800%7CPoppins:200,300,400,500,600,700,800%7COswald:300,400,600,700"
            />
            <link rel="icon" href="favicon.png" />
          </Head>

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Wrapper>
    </Provider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const { origin } = absoluteUrl(ctx.req);
  const SEO = {
    url: origin,
    img: origin + "/images/newsletter_popup_bg.jpg",
    type: "website",
    title: "Porto - React eCommerce Template",
    desc: "Get our Low Price Guarantee, online or in store, on a huge selection of electronics, appliances, furniture, fitness, travel, baby products and more!",
  };
  return { pageProps, SEO };
};

export default wrapper.withRedux(App);
