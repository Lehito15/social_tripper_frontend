
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

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo (Congo-Brazzaville)',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czechia (Czech Republic)',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini (fmr. Swaziland)',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Holy See',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Korea (North)',
  'Korea (South)',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar (formerly Burma)',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Macedonia (formerly Macedonia)',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine State',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe'
];

export const countriesList =  () =>{
  const options = countries.map(country => ({
    value: country,
    label: country
  }));
  return options;
}

