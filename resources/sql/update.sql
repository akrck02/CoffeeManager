CREATE TABLE IF NOT EXISTS user (
    username TEXT PRIMARY KEY,
    password TEXT,
    auth TEXT,
    PRIMARY KEY (username, auth)
);

CREATE TABLE IF NOT EXISTS user_device (
    auth TEXT,
    device TEXT,
    address TEXT,
    PRIMARY KEY (auth, address)
);

CREATE TABLE IF NOT EXISTS drink (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price NUMBER
);

CREATE TABLE IF NOT EXISTS user_drink (
    username TEXT,
    id NUMBER
);

CREATE TABLE IF NOT EXISTS food (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price NUMBER
);

CREATE TABLE IF NOT EXISTS user_food (
    username TEXT,
    id NUMBER
);