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

## Accessibility and Localization

Unfortunately, I might just have to leave special accessibility and localization features for last. Also, I'll probably need to port my codebase to a build system before then.

## Error Handling

Good error handling is currently severely lacking. Only render errors are caught, and that wipes the screen to display an error.

Errors in event handlers will silently fail. This is especially bad.

Errors in script imports will also silently fail, and the only way a user will know is if they're stuck on the loading screen for too long, or if they look at the browser developer tools.

## Contributing

I am not accepting code contributions and pull requests at this time, but I am happily accepting feedback. Feel free to [open an issue](https://github.com/simshadows/monster-hunter-rise-builder/issues)!

Or, feel free to fork and improve, or use this as a template for a builder program for other games! My only request is to maintain the AGPL licensing and include appropriate attribution.

## License

All original source code is licensed under the [*GNU Affero General Public License v3.0 (AGPLv3)*](https://www.gnu.org/licenses/agpl-3.0.en.html).

All non-original source code is contained in `/js/dependencies` and have their own attached licenses. *(Exception: The loading spinner is in-line in `./index.html` and is licensed under CC0.)*

All original images are licensed under the [*Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)*](https://creativecommons.org/licenses/by-sa/4.0/).

All non-original and derived images are contained in `/images/derived` and `/images/placeholders`. I am currently working on replacing them with original or properly-licensed sourced creations.

