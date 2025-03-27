<img width="500" alt="image" src="https://github.com/user-attachments/assets/86029d24-0ed7-4c19-b967-ce7a3bf72dfb" />

Readme! TBD.

# Setup instructions
lorem ipsum bla bla bla

# Description
lorem lorem ipsum ipsum bla
<img width="200" alt="pokedex image" src="https://i.etsystatic.com/20531433/r/il/281a31/3649640803/il_1588xN.3649640803_lqsi.jpg">

# Limitations and Future Improvements
## Retrospective
While the decision to model this on a Pokédex was a fun idea, it led to some serious design issues. Most notably, the actual Pokédex is covered in useless nonsense buttons and lights. These aren't a problem when it's just something you look at, but it leads to a very poor UI/UX experience when implemented on a website. For example, the two red circles above the "screen"--what could these _possibly_ be for? I made them light up when mousing over or clicking on the next/previous buttons, but really they serve no actual purpose. Another example would be the diagonal shape on the navbar--there's no reason for it to be like that, and it just makes implementing changes slower and more challenging. Things like this constantly forced me to choose between being faithful to what the Pokédex actually looks like and web design best practices.

Were I to embark on this project again, I would definitely opt for a much more conventional design, like the ones seen on Serebii or Bulbapedia!

## Next Steps
To make this a useful website rather than a toy, next steps would involve adding more information. We're using only a small fraction of the information returned by the Pokemon and Pokemon Species endpoints on the PokeAPI, and a lot of useful information is left out, such as movesets, sprites, evolutionary lines, capture locations, and the like. We would specifically want to focus on adding information that makes this feel more like a Pokédex--more pictures, descriptions, and the like. As a reach goal, it would be cool to add text-to-speech and image recognition, so that you could upload a photo and have the Pokédex read you information about the creature in its robotic voice, [just like the anime](https://www.youtube.com/watch?v=F_-x2ErAtsA&list=PLI7AG9R-9Grbd8-SeUtW6A5FXXWiwakxr).
