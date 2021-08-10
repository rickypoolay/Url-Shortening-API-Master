$(function () {
    

//Functions

    //Toggle NavBar Visiblity
    const navToggle = function () {
        $('.nav-dropdown').slideToggle(200)
    }

    const generateShortLink = function () {
        let numb = 0;
        const userInput = $('.user-input').val();

        const apiData = {
            apiUrl: 'https://api.shrtco.de/v2/shorten?url=',
            userLink: userInput,
        };
        const apiUrl = `${apiData.apiUrl}${apiData.userLink}`
        console.log(apiUrl);
        
        fetch(apiUrl)
        .then((data) => data.json())
        .then((shortLink) => generateHTML(shortLink.result))

        const generateHTML = (shortLink) => {
            console.log(shortLink.short_link);
            const shortenedLink = shortLink.short_link;

            //Add link to list            
            const html = 
            `
            <div class='link-container'>
            <p class='original-link'>${userInput}</p>
            <p class='shortened-link'>${shortenedLink}</p>
            <button class='copy-btn'>Copy</button>
            </div>
            `
            $('.links-list-container').append(html);

            //Eventlistener to copy button
            $('this .copy-btn').click(() => {
                console.log(numb);
                numb++;
            })

        }

    }

//Eventlisteners
    
    //Navbar Toggle
    $('.hamburger').click(navToggle);

        //Remove Hamburger if blured background is clicked
    $('.bg').click(navToggle);

    //Generate Link
    $('.shorten-btn').click(generateShortLink);
});