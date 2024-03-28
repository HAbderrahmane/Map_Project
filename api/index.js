import axios from "axios";


export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: bl_lat ? bl_lat : "43.16963412607587",
          tr_latitude: tr_lat ? tr_lat : "43.39105653360466",
          bl_longitude: bl_lng ? bl_lng : "5.228753442219432",
          tr_longitude: tr_lng ? tr_lng : "5.532543303418947",
          limit: "30",
          currency: "USD",
          lunit: "km",
          lang: "en_US",
        },
        headers: {
          "X-RapidAPI-Key": "3e1d35a7d4msh17e37af77a88cf4p1be5dejsn5f61d0482d4c",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    return null;
  }
};
