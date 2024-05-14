export const getCowork = async (id: string) => {                                   
    try {                                   
        const response = await fetch(`http://localhost:3000/coworkings/${id}`);                                     
        const data = await response.json();
        console.log(data);                      
        return data                                
    } catch (error) {                                   
        console.error("Error fetching product:", error);                                    
        return null;                                    
    }                                   
};                                  
                                    
export default getCowork;                                  
