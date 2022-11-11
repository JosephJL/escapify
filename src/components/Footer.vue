
<template>
  <MDBFooter bg="dark" :text="['center', 'white']">
    <!-- Grid container -->
    <MDBContainer class="p-4">
      <!--Grid row-->
      <MDBRow>
        <!--Grid column to fill up some empty space-->
        <MDBCol lg="1"> </MDBCol>
        <!-- Grid column -->
        <MDBCol lg="6" md="12" class="mb-4 mb-md-0">
          <h5 class="text-uppercase">About Us</h5>

          <p>
            Escapify is a destination planning website. Our goal is to bring a
            comprehensive travel platform where users can view all the
            destinations and accommodations in a single place easily and
            quickly. Escapify also hopes to build a close-knit community of
            travel enthusiasts.
          </p>
        </MDBCol>
        <!--Grid column-->

        <!--Grid column-->
        <MDBCol lg="5" md="12" class="mb-4 mb-md-0">
          <h5 class="text-uppercase">Stay in Touch</h5>

          <p>
            <img
              src="https://www.pngkey.com/png/full/235-2350076_gmw-host-clipart-library-people-icon-png-white.png"
              alt=""
              style="width: 20px"
            />
            Escapify Pte Ltd<br /><br />
            <img
              src="https://icon-library.com/images/facebook-icon-circle-png/facebook-icon-circle-png-3.jpg"
              alt=""
              style="width: 20px"
            />
            <a
              href="https://www.facebook.com"
              style="color: white; text-decoration: none"
            >
              Facebook</a
            >
            <br />
            <img
              src="https://icon-library.com/images/instagram-icon-logo/instagram-icon-logo-29.jpg"
              alt=""
              style="width: 30px"
            />
            <a
              href="https://www.instagram.com"
              style="color: white; text-decoration: none"
              >Instagram</a
            >
            <br />
            <br />
            <img
              src="https://icon-library.com/images/address-icon-white/address-icon-white-28.jpg"
              alt=""
              style="width: 25px"
            />
            80 Stamford Rd, Singapore 178902
            <br />
            <br />
            <strong
              >Have Questions?
              <a href="mailto:support@escapify.com" style="color: white"
                >Email us</a
              ></strong
            >
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

