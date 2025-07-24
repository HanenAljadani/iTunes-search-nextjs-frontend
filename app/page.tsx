"use client";
import Card from "./components/card";
import { Podcast } from "./types/podcast";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [results, setResults] = useState<Podcast[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    handleSearch(value);
  };

  const getResults = async (search: string): Promise<Podcast[]> => {
    const res = await fetch(
      `http://localhost:3333/search?term=${encodeURIComponent(
        search
      )}&media=podcast`
    );

    if (!res.ok) {
      throw new Error("Error in Retriving Result");
    }
    const data = await res.json();
    return data.results;
  };

  
  const handleSearch = async (value: string) => {
    setShowLoading(true);
    try {
      const data = await getResults(value);
      setResults(data);
    } catch (error) {
      throw new Error("Error in Retriving Result");
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <div className="bg-[#1e1b2e] flex min-h-screen ">
      <div className="w-[2px] bg-gray-200/10 ml-5 shadow-lg shadow-r-5 shadow-gray-700" />
      <div className="flex-1 overflow-auto">
      <div className="flex items-center justify-around pt-7">
        <span className="px-6 text-gray-500 flex justify-around">
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
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>{" "}
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
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
        <input
          value={searchValue}
          onChange={handleChange}
          className="flex-1 mr-3 w-60 h-9 text-white text-center bg-transparent rounded-lg outline-1 -outline-offset-1 outline-gray-500 focus:outline-[#9B7DD9] focus:bg-gray-800 focus:bg-opacity-20 focus:placeholder-transparent transition-all duration-300"
          type="text"
          placeholder="  Search through over 70 million podcasts and episodes..."
        ></input>
        <div className="flex gap-2 mr-3">
          <button className="text-base h-9 cursor-pointer bg-gradient-to-b from-[#40678c] to-[#2c5378] hover:from-[#4e7fad] hover:to-[#33628e] transition-colors duration-600 ease-in-out text-white py-2 px-4 rounded-lg">
            Log in
          </button>
          <button className="text-base h-9 cursor-pointer bg-gradient-to-b from-[#40678c] to-[#2c5378] hover:from-[#5387b7] hover:to-[#376897] transition-colors duration-600 ease-in-out text-white py-2 px-4 rounded-lg">
            Sign up
          </button>
        </div>
        <span className="flex-none pr-3 text-gray-500">
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

      {/** <div className="flex items-center justify-center pt-12 pb-7 scroll-smooth overflow-x-scroll overscroll-contain scrollbar-thin scrollbar-thumb-purple-400 gap-3"> */}
      {showLoading && (
        <div className="flex justify-center items-center min-h-screen">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {results.length != 0 && (
        <div>
          <div className="flex justify-between pt-28 pl-2 pr-4">
            <div>
              <h3 className="text-white text-lg">
                Top podcasts for {searchValue}
              </h3>
            </div>
            <div className="flex justify-around">
              <span className="px-6 text-gray-500 flex justify-between">
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
                    d="M15.75 19.5 8.25 12l7.5-7.5"
                  />
                </svg>{" "}
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
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </span>

              <span className="pr-3 text-gray-500">
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
          </div>

          <hr className="border-gray-200/10 mr-5 mt-5"></hr>
          <div className="px-7  pt-12 pb-7">
          <div className="flex items-center justify-start scroll-smooth overflow-x-scroll overscroll-contain gap-3 shadow-lg ">
            {results.map((result, index) => (
              <Card key={index} podcast={result} />
            ))}
          </div></div>
        </div>
      )}
    </div></div>
  );
}
