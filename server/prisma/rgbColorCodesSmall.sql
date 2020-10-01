.open rgbColorCodesSmall.db

DROP TABLE IF EXISTS rgbColorCodesSmall;
CREATE TABLE rgbColorCodesSmall ("id" INTEGER PRIMARY KEY, "red" INTEGER NOT NULL, "green" INTEGER NOT NULL, "blue" INTEGER NOT NULL, "contrast_ratio" REAL NOT NULL, "hue" INTEGER, "chroma" INTEGER NOT NULL);

.mode csv
.import rgbColorCodesSmall.csv rgbColorCodesSmall

DELETE FROM rgbColorCodesSmall WHERE typeof("contrast_ratio") == "text";
