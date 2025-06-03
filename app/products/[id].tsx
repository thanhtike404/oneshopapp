import { Product, Variant } from '@/types/types';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
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
    <SafeAreaView style={enhancedStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      
      {/* Header Skeleton */}
      <View style={enhancedStyles.headerSkeleton}>
        <Animated.View style={[enhancedStyles.backButtonSkeleton, { opacity }]}>
          <LinearGradient
            colors={['#2a2a3e', '#3a3a4e']}
            style={enhancedStyles.skeletonGradient}
          />
        </Animated.View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Skeleton */}
        <View style={enhancedStyles.imageSkeletonContainer}>
          <Animated.View style={[enhancedStyles.imageSkeleton, { opacity }]}>
            <LinearGradient
              colors={['#2a2a3e', '#3a3a4e', '#2a2a3e']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={enhancedStyles.skeletonGradient}
            />
          </Animated.View>
        </View>

        {/* Content Skeleton */}
        <View style={enhancedStyles.contentSkeleton}>
          {/* Title Skeleton */}
          <Animated.View style={[enhancedStyles.titleSkeleton, { opacity }]}>
            <LinearGradient
              colors={['#2a2a3e', '#3a3a4e']}
              style={enhancedStyles.skeletonGradient}
            />
          </Animated.View>

          {/* Category Skeleton */}
          <Animated.View style={[enhancedStyles.categorySkeleton, { opacity }]}>
            <LinearGradient
              colors={['#2a2a3e', '#3a3a4e']}
              style={enhancedStyles.skeletonGradient}
            />
          </Animated.View>

          {/* Price Skeleton */}
          <Animated.View style={[enhancedStyles.priceSkeleton, { opacity }]}>
            <LinearGradient
              colors={['#ff6b6b', '#ff8e8e']}
              style={enhancedStyles.skeletonGradient}
            />
          </Animated.View>

          {/* Description Skeleton */}
          {[1, 2, 3].map((item) => (
            <Animated.View key={item} style={[enhancedStyles.descriptionSkeleton, { opacity }]}>
              <LinearGradient
                colors={['#2a2a3e', '#3a3a4e']}
                style={enhancedStyles.skeletonGradient}
              />
            </Animated.View>
          ))}

          {/* Variants Skeleton */}
          <View style={enhancedStyles.variantsTitleSkeleton}>
            <Animated.View style={[enhancedStyles.sectionTitleSkeleton, { opacity }]}>
              <LinearGradient
                colors={['#2a2a3e', '#3a3a4e']}
                style={enhancedStyles.skeletonGradient}
              />
            </Animated.View>
          </View>

          {[1, 2, 3].map((item) => (
            <Animated.View key={item} style={[enhancedStyles.variantSkeleton, { opacity }]}>
              <LinearGradient
                colors={['#2a2a3e', '#3a3a4e']}
                style={enhancedStyles.skeletonGradient}
              />
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ProductDetail.tsx
export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  type ProductWithVariant = Product & { variants: Variant[] };

  const fetchProduct = () => {
    return axios.get<ProductWithVariant>(`https://oneshop-eight.vercel.app/api/v1/products/${id}`);
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: fetchProduct
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
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

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return (
      <SafeAreaView style={enhancedStyles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
        <LinearGradient
          colors={['#1a1a2e', '#16213e']}
          style={enhancedStyles.errorContainer}
        >
          <Ionicons name="warning-outline" size={60} color="#ff6b6b" />
          <Text style={enhancedStyles.errorTitle}>Oops! Something went wrong</Text>
          <Text style={enhancedStyles.errorText}>Unable to load product details</Text>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={enhancedStyles.retryButton}
          >
            <LinearGradient
              colors={['#ff6b6b', '#ff8e8e']}
              style={enhancedStyles.retryButtonGradient}
            >
              <Text style={enhancedStyles.retryButtonText}>Go Back</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  const product = data?.data;

  return (
    <SafeAreaView style={enhancedStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      
      {/* Header with Back Button */}
      <View style={enhancedStyles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={enhancedStyles.backButton}
        >
          <LinearGradient
            colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
            style={enhancedStyles.backButtonGradient}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <Animated.View style={[enhancedStyles.content, { opacity: fadeAnim }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Product Image */}
          {product?.images && (
            <View style={enhancedStyles.imageContainer}>
              <Image
                source={{ uri: product.images[0].url }}
                style={enhancedStyles.productImage}
                resizeMode="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(26,26,46,0.8)']}
                style={enhancedStyles.imageOverlay}
              />
            </View>
          )}

          {/* Product Details */}
          <View style={enhancedStyles.detailsContainer}>
            <LinearGradient
              colors={['#1a1a2e', '#16213e']}
              style={enhancedStyles.detailsGradient}
            >
              {/* Product Name */}
              <Text style={enhancedStyles.productName}>{product?.name}</Text>
              
              {/* Category Badge */}
              <View style={enhancedStyles.categoryContainer}>
                <LinearGradient
                  colors={['#4ecdc4', '#44a08d']}
                  style={enhancedStyles.categoryBadge}
                >
                  <Text style={enhancedStyles.categoryText}>{product?.category.name}</Text>
                </LinearGradient>
              </View>

              {/* Price */}
              <View style={enhancedStyles.priceContainer}>
                <LinearGradient
                  colors={['#ff6b6b', '#ff8e8e']}
                  style={enhancedStyles.priceGradient}
                >
                  <Text style={enhancedStyles.priceText}>${product?.basePrice.toFixed(2)}</Text>
                </LinearGradient>
              </View>

              {/* Description */}
              <View style={enhancedStyles.descriptionContainer}>
                <Text style={enhancedStyles.sectionTitle}>Description</Text>
                <Text style={enhancedStyles.description}>{product?.description}</Text>
              </View>

              {/* Available Sizes */}
              <View style={enhancedStyles.variantsSection}>
                <Text style={enhancedStyles.sectionTitle}>Available Sizes</Text>
                <View style={enhancedStyles.variantsContainer}>
                  {product?.variants.map((variant, index) => (
                    <TouchableOpacity key={variant.id} style={enhancedStyles.variantItem}>
                      <LinearGradient
                        colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
                        style={enhancedStyles.variantGradient}
                      >
                        <View style={enhancedStyles.variantHeader}>
                          <Text style={enhancedStyles.variantName}>{variant.name}</Text>
                          {variant.priceOffset > 0 && (
                            <View style={enhancedStyles.priceOffsetContainer}>
                              <Text style={enhancedStyles.priceOffset}>
                                +${variant.priceOffset.toFixed(2)}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={enhancedStyles.stockContainer}>
                          <View style={[
                            enhancedStyles.stockIndicator, 
                            { backgroundColor: variant.stocks[0].quantity > 0 ? '#4ecdc4' : '#ff6b6b' }
                          ]} />
                          <Text style={enhancedStyles.stockText}>
                            {variant.stocks[0].quantity > 0 
                              ? `${variant.stocks[0].quantity} in stock` 
                              : 'Out of stock'
                            }
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const enhancedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    zIndex: 10,
  },
  backButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  backButtonGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    height: height * 0.4,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  detailsContainer: {
    flex: 1,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  detailsGradient: {
    flex: 1,
    padding: 25,
    paddingTop: 35,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  categoryContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  priceGradient: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  priceText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 24,
  },
  variantsSection: {
    marginBottom: 20,
  },
  variantsContainer: {
    gap: 12,
  },
  variantItem: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 12,
  },
  variantGradient: {
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  variantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  variantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  priceOffsetContainer: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceOffset: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  stockText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  
  // Error States
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 30,
  },
  retryButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  retryButtonGradient: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Skeleton Loading Styles
  headerSkeleton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backButtonSkeleton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  imageSkeletonContainer: {
    height: height * 0.4,
  },
  imageSkeleton: {
    width: '100%',
    height: '100%',
  },
  contentSkeleton: {
    flex: 1,
    padding: 25,
    paddingTop: 35,
    backgroundColor: '#1a1a2e',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  titleSkeleton: {
    height: 32,
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  categorySkeleton: {
    height: 24,
    width: 120,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  priceSkeleton: {
    height: 28,
    width: 100,
    borderRadius: 14,
    marginBottom: 25,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  descriptionSkeleton: {
    height: 16,
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  variantsTitleSkeleton: {
    marginTop: 20,
    marginBottom: 15,
  },
  sectionTitleSkeleton: {
    height: 24,
    width: 150,
    borderRadius: 8,
    overflow: 'hidden',
  },
  variantSkeleton: {
    height: 80,
    borderRadius: 15,
    marginBottom: 12,
    overflow: 'hidden',
  },
  skeletonGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
  },
});