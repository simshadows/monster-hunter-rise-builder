# Monster Hunter Rise Builder

A web-based build calculator for Monster Hunter Rise.

I'm currently hosting it here: <https://monsterhunter.simshadows.com/mhrb/>

This project was inspired by Honey's [MHW build calculator](https://honeyhunterworld.com/mhwbi/).

## How do I host this myself?

Simply host the repository root on a web server. The codebase is static and totally toolchainless.

For example, you can use the Python simple server:

```
cd monster-hunter-rise-builder
python3 -m http.server
```

## Roadmap

### Future Release: v1.0

**The first release of the app will be a minimally-complete builder app with complete EFR/EFE/EFS calculations, bowgun ammo performance, and other key weapon mechanics. v1.0 will exclude defense calculations.**

I will also publish two versions of the app:

- A stable production version at <https://monsterhunter.simshadows.com/mhrb/> that is updated with every major patch or bugfix, and

- An in-development version that will frequently break and is updated to the latest version available (likely at <https://monsterhunter-dev.simshadows.com/mhrb/>).

If a new major update of Monster Hunter Rise is released, the new content will be released on the in-development version ASAP, and then released on the stable version when it's ready.

### Future Release: v1.x

Along with bug fixes, math adjustments, and minor improvements, I expect to implement defense calculations before v2.0.

### Future Release: v2.0

**The second release of the app will be a codebase port. No new features are planned for v2.0 at this time, but will come with performance improvements that will ultimately pave the way for future features and sustainable development.**

The app before v2.0 is a totally toolchainless codebase. This was done because I only want to introduce complexity as it is needed. Without a toolchain, the entire codebase is only dependent on the browser, and three front-end libraries (React, html2canvas, and FileSaver).

v1.0 will allow me to reassess the project's needs, benchmark the app's performance, and experiment with different toolchain configurations, all with a fully-functional web app with all core features implemented.

I expect the codebase to be ported to a fully Typescript codebase (either plain Typescript or TSX), with major things rewritten for modularity, type/logic safety, and for unit testing.

In addition to porting the codebase, I expect to optimize the graphics to reduce download sizes and implement efficient image preloading.

### Future Release: v3.0 and Beyond

**It is not guaranteed that I will be continuing adding features beyond v2.x. Anything written here is an indication of intent, if time allows.**

Beyond v2.x, the focus of the development will be on game math. Tentative roadmap:

- v3.0: Build Search

    - Users will be able to let the app automatically come up with builds.

    - v3.0 will first attempt to reimplement <https://mhrise.wiki-db.com/sim/?hl=en>. v3.1 and beyond will build on v3.0, adding addtional search constraints and features.

- v4.0: Combat Modelling

    - Users will be able to build a benchmark consisting of one or many weapon moves (or "Motion Values"), and one or many monster parts (or "Hitzone Values").

    - Weapon moves and monster parts are selected from motion value tables and hitzone value tables (such as `Deathcream#1576`'s Weapon Attack Tables [[link](http://bit.ly/MHRWeaponAttackTables)] [[alternative link](https://docs.google.com/spreadsheets/d/e/2PACX-1vSMMtrWj7JH1-_Qr_xKb2lxZaZJ_Sq-ta43u6fLmpzVwqMfiTR-KqAFRDk6Zuw9WzM1sCgU9Th5lMoj/pubhtml)]). This data will be available in-app.

    - Based on the user's selected benchmark, the app will display how much real damage (raw, elemental, and status) is done.

    - Alternatively, the user can let the program analyze the best monster parts to attack.

    - **Factoring in damage from poison will be difficult due to its time-dependence. (On the other hand, blast is time-independent, making it possible to model by counting stat buildup and blast procs.)**

Server-side functionality is unlikely to be implemented. The entire app will remain 100% client-side.

### Long-Term Goals

I aim to design this codebase in such a way that it can be easily reused to build other Monster Hunter builder apps, or maybe even similar apps for games outside of Monster Hunter. This way, when the next game is released, we should hopefully have a fully-working builder within weeks, or even days!

### Cut Features

Features intentionally cut:

- **Switch Skill Selection**: Switch Skills are not important in core calculations. I'll add them later after getting feedback on the first iteration of the web app.

- **Kinsect Selection**: Also not important in core calculations, but I'll listen to feedback in case people want it.

- **Localization**: Due to time and resource constraints, the only language this app will be available in is English. I'll reconsider depending on the app's popularity, user feedback, funding, and if I can get consistent volunteers. It's a lot of commitment for such a small and niche app with relatively high UI complexity.

- **Accessibility**: This is also due to time and resource constraints. May be considered for a future app release.

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

