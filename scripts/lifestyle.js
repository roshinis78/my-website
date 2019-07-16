// Script to change display of lifestyle cards for different screen sizes
// extra small and small screens - display as carousel
// medium screens and above - display in a row

$(document).ready(function () {
    // when the page loads, adjust the card display form as needed
    adjustLifestyleCardDisplay()
})

// when the page resizes, adjust the card display form if necessary
$(window).on('resize', adjustLifestyleCardDisplay)

function adjustLifestyleCardDisplay() {
    // if not already expanded, expand the carousel to a row of cards for medium screens and above
    if (($('#lifestyle-cards').attr('class') == 'carousel-inner') && ($(window).width() >= 768)) {
        // remove the class, data-ride, and data-interval attributes from the div with class 'carousel'
        $('.carousel').removeAttr('data-ride')
        $('.carousel').removeAttr('data-interval')
        $('.carousel').removeClass()

        // change the class of the div with class 'carousel-inner' to 'card-row'
        $('.carousel-inner').attr('class', 'card-row')

        // remove the class attribute from any elements with class 'carousel-item'
        $('.carousel-item').removeClass()
    }

    // else if not already condensed, condense the row of cards to a carousel for xs and small screens
    else if (($('#lifestyle-cards').attr('class') == 'card-row') && ($(window).width() < 768)) {
        location.reload()
    }
}

// touch/click event listeners for lifestyle cards
$('.card').on('touchend', function () {
    // if showing back of card, switch to show front
    if ($(this.firstElementChild).css('display') == 'none') {
        $(this.firstElementChild).css('display', 'flex')
        $(this.firstElementChild.nextElementSibling).css('display', 'none')
    }
    // else if showing front of card, switch to show back
    else {
        $(this.firstElementChild).css('display', 'none')
        $(this.firstElementChild.nextElementSibling).css('display', 'flex')
    }
})

