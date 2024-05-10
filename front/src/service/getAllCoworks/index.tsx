import { ICowork } from "./types";
import { arrayExample } from "./arrayExample";

// Define la función getAllCoworks para que devuelva directamente el arrayExample
export const getAllCoworks = () => {
    try {
        return arrayExample;

        
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export default getAllCoworks;
