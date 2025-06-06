import { ShirtCard, ShirtCardSkeleton } from '@/components/ShirtCard';
import { styles } from '@/styles/styles';
import { Product } from '@/types/types';
import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  refetch: () => void;
  fetchNextPage: () => void;
  ListHeaderComponent: React.ReactElement;
}

export const ProductList = ({
  products,
  isLoading,
  isFetching,
  isFetchingNextPage,
  hasNextPage,
  refetch,
  fetchNextPage,
  ListHeaderComponent,
}: ProductListProps) => {
  // Render individual product item
  const renderItem = ({ item }: { item: Product }) => {
    return (
      <View style={styles.productItemContainer}>
        <ShirtCard shirt={item} />
      </View>
    );
  };

  // Loading skeletons
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <ShirtCardSkeleton key={`skeleton-${index}`} />
    ));
  };

  // Footer component for loading more indicator
  const ListFooterComponent = () => {
    if (isFetchingNextPage) {
      return (
        <View style={styles.loadingMoreContainer}>
          <ActivityIndicator size="small" color="#333" />
          <Text style={styles.loadingMoreText}>Loading more products...</Text>
        </View>
      );
    }
    
    if (!hasNextPage && products.length > 0) {
      return (
        <View style={styles.endOfListContainer}>
          <Text style={styles.endOfListText}>No more products to load</Text>
        </View>
      );
    }
    
    return null;
  };

  // Empty state component
  const ListEmptyComponent = () => {
    if (isLoading) {
      return (
        <View style={styles.shirtGrid}>
          {renderSkeletons()}
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products found</Text>
      </View>
    );
  };

  // Handle end reached
  const handleEndReached = () => {
    console.log('=== END REACHED ===');
    console.log('Has next page:', hasNextPage);
    console.log('Is fetching next page:', isFetchingNextPage);
    console.log('Total products loaded:', products.length);
    
    if (hasNextPage && !isFetchingNextPage) {
      console.log('Triggering fetchNextPage...');
      fetchNextPage();
    } else {
      console.log('Not fetching - either no next page or already fetching');
    }
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={styles.shirtRow}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent}
      // onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      refreshControl={
        <RefreshControl
          refreshing={isFetching && !isFetchingNextPage}
          onRefresh={refetch}
          colors={['#333']}
          tintColor="#333"
        />
      }
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={10}
      initialNumToRender={6}
    />
  );
};