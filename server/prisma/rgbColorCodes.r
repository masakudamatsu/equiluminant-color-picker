library(tidyverse)

nobs <- 256^3
table_id_only <- tibble(id = 1:nobs)
table_rgb_full <- mutate(table_id_only,
       red = id%/%(256^2),
       green = (id%%(256^2))%/%256,
       blue = (id%%(256^2))%%256,
       # For the formula below, see https://www.w3.org/TR/WCAG20-TECHS/G17.html
       s_red = ifelse(red > 10,
                      ((red + 0.055)/1.055)^2.4,
                      red / 12.92),
       s_green = ifelse(green > 10,
                        ((green + 0.055)/1.055)^2.4,
                        green / 12.92),
       s_blue = ifelse(blue > 10,
                       ((blue + 0.055)/1.055)^2.4,
                       blue / 12.92),
       luminance = 0.2126*s_red + 0.7152*s_green + 0.0722*s_blue
)

table_rgb <- select(table_rgb_full, id, red, green, blue, luminance)
write_csv(table_rgb, "rgbColorCodes.csv")
