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
        // remove the class and data-ride attributes from the div with class 'carousel'
        $('.carousel').removeAttr('data-ride')
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
$('.front').on('touchstart', function () {
    $(this).css('display', 'none')
    $(this.nextElementSibling).css('display', 'flex')
})

$('.back').on('touchend', function () {
    $(this).css('display', 'none')
    $(this.previousElementSibling).css('display', 'flex')
})