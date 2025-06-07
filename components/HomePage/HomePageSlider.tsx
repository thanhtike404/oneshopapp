import { useHomepageSlider } from '@/hooks/useHompageSlider';
import { Slider } from '@/types/types';
import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
const { width } = Dimensions.get('window');

function HomePageSlider() {
  const { data:sliderData, isLoading, error } = useHomepageSlider();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  return (
    <View
      style={{  
        paddingVertical: 10,
      }}
    >
      <Carousel
        loop
        width={width * 0.9} // narrower than full screen
        height={200}
        autoPlay={true}
        data={sliderData}
        scrollAnimationDuration={1000}
        style={{ alignSelf: 'center' }} // 👈 force center alignment
        renderItem={({ item }:{
          item:Slider
        }) => (
          <View
            key={item.id}
            style={{
              flex: 1,
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
                width: '100%',
                padding: 8,
              }}
            > 
              <Text style={{ color: '#fff', fontSize: 14 }}>{item.title}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default HomePageSlider;
