import { useFavorites } from "./FavoritProvider";
import ResultPage from "./resultPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import { useMediaQuery } from "@mui/material";
export default function Favorite() {
  const { favorites } = useFavorites();
  const [favoriteMeals, setFavoriteMeals] = useState([]);
    const isDesktop = useMediaQuery('(min-width: 768px)');
  const width = isDesktop ? "50%" : "100%";
  const height=isDesktop ? "100vh" : "calc(100vh - 60px)";
  useEffect(() => {
    if (favorites.length === 0) {
      setFavoriteMeals([]);
      return;
    }

    setFavoriteMeals([]);

    favorites.forEach((id) => {
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((res) => {
          if (res.data.meals) {
            setFavoriteMeals((prev) => [...prev, res.data.meals[0]]);
          }
        })
        .catch((err) => console.error("Error fetching details:", err));
    });
  }, [favorites]);

  return (
  <motion.div
      initial={{ opacity: 0 }}       
      animate={{ opacity: 1 }}       
      exit={{ opacity: 0 }}          
      transition={{ duration: 0.5 }} 
    >
         <div style={{
  width: width,
  margin: "auto",
  marginTop: "70px",
  position: "relative",
  height: height,

}}>
  <h1>list favorite</h1>

  {favorites.length !== 0 ? (
    <ResultPage value={favoriteMeals} from={"favorites"} />
  ) : (
    <h1
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        
      }}
    >
      No result
    </h1>
  )}
</div>
    </motion.div>

  );
}
