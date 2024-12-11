import "../src/Components/UserLogin/LoginForm.css";
import {
  signInWithRedirect,
  fetchAuthSession,
  resetPassword,
} from "@aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import React, { useEffect, useState } from "react";

function handleSignInWithGoogle() {
  signInWithRedirect({ provider: "Google" })
    .then(() => {
      console.log("Redirecting to Google sign-in...");
    })
    .catch((error) => {
      console.error("Error during sign-in:", error);
    });
}

export const components = {
  Header() {},
  Footer() {
    return (
      <div style={{ textAlign: "center", padding: "10px", color: "#888" }}>
        <p>&copy; 2024 SocialTripper</p>
      </div>
    );
  },
  SignIn: {
    Header() {
      return (
        <div className="login-logo">
          <img
            src={`${process.env.PUBLIC_URL}/LeftBarTopComponent.svg`}
            alt="Logo"
            className="logo-image"
          />

          {/* <div className="elevation-login"></div> */}
        </div>
      );
    },
    Footer() {
      return (
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <button
            onClick={() => signInWithRedirect({ provider: "Google" })}
            style={{
              width: "100%",
              height: "48px",
              background: "#F0F2F599",
              fontSize: "18px",
              fontFamily: "Kanit",
              border: "1px solid #0000001A",
              borderRadius: "12px",
              cursor: "pointer",
              display: "flex", // Używamy flexboxa
              alignItems: "center", // Wyrównujemy ikonę i tekst w pionie
              justifyContent: "center", // Centrujemy zawartość przycisku
            }}
          >
            {/* Ikona Google po lewej stronie */}
            <img
              src={`${process.env.PUBLIC_URL}/google-icon.png`} // Możesz użyć innej ikony Google
              alt="Google icon"
              style={{
                width: "36px", // Szerokość ikony
                height: "36px", // Wysokość ikony
                marginRight: "10px", // Przestrzeń między ikoną a tekstem
              }}
            />
            Sign in with Google
          </button>
        </div>
      );
    },
  },
  SignUp: {
    Header() {
      return (
        <div className="login-logo">
          <img
            src={`${process.env.PUBLIC_URL}/LeftBarTopComponent.svg`}
            alt="Logo"
            className="logo-image"
          />
        </div>
      );
    },
    Footer() {},
  },
};

// Pola formularzy logowania i rejestracji
export const formFields = {
  signIn: {
    username: {
      placeholder: "Email",
      className: "form-login",
    },
    password: {
      placeholder: "Password",
    },
  },
  signUp: {
    password: {
      label: "Password:",
      placeholder: " Password",
      isRequired: true,
      order: 2,
    },
    confirm_password: {
      label: " Password:",
      order: 1,
    },
  },
};
