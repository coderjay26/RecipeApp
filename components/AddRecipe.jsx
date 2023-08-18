import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
var ImagePicker = require('react-native-image-picker');
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({name: 'recipe.db', location: 'default'});

const AddRecipe = ({ addRecipe }) => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [image, setImage] = useState(null);
  
    const handleSubmit = () => {
      const recipe = { name, ingredients, instructions, image };
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO eventtable (name, location, descriptions, image) VALUES (?, ?, ?, ?)',
                [name, ingredients, instructions, image],
                (tx, result) =>{
                    console.log("Recipe Save");
                },
                (error) => {
                    console.log('Error')
                }
            )
        });
      setName('');
      setIngredients('');
      setInstructions('');
      setImage(null);
      navigation.navigate('My Event')
    };
    const handleChooseImage = () => {
        ImagePicker.launchImageLibrary({}, response => {
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
          <Text style={styles.title}>Add Event</Text>
          <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={text => setName(text)} />
          <TextInput
              style={[styles.input]}
              placeholder="Location"
              value={ingredients}
              onChangeText={text => setIngredients(text)} />

          <TextInput
              style={[styles.input, { height: 120 }]}
              placeholder="Description"
              value={instructions}
              onChangeText={text => setInstructions(text)}
              multiline
              textAlignVertical="top" />

          {image && (
              <Image
                  source={{ uri: image }}
                  style={styles.image} />

          )}

      </View>
      <TouchableOpacity style={styles.addPhoto} onPress={handleChooseImage}>
              <Text>Choose Image</Text>
          </TouchableOpacity>
          <TouchableOpacity title="Add" onPress={handleSubmit} style={styles.button}>

              <Text style={{ color: '#fff' }}>Add</Text> 
              </TouchableOpacity>
              </>
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

export default AddRecipe;
