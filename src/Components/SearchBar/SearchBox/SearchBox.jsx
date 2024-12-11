import React, { useState, useEffect, useRef } from "react";
import "./SearchBox.css";
import PostOwner from "../../PostPage/PostOwner/PostOwner.jsx";
import { sendToBackend } from "../../../Utils/helper.js";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [eventResults, setEventResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchBoxRef = useRef(null);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setShowResults(value.trim() !== "");
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setUserResults([]);
      setEventResults([]);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);

      try {
        const userResponse = await sendToBackend(
          `accounts/by-nickname?nickname=${encodeURIComponent(searchTerm)}`,
          "GET",
          null
        );
        setUserResults(userResponse);

        const eventResponse = await sendToBackend(
          `events/by-name?name=${encodeURIComponent(searchTerm)}`,
          "GET",
          null
        );
        setEventResults(eventResponse);
      } catch (error) {
        console.error("Błąd pobierania danych:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-input-wrapper" ref={searchBoxRef}>
      <input
        type="text"
        className="search-input"
        placeholder="Search for users or events..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <img
        src={`${process.env.PUBLIC_URL}/lupa.png`}
        alt="Search Icon"
        className="search-icon"
      />

      {showResults && (
        <div className="search-results">
          {!isLoading && (
            <>
              {userResults.length > 0 && (
                <div className="user-results">
                  {userResults.map((user) => (
                    <div key={user.uuid} className="search-result-item">
                      <PostOwner
                        owner={{
                          nickname: user.nickname,
                          profilePictureUrl: user.profilePictureUrl,
                          homePageUrl: user.homePageUrl,
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {eventResults.length > 0 && (
                <div className="event-results">
                  {eventResults.map((event) => (
                    <div key={event.uuid} className="search-result-item">
                      <PostOwner
                        owner={{
                          nickname: event.name,
                          profilePictureUrl: event.iconUrl,
                          homePageUrl: event.homePageUrl,
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
