import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
function RecipeDetails({route}){
    const { recipeList } = route.params;
    const navigation = useNavigation();
return(
    <><View style={styles.imagecontainer}>
    <Image style={styles.image} source={{uri: recipeList.image}} />
         </View>
         <View style={styles.container}>
                 <Text style={styles.name}>{recipeList.name}</Text>
                 <Text style={styles.head}>Location:</Text>
                 <Text style={styles.description}>{recipeList.ingredients}</Text>
                 <Text style={styles.head}>Descriptions:</Text>
                 <Text style={styles.description}>{recipeList.instructions}</Text>
             </View>
             <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Update Event', { recipeList: recipeList })}>
               <Text style={styles.buttonText}>Update Event</Text>
               </TouchableOpacity>
               </>
);
}
const styles = StyleSheet.create({
    imagecontainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  image: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7cc',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    backgroundColor: '#31ce97',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  head:{
    fontWeight: 'bold',
    marginBottom: 5
  }
});
export default RecipeDetails;