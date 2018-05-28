const Carousel = function(options)
{
	let self = this
	window.onload = function() {
		self.init(options)
	}
}

Carousel.prototype.init = function(options)
{
	this.interval = this.getInterval(options)
	this.slideContainer = document.getElementById('carouselContainer')
	this.slideWrap = this.slideContainer.getElementsByClassName('carousel-elements')[0]
	this.slides = this.getSlides()
	this.titleWrap = this.slideContainer.getElementsByClassName('carousel-titles')[0]
	this.titles = this.getTitles()
	this.currentSlide = 0
	this.width = this.slideContainer.offsetWidth
	this.height = this.slideContainer.scrollHeight
	this.timer
	this.nav = {
		left: this.getNavLeft(),
		right: this.getNavRight()
	}

	this.styleElements()

	if (this.interval) {
		this.heartbeat()
	}
}

Carousel.prototype.styleElements = function()
{
	this.containerWidth()
	this.navMiddle()
	this.setTitlePosition()
	this.setSlidePosition()

	for (let i = 0; i < this.titles.length; i++) {
		this.titles[i].style.width = this.width + 'px'
		this.slides[i].style.width = (this.width / 3) + 'px'
		//this.titles[i].style.height = this.height + 'px'
	}
}

Carousel.prototype.navMiddle = function()
{
	let navHeight = this.nav.left.offsetHeight

	this.nav.left.style.top = this.nav.right.style.top = ((this.height / 2) - (navHeight / 2)) + 'px'
}

Carousel.prototype.containerWidth = function()
{
	this.slideContainer.getElementsByClassName('carousel-title-container')[0].style.width = this.width * this.titles.length
	this.slideContainer.getElementsByClassName('carousel-container')[0].style.width = this.width * this.slides.length
}

Carousel.prototype.heartbeat = function()
{
	this.timer = setInterval(() => {
		this.move()
	}, this.interval)
}

Carousel.prototype.reset = function()
{
	clearInterval(this.timer)
	this.heartbeat()
}

Carousel.prototype.move = function(direction)
{
	if (typeof direction === 'undefined' || direction === 'rgt') {
		this.currentSlide = this.currentSlide + 1
	} else {
		this.currentSlide = this.currentSlide - 1
	}

	if (this.currentSlide > (this.slides.length -1)) {
		this.currentSlide = 0
	} else if (this.currentSlide < 0) {
		this.currentSlide = this.slides.length -1
	}

	this.setTitlePosition()
	this.setSlidePosition()
}

Carousel.prototype.setTitlePosition = function()
{
	this.titleWrap.style.transform = "translateX(-" + (this.currentSlide * this.width) + "px)"
}

Carousel.prototype.setSlidePosition = function()
{
	let width = this.width / 3
	let position = '-' + ((this.currentSlide * width) - width)

	if (this.currentSlide === 0) {
		position = (this.currentSlide * width) + width
	}

	this.rotateSlides()

	this.slideWrap.style.transform = "translateX(" + (position) + "px)"
	this.slides[this.currentSlide].style.transform = "rotate(45deg)"
}

Carousel.prototype.rotateSlides = function()
{
	for (let i = 0; i < this.slides.length; i++) {
		if (i === this.currentSlide) {
			this.slides[this.currentSlide].style.transform = "rotate(45deg)"
		} else {
			this.slides[i].style.transform = "rotate(0deg)"
		}
	}
}

Carousel.prototype.getSlides = function()
{
	let slides = document.getElementsByClassName('carousel-element')

	if (typeof slides === 'undefined') {
		console.error('Error: No slides could not be found. Add an element with the class "carousel-element"')
	}
	
	return slides
}

Carousel.prototype.getTitles = function()
{
	let elements = document.getElementsByClassName('carousel-title')

	if (typeof elements === 'undefined') {
		console.error('Error: No titles could not be found. Add an element with the class "carousel-title"')
	}
	
	return elements
}

Carousel.prototype.getNavLeft = function()
{
	let nav = document.getElementsByClassName('carousel-left')[0]

	if (typeof nav === 'undefined') {
		console.error('Error: Left navigation could not be found. Add an element with the class "carousel-left"')
	}

	nav.addEventListener('click', () => { this.clickLeft(this) })
	
	return nav
}

Carousel.prototype.getNavRight = function()
{
	let nav = document.getElementsByClassName('carousel-right')[0]

	if (typeof nav === 'undefined') {
		console.error('Error: Right navigation could not be found. Add an element with the class "carousel-right"')
	}

	nav.addEventListener('click', () => { this.clickRight(this) })
	
	return nav
}

Carousel.prototype.clickLeft = function() {
	this.reset()
	this.move('lft')
}

Carousel.prototype.clickRight = function() {
	this.reset()
	this.move('rgt')
}

Carousel.prototype.getInterval = function(options)
{
	if (typeof options === 'undefined' || typeof options.interval === 'undefined') {
		return false
	}

	let interval = parseInt(options.interval)

	if (isNaN(interval)) {
		console.error('Warning: the Carousel interval option should be an int. Default 5000 interval will be used.')
		return 5000
	}

	return options.interval
}