/**
 * Assignment 2
 * Advanced Server-Side Scripting
 * 
 * Daniel Costa Ramos - 200354269
 * 
 * CUSTOM-V2.JS 
 * Version 2 of custom.js file - this time using VUE.JS
 */

 //  variable that holds which game is selected
let selectedEmail = 0;

// variable app - Main variable to handle the content for the emails.
var app = new Vue({
    el: '#layout',
    mounted: function () {
        this.listEmails = this.emails.filter(email => this.emails);
        this.setLocalStore_Emails();
    },
    data: {
        emails: [
            {
                firstName: "Arney",
                lastName: "Sherringham",
                emailAddress: "asherringham0@samsung.com",
                emailTitle: "tortor risus dapibus augue",
                emailText: "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
                avatar: "http://dummyimage.com/226x186.jpg/5fa2dd/ffffff"
            }, {
                firstName: "Kathy",
                lastName: "Humbert",
                emailAddress: "khumbert1@fastcompany.com",
                emailTitle: "tortor risus dapibus augue",
                emailText: "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
                avatar: "http://dummyimage.com/231x249.jpg/ff4444/ffffff"
            }, {
                firstName: "Helaina",
                lastName: "Rosell",
                emailAddress: "hrosell2@jiathis.com",
                emailTitle: "tortor risus dapibus augue",
                emailText: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
                avatar: "http://dummyimage.com/212x132.jpg/ff4444/ffffff"
            }, {
                firstName: "Glenine",
                lastName: "Groves",
                emailAddress: "ggroves3@tinypic.com",
                emailTitle: "tortor risus dapibus augue",
                emailText: "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
                avatar: "http://dummyimage.com/198x184.jpg/cc0000/ffffff"
            }, {
                firstName: "Giusto",
                lastName: "Haversum",
                emailAddress: "ghaversum4@wordpress.org",
                emailTitle: "tortor risus dapibus augue",
                emailText: "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
                avatar: "http://dummyimage.com/208x211.jpg/ff4444/ffffff"
            }
        ],

        listEmails: [],

        test: []
    },
    methods: {
        // function Local Store to save the state of the games
        setLocalStore_Emails: function () {
            localStorage.setItem('items', JSON.stringify(this.listEmails));
            this.calling_storage(this.listEmails);
        },

        calling_storage: function (list_emails) {
            // Calling LocalStorage
            if(localStorage.getItem('items')) {
                list_emails = JSON.parse(localStorage.getItem('items'));
                let filter = list_emails.filter(email => !email.deleted);
                this.initialize_emails(filter);
            } else {
                this.initialize_emails(emails);
            }
        },

        // function to initialize the list of games. Set which game is selected.
        initialize_emails: function (emails) {
            let emailEntries = [...(document.querySelectorAll('[data-id]'))];
            // if statement to set the first game as selected
            if (emails.length) {
                emailEntries[selectedEmail].classList.add('email-item-selected');
                this.show_email(selectedEmail, emails);
            } else {
                let main = document.getElementById('main');
                main.innerHTML = '<h1>There is not any games on trash!</h1>'
            }
        },

        selected_email: function (index) {
            let featuredEmail = [...(document.querySelectorAll('[data-id="'+index+'"]'))];

            let lastFeaturedEmail = [...(document.querySelectorAll('[data-id="'+selectedEmail+'"]'))];
            
            // remove class 'email-item-selected' from the previous game
            lastFeaturedEmail[0].classList.remove('email-item-selected');
            // add the class 'email-item-selected' to the selected game
            featuredEmail[0].classList.add('email-item-selected');
            selectedEmail = index;
        },

        // function to show each email that is selected
        show_email: function (emailIndex, emails) {
            this.selected_email(emailIndex);
            
            let displayEmailBody = `
                <div class="email-content">
                    <div class="email-content-header pure-g">
                        <div class="pure-u-1-2">
                            <h1 class="email-content-title">${emails[emailIndex].emailTitle}</h1>
                            <p class="email-content-subtitle">
                                From ${emails[emailIndex].firstName} ${emails[emailIndex].lastName}
                            </p>
                        </div>
        
                        <div class="email-content-controls pure-u-1-2">
                            <button class="secondary-button pure-button" id="delete" data-id="${emailIndex}" disable="true" @click="delete_email('emailIndex')">${emails[emailIndex].deleted == true ? 'Send to inbox' : 'Delete'} </button>
                            <button class="secondary-button pure-button">Archive</button>
                            <button class="secondary-button pure-button">Unread</button>
                        </div>
                    </div>
        
                    <div class="email-content-body">
                        <div class="non-floater">
                            ${emails[emailIndex].emailText}" 
                        </div>
                    </div>
                </div>`;
    
            let main = document.getElementById('main');
            main.innerHTML = displayEmailBody;
    
            // setting up the delete Button
            let btn_delete = document.getElementById('delete');
            btn_delete.addEventListener('click', () => this.delete_email(btn_delete.dataset.id, emails[emailIndex]));
        },

        // function to delete an email
        delete_email: function (index, email) {
            if(!email.deleted) {
                this.$set(email, "deleted", true);
                
                this.setLocalStore_Emails();

                // //update inbox
                this.listEmails = this.emails.filter(email => !email.deleted || email.deleted === false);
                selectedEmail = 0;
                this.initialize_emails(this.listEmails);
            } else {
                console.log("teste");
                // delete email[index].deleted;
                this.$set(email, "deleted", false);
                this.listEmails = this.emails.filter(email => this.emails.deleted === true);
                selectedGame = 0;
                this.initialize_emails(this.listEmails);
            }
            
        }, 

        // function to show the deleted emails
        show_trash: function () {
            this.listEmails = this.emails.filter(email => email.deleted === true);
            this.initialize_emails(this.listEmails);
        },

        // function to show all the email on the inbox
        show_inbox: function () {
            this.listEmails = this.emails.filter(email => !email.deleted);
            this.initialize_emails(this.listEmails);
        },

        // function to hadle the compose email button
        compose_form: function () {

            let html_compose_form = `
                <div class="pure-g">
                    <div class="pure-u-1">
                        <form class="pure-form pure-form-aligned" name="newEmail">
                            <fieldset>
                                <div class="pure-control-group">
                                    <label for="firstName">First Name</label>
                                    <input id="firstName" type="text" placeholder="First Name">
                                </div>
        
                                <div class="pure-control-group">
                                    <label for="lastName">Last Name</label>
                                    <input id="lastName" type="text" placeholder="Last Name">
                                </div>
                                
                                <div class="pure-control-group">
                                    <label for="emailAddress">Email Address</label>
                                    <input id="emailAddress" type="text" placeholder="Email Address">
                                </div>
        
                                <div class="pure-control-group">
                                    <label for="emailText">Email Body</label>
                                    <textarea id="emailText" name="emailText" rols="10" cols="20" class="pure-input-1-2" placeholder="Write something"></textarea>
                                </div>
        
                                <div class="pure-control-group">
                                    <label for="avatar">Avatar URL</label>
                                    <input id="avatar" type="text" placeholder="Avatar URL">
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

            let emails = this.emails;
        
            let submit = document.getElementById('submit');
            submit.addEventListener('click', () => this.add_email(firstName)); 
            // {
            //     let obj_newEmail = {
            //         lastName : document.forms.newEmail.lastName.value, 
            //         avatar : document.forms.newEmail.avatar.value, 
            //         firstName : document.forms.newEmail.firstName.value, 
            //         emailText : document.forms.newEmail.emailText.value,
            //         emailAddress : document.forms.newEmail.emailAddress.value
            //     }
            //     // add the new game to the list of games
            //     console.log(obj_newEmail);
            //     // emails.push(obj_newEmail);
        
            //     // using Local Store
            //     this.setLocalStore_Emails();
            //     // setLocalStore_Games();
                
            //     // update inbox
            //     // inbox.click();
            //     this.show_inbox();
            // });
        },

        add_email: function (firstName) {
            console.log(firstName);
            let obj_newEmail = {
                firstName : 'firstName'
            }
            this.test.push(obj_newEmail.value);
        }
    }
})




