library(tidyverse)

nobs <- 256^3
table_id_only <- tibble(id = 1:nobs)
table_rgb_full <- mutate(table_id_only,
       red = (id-1)%/%(256^2),
       green = ((id-1)%%(256^2))%/%256,
       blue = ((id-1)%%(256^2))%%256,
       # For the formula below, see https://www.w3.org/TR/WCAG20-TECHS/G17.html
       red_srgb = red / 255,
       green_srgb = green / 255,
       blue_srgb = blue / 255,
       r = ifelse(red_srgb > 0.03928,
                      ((red_srgb + 0.055)/1.055)^2.4,
                      red_srgb / 12.92),
       g = ifelse(green_srgb > 0.03928,
                        ((green_srgb + 0.055)/1.055)^2.4,
                        green_srgb / 12.92),
       b = ifelse(blue_srgb > 0.03928,
                       ((blue_srgb + 0.055)/1.055)^2.4,
                       blue_srgb / 12.92),
       luminance = 0.2126*r + 0.7152*g + 0.0722*b,
       contrast_ratio = round((luminance + 0.05)/0.05, digits = 3),
)

table_rgb <- select(table_rgb_full, id, red, green, blue, contrast_ratio)
write_csv(table_rgb, "rgbColorCodes.csv")
