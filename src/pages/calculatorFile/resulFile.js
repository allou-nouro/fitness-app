import { useResults } from "./resultContext";
import ResultAff from "../ResultAffiche";
import { motion } from "framer-motion";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function RuseltFile() {
  const { results } = useResults();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const width = isDesktop ? "50%" : "100%";

  const bmiCategories = [
    { label: "Severe Thinness", description: "Very underweight, serious health risk", color: "#b71c1c", range: [0, 16] },
    { label: "Moderate Thinness", description: "Moderately underweight", color: "#d32f2f", range: [16, 17] },
    { label: "Mild Thinness", description: "Slightly underweight", color: "#f57c00", range: [17, 18.5] },
    { label: "Normal", description: "Healthy weight range", color: "#388e3c", range: [18.5, 25] },
    { label: "Overweight", description: "Above normal weight", color: "#fbc02d", range: [25, 30] },
    { label: "Obese Class I", description: "Obesity - Moderate risk", color: "#f57c00", range: [30, 35] },
    { label: "Obese Class II", description: "Obesity - High risk", color: "#e64a19", range: [35, 40] },
    { label: "Obese Class III", description: "Extreme obesity - Very high risk", color: "#b71c1c", range: [40, Infinity] },
  ];

  const getBMICategory = (bmi) => {
    return bmiCategories.find(cat => bmi >= cat.range[0] && bmi < cat.range[1]);
  };

  if (!results || !results.bmi) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>No results found. Please calculate first.</p>;
  }

  const category = getBMICategory(results.bmi);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
        width,
        margin: "auto",
        marginTop: "70px"
      }}>
        <h1>Results</h1>

        <div style={{
          width: "90%",
          borderRadius: "10px",
          padding: "10px",
          backgroundColor: category.color,
          color: "white"
        }}>
          <h2>BMI: {results.bmi}</h2>
          <h3>{category.label}</h3>
          <h4>{category.description}</h4>
        </div>

        <ResultAff name={"🔥 Calories:"} value={`${results.calories} kcal`} color={"#F44336"} />
        <ResultAff name={"🥩 Protein:"} value={`${results.macros.protein} g`} color={"#7B1FA2"} />
        <ResultAff name={"🍞 Carbs:"} value={`${results.macros.carbs} g`} color={"#FF9800"} />
        <ResultAff name={"🥑 Fat:"} value={`${results.macros.fat} g`} color={"#00BCD4"} />
      </div>
    </motion.div>
  );
}
