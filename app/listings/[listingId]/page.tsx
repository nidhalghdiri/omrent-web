import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import React from "react";
import ListingClient from "./ListingClient";
import Layout from "@/app/components/layout/Layout";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: Promise<IParams> }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();
  console.log(listing);
  return (
    <>
      <Layout currentUser={currentUser} headerStyle={1} footerStyle={1}>
        {listing && (
          <ListingClient currentUser={currentUser} listing={listing} />
        )}
      </Layout>
    </>
  );
};

export default ListingPage;
