import Head from "next/head";
import {
  Grid,
  Row,
  Column,
  Search,
  SideNavItems,
  SideNavMenuItem,
  SideNavLink,
  SideNavMenu,
} from "carbon-components-react";
import { Box, Center } from "@chakra-ui/react";
import Logo from "@/components/Logo";

import config from "../config.json";

const Layout = ({ sidebar, children, ...props }) => {
  return (
    <>
      <Head>
        <title>{props.title ? props.title : "NEAR Visualizer"}</title>
        <meta name="description" content={props.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid>
        <Row style={{ height: "100%" }}>
          <Column sm={12} md={12} lg={3}>
            <Box my={5}>
              <Logo />
            </Box>

            <Search
              id="search-1"
              placeHolderText="Search by account ID or tx hash"
            />
            <SideNavItems>
              {[...new Set(config["pages"].map((entry) => entry.category))].map(
                (category) => (
                  <SideNavMenu
                    title={category.charAt(0).toUpperCase() + category.slice(1)}
                    key={category}
                  >
                    {config["pages"]
                      .filter((entry) => entry.category == category)
                      .map((page) => (
                        <SideNavMenuItem
                          href={"/" + category + "/" + page.slug}
                          key={page.slug}
                        >
                          {page.title}
                        </SideNavMenuItem>
                      ))}
                  </SideNavMenu>
                )
              )}
            </SideNavItems>
            {sidebar}
          </Column>
          <Column sm={12} md={12} lg={9}>
            {children}
          </Column>
        </Row>
      </Grid>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default Layout;
