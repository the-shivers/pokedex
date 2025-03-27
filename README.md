<img width="500" alt="image" src="https://github.com/user-attachments/assets/86029d24-0ed7-4c19-b967-ce7a3bf72dfb" />

# Description
This is a simple Pokédex application built using NextJS (with TypeScript and Tailwind CSS). By entering the ID of a pokémon, or using the arrows to cycle through them, it displays a picture of that pokemon along with some basic information about it including stats, height, weight, description, and the pokémon's audio cry. It's styled to resemble an actual pokédex, with thoughtful design touches featured throughout including fun indicator lights and a GameBoy-like screen.

This is a frontend only project! Because all the information we need is available via the PokéAPI, we can simply fetch what we need on demand. If I were to implement a backend, I would probably do so using NextJS (which is a full stack framework), but for this project, there was no need.

# Setup instructions

This is a classic NextJS project with no exotic components or requirements (created simply with npx create-next-app@latest). So you can simply follow these steps to get the project running on your local machine for development and testing purposes.

## Prerequisites
*   [Node.js](https://nodejs.org/)
*   [npm](https://www.npmjs.com/)

## Installation & Running

1.  **Clone the repo:**
    ```bash
    git clone https://github.com/the-shivers/pokedex.git
    ```

2.  **Install dependencies:**
    Make sure you're in the project directory, then:
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **View the application:**
    Open your web browser and navigate to [http://localhost:3000](http://localhost:3000). Voila!

# Limitations and Future Improvements
## Retrospective
While the decision to model this on a Pokédex (like [this](https://i.etsystatic.com/20531433/r/il/281a31/3649640803/il_1588xN.3649640803_lqsi.jpg) one) was a fun idea, it led to some serious design issues. Most notably, the actual Pokédex is covered in useless nonsense buttons and lights. These aren't a problem when it's just something you look at, but it leads to a very poor UI/UX experience when implemented on a website. For example...
1. The two red circles above the "screen"--what could these _possibly_ be for? I made them light up when mousing over or clicking on the next/previous buttons, but really they serve no actual purpose. 
2. The diagonal shape on the navbar--there's no reason for it to be like that, and it just makes implementing changes slower and more challenging.
3. The fonts which look most Pokédex-y are unfortunately a bit hard to read!
Things like this constantly forced me to choose between being faithful to what the Pokédex actually looks like and web design best practices (and to be frank, it made this take longer than I would have liked, haha).

Were I to embark on this project again, I would definitely opt for a much more conventional design, like the ones seen on Serebii or Bulbapedia!

## Next Steps
To make this a useful website rather than a toy, next steps would involve adding more information. We're using only a small fraction of the information returned by the Pokemon and Pokemon Species endpoints on the PokeAPI, and a lot of useful information is left out, such as movesets, sprites, evolutionary lines, capture locations, and the like. We would specifically want to focus on adding information that makes this feel more like a Pokédex--more pictures, descriptions, and anything else that might fit in an animal guide. As a "reach" goal, it would be cool to add text-to-speech and image recognition, so that you could upload a photo and have the Pokédex read you information about the creature in its robotic voice, [just like the anime](https://www.youtube.com/watch?v=F_-x2ErAtsA&list=PLI7AG9R-9Grbd8-SeUtW6A5FXXWiwakxr).

Additionally, there are performance improvements we could make, such as preloading the next/previous Pokemon to give the website an ultra-snappy feel.
