/*
* Author: Cameron Kubik
* Date: June 26, 2018
 */


const Website = {
  // Controller object for entire site
  Control: {
    Init: {
      load: function () {
        this.bindGlobalEvents();
      },
      bindGlobalEvents: function () {
        $(".contentSelector").on("click", Website.Control.GlobalEvents.content_controller_click)
      }
    },

    GlobalEvents: {
      content_controller_click: function (e) {
        if ($(e.currentTarget).hasClass("selected")) return;

        const target = $(e.currentTarget),
          page = target.data("pageId"),
          contentId = target.data("contentId"),
          html = Website.Templates[page][contentId];

        // Remove currently selected
        target.closest(".contentController").find(".selected").removeClass("selected");
        // Apply new selection
        target.addClass("selected");
        Page[page].Elements.content.container.html(html);
      }
    }
  },

  Templates: {
    Education: {
      software: $("#software").html(),
      hardware: $("#hardware").html(),
      critical: $("#critical").html()
    },
    SkillSummary: {
      languages: $("#languages").html(),
      cloud: $("#cloud").html(),
      tools: $("#tools").html(),
    }
  },

  load: function () {
    this.Control.Init.load();

    Page.LandingPage.Init.load();
    Page.Profile.Init.load();
    Page.Education.Init.load();
    Page.SkillSummary.Init.load();
    Page.Experience.Init.load();
  }
};

// Page objects should encapsulate page behavior, load, clicks, elements
const Page = {
  LandingPage: {
    Init: {
      load: function () {
        this.bindEvents();
      },
      bindEvents: function () {
        Page.LandingPage.Elements.navArrow.on("click", Page.LandingPage.Events.navArrow_click);
      }
    },
    Elements: {
      page: $("#landingPage"),
      navArrow: $("#navArrow")
    },
    Events: {
      navArrow_click: function () {
        $([document.documentElement, document.body]).animate({
          scrollTop: $("#profile").offset().top
        }, 1000);
      }
    }
  },
  Profile: {
    Init: {
      load: function () {
        this.bindEvents();
      },
      bindEvents: function () {
        const elements = Page.Profile.Elements.Hlink,
          events = Page.Profile.Events;

        elements.email.click(events.email);
        elements.linkedin.click(events.linkedin);
        elements.github.click(events.github);
        elements.instagram.click(events.instagram);
        elements.twitter.click(events.twitter);
      }
    },
    Elements: {
      page: $("#profile"),
      Hlink: {
        email: $("#email_hlink"),
        linkedin: $("#linkedin_hlink"),
        github: $("#github_hlink"),
        instagram: $("#insta_hlink"),
        twitter: $("#twitter_hlink")
      }

    },
    Events: {
      email: function () {
        const address = "cam.kubik@gmail.com",
          subject = "We want to hire you!";

        document.location = `mailto:${address}?subject=${subject}`;
      },
      linkedin: function (e) {
        Utility.open_tab("https://www.linkedin.com/in/cameron-kubik-08602516b");
      },
      github: function (e) {
        Utility.open_tab("https://github.com/cameronkubik");
      },
      instagram: function (e) {
        Utility.open_tab("https://www.instagram.com/accounts/login");
      },
      twitter: function (e) {
        Utility.open_tab("https://twitter.com/login");
      }
    }
  },
  Education: {
    Init: {
      load: function (initialContentId) {
        this.setContent(initialContentId);
      },
      setContent: function (initialContentId) {
        const templates = Website.Templates.Education,
          content = initialContentId ? templates[initialContentId] : templates.software;

        Page.Education.Elements.content.container.html(content);
      }
    },
    Elements: {
      page: $("#education"),
      content: {
        control: $("#education .contentController"),
        container: $("#education .contentContainer")
      }
    },
    Events: {

    }
  },
  SkillSummary: {
    Init: {
      load: function (initialContentId) {
        this.setContent(initialContentId);
      },
      setContent: function (initialContentId) {
        const templates = Website.Templates.SkillSummary,
          content = initialContentId ? templates[initialContentId] : templates.languages;

        Page.SkillSummary.Elements.content.container.html(content);
      }
    },

    Elements: {
      page: $("#skillSummary"),
      content: {
        control: $("#skillSummary .contentController"),
        container: $("#skillSummary .contentContainer")
      }
    },

    Events: {

    }
  },
  Experience: {
    Init: {
      load: function () {
        this.bindEvents();
      },
      bindEvents: function () {
        Page.Experience.Elements.sliders.click(Page.Experience.Events.sliderClick);
      }
    },

    Elements: {
      sliders: $(".slider"),
      photoContainer: $("#photoContainer"),
      indexContainer: $("#photoIndexContainer")
    },

    Events: {
      sliderClick: function (e) {
        const target = $(e.currentTarget),
          self = Page.Experience.Events;
        let direction = "";

        if(target.is("#sLeft")) direction = "left";
        else direction = "right";

        self.slide(direction);
      },
      slide: function (direction) {
        const elements = Page.Experience.Elements;
        let newIdx = 1;

        if (direction === "left") {
          newIdx = Page.Experience.Data.index === 1 ? 4 : Page.Experience.Data.index - 1;
        } else {
          newIdx = Page.Experience.Data.index === 4 ? 1 : Page.Experience.Data.index + 1;
        }

        Page.Experience.Data.index = newIdx;

        elements.photoContainer.find(".selected").removeClass("selected");
        elements.photoContainer.find(`.photoElements[data-order=${newIdx}]`).addClass("selected");

        elements.indexContainer.find(".fas").addClass("far").removeClass("fas");
        elements.indexContainer.find(`i[data-order=${newIdx}]`).addClass("fas").removeClass("far");
      },
    },

    Data: {
      index: 1
    }
  }
};

const Utility = {
  open_tab: function (_url) {
    let url = _url || "";

    window.open(url, "_blank");
  }
};

$(document).ready(function () { Website.load(); });

