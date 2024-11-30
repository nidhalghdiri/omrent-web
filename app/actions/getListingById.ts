import prisma from "@/app/libs/prismadb";
import { ObjectId } from "mongodb"; // Ensure the ObjectId import for MongoDB

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;
    // Ensure that listingId is a valid ObjectId
    if (!listingId || !ObjectId.isValid(listingId)) {
      throw new Error("Invalid listing ID format");
    }
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
    };
  } catch (error: any) {
    console.error("Error fetching listing by ID:", error);
    throw new Error(error);
  }
}
