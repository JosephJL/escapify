<template>
    <div>
        <form @submit="handleSubmit">
            <div class="">
                <span>Input your ingredients here!</span>
                <input type="text" v-model="ingredient">
                <span :key="ingredient.value" v-for="ingredient in ingredients">
                    {{ingredient}} &nbsp; <button>Remove</button>
                </span>
                <input type="submit">
            </div>
        </form>
        <button @click="findRecipes">Find Recipes</button>
        <!-- {{error}} -->
        <div v-if="mealData">
            <MealList :mealList="mealData" />
        </div>
    </div>
</template>

<script>
import MealList from './MealList.vue'
import {ref} from 'vue'

export default {
    components:{
        MealList,
    },
    setup(props,context) {

        //Adding ingredients to list
        const ingredient = ref("")
        const ingredients = ref([])

        const handleSubmit = (e) => {
            e.preventDefault()
            if (!ingredient.value){
                alert('Please add an ingredient')
            }
            else if (!ingredients.value.includes(ingredient.value)){
                console.log(ingredient.value)
                ingredients.value.push(ingredient.value) 
                console.log(ingredients.value) 
            }
            ingredient.value = ""
        }

        //Finding Search Result
        const error = ref("")
        const mealData = ref(false)     
        const findRecipes = async() => {
            mealData.value = false
            console.log(ingredients.value)
            const ingredientString = ingredients.value.join(",+")
            console.log("Ingredient string is ", ingredientString)
            fetch(
                'https://api.spoonacular.com/recipes/findByIngredients?apiKey=ab23cd2d91114a19a132100a48c84990&ingredients=' + ingredientString + '&number=2'
                )
                .then((response) => response.json())
                .then((data) => {
                    mealData.value = data
                    console.log("response is",mealData.value)
                })
                .catch((err) => {
                    error = err.message
                })
        }
        // const mealData = ref(false)
        // const findRecipes = () => {
        //     mealData.value = {'id':'bob','age':21}
        // }

        return {findRecipes,mealData,handleSubmit,ingredients,ingredient}

    }

}
</script>

<style>

</style>