import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAuthSession } from "aws-amplify/auth";
import '@aws-amplify/ui-react/styles.css';

const AuthWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const session = await fetchAuthSession();
        const idToken = session.tokens?.idToken;
        console.log('nasze tokeny')

       console.log(session.tokens.accessToken.toString())
        // console.log('access token')
        // console.log('Access Token:', accessToken);
       

        if (idToken) {
          const email = idToken.payload?.email;

          const response = await fetch(`http://52.237.23.55:8080/accounts/email?email=${encodeURIComponent(email)}`);
          // const response = await fetch(`http://localhost:8080/accounts/email?email=${encodeURIComponent(email)}`);
          if (!response.ok) {
            navigate("/register", { state: { email } });
          } else {
           
            
            const userData = await response.json();
            console.log('logowanie usaerra dane')
            console.log(userData)
            setUser(userData);
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    authenticateUser();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children(user); // Przekaż dane użytkownika do dzieci komponentu
};

export default AuthWrapper;
