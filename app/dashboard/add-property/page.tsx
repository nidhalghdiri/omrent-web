import getCurrentUser from "@/app/actions/getCurrentUser";
import Layout from "@/app/components/layout/Layout";
import React from "react";
import AddPropertyClient from "./AddPropertyClient";
import getAmenties from "@/app/actions/getAmenties";

const AddPropertyPage = async () => {
  const currentUser = await getCurrentUser();
  const amenities = await getAmenties();
  return (
    <>
      <Layout currentUser={currentUser} headerStyle={1} footerStyle={1}>
        <AddPropertyClient currentUser={currentUser} amenities={amenities} />
      </Layout>
    </>
  );
};

export default AddPropertyPage;
