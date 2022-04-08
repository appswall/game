var AllLoaded = false;
var MenuSet = false;

var container = null;
var canvas = null;			

var left = null;	
var right = null;
var down = null;
var like = null;
var menu = null;
var menu_left = null;

var focusd = null;

var downSize = 90;
var LeftRightIsSet = false;
var LikesIsSet = false;
var LikesIsShow = false;

var leftad = null;	
var rightad = null;
var downad = null;

function cl(m,d=''){
	if(d!=null && d.length>0)  m+=': '+JSON.stringify(d);
	console.log('PAGE: ' + m);
}

function detectWebGLContext () {
	// Create canvas element. The canvas is not added to the
	// document itself, so it is never displayed in the
	// browser window.
	var glcanvas = document.createElement("canvas");
	// Get WebGLRenderingContext from canvas element.
	var gl = glcanvas.getContext("webgl")
	  || glcanvas.getContext("experimental-webgl");
	// Report the result.
	if (gl && gl instanceof WebGLRenderingContext) {
	  glcanvas.remove();
	  return true;
	} else {
	  //paragraph.textContent = 
	  alert("Р’Р°С€ Р±СЂР°СѓР·РµСЂ РЅРµ РїРѕРґРґРµСЂР¶РёРІР°РµС‚ WebGL! РџРѕРїСЂРѕР±СѓР№С‚Рµ РѕР±РЅРѕРІРёС‚СЊ РµРіРѕ РёР»Рё РёСЃРїРѕР»СЊР·СѓР№С‚Рµ РґСЂСѓРіРѕР№.");
		return false;
	}
}


function addevents() {
	if(window.addEventListener) {
		// Handle window's `load` event.		
		//canv.addEventListener('blur', function(){ setTimeout(cfocus('onblur'),1000); cl('canv blur l',''); }, false);
		//window.addEventListener('blur', function(){ setTimeout(cfocus('blur l'),1000); }, false);		
		window.addEventListener('focus', function(){ cfocus('focus 1'); }, false);
		window.addEventListener('deviceorientation', function(){ setTimeout(cfocus('deviceorientation l'),1000); }, false);
		window.addEventListener('orientationchange', function(){ setTimeout(cfocus('orientationchange l'),1000); }, false);
		window.addEventListener('resize', function(){ cfocus('resize l'); }, false);
		window.addEventListener('fullscreenchange', function(){ cfocus('onfullscreenchange l'); }, false);
	}
	else if(window.attachEvent) {
		// Handle window's `load` event.
		// Wire up the `focus` and `blur` event handlers.
		//canv.attachEvent('onblur', function(){ setTimeout(cfocus('onblur'),1000); cl('canv onblur',''); }, false);
		//window.attachEvent('onblur', function(){ setTimeout(cfocus('onblur'),1000); }, false);
		window.attachEvent('onfocus', function(){ cfocus('onfocus 2'); }, false);
		window.attachEvent('onresize', function(){ cfocus('onresize 2'); }, false);
		window.attachEvent('ondeviceorientation', function(){ setTimeout(cfocus('deviceorientation 2'),1000); }, false);
		window.attachEvent('onorientationchange', function(){ setTimeout(cfocus('orientationchange 2'),1000); }, false);
		window.attachEvent('onfullscreenchange', function(){ cfocus('onfullscreenchange 2'); }, false);
	}
	else {		
		// Wire up the `focus` and `blur` event handlers.
		//canv.onblur = function(){ setTimeout(cfocus('onblur'),1000); cl('canv onblur',''); };
		//window.onblur = function(){ setTimeout(cfocus('onblur w'),1000); };
		window.onfocus = function(){ cfocus('onfocus 3'); };
		window.ondeviceorientation = function(){ setTimeout(cfocus('deviceorientation 3'),1000); };
		window.onorientationchange  = function(){ setTimeout(cfocus('orientationchange 3'),1000); };
		window.onresize = function(){ cfocus('onresize 3'); };
		window.onfullscreenchange = function(){ cfocus('onfullscreenchange 3'); };			
	}
	
	//container.addEventListener("mousedown", cfocus('unitycontainer click'), false);
	//canvas.addEventListener("mousedown", onMouseDown, false);
	
	//cfocus('addevents');
}

function reload(tm=1000) {
	setTimeout(function(){ window.location.reload(); },tm);
}

