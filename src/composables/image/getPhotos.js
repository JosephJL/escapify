import axios from "axios";
import { ref } from "vue";

const getPlacePhoto = () => {
  const photoRef = ref(null);
  const returnURl = ref(null);
  const imageLoading = ref(false);

  const load = async (placeName) => {
    console.log("inside getPlacePhoto composable with placename", placeName);
    const proxyUrl = "http://blooming-reaches-84388.herokuapp.com/";
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${placeName}&key=AIzaSyBv3FNyj-xBgcRGLDvyo_3u31XFROw13lY&inputtype=textquery&fields=name,photos`;
    await axios.get(url).then((response) => {
      console.log(response.data);
      const candidates = response.data.candidates;
      const candidate = candidates[0];
      photoRef.value = candidate.photos[0].photo_reference;
    });
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef.value}&key=AIzaSyBv3FNyj-xBgcRGLDvyo_3u31XFROw13lY&maxwidth=400&maxheight=400`;
    const imageURLQuery = await fetch(proxyUrl + photoUrl).then((response) =>
      response.blob()
    );
    console.log("queried image is ", imageURLQuery);
    returnURl.value = URL.createObjectURL(imageURLQuery);
    imageLoading.value = true;
  };

  return { imageLoading, returnURl, load };
};

export default getPlacePhoto;
