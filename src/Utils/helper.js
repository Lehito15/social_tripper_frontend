export const getUuidFromUrl = (url) =>{
  const parts = url.split('/'); 
  const uuid = parts[2];
  return uuid;
}


export const calculateHeight = async (maxWidth,  post) => {
  // const maxWidth = containerRef.current ? containerRef.current.offsetWidth * (2/3) : 868; // Użycie offsetWidth kontenera, jeśli jest dostępny
  if (post.postMultimediaDTO && post.postMultimediaDTO.length > 0) {
    const mediaHeights = await Promise.all(
      post.postMultimediaDTO.map((mediaItem) => {
        if (mediaItem.type === 'image') {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = mediaItem.src;
            img.onload = () => {
              const scaledHeight = (img.naturalHeight / img.naturalWidth) * maxWidth;
              resolve(Math.min(scaledHeight, 900)); // Ograniczamy do maksymalnej wysokości 600
            };
          });
        } else if (mediaItem.type === 'video') {
          return Promise.resolve(600); // Wysokość dla wideo
        }
        return Promise.resolve(450); // Domyślna wysokość
      })
    );
    const minHeight = Math.min(...mediaHeights); // Minimalna wysokość dla mediów
    setPostHeight(minHeight);
  } else {
    
    setPostHeight(0); // Jeśli brak mediów, wysokość to 0
  }
};
