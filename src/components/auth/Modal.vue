<template>
    <!-- <div class="modal">
        <h1>HELLO HELLO</h1>
        <div v-show="modalActive" class="modal-inner">
            {{modalActive}}
            <h1>Hello hello hello</h1>
            <button type="button" class="btn-close" aria-label="Close"/>
            <slot></slot>
        </div>
    </div> -->
    <div v-show="toggleModal" class="modal-inner">
        <div>
            <h2>toggleModal is {{toggleModal}}</h2>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        toggleModal: Boolean
        },
    setup(props) {
        console.log("In Modal, modalActive is", props.toggleModal)
    },
}
</script>