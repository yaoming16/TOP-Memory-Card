# Anime Memory Card Game

A memory card game built with React that challenges players to click on different anime characters without repeating any selection. The game fetches real anime data from the Jikan API and tests your memory skills.

## Live Demo

Visit the live application: [https://top-memory-card-12r.pages.dev/](https://top-memory-card-12r.pages.dev/)

## About

This project is part of [The Odin Project](https://www.theodinproject.com/) curriculum. The assignment can be found here: [Memory Card Project](https://www.theodinproject.com/lessons/node-path-react-new-memory-card)

## Features

- Browse and select from popular anime titles
- Three difficulty levels: one-third, half, or all characters from the selected anime
- Dynamic character shuffling after each click
- Score tracking to monitor progress
- Responsive design for mobile and desktop
- Real-time data fetching from Jikan API
- Win/lose game states with replay options

## How to Play

1. Select an anime from the available options (you can search by title)
2. Choose your difficulty level
3. Click the "Start the game" button
4. Click on character cards without clicking the same character twice
5. The cards shuffle after each selection
6. Win by clicking all unique characters, or lose if you repeat a selection

## Technologies Used

- React
- Vite
- Jikan API
- JavaScript ES6+

## API Usage

This project uses the [Jikan API](https://jikan.moe/), a free and open-source REST API for MyAnimeList data. No authentication is required.

Endpoints used:

- `/v4/top/anime` - Fetch top anime list
- `/v4/anime/{id}/characters` - Fetch characters for a specific anime

## Acknowledgments

- [The Odin Project](https://www.theodinproject.com/) for the curriculum and project guidelines
- [Jikan API](https://jikan.moe/) for providing free anime data
- [MyAnimeList](https://myanimelist.net/) as the source of the anime information

## Author

GitHub: [yaoming16](https://github.com/yaoming16)