function GetUData() {	
	udatasend = JSON.stringify(udata);
	console.log(udatasend);
	SendToUnity("udata", udatasend);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //РњР°РєСЃРёРјСѓРј РЅРµ РІРєР»СЋС‡Р°РµС‚СЃСЏ, РјРёРЅРёРјСѓРј РІРєР»СЋС‡Р°РµС‚СЃСЏ
}

function LoadScripts(ver) {
	if(detectWebGLContext()) {
		//udata.yaashow=0;
		InitVars();
		
		var scr = dhtmlLoadScript(srvUrl+"scripts/share.js?v="+ver);
		scr.onload = function() { 		
			//cfocus('LoadScripts');
			scr = dhtmlLoadScript(srvUrl+"scripts/unity-webview.js?v="+ver);
			scr.onload = function() {  
				scr = dhtmlLoadScript(srvUrl+"scripts/blocks_js.js?v="+ver);
				scr.onload = function() {
					
					LoadSocial(udata.network);
				}	
			};		
		}
	}
}

function InitVars() {
	back = document.querySelector(".back");

	//back.style.width =screen.width+ "px";
	//back.style.height =screen.height+ "px";
	//back.style.width =window.outerWidth+ "px";
	//back.style.height =window.outerHeight+ "px";
	//back.style.top =(window.outerHeight-window.innerHeight)+ "px";
	//back.style.down ="0px";
	container = document.querySelector("#unitycontainer");
	canvas = document.querySelector("#unitycanvas");
	focusd = document.querySelector("#focusd");
	resize();
	left = document.querySelector(".left");	
	right = document.querySelector(".right");
	down = document.querySelector(".down");
	
	like = document.querySelector(".klass");
	loading = document.querySelector(".unity-loading-bar");
	loadingBar = document.querySelector(".unity-progress-bar-empty");
	progressBarFull = document.querySelector(".unity-progress-bar-full");	
	logo = document.querySelector(".logo");
	
	menu = document.querySelector(".menu");
	if(udata.network!=5) 
		menu_left = document.querySelector(".menu_left");
}

function ResetVars() {
	logo=null;
	loading.remove(); loading=null;
	back.remove(); back=null;
}

function LoadSocial(net_id=0) {
	if(net_id==5) {
		//----------------YA-----------------------------------------------
		let script = dhtmlLoadScript(srvUrl+"scripts/ya_js.js?v="+ver); 
		script.onload = function() { YA_Prepare(true);	}
	} else {			
		let params = (new URL(document.location)).searchParams; 	
		//----------------VK-----------------------------------------------
		var viewer_id=params.get("viewer_id"); 
		var AccessToken = params.get("access_token");
		if(viewer_id!=null) { 
			let script = dhtmlLoadScript(srvUrl+"scripts/vk_js.js?v="+ver);
			script.onload = function() { VK_Prepare(viewer_id,AccessToken); };
		}
		//----------------MM-----------------------------------------------
		else {
			viewer_id=params.get("vid");
			if(viewer_id!=null) {
				let script = dhtmlLoadScript(srvUrl+"scripts/mm_js.js?v="+ver);
				script.onload = function() { MM_Prepare(viewer_id); };
			}
			//----------------OK-----------------------------------------------
			else { //OK	
				let script = dhtmlLoadScript(srvUrl+"scripts/ok_js.js?v="+ver);
				script.onload = function() { OK_Prepare(); };
			}
		}
	}
}

