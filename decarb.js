$(document).ready(function () {
  console.log("ready!");

  const swiperElement = document.querySelector(".myswiper");
  const swiperWrapper = swiperElement.querySelector(".swiper-wrapper");
  const swiperSlides = swiperElement.querySelectorAll(".swiper-slide");
  swiperSlides.forEach((slide, _) => {
    const clonedSlide = slide.cloneNode(true);
    clonedSlide.classList.add("swiper-cloned-slide");
    swiperWrapper.appendChild(clonedSlide);
  });

  var swiper = new Swiper(".myswiper", {
    slidesPerView: 1,
    spaceBetween: 80,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      480: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 3,
      },
    },
  });

  $(function () {
    var links = $(".tabs-menu a.tab-link");
    var randomNum = Math.floor(Math.random() * links.length);
    //var randomNum = 5;
    // links.get(randomNum).click();
  });

  var tabs = $(".tabs-menu .tab-link");
  var currentIndex = 0;
  var interval = 3000; // time in milliseconds

  var tabCycle;

  function clickNextTab() {
    tabs.eq(currentIndex).trigger("click");
    currentIndex = (currentIndex + 1) % tabs.length;
  }

  $(".tabs-menu").on("mouseover touchstart", function () {
    console.log("got here");
    clearInterval(tabCycle);
  });

  function startTabCycle() {
    if (window.matchMedia("(min-width: 991px)").matches) {
      tabCycle = setInterval(clickNextTab, interval);
    }
  }

  function stopTabCycle() {
    if (tabCycle) {
      clearInterval(tabCycle);
    }
  }

  // Start the cycle when the page loads
  startTabCycle();

  // Listen for window resize to start/stop the cycle based on screen size
  window.addEventListener("resize", () => {
    stopTabCycle();
    startTabCycle();
  });

  // Start

  // Function to remove all classes from the specified elements
  function removeAllClasses() {
    const elementIds = [
      "fans-billboard-green",
      "recycle",
      "recycle-leafs",
      "green-leaf",
      "green-data",
      "solar-panels",
      "car",
      "car-green",
      "plane",
      "solar",
      "truck",
      "truck-box",
      "truck-2",
      "building",
      "boxes",
      "bottom-truck",
      "c02",
      "co2-green",
      "h2",
      "h2-can",
      "ship",
      "laptop",
      "cloud",
      "crane",
      "fans-billboard",
      "fan",
      "fresh-air",
      "wifi-building",
      "wifi",
      "wind-turbines",
      "green-tank",
      "black-fill-2",
      "green-grass",
      "roads",
      "road-lines",
    ];

    // Iterate over element IDs and remove all classes from each element
    elementIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        // Remove all classes from the element
        while (element.classList.length > 0) {
          element.classList.remove(element.classList.item(0));
        }
      }
    });
  }

  // Define setTan function outside of event listener to ensure it's accessible
  function setTan(excludeList) {
    const elementIds = [
      "fans-billboard-green",
      "recycle",
      "recycle-leafs",
      "green-leaf",
      "green-data",
      "solar-panels",
      "car",
      "car-green",
      "plane",
      "solar",
      "truck",
      "truck-box",
      "truck-2",
      "building",
      "boxes",
      "bottom-truck",
      "c02",
      "co2-green",
      "h2",
      "h2-can",
      "ship",
      "laptop",
      "cloud",
      "crane",
      "fans-billboard",
      "fan",
      "fresh-air",
      "wifi-building",
      "wifi",
      "wind-turbines",
      "green-tank",
      "black-fill-2",
      "green-grass",
      "roads",
      "road-lines",
    ];

    // Iterate over element IDs and add class "tan-fill", excluding those in excludeList
    elementIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element && !excludeList.includes(id)) {
        element.classList.add("tan-fill");
      }
    });
  }

  // Select all elements with class "sectors_sector"
  const sectors = document.querySelectorAll(".sectors_sector");

  // Select all elements with class "sectors_sector_content"
  const sectorContents = document.querySelectorAll(".sectors_sector_content");

  // Track if this is the first click
  let isFirstClick = true;

  // Function to hide all sector contents with fade-out effect
  function hideAllContents(callback) {
    let completed = 0;
    sectorContents.forEach((content) => {
      if (content.classList.contains("visible")) {
        content.classList.remove("visible");
        content.addEventListener("transitionend", function handler() {
          content.style.display = "none";
          content.removeEventListener("transitionend", handler);
          completed++;
          if (
            completed === sectorContents.length &&
            typeof callback === "function"
          ) {
            callback();
          }
        });
      } else {
        completed++;
      }
    });

    if (completed === sectorContents.length && typeof callback === "function") {
      callback();
    }
  }

  // Function to show the matching sector content with fade-in effect
  function showContent(sectorData) {
    const matchingContent = document.querySelector(
      `.sectors_sector_content[data-sector='${sectorData}']`
    );
    if (matchingContent) {
      matchingContent.style.display = "block";
      setTimeout(() => {
        console.log(`Showing content for ${sectorData}`);
        matchingContent.classList.add("visible");
      }, 10); // Slight delay to trigger the transition
    }
  }

  // Iterate over each sector element
  sectors.forEach((sector) => {
    const infographic = document.querySelector(".inforgraphic_container");

    window.addEventListener("resize", function () {
      infographic.scrollLeft = infographic.scrollWidth * 0;
    });

    // Add click event listener to each sector element
    sector.addEventListener("click", function () {
      if (window.innerWidth < 991) {
        const adjustValue = sector.getAttribute("data-mobile-adjust");
        infographic.scrollLeft = infographic.scrollWidth * adjustValue;
      }

      removeAllClasses();

      // Remove the class "active" from all sectors
      sectors.forEach((s) => s.classList.remove("active"));
      // Add the class "active" to the clicked sector element
      this.classList.add("active");

      // Get the data-sector attribute from the clicked element
      const sectorData = this.getAttribute("data-sector");

      // Hide all sector contents and show the new content after hiding
      if (isFirstClick) {
        // On first click, just remove the visible class without transition
        const initiallyVisible = document.querySelector(
          ".sectors_sector_content.visible"
        );
        if (initiallyVisible) {
          initiallyVisible.classList.remove("visible");
          initiallyVisible.style.display = "none";
        }
        isFirstClick = false;
        showContent(sectorData);
      } else {
        hideAllContents(() => {
          console.log(`Hiding all contents for ${sectorData}`);
          showContent(sectorData);
        });
      }

      // Use switch statement to handle different sectorData values
      switch (sectorData) {
        case "focus":
          break;

        case "mobility":
          var excludeList = ["car", "car-green", "plane", "truck-2", "ship"];
          // Call setTan function with excludeList
          setTan(excludeList);
          break;

        case "carbon-products":
          var excludeList = ["truck", "truck-box", "boxes", "building"];
          // Call setTan function with excludeList
          setTan(excludeList);
          break;

        case "carbon-capture":
          // Define excludeList for "mobility" sector
          var excludeList = [
            "c02",
            "co2-green",
            "fresh-air",
            "fan",
            "fans-billboard-green",
            "fans-billboard",
            "building",
          ];
          // Call setTan function with excludeList
          setTan(excludeList);
          break;

        case "carbon-management":
          var excludeList = ["c02", "co2-green", "recycle", "green-leaf"];
          // Call setTan function with excludeList
          setTan(excludeList);
          break;

        case "digital":
          var excludeList = ["wifi", "laptop", "cloud", "green-data"];
          // Call setTan function with excludeList
          setTan(excludeList);
          break;

        case "next-gen":
          // Define excludeList for "mobility" sector
          var excludeList = [
            "solar",
            "wind-turbines",
            "green-grass",
            "h2",
            "h2-can",
          ];
          // Call setTan function with excludeList
          setTan(excludeList);
          break;

        default:
          // Default behavior if no match
          console.log("Unknown sectorData:", sectorData);
          break;
      }
    });
  });

  // End
});

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".js-road");
  let currentIndex = 0;
  const completedSections = new Set();

  // Function to animate the dashes
  function animateDash(section, callback) {
    const svgElement = section.querySelector("svg");
    let dashes = svgElement.querySelectorAll("path");
    dashes = Array.from(dashes).reverse(); // Reverse the order of the dashes
    let index = 0;

    function animate() {
      if (index < dashes.length) {
        dashes[index].classList.add("path--animated");
        index++;
        setTimeout(animate, 50); // Adjust the interval as needed
      } else if (callback) {
        completedSections.add(section); // Mark this section as completed
        callback();
      }
    }

    // animate();
  }

  // Function to check if the previous section is completed
  function isPreviousSectionCompleted(index) {
    if (index === 0) return true; // No previous section for the first section
    return completedSections.has(sections[index - 1]);
  }

  // Intersection Observer setup
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sectionIndex = Array.from(sections).indexOf(entry.target);
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.2 &&
          isPreviousSectionCompleted(sectionIndex)
        ) {
          observer.unobserve(entry.target); // Stop observing the current section
          animateDash(entry.target, () => {
            currentIndex++;
            if (sections[currentIndex]) {
              observer.observe(sections[currentIndex]); // Start observing the next section
            }
          });
        }
      });
    },
    { threshold: [0.2] }
  );

  // Start observing the first section
  if (sections[currentIndex]) {
    observer.observe(sections[currentIndex]);
  }
});

$(document).ready(function () {
  let currentUrl = "";

  function showPopup() {
    $("#external-link-popup").show();
    $("body").addClass("popup-active");
  }

  function hidePopup() {
    $("#external-link-popup").hide();
    $("body").removeClass("popup-active");
  }

  $('a[target="_blank"]').click(function (e) {
    e.preventDefault();
    currentUrl = $(this).attr("href");
    showPopup();
  });

  $("#continue-button").click(function () {
    hidePopup();
    window.open(currentUrl, "_blank");
  });

  $("#cancel-button").click(function () {
    hidePopup();
  });
});

$(document).ready(function () {
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function showPopup() {
    $("#investor-popup").show();
    $("body").addClass("popup-active");
  }

  function hidePopup() {
    $("#investor-popup").hide();
    $("body").removeClass("popup-active");
  }

  if (!getCookie("investor_agreed")) {
    showPopup();
  }

  $("#agree-button").click(function () {
    setCookie("investor_agreed", "true", 30);
    hidePopup();
  });

  $("#disagree-button").click(function () {
    window.location.href = "https://www.blackrock.com/us/individual"; // Replace with your redirect URL
  });
});
