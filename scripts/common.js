// SCROLLING FUNCTIONS
// These functions are used so that when clicking a link leads to scrolling on the same page,
// we adjust the vertical scrolling to account for the fixed navbar at the top of the page.

$(document).on('click', 'a[href*="#"]', function () {
    // 'this' refers to the anchor element
    var scrollToID = this.getAttribute('href')

    // if link is coming from another page (ex/'projects.html#line-before-fpga') extract only the id
    if (scrollToID[0] != '#') {
        scrollToID = '#' + (scrollToID.split('#'))[1]
    }

    // save these values in session storage so we can access them across different pages and reloads
    sessionStorage.setItem('scrollToID', scrollToID)
    sessionStorage.setItem('scrollLinkClicked', true)
})

$(window).on('scroll', function () {
    // adjust scrolling unless the link scrolls to the top
    var scrollToID = sessionStorage.getItem('scrollToID')
    var scrollLinkClicked = {
        'true': true,
        'false': false
    }[sessionStorage.getItem('scrollLinkClicked')]

    if (scrollLinkClicked && (scrollToID != '#')) {
        window.scroll(0, $(scrollToID).offset().top - 65)
        sessionStorage.setItem('scrollLinkClicked', false)
    }
})

// only show the alert once in a session
$(document).ready(function () {
    if (sessionStorage.getItem('firstOpen') != 'false') {
        $('#job-alert').attr('class', 'alert alert-dismissable w-100 h-100 fixed-top opening-alert')
        sessionStorage.setItem('firstOpen', 'false')
    }
}) 