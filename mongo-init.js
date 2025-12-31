db = db.getSiblingDB('epicbox');

db.createUser({
  user: "epicbox",
  pwd: "epicboxpass",
  roles: [
    { role: "readWrite", db: "epicbox" }
  ]
});

db.slates.createIndex({queue:1, made:1, createdat: 1});
db.slates.createIndex({messageid:1, made:1});
db.slates.createIndex({ "createdat": 1 }, {expireAfterSeconds: 604800 });
