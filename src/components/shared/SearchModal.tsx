"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import scss from "./SearchModal.module.scss";
import { useSearchModalStore } from "@/store/useSearchModalStore";

const SearchModal = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { isOpens, closeModals } = useSearchModalStore();

  if (!isOpens) return null;

  const handleSearch = () => {
    if (query) {
      router.push(`/search/${query}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={isOpens ? `${scss.Search} ${scss.active}` : `${scss.Search}`}
    >
      <div className={scss.content}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a movie or tv show..."
        />
        <div className={scss.buttons}>
          <button onClick={handleSearch}>Search</button>
          <button style={{background: "transparent", color: "black", border: "none", cursor: "pointer", fontSize: "20px"}} onClick={closeModals}>X</button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
