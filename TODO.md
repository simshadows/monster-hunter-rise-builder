# Important TODOs

- I haven't actually run the elemental/status formula through anybody yet. I'll need to get that off someone who's done the research.

- If I implement calculations involving MV's, I'll need to remember that Silkbind attacks can be treated differently to other attacks, such as with Critical Draw and Punishing Draw.

- Heroics has `defense-increasing effects are negated`. What does this mean?

- I assume applying, say, `Use Para Coating I` and `Use Para Coating II` on the same bow at the same time will apply the highest compatibility state. Also, applying `Use Para Coating II` to two slots at once will not reapply the raw penalty (or raw bonus for others). Not very meaningful to be pedantic about it, but I want the builder to be accurate, so I'll double-check later.

- The Elemental Reload switch skill affects LBG reload speed, but the app doesn't support switch skills yet.

- I should properly document the in-game testing I do personally rather than asking people or finding data on the internet. Things I know I tested rigorously:

    - I tested all bowgun rampage weapon rampage skills.
    - Narwa Soul rampage skill with various numbers of Ibushi armour
        - Tested with `Thunderbolt Great Sword I`
        - No pieces --> 0% affinity, add head --> 4%, add arms --> 6%, add waist --> 10%, add legs --> 12%, add chest --> 40%
        - any piece on its own --> 4%

# Game Data WIP: HBG Ramp Skills

- `Meteor Bazooka I`
    - `Pierce Effect I`
        - `Pierce Ammo 1`: `3 --> 5`
        - `Pierce Ammo 2`: `3 --> 5`
- `Carrozza Bazooka I`
    - `Pierce Effect I`
        - `Pierce Ammo 1`: `2 --> 4`
        - `Pierce Ammo 2`: `0 --> 5`
    - `Spread Effect I`
        - `Spread Ammo 1`: `0 --> 5`
        - `Spread Ammo 2`: `0 --> 6`
    - `Shrapnel Effect I`
        - `Shrapnel Ammo 1`: `5 --> 7`
        - `Shrapnel Ammo 2`: `4 --> 6`
- `Rampage H. Bowgun I`
    - `Add: Normal Ammo I`
        - `Normal Ammo 1`: `7`
        - `Normal Ammo 2`: `6`
        - `Normal Ammo 3`: `2`
    - `Pierce Effect I`
        - `Pierce Ammo 1`: `8`
        - `Pierce Ammo 2`: `6`
        - `Pierce Ammo 3`: `3`
    - `Spread Effect I`
        - `Spread Ammo 1`: `8`
        - `Spread Ammo 2`: `6`
        - `Spread Ammo 3`: `3`
    - `Shrapnel Effect I`
        - `Shrapnel Ammo 1`: `8`
        - `Shrapnel Ammo 2`: `6`
        - `Shrapnel Ammo 3`: `3`
    - `Fire Effect I`
        - `Flaming Ammo`: `5`
        - (Similarly for `Water Effect I`, `Thunder Effect I`, and `Ice Effect I`)
