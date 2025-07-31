import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const SliderContext = createContext();

export function SliderProvider({ children }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (images.length === 0) {
      for (let i = 0; i < 5; i++) {
        axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
          .then((response) => {
            setImages(prev => [...prev, ...response.data.meals]);
          })
          .catch((error) => {
            console.error("Error fetching recipes:", error);
          });
      }
    }
  }, []);

  return (
    <SliderContext.Provider value={{ images }}>
      {children}
    </SliderContext.Provider>
  );
}

export function useSlider() {
  return useContext(SliderContext);
}
