$(document).ready(function () {

  $('.js-burger').on('click', function () {
    $('.js-menu').slideToggle();
  });

  //Accordion
  let prevBtn;
  $('.js-accordion-btn').on('click', function () {
    if (prevBtn === this) {
      $(this).toggleClass('open');
      $(this).next().slideToggle();
    } else {
      $(prevBtn).next().slideUp();
      $(prevBtn).removeClass('open');
      $(this).next().slideDown();
      $(this).addClass('open')
      prevBtn = this;
    }
  })

  //carousel
  $('.js-carousel').slick({
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1
  });



  //filter
  $('.js-filter-link').on('click', function (event) {
    event.preventDefault();

    $('.js-filter-link').removeClass('active');
    $(this).addClass('active');

    let filterType = $(this).data('filter');

    if (filterType === 'all') {
      $('.js-works-item').show();
      return;
    }

    $('.js-works-item').each(function () {
      let dataType = $(this).data('type');

      if (filterType === dataType) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  //Ajax
  $('.js-catalog-btn').on('click', function () {
    $.ajax({
      type: 'POST',
      url: '../jsons/catalog.json',
      data: {
        quantity: 3
      },
      success: function (res) {
        let catalogHTML = createCatalogHtml(res.catalog);

        $('.js-works-list').append(catalogHTML);
      },
      error: function () {
        console.log('не робит');
      }
    });
  });

  function createCatalogHtml(dataArray) {
    let htmlString = '';

    dataArray.forEach(function(item) {
      htmlString = htmlString + `
        <li class="works-item js-works-item" data-type="${item.dataType}">
          <figure class="works-figure">
            <img src="${item.imgUrl}" alt="${item.imgAlt}" class="works-img" >
            <figcaption class="works-img-desc">${item.text}</figcaption>
          </figure>
        </li>`
    });

    return htmlString;
  }


})
