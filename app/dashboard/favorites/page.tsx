import React from "react";
import getCurrentUser from "../../actions/getCurrentUser";
import Layout from "../../components/layout/Layout";
import FavoritesClient from "./FavoritesClient";
import getFavoriteListings from "../../actions/getFavoriteListings";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings().catch((error) => {
    console.error(error);
    return [];
  });
  return (
    <>
      <Layout currentUser={currentUser} headerStyle={1} footerStyle={1}>
        <FavoritesClient listings={listings} currentUser={currentUser} />
      </Layout>
    </>
  );
};

export default FavoritesPage;
