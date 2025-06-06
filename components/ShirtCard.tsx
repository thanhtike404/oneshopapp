import { PLACEHOLDER_BLURHASH } from '@/constants/constants';
import { styles } from '@/styles/styles';
import { Product } from '@/types/types';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { default as React } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
export const ShirtCardSkeleton = () => (
  <View style={styles.card}>
    <View style={[styles.image, styles.imageSkeleton]}>
      <ActivityIndicator size="small" color="#666" />
    </View>
    <View style={styles.infoContainer}>
      <View style={[styles.nameSkeleton, styles.skeletonAnimation]} />
      <View style={[styles.nameSkeleton, { 
        width: '60%',
        height: 14,
        marginTop: 4
      }, styles.skeletonAnimation]} />
      <View style={[styles.buttonSkeleton, styles.skeletonAnimation]} />
    </View>
  </View>
);

export function ShirtCard({ shirt }: { shirt: Product }) {
  return (
    <View style={styles.card}>
      <Image
        source={shirt.image}
        style={styles.image}
        placeholder={PLACEHOLDER_BLURHASH}
        contentFit="cover"
        transition={300}
        cachePolicy="memory-disk"
      />
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.name} numberOfLines={1}>
            {shirt.name}
          </Text>
          <Text style={styles.price} numberOfLines={1}>
            {shirt.basePrice} MMK
          </Text>
        </View>
      <Link href={`/products/${shirt.id}`} asChild>
  <TouchableOpacity style={styles.addButton}>
    <Text style={styles.addButtonText}>View</Text>
  </TouchableOpacity>
</Link>

      </View>
    </View>
  );
}