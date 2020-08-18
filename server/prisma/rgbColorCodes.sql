.open rgbColorCodes.db

DROP TABLE IF EXISTS rgbColorCodes;
CREATE TABLE rgbColorCodes ("id" INTEGER PRIMARY KEY, "red" INTEGER NOT NULL, "green" INTEGER NOT NULL, "blue" INTEGER NOT NULL, "luminance" REAL NOT NULL);

.mode csv
.import rgbColorCodes.csv rgbColorCodes

DELETE FROM rgbColorCodes WHERE typeof("luminance") == "text";