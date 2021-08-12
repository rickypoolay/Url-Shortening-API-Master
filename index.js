$(function () {
let linksCounter = 0;

//Functions

    //Toggle NavBar Visiblity
    const navToggle = function () {
        $('.nav-dropdown').slideToggle(200)
    }

    const generateShortLink = function () {
        //Set button to display ' Shortening... '
        $('.shorten-btn').text('Shortening...');

        //Gather User Input
        const userInput = $('.user-input').val();

        //Apidata put together
        const apiData = {
            apiUrl: 'https://api.shrtco.de/v2/shorten?url=',
            userLink: userInput,
        };
        
        const apiUrl = `${apiData.apiUrl}${apiData.userLink}`
        console.log(apiUrl);
        
        //Fetch the data processed with the user requested data
        fetch(apiUrl)

        .then((data) => {
            if(!data.ok) {
            //If an error is throw add a notification to user for a correct link.
            $('.shortener-container p').toggle();
            $('.user-input').css('border', '5px solid var(--red)');
        } else {
            
                //Reset If Incorrect field to normal
                $('.shortener-container p').hide();
                $('.user-input').css('border', 'none');
                $('.shorten-btn').text('Shortening...');
                return data.json()
            }
        })
        
        // .then((shortLink) => generateHTML(shortLink.result))
        .then((shortLink) => generateHTML(shortLink.result));

        
        //Create the Shortened Link To Screen
        const generateHTML = (shortLink) => {
            linksCounter++


            //Shortened link
            const shortenedLink = shortLink.short_link;
            console.log(shortenedLink);

            //Add link to list   
            const linksContainer = $('.links-list-container');
            
            //Create link container div
            const createDiv = document.createElement('div');
            createDiv.classList.add('link-container');
            linksContainer.append(createDiv);
            
            //Add User Input link
            const createUserInput = document.createElement('p');
            createUserInput.classList.add('original-link');
            createUserInput.innerText = userInput;
            createDiv.append(createUserInput);
            
            //Add Shortened link
            const createShortenedLink = document.createElement('input');
            createShortenedLink.classList.add('shortened-link');
            createShortenedLink.setAttribute('readonly', '');
            createShortenedLink.value = shortenedLink;
            createDiv.append(createShortenedLink);

            //Add Copy Button
            const createCopyBtn = document.createElement('button');
            createCopyBtn.classList.add('copy-btn');
            createCopyBtn.innerText = 'Copy';
            createDiv.append(createCopyBtn);

            createCopyBtn.addEventListener('click', () => {
                createShortenedLink.select();
                createShortenedLink.setSelectionRange(0, 99999);
                document.execCommand('copy');

                $(createCopyBtn).text('Copied!');
                $(createCopyBtn).css('background-color' , 'var(--bg)');
            }) 

            

            

            // const html = 
            // `
            // <div class='link-container link${linksCounter}'>
            // <p class='original-link'>${userInput}</p>
            // <p class='shortened-link'>${shortenedLink}</p>
            // <button class='copy-btn'>Copy</button>
            // </div>
            // `
            //Add Html to Container
            // $('.links-list-container').append(html);

            //Reset Button Text
            $('.shorten-btn').text('Shorten It!');
        }

    }

//Eventlisteners
    
    //Navbar Toggle
    $('.hamburger').click(navToggle);
    $('.bg').click(navToggle);

    //Generate Link
    $('.shorten-btn').click(generateShortLink);
});