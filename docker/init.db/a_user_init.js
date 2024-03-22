/*
===============================================================
=================== User / DB Creation ========================
===============================================================
*/

db.createUser({
  user: process.env.DEV1_USERNAME,
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
  roles: [
    {
      role: "readWrite",
      db: process.env.MONGO_INITDB_DATABASE,
    },
  ],
});

db.createUser({
  user: process.env.DEV2_USERNAME,
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
  roles: [
    {
      role: "readWrite",
      db: process.env.MONGO_INITDB_DATABASE,
    },
  ],
});
