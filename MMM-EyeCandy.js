/**
 * Magic Mirror
 * Module: MMM-EyeCandy
 *
 * By Mykle1
 * MIT Licensed.
 */

Module.register("MMM-EyeCandy", {

    // Default module config.
    defaults: {
        style: '1', // 1-56
        maxWidth: "100%", // Adjusts size of images. Retains aspect ratio.
        ownImagePath: '', // Overrides style. Local path or internet URL's.
        updateInterval: 5 * 60 * 1000, // set in config.js
        animationSpeed: 3000,
    },

    start: function() {
        var self = this;

        this.eyesUrls = {};

        // populate the URLs from the CDN
        for(let i=1; i<=56; i++) {
            this.eyesUrls[i.toString()] = `https://madzmagic.b-cdn.net/${i}.jpg`;
        }

        // set update interval
        setInterval(function() {
            self.updateDom(self.config.animationSpeed);
        }, this.config.updateInterval);
    },

    getStyles: function() {
        return ["MMM-EyeCandy.css"];
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");
        var image = document.createElement("img");

        // if an ownImagePath is set, use it
        if (this.config.ownImagePath != '') {
            image.src = this.config.ownImagePath;
        } else {
            // otherwise use the CDN url
            image.src = this.eyesUrls[this.config.style];
        }

        image.className = "photo";
        image.style.maxWidth = this.config.maxWidth;
        wrapper.appendChild(image);

        return wrapper;
    }
});