function LoadAssets(addGZ)
{						
	var buildUrl = srvUrl+"Build";
	var loaderUrl = buildUrl + "/"+name+".loader.js?v="+ver;	
	var config = {
		dataUrl: buildUrl + "/"+name+".data"+addGZ+"?v="+ver,
		frameworkUrl: buildUrl + "/"+name+".framework.js"+addGZ+"?v="+ver,
		codeUrl: buildUrl + "/"+name+".wasm"+addGZ+"?v="+ver,
		streamingAssetsUrl: "StreamingAssets",
		companyName: "Slotomat",
		productName: "SS",
		productVersion: "0.5"
	};
	
	if(udata.ismobile>0) {
		container.className = "unity-mobile";
		config.devicePixelRatio = window.devicePixelRatio;		
		
		//WiH=window.innerHeight;
		if(WiH<800) {
			WiH=WiH/800;
			
			logo.style.height = (Math.round(438 * WiH)) + "px";
			logo.style.width = (Math.round(834 * WiH)) + "px";
			
			loading.style.height = (Math.round(206 * WiH)) + "px";
			loading.style.width = (Math.round(508 * WiH)) + "px";
			if(downSize >0) downSize = Math.round(90 * WiH);
			//console.log('DPR '+WiH+' downSize '+downSize);	
			//WiH=Math.ceil(WiH);
			
		}	
	}
	logo.style.visibility="visible";
	loading.style.visibility="visible";
	
	loadingBar.style.display = 'inline-block';
	progressBarFull.style.display = 'inline-block';

	var script = document.createElement("script");
	script.src = loaderUrl;
	script.onload = () => {
	createUnityInstance(canvas, config, (progress) => {
	  progressBarFull.style.width = 100 * progress + "%";
	}).then((unityInstance) => {
	  //loading.style.display = "none";
		
	  loadComplete(unityInstance);	  
	}).catch((message) => {
		console.log(message);
	});
	};
	document.body.appendChild(script);
}

function start(addGZ)
{	
	InitBlocks(addGZ);
		
	
	//SetShareLangEn();
}

function CloseABlock()
{
	adiv.style.display = 'none'; 
}

function onMouseDown(event)
{
   cfocus('canvas mousedown');
}

function loadComplete(unityInstance)
{	
	gameInstance = unityInstance;
	if(udata.onstart==1) ShowAd("start");//
}

function GetUnity()
{	
	return gameInstance;
}

function SendToUnity(method, mssg) {	
	var inst=GetUnity();
	if(inst!=null) 
	{
		let forsnd = {method:method, msg:mssg};
		
		forsend = JSON.stringify(forsnd);
		
		cl(method+' '+forsend,'');
		
		setTimeout(function() {
			inst.SendMessage('[NetworkSocial]', 'RespFromPage', forsend);
		}, 200);
	}
}

function FinishLoading() {	
	SetBlocks();
	
	AllLoaded = true;
	WiH=0;
	resize();	
	
	ResetVars();
	left.style.display = 'block';
	right.style.display = 'block';
	container.style.visibility = "visible";
	
	/*
	if(typeof downblocks !== "undefined") {
		//SetLeftRightBlocks();
		SetDown();
	}
	*/
	addevents();		

	if(udata.ismobile>0 && focusd!=null) {
		setInterval (
			function () {
				if (!document.hasFocus()) {
					cl('!document.hasFocus','');
					ShowCFocus();
				}
			},
			3000
		);	
	}
	
	SendToUnity("finishloading", "");
	
}

function setLikeBtn() {
	//if(udata.ismobile==0)
	//if(udata.network==1) {
		//like = document.getElementById("like");    
		//if(like!=null) like.innerHTML="<div id='vk_like' style='margin:4px;'></div>";
	//}
	if(udata.ismobile==0) {
		if(!LikesIsSet) {
				var newd = document.createElement('div');
				newd.id = "vk_like";			
				newd.setAttribute('class', "vk_like");
				like.appendChild(newd);
				
				VK.Widgets.Like("vk_like", {type: "button", height: 30, pageUrl: ''+game_url, pageImage: ''+game_pic }, "page_id1");
				if(udata.network!=1) {
					newd = document.createElement('div');
					newd.id = "ok_like";			
					newd.setAttribute('class', "ok_like");
					like.appendChild(newd);
				
					!function (d, id, did, st) {
					  var js = d.createElement("script");
					  js.src = "https://connect.ok.ru/connect.js";
					  js.onload = js.onreadystatechange = function () {
					  if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
						if (!this.executed) {
						  this.executed = true;
						  setTimeout(function () {
							OK.CONNECT.insertShareWidget(id,did,st);
						  }, 0); 
						}
					  }};
					  d.documentElement.appendChild(js);
					}
					(document,"ok_like",game_url,'{"sz":30,"st":"rounded","ck":1,"lang":"ru","bgclr":"ED8207","txclr":"FFFFFF"}',game_name,game_descr,game_pic);
				}

				LikesIsSet = true;	
		}
		if(!LikesIsShow) {
			like.style.visibility = "visible";	
			LikesIsShow = true;
		}
	}
}

