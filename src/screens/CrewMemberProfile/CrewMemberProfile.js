import {BlurView} from '@react-native-community/blur';
import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Image, StyleSheet, Text, ImageBackground} from 'react-native';
import {Icon} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {useSafeAreaFrame} from 'react-native-safe-area-context';
import {COLORS} from '../../contants';
import {buildIMDBLink} from '../../services/actorService/actor.service';
import {getMovieImage} from '../../services/mainMovieService/main_movie.service';
import {useActorData} from './hooks/useActorData';
import {useActorMovies} from './hooks/useActorMoves';

const styles = StyleSheet.create({
  actorImage: {
    height: 300,
    width: 190,
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imgBackgroundContainer: {
    height: '100%',
    width: '100%',
  },
  header: {
    overflow: 'visible',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  nameTextContainer: {},
  crewName: {
    fontFamily: 'Bebas Neue',
    textAlign: 'center',
    color: COLORS.PRIMARY,
    lineHeight: 30,
    marginLeft: 10,
  },
  metricsItem: {
    alignItems: 'center',
    marginTop: 18,
    paddingHorizontal: 16,
  },
  subtitleText: {
    color: COLORS.PRIMARY,
    fontFamily: 'Bebas Neue',
    fontSize: 21,
  },
  title: {
    color: COLORS.PRIMARY,
    fontFamily: 'Bebas Neue',
    fontSize: 45,
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bioContainer: {
    paddingHorizontal: 16,
    marginTop: 22,
  },
  noBioBanner: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.BACKGROUND_PRIMARY_35,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noBioText: {
    marginTop: 3,
    marginLeft: 10,
  },
  bioText: {
    color: COLORS.PRIMARY,
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  scroll: {
    paddingBottom: 30,
  },
});

export const CrewMemberProfile = () => {
  const {params} = useRoute();
  const {width: windowWidth} = useSafeAreaFrame();
  const imageHeight = windowWidth / 1.2;
  const imageWidth = windowWidth / 1.8;
  const nameFontSize = 30;

  const {crew} = params;

  const {actorData} = useActorData(crew.id, !!crew);
  const {actorMoviesList} = useActorMovies(crew.id, !!crew);

  const openIMDB = async () => {
    const url = buildIMDBLink(actorData?.imdb_id);
    if (url) {
      await InAppBrowser.open(url, {
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: COLORS.BACKGROUND_PRIMARY,
        preferredControlTintColor: COLORS.PRIMARY,
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
      });
    }
  };

  return (
    <ImageBackground
      source={{uri: getMovieImage(crew.profile_path)}}
      style={styles.imgBackgroundContainer}>
      <BlurView
        style={styles.blurContainer}
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <View style={[styles.header]}>
          <Image
            source={{uri: getMovieImage(crew.profile_path)}}
            // resizeMode="cover"
            style={[
              styles.actorImage,
              {width: imageWidth, height: imageHeight},
            ]}
            resizeMode="cover"
            // resizeMethod="scale"
          />
          <View style={[styles.nameTextContainer, {width: nameFontSize}]}>
            <Text
              style={[
                styles.crewName,
                {
                  width: imageHeight,
                  fontSize: nameFontSize,
                  transform: [
                    {
                      translateX: -(imageHeight / 2 - nameFontSize / 2),
                    },
                    {
                      translateY: imageHeight / 2 - nameFontSize / 2,
                    },
                    {
                      rotate: '-90deg',
                    },
                  ],
                },
              ]}>
              {crew.name}
            </Text>
          </View>
        </View>
        <View style={styles.metrics}>
          <View style={styles.metricsItem}>
            <Text style={styles.subtitleText}>movies</Text>
            <Text style={styles.title}>{actorMoviesList?.cast?.length}</Text>
          </View>
          <View style={styles.metricsItem}>
            <Text style={styles.subtitleText}>Popularity</Text>
            <Text style={styles.title}>{actorData?.popularity}</Text>
          </View>
          <View style={styles.metricsItem}>
            <Text style={styles.subtitleText}>Imdb</Text>
            <Icon
              name="link"
              onPress={openIMDB}
              size={54}
              color={COLORS.PRIMARY}
            />
          </View>
        </View>
        <View style={styles.bioContainer}>
          {actorData?.biography ? (
            <View>
              <Text style={[styles.subtitleText]}>Biography:</Text>
              <Text style={styles.bioText}>{actorData.biography}</Text>
            </View>
          ) : (
            <View style={styles.noBioBanner}>
              <Icon name="error-outline" color={COLORS.PRIMARY} size={34} />
              <Text style={[styles.subtitleText, styles.noBioText]}>
                No biography available
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
