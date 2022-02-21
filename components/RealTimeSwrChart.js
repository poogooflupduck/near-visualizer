import dynamic from "next/dynamic";
import useSWRInfinite from "swr/infinite";
import { useEffect } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const RealTimeSwrChart = (props) => {
  const getKey = (pageIndex, previousPageData) => {
    console.log(pageIndex);
    // reached the end
    if (previousPageData && !previousPageData.data) return null;

    // first page, we don't have `previousPageData`
    if (pageIndex === 0) return `/api/` + props.query;
    // add the cursor to the API endpoint

    let cursor =
      (previousPageData.data &&
        previousPageData.data.length &&
        previousPageData["data"][0].block_timestamp) ||
      previousPageData["after"];
    return `/api/` + props.query + `?after=${cursor}&swrIndex=` + pageIndex;
  };

  const DynamicComponent = dynamic(() =>
    import("@carbon/charts-react").then((mod) => mod[props.type])
  );

  const dynamicParams = props.dynamicValue
    ? "?" + props.dynamicKey + "=" + props.dynamicValue
    : "";

  useEffect(() => {
    const interval = setInterval(() => {
      setSize(size + 1);
    }, 5000);
    return () => clearInterval(interval);
  });

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    { revalidateFirstPage: false }
  );

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <></>
      //   <DynamicComponent
      //     data={[props.blankData || { value: 0, group: "", name: "" }]}
      //     options={
      //       ({
      //         data: {
      //           loading: true,
      //         },
      //         height: "90vh",
      //       },
      //       { ...props.options })
      //     }
      //   />
    );

  const allTx = data ? data.map((dataPage) => dataPage.data).flat() : [];
  console.log(allTx);
  if (allTx) {
    console.log(allTx);
  }
  console.log(props.options);
  return (
    <DynamicComponent
      data={
        props.dataMapping
          ? allTx.map((entry) => {
              Object.keys(props.dataMapping).map(
                (key) => (entry[key] = entry[props.dataMapping[key]])
              );
              console.log(entry);
              return {
                ...entry,
              };
            })
          : allTx
      }
      options={
        ({
          height: "90vh",
        },
        { ...props.options })
      }
    />
  );
};

export default RealTimeSwrChart;
