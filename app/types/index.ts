import {
  Account,
  Amenity,
  AmenityCategory,
  Listing,
  PropertyAmenity,
  Reservation,
  User,
} from "@prisma/client";

// Utility type to replace date fields with strings and handle nested objects
type ReplaceDates<T> = {
  [K in keyof T]: T[K] extends Date
    ? string
    : T[K] extends (infer U)[]
    ? ReplaceDates<U>[]
    : T[K] extends object
    ? ReplaceDates<T[K]>
    : T[K];
};

// Safe types for Prisma models
export type SafeUser = ReplaceDates<User>;
export type SafeListing = ReplaceDates<Listing>;
export type SafeReservation = Replace<
  ReplaceDates<Reservation>,
  "listingId",
  SafeListing
>;
export type SafeAccount = ReplaceDates<Account>;
export type SafeAmenityCategory = ReplaceDates<AmenityCategory> & {
  amenities: SafeAmenity[];
};
export type SafeAmenity = ReplaceDates<Amenity>;
export type SafePropertyAmenity = ReplaceDates<PropertyAmenity>;

// Utility type to override specific keys
type Replace<T, K extends keyof T, V> = Omit<T, K> & { [P in K]: V };
