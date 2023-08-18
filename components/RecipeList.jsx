import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react'
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ToastAndroid, TextInput  } from "react-native";
import { FAB } from "react-native-paper";
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const db = openDatabase({name: 'recipe.db', location: 'default'});
function RecipeList() {
  const [searchRecipe, setSearchRecipe] = useState('');
  const [recipe, setRecipe] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = useCallback(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM eventtable WHERE name LIKE ?',
        [`%${searchRecipe}%`],
        (tx, results) => {
          const len = results.rows.length;
          const recipeList = [];
          for (let i = 0; i < len; i++) {
            const row = results.rows.item(i);
            recipeList.push({
              id: row.id.toString(),
              name: row.name,
              image: row.image,
              ingredients: row.location,
              instructions: row.descriptions,
            });
          }
          setRecipe(recipeList);
        },
        (error) => {
          console.log(`Error querying data: ${error}`);
        },
      );
    });
  }, [searchRecipe]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  useFocusEffect(
    React.useCallback(() => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM eventtable',
          [],
          (tx, results) => {
            const len = results.rows.length;
            const recipeList = [];
            for (let i = 0; i < len; i++) {
              const row = results.rows.item(i);
              recipeList.push({
                id: row.id.toString(),
                name: row.name,
                image: row.image,
                ingredients: row.location,
                instructions: row.descriptions,
              });
            }
            setRecipe(recipeList);
          },
          (error) => {
            console.log(`Error querying data: ${error}`);
          },
        );
      });
    }, [])
    );

  useLayoutEffect(() => {
    setRecipe(searchResult);
  }, [searchResult]);

  const handleDelete = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM eventtable WHERE id = ?',
        [id],
        () => {
          setRecipe(recipe.filter((item) => item.id !== id));
          ToastAndroid.show('Deleted Successfully', ToastAndroid.SHORT);
        },
        (error) => {
          alert('ERROR');
        },
      );
    });
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Event', { recipeList: item })}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.name}</Text>
          </View>
          <View style={styles.deleteContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Icon name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

    const navigation = useNavigation();
    return(
        <><View style={styles.container}>
        <FlatList
          data={recipe}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.container}
         />
         <TextInput placeholder='Search...' style={{borderTopWidth: .5, paddingHorizontal: 10}} value={searchRecipe} onChangeText={(text)=> {
    setSearchRecipe(text);
    handleSearch(); }}onSubmitEditing={handleSearch}/>
      </View>
      <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate('Add Event')} />
      
        </>
    );    

}
const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: '#FEB2B2',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        alignItems: 'center',
      },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 40,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    item: {
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    image: {
      width: 150,
      height: 100,
      marginRight: 20,
      borderRadius: 10,
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    deleteContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    title: {
      fontSize: 16,
    },
})
export default RecipeList;