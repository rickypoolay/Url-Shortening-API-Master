$(function () {
let linksCounter = 0;

//Functions

    //Toggle NavBar Visiblity
    const navToggle = function () {
        $('.nav-dropdown').slideToggle(200)
    }

    const generateShortLink = function () {

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

            //Set button to display ' Shortening... '
            $('.shorten-btn').text('Shortening...');

            //Shortened link
            const shortenedLink = shortLink.short_link;
            console.log(shortenedLink);

            //Add link to list            
            const html = 
            `
            <div class='link-container link${linksCounter}'>
            <p class='original-link'>${userInput}</p>
            <p class='shortened-link'>${shortenedLink}</p>
            <button class='copy-btn'>Copy</button>
            </div>
            `
            //Add Html to Container
            $('.links-list-container').append(html);

            //Eventlistener to copy button
            $(`.link-list-container link${linksCounter} .copy-btn`).click(() => {
                console.log('yooo');
            })

            $('.shorten-btn').text('Shorten It!');
        }

        //Reset Button Text
        

    }

//Eventlisteners
    
    //Navbar Toggle
    $('.hamburger').click(navToggle);
    $('.bg').click(navToggle);

    //Generate Link
    $('.shorten-btn').click(generateShortLink, );
});