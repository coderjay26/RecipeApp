import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
var ImagePicker = require('react-native-image-picker');
import { openDatabase } from 'react-native-sqlite-storage';
import { setRecipe } from './RecipeList'
const db = openDatabase({name: 'recipe.db', location: 'default'});

const UpdateRecipe = ({ route }) => {
    const { recipeList } = route.params;
    const navigation = useNavigation();
    const [name, setName] =useState(recipeList.name);
    const [ingredients, setIngredients] = useState(recipeList.ingredients);
    const [instructions, setInstructions] = useState(recipeList.instructions);
    const [image, setImage] = useState(recipeList.image);
    const [id, setId] = useState(recipeList.id)
    const handleUpdate = () => {

      const updatedRecipe = {
        id: recipeList.id,
        name: name,
        image: image,
        ingredients: ingredients,
        instructions: instructions,
      };
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE eventtable SET name = ?, location = ?, descriptions = ?, image = ? WHERE id = ?',
                [name, ingredients, instructions, image, id],
                (tx, result) =>{
                    console.log("Event Update");
                    navigation.navigate('My Event', { recipeList: updatedRecipe });
                },
                (error) => {
                    console.log('Error')
                }   
            )
        });
    };
    const handleChooseImage = () => {
        ImagePicker.launchCamera({}, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            setImage(response.assets[0].uri);
            console.log(response.assets[0].uri)
          }
        });
      };

  return (
    <><View style={styles.container}>
          <Text style={styles.title}>Update Event</Text>
          <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={text => setName(text)} />
          <TextInput
              style={[styles.input]}
              placeholder="Location"
              value={ingredients}
              onChangeText={text => setIngredients(text)}
           />

          <TextInput
              style={[styles.input, { height: 120 }]}
              placeholder="Instructions"
              value={instructions}
              onChangeText={text => setInstructions(text)}
              multiline
              textAlignVertical="top" />

          {image && (
              <Image
                  source={{ uri: image }}
                  style={styles.image} />

          )}
      </View><TouchableOpacity style={styles.addPhoto} onPress={handleChooseImage}>
              <Text style={{ color: '#fff' }}>Choose Image</Text>
          </TouchableOpacity><TouchableOpacity title="Update" style={styles.button} onPress={handleUpdate}>
              <Text style={{ color: '#fff' }}>Update</Text>
          </TouchableOpacity></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    alignSelf: 'center'
  },
  addPhoto:{
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#f4511e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#31ce97',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  }
});

export default UpdateRecipe;
