import { images } from "@/constants";
import React from "react";
import { View, Text, Image } from "react-native";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

type Props = {
  title: string;
  subtitle: string;
};

const EmptyState: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl font-psemibold text-center text-white">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100 mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title="Create video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};

export default EmptyState;
