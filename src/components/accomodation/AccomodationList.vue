<template>
    <div>
        <!-- <h1>This is accomodation list</h1> -->
    </div>
</template>


<script>

export default{
    props:{
        hotelList: Object,
    },
    setup(props){
        console.log(props.hotelList)
    }
}

</script>