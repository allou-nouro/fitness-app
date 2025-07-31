import SimpleSlider from "./slider";
import { useMediaQuery } from '@mui/material';
import BoxCategory from "./BoxCategory";
import RicipCadre from "./ricipCadre";
import { useState, useEffect } from "react";
import axios from "axios";

import { motion } from "framer-motion";

export default function Home() {
  const [active, setActive] = useState(0);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const width = isDesktop ? "50%" : "90%";
  const mTop = isDesktop ? "40px" : "50px";
  const height = isDesktop ? "100vh" : "calc(100vh - 49px)";

  const category = [
  { label: "Salads", query: "salad" },
  { label: "Grilled Chicken", query: "chicken" },
  { label: "Protein Bowls", query: "beef" },
  { label: "Grilled Fish", query: "fish" },
  { label: "Smoothies", query: "shake" },       // ✅ أقرب شيء للسموذي
  { label: "Oats & Nuts", query: "nut" }
];



  const [catigors, setCatigor] = useState([]);

  useEffect(() => {
  const selectedQuery = category[active].query;
  axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${selectedQuery}`)
    .then(res => {
      if (res.data.meals) {
        const results = res.data.meals.slice(0, 6);
        const formatted = results.map(item => ({
          id: item.idMeal,
          title: item.strMeal,
          image: item.strMealThumb
        }));
        setCatigor(formatted);
      } else {
        setCatigor([]);  
      }
    })
    .catch(err => {
      console.error( err);
    });
}, [active]);

  const listCatigor = catigors.map((catigor) => (
    <RicipCadre
      key={catigor.id}
      image={catigor.image}
      title={catigor.title}
      id={catigor.id}
    />
  ));

  return (
    <motion.div
      initial={{ opacity: 0 }}      
      animate={{ opacity: 1 }}       
      exit={{ opacity: 0 }}           
      transition={{ duration: 0.5 }}  
    >
      <div
      style={{
        width: width,
        height: height,
        margin: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className="scroll-hidden"
    >
      
      <h2 style={{ marginTop: mTop }}>Try Now</h2>
      <SimpleSlider />
      <h2 style={{ marginTop: mTop }}>Popular category</h2>
      <BoxCategory category={category} active={active} setActive={setActive} />
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignContent: "center",
          gap: "15px",
          overflow: "scroll",
          padding: "5px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          height: "200px",
          paddingTop: "40px"
        }}
        className="scroll-hidden"
      >
        {listCatigor}
      </div>
    </div>
    </motion.div>
  );
}
