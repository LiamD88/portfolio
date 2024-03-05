function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
  const images = document.querySelectorAll('img');
  function checkSlide(ev) {
    images.forEach(img => {
      //image's halfway point
      const slideInAt = (window.scrollY + window.innerHeight) - img.height / 2;
      //image's bottom
      const imgBottom = img.offsetTop + img.height;
      const isHalfShown = slideInAt > img.offsetTop;
      const isNotScolledPast = window.scrollY < imgBottom;
      if(isHalfShown && isNotScolledPast) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', debounce(checkSlide));