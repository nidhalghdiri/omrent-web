import getCurrentUser from "@/app/actions/getCurrentUser";
import Layout from "@/app/components/layout/Layout";
import React from "react";
import AddPropertyClient from "./AddPropertyClient";

const AddPropertyPage = async () => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <Layout currentUser={currentUser} headerStyle={1} footerStyle={1}>
        <AddPropertyClient currentUser={currentUser} />
      </Layout>
    </>
  );
};

export default AddPropertyPage;
