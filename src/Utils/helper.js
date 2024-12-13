export const getUuidFromUrl = (url) => {
  const parts = url.split("/");
  const uuid = parts[2];
  return uuid;
};

export const sendToBackend = async (path, method, body) => {
  // const baseUrl = "http://52.237.23.55:8080/"; // Domyślna ścieżka bazowa
  const baseUrl = "http://74.248.145.105:8080/";
  const endpoint = `${baseUrl}${path}`;

  const isFormData = body instanceof FormData;

  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
      body: isFormData ? body : body ? body : null,
      referrerPolicy: "unsafe-url",
    });

    if (!response.ok) {
      throw new Error(`Failed to send request. Status: ${response.status}`);
    }

    if (response.status === 204) {
      console.log("No content in response");
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const extractAfterHttp = (url) => {
  if (!url) {
    console.error("URL is undefined or null");
    return null;
  }

  const regex = /^http:\/\/(.*)$/;
  const match = url.match(regex);

  if (match) {
    return match[1];
  } else {
    console.error("URL doesn't match the expected format");
    return null;
  }
};

const activitiesmapper = {
  camping: "walking.svg",
  hiking: "hiking.svg",
  ride: "ride.svg",
  running: "running.svg",
  sport: "sport.svg",
  walking: "walking.svg",
  water: "water.svg",
};

export const getActivityIcon = (activityName) => {
  const fileName = activitiesmapper[activityName];
  const file = `${process.env.PUBLIC_URL}/${fileName}`;
  return file;
};

export const decodeRules = (rulesString) =>
  rulesString
    ? rulesString.split(";").map((rule) => {
        const [name, description = ""] = rule.split("|");
        return { name, description };
      })
    : [];
