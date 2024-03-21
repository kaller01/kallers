module.exports = {
  mongodb: {
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    connect: process.env.DBLINK
  },
  photohost: {
    token: process.env.PHOTOTOKEN,
    host: process.env.PHOTOHOST
  },
  JWT: process.env.JWTKEY,
  bcrypt: {
    salt: process.env.SALT,
    hash: {
      admin: process.env.ADMINHASH,
      guest: process.env.GUESTHASH
    }
  }
};
