import axios from "axios";
import { useEffect, useState } from "react";
import CardShow from "./cardShow";

const getNutrientValue = (fullNutrients, attrId) => {
  const nutrient = fullNutrients.find(n => n.attr_id === attrId);
  return nutrient ? nutrient.value : 0;
};

const appId = process.env.REACT_APP_APP_ID;
const appKey = process.env.REACT_APP_APP_KEY;


export default function Nutrition({ ingredients }) {
  const [poi, setPoi] = useState(0)
  const [nutrition, setNutrition] = useState({
    calories: { value: 0, unit: "kcal" },
    total_fat: { value: 0, unit: "g" },
    saturated_fat: { value: 0, unit: "g" },
    cholesterol: { value: 0, unit: "mg" },
    sodium: { value: 0, unit: "mg" },
    total_carbohydrate: { value: 0, unit: "g" },
    dietary_fiber: { value: 0, unit: "g" },
    sugars: { value: 0, unit: "g" },
    protein: { value: 0, unit: "g" },
    potassium: { value: 0, unit: "mg" },
    phosphorus: { value: 0, unit: "mg" },
    vitamin_a_dv: { value: 0, unit: "%" },
    vitamin_c_dv: { value: 0, unit: "%" },
    calcium_dv: { value: 0, unit: "%" },
    iron_dv: { value: 0, unit: "%" }
  });

  const normalizedIngredients = ingredients.map(ing => ing.normalized);

  useEffect(() => {
    if (!normalizedIngredients.length) return;

    const query = normalizedIngredients.join(", ");

    axios.post(
      "https://trackapi.nutritionix.com/v2/natural/nutrients",
      { query },
      {
        headers: {
          "x-app-id": appId,
          "x-app-key": appKey,
          "Content-Type": "application/json"
        }
      }
    ).then((res) => {
      const foods = res.data?.foods || [];
      let updated = { ...nutrition };
      let poid = 0;

      foods.forEach((food) => {
        poid += food.serving_weight_grams;
        updated.calories.value += food.nf_calories;
        updated.total_fat.value += food.nf_total_fat;
        updated.saturated_fat.value += food.nf_saturated_fat;
        updated.cholesterol.value += food.nf_cholesterol;
        updated.sodium.value += food.nf_sodium;
        updated.total_carbohydrate.value += food.nf_total_carbohydrate;
        updated.dietary_fiber.value += food.nf_dietary_fiber;
        updated.sugars.value += food.nf_sugars;
        updated.protein.value += food.nf_protein;
        updated.potassium.value += food.nf_potassium;
        updated.phosphorus.value += getNutrientValue(food.full_nutrients, 305);
        updated.vitamin_a_dv.value += getNutrientValue(food.full_nutrients, 318);
        updated.vitamin_c_dv.value += getNutrientValue(food.full_nutrients, 401);
        updated.calcium_dv.value += getNutrientValue(food.full_nutrients, 301);
        updated.iron_dv.value += getNutrientValue(food.full_nutrients, 303);
      });

      if (poid > 0) {
        for (const key in updated) {
          updated[key].value = (updated[key].value / poid) * 100;
          updated[key].value = parseFloat(updated[key].value.toFixed(2));
        }
      }

      setNutrition(updated);
      setPoi(poid);
    }).catch((err) => {
      console.error("API Error:", err.response?.data || err.message);
    });
  }, [ingredients]);

  return (
    <div style={{marginTop:"20px"}} >
      <h2>Nutrition Info (per 100g)</h2>
      {Object.entries(nutrition).map(([key, { value, unit }]) => (
        <CardShow
          key={key}
          title={key.replace(/_/g, " ").toUpperCase()}
          value={`${value.toFixed(2)} ${unit}`}
        />
      ))}
      <CardShow title="TOTAL WEIGHT" value={`${poi.toFixed(2)} g`} />
    </div>
  );
}
