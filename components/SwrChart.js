import dynamic from "next/dynamic";
import useSWR, { useSWRConfig } from "swr";
import AreaSkeletonChart from "@/components/AreaSkeletonChart";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const SwrChart = (props) => {
  console.log(props);
  const { mutate } = useSWRConfig();

  console.log("chart props is " + JSON.stringify(props));

  const DynamicComponent = dynamic(() =>
    import("@carbon/charts-react").then((mod) => mod[props.type])
  );

  const dynamicParams = props.dynamicValue
    ? "?" + props.dynamicKey + "=" + props.dynamicValue
    : "";
  console.log("dynamic params str is: " + dynamicParams);
  const { data, error } = useSWR(
    "/api/" + props.query + dynamicParams,
    fetcher
  );

  if (error) {
    mutate("/api/" + props.query + dynamicParams);
    return (
      <DynamicComponent
        data={[props.blankData || { value: 0, group: "", name: "" }]}
        options={
          ({
            data: {
              loading: true,
            },
            height: "90vh",
          },
          { ...props.options })
        }
      />
    );
  }
  if (!data)
    return props.neutralSkeleton ? (
      <AreaSkeletonChart />
    ) : (
      <DynamicComponent
        data={[props.blankData || { value: 0, group: "", name: "" }]}
        options={
          ({
            data: {
              loading: true,
            },
            height: "90vh",
          },
          { ...props.options })
        }
      />
    );
  if (data) {
    return (
      <DynamicComponent
        data={
          props.dataMapping
            ? data.data.map((entry) => {
                Object.keys(props.dataMapping).map(
                  (key) => (entry[key] = entry[props.dataMapping[key]])
                );
                console.log(entry);
                return {
                  ...entry,
                };
              })
            : data.data
        }
        options={{
          title: props.title
            ? props.title + " (" + data.params.join(", ") + ")"
            : "",
          height: "90vh",
          ...props.options,
        }}
      />
    );
  }
};

export default SwrChart;
