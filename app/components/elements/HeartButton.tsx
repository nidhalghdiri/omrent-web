"use client";
import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";
import React from "react";

interface HeartButtonProps {
  currentUser?: SafeUser | null;
  listingId: string;
}
const HeartButton: React.FC<HeartButtonProps> = ({
  currentUser,
  listingId,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });
  return (
    <li
      className="box-icon w-32"
      style={
        hasFavorited
          ? {
              backgroundColor: "#ed2027",
            }
          : {}
      }
    >
      <span onClick={toggleFavorite} className="icon icon-heart" />
    </li>
  );
};

export default HeartButton;
