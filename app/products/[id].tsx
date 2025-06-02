import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  // const navigation = useNavigation();
  
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false
  //   });
  // }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ color: 'blue', marginBottom: 10 }}>← Go Back</Text>
      </TouchableOpacity>

      <Text>Product ID: {id}</Text>
    </SafeAreaView>
  );
}
