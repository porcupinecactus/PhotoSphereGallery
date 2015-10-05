//when the page loads
window.onload = function(){
	//grab all the image tags
	var imgs      = document.getElementsByTagName('img');
	//grab the photosphere div
	var div       = document.getElementById('photosphere');
	//grab test div for debugging
	var test      = document.getElementById('test');
	//create the default for when the page loads
	var viewerPic = '/imgs/pooltest.jpg';


//load Photo sphere viewer for first time
	var PSV = new PhotoSphereViewer({
			panorama: viewerPic,
			container: div,
			navbar: true
	});
//create the onclick event for all image tags on the page
	for(i=0; i < imgs.length; i++){
		changeViewer(imgs[i]);
	};
//function to change the viewer to a new image from one in the gallery
	function changeViewer(imageTag){
		imageTag.addEventListener("click",change);
		imageTag.addEventListener("TouchEnd",change);
		function change(){
			var source = imageTag.src;
			//when you grab the src it isn't formatted right for the viewer this cuts off the htp://localhost:8080.com
			//the first number will change depending on the picture storage location 
			source = source.slice(21,source.length);
			viewerPic = source;
			console.
			//load the viewer with the new picture in the same div
		 	PSV = new PhotoSphereViewer({
				panorama: viewerPic,
				container: div,
				navbar: true
			});
		};
	};
};