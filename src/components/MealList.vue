<template>
  <div>Meal List here</div>
  <div v-for="meal in meals" :key="meal.id">
    {{meal.id}}
    {{meal.image}}
    <img :src="meal.image" alt="">
    {{meal.title}}
  </div>
  
</template>

<script>
export default {
    props:{
        mealList:Object,
    },
    setup(props){
        console.log("data in Meal list",props.mealList)
        console.log(props.mealList)

        const meals = props.mealList

        return {meals}
    }

}
</script>

<style>

</style>