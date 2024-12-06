import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import Layout from "../components/layout/Layout";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <Layout currentUser={currentUser} headerStyle={1} footerStyle={1}>
        <FavoritesClient currentUser={currentUser} />
      </Layout>
    </>
  );
};

export default FavoritesPage;
