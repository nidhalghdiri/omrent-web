import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  keyword?: string;
  location?: string;
  type?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { keyword, location, type } = params;
    let query: any = {};

    if (keyword) {
      query.title = { contains: keyword, mode: "insensitive" }; // Search by title
    }
    if (location) {
      query.address = { contains: location, mode: "insensitive" }; // Search by location
    }
    if (type && type !== "all") {
      query.type = type;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
