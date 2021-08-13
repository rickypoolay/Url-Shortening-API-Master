$(function () {
console.log('youtube.com');


//Functions

    //Toggle NavBar Visiblity
    function navToggle () {
        $('.nav-dropdown').slideToggle(200)
    }

    

    function generateShortLink () {
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
                $('.user-input').val('');
                return data.json()
            }
        })
        
        // .then((shortLink) => generateHTML(shortLink.result))
        .then((shortLink) => generateHTML(shortLink.result));

        
        //Create the Shortened Link To Screen
        const generateHTML = (shortLink) => {

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
            const createShortenedLink = document.createElement('p');
            createShortenedLink.classList.add('shortened-link');
            createShortenedLink.innerText = shortenedLink;
            createDiv.append(createShortenedLink);

            //Add Copy Button
            const createCopyBtn = document.createElement('button');
            createCopyBtn.classList.add('copy-btn');
            createCopyBtn.innerText = 'Copy';
            createDiv.append(createCopyBtn);

            //Functions 

            function copyShortenedLInk () {
                const tempInputSelection = document.createElement('input');
                tempInputSelection.classList.add('tempSelection');
                tempInputSelection.value = shortenedLink;
                $("body").append(tempInputSelection);
                tempInputSelection.select();
                tempInputSelection.setSelectionRange(0, 99999);
                document.execCommand('copy');
                tempInputSelection.remove();
                
        
                $(createCopyBtn).text('Copied!');
                $(createCopyBtn).css('background-color' , 'var(--bg)');
            }


            //Add eventlistener to copy shortened link
            createCopyBtn.addEventListener('click', copyShortenedLInk);
            createShortenedLink.addEventListener('click', copyShortenedLInk);

            

            

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