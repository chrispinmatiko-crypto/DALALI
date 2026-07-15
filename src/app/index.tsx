import { Text, TouchableOpacity, View } from "react-native";

function OrcaLogo() {
  return (
    <View className="w-32 h-32 rounded-full bg-[#004B32] items-center justify-center">
      <Text className="text-white text-6xl font-bold lowercase">d</Text>
    </View>
  );
}

function GoogleIcon() {
  return (
    <View className="w-5 h-5 mr-3">
      <Text className="text-base font-bold">
        <Text className="text-[#4285F4]">G</Text>
      </Text>
    </View>
  );
}

function PadlockIcon() {
  return (
    <View className="w-5 h-5 mr-3 items-center justify-center">
      <Text className="text-white text-sm">🔒</Text>
    </View>
  );
}

function CheckmarkCircle() {
  return (
    <View className="w-4 h-4 rounded-full border border-gray-400 items-center justify-center shrink-0 mt-0.5">
      <Text className="text-[8px] text-gray-400">✓</Text>
    </View>
  );
}

export default function Index() {
  return (
    <View className="flex-1 bg-[#F8F9FA]">
      {/* Contact us - top right */}
      <View className="flex-row justify-end pt-14 pr-6">
        <TouchableOpacity>
          <Text className="text-sm text-gray-500 font-medium">Contact us</Text>
        </TouchableOpacity>
      </View>

      {/* Center: Logo + Brand */}
      <View className="flex-1 items-center justify-center -mt-20">
        <OrcaLogo />
        <Text className="text-[#004B32] text-3xl font-bold lowercase mt-4 tracking-tight">
          dalali
        </Text>
      </View>

      {/* Bottom: Buttons + Legal */}
      <View className="px-8 pb-12">
        <View className="gap-4 mb-8">
          {/* Google */}
          <TouchableOpacity className="flex-row items-center justify-center bg-white rounded-full py-4 shadow-sm border border-gray-100">
            <GoogleIcon />
            <Text className="text-[15px] font-medium text-gray-800">
              Continue with Google
            </Text>
          </TouchableOpacity>

          {/* Password */}
          <TouchableOpacity className="flex-row items-center justify-center bg-[#004B32] rounded-full py-4 shadow-sm">
            <PadlockIcon />
            <Text className="text-[15px] font-medium text-white">
              Continue with Password
            </Text>
          </TouchableOpacity>

          {/* Sign up */}
          <TouchableOpacity className="items-center justify-center py-3">
            <Text className="text-[15px] font-medium text-[#004B32]">
              Sign up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Legal */}
        <View className="flex-row items-start gap-2 px-1">
          <CheckmarkCircle />
          <Text className="text-[11px] text-gray-400 leading-5 flex-1">
            I confirm that I have read and agree to Dalali's{" "}
            <Text className="text-gray-600 font-medium">Terms of Use</Text> and{" "}
            <Text className="text-gray-600 font-medium">Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    </View>
  );
}
