# arrowcarousel
# Cool double carousel

A double carousel merged in one for your products

### Installing

Include the CSS file in your \<head> tag
```html
<link rel="stylesheet" href="assets/css/doublecarousel.css">
```

Include the script right before the end of the \<body> tag

```html
<script src="assets/js/doublecarousel.js"></script>
```

Right after the include, start the app

```javascript
<script src="assets/js/doublecarousel.js"></script>
<script>
	let carousel = new Carousel()
</script>
```
### Configuration
Configuring the app
```javascript
<script src="assets/js/doublecarousel.js"></script>
<script>
	let carousel = new Carousel({
		id: 'carouselContainer', // Required. This is the element ID of the carousel
		interval: 5000 // Optional. The interval to which the carousel changes page
	})
</script>
```
To ensure the good functioning of the script, please follow this HTML structure for the carousel.

```html
<div id="{ your ID }">

	<div class="carousel-titles">
		<div class="carousel-title-container">	
			<div class="carousel-title">
				<h2>Title 1</h2>
			</div>
		</div>
	</div>

	<div class="btns">
		<button class="btn-cta btn-secondary">Learn More</button>
		<button class="btn-cta btn-primary">Buy at $99.99</button>
	</div>

	<div class="carousel-elements">
		<div class="carousel-container">
			<div class="carousel-element">
				<div class="inner-slide">
					<img src="http://lorempicsum.com/futurama/350/200/1" alt="">
				</div>
			</div>
		</div>
	</div>

	<div class="carousel-left"><img src="assets/img/chevron-left.svg" alt="Left"></div>
	<div class="carousel-right"><img src="assets/img/chevron-right.svg" alt="Right"></div>

</div>
``` 

## Authors

* **Martin Gagné** - *Initial work* - [martin_gagne@outlook.com](mailto:martin_gagne@outlook.com)