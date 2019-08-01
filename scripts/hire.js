var selectedCharacter = 'swe';
var scrolling = false;

$(function () {
    // by default swe is selected
    $('#swe img').css('filter', 'none');

    // add event listeners to the cards on hover
    $('.character-card').on('mouseover', function () {
        // switch to color
        $(this).children('img').css('filter', 'none');
    })
    $('.character-card').on('mouseout', function () {
        // switch to grayscale
        if ($(this).attr('id') != selectedCharacter) {
            $(this).children('img').css('filter', 'grayscale(100%)');
        }
    })

    $('.character-card').on('touchmove', function () {
        scrolling = true;
    })
    $('.character-card').on('click touchend', function () {
        if (!scrolling) {
            // if character selected, unselect previous character
            if (selectedCharacter != null) {
                $('#' + selectedCharacter + ' img').css('filter', 'grayscale(100%)');
            }

            // select the new character
            selectedCharacter = $(this).attr('id');
            $(this).children('img').css('filter', 'none');
        }
        else {
            scrolling = false;
        }
    })

    $('#start-game-button').on('click', function () {
        alert("This feature is in the making! Please visit next week for updates!")
    })
})
