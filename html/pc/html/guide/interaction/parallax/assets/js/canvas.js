(() => {
	let yOffset = 0; 
	let prevScrollHeight = 0;	
	let currentScene = 0;
	let enterNewScene = false;
	let acc = 0.2;
	let delayedYOffset = 0;
	let rafId;
	let rafState;

	const sceneInfo = [
		{
			//section0 
			type:'sticky',
			heightNum:12,
			scrollHeight:0,
			objs:{
				container : document.querySelector('.section0'),
				canvas : document.querySelector('.canvasArea .canvas__img'), // 이미지 넣을 canvas 
				context : document.querySelector('.canvasArea .canvas__img').getContext('2d'), // canvas context 요소
				videoImages: [] // 이미지들을 넣어줄 배열
			},
			values:{
				videoImageCount : 300, // 이미지 갯수
				imageSequence: [0, 299], // 이미지 순서
				canvas_opacity: [1, 0, {start: 0.9, end: 1}] // 캔버스가 자연스럽게 사라질 수 있도록 투명도 적용
			}
		},
		{
			//section1
			type:'normal', 
			heightNum:1,
			scrollHeight:0,
			objs:{ 
				container : document.querySelector('.section1'),
			},
			values:{
			}
		},
	]

	function playAnimation(){
		const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentYOffset = yOffset - prevScrollHeight; 
		const scrollHeight = sceneInfo[currentScene].scrollHeight; 
		const scrollRatio = currentYOffset / scrollHeight; 
		
		switch(currentScene){
			case 0: //section0
				let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
				objs.context.drawImage(objs.videoImages[sequence], 0, 0);
				objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

				console.log(sequence);
				if(scrollRatio >= 0){

				}

			break;

			case 1: //section1

			break;
		}
	}

	//canvas 셋팅 함수
	function setCanvasImages(){
		let imgElem; // section0에서 캔버스 들어갈 변수
		for(let i = 0; i< sceneInfo[0].values.videoImageCount; i++){
			imgElem = new Image();
			imgElem.src = `../assets/images/video_img/IMG_${6726 + i}.jpg`; // 스크롤 될때마다 변환될 이미지 
			sceneInfo[0].objs.videoImages.push(imgElem);
		}
	}
	setCanvasImages();


	/******** 공통 스크립트 부분에서 캔버스에서만 추가하는 부분 있음 ***********/

	// 인터렉션 공통 스크립트 부분//

	function setLayout(){
		for(let i=0; i<sceneInfo.length; i++){
			if(sceneInfo[i].type === 'sticky'){
				sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
			} else if(sceneInfo[i].type === 'normal'){
				sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
			}
			sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
		}

		yOffset = window.pageYOffset;
		let totalScrollHeight = 0;
		for(let i=0; i<sceneInfo.length; i++){ 
			totalScrollHeight += sceneInfo[i].scrollHeight;
			if(totalScrollHeight >= yOffset){ 
				currentScene = i;
				
				break;
			}
		}

		document.body.setAttribute('class', `is-show__section${currentScene}`);

		const heightRatio = window.innerHeight / 1080; // canvas 높이를 꽉차게 하기 위해 scale 비율값 계산
		
		/******** 캔버스에서만 추가 ***********/

		// CSS transform을 이용하는 이유는 width height 자체를 바꾸면 캔버스 내부의 요소들 위치를 모두 다시 계산해주면서 다시 그려야 하기 때문에 width와 height를 직접 바꾸는 것보다 성능상 더 유리하고, 계산할 것도 적기 때문
		sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`; // 창사이즈 높이에 맞춰서 캔버스 높이 지정

		/******** 캔버스에서만 추가 ***********/

	}

	function calcValues(values, currentYOffset){
		const scrollHeight = sceneInfo[currentScene].scrollHeight;
		const scrollRatio = currentYOffset / scrollHeight;

		if(values.length === 3){ 
			const partScrollStart = values[2].start * scrollHeight; 
			const partScrollEnd = values[2].end * scrollHeight; 
			const partScrollHeight = partScrollEnd - partScrollStart;	

			if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd ){ 
				rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0]; 
			} else if(currentYOffset < partScrollStart){ 
				rv = values[0];
			} else if(currentYOffset > partScrollEnd){
				rv = values[1];
			}
		
		}else{
			rv = scrollRatio * (values[1] - values[0]) + values[0]; 
		}
		return rv;
	}

	function scrollLoop() {
		enterNewScene = false;
		prevScrollHeight = 0; 
			for (let i = 0; i < currentScene; i++) {
				prevScrollHeight += sceneInfo[i].scrollHeight; 
			}
		
		if (delayedYOffset < prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
		//	document.body.classList.remove('scroll-effect-end');
		}

		if (delayedYOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
			enterNewScene = true;
			if (currentScene === sceneInfo.length - 1) {
			//	document.body.classList.add('scroll-effect-end');
			}
			if (currentScene < sceneInfo.length - 1) {
				currentScene++;
			}
			document.body.setAttribute('class', `is-show__section${currentScene}`);
		}

		if (delayedYOffset < prevScrollHeight) {
			enterNewScene = true;
			if (currentScene === 0) return;
			currentScene--;
			document.body.setAttribute('class', `is-show__section${currentScene}`);
		}

		if (enterNewScene) return;

		playAnimation();
	}

	function loop() {
		delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

		if (!enterNewScene) {
			if (currentScene === 0 || currentScene === 2) {
				const currentYOffset = delayedYOffset - prevScrollHeight;
				const objs = sceneInfo[currentScene].objs;
				const values = sceneInfo[currentScene].values;
				
				/******** 캔버스에서만 추가 ***********/
				let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
				if (objs.videoImages[sequence]) {
					objs.context.drawImage(objs.videoImages[sequence], 0, 0);
				}
				/******** 캔버스에서만 추가 ***********/
			}
		}

		if (delayedYOffset < 1) {
				scrollLoop();
		}

		if ((document.body.offsetHeight - window.innerHeight) - delayedYOffset < 1) {
		    let tempYOffset = yOffset;
		    scrollTo(0, tempYOffset - 1);
		}

		rafId = requestAnimationFrame(loop);

		if (Math.abs(yOffset - delayedYOffset) < 1) {
			cancelAnimationFrame(rafId);
			rafState = false;
		}
	}

	window.addEventListener('load', () => {
		setLayout(); 

		/******** 캔버스에서만 추가 ***********/
		sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
		/******** 캔버스에서만 추가 ***********/

		let tempYOffset = yOffset;
		let tempScrollCount = 0;
		if (tempYOffset > 0) {
				let siId = setInterval(() => {
						scrollTo(0, 0);
						tempYOffset += 5;

						if (tempScrollCount > 20) {
								clearInterval(siId);
						}
						tempScrollCount++;
				}, 20);
			}
			document.body.classList.remove('before-load');

			setLayout();

       window.addEventListener('scroll', () => {
				yOffset = window.pageYOffset; 
				scrollLoop();

  			if (!rafState) {
  				rafId = requestAnimationFrame(loop);
  				rafState = true;
  			}
  		});

  		window.addEventListener('orientationchange', () => {
			scrollTo(0, 0);
			setTimeout(() => {
				window.location.reload();
			}, 500);
  		});
	});
})();


