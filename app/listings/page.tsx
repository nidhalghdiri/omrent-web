import React from "react";
import Layout from "../components/layout/Layout";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import ListingsClient from "./ListingsClient";

export default async function ListingsPage() {
  const currentUser = await getCurrentUser();
  const properties = await getListings({});
  return (
    <>
      <Layout currentUser={currentUser} headerStyle={1} footerStyle={1}>
        <ListingsClient currentUser={currentUser} listings={properties} />
      </Layout>
    </>
  );
}
