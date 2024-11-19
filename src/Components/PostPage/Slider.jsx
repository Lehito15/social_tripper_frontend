import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import '../PostPage/Slider.css';

function Slider({ multimedia, postHeight, onSlideChange, markIndex, openPost, post, openRelation, relation }) {
  const [index, setIndex] = useState(0); // Zarządzanie aktywnym indeksem
  const carouselRef = useRef(null); // Używamy ref do całego kontenera Carousel
  console.log('mulimedia xdd')
  console.log(multimedia.length)
  console.log(relation)

  const handleSelect = (selectedIndex) => {
    const lastIndex = multimedia.length - 1; // Zakładamy, że mamy kilka slajdów (0, 1, 2, ..., n)

    // Sprawdzamy, czy użytkownik próbuje przejść poza pierwszy lub ostatni slajd
    if (selectedIndex > lastIndex || selectedIndex < 0) {
      return; // Nie zmieniamy indeksu, jeśli przekroczy granice
    }

    setIndex(selectedIndex); // Ustawiamy nowy indeks, jeśli jest on w granicach
    if (onSlideChange) {
      onSlideChange(selectedIndex); // Wywołujemy funkcję onSlideChange, jeśli została przekazana
    }
  };



  useEffect(() => {
    setIndex(markIndex);  
  }, [markIndex]);

  useEffect(() => {
    if (openPost) {
      console.log('to jest post');
      const images = document.querySelectorAll('.img');

      const handleOpenPost = () => openPost(post);

      images.forEach((img) => {
        img.addEventListener('click', handleOpenPost);
      });

      // Usunięcie zdarzeń przy unmountingu komponentu
      return () => {
        images.forEach((img) => {
          img.removeEventListener('click', handleOpenPost);
        });
      };
    }
  }, [post, openPost]);


  useEffect(() => {
    if (openRelation) {
      console.log('to jest relacja');
      const images = document.querySelectorAll('.img');

      const handleOpenRelation = () => openRelation(relation);

      images.forEach((img) => {
        img.addEventListener('click', handleOpenRelation);
      });

      return () => {
        images.forEach((img) => {
          img.removeEventListener('click', handleOpenRelation);
        });
      };
    }
  }, [relation, openRelation]);

  console.log(document.querySelector(".img"));
  // if( document.querySelector(".img")){
  //   if(openPost){
  //     document.querySelector(".img").addEventListener('click', () => openPost(post));
  //   }

  // }
  
  // console.log(multimedia);
  // console.log(postHeight);

  return (
    <div 
      className='slider-container' 
      // onClick={openPost} // Kliknięcie na całą karuzelę otworzy szczegóły posta
      style={{ height: postHeight }}
    >
      <Carousel 
        activeIndex={index} 
        onSelect={handleSelect} 
        interval={null} 
        controls={multimedia.length > 1} 
        indicators={multimedia.length > 1} 
        ref={carouselRef} // Używamy ref do całego kontenera Carousel
        style={{ height: postHeight }}
      >
        {multimedia.map((media, idx) => (
          <Carousel.Item key={idx}>
            {media.type === 'video' ? (
              <video className="d-block w-100" controls style={{ height: postHeight }}>
                <source src={media.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img 
                src={media.src} 
                alt={`Slide ${idx + 1}`}  
                className="img" 
                style={{ height: postHeight }} 
              />
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Slider;
