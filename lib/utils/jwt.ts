import jwt from "jsonwebtoken";

function generateToken<Payload extends object>(data: Payload): string {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h", algorithm: "HS256" });
  return token;
}

function verifyToken<Response>(token: string): Response {
  const data = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
  return data as Response;
}

export { generateToken, verifyToken };
