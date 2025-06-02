
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
function ProductFilter() {
  return (
    <SafeAreaView style={{
      flex: 1,
      marginTop: 50

    }}>
       <Text>
        Please fucking reload when i save
       </Text>
                 <Text>
            product filter
        </Text>
        <View>
          <TextInput
          style={styles.input}
       
        />
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default ProductFilter