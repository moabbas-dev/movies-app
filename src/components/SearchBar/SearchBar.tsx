"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar:React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue !== "") router.replace(`/search/${inputValue}`);
    setInputValue("");
  };

  return (
    <div
      title="search by title, date or description"
      className="container mx-auto flex items-center"
    >
      <form className="w-full" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          className="w-full h-12 px-4 border rounded-md"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="hidden"></button>
      </form>
    </div>
  );
};

export default SearchBar;
