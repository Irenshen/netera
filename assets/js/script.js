document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".burger")) {
    // burder
    const burger = document.querySelector(".burger");
    const menuWrap = document.querySelector(".menu-wrap");

    burger.addEventListener("click", function () {
      menuWrap.classList.add("menu-active");
    });

    const headerClose = document.querySelector(".header-close");
    headerClose.addEventListener("click", function () {
      menuWrap.classList.remove("menu-active");
    });

    // menu-mobile
    if (window.innerWidth <= 1010) {
      const headerLinks = document.querySelectorAll("header a");
      headerLinks.forEach(function (link) {
        link.addEventListener("click", function () {
          menuWrap.classList.remove("menu-active");
        });
      });
    }
  }

  //burger-account menu
  if (document.querySelector(".account__burger")) {
    document
      .querySelector(".account__burger")
      .addEventListener("click", function () {
        document
          .querySelector(".account__menu-wrap")
          .classList.toggle("opened");
        document.querySelector("body").classList.toggle("modal-open");
        this.classList.toggle("opened");
      });

    document.addEventListener("click", function (event) {
      if (
        !event.target.closest(".account__menu-wrap") &&
        !event.target.closest(".account__burger")
      ) {
        document
          .querySelector(".account__menu-wrap")
          .classList.remove("opened");
        document.querySelector("body").classList.remove("modal-open");
        document.querySelector(".account__burger").classList.remove("opened");
      }
    });
  }

  //password
  if (document.querySelector(".password-input")) {
    const passwordInput = document.querySelector(".password-input");
    const passwordControl = document.querySelector(".password-control");

    passwordControl.addEventListener("click", function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordControl.classList.add("view");
      } else {
        passwordInput.type = "password";
        passwordControl.classList.remove("view");
      }
    });
  }

  //swiper
  if (document.querySelector(".banners-swiper")) {
    let bannersSwiper = new Swiper(".banners-swiper", {
      slidesPerView: 1,
      spaceBetween: 0,
      touchRatio: 1,
      watchOverflow: true,
      watchSlidesVisibility: true,
      slideVisibleClass: "visibleSlide",

      pagination: {
        el: ".swiper-pagination-banners",
        clickable: true,
      },
    });
  }
});

$(document).ready(function () {
  //select
  $(".select").each(function () {
    const _this = $(this),
      selectOption = _this.find("option"),
      selectOptionLength = selectOption.length,
      duration = 150;

    _this.hide();
    _this.wrap('<div class="select"></div>');
    $("<div>", {
      class: "new-select",
      text: _this.children("option:selected").text(),
    }).insertAfter(_this);

    const selectHead = _this.next(".new-select");
    const selectList = $("<div>", {
      class: "new-select__list",
    }).insertAfter(selectHead);

    if (_this.closest(".with-search").length > 0) {
      const searchInput = $("<input>", {
        type: "search",
        placeholder: "Search",
      }).appendTo(selectList);
    }

    const listContainer = $("<div>", {
      class: "new-select__list-container",
    }).appendTo(selectList);

    for (let i = 0; i < selectOptionLength; i++) {
      $("<div>", {
        class: "new-select__item",
        html: $("<span>", {
          text: selectOption.eq(i).text(),
        }),
      })
      .attr("data-value", selectOption.eq(i).val())
      .appendTo(listContainer);
    }

    const selectItem = listContainer.find(".new-select__item");
    selectList.slideUp(0);
    selectHead.on("click", function () {
      if (!$(this).hasClass("on")) {
        $(this).addClass("on");
        selectList.slideDown(duration);

        if (_this.closest(".with-search").length > 0) {
          const searchInput = selectList.find("input[type='search']");
          searchInput.on("keyup", function () {
            const searchTerm = $(this).val().toLowerCase();
            selectItem.hide();
            selectItem.filter(function () {
              return $(this).text().toLowerCase().indexOf(searchTerm) > -1;
            }).show();
          });
        }

        selectItem.on("click", function () {
          let chooseItem = $(this).data("value");

          $("select").val(chooseItem).attr("selected", "selected");
          selectHead.text($(this).find("span").text());
          selectHead.attr("data-value", chooseItem);

          selectList.slideUp(duration);
          selectHead.removeClass("on");
        });
      } else {
        $(this).removeClass("on");
        selectList.slideUp(duration);
      }
    });
  });
});
