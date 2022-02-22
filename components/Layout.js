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
import { useRouter } from "next/router";

import config from "../config.json";

const Layout = ({ sidebar, children, ...props }) => {
  const router = useRouter();

  const searchSubmit = (e) => {
    e.preventDefault(); // don't redirect the page
    const accountIdRegExp =
      /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/;

    if (
      accountIdRegExp.test(e.target.search.value) &&
      e.target.search.value.toLowerCase().includes(".near")
    ) {
      router.push("/account/" + e.target.search.value);
    } else {
      router.push("/transaction/" + e.target.search.value);
    }
  };
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

            <form onSubmit={(e) => searchSubmit(e)}>
              <Search
                name="search"
                id="search-1"
                placeholder="Search by account ID or tx hash"
              />
            </form>
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
