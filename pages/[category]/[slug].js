import Layout from "@/components/Layout";
import SwrChart from "@/components/SwrChart";
import RealTimeSwrChart from "@/components/RealTimeSwrChart";
import config from "../../config.json";

export default function Slug(props) {
  return (
    <Layout title={props.title}>
      {props.chart.realTime ? (
        <RealTimeSwrChart {...props.chart} />
      ) : (
        <SwrChart {...props.chart} />
      )}
    </Layout>
  );
}

export function getServerSideProps({ params }) {
  let isDynamicPage;
  let chart;
  // Dynamic pages only
  if (
    config["dynamic"].filter((entry) => entry.category == params.category)
      .length
  ) {
    chart = config["dynamic"].filter(
      (entry) => entry.category == params.category
    )[0].charts[0];
    isDynamicPage = true;
  }
  // Normal page
  else {
    chart = config["pages"].filter(
      (entry) => entry.category == params.category && entry.slug == params.slug
    )[0].charts[0];
    isDynamicPage = false;
  }

  if (isDynamicPage) {
    chart["dynamicKey"] = params.category;
    chart["dynamicValue"] = params.slug;
  }

  let title =
    params.category.charAt(0).toUpperCase() +
    params.category.slice(1) +
    " / " +
    params.slug;

  chart["title"] = title;

  return {
    props: {
      title,
      chart,
      category: params.category,
      slug: params.slug,
    },
  };
}
