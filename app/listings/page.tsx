import React from "react";
import Layout from "../components/layout/Layout";
import getCurrentUser from "../actions/getCurrentUser";
import getListings, { IListingsParams } from "../actions/getListings";
import ListingsClient from "./ListingsClient";
interface ListingsPageProps {
  searchParams: {
    keyword?: string;
    location?: string;
    type?: string;
  };
}
export default async function ListingsPage({
  searchParams,
}: ListingsPageProps) {
  const { keyword, location, type } = searchParams; // Extract query params
  // Create params object for getListings
  const params: IListingsParams = {
    keyword: keyword || "",
    location: location || "",
    type: type || "all",
  };

  const currentUser = await getCurrentUser();
  const properties = await getListings(params);
  return (
    <>
      <Layout currentUser={currentUser} headerStyle={1} footerStyle={1}>
        <ListingsClient currentUser={currentUser} listings={properties} />
      </Layout>
    </>
  );
}
