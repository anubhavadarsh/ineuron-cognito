import { FC, SetStateAction, Dispatch, useState } from "react";

import { AuthStackScreenProps } from "../../types";
import {
  Text,
  useSafeArea,
  Box,
  Input,
  Container,
  FormControl,
  Button,
  useToast,
  Stack,
  ScrollView,
} from "native-base";
import { GantariBoldText } from "../../components/StyledText";
import BannerText from "../../components/BannerText";
import GoBack from "../../components/GoBack";
import { useRegisterUser } from "../../components/Login/hook";

export default function RegisScreen({
  navigation,
}: AuthStackScreenProps<"Regis">) {
  const [nameInput, setNameInput] = useState("");
  const [ephoneInput, setEphoneInput] = useState("");
  const [bloodGrp, setBloodGrp] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [pMedInput, setPMedInput] = useState("");
  const [pIllInput, setPIllInput] = useState("");
  const [allerInput, setAllerInput] = useState("");

  const [step, setStep] = useState(1);

  const { submitUserDetails } = useRegisterUser();

  const toast = useToast();

  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
    pt: 2,
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleFormSubmit = () => {
    toast.show({
      description: "hi",
    });
  };

  let content = null;

  switch (step) {
    case 1:
      content = (
        <>
          <Container mt={3}>
            <BannerText
              pText="Hello,"
              s1Text="Why don't you"
              s2Text="tell us your name?"
            />
          </Container>
          <FormControl flex={1} justifyContent="center">
            <CustomInput
              isRequired
              onChangeText={setNameInput}
              placeholder="Tom Shaw"
              text={nameInput}
            />
            <CustomBtn
              text="Next"
              onPress={() => {
                if (nameInput.length <= 0) {
                  toast.show({
                    description: "Enter a valid name!",
                  });
                  return;
                }

                nextStep();
              }}
            />
          </FormControl>
        </>
      );
      break;
    case 2:
      content = (
        <>
          <Container mt={3}>
            <BannerText
              pText="Hello,"
              s1Text={nameInput}
              s2Text="Tell us more..."
            />
          </Container>
          <FormControl flex={1} justifyContent="center">
            <FormControl.Label pl={2}>Emergency phone</FormControl.Label>
            <CustomInput
              isRequired
              onChangeText={setEphoneInput}
              placeholder="9876543210"
              text={ephoneInput}
            />
            <Stack
              mt="1"
              direction={{
                base: "row",
              }}
              alignItems={{
                base: "flex-start",
              }}
              justifyContent={{
                base: "space-between",
              }}
            >
              <FormControl w="40%">
                <FormControl.Label pl={2}>Blood Group</FormControl.Label>
                <CustomInput
                  isRequired
                  onChangeText={setBloodGrp}
                  placeholder="B+"
                  text={bloodGrp}
                />
              </FormControl>
              <FormControl w="40%">
                <FormControl.Label pl={2}>Age</FormControl.Label>
                <CustomInput
                  isRequired
                  onChangeText={setAge}
                  placeholder="18"
                  text={age}
                />
              </FormControl>
            </Stack>
            <CustomBtn
              mt={5}
              text="Next"
              onPress={() => {
                if (
                  ephoneInput.length <= 0 ||
                  age.length <= 0 ||
                  age.length <= 0
                ) {
                  toast.show({
                    description: "Enter a valid details!",
                  });
                  return;
                }

                nextStep();
              }}
            />
          </FormControl>
        </>
      );
      break;
    case 3:
      content = (
        <>
          <Container mt={3}>
            <BannerText
              pText="Hello,"
              s1Text={nameInput}
              s2Text="Where do you live?"
            />
          </Container>
          <FormControl flex={1} justifyContent="center">
            <FormControl.Label pl={2}>Address</FormControl.Label>
            <CustomInput
              isRequired
              onChangeText={setAddress}
              placeholder="your address"
              text={address}
            />
            <CustomBtn
              mt={5}
              text="Next"
              onPress={() => {
                if (
                  ephoneInput.length <= 0 ||
                  age.length <= 0 ||
                  age.length <= 0
                ) {
                  toast.show({
                    description: "Enter a valid details!",
                  });
                  return;
                }

                nextStep();
              }}
            />
          </FormControl>
        </>
      );
      break;
    case 4:
      content = (
        <>
          <Container mt={3}>
            <BannerText
              pText="Hello,"
              s1Text={nameInput}
              s2Text="Almost there..."
            />
          </Container>
          <FormControl flex={1} justifyContent="center">
            <FormControl.Label pl={2}>Past Medications</FormControl.Label>
            <CustomInput
              isRequired
              onChangeText={setPMedInput}
              placeholder="your medicines"
              text={pMedInput}
            />
            <FormControl.Label pl={2}>Past Illess</FormControl.Label>
            <CustomInput
              isRequired
              onChangeText={setPIllInput}
              placeholder="your medical history"
              text={pIllInput}
            />
            <FormControl.Label pl={2}>Allergies</FormControl.Label>
            <CustomInput
              isRequired
              onChangeText={setAllerInput}
              placeholder="your allergies"
              text={allerInput}
            />
            <CustomBtn mt={5} text="Submit" onPress={handleFormSubmit} />
          </FormControl>
        </>
      );
  }

  return (
    <Box flex={1} pb={2} px={5} bg="gray.900" {...safeAreaProps}>
      <GoBack handler={step > 1 ? prevStep : () => {}} show={step > 1} />
      <ScrollView>{content}</ScrollView>
    </Box>
  );
}

interface ICustomInputProps {
  isRequired: boolean;
  onChangeText: Dispatch<SetStateAction<string>>;
  text: string;
  placeholder: string;
}

export const CustomInput: FC<ICustomInputProps> = ({
  isRequired,
  onChangeText,
  text,
  placeholder,
}) => {
  return (
    <Input
      placeholder={placeholder}
      width="100%"
      borderRadius="xl"
      fontFamily={"gantari-medium"}
      fontSize={15}
      p={5}
      mb={5}
      bg="trueGray.900"
      color="white"
      isRequired={isRequired}
      onChangeText={onChangeText}
      value={text}
    />
  );
};

interface ICustomBtnProps {
  text: string;
  onPress: () => void;
  mt?: string | number;
}

export const CustomBtn: FC<ICustomBtnProps> = ({ text, onPress, mt }) => {
  return (
    <Button
      variant="solid"
      bg="white"
      textAlign="center"
      _text={{ color: "black" }}
      w="100%"
      p={4}
      borderRadius="xl"
      onPress={onPress}
      mt={mt}
    >
      <GantariBoldText style={{ fontSize: 20, color: "black" }}>
        {text}
      </GantariBoldText>
    </Button>
  );
};

CustomBtn.defaultProps = {
  mt: 0,
};
