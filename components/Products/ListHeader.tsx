import CategoryShowcase from '@/components/HomePage/CategoryShowcase';
import HomePageSlider from '@/components/HomePage/HomePageSlider';
import React from 'react';

export const ListHeader = () => {
  return (
    <>
      <HomePageSlider />
      <CategoryShowcase />
    </>
  );
};