
export const getUuidFromUrl = (url) =>{
  const parts = url.split('/'); 
  const uuid = parts[2];
  return uuid;
}

export const sendToBackend = async (path, method, body) => {
  const baseUrl = 'http://52.237.23.55:8080/'; // Domyślna ścieżka bazowa
  // const baseUrl = 'http://localhost:8080/';
  const endpoint = `${baseUrl}${path}`;
  console.log(endpoint);
  console.log(method);
  console.log(body);

  const isFormData = body instanceof FormData;
  const token = 'eyJraWQiOiJza2JsQlJQSFwvTElKenZSTWMyQ2JYUHpSZ0JpajNcL2trcjF0VzlYb2dhNkE9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI4NGM4YTQzOC1hMDkxLTcwZDctMzliMi0yZDIxNmZiODExMTgiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV93eldBVGs5WDEiLCJjbGllbnRfaWQiOiIzdW4wYTllMXRpNzJwaWUxY2M3ZWtoM3FvMiIsIm9yaWdpbl9qdGkiOiI3YjUxM2JiYS04NTBkLTRjM2ItYjAxZC1jOWRmMjU3YzRjZmMiLCJldmVudF9pZCI6IjVlOTlmN2E1LWFhYTgtNDA4ZC05ZTkyLTJjMmEwMmUzMWNlNSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MzMxODk1MzEsImV4cCI6MTczMzM5MzkxNSwiaWF0IjoxNzMzMzA3NTE1LCJqdGkiOiI2ZGY4MGM2Ni0xYmU2LTRmYWQtYjE0ZC04MTg4NGU5OGQyZmYiLCJ1c2VybmFtZSI6Ijg0YzhhNDM4LWEwOTEtNzBkNy0zOWIyLTJkMjE2ZmI4MTExOCJ9.PSISwrCYmn5kIVNCypXJJ2cYpUqKCYQN1fDVTIYX-7ozBOxdkjvRmY0S41j2U17sK2iP9Xoj5PX88OfYiARbgBrL2u2HBXKysOEisLhPp2nbv5bC-_eKVKHzrHsiUgt_DBZtmoSBJL6UDIdfueEtlhtD88BWyFDWu-7Wxq1oW-sm-nd8dZxZT0N_QBmjcpst8kZAKihFkElixfKl7uvd4Dt-y9gocnd60ogqDGbha63bYg6Bldh6LwHSstskciJ3_K5PAhUs5gN7VCBlpvZy8IqUNcsoM2W8rUBzT2GjSDOIazPPaNdKbv1-OFFHoEsyrxtFiaBck_27T38janFRHQ'

  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { 'Authorization': `Bearer ${'eyJraWQiOiJza2JsQlJQSFwvTElKenZSTWMyQ2JYUHpSZ0JpajNcL2trcjF0VzlYb2dhNkE9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI3NDc4ZDRlOC1kMGUxLTcwNjMtNDg1Yi0wMjcyNmFlM2ZiZDQiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTFfd3pXQVRrOVgxX0dvb2dsZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV93eldBVGs5WDEiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIzdW4wYTllMXRpNzJwaWUxY2M3ZWtoM3FvMiIsIm9yaWdpbl9qdGkiOiI2OTdkYWJiNC00YTVlLTRkYjQtOTYxYS02ZGE2YzA5NDQyZjgiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNzMzNDAyMjU1LCJleHAiOjE3MzM0ODg2NTUsImlhdCI6MTczMzQwMjI1NSwianRpIjoiNWE4ODdkNzEtZmYyZi00ZjA5LWI1NmQtNjUxNTM5OGRlOWI1IiwidXNlcm5hbWUiOiJnb29nbGVfMTE1OTQ3NjgyOTM4NzQ0NDMyOTQ3In0.d2Nu3bhYTS8MM_8ROeTOSDfugOcop_mcu8fNQC3Ik2RySykw6XSNmCFkIcCQLpFMCljM3NBw6CiGkTrV5sHVPFOpEJ5-ReL6LuJoQVeSfzrxcM3pPLQIBxd2JBPYJE-99DWKlvgDOCWFEUOWOJ44TeoSkGuiBkQ-gG2yXtpfRlHJ5J4ByrZbLO3J4z3WJRCHXfDrFv06Ajqjxw2shQqSyyOYYtD0i3EcoUZYJ22xGzNHQjs2M7l770_Di7tHn_fBWJZ83COG7dE5x-ZoDreNBE2wNbd1c6587kS9MI4ZHqvusZksLBMnXQxjcjHp59NeDBTvAjYqtSDZR1UWP6U3zQ'}` } : {}) // Dodaj nagłówek Authorization, jeśli token istnieje
      },
      body: isFormData ? body : body ? body : null,
    });

    if (!response.ok) {
      throw new Error(`Failed to send request. Status: ${response.status}`);
    }

    // Obsługa odpowiedzi bez treści (204 No Content)
    if (response.status === 204) {
      console.log('No content in response');
      return null; // Lub inna wartość, jeśli potrzebujesz
    }

    const data = await response.json(); // Parsowanie odpowiedzi tylko, jeśli nie jest pusta
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
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



