import { useToast } from "native-base";
import { Dispatch, SetStateAction } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types";

export const useGenerateOtp = () => {
  const toast = useToast();

  const generateOtp = ({
    phone,
    setSentOtp,
  }: {
    phone: string;
    setSentOtp: Dispatch<SetStateAction<boolean>>;
  }) => {
    const payload = {
      phone_number: phone,
    };

    (async () => {
      const ac = new AbortController();
      const { signal } = ac;

      try {
        // eslint-disable-next-line no-undef
        const response = await fetch(
          `http://192.168.2.34:8000/api/auth/otp_login_send`,
          {
            signal,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        console.log(response.status);

        const json = await response.json();

        if (response.status === 200) setSentOtp(true);
      } catch (e) {
        toast.show({
          description: "we will be right back!",
        });
        console.log(e);
      }
    })();
  };

  const verifyOtp = ({
    phone,
    otp,
    navigation,
  }: {
    phone: string;
    otp: string;
    navigation: NativeStackNavigationProp<
      AuthStackParamList,
      "Login",
      undefined
    >;
  }) => {
    const payload = {
      phone_number: phone,
      verification_code: otp,
    };

    (async () => {
      const ac = new AbortController();
      const { signal } = ac;

      try {
        // eslint-disable-next-line no-undef
        const response = await fetch(
          `http://192.168.2.34:8000/api/auth/otp_login_verify`,
          {
            signal,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        const json = await response.json();

        if (json.misc.name == null) {
          navigation.navigate("Regis");
        }
      } catch (e) {
        console.log(e);
      }
    })();
  };

  return { generateOtp, verifyOtp };
};

export const useRegisterUser = () => {
  const submitUserDetails = ({
    name,
    age,
    ephone,
    address,
    pIll,
    pMed,
    allTo,
    navigation,
  }: {
    name: string;
    age: string;
    ephone: string;
    address: string;
    pIll: string;
    pMed: string;
    allTo: string;
    navigation: NativeStackNavigationProp<
      AuthStackParamList,
      "Login",
      undefined
    >;
  }) => {
    const payload = {
      name,
      age,
      emergency_phone_number: ephone,
      address,
      past_illness: pIll,
      past_medication: pMed,
      allergic_to: allTo,
    };

    (async () => {
      const ac = new AbortController();
      const { signal } = ac;

      try {
        // eslint-disable-next-line no-undef
        const response = await fetch(
          `http://192.168.2.34:8000/api/auth/otp_login_verify`,
          {
            signal,
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        const json = await response.json();

        if (json.misc.name == null) {
          navigation.navigate("Regis");
        }
      } catch (e) {
        console.log(e);
      }
    })();
  };

  return { submitUserDetails };
};
