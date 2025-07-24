"use client";
import { Podcast } from "../types/podcast";
import Image from "next/image";

interface CardProps {
  podcast: Podcast;
}
export default function Card({ podcast }: CardProps) {
  return (
    <div className="bg-[#1e1b2e] w-[300px] h-[400px]">
      <div className="relative w-[300px] h-[300px]">
        <Image
          className="object-cover bg-[#2e2e5e]/25 rounded border border-gray-200/5  inset-shadow-sm"
          src="/1.jpg"
          fill
          alt={podcast.collectionName}
          title={podcast.collectionName}
        />
      </div>
      <div className="flex justify-between pt-2">
        <a href="#">
          <h5 className="text-s font-bold text-white hover:underline">
            {podcast.collectionName}
          </h5>
        </a>
        <span className=" text-gray-500  hover:text-white">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </span>
      </div>
      <a href="#">
        <p className=" text-[#BA6FDE] pt-2">{podcast.artistName}</p>
      </a>
    </div>
  );
}
