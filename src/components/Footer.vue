
<template>
  <MDBFooter bg="dark" :text="['center', 'white']">
    <!-- Grid container -->
    <MDBContainer class="p-4">
      <!--Grid row-->
      <MDBRow>
        <!--Grid column-->
        <MDBCol lg="8" md="12" class="mb-4 mb-md-0">
          <h5 class="text-uppercase">About Us</h5>

          <p>
            Escapify is a destination planning website. Our goal is to bring a comprehensive travel platform where users can view all the destinations and accommodations in a single place easily and quickly. Escapify also hopes to build a close-knit community of travel enthusiasts.
          </p>
        </MDBCol>
        <!--Grid column-->

        <!--Grid column-->
        <MDBCol lg="4" md="12" class="mb-4 mb-md-0">
          <h5 class="text-uppercase">Contact Us</h5>

          <p>
            Escapify Pte Ltd<br>
            80 Stamford Rd, Singapore 178902<br>
            <br>
            <strong>Have Questions? Email us <a href="mailto:support@escapify.com">here</a></strong>
          </p>
        </MDBCol>
        <!--Grid column-->
      </MDBRow>
      <!--Grid row-->
    </MDBContainer>
    <!-- Grid container -->
    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
      © 2022 Copyright:
      <a class="text-white" href="https://frontend-eta-coral.vercel.app/"
        >Escapify</a
      >
    </div>
    <!-- Copyright -->
  </MDBFooter>
</template>

<script>
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
} from "mdb-vue-ui-kit";

export default {
  components: { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon },
};
</script>

