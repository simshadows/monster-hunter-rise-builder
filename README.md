# Monster Hunter Rise Builder

A web-based build calculator for Monster Hunter Rise.

I'm currently hosting it here: <http://mhr-builder.simshadows.com/>

This project was inspired by Honey's [MHW build calculator](https://honeyhunterworld.com/mhwbi/).

**This project is an early work-in-progress. Also, I'm still learning React!**

## How do I host this myself?

Simply host the repository root on a web server. The codebase is static and totally toolchainless.

For example, you can use the Python simple server:

```
cd monster-hunter-rise-builder
python3 -m http.server
```

## Accessibity and Localization

Unfortunately, I might just have to leave special accessibility and localization features for last. Also, I'll probably need to port my codebase to a build system before then.

## License

All original source code is licensed under the [*GNU Affero General Public License v3.0 (AGPLv3)*](https://www.gnu.org/licenses/agpl-3.0.en.html).

All non-original source code is contained in `/js/dependencies` and have their own attached licenses. *(Exception: The loading spinner is in-line in `./index.html` and is licensed under CC0.)*

All original images are licensed under the [*Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)*](https://creativecommons.org/licenses/by-sa/4.0/).

All non-original and derived images are contained in `/images/derived` and `/images/placeholders`. I am currently working on replacing them with original or properly-licensed sourced creations.
