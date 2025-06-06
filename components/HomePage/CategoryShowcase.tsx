import { Category } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

const { width } = Dimensions.get('window')

function CategoryShowcase() {
  const fetchCategories = async () => {
    const { data } = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/categories`)
    return data
  }

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  })

  const handleCategoryPress = (category: Category) => {
    // Handle category navigation here
    console.log('Category pressed:', category.name)
  }

  const handleSubcategoryPress = (subcategory: any) => {
    // Handle subcategory navigation here
    console.log('Subcategory pressed:', subcategory.name)
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading Categories...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop by Category</Text>
        <Text style={styles.headerSubtitle}>Discover our amazing collections</Text>
      </View>

      <View style={styles.categoriesContainer}>
        {data?.map((category: Category, index: number) => (
          <View key={category.id} style={styles.categoryCard}>
            <TouchableOpacity 
              style={styles.categoryHeader}
              onPress={() => handleCategoryPress(category)}
              activeOpacity={0.8}
            >
              <Image        
              
                source={{ uri: category.imageUrl }} 
                style={styles.categoryImage}
                resizeMode="cover"
              />
              <View style={styles.categoryOverlay}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
                <View style={styles.productCount}>
                  <Text style={styles.productCountText}>
                    {`${category.products?.length || 0} Products`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Subcategories */}
            {category.subcategories && category.subcategories.length > 0 && (
              <View style={styles.subcategoriesContainer}>
                <Text style={styles.subcategoriesTitle}>Subcategories</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.subcategoriesScroll}
                  nestedScrollEnabled={true}
                >
                  {category.subcategories.map((subcategory: any) => (
                    <TouchableOpacity
                      key={subcategory.id}
                      style={styles.subcategoryCard}
                      onPress={() => handleSubcategoryPress(subcategory)}
                      activeOpacity={0.7}
                    >
                      <Image 
                        source={{ uri: subcategory.iconUrl }} 
                        style={styles.subcategoryIcon}
                        resizeMode="cover"
                      />
                      <Text style={styles.subcategoryName}>{subcategory.name}</Text>
                      <Text style={styles.subcategoryDescription}>
                        {subcategory.description}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '400',
  },
  categoriesContainer: {
    padding: 16,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  categoryHeader: {
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e9ecef',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#e9ecef',
    marginBottom: 8,
    lineHeight: 20,
  },
  productCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  productCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  subcategoriesContainer: {
    padding: 16,
  },
  subcategoriesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 12,
  },
  subcategoriesScroll: {
    marginHorizontal: -8,
  },
  subcategoryCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    width: 140,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  subcategoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 12,
    backgroundColor: '#e9ecef',
  },
  subcategoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 4,
  },
  subcategoryDescription: {
    fontSize: 12,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 16,
  },
})

export default CategoryShowcase