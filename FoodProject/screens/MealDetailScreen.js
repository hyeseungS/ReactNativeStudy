// import { useContext } from "react";
import { useLayoutEffect } from "react";
import { View, Image, Text, StyleSheet, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import IconButton from "../components/IconButton";
import List from "../components/MealDetail/List";
import SubTitle from "../components/MealDetail/SubTitle";
import MealDetails from "../components/MealDetails";
import { MEALS } from '../data/dummy-data';
import { addFavorite, removeFavorite } from '../store/redux/favorites';
// import { FavoritesContext } from "../store/context/favorites-context";

function MealDetailScreen({ route, navigation }) {
    // const favoriteMealsCtx = useContext(FavoritesContext);
    const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
    const dispatch = useDispatch();

    const mealId = route.params.mealId;

    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    // const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);
    const mealIsFavorite = favoriteMealIds.includes(mealId);

    function changeFavoriteStatusHandler() {
        if(mealIsFavorite) {
            // favoriteMealsCtx.removeFavorite(mealId);
            dispatch(removeFavorite({ id: mealId }));
        } else {
            // favoriteMealsCtx.addFavorite(mealId);
            dispatch(addFavorite({ id: mealId }));
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <IconButton 
                        icon={mealIsFavorite ? 'star' : 'star-outline'} 
                        color="white" 
                        onPress={changeFavoriteStatusHandler} 
                    />
                );
            }
        });
    }, [navigation, changeFavoriteStatusHandler]);

    return (
        <ScrollView style={styles.rootContainer}>
            <Image style={styles.image} source={{uri: selectedMeal.imageUrl}} />
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails 
                duration={selectedMeal.duration} 
                complexity={selectedMeal.complexity} 
                affordability={selectedMeal.affordability}
                textStyle={styles.detailText} 
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <SubTitle>Ingredients</SubTitle>
                    <List data={selectedMeal.ingredients} />
                    <SubTitle>Steps</SubTitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>
        </ScrollView>
    );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32
    },
    image: {
        width: '100%',
        height: 350
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'
    },
    detailText: {
        color: 'white'
    },
    listOuterContainer: {
        alignItems: 'center'
    },
    listContainer: {
        width: '80%'
    }
});