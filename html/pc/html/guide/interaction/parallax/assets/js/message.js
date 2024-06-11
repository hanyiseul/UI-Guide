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
			type:'sticky',			heightNum:5,
			scrollHeight:0,
			objs:{
				container : document.querySelector('.section0'),
				msgA : document.querySelector('.section0 .msgA'),
				msgB : document.querySelector('.section0 .msgB'),
			},
			values:{
				msgA_opacity_in: [0,1, {start:0.1, end:0.25}],
				msgA_opacity_out: [1,0, {start:0.35, end:0.5}], 
				msgA_translateY_in: [10, 0, {start:0.1, end:0.25}],
				msgA_translateY_out: [0, -10, {start:0.35, end:0.5}],
				msgB_opacity_in: [0,1, {start:0.55, end:0.75}], 
				msgB_opacity_out: [1,0, {start:0.8, end:0.9}], 
				msgB_translateY_in: [10, 0, {start:0.55, end:0.75}],
				msgB_translateY_out: [0, -10, {start:0.8, end:0.9}],
				//section1 banner
				bannerTrans : [0, -30, {start:0, end:1}],
			}
		},
		{
			//section1
			type:'normal', 
			heightNum:1,
			scrollHeight:0,
			objs:{ 
				container : document.querySelector('.section1'),
				banner : document.querySelector('.section1 .bannerArea__roller'),
			},
			values:{
				bannerTrans : [-30, 0, {start:0, end:1}],
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

			//msgA 애니메이션 효과
			if(scrollRatio <= 0.25){
				//in
				objs.msgA.style.opacity = calcValues(values.msgA_opacity_in, currentYOffset);
				objs.msgA.style.transform = `translate3d(-50%,${calcValues(values.msgA_translateY_in, currentYOffset)}%,0)`;
			}else{
				//out
				objs.msgA.style.opacity = calcValues(values.msgA_opacity_out, currentYOffset);
				objs.msgA.style.transform = `translate3d(-50%,${calcValues(values.msgA_translateY_out, currentYOffset)}%,0)`;
			}
		
			//msgB 애니메이션 효과
			if(scrollRatio <= 0.75){
				//in
				objs.msgB.style.opacity = calcValues(values.msgB_opacity_in, currentYOffset);
				objs.msgB.style.transform = `translate3d(-50%,${calcValues(values.msgB_translateY_in, currentYOffset)}%,0)`;
			}else{
				//out
				objs.msgB.style.opacity = calcValues(values.msgB_opacity_out, currentYOffset);
				objs.msgB.style.transform = `translate3d(-50%,${calcValues(values.msgB_translateY_out, currentYOffset)}%,0)`;
			}

			if(scrollRatio <= 1){
				sceneInfo[1].objs.banner.style.transform = `translateX(${calcValues(values.bannerTrans, currentYOffset)}%)`;
			}

			break;

			case 1: //section1

				//banner
				if(scrollRatio <= 0){
					objs.banner.style.transform = `translateX(${calcValues(values.bannerTrans, currentYOffset)}%)`;
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


