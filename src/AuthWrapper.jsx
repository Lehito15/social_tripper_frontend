import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuthSession } from "aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css";

const AuthWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Funkcja przekierowująca z https na http
  // const ensureHttpProtocol = () => {
  //   if (window.location.protocol === "https:") {
  //     console.log("zmiana");
  //     // const newUrl = window.location.href.replace("https:", "http:");
  //     window.location = window.location.href.replace(/^https:/, "http:");
  //   }
  // };

  // // Wywołanie przekierowania jako pierwsze
  // useEffect(() => {
  //   ensureHttpProtocol();
  // }, []);

  // Logika autoryzacji użytkownika
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const session = await fetchAuthSession();
        const idToken = session.tokens?.idToken;

        console.log(session.tokens.accessToken.toString());

        if (idToken) {
          const email = idToken.payload?.email;
          console.log(window.location.href);

          const response = await fetch(
            `http://52.237.23.55:8080/accounts/email?email=${encodeURIComponent(email)}`
          );

          if (!response.ok) {
            navigate("/register", { state: { email } });
          } else {
            const userData = await response.json();
            console.log("logowanie usaerra dane");
            console.log(userData);
            setUser(userData);
          }
        } else {
          // navigate("/login");
        }
      } catch (error) {
        console.error("Authentication error:", error);

        // window.location = window.location.href.replace(/^https:/, "http:");
        // navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    // if (window.location.href === "http:localhost:3000") {
    //   return (
    //     <a
    //       href="http://socialtripper-cna3btdnckbpazd8.polandcentral-01.azurewebsites.net/events"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       click here
    //     </a>
    //   );
    // }

    authenticateUser();
  }, [navigate]);

  // Ładowanie
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children(user); // Przekaż dane użytkownika do dzieci komponentu
};

export default AuthWrapper;
