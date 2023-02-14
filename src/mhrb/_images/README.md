# Image Asset Acknowledgements

Weapon/Head/Chest/Arms/Waist/Legs icons: [/u/TheOolongNinja](https://www.reddit.com/r/MonsterHunter/comments/2thxoz/here_i_compiled_a_set_of_higher_resolution_icons/) ([direct link](http://www.mediafire.com/file/12ksq7kxc01oogd/Monster_Hunter_Vector_Icons.zip/file))

Insect glaive, switch axe, and charge blade icons: [monsterhunter.fandom.com](https://monsterhunter.fandom.com/wiki/Monster_Hunter_Wiki)

Charm placeholder icon: [Honey's MHW Builder](https://honeyhunterworld.com/mhwbi/)

# Steps for reproducing weapon and armour recolourings

The original files are the white ones.

We first eyedrop various icons in-game. These are my values:

```
r2:  253 254 138       188 189 103       163 165 98        100 100 52
r3:  253 160 186       188 117 138       156 104 119       100 61 72
r4:  159 229 131       117 172 96        106 150 85        59 90 47
r5:  51 204 253        34  152 186       40  129 156       11 80 98
r6:  109 139 251       80  102 186       71  87  152       38 52 99
r7:  233 90 70         175 65  49        142 59  46        93 31 20
r8:  171 238 254       125 178 187       111 159 166       64 96 100
r9:  150 109 251       109 81 187        93 69 154         57 42 105
r10: 247 154 57        184 114 39        163 101 33        101 60 15
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

# Decoration Colour Values

```
White: 191 193 200

Blue:       64  124 124
Brown:      112 88  57
Dark Blue:  50  81  195
Gold:       186 131 59
Green:      25  167 112
Grey:       127 130 131
Light Blue: 116 151 189
Orange:     186 83  14
Pink:       177 83  139
Purple:     120 45  169
Red:        187 53  6
Yellow:     190 190 88
```

# Steps for reproducing size-4 decos

No deco:
```
 [  ] gem_size4
 [  ] shadow_gem_size4
 [  ] shadow_inner4_darker
 [  ] gem_size3
 [  ] gem_size2
 [  ] gem_size1
 [  ] gem_bottomouter
 [  ] gem_bottominner
```

Size 1:
```
 [  ] gem_size4
 [  ] shadow_gem_size4
 [  ] shadow_inner4_darker
 [  ] gem_size3
 [  ] gem_size2
>[ON] gem_size1
 [  ] gem_bottomouter
>[ON] gem_bottominner [Make only left side visible]
```

Size 2:
```
 [  ] gem_size4
 [  ] shadow_gem_size4
 [  ] shadow_inner4_darker
 [  ] gem_size3
>[ON] gem_size2
>[  ] gem_size1
 [  ] gem_bottomouter
 [ON] gem_bottominner [All visible]
```

Size 3:
```
 [  ] gem_size4
 [  ] shadow_gem_size4
 [  ] shadow_inner4_darker
>[ON] gem_size3
>[  ] gem_size2
 [  ] gem_size1
>[ON] gem_bottomouter [Make only left side visible]
 [ON] gem_bottominner [All visible]
```

Size 4:
```
>[ON] gem_size4
>[ON] shadow_gem_size4
>[ON] shadow_inner4_darker
 [ON] gem_size3
 [  ] gem_size2
 [  ] gem_size1
 [ON] gem_bottomouter [All visible]
 [ON] gem_bottominner [All visible]
```

After generating the no-decoration version, start with size-1. Hide/unhide as needed, then unlock just the layers that need to be recoloured, then highlight everything to change the colour in one go. Save an optimized copy. Repeat for all colours.

Repeat for all sizes.

Scour SVG optimization parameters (anything not listed is probably turned off):
```
Options
     [5 ] Number of significant digits for coordinates
     [ON] Shorten color values
     [ON] Convert CSS attributes to XML attributes
     [ON] Collapse groups
     [ON] Create groups for similar attributes
     [  ] Keep editor data
     [  ] Keep unreferenced definitions
     [ON] Work around renderer bugs
SVG Output:
     [ON] Remove comments
     [  ] Embed raster images
IDs:
     [ON] Remove unused IDs
     [ON] Shorten IDs
     [ON] Preserve manually created IDs not ending with digits
```
