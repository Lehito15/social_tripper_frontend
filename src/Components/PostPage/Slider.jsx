import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import '../PostPage/Slider.css';


function Slider({multimedia, postHeight}) {
  const [index, setIndex] = useState(0); // Zarządzanie aktywnym indeksem
  

  const handleSelect = (selectedIndex) => {
    const lastIndex = 2; // Zakładamy, że mamy 3 slajdy (0, 1, 2)

    // Sprawdzamy, czy użytkownik próbuje przejść poza pierwszy lub ostatni slajd
    if (selectedIndex > lastIndex || selectedIndex < 0) {
      return; // Nie zmieniamy indeksu, jeśli przekroczy granice
    }

    setIndex(selectedIndex); // Ustawiamy nowy indeks, jeśli jest on w granicach
  };
  console.log('slider');
  console.log(multimedia);
  console.log(postHeight)

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null} controls={multimedia.length > 1} indicators={multimedia.length > 1}
    style={{height: postHeight}}>
      {multimedia.map((media, idx) => (
        <Carousel.Item key={idx}>
          {media.type === 'video' ? ( // Sprawdzenie, czy link prowadzi do wideo
            <video className="d-block w-100" controls style = {{height: postHeight }}>
              <source src={media.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={media.src}
              alt={`Slide ${idx + 1}`}  
              className="img"
              style = {{height: postHeight }}
            />
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Slider;
