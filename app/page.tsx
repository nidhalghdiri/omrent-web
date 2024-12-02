import Layout from "./components/layout/Layout";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Slider from "./components/sections/Slider";
import Recommended from "./components/sections/Recommended";
import getListings from "./actions/getListings";
import Categories from "./components/sections/Categories";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const listings = await getListings({});
  console.log("listings : ", listings);
  return (
    <>
      <Layout currentUser={currentUser} headerStyle={1} footerStyle={1}>
        <Slider />
        <Categories />
        {listings && (
          <Recommended currentUser={currentUser} listings={listings} />
        )}
      </Layout>
    </>
  );
}
