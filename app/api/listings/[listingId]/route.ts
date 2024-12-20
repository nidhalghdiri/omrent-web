import { NextRequest, NextResponse } from "next/server";
import getCurentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { ObjectId } from "mongodb"; // Ensure the ObjectId import for MongoDB

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: IParams }
) {
  const currentUser = await getCurentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
