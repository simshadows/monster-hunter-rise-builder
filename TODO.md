# Important TODOs

- I haven't actually run the elemental/status formula through anybody yet. I'll need to get that off someone who's done the research.

- For now, I'm assuming Fortify works similar to Attack Boost % increase, i.e.: `EFR = (FLOOR(base raw including ramp * fortify% * ...) + ...) * ...`. I also haven't factored in Fortify's defense bonus for now. `Mopop#8020` tested and shown a 15% increase excluding Armourcharm/talon, but I'll need a bit more detail on how it stacks with the Defense Boost skill.

- If I implement calculations involving MV's, I'll need to remember that Silkbind attacks can be treated differently to other attacks, such as with Critical Draw and Punishing Draw.

- Heroics has `defense-increasing effects are negated`. What does this mean?

# Acknowledgements

I should try to build as complete a list of acknowledgements as possible.

Some acknowledgements so far:

- <https://www.reddit.com/r/MonsterHunterMeta/comments/n641k9/antiaerial_species_does_work_on_elder_dragons/>
- Discord user `Mopop#8020` for answering many questions and gathering resources.
