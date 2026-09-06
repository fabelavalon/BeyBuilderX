# BeyBuilder X

BeyBuilder is a Beyblade stat tracker and random build generator for Beyblade X

<img src="https://github.com/user-attachments/assets/b8f36fd1-0fff-4c49-92e8-99b0d956b2b5" alt="site screenshot" width="500">

<img src="https://github.com/user-attachments/assets/c6b1d49d-7f2b-42dd-bb51-12d56b98d5d9" alt="mobile VS menu screenshot" width="300">

# How to use

- Open the [BeyBuilder website here](https://fabelavalon.github.io/BeyBuilderX/)
- Use dropdowns to select you parts. If a part is not selected, a random part will be chosen in it's place.
- Press "Choose Beyblade" button next to dropdowns to select the Bey
- Once both beys have been selected, you can start tracking stats
- Total win/loss stats of the selected beys will be displayed next to the selector dropdowns
- Win/loss between the two selected Beys is in the table below
- The database of generated beyblades allows you to set a preivously generated bey without resetting the dropdowns
- Select a bey from the list and press the "Set as Bey#" button to start tracking for that bey
- "Clear Database" will delete EVERY BEY IN YOUR HISTORY. It will prompt. Proceed with caution.

# Install PWA / offline HTML

The app will work entirely offline if you prepare it ahead of time. In Chrome you can "Install app" to add an icon to your homescreen and cache it for offline use. 

You can also download the repo and open `index.html`. However this local HTML file uses a separate database from the online version.

# Where is the database stored?

App data is stored in your web browser. Each device / browser will have its own data. "Delete browsing data" will delete your all your data!

- In FireFox: Developer Tools (F12) > Storage tab > Indexed DB
- In Chrome: Developer Tools (F12) > Application tab > Indexed DB
- Deleting the beyblades record will clear your created beyblades database
- Deleting the records record will clear your match records, but not your total win/loss
- Data can be exported and imported in BeyBuilder's Settings menu

# ToDo

- UI cleanup
- Add online funcationality for global beyblade stat tracking

# Development

- Clone the repo
- Open `index.html`

### PWA development

Testing the installable PWA requires a web server. Run locally with the NPM package `http-server`

- Install the latest LTS Version of [Node.js](https://nodejs.org/en) using [nvm](https://github.com/nvm-sh/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)
- Run `npm install`
- Run `npm start`
- That's it! Access the page at `localhost:8080/BeyBuilder/`

It must be served under `/BeyBuilder/` to match GitHub's path.