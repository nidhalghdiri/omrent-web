import Layout from "./components/layout/Layout";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Slider from "./components/sections/Slider";
import Recommended from "./components/sections/Recommended";
import getListings from "./actions/getListings";
import Categories from "./components/sections/Categories";
import AdvancedFilter from "./components/elements/AdvancedFilter";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const listings = await getListings({});
  // console.log("listings : ", listings);
  return (
    <>
      <Layout currentUser={currentUser} headerStyle={1} footerStyle={1}>
        <div className="tab-content">
          <div className="tab-pane fade active show" role="tabpanel">
            <div className="form-sl">
              <AdvancedFilter sidecls="style-2 shadow-st" />
              {/* End Job  Search Form*/}
            </div>
          </div>
        </div>
        {/* <Slider /> */}
        {/* <Categories /> */}
        {listings && (
          <Recommended currentUser={currentUser} listings={listings} />
        )}
      </Layout>
    </>
  );
}
