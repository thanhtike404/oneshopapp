import { ShirtCard, ShirtCardSkeleton } from '@/components/ShirtCard';
import { styles } from '@/styles/styles';
import { Product } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function ShirtShopPage() {
  const { 
    data: products,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<Product[]> => axios.get("https://oneshop-eight.vercel.app/api/v1/dashboard/products")
      .then(res => res.data),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Loading skeletons
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <ShirtCardSkeleton key={`skeleton-${index}`} />
    ));
  };

  // Error view
  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>One Shop</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>{error.message}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>One Shop</Text>
      </View>
      <TextInput 
        style={styles.searchInput}
        placeholder="Search products..."
      />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            colors={['#333']}
            tintColor="#333"
          />
        }
      >
        {isLoading ? (
          <View style={styles.shirtGrid}>
            {renderSkeletons()}
          </View>
        ) : (
          <View style={styles.shirtGrid}>
            {products?.map(shirt => (
              <ShirtCard key={shirt.id} shirt={shirt} />
            ))}
                       
            {products?.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No products found</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
             
      {/* Overlay loading indicator for fetching without full reload */}
      {isFetching && !isLoading && (
        <View style={styles.overlayLoading}>
          <ActivityIndicator size="small" color="#333" />
        </View>
      )}
    </SafeAreaView>
  );
}

export default ShirtShopPage;