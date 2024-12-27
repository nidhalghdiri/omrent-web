import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    type,
    description,
    state,
    address,
    location,
    propertyId,
    size,
    roomCount,
    bathroomCount,
    price,
    rentCycle,
    guestCount,
    thumbnailSrc,
    galleryImages,
    amenities,
  } = body;
  try {
    const listing = await prisma.listing.create({
      data: {
        title,
        type,
        description,
        state,
        address,
        propertyId,
        size,
        roomCount: parseInt(roomCount, 10),
        bathroomCount: parseInt(bathroomCount, 10),
        rentCycle,
        thumbnailSrc,
        galleryImages: {
          set: galleryImages, // Store multiple image URLs
        },
        category: "",
        guestCount,
        locationValue: location ?? "Unknown",
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
      include: {
        propertyAmenities: true, // Include property amenities in the response
      },
    });

    // Save amenities associated with the property
    if (amenities && amenities.length > 0) {
      await prisma.propertyAmenity.createMany({
        data: amenities.map((amenityId: string) => ({
          propertyId: listing.id,
          amenityId,
        })),
      });
    }

    // Fetch the updated listing with related amenities
    const updatedListing = await prisma.listing.findUnique({
      where: { id: listing.id },
      include: {
        propertyAmenities: {
          include: {
            amenity: true, // Include detailed amenity information
          },
        },
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Prisma error:", error);
    return NextResponse.error();
  }
}
