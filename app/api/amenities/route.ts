import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  try {
    const body = await request.json();
    const { categories } = body;

    if (!categories || !Array.isArray(categories)) {
      throw new Error("Invalid categories data");
    }

    const savedCategories = await Promise.all(
      categories.map(async (category: any) => {
        const { name, amenities } = category;

        // Save category
        const savedCategory = await prisma.amenityCategory.create({
          data: { name },
        });

        // Save amenities related to the category
        if (amenities && Array.isArray(amenities)) {
          await prisma.amenity.createMany({
            data: amenities.map((amenity: any) => ({
              name: amenity.name,
              icon: amenity.icon || null,
              categoryId: savedCategory.id,
            })),
          });
        }

        return savedCategory;
      })
    );

    return NextResponse.json(savedCategories);
  } catch (error) {
    console.error("Error saving categories and amenities:", error);
    return NextResponse.error();
  }
}
