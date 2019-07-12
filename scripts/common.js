// SCROLLING FUNCTIONS
// These functions are used so that when clicking a link leads to scrolling on the same page,
// we adjust the vertical scrolling to account for the fixed navbar at the top of the page.
var scrollLinkClicked = false
var scrollToID = null

$(document).on('click', 'a[href^="#"]', function () {
    // 'this' refers to the anchor element
    scrollToID = this.getAttribute('href')
    scrollLinkClicked = true
})

$(window).on('scroll', function () {
    // adjust scrolling unless the link scrolls to the top
    if (scrollLinkClicked && (scrollToID != '#')) {
        window.scroll(0, $(scrollToID).offset().top - 57)
        scrollLinkClicked = false
    }
})