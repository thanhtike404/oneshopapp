import { Product, Variant } from '@/types/types';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useLayoutEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel'; // Import the Carousel component from react-native-snap-carousel
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Skeleton Loading Component
const SkeletonLoader = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.headerSkeleton}>
        <Animated.View style={[styles.backButtonSkeleton, { opacity }]} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.imageSkeletonContainer}>
          <Animated.View style={[styles.imageSkeleton, { opacity }]} />
        </View>

        <View style={styles.contentSkeleton}>
          <Animated.View style={[styles.titleSkeleton, { opacity }]} />
          <Animated.View style={[styles.categorySkeleton, { opacity }]} />
          <Animated.View style={[styles.priceSkeleton, { opacity }]} />
          {[1, 2, 3].map((i) => (
            <Animated.View key={i} style={[styles.descriptionSkeleton, { opacity }]} />
          ))}
          <Animated.View style={[styles.sectionTitleSkeleton, { opacity }]} />
          {[1, 2, 3].map((i) => (
            <Animated.View key={i} style={[styles.variantSkeleton, { opacity }]} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  type ProductWithVariant = Product & { variants: Variant[] };

  const fetchProduct = () => {
    return axios.get<ProductWithVariant>(`${process.env.EXPO_PUBLIC_API_URL}/products/${id}`);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: fetchProduct
  });

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    if (!isLoading && data) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading, data]);

  if (isLoading) return <SkeletonLoader />;

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.errorContainer}>
          <Ionicons name="warning-outline" size={60} color="#ff6b6b" />
          <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
          <Text style={styles.errorText}>Unable to load product details</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const product = data?.data;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {product?.images && (
            <View style={styles.imageContainer}>
             
              <Carousel
                data={product?.images}
                width={width}
                height={250}
              autoPlay={true}
 
          
                loop
            
                renderItem={({ item, index }) => (
                  <Image
                    key={index}
                    source={{ uri: item.url }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                )}
              />
            </View>
          )}

          <View style={styles.detailsContainer}>
            <Text style={styles.productName}>{product?.name}</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{product?.category.name}</Text>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>${product?.basePrice.toFixed(2)}</Text>
            </View>

            <View style={styles.descriptionContainer}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{product?.description}</Text>
            </View>

            <View style={styles.variantsSection}>
              <Text style={styles.sectionTitle}>Available Sizes</Text>
              <View style={styles.variantsContainer}>
                {product?.variants.map((variant) => (
                  <TouchableOpacity key={variant.id} style={styles.variantItem}>
                    <View style={styles.variantHeader}>
                      <Text style={styles.variantName}>{variant.name}</Text>
                      {variant.priceOffset > 0 && (
                        <Text style={styles.priceOffset}>
                          +${variant.priceOffset.toFixed(2)}
                        </Text>
                      )}
                    </View>
                    <View style={styles.stockContainer}>
                      <View style={[
                        styles.stockIndicator,
                        {
                          backgroundColor:
                            variant.stocks[0].quantity > 0 ? '#4ecdc4' : '#ff6b6b'
                        }
                      ]} />
                      <Text style={styles.stockText}>
                        {variant.stocks[0].quantity > 0 ? 'In Stock' : 'Out of Stock'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    backgroundColor: '#fff',
  },
  headerSkeleton: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  backButtonSkeleton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ccc',
  },
  imageSkeletonContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#eee',
  },
  imageSkeleton: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  contentSkeleton: {
    padding: 16,
    backgroundColor: '#fff',
  },
  titleSkeleton: {
    height: 24,
    width: '60%',
    backgroundColor: '#ddd',
    marginBottom: 12,
  },
  categorySkeleton: {
    height: 20,
    width: '40%',
    backgroundColor: '#ddd',
    marginBottom: 12,
  },
  priceSkeleton: {
    height: 24,
    width: '30%',
    backgroundColor: '#ddd',
    marginBottom: 12,
  },
  descriptionSkeleton: {
    height: 16,
    width: '100%',
    backgroundColor: '#ddd',
    marginBottom: 8,
  },
  sectionTitleSkeleton: {
    height: 20,
    width: '50%',
    backgroundColor: '#ddd',
    marginVertical: 12,
  },
  variantSkeleton: {
    height: 40,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#222',
  },
  errorText: {
    color: '#555',
    marginVertical: 8,
  },
  retryButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff6b6b',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#f8f8f8',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  categoryContainer: {
    backgroundColor: '#eee',
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#555',
  },
  priceContainer: {
    marginBottom: 16,
  },
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#222',
  },
  description: {
    color: '#333',
    lineHeight: 20,
  },
  variantsSection: {
    marginBottom: 20,
  },
  variantsContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  variantItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
  },
  variantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  variantName: {
    fontWeight: '600',
    fontSize: 14,
    color: '#111',
  },
  priceOffset: {
    color: '#ff6b6b',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  stockIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  stockText: {
    fontSize: 12,
    color: '#555',
  },
});
