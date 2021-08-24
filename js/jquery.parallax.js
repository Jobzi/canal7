/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function ($) {
  const $window = $(window)
  let windowHeight = $window.height()

  $window.resize(function () {
    windowHeight = $window.height()
  })

  $.fn.parallax = function (xpos, speedFactor, outerHeight) {
    const $this = $(this)
    let getHeight
    let firstTop
    // get the starting position of each element to have parallax applied to it
    function update () {
      $this.each(function () {
        firstTop = $this.offset().top
      })

      if (outerHeight) {
        getHeight = function (jqo) {
          return jqo.outerHeight(true)
        }
      } else {
        getHeight = function (jqo) {
          return jqo.height()
        }
      }

      // setup defaults if arguments aren't specified
      if (arguments.length < 1 || xpos === null) xpos = '50%'
      if (arguments.length < 2 || speedFactor === null) speedFactor = 0.5
      if (arguments.length < 3 || outerHeight === null) outerHeight = true

      // function to be called whenever the window is scrolled or resized

      const pos = $window.scrollTop()

      $this.each(function () {
        const $element = $(this)
        const top = $element.offset().top
        const height = getHeight($element)

        // Check if totally above or totally below viewport
        if (top + height < pos || top > pos + windowHeight) {
          return
        }

        $this.css('backgroundPosition', xpos + ' ' + Math.round((firstTop - pos) * speedFactor) + 'px')
      })
    }

    $window.bind('scroll', update).resize(update)
    update()
  }
})(jQuery)
