$(function () {

//Functions

    //Toggle NavBar Visiblity
    const navToggle = function () {
        $('.nav-dropdown').slideToggle(200)
    }

//Eventlisteners
    

    //Navbar Toggle
    $('.hamburger').click(navToggle);

        //Remove Hamburger if blured background is clicked
    $('.bg').click(navToggle);



});