- `Rampage H. Bowgun II`
    - *Includes all the same as `Rampage H. Bowgun I`.*
    - `Recoil Down Boost`
        - Recoil `Average` --> `Some`
    - `Reload Speed Boost`
        - Reload `Below Avg.` --> `Average`
    - `Steadiness Boost`
        - Deviation `L Severe` --> `L Mild`
    - `Sticky/Cluster Effect I`
        - `Sticky Ammo 1`: `5`
        - `Sticky Ammo 2`: `2`
        - `Cluster Bomb 1`: `3`
        - `Cluster Bomb 2`: `2`
    - `Dragon Effect I`
        - `Dragon Ammo`: `3`
    - `Poison Effect I`
        - `Poison Ammo 1`: `3`
        - `Poison Ammo 2`: `2`
        - `Recover Ammo 1`: `2`
        - `Recover Ammo 2`: `1`
        - `Demon Ammo`: `1`
        - `Armor Ammo`: `1`
    - `Exhaust Effect I`
        - `Exhaust Ammo 1`: `3`
        - `Exhaust Ammo 2`: `2`
        - (Recover, Demon and Armor ammo same as `Poison Effect I`)
    - (I won't bother with special ammo ramp skills)
- `Rampage H. Bowgun III`
    - *Includes all the same as `Rampage H. Bowgun II`.*
    - `Paralysis Effect I`
        - `Paralysis Ammo 1`: `3`
        - `Paralysis Ammo 2`: `2`
        - (Interestingly enough, I don't see any other ammo types.)
    - `Sleep Effect I`
        - `Sleep Ammo 1`: `3`
        - `Sleep Ammo 2`: `2`
        - (Interestingly enough, I don't see any other ammo types.)
- `Rampage H. Bowgun IV`
    - *Includes all the same as `Rampage H. Bowgun III`.*
    - `Add: Normal Ammo II`
        - `Normal Ammo 1`: `5`
        - `Normal Ammo 2`: `5`
        - `Normal Ammo 3`: `7`
    - `Pierce Effect II`
        - `Pierce Ammo 1`: `5`
        - `Pierce Ammo 2`: `4`
        - `Pierce Ammo 3`: `5`
    - `Spread Effect II`
        - (Similar to `Pierce Effect II`)
    - `Shrapnel Effect II`
        - (Similar to `Pierce Effect II`)

# Game Data WIP: LBG Ramp Skills

- `Rampage L. Bowgun I`
    - `Add: Normal Ammo I`
        - `Normal Ammo 1`: `6`
        - `Normal Ammo 2`: `5`
        - `Normal Ammo 3`: `1`
    - `Pierce Effect I`
        - `Pierce Ammo 1`: `7`
        - `Pierce Ammo 2`: `5`
        - `Pierce Ammo 3`: `2`
    - `Spread Effect I`
        - `Spread Ammo 1`: `7`
        - `Spread Ammo 2`: `5`
        - `Spread Ammo 3`: `2`
    - `Shrapnel Effect I`
        - `Shrapnel Ammo 1`: `7`
        - `Shrapnel Ammo 2`: `5`
        - `Shrapnel Ammo 3`: `2`
    - `Fire Effect I`
        - `Flaming Ammo`: `4`
        - (Similarly for `Water Effect I`, `Thunder Effect I`, and `Ice Effect I`)
    - `Rapid Fire (Normal)`
        - `Normal Ammo 1` is now rapid fire
        - `Normal Ammo 2` is now rapid fire
- `Rampage L. Bowgun II`
    - *Includes all the same as `Rampage L. Bowgun I`.*
    - `Recoil Down Boost`
        - Recoil `Average` --> `Some`
    - `Reload Speed Boost`
        - Reload `Below Avg.` --> `Average`
    - `Steadiness Boost`
        - Deviation `R Severe` --> `R Mild`
    - `Sticky/Cluster Effect I`
        - `Sticky Ammo 1`: `5`
        - `Sticky Ammo 2`: `2`
        - `Cluster Bomb 1`: `3`
        - `Cluster Bomb 2`: `2`
    - `Dragon Effect I`
        - `Dragon Ammo`: `3`
    - `Poison Effect I`
        - `Poison Ammo 1`: `2`
        - `Poison Ammo 2`: `1`
        - `Recover Ammo 1`: `2`
        - `Recover Ammo 2`: `1`
        - `Demon Ammo`: `1`
        - `Armor Ammo`: `1`
    - `Exhaust Effect I`
        - `Exhaust Ammo 1`: `2`
        - `Exhaust Ammo 2`: `1`
        - (Recover, Demon and Armor ammo same as `Poison Effect I`)
    - (I won't bother with rapid fire ramp skills)
- `Rampage L. Bowgun III`
    - *Includes all the same as `Rampage L. Bowgun II`.*
    - `Paralysis Effect I`
        - `Paralysis Ammo 1`: `2`
        - `Paralysis Ammo 2`: `1`
        - (Interestingly enough, I don't see any other ammo types.)
    - `Sleep Effect I`
        - `Sleep Ammo 1`: `2`
        - `Sleep Ammo 2`: `1`
        - (Interestingly enough, I don't see any other ammo types.)
- `Rampage L. Bowgun IV`
    - *Includes all the same as `Rampage L. Bowgun III`.*
    - `Add: Normal Ammo II`
        - `Normal Ammo 1`: `4`
        - `Normal Ammo 2`: `4`
        - `Normal Ammo 3`: `6`
    - `Pierce Effect II`
        - `Pierce Ammo 1`: `4`
        - `Pierce Ammo 2`: `3`
        - `Pierce Ammo 3`: `4`
    - `Spread Effect II`
        - (Similar to `Pierce Effect II`)
    - `Shrapnel Effect II`
        - (Similar to `Pierce Effect II`)

# Acknowledgements

I should try to build as complete a list of acknowledgements as possible.

Some acknowledgements so far:

- <https://www.reddit.com/r/MonsterHunterMeta/comments/n641k9/antiaerial_species_does_work_on_elder_dragons/>
- Discord user `Mopop#8020` for answering many questions and gathering resources. Also tested defense stacking (Defense Boost and Fortify along with Armorcharm/talon).
- Discord user `hauffen#2153` for answering questions and providing their [hammer calculator](https://docs.google.com/spreadsheets/d/1cf3BmuV-p48HAHvT7bbFmIm2bf2MeDmA9h-3GUR3RZY/) as a source of data.
- Discord user `Moonmadness#9063` for answering questions.
- Discord user `T3h Phish #5878` for finding a bug.
- <https://www.mhrbuilder.com/> for providing rampage skill sharpness data, and as a useful cross-check for many others.
- Discord user `Rayorne_Senephoene#9356` for clarifying `Firing: Rapid`, `Firing: Pierce`, etc. ramp skill math and double-checking which ones require Bow Charge Plus from in-game.
- Discord user `DevNode#4768` for answering a bunch of questions, particularly on bowgun stats, and providing an [ammo stat tables reference](https://docs.google.com/spreadsheets/d/1DLaU_Q9gVsxexQyjJDeYScVAVjDTH51dhyWEDC31PBg/edit#gid=0).
- <https://drive.google.com/drive/folders/1RvAQhaWAClGWYzj9VEdwICCh9LOHcdMN>

