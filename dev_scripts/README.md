# Development Scripts

In this directory, you will find utility scripts that are run during development to automate certain tasks, particularly data entry.

I will also keep copies of data that is parsed for this purpose for reproducibility.

## `/u/Cartiledge`'s Weapon Data

The the data was originally scraped off [mhrise.kiranico.com](https://mhrise.kiranico.com/) and published to [Google Sheets](https://docs.google.com/spreadsheets/d/1zFJ6Rnroi8su0NLStlZEeduVWUX_XyOU-H6adocBrYo/) by **[/u/Cartiledge](https://www.reddit.com/user/Cartiledge)**. I downloaded CSV Copies of this data and stored it in `./cartiledge_weapon_data/` for reproducibility.

We then process this data ourselves using `./cartiledge_weapon_data_parse.py`, and the resulting JSON files are manually merged into the existing database, checking for anomalies or ID issues along the way.

