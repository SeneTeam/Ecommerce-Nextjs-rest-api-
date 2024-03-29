// Import Custom Component
import NewsletterModal from "../components/features/modals/newsletter-modal";
import HomeSection from "../components/partials/home/home-section";
import BannerSection from "../components/partials/home/banner-section";
import BrandSection from "../components/partials/home/brand-section";
import FeaturedCollection from "../components/partials/home/featured-collection";
import ProductWidgetContainer from "../components/partials/home/product-widget-container";
import Head from "next/head";
import abslouteUrl from "next-absolute-url";
import qs from "qs";

function Home({ data, loading, seo }) {
  const featured = !loading && data.specialProducts.featured;
  const bestSelling = !loading && data.specialProducts.bestSelling;
  const latest = !loading && data.specialProducts.latest;
  const topRated = !loading && data.specialProducts.topRated;
  const onSale = !loading && data.specialProducts.onSale;
  const product = !loading && data.products.data;

  return (
    <>
      <main
        className={`home skeleton-body skel-shop-products ${
          loading ? "" : "loaded"
        }`}
      >
        <HomeSection />

        <BannerSection />

        <BrandSection />

        <FeaturedCollection product={product} loading={loading} />

        <FeaturedCollection product={onSale} loading={loading} sale={true} />

        <ProductWidgetContainer
          featured={featured}
          latest={latest}
          bestSelling={bestSelling}
          topRated={topRated}
          loading={loading}
        />
      </main>

      <NewsletterModal />
    </>
  );
}

export default Home;

export async function getServerSideProps(ctx) {
  const { origin } = abslouteUrl(ctx.req);
  const SEO = {
    url: origin,
    img: origin + "/images/newsletter_popup_bg.jpg",
    type: "website",
    title: "Porto - React eCommerce Template",
    desc: "Get our Low Price Guarantee, online or in store, on a huge selection of electronics, appliances, furniture, fitness, travel, baby products and more!",
  };
  const params = qs.stringify({
    demo: 12,
    limit: 5,
    featured: true,
    onSale: true,
    bestSelling: true,
    topRated: true,
    latest: true,
  });
  const products = await fetch(`${origin}/api/products?${params}`);
  const data = await products.json();
  return {
    props: {
      data: data,
      loading: products.status === 200 ? false : true,
      seo: SEO,
    },
  };
}
