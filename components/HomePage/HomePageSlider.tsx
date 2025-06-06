import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

const sliderData = [
  {
    id: '1',
    title: 'Beautiful Mountain',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    title: 'Sunny Beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    title: 'Forest Trail',
    image: 'https://images.unsplash.com/photo-1508923567004-3a6b8004f3d3?auto=format&fit=crop&w=800&q=80',
  },
];

function HomePageSlider() {
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
        renderItem={({ item }) => (
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
