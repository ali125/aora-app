import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardTypeOptions,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";

type Props = {
  title: string;
  placeholder?: string;
  otherStyles: string;
  keyboardType?: KeyboardTypeOptions;
  value: string;
  handleChangeText: (text: string) => void;
};

const FormField: React.FC<Props> = ({
  title,
  handleChangeText,
  otherStyles,
  value,
  placeholder,
  keyboardType,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          keyboardType={keyboardType}
          secureTextEntry={title.toLowerCase() === "password" && !showPassword}
        />
        {title.toLowerCase() === "password" && (
          <TouchableOpacity onPress={() => setShowPassword((sp) => !sp)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-7"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
