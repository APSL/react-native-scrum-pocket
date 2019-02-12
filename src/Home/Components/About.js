/* @flow */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../Common/Colors';

// TODO: Fill section with proper details
const About = () => (
  <View style={styles.container}>
    <Text style={styles.text}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mattis lacinia
      justo ut porttitor. Vestibulum dictum est id lorem consequat, sit amet maximus
      dolor commodo. Vivamus ornare dolor et tortor euismod, eu venenatis mauris
      bibendum. Phasellus venenatis, nulla eget faucibus dignissim, metus ante
      elementum magna, et condimentum urna ligula vitae nulla. Etiam cursus
      imperdiet urna, vel pretium velit tempus nec. Suspendisse varius maximus sem,
      eu tristique massa lacinia id. Suspendisse finibus porta nibh maximus
      ultricies. Fusce et velit in lorem lobortis scelerisque sit amet sed velit. In
      semper turpis magna, eget tempus quam placerat eget. Nulla in rhoncus tellus,
      ac vehicula lectus. Aliquam quis purus sed mauris fermentum vulputate. Aliquam
      massa metus, tincidunt vitae mauris at, volutpat blandit tellus. Proin sed
      nibh eu urna placerat egestas. Morbi ullamcorper cursus tortor, vitae
      malesuada elit consequat lobortis. Curabitur vitae commodo mauris, in
      convallis enim. Cras hendrerit diam ut enim volutpat, mattis pulvinar justo
      mollis. In dapibus, arcu nec sollicitudin eleifend, lacus enim bibendum nunc,
      sit amet blandit felis nisl a magna. Aliquam in molestie eros, convallis
      cursus urna. Praesent imperdiet lacinia arcu et pulvinar. Duis quis volutpat
      leo, ac aliquet dui. Sed et sagittis elit. Cras vestibulum nisi nisl, sit amet
      tincidunt turpis efficitur a.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  text: {
    color: Colors.White,
  },
});

export default About;
