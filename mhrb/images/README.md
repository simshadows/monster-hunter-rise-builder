# Image Asset Acknowledgements

Weapon/Head/Chest/Arms/Waist/Legs and Buff placeholder icons: [/u/TheOolongNinja](https://www.reddit.com/r/MonsterHunter/comments/2thxoz/here_i_compiled_a_set_of_higher_resolution_icons/) ([direct link](http://www.mediafire.com/file/12ksq7kxc01oogd/Monster_Hunter_Vector_Icons.zip/file))

Insect glaive, switch axe, and charge blade icons: [monsterhunter.fandom.com](https://monsterhunter.fandom.com/wiki/Monster_Hunter_Wiki)

Charm placeholder icon: [Honey's MHW Builder](https://honeyhunterworld.com/mhwbi/)

Decoration placeholder icons: [monsterhunterrise.wiki.fextralife.com](https://monsterhunterrise.wiki.fextralife.com/Monster+Hunter+Rise+Wiki) ([size 1](https://monsterhunterrise.wiki.fextralife.com/file/Monster-Hunter-Rise/gem_level_1_icon_monster_hunter_rise_wiki_guide_24px.png), [size 2](https://monsterhunterrise.wiki.fextralife.com/file/Monster-Hunter-Rise/gem_level_2_icon_monster_hunter_rise_wiki_guide_24px.png), [size 3](https://monsterhunterrise.wiki.fextralife.com/file/Monster-Hunter-Rise/gem_level_3_icon_monster_hunter_rise_wiki_guide_24px.png))

# Steps for reproducing weapon and armour recolourings

The original files are the white ones.

We first eyedrop various icons in-game. These are my values:

```
r2: 253 254 138       188 189 103       163 165 98        100 100 52
r3: 253 160 186       188 117 138       156 104 119       100 61 72
r4: 159 229 131       117 172 96        106 150 85        59 90 47
r5: 51 204 253        34  152 186       40  129 156       11 80 98
r6: 109 139 251       80  102 186       71  87  152       38 52 99
r7: 233 90 70         175 65  49        142 59  46        93 31 20
    bright spot       upper chest       waist dark bits   charge blade dark bits
```

Now, we set up [XnConvert](https://www.xnview.com/en/xnconvert/) with the following actions for rarity 2:

Action 1:
```
Replace Color

Red:   255 --> 253
Green: 255 --> 254
Blue:  255 --> 138
Tolerance: 50
```

Action 2:
```
Replace Color

Red:   200 --> 188
Green: 200 --> 189
Blue:  200 --> 103
Tolerance: 50
```

Action 3 (Note: This one has a lower tolerance due to noise issues in the charge blade image):
```
Replace Color

Red:   148 --> 163
Green: 148 --> 165
Blue:  148 --> 98
Tolerance: 30
```

Action 4:
```
Replace Color

Red:   177 --> 188
Green: 177 --> 189
Blue:  177 --> 103
Tolerance: 50
```

Action 5:
```
Replace Color

Red:   151 --> 163
Green: 151 --> 165
Blue:  151 --> 98
Tolerance: 50
```

Action 6:
```
Replace Color

Red:   118 --> 100
Green: 118 --> 100
Blue:  118 --> 52
Tolerance: 50
```

Action 7:
```
Replace Color

Red:   82 --> 100
Green: 82 --> 100
Blue:  82 --> 52
Tolerance: 50
```

Action 8:
```
Replace Color

Red:   68 --> 100
Green: 68 --> 100
Blue:  68 --> 52
Tolerance: 50
```

Make sure the output format is in PNG, then run the conversion on all the original white weapons and armour.
