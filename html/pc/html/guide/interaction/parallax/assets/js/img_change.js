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
			//0
			type:'sticky',
			heightNum:4,
			scrollHeight:0,
			objs:{
				container : document.querySelector('.section0'),
				sticky : document.querySelector('.section0 .is-sticky'),
				imgCon : document.querySelector(".section0 .img__content.pc"),
				imgCon2 : document.querySelector(".section0 .img__content.mo"),
				imgArea : document.querySelector(".section0 .is-scroll"),
				imgA : document.querySelector(".section0 .imgArea__bg"),
				imgB : document.querySelector(".section0 .imgArea__bg .img__leftArea"),
				imgC : document.querySelector(".section0 .img__after img"),
				imgD : document.querySelector(".section0 .img__after"),
				imgText : document.querySelector(".section0 .imgArea__bg .img__message"),
				imgText2 : document.querySelector(".section0 .img__content.mo .img__message"),
			},
			values: {
				imgCon_opacity: [0, 1, {start:0.05, end:0.15}],
				imgCon2_opacity: [0, 1, {start:0, end:0.2}],
				imgA_clip: [0, 100, {start:0.25, end:0.7}],
				imgD_height: [0, 100, {start:0.1, end:0.4}],
				imgD_translate: [0, 300, {start:0.45, end:0.65}],
				imgText_opacity: [0, 1, {start:0.35, end:0.55}],
				imgText_transition: [-30, -50, {start:0.35, end:0.55}],
				imgText2_opacity: [0, 1, {start:0.55, end:0.65}],
				imgText2_transition: [-30, -50, {start:0.55, end:0.65}],
				title3_opacity: [0, 1, {start:0.85, end:1}],
				title3_transition: [20, 0, {start:0.85, end:1}],
				title3_opacity_mo: [0, 1, {start:0.75, end:0.9}],
				title3_transition_mo: [20, 0, {start:0.75, end:0.9}],
				imgB_left: [0, 160,{start:0.7, end:0.9}],
				imgText_left: [0, 160,{start:0.7, end:0.9}],
			},
		}
	]

	function playAnimation(){
		const objs = sceneInfo[currentScene].objs;
		const values = sceneInfo[currentScene].values;
		const currentYOffset = yOffset - prevScrollHeight; 
		const scrollHeight = sceneInfo[currentScene].scrollHeight; 
		const scrollRatio = currentYOffset / scrollHeight; 
		
		switch(currentScene){
			case 0:

			//opacity 세팅
			objs.imgCon.style.opacity = calcValues(values.imgCon_opacity, currentYOffset);
			objs.sticky.style.position ="fixed";
			objs.sticky.style.transition = "0.3s all"
			objs.imgA.style.clip = `rect(0, 0vw, 100vh, 0)`; 
			objs.container.style.background = "transparent";
		

			//이미지 변환 애니메이션
			if(scrollRatio >= 0.2){
				objs.imgA.style.clip = `rect(0, ${calcValues(values.imgA_clip, currentYOffset)}vw, 100vh, 0)`; 
			} 

			if(scrollRatio >= 0.35){
				objs.imgText.style.opacity = calcValues(values.imgText_opacity, currentYOffset);
				objs.imgText.style.transform = `translate3d(-50%, ${calcValues(values.imgText_transition, currentYOffset)}%, 0)`;
			} 

			if(scrollRatio >= 0.6){
				objs.imgB.style.left = `${calcValues(values.imgB_left, currentYOffset)}%`
			}
			if(scrollRatio >= 0.9){
				objs.sticky.style.position = "sticky";
				objs.sticky.style.position ="relative";
				objs.container.style.background = "black";
			} 

			//모바일
			if(window.innerWidth < 768){
				//section1 비디오 고정 해제
				objs.container.style.position="relative"

				objs.imgText2.style.opacity = "0";

				objs.imgCon2.style.opacity = calcValues(values.imgCon2_opacity, currentYOffset);

				objs.imgC.style.transform = `translateY(0%)`; 

				if(scrollRatio >= 0.1){
					objs.imgD.style.height = `${calcValues(values.imgD_height, currentYOffset)}%`; 
				} 
				if(scrollRatio > 0.4){
					objs.imgC.style.transform = `translateY(-${calcValues(values.imgD_translate, currentYOffset)}%)`; 
				} 

				if(scrollRatio >= 0.5){
					objs.sticky.style.position = "fixed";
					objs.imgText2.style.opacity = calcValues(values.imgText2_opacity, currentYOffset);
					objs.imgText2.style.transform =  `translate3d(0, ${calcValues(values.imgText2_transition, currentYOffset)}%, 0)`;
				} 
				if(scrollRatio >= 0.7){
					objs.sticky.style.position = "sticky";
				} 
			}
		
			break;
		}
	}


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

		const heightRatio = window.innerHeight / 1080;
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


