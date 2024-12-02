
export const getUuidFromUrl = (url) =>{
  const parts = url.split('/'); 
  const uuid = parts[2];
  return uuid;
}

export const sendToBackend = async (path, method, body) => {
  const baseUrl = 'http://localhost:8080/'; // Domyślna ścieżka bazowa
  const endpoint = `${baseUrl}${path}`;

  // Sprawdzenie, czy body jest instancją FormData
  const isFormData = body instanceof FormData;

  try {
    const response = await fetch(endpoint, {
      method,
      headers: isFormData
        ? undefined // FormData sam ustawia odpowiednie nagłówki
        : { 'Content-Type': 'application/json' },
      body: isFormData ? body : body ? body : null,
    });

    if (!response.ok) {
      throw new Error(`Failed to send request. Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Przerzucamy błąd, aby umożliwić jego obsługę w miejscu wywołania funkcji
  }
};

export const extractAfterHttp = (url)  => {
  if (!url) {
    console.error("URL is undefined or null");
    return null; // Jeśli url jest undefined lub null, zwróć null
  }

  const regex = /^http:\/\/(.*)$/;
  const match = url.match(regex);

  if (match) {
    return match[1];
  } else {
    console.error("URL doesn't match the expected format");
    return null; // Jeśli URL nie pasuje do wzorca
  }
}


// Przykład użycia
const url = "http://events/b544ecce-09fe-4ea6-b185-7c9dcd076816";
const extractedPart = extractAfterHttp(url);
console.log(extractedPart); // Wydrukuje: events/b544ecce-09fe-4ea6-b185-7c9dcd076816




 const activitiesmapper = {
  'camping': "walking.svg",
  'hiking': "hiking.svg",
   'ride': "ride.svg",
   'running': "running.svg",
   'sport': "sport.svg",
   'walking': "walking.svg",
   'water': "water.svg"
}

export const getActivityIcon = (activityName) => {
  const fileName = activitiesmapper[activityName];
  const file  = `${process.env.PUBLIC_URL}/${fileName}`
  return file;
};

 export const decodeRules = (rulesString) =>
  rulesString
    ? rulesString.split(';').map((rule) => {
        const [name, description = ''] = rule.split('|');
        return { name, description };
      })
    : [];




// export const calculateHeight = async (maxWidth,  post) => {
//   // const maxWidth = containerRef.current ? containerRef.current.offsetWidth * (2/3) : 868; // Użycie offsetWidth kontenera, jeśli jest dostępny
//   if (post.postMultimediaDTO && post.postMultimediaDTO.length > 0) {
//     const mediaHeights = await Promise.all(
//       post.postMultimediaDTO.map((mediaItem) => {
//         if (mediaItem.type === 'image') {
//           return new Promise((resolve) => {
//             const img = new Image();
//             img.src = mediaItem.src;
//             img.onload = () => {
//               const scaledHeight = (img.naturalHeight / img.naturalWidth) * maxWidth;
//               resolve(Math.min(scaledHeight, 900)); // Ograniczamy do maksymalnej wysokości 600
//             };
//           });
//         } else if (mediaItem.type === 'video') {
//           return Promise.resolve(600); // Wysokość dla wideo
//         }
//         return Promise.resolve(450); // Domyślna wysokość
//       })
//     );
//     const minHeight = Math.min(...mediaHeights); // Minimalna wysokość dla mediów
//     setPostHeight(minHeight);
//   } else {
    
//     setPostHeight(0); // Jeśli brak mediów, wysokość to 0
//   }
// };



