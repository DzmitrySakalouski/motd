import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Image, StyleSheet, Text, ImageBackground} from 'react-native';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {COLORS} from '../../contants';
import {getMovieImage} from '../../services/mainMovieService/main_movie.service';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    paddingHorizontal: 16,
  },
  actorImage: {
    borderRadius: 10,
  },
  imageBg: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY_75,
    flex: 1,
    // position: 'relative'
    zIndex: 0,
  },
  shadow: {
    shadowColor: '#fff',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 14,

    elevation: 10,
  },
  crewName: {
    color: COLORS.PRIMARY,
    fontFamily: 'Bebas Neue',
    fontSize: 30,
    height: 40,
    textAlign: 'center',
  },

  pageItem: {
    flex: 0.5,
    overflow: 'visible',
    backgroundColor: COLORS.BACKGROUND_PRIMARY_75,
  },
  header: {
    bottom: -100,
    position: 'absolute',
    zIndex: 100,
  },
});

export const CrewMemberProfile = () => {
  const {params} = useRoute();
  const {width: windowWidth, height: windowHeight} = useSafeAreaFrame();
  const imageHeight = windowWidth / 1.5;
  const imageWidth = windowWidth / 2;

  const {crew} = params;

  return (
    <View style={{flex: 1, backgroundColor: COLORS.BACKGROUND_PRIMARY}}>
      <ImageBackground
        source={{uri: getMovieImage(crew.profile_path)}}
        width={windowWidth}
        height={windowHeight / 2}
        style={styles.pageItem}>
        {/* <View style={styles.imageBg}> */}
        <View
          style={[
            styles.shadow,
            styles.header,
            //   {marginTop: windowHeight * 0.14},
          ]}>
          <Image
            source={{uri: getMovieImage(crew.profile_path)}}
            resizeMode="cover"
            style={[
              styles.actorImage,
              styles.shadow,
              {height: imageHeight, width: imageWidth},
            ]}
          />
          <View>
            <Text style={[styles.crewName]}>{crew.name}</Text>
          </View>
        </View>
        {/* </View> */}
      </ImageBackground>
      <View style={[styles.container, styles.pageItem]} />
    </View>
  );
};
