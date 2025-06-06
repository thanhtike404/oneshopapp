import axios from "axios";

const fetchHomepageSlider = async () => {
  const { data } = await axios.get(
    `${process.env.EXPO_PUBLIC_API_URL}/homepage-slider`
  );
  return data;
};