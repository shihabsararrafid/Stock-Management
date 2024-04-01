import * as jose from 'jose'

const publicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1taUHjO90p7pKoq+B8Hp
RK4CorUqcOLt6alIRS9649YQHsVUpEvJJ0WuvzL4KVZpYAYjXxWPScwGMdh+GYj3
QE7P+QqQEOWqqbGTdRuGaI3G3sqPkXuXi2Yb+dP1IANEvJFh/u4V4z1wy6O/v97H
TzE1KFzCqG40IVrXVyx2zyNo7kWkffwB/H+FS/cSAFp2Ju6mVxL49azgbT1hHsNk
lc2mJv4xZAfOdHxpCsV2NIFUqXzKvIc0sQGHsl9Y/RK01YgVspi/UeNFdXIovDn7
8CP4WZJEPbzqnv49b2AIoxBn6WghnhbodFwPaxBZ54FBbpVN5GEcknPhG/rR5cOh
nSRQFLPb5uoVaqYD664Qe4JKOT3jbzXNJQgEKijvG2stYJaoepNnY3ahYxHVO699
JtOY7tx+UVwiV4ECL2bF9fGueJGBPq1o90v8WH+/NZ4uMXGgSoiRqUwXeLiygX+O
4J/MMhBgTQnRkBJeQo4jg6sftjlZ2u84TGJ8N1JRsCZBztej1nUr+mXevVWYSJ0V
q2h1M2kV6lI2vUnw6o1Jv/Kd3Yq/LYl8952Pl4nhy1+FaGXjO83jQJAYfCANzCry
0JK6TkDyklH7vQ5q/pks7opXuzDNDohrXbMQzdl2CX++f9OLEq5/+HP6luYeW8Lj
4S6ZIrLoegOJjyp7hoiaCKUCAwEAAQ==
-----END PUBLIC KEY-----
`
const privateKey = `-----BEGIN PRIVATE KEY-----
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
DsAUXz/4L96v1do3n2w+xAykVf9ZQR8=
-----END PRIVATE KEY-----
`
const alg = 'RS256'

const jwtConfig = {
  secret: new TextEncoder().encode(publicKey),
}
// Make a token
export const signToken = async (payload: object) => {
  console.log()
  try {
    const privateK = await jose.importPKCS8(privateKey, alg)
    const jwt = await new jose.SignJWT({ ...payload })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime('7days')
      .sign(privateK)
    // Return Promise
    return jwt
  } catch (error) {
    return error
    // throw new Error((error as Error).message)
    // console.log(error)
  }
}
// Verify Token
export const verifyToken = async (token: string) => {
  // Return Promise
  const publicK = await jose.importSPKI(publicKey, alg)
  try {
    const { payload, protectedHeader } = await jose.jwtVerify(token, publicK)
    return payload
  } catch (error) {
    return error
    // throw new Error((error as Error).message)
    // console.log(error)
  }
  //   console.log(payload)
}
