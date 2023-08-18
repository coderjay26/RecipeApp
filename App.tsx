/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeList from './components/RecipeList';
import AddRecipe from './components/AddRecipe';
import SQLite from "react-native-sqlite-storage";
import RecipeDetails from './components/RecipeDetails';
import UpdateRecipe from './components/UpdateRecipe';
const db = SQLite.openDatabase({name: 'recipe.db', location: 'default'})
const Stack = createNativeStackNavigator();

function App(){
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS eventtable (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, location TEXT, descriptions TEXT, image TEXT)',
      [],
      (tx, results) => {
        console.log('Table created successfully');
      },
      (error) => {
        console.log(`Error creating table: ${error}`);
      },
    );
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="My Event" component={RecipeList} />
      <Stack.Screen name="Add Event" component={AddRecipe} />
      <Stack.Screen name='Event' component={RecipeDetails}/>
      <Stack.Screen name='Update Event' component={UpdateRecipe}/>
      </Stack.Navigator>
</NavigationContainer>
)}



export default App;