function RemoveLikes() {
	if(LikesIsSet) {
		like.style.visibility = "hidden";
		LikesIsShow = false;		
	}
}

function setUid(uid) {	
	div1=document.getElementById('div1');
	if(div1!=null) {
		div1.innerHTML=uid;
	}
}

function OpenGroup() {
	if(udata.network==1) group = "https://vk.com/public"+group_id;
	else if(udata.network==2) group = "https://ok.ru/group/"+group_id;
	else if(udata.network==4) group = "https://my.mail.ru/community/"+group_id;
	else if(udata.network==5) group = udata.group_url;
	window.open(group);
}

function InviteFriends() {
	if(udata.network==1) vkBridge.send("VKWebAppShowInviteBox", {}); 
	else if(udata.network==2) FAPI.UI.showInvite("Р—Р°С…РѕРґРё РІ РЅРѕРІСѓСЋ РІРёРєС‚РѕСЂРёРЅСѓ СЃ РєРѕС‚РѕРј. РћРЅР° РѕС‚Р»РёС‡РЅР°СЏ!");
}

function Share() {
	if(udata.network==1) {				
		vk_pic = "photo130504063_457239153";
		vkBridge.send("VKWebAppShowWallPostBox", { "owner_id":udata.user_data.uid,"attachments":{game_url,vk_pic},"message":game_descr });
	} else if(udata.network==2) {
		OK_postMedia(game_descr, game_pic);			
	} else if(udata.network==4) {
		MM_postMedia(game_descr, game_pic, game_url);	
	}
}
	
var coef_x = 1;
var coef_y = 1;
var add_x = 0;
	
var base_width = 1400;
var base_height = 800;
var base_prop = 1.75;//base_width / base_height;		
var game_Height = base_height;

var WiH=0;

function resizeBlock(block) {
	if(WiH!=window.innerHeight) {
		document.body.style.zoom = 1;//(window.innerWidth / window.outerWidth);
		
		WiH=window.innerHeight;
		if(downSize >0) {
			if(WiH<base_height) {
				downSize = Math.round(90 * WiH/base_height);
				if(downSize<50) downSize=50;
			}
			else downSize = 90;
		}  
		
		Height = WiH-downSize;
		Width = window.innerWidth;
		
		udata.sizeX = Width;
		udata.sizeY = Height;
		
		prop = Width / Height;

		game_Height = Height;	
		game_Width = Width;

		if(prop<base_prop) {
			game_Height = Math.round(Height*(prop/base_prop));	
			game_Width = Math.round(base_prop*game_Height);

			//add_x = Math.round((base_width-912) / 2 * coef_x);
		} else {		
			game_Width = Math.round(base_prop*Height);
			game_Height = Math.round(base_height * game_Width / base_width);
			//add_x = 0;//Math.round((Width-game_Width)/2);
				
		}	
		coef_x = game_Width / base_width;	
		coef_y = game_Height / base_height;
		
		wdth = Math.round(Width - game_Width)/2;	
		
		console.log(' game_Width '+game_Width+' game_Height '+game_Height+' downSize '+downSize);
		
		//downSize = window.innerHeight-game_Height;
		block.style.height = game_Height + "px";
		block.style.width = game_Width + "px";
		canvas.style.width = game_Width + "px";
		canvas.style.height = game_Height + "px";
		
		if(AllLoaded) {				
			
			//left.style.marginLeft = -wdth + "px";
			right.style.width = wdth + "px";
			right.style.height =WiH + "px";
			
			
			left.style.height=WiH + "px";
			//if(udata.network==5 && udata.ismobile>0) left.style.width = (wdth - (30*window.devicePixelRatio))+ "px";//
			//else 
			left.style.width = wdth + "px";
			
			setMenu(wdth); 
			
			if(downSize>0) {
				down.style.top = game_Height +"px";
				down.style.width = game_Width +"px"; //2000 * coef_x + "px";//				
				down.style.height = downSize + "px";//
				down.style.display = "block";

				ResizeDownAd();
			} 
		}
	}
}

