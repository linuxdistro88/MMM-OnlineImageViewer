/* global Module */

Module.register("MMM-OnlineImageViewer",{
	defaults: {
		opacity: 1,
		animationSpeed: 500,
		updateInterval: 60000,
		maxWidth: "100%",
		maxHeight: "100%",
		showAll: false,
		random: false,
		numColumns: 1
	},

	start: function() {
		var self = this;
		this.images = this.config.images;
		this.loaded = false;
		this.currentIndex = 0;

		// Schedule update timer
		setInterval(function() {
			self.updateDom(self.config.animationSpeed);
			self.currentIndex = (self.currentIndex + 1) % self.images.length;
		}, this.config.updateInterval);
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		wrapper.style.display = "grid";
		
		var photoImageUrl = this.images[this.currentIndex];

		this.appendImage(wrapper, photoImageUrl);
		
		return wrapper;
	},

	appendImage: function(wrapper, photoImageUrl) {
		var img = document.createElement("img");
		img.src = photoImageUrl + "?t=" + new Date().getTime();
		img.style.maxWidth = this.config.maxWidth;
		img.style.maxHeight = this.config.maxHeight;
		img.style.opacity = this.config.opacity;
		img.style.position = "absolute";
		img.style.top = "50%";
		img.style.left = "50%";
		img.style.transform = "translate(-50%, -50%)";
		wrapper.appendChild(img);
	},

	getScripts: function() {
		return ["MMM-OnlineImageViewer.css"]
	},
});
