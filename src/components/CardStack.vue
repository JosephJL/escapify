<script>

import { computed } from 'vue' 
export default {

    props : {
        matched :{
            type : Boolean,
            default: false
        },
        position:{
            type: Number,
            required: true
        },
        value: {
            type: Number,
            required: true
        },

        visible:{
            type: Boolean,
            default:false
        }

    },

    setup(props, context) {
    const flippedStyles = computed(() => {
      if (props.visible) {
        return 'is-flipped'
      }
    })

    
        const selectCard = () =>{
            context.emit('select-card',{
                position: props.position,
                faceValue: props.value

            })

        }

        return{
            flippedStyles,
            selectCard
        }
    }
    
}
</script>

<template>

<div class="card" :class="flippedStyles" @click="selectCard"> 

    <div v-if="visible" class="card-face is-front">
        {{ value }} - {{ position }}
    </div>

    <div v-else class="card-face is-back">
        Back
    </div>

</div>
    
</template>

<style>

.card{
  border: 5px solid #1467af;
  position: relative;
  transition: 0.5s transform ease-in;
  transform-style: preserve-3d;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card-face{
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
}

.card-face.is-front{
    background-color: whitesmoke ;
    color: #0f4c81;
    transform: rotateY(180deg);
}

.card-face.is-back{
    background-color: #0f4c81 ;
    color: whitesmoke;
}

.card-image {
  max-width: 100%;
}

.icon-checkmark {
  position: absolute;
  right: 5px;
  bottom: 5px;
}

</style>