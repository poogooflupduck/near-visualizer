import Layout from "@/components/Layout";
import {
  Grid,
  Row,
  Column,
  ClickableTile,
  Button,
} from "carbon-components-react";

import { Box } from "@chakra-ui/react";
import { BubbleChart } from "@carbon/charts-react";
import { TreemapChart } from "@carbon/charts-react";

import Logo from "@/components/Logo";

import { useEffect } from "react";
import useSWR from "swr";

import useSWRInfinite from "swr/infinite";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home(props) {
  return <Layout></Layout>;
}
