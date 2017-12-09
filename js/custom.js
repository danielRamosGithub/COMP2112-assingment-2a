/**
 * Assignment 1
 * Advanced Server-Side Scripting
 * 
 * Daniel Costa Ramos - 200354269
 * 
 * CUSTOM.JS
 */

//  variable that holds which game is selected
let selectedGame = 0;

// variable that hold the element that contains the trash link
let trash = document.getElementById('trash');

// variable that hold the element that contains the inbox link
let inbox = document.getElementById('inbox');

// variable that hold the element that contains the compose link
let compose = document.getElementById('compose');

// DELETE Button
trash.addEventListener('click', function(e) {
    e.preventDefault();
    let filter = games.filter(game => game.deleted);
    selectedGame = 0;
    render_games(filter);
});

// INBOX Button
inbox.addEventListener('click', function(e) {
    e.preventDefault();
    let inbox = games.filter(game => !game.deleted);
    selectedGame = 0;
    render_games(inbox);
});

// COMPOSE Button
compose.addEventListener('click', compose_form);

// function to handle the compose Button and form
function compose_form(e) {
    e.preventDefault();
    let html_compose_form = `
        <div class="pure-g">
            <div class="pure-u-1">
                <form class="pure-form pure-form-aligned" name="newGame">
                    <fieldset>
                        <div class="pure-control-group">
                            <label for="gameTitle">Game Title</label>
                            <input id="gameTitle" type="text" placeholder="Game Title">
                        </div>

                        <div class="pure-control-group">
                            <label for="publisher">Publisher</label>
                            <input id="publisher" type="text" placeholder="Publisher">
                        </div>
                        
                        <div class="pure-control-group">
                            <label for="year">Year Published</label>
                            <input id="year" type="text" placeholder="Year Published">
                        </div>

                        <div class="pure-control-group">
                            <label for="description">Description</label>
                            <textarea id="description" name="description" rols="10" cols="20" class="pure-input-1-2" placeholder="Description"></textarea>
                        </div>

                        <div class="pure-control-group">
                            <label for="avatar">Avatar URL</label>
                            <input id="avatar" type="text" placeholder="Avatar URL">
                        </div>

                        <div class="pure-control-group">
                            <label for="iframe">Iframe URL</label>
                            <input id="iframe" type="text" placeholder="Iframe URL">
                        </div>

                        <div class="pure-controls">
                            <button type="submit" class="pure-button pure-button-primary" id="submit">Submit</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    `;
    let main = document.getElementById('main');
    main.innerHTML = html_compose_form;

    let submit = document.getElementById('submit');
    submit.addEventListener('click', function(e) {
        e.preventDefault();
        let obj_newGame = {
            publisher : document.forms.newGame.publisher.value, 
            avatar : document.forms.newGame.avatar.value, 
            subject : document.forms.newGame.gameTitle.value, 
            body : document.forms.newGame.description.value,
            date : document.forms.newGame.year.value, 
            ifrmSrc : document.forms.newGame.iframe.value
        }
        // add the new game to the list of games
        games.unshift(obj_newGame);

        // using Local Store
        setLocalStore_Games();
        
        // update inbox
        inbox.click();
    });
}

// function to render the list of games
function render_games(games) {

    let list_games = `
        ${games.map( (game, index) => `
            <div class="email-item pure-g" data-id="${index}">
                <div class="pure-u">
                    <img width="64" height="64" alt="${game.subject}" class="game-avatar" src="${game.avatar}">
                </div>

                <div class="pure-u-3-4">
                    <h5 class="game-publisher">${game.publisher} ${game.date}</h5>
                    <h4 class="game-subject">${game.subject}</h4>
                    <p class="game-body">
                        ${game.body.length > 100 ? `${game.body.substr(0,99)}...` : game.body}
                    </p>
                </div>
            </div>
        `).join('')}
    `;

    let el = document.getElementById('list');
    el.innerHTML = list_games;

    
    initializa_games(games);

} // END render_games()

// function to initialize the list of games. Set which game is selected.
function initializa_games (games) {

    let gameEntries = [...(document.querySelectorAll('[data-id]'))];
    gameEntries.map( (game, index) => game.addEventListener('click', function(e) {
        // remove class 'email-item-selected' from the previous game
        gameEntries[selectedGame].classList.remove('email-item-selected');
        // add the class 'email-item-selected' to the selected game
        game.classList.add('email-item-selected');
        selectedGame = index;
        show_game(selectedGame, games);
    }));

    // if statement to set the first game as selected
    if (games.length) {
        gameEntries[selectedGame].classList.add('email-item-selected');
        show_game(selectedGame, games);
    } else {
        let main = document.getElementById('main');
        main.innerHTML = '<h1>There is not any games on trash!</h1>'
    }
}

// function to show each game that was selected
function show_game(gameIndex, games) {
    let displayGameBody = `
        <div class="email-content">
            <div class="email-content-header pure-g">
                <div class="pure-u-1-2">
                    <h1 class="email-content-title">${games[gameIndex].subject}</h1>
                    <p class="email-content-subtitle">
                        Published by ${games[gameIndex].publisher} ${games[gameIndex].date}
                    </p>
                </div>

                <div class="email-content-controls pure-u-1-2">
                    <button class="secondary-button pure-button" id="delete" data-id="${gameIndex}" disable="true">${games[gameIndex].deleted == true ? 'Deleted' : 'Delete'}</button>
                    <button class="secondary-button pure-button">Archive</button>
                    <button class="secondary-button pure-button">Unread</button>
                </div>
            </div>

            <div class="email-content-body">
                <div class="non-floater">
                    <iframe src="${games[gameIndex].ifrmSrc}" frameborder="0"></iframe>
                </div>
            </div>
        </div>`;

        let main = document.getElementById('main');
        main.innerHTML = displayGameBody;

        // setting up the delete Button
        let btn_delete = document.getElementById('delete');
        btn_delete.addEventListener('click', () => deleteGame(btn_delete.dataset.id, games));
}

// function to delete games from the inbox
function deleteGame(index, games) {
    if(!games[index].deleted) {
        // add deleted:true to the element currently clicked
        games[index].deleted = true;

        // using Local Store
        setLocalStore_Games();

        // update inbox
        let inbox = games.filter(game => !game.deleted);
        selectedGame = 0;
        render_games(inbox);
    } else {
        delete games[index].deleted;
        let filter = games.filter(game => game.deleted);
        selectedGame = 0;
        render_games(filter);
    }
}

// function Local Store to save the state of the games
function setLocalStore_Games() {
    localStorage.setItem('items', JSON.stringify(games));
}

// Calling LocalStorage
if(localStorage.getItem('items')) {
    games = JSON.parse(localStorage.getItem('items'));
    let filter = games.filter(game => !game.deleted);
    render_games(filter);
} else {
    render_games(games);
}
