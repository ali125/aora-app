import React from "react";
import { View, Text, FlatList } from "react-native";

type Props = {
  posts: any[];
};

const Trending: React.FC<Props> = ({ posts }) => {
  return (
    <FlatList
      horizontal
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text className="text-2xl text-white">{item.id}</Text>
      )}
    />
  );
};

export default Trending;
