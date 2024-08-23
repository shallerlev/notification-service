db = db.getSiblingDB("notifications");

db.createUser({
  user: "root",
  pwd: "example",
  roles: [
    {
      role: "readWrite",
      db: "notifications",
    },
  ],
});
