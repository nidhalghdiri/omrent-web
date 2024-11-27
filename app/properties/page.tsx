import React from "react";
import Layout from "../components/layout/Layout";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

export default async function PropertiesPage() {
  const currentUser = await getCurrentUser();
  const properties = await getListings({});
  return (
    <>
      <Layout currentUser={currentUser} headerStyle={1} footerStyle={1}>
        <PropertiesClient currentUser={currentUser} listings={properties} />
      </Layout>
    </>
  );
}
