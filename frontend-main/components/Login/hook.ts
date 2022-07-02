import { Dispatch, SetStateAction } from "react";

export const useGenerateOtp = () => {
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

        const json = await response.json();

        if (response.status === 200) setSentOtp(true);
      } catch (e) {
        console.log(e);
      }
    })();
  };

  const verifyOtp = ({ phone, otp }: { phone: string; otp: string }) => {
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

        console.log(json);
      } catch (e) {
        console.log(e);
      }
    })();
  };

  return { generateOtp, verifyOtp };
};
