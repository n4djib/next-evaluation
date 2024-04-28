import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";

type SignOption = {
  expiresIn: string | number;
};

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "30m",
};

export function signJwt(
  payload: JwtPayload,
  option: SignOption = DEFAULT_SIGN_OPTION
) {
  const secretKey = process.env.JWT_USER_ID_SECRET;
  try {
    const token = jwt.sign(payload, secretKey, option);
    return token;
  } catch (error) {
    console.log("error in signJwt");
  }
  return null;
}

// type VerifyTokenFunc = (
//   token: string
// ) => JwtPayload | null | "TokenExpiredError" | "JsonWebTokenError";

type VerifyTokenFunc = (token: string) => JwtPayload | null;

export const verifyJwt: VerifyTokenFunc = (token: string) => {
  const secretKey = process.env.JWT_USER_ID_SECRET;
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded as JwtPayload;
  } catch (error) {
    console.log("error in verifyJwt");
    // if (error instanceof TokenExpiredError) {
    //   // return error.name;
    //   return "TokenExpiredError";
    // } else if (error instanceof JsonWebTokenError) {
    //   // return error.name;
    //   return "JsonWebTokenError";
    // }
    return null;
  }
};
