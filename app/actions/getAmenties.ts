import prisma from "@/app/libs/prismadb";

export default async function getAmenties() {
  try {
    const categories = await prisma.amenityCategory.findMany({
      include: {
        amenities: true, // Include amenities for each category
      },
    });

    const safeCategories = categories.map((category) => {
      const safeAmenities = category.amenities.map((amenity) => ({
        ...amenity,
        createdAt: amenity.createdAt.toISOString(), // Convert Date to ISO string
        updatedAt: amenity.updatedAt.toISOString(), // Convert Date to ISO string
      }));

      const safeCategory = {
        ...category,
        createdAt: category.createdAt.toISOString(), // Convert Date to ISO string
        updatedAt: category.updatedAt.toISOString(), // Convert Date to ISO string
        amenities: safeAmenities,
      };
      return safeCategory;
    });

    return safeCategories;
  } catch (error: any) {
    throw new Error(error);
  }
}
