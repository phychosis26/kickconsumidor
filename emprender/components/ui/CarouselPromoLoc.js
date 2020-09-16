import React from "react";
import { ActivityIndicator } from "react-native";
import { Image } from "react-native-elements";
import Carousel from "react-native-snap-carousel";

export default function CarouselPromoLoc(props) {
  const { arrayImages, height, width } = props;

  const renderItem = ({ item }) => {
    return (
      <Image
        style={{ width, height }}
        resizeMode="stretch"
        PlaceholderContent={<ActivityIndicator color="fff" />}
        source={{ uri: item }}
      />
    );
  };

  return (
    <Carousel
      layout={"default"}
      data={arrayImages}
      sliderWidth={width}
      itemWidth={width}
      renderItem={renderItem}
    />
  );
}
