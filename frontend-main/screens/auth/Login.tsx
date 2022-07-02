import { Dispatch, FC, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  FormControl,
  Input,
  Icon,
  useToast,
  Text,
  Pressable,
} from "native-base";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  SafeAreaView,
  withSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  GantariBoldText,
  GantariMediumText,
} from "../../components/StyledText";
import { AuthStackScreenProps } from "../../types";
import size from "../../constants/Layout";
import CarouselIndicator from "../../components/CarouselIndicator";
import GoBack from "../../components/GoBack";
import { useGenerateOtp } from "../../components/Login/hook";

export default function LoginScreen({
  navigation,
}: AuthStackScreenProps<"Login">) {
  const [show, setShow] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [sentOtp, setSentOtp] = useState(false);
  const [time, setTime] = useState(0);

  const { generateOtp, verifyOtp } = useGenerateOtp();
  const toast = useToast();

  const handleGoBack = () => {
    navigation.pop();
  };

  const handleGetOtp = () => {
    if (phoneInput.length != 10) {
      toast.show({
        description: "Enter a valid phone number!",
      });
      return;
    }

    generateOtp({ phone: phoneInput, setSentOtp });
  };

  const handleVerifyOtp = () => {
    if (otpInput.length <= 0) {
      toast.show({
        description: "Enter a valid OTP!",
      });
      return;
    }

    verifyOtp({
      phone: phoneInput,
      otp: otpInput,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <GoBack handler={handleGoBack} />
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View style={styles.textContent}>
          <Fixedtext />
          <Form
            handleGetOtp={handleGetOtp}
            phoneInput={phoneInput}
            sentOtp={sentOtp}
            setPhoneInput={setPhoneInput}
            setShow={setShow}
            show={show}
            time={time}
            otpInput={otpInput}
            setOtpInput={setOtpInput}
          />
        </View>
        {sentOtp && (
          <Button
            variant="solid"
            bg="white"
            textAlign="center"
            _text={{ color: "black" }}
            w="100%"
            p={4}
            borderRadius="xl"
            onPress={handleVerifyOtp}
          >
            <GantariBoldText style={{ fontSize: 20 }}>Sign In</GantariBoldText>
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
}

const Fixedtext: FC = () => {
  return (
    <>
      <GantariBoldText style={[styles.text, styles.textPrimary]}>
        Let's sign you in.
      </GantariBoldText>
      <GantariMediumText style={[styles.text, styles.textSecondary]}>
        Welcome back.
      </GantariMediumText>
      <GantariMediumText style={[styles.text, styles.textSecondary]}>
        You've been missed!
      </GantariMediumText>
    </>
  );
};

interface IFormProps {
  phoneInput: string;
  setPhoneInput: Dispatch<SetStateAction<string>>;
  sentOtp: boolean;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  handleGetOtp: () => void;
  time: number;
  otpInput: string;
  setOtpInput: Dispatch<SetStateAction<string>>;
}

const Form: FC<IFormProps> = ({
  setPhoneInput,
  phoneInput,
  sentOtp,
  setShow,
  show,
  handleGetOtp,
  time,
  otpInput,
  setOtpInput,
}) => {
  return (
    <FormControl mt={20}>
      <Input
        placeholder="Phone"
        width="100%"
        borderRadius="xl"
        fontFamily={"gantari-medium"}
        fontSize={15}
        p={5}
        mb={5}
        bg="trueGray.900"
        color="white"
        isRequired
        onChangeText={setPhoneInput}
        value={phoneInput}
      />
      {sentOtp ? (
        <>
          <Input
            width="100%"
            type={show ? "text" : "password"}
            borderRadius="xl"
            fontFamily={"gantari-medium"}
            fontSize={15}
            p={5}
            bg="trueGray.900"
            color="white"
            autoComplete="sms-otp"
            textContentType="oneTimeCode"
            onChangeText={setOtpInput}
            value={otpInput}
            InputRightElement={
              <Icon
                as={
                  <MaterialIcons
                    name={show ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
                onPress={() => setShow(!show)}
              />
            }
            placeholder="Enter OTP"
          />
          <Pressable>
            <Text color="white" textAlign="right" mt={1} mr={2}>
              {`resend otp in ${time}s`}
            </Text>
          </Pressable>
        </>
      ) : (
        <Button
          variant="solid"
          bg="white"
          textAlign="center"
          _text={{ color: "black" }}
          w="100%"
          p={4}
          borderRadius="xl"
          onPress={handleGetOtp}
        >
          <GantariBoldText style={{ fontSize: 20 }}>Get OTP</GantariBoldText>
        </Button>
      )}
    </FormControl>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#18171f",
  },
  textContent: {
    width: "100%",
    marginTop: 20,
    alignItems: "flex-start",
  },
  text: {
    textAlign: "left",
    fontSize: 35,
    lineHeight: 40,
  },
  textPrimary: {
    color: "white",
  },
  textSecondary: {
    color: "#9e9d9d",
  },
  backmute: {
    backgroundColor: "#212024",
  },
});
