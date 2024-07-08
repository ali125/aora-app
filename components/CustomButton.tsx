import React from "react";
import { TouchableOpacity, Text } from "react-native";

type Props = {
  title: string;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
  handlePress?: () => void;
};

const CustomButton: React.FC<Props> = ({
  title,
  containerStyles,
  textStyles,
  isLoading,
  handlePress,
}) => {
  return (
    <TouchableOpacity
      className={`bg-secondary-100 rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
      onPress={handlePress}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
