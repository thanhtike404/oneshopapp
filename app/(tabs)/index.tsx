import { ErrorView } from '@/components/Products/ErrorView';
import { ListHeader } from '@/components/Products/ListHeader';
import { ProductList } from '@/components/Products/ProductList';
import { useFeaturedProducts } from '@/hooks/useFeaturedProducts';
import { styles } from '@/styles/styles';
import { Text } from '@react-navigation/elements';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
function ShirtShopPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useFeaturedProducts();

  // Get all products from all pages
  const products = data?.pages?.flatMap(page => page.products) || [];

  if (isError) {
    return <ErrorView error={error} refetch={refetch} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>One Shop</Text>
      </View>

      <ProductList
        products={products}
        isLoading={isLoading}
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        refetch={refetch}
        fetchNextPage={fetchNextPage}
        ListHeaderComponent={<ListHeader />}
      />

      {/* Overlay loading indicator for initial load */}
      {isLoading && (
        <View style={styles.overlayLoading}>
          <ActivityIndicator size="large" color="#333" />
        </View>
      )}
    </SafeAreaView>
  );
}

export default ShirtShopPage;