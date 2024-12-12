import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuthSession } from "aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css";

const AuthWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const session = await fetchAuthSession();
        const idToken = session.tokens?.idToken;

        if (idToken) {
          const email = idToken.payload?.email;

          const response = await fetch(
            // `http://52.237.23.55:8080/accounts/email?email=${encodeURIComponent(email)}`
            `http://74.248.145.105:8080/accounts/email?email=${encodeURIComponent(email)}`
          );

          if (!response.ok) {
            navigate("/register", { state: { email } });
          } else {
            const userData = await response.json();
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

    authenticateUser();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children(user);
};

export default AuthWrapper;
