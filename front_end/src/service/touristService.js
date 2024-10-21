const fetchDestinationList = async (name = "", limit, offset) => {
  const endpoint = `http://localhost:5005/api/destination?name=${name}&limit=${limit}&offset=${offset}`;
  
  try {
    const response = await fetch(endpoint, {
      method: "GET",
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch destination data:", error);
    return [];
  }
};

const predictTrip = async (tripData) => {
  const endpoint = `http://localhost:5005/api/prediction/`;
  
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(tripData), 
    });

  
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch trip prediction data:", error);
    return null; 
  }
};

export const TouristService = {
  fetchDestinationList,
  predictTrip, 
};