function setMenu(gWidth) {	
	if (menu!=null) {//udata.ismobile==0 && 
		if(udata.lang!=0) {// || udata.network==2
			showMenu=false;
		} else showMenu=true;
		
		if(gWidth<100) {//udata.lang!=0 || 
			if (MenuSet) {
				RemoveLikes();
				menu.style.display = "none";				
				if(menu_left!=null) menu_left.style.display = "none";
				MenuSet = false;
			}
			
			//if(LeftRightIsSet) RemoveLeftRightBlocks();	
		} else {			
			menuHeight=0;
			if(showMenu) {
				sc = gWidth / 300;
				if(sc>1) sc=1;

				menu.style.transform = "scale("+sc+")";
				menu.style.display = "block";
				if(menu_left!=null) {
					menu_left.style.transform = "scale("+sc+")";
					menu_left.style.display = "block";
				}	
				setLikeBtn();
				menuHeight = 225*sc;
			}
			/*if(udata.yaashow>0) { //udata.yaashow==1					
				SetLeftRightBlocks();				
				ResizeLeftRightBlocks(gWidth, menuHeight);
			}*/
			MenuSet = true;
		}
	}	
}

function resize() {	
	resizeBlock(unitycontainer);
}

function ShowCFocus(place='') {
	if(focusd.style.visibility != "visible") {
		focusd.style.visibility = "visible";
		cl('ShowCFocus '+place,'');
	}
}

function ShowCFocusMobile() {
	if(udata.ismobile>0) { 		
		focusd.style.visibility = "visible";
		cl('ShowCFocus ','');
	}
}

function cfocus(msg) {
	canvas.focus();
	resize();
	cl('cfocus '+msg,'');
}

function focuscl() {
	if(focusd.style.visibility == "visible") {
		focusd.style.visibility = "hidden";
		if(udata.network==5) {
			ShareBack.style.visibility = "hidden";
			myShare.style.visibility = "hidden";
		}
		cfocus('focuscl visibility==visible');
	} else cl('focuscl focusd visibility!=visible','');
}

function setPlatform(p) {
	udata.ismobile = p;
}

function CheckInGroup(groups, group_id) {
	var ind = groups.indexOf(group_id);
	for (let el of groups) {			  
		if (el==group_id) {
			in_group=1;
			//SendToUnity('[Network]',"SetInGroup","");
			break;
		}
	}					
}

function OpenURL(url) {
	window.open(url);
}

function CreateL(ba_id,l,x,y,wdth,hgth) {	
	
	el_id = 'ba'+ba_id;
	
	var div = document.createElement('div');
	div.id = el_id;
	div.style.left = x + 'px'; //ban_left + 'px';
	div.style.bottom = y + 'px';//ban_bottom + 'px';
	div.style.width = wdth+'px';//ban_width+'px';
	div.style.height = hgth+'px';//ban_height+'px';
	div.style.display = 'block';
	div.style.position = "absolute";
	div.style.zIndex="4";
	div.setAttribute("onclick","DeleteL("+ba_id+");"); 

	var divlnk = document.getElementById('ba'+ba_id);
	
		container.appendChild(div);
		
	var divlnk = document.getElementById(el_id);
	
	if(divlnk!=null) {
		var newl = document.createElement('a');
		newl.setAttribute('class', 'lnk1');
		newl.setAttribute('href', l);
		newl.setAttribute('target', '_blank');
		newl.style.left = 0 + 'px';
		newl.style.bottom = 0 + 'px';
		newl.style.width = '100%';//ban_width +'px';
		newl.style.height = '100%';//ban_height +'px';
		//newl.style.background = 'red';
		newl.style.display = 'inline-block';
		newl.style.position = "absolute";
		newl.style.zIndex="5";
		
		divlnk.appendChild(newl);
	}
}

function DeleteL(ba_id) {			
	var divlnk = document.getElementById('ba'+ba_id);
	if(divlnk!=null) divlnk.remove();
	cfocus('DeleteL');	
}

function FindUIDInArray(arr, uid) {
	var indx = -1;
	for(var i=0;i<arr.length;i++) {
		if(uid==arr[i]) return i;
	}
	
	return indx;
}

function CheckUIDInArray(arr, uid) { //РёСЃРїРѕР»СЊР·РѕРІР°С‚СЊ РїСЂРё РЅР°Р»РёС‡РёРё СЃРІРѕР№СЃС‚РІР° uid РѕР±СЉРµРєС‚Р°
   var indx = -1;
   cond = arr.some(function(e, ind) { 
        if(e.uid == uid) { indx = ind; }
   });
	return indx;
}
