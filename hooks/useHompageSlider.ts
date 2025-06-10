import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchHomepageSlider = async () => {
  const { data } = await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/dashboard/settings/sliders`
  );
  return data;
};


export const useHomepageSlider = () => {
  return useQuery(
   {
    queryKey: ["homepage-slider"],
    queryFn: fetchHomepageSlider,
    refetchOnWindowFocus: false,
   }
    
  );

};
