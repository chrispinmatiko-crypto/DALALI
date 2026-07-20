import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Href } from "expo-router";
import { OrcaLogo } from "@/components/auth/OrcaLogo";
import { GoogleIcon } from "@/components/auth/GoogleIcon";
import { LockIcon } from "@/components/auth/LockIcon";
import { Checkbox } from "@/components/auth/Checkbox";

export default function WelcomeScreen() {
  return (
    <View className="flex-1 bg-[#F5F5F5]">
      <SafeAreaView className="flex-1">
        {/* Contact us - top right */}
        <View className="flex-row justify-end px-6 pt-2">
          <TouchableOpacity>
            <Text className="text-sm font-medium text-[#1A5632]">Contact us</Text>
          </TouchableOpacity>
        </View>

        {/* Spacer */}
        <View className="flex-1" />

        {/* Logo + Brand */}
        <View className="items-center">
          <OrcaLogo />
          <Text className="text-[#1A5632] text-[38px] font-bold lowercase mt-3 tracking-tight">
            dalali
          </Text>
        </View>

        {/* Spacer */}
        <View className="flex-1" />

        {/* Buttons */}
        <View className="px-8 gap-4">
          {/* Continue with Google */}
          <TouchableOpacity
            className="flex-row items-center justify-center bg-[#1A5632] h-[54px] rounded-[18px]"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 10,
              elevation: 5,
            }}
          >
            <GoogleIcon />
            <Text className="text-[16px] font-medium text-white">
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Continue with Password */}
          <TouchableOpacity
            onPress={() => router.push("/login" as Href)}
            className="flex-row items-center justify-center bg-[#1A5632] h-[54px] rounded-[18px]"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 10,
              elevation: 5,
            }}
          >
            <LockIcon />
            <Text className="text-[16px] font-medium text-white">
              Continue with Password
            </Text>
          </TouchableOpacity>

          {/* Sign up */}
          <TouchableOpacity
            onPress={() => router.push("/signup" as Href)}
            className="flex-row items-center justify-center bg-[#1A5632] h-[54px] rounded-[18px]"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 10,
              elevation: 5,
            }}
          >
            <Text className="text-[16px] font-medium text-white">Sign up</Text>
          </TouchableOpacity>
        </View>

        {/* Legal */}
        <View className="px-10 mt-6 mb-6">
          <View className="flex-row items-start gap-2.5">
            <Checkbox checked />
            <Text className="text-[13px] text-[#333333] leading-5 flex-1 text-center">
              I confirm that I have read and agree to Dalali's{" "}
              <Text className="text-[#1A5632] font-semibold">Terms of Use</Text>{" "}
              and{" "}
              <Text className="text-[#1A5632] font-semibold">Privacy Policy</Text>.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
