(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const d_=()=>window.location.search==="?testmode";let es=[];const f_=n=>{es.length===0&&(es=n);const e=d_()?0:Math.floor(Math.random()*es.length),t=es[e];return es=es.filter((i,r)=>r!==e),t},ul=class{constructor(n){this.stage=n,this.locked=!1,this.cubes=[],this.createMock()}lock(){this.locked=!0;for(const n of this.cubes)n.locked=!0}move(n,e){if(this.locked)return;const t=this.cubes.map(i=>[i.position[0]+n,i.position[1],i.position[2]+e]);this.clearFromStage(),this.isColliding(t)||(this.applyNewPosition(t),this.updateStage())}fallStep(){if(this.locked)return;this.clearFromStage();const n=this.cubes.map(e=>[e.position[0],e.position[1]-1,e.position[2]]);this.isColliding(n)?this.lock():this.applyNewPosition(n),this.updateStage()}applyNewPosition(n){for(let e=0;e<this.cubes.length;e+=1)this.cubes[e].position[0]=n[e][0],this.cubes[e].position[1]=n[e][1],this.cubes[e].position[2]=n[e][2]}getCubesPositions(){const n=[];for(let e=0;e<this.cubes.length;e+=1)n[e]=[this.cubes[e].position[0],this.cubes[e].position[1],this.cubes[e].position[2]];return n}isColliding(n){const e=[];for(let t=0;t<n.length;t++){const i=this.stage.isCollidingCube(n[t][0],n[t][1],n[t][2]);i&&e.push(i)}return e.length?e:!1}rotate(){if(this.locked)return;this.clearFromStage();const n=Math.floor(this.cubes.length/2),e=this.cubes[n].position,t=this.cubes.map(r=>{const s=r.position[0]-e[0],o=r.position[2]-e[2];return[e[0]-o,r.position[1],e[2]+s]}),i=this.isColliding(t);if(i)if(i.includes("wall")){const r=this.correctToStageBounds(t),s=this.isColliding(r);(!s||!s.includes("locked"))&&this.applyNewPosition(r)}else return;else this.applyNewPosition(t);this.updateStage()}clearFromStage(){for(const n of this.cubes)this.stage.resetCube(n.position[0],n.position[1],n.position[2])}updateStage(){for(const n of this.cubes)this.stage.fillCube(n.position[0],n.position[1],n.position[2],n.id,n.locked?"locked":"active")}correctToStageBounds(n){const e=[];let t=1/0,i=1/0,r=-1/0,s=-1/0;for(let o=0;o<n.length;o++)e[o]=[n[o][0],n[o][1],n[o][2]],r=Math.max(r,n[o][0]),s=Math.max(s,n[o][2]),t=Math.min(t,n[o][0]),i=Math.min(i,n[o][2]);if(r>=this.stage.width){const o=r-this.stage.width+1;for(let a=0;a<n.length;a++)e[a][0]=n[a][0]-o}if(s>=this.stage.depth){const o=s-this.stage.depth+1;for(let a=0;a<n.length;a++)e[a][2]=n[a][2]-o}if(t<0){const o=-t;for(let a=0;a<n.length;a++)e[a][0]=n[a][0]+o}if(i<0){const o=-i;for(let a=0;a<n.length;a++)e[a][2]=n[a][2]+o}return e}create(){const n=ul.SHAPES[Math.floor(Math.random()*ul.SHAPES.length)],e=[Math.floor(Math.random()*this.stage.width),this.stage.height-1,Math.floor(Math.random()*this.stage.depth)];for(let i=0;i<n.length;i++)for(let r=0;r<n[i].length;r++)if(n[i][r]===1){const s={position:[e[0]+i,e[1],e[2]+r],id:this.stage.getNewID(),locked:!1};this.cubes.push(s)}const t=this.correctToStageBounds(this.getCubesPositions());this.applyNewPosition(t),this.updateStage()}createMock(){const n=f_(ul.SHAPES),e=[this.stage.width/2-1,this.stage.height-1,this.stage.depth/2-1];for(let i=0;i<n.length;i++)for(let r=0;r<n[i].length;r++)if(n[i][r]===1){const s={position:[e[0]+i,e[1],e[2]+r],id:this.stage.getNewID(),locked:!1};this.cubes.push(s)}const t=this.correctToStageBounds(this.getCubesPositions());this.applyNewPosition(t),this.updateStage()}};let ig=ul;ig.SHAPES=[[[1],[1],[1,1]],[[1,1],[1,1]],[[1],[1,1]],[[1],[1,1],[0,1]],[[0,1],[1,1],[1]],[[1],[1],[1],[1]],[[1],[1],[1]],[[1],[1,1],[1]],[[1],[1]],[[1,1]]];const Kd=6,p_={left:new KeyboardEvent("keydown",{key:"ArrowLeft",code:"ArrowLeft",shiftKey:!1}),right:new KeyboardEvent("keydown",{key:"ArrowRight",code:"ArrowRight",shiftKey:!1}),up:new KeyboardEvent("keydown",{key:"ArrowUp",code:"ArrowUp",shiftKey:!1}),down:new KeyboardEvent("keydown",{key:"ArrowDown",code:"ArrowDown",shiftKey:!1}),fall:new KeyboardEvent("keydown",{key:" ",code:"Space",shiftKey:!1}),rotate:new KeyboardEvent("keydown",{key:"r",code:"KeyR",shiftKey:!1}),camera_rotate_right:new KeyboardEvent("keydown",{key:"ArrowRight",code:"ArrowRight",shiftKey:!0}),camera_rotate_left:new KeyboardEvent("keydown",{key:"ArrowLeft",code:"ArrowLeft",shiftKey:!0})},m_={dante:{faceColors:{topBottom:"#f5e6d0",frontBack:"#f5e6d0",leftRight:"#f5e6d0"},edge:{thickness:.02,color:"#8b6f47"},pattern:2,patternFactor:-1,patternScale:.32,patternPositionRandomness:.14,patternFaceConfig:"VH",scale:.9},reda:{faceColors:{topBottom:"#d4502a",frontBack:"#b83d20",leftRight:"#e06040"},edge:{thickness:0,color:"#8b2510"},scale:1,pattern:2,patternFactor:-.93,patternScale:.45,patternPositionRandomness:.11,patternFaceConfig:"VH"},trolja:{faceColors:{topBottom:"#4a9e8a",frontBack:"#3a8070",leftRight:"#62b89e"},edge:{thickness:0,color:"#2a6050"},scale:1,pattern:2,patternFactor:-.31,patternScale:.205,patternPositionRandomness:.11,patternFaceConfig:"VH"},havre:{faceColors:{topBottom:"#7a8ec8",frontBack:"#6070a8",leftRight:"#9aaade"},edge:{thickness:0,color:"#4a5888"},scale:1,pattern:2,patternFactor:-1,patternScale:.62,patternPositionRandomness:.11,patternFaceConfig:"VH"}},rt={background:{color:"#2a1f14"},enclosure:{color:"#3a2a18",noiseFactor:.17},cubes:{active:"dante",locked:["reda","trolja","havre"]},shadow:{thickness:.02,color:"#444444"},cycleTime:500,accelerationFactor:15,shapes:[],stage:{width:Kd,depth:Kd,height:10,limit:4},controls:p_};class g_{constructor(){this.changeStatus=e=>{this.state.status!==e&&(e==="playing"&&this.resetScore(),this.state.status=e,this.onUpdate("status"))},this.state={score:0,bestScore:parseInt(localStorage.getItem("bestScore")||"0"),menu:!0,autoplay:!0,status:"inDemo"},this.subs=[]}subscribe(e,t){this.subs.push({callback:t,props:e})}addToScore(e){this.state.status==="playing"&&(this.state.score+=e,this.state.score>this.state.bestScore&&(this.state.bestScore=this.state.score,localStorage.setItem("bestScore",this.state.score.toString()),this.onUpdate("bestScore")),this.onUpdate("score"))}resetScore(){this.state.score!==0&&(this.state.score=0,this.onUpdate("score"))}onUpdate(e){var t;for(let i=0;i<this.subs.length;i+=1){const r=this.subs[i];(t=r.props)!=null&&t.includes(e)&&r.callback(this.state)}}}const kt=new g_;class v_{constructor(e,t,i){this.activeCamera=0,this.brick=void 0,this.onResetGame=e,this.engine=t,this.onFastForward=i,this.addControls(),this.actions=[]}reset(){this.actions=[]}cameraCorrection(e){var t,i;switch((i=(t=this.engine)==null?void 0:t.camera)==null?void 0:i.activeCamera){case 0:return e;case 1:switch(e){case"left":return"down";case"right":return"up";case"up":return"left";case"down":return"right";default:return e}case 2:switch(e){case"left":return"right";case"right":return"left";case"up":return"down";case"down":return"up";default:return e}case 3:switch(e){case"left":return"up";case"right":return"down";case"up":return"right";case"down":return"left";default:return e}default:return e}}addControls(){this.currentKeyUpHandler&&(document.removeEventListener("keydown",this.currentKeyUpHandler),this.currentKeyUpHandler=null);const e=t=>{if(!(!["playing","pause"].includes(kt.state.status)&&t.isTrusted))switch(t.key){case"ArrowLeft":case"h":case"a":t.shiftKey?this.actions.push("camera_rotate_left"):this.actions.push(this.cameraCorrection("left"));break;case"H":this.actions.push("camera_rotate_left");break;case"ArrowRight":case"l":case"d":t.shiftKey?this.actions.push("camera_rotate_right"):this.actions.push(this.cameraCorrection("right"));break;case"L":this.actions.push("camera_rotate_right");break;case"ArrowUp":case"k":case"w":this.actions.push(this.cameraCorrection("up"));break;case"ArrowDown":case"j":case"s":this.actions.push(this.cameraCorrection("down"));break;case"r":this.actions.push("rotate");break;case" ":this.actions.push("fall");break;case"p":this.actions.push("pause");break}};document.addEventListener("keydown",e),this.currentKeyUpHandler=e}setBrick(e){this.brick=e}applyActions(){var t,i,r,s;if(!this.brick||!this.actions.length)return;switch(this.actions.pop()){case"left":this.brick.move(-1,0);break;case"right":this.brick.move(1,0);break;case"up":this.brick.move(0,-1);break;case"down":this.brick.move(0,1);break;case"fall":this.onFastForward();break;case"rotate":this.brick.rotate();break;case"pause":kt.state.status==="playing"?kt.changeStatus("pause"):kt.state.status==="pause"&&kt.changeStatus("playing");break;case"camera_rotate_right":(i=(t=this.engine)==null?void 0:t.camera)==null||i.rotate("right");break;case"camera_rotate_left":(s=(r=this.engine)==null?void 0:r.camera)==null||s.rotate("left");break}this.actions=[]}}const Ou=class{constructor(n=24,e=12,t=12){this.height=n,this.width=e,this.depth=t,this.cubes=[],this.toBeRemovedCubes=[],this.dirty=!0,this.lastLockedY=0,this.cycleTime=rt.cycleTime,this.init()}init(){for(let n=-1;n<this.width+1;n++){this.cubes[n]=[];for(let e=-1;e<this.height;e++){this.cubes[n][e]=[];for(let t=-1;t<this.depth+1;t++){if(e===-1){this.cubes[n][e][t]=this.getFloorCube();continue}if(n>-1&&n<this.width&&t>-1&&t<this.depth){this.cubes[n][e][t]=this.getEmptyCube();continue}this.cubes[n][e][t]=this.getWallCube()}}}}reset(){this.cubes=[],this.toBeRemovedCubes=[],this.dirty=!0,this.lastLockedY=0,this.cycleTime=rt.cycleTime,this.init()}getNewID(){return Ou.id+=1,Ou.id}getEmptyCube(){return null}getFloorCube(){return{id:null,state:"floor"}}getWallCube(){return{id:null,state:"wall"}}fillCube(n,e,t,i,r){r==="locked"&&(this.lastLockedY=e),this.isCubeDefined(n,e,t)&&(this.cubes[n][e][t]={id:i,state:r},this.dirty=!0)}resetCube(n,e,t){this.isCubeDefined(n,e,t)&&(this.cubes[n][e][t]=this.getEmptyCube())}setToBeRemovedCube(n,e,t){this.isCubeDefined(n,e,t)&&(this.cubes[n][e][t]=this.getEmptyCube()),this.dirty=!0}setToBeMovedDownCube(n,e,t){var i;if(this.isCubeDefined(n,e,t)&&((i=this.cubes[n][e][t])==null?void 0:i.state)==="locked"){const r=this.cubes[n][e][t];if(!(r!=null&&r.id))return;this.fillCube(n,e-1,t,r.id,"locked"),this.resetCube(n,e,t),this.dirty=!0}}checkForFilledLines(){var r,s;this.toBeRemovedCubes=[];const n=[],e=[];let t=0;for(let o=0;o<this.width;o++){e[o]=!0;for(let a=0;a<this.depth;a++)if(((r=this.cubes[o][this.lastLockedY][a])==null?void 0:r.state)!=="locked"){e[o]=!1;break}}for(let o=0;o<this.depth;o++){n[o]=!0;for(let a=0;a<this.width;a++)if(((s=this.cubes[a][this.lastLockedY][o])==null?void 0:s.state)!=="locked"){n[o]=!1;break}}const i={};e.forEach((o,a)=>{var l;if(o){t+=this.width;for(let c=0;c<this.depth;c++){this.setToBeRemovedCube(a,this.lastLockedY,c);for(let u=this.lastLockedY+1;u<this.height;u++)((l=this.cubes[a][u][c])==null?void 0:l.state)==="locked"&&(i[`${a}-${u}-${c}`]=[a,u,c])}}}),n.forEach((o,a)=>{var l;if(o){t+=this.depth;for(let c=0;c<this.width;c++){this.setToBeRemovedCube(c,this.lastLockedY,a);for(let u=this.lastLockedY+1;u<this.height;u++)((l=this.cubes[c][u][a])==null?void 0:l.state)==="locked"&&(i[`${c}-${u}-${a}`]=[c,u,a])}}}),t>0&&(kt.addToScore(t),this.cycleTime-=rt.accelerationFactor);for(const o of Object.keys(i))this.setToBeMovedDownCube(i[o][0],i[o][1],i[o][2])}isCubeDefined(n,e,t){return this.cubes[n]&&this.cubes[n][e]&&this.cubes[n][e][t]!==void 0}isCollidingCube(n,e,t){var i;return this.isCubeDefined(n,e,t)&&((i=this.cubes[n][e][t])==null?void 0:i.state)||!1}};let rg=Ou;rg.id=0;/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Bh="160",ts={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ns={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},__=0,Zd=1,x_=2,sg=1,y_=2,Ci=3,fr=0,dn=1,ui=2,nr=0,Os=1,Qd=2,Jd=3,ef=4,S_=5,Rr=100,E_=101,M_=102,tf=103,nf=104,w_=200,T_=201,A_=202,C_=203,zu=204,ku=205,b_=206,R_=207,P_=208,L_=209,N_=210,D_=211,I_=212,U_=213,F_=214,O_=0,z_=1,k_=2,wl=3,B_=4,H_=5,V_=6,G_=7,og=0,W_=1,X_=2,ir=0,j_=1,q_=2,Y_=3,$_=4,K_=5,Z_=6,ag=300,Xs=301,js=302,Bu=303,Hu=304,tc=306,Vu=1e3,$n=1001,Gu=1002,sn=1003,rf=1004,Rc=1005,Pn=1006,Q_=1007,Vo=1008,rr=1009,J_=1010,ex=1011,Hh=1012,lg=1013,Qi=1014,Ji=1015,Go=1016,cg=1017,ug=1018,Fr=1020,tx=1021,Kn=1023,nx=1024,ix=1025,Or=1026,qs=1027,rx=1028,hg=1029,sx=1030,dg=1031,fg=1033,Pc=33776,Lc=33777,Nc=33778,Dc=33779,sf=35840,of=35841,af=35842,lf=35843,pg=36196,cf=37492,uf=37496,hf=37808,df=37809,ff=37810,pf=37811,mf=37812,gf=37813,vf=37814,_f=37815,xf=37816,yf=37817,Sf=37818,Ef=37819,Mf=37820,wf=37821,Ic=36492,Tf=36494,Af=36495,ox=36283,Cf=36284,bf=36285,Rf=36286,mg=3e3,zr=3001,ax=3200,lx=3201,cx=0,ux=1,Un="",zt="srgb",Ii="srgb-linear",Vh="display-p3",nc="display-p3-linear",Tl="linear",ut="srgb",Al="rec709",Cl="p3",is=7680,Pf=519,hx=512,dx=513,fx=514,gg=515,px=516,mx=517,gx=518,vx=519,Lf=35044,Nf="300 es",Wu=1035,Pi=2e3,bl=2001;class $r{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Df=1234567;const Ro=Math.PI/180,Wo=180/Math.PI;function no(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Yt[n&255]+Yt[n>>8&255]+Yt[n>>16&255]+Yt[n>>24&255]+"-"+Yt[e&255]+Yt[e>>8&255]+"-"+Yt[e>>16&15|64]+Yt[e>>24&255]+"-"+Yt[t&63|128]+Yt[t>>8&255]+"-"+Yt[t>>16&255]+Yt[t>>24&255]+Yt[i&255]+Yt[i>>8&255]+Yt[i>>16&255]+Yt[i>>24&255]).toLowerCase()}function Qt(n,e,t){return Math.max(e,Math.min(t,n))}function Gh(n,e){return(n%e+e)%e}function _x(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function xx(n,e,t){return n!==e?(t-n)/(e-n):0}function Po(n,e,t){return(1-t)*n+t*e}function yx(n,e,t,i){return Po(n,e,1-Math.exp(-t*i))}function Sx(n,e=1){return e-Math.abs(Gh(n,e*2)-e)}function Ex(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Mx(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function wx(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Tx(n,e){return n+Math.random()*(e-n)}function Ax(n){return n*(.5-Math.random())}function Cx(n){n!==void 0&&(Df=n);let e=Df+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function bx(n){return n*Ro}function Rx(n){return n*Wo}function Xu(n){return(n&n-1)===0&&n!==0}function Px(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Rl(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Lx(n,e,t,i,r){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+i)/2),u=o((e+i)/2),f=s((e-i)/2),h=o((e-i)/2),p=s((i-e)/2),v=o((i-e)/2);switch(r){case"XYX":n.set(a*u,l*f,l*h,a*c);break;case"YZY":n.set(l*h,a*u,l*f,a*c);break;case"ZXZ":n.set(l*f,l*h,a*u,a*c);break;case"XZX":n.set(a*u,l*v,l*p,a*c);break;case"YXY":n.set(l*p,a*u,l*v,a*c);break;case"ZYZ":n.set(l*v,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Es(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function tn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Nx={DEG2RAD:Ro,RAD2DEG:Wo,generateUUID:no,clamp:Qt,euclideanModulo:Gh,mapLinear:_x,inverseLerp:xx,lerp:Po,damp:yx,pingpong:Sx,smoothstep:Ex,smootherstep:Mx,randInt:wx,randFloat:Tx,randFloatSpread:Ax,seededRandom:Cx,degToRad:bx,radToDeg:Rx,isPowerOfTwo:Xu,ceilPowerOfTwo:Px,floorPowerOfTwo:Rl,setQuaternionFromProperEuler:Lx,normalize:tn,denormalize:Es};class Ge{constructor(e=0,t=0){Ge.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ye{constructor(e,t,i,r,s,o,a,l,c){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],h=i[2],p=i[5],v=i[8],_=r[0],m=r[3],d=r[6],g=r[1],x=r[4],y=r[7],C=r[2],w=r[5],M=r[8];return s[0]=o*_+a*g+l*C,s[3]=o*m+a*x+l*w,s[6]=o*d+a*y+l*M,s[1]=c*_+u*g+f*C,s[4]=c*m+u*x+f*w,s[7]=c*d+u*y+f*M,s[2]=h*_+p*g+v*C,s[5]=h*m+p*x+v*w,s[8]=h*d+p*y+v*M,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,h=a*l-u*s,p=c*s-o*l,v=t*f+i*h+r*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/v;return e[0]=f*_,e[1]=(r*c-u*i)*_,e[2]=(a*i-r*o)*_,e[3]=h*_,e[4]=(u*t-r*l)*_,e[5]=(r*s-a*t)*_,e[6]=p*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Uc.makeScale(e,t)),this}rotate(e){return this.premultiply(Uc.makeRotation(-e)),this}translate(e,t){return this.premultiply(Uc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Uc=new Ye;function vg(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Xo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Dx(){const n=Xo("canvas");return n.style.display="block",n}const If={};function Lo(n){n in If||(If[n]=!0,console.warn(n))}const Uf=new Ye().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ff=new Ye().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),xa={[Ii]:{transfer:Tl,primaries:Al,toReference:n=>n,fromReference:n=>n},[zt]:{transfer:ut,primaries:Al,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[nc]:{transfer:Tl,primaries:Cl,toReference:n=>n.applyMatrix3(Ff),fromReference:n=>n.applyMatrix3(Uf)},[Vh]:{transfer:ut,primaries:Cl,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Ff),fromReference:n=>n.applyMatrix3(Uf).convertLinearToSRGB()}},Ix=new Set([Ii,nc]),st={enabled:!0,_workingColorSpace:Ii,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Ix.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=xa[e].toReference,r=xa[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return xa[n].primaries},getTransfer:function(n){return n===Un?Tl:xa[n].transfer}};function zs(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Fc(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let rs;class _g{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{rs===void 0&&(rs=Xo("canvas")),rs.width=e.width,rs.height=e.height;const i=rs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=rs}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Xo("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=zs(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(zs(t[i]/255)*255):t[i]=zs(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ux=0;class xg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ux++}),this.uuid=no(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Oc(r[o].image)):s.push(Oc(r[o]))}else s=Oc(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Oc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?_g.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fx=0;class fn extends $r{constructor(e=fn.DEFAULT_IMAGE,t=fn.DEFAULT_MAPPING,i=$n,r=$n,s=Pn,o=Vo,a=Kn,l=rr,c=fn.DEFAULT_ANISOTROPY,u=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fx++}),this.uuid=no(),this.name="",this.source=new xg(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ge(0,0),this.repeat=new Ge(1,1),this.center=new Ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Lo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===zr?zt:Un),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ag)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Vu:e.x=e.x-Math.floor(e.x);break;case $n:e.x=e.x<0?0:1;break;case Gu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Vu:e.y=e.y-Math.floor(e.y);break;case $n:e.y=e.y<0?0:1;break;case Gu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Lo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===zt?zr:mg}set encoding(e){Lo("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===zr?zt:Un}}fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=ag;fn.DEFAULT_ANISOTROPY=1;class Gt{constructor(e=0,t=0,i=0,r=1){Gt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],p=l[5],v=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(v+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,y=(p+1)/2,C=(d+1)/2,w=(u+h)/4,M=(f+_)/4,F=(v+m)/4;return x>y&&x>C?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=w/i,s=M/i):y>C?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=w/r,s=F/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=M/s,r=F/s),this.set(i,r,s,t),this}let g=Math.sqrt((m-v)*(m-v)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(g)<.001&&(g=1),this.x=(m-v)/g,this.y=(f-_)/g,this.z=(h-u)/g,this.w=Math.acos((c+p+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ox extends $r{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Gt(0,0,e,t),this.scissorTest=!1,this.viewport=new Gt(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(Lo("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===zr?zt:Un),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new fn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new xg(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vr extends Ox{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class yg extends fn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=sn,this.minFilter=sn,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class zx extends fn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=sn,this.minFilter=sn,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3];const h=s[o+0],p=s[o+1],v=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(a===1){e[t+0]=h,e[t+1]=p,e[t+2]=v,e[t+3]=_;return}if(f!==_||l!==h||c!==p||u!==v){let m=1-a;const d=l*h+c*p+u*v+f*_,g=d>=0?1:-1,x=1-d*d;if(x>Number.EPSILON){const C=Math.sqrt(x),w=Math.atan2(C,d*g);m=Math.sin(m*w)/C,a=Math.sin(a*w)/C}const y=a*g;if(l=l*m+h*y,c=c*m+p*y,u=u*m+v*y,f=f*m+_*y,m===1-a){const C=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=C,c*=C,u*=C,f*=C}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[o],h=s[o+1],p=s[o+2],v=s[o+3];return e[t]=a*v+u*f+l*p-c*h,e[t+1]=l*v+u*h+c*f-a*p,e[t+2]=c*v+u*p+a*h-l*f,e[t+3]=u*v-a*f-l*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),f=a(s/2),h=l(i/2),p=l(r/2),v=l(s/2);switch(o){case"XYZ":this._x=h*u*f+c*p*v,this._y=c*p*f-h*u*v,this._z=c*u*v+h*p*f,this._w=c*u*f-h*p*v;break;case"YXZ":this._x=h*u*f+c*p*v,this._y=c*p*f-h*u*v,this._z=c*u*v-h*p*f,this._w=c*u*f+h*p*v;break;case"ZXY":this._x=h*u*f-c*p*v,this._y=c*p*f+h*u*v,this._z=c*u*v+h*p*f,this._w=c*u*f-h*p*v;break;case"ZYX":this._x=h*u*f-c*p*v,this._y=c*p*f+h*u*v,this._z=c*u*v-h*p*f,this._w=c*u*f+h*p*v;break;case"YZX":this._x=h*u*f+c*p*v,this._y=c*p*f+h*u*v,this._z=c*u*v-h*p*f,this._w=c*u*f-h*p*v;break;case"XZY":this._x=h*u*f-c*p*v,this._y=c*p*f-h*u*v,this._z=c*u*v+h*p*f,this._w=c*u*f+h*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=i+a+f;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Qt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*f+this._w*h,this._x=i*f+this._x*h,this._y=r*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{constructor(e=0,t=0,i=0){H.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Of.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Of.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*t-s*r),f=2*(s*i-o*t);return this.x=t+l*c+o*f-a*u,this.y=i+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return zc.copy(this).projectOnVector(e),this.sub(zc)}reflect(e){return this.sub(zc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Qt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zc=new H,Of=new Gr;class ca{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Bn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Bn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Bn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Bn):Bn.fromBufferAttribute(s,o),Bn.applyMatrix4(e.matrixWorld),this.expandByPoint(Bn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ya.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ya.copy(i.boundingBox)),ya.applyMatrix4(e.matrixWorld),this.union(ya)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Bn),Bn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(lo),Sa.subVectors(this.max,lo),ss.subVectors(e.a,lo),os.subVectors(e.b,lo),as.subVectors(e.c,lo),Bi.subVectors(os,ss),Hi.subVectors(as,os),Sr.subVectors(ss,as);let t=[0,-Bi.z,Bi.y,0,-Hi.z,Hi.y,0,-Sr.z,Sr.y,Bi.z,0,-Bi.x,Hi.z,0,-Hi.x,Sr.z,0,-Sr.x,-Bi.y,Bi.x,0,-Hi.y,Hi.x,0,-Sr.y,Sr.x,0];return!kc(t,ss,os,as,Sa)||(t=[1,0,0,0,1,0,0,0,1],!kc(t,ss,os,as,Sa))?!1:(Ea.crossVectors(Bi,Hi),t=[Ea.x,Ea.y,Ea.z],kc(t,ss,os,as,Sa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Bn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Bn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const vi=[new H,new H,new H,new H,new H,new H,new H,new H],Bn=new H,ya=new ca,ss=new H,os=new H,as=new H,Bi=new H,Hi=new H,Sr=new H,lo=new H,Sa=new H,Ea=new H,Er=new H;function kc(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Er.fromArray(n,s);const a=r.x*Math.abs(Er.x)+r.y*Math.abs(Er.y)+r.z*Math.abs(Er.z),l=e.dot(Er),c=t.dot(Er),u=i.dot(Er);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const kx=new ca,co=new H,Bc=new H;class Wh{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):kx.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;co.subVectors(e,this.center);const t=co.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(co,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Bc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(co.copy(e.center).add(Bc)),this.expandByPoint(co.copy(e.center).sub(Bc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _i=new H,Hc=new H,Ma=new H,Vi=new H,Vc=new H,wa=new H,Gc=new H;class Sg{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_i)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=_i.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_i.copy(this.origin).addScaledVector(this.direction,t),_i.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Hc.copy(e).add(t).multiplyScalar(.5),Ma.copy(t).sub(e).normalize(),Vi.copy(this.origin).sub(Hc);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Ma),a=Vi.dot(this.direction),l=-Vi.dot(Ma),c=Vi.lengthSq(),u=Math.abs(1-o*o);let f,h,p,v;if(u>0)if(f=o*l-a,h=o*a-l,v=s*u,f>=0)if(h>=-v)if(h<=v){const _=1/u;f*=_,h*=_,p=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;else h<=-v?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c):h<=v?(f=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),p=-f*f+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Hc).addScaledVector(Ma,h),p}intersectSphere(e,t){_i.subVectors(e.center,this.origin);const i=_i.dot(this.direction),r=_i.dot(_i)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,_i)!==null}intersectTriangle(e,t,i,r,s){Vc.subVectors(t,e),wa.subVectors(i,e),Gc.crossVectors(Vc,wa);let o=this.direction.dot(Gc),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Vi.subVectors(this.origin,e);const l=a*this.direction.dot(wa.crossVectors(Vi,wa));if(l<0)return null;const c=a*this.direction.dot(Vc.cross(Vi));if(c<0||l+c>o)return null;const u=-a*Vi.dot(Gc);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Wt{constructor(e,t,i,r,s,o,a,l,c,u,f,h,p,v,_,m){Wt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,u,f,h,p,v,_,m)}set(e,t,i,r,s,o,a,l,c,u,f,h,p,v,_,m){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=f,d[14]=h,d[3]=p,d[7]=v,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/ls.setFromMatrixColumn(e,0).length(),s=1/ls.setFromMatrixColumn(e,1).length(),o=1/ls.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*u,p=o*f,v=a*u,_=a*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=p+v*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=v+p*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,p=l*f,v=c*u,_=c*f;t[0]=h+_*a,t[4]=v*a-p,t[8]=o*c,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=p*a-v,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,p=l*f,v=c*u,_=c*f;t[0]=h-_*a,t[4]=-o*f,t[8]=v+p*a,t[1]=p+v*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,p=o*f,v=a*u,_=a*f;t[0]=l*u,t[4]=v*c-p,t[8]=h*c+_,t[1]=l*f,t[5]=_*c+h,t[9]=p*c-v,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,p=o*c,v=a*l,_=a*c;t[0]=l*u,t[4]=_-h*f,t[8]=v*f+p,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=p*f+v,t[10]=h-_*f}else if(e.order==="XZY"){const h=o*l,p=o*c,v=a*l,_=a*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+_,t[5]=o*u,t[9]=p*f-v,t[2]=v*f-p,t[6]=a*u,t[10]=_*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Bx,e,Hx)}lookAt(e,t,i){const r=this.elements;return _n.subVectors(e,t),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),Gi.crossVectors(i,_n),Gi.lengthSq()===0&&(Math.abs(i.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),Gi.crossVectors(i,_n)),Gi.normalize(),Ta.crossVectors(_n,Gi),r[0]=Gi.x,r[4]=Ta.x,r[8]=_n.x,r[1]=Gi.y,r[5]=Ta.y,r[9]=_n.y,r[2]=Gi.z,r[6]=Ta.z,r[10]=_n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],h=i[9],p=i[13],v=i[2],_=i[6],m=i[10],d=i[14],g=i[3],x=i[7],y=i[11],C=i[15],w=r[0],M=r[4],F=r[8],E=r[12],T=r[1],k=r[5],G=r[9],z=r[13],P=r[2],I=r[6],N=r[10],Z=r[14],D=r[3],O=r[7],V=r[11],Q=r[15];return s[0]=o*w+a*T+l*P+c*D,s[4]=o*M+a*k+l*I+c*O,s[8]=o*F+a*G+l*N+c*V,s[12]=o*E+a*z+l*Z+c*Q,s[1]=u*w+f*T+h*P+p*D,s[5]=u*M+f*k+h*I+p*O,s[9]=u*F+f*G+h*N+p*V,s[13]=u*E+f*z+h*Z+p*Q,s[2]=v*w+_*T+m*P+d*D,s[6]=v*M+_*k+m*I+d*O,s[10]=v*F+_*G+m*N+d*V,s[14]=v*E+_*z+m*Z+d*Q,s[3]=g*w+x*T+y*P+C*D,s[7]=g*M+x*k+y*I+C*O,s[11]=g*F+x*G+y*N+C*V,s[15]=g*E+x*z+y*Z+C*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],p=e[14],v=e[3],_=e[7],m=e[11],d=e[15];return v*(+s*l*f-r*c*f-s*a*h+i*c*h+r*a*p-i*l*p)+_*(+t*l*p-t*c*h+s*o*h-r*o*p+r*c*u-s*l*u)+m*(+t*c*f-t*a*p-s*o*f+i*o*p+s*a*u-i*c*u)+d*(-r*a*u-t*l*f+t*a*h+r*o*f-i*o*h+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],p=e[11],v=e[12],_=e[13],m=e[14],d=e[15],g=f*m*c-_*h*c+_*l*p-a*m*p-f*l*d+a*h*d,x=v*h*c-u*m*c-v*l*p+o*m*p+u*l*d-o*h*d,y=u*_*c-v*f*c+v*a*p-o*_*p-u*a*d+o*f*d,C=v*f*l-u*_*l-v*a*h+o*_*h+u*a*m-o*f*m,w=t*g+i*x+r*y+s*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const M=1/w;return e[0]=g*M,e[1]=(_*h*s-f*m*s-_*r*p+i*m*p+f*r*d-i*h*d)*M,e[2]=(a*m*s-_*l*s+_*r*c-i*m*c-a*r*d+i*l*d)*M,e[3]=(f*l*s-a*h*s-f*r*c+i*h*c+a*r*p-i*l*p)*M,e[4]=x*M,e[5]=(u*m*s-v*h*s+v*r*p-t*m*p-u*r*d+t*h*d)*M,e[6]=(v*l*s-o*m*s-v*r*c+t*m*c+o*r*d-t*l*d)*M,e[7]=(o*h*s-u*l*s+u*r*c-t*h*c-o*r*p+t*l*p)*M,e[8]=y*M,e[9]=(v*f*s-u*_*s-v*i*p+t*_*p+u*i*d-t*f*d)*M,e[10]=(o*_*s-v*a*s+v*i*c-t*_*c-o*i*d+t*a*d)*M,e[11]=(u*a*s-o*f*s-u*i*c+t*f*c+o*i*p-t*a*p)*M,e[12]=C*M,e[13]=(u*_*r-v*f*r+v*i*h-t*_*h-u*i*m+t*f*m)*M,e[14]=(v*a*r-o*_*r-v*i*l+t*_*l+o*i*m-t*a*m)*M,e[15]=(o*f*r-u*a*r+u*i*l-t*f*l-o*i*h+t*a*h)*M,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,f=a+a,h=s*c,p=s*u,v=s*f,_=o*u,m=o*f,d=a*f,g=l*c,x=l*u,y=l*f,C=i.x,w=i.y,M=i.z;return r[0]=(1-(_+d))*C,r[1]=(p+y)*C,r[2]=(v-x)*C,r[3]=0,r[4]=(p-y)*w,r[5]=(1-(h+d))*w,r[6]=(m+g)*w,r[7]=0,r[8]=(v+x)*M,r[9]=(m-g)*M,r[10]=(1-(h+_))*M,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=ls.set(r[0],r[1],r[2]).length();const o=ls.set(r[4],r[5],r[6]).length(),a=ls.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Hn.copy(this);const c=1/s,u=1/o,f=1/a;return Hn.elements[0]*=c,Hn.elements[1]*=c,Hn.elements[2]*=c,Hn.elements[4]*=u,Hn.elements[5]*=u,Hn.elements[6]*=u,Hn.elements[8]*=f,Hn.elements[9]*=f,Hn.elements[10]*=f,t.setFromRotationMatrix(Hn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=Pi){const l=this.elements,c=2*s/(t-e),u=2*s/(i-r),f=(t+e)/(t-e),h=(i+r)/(i-r);let p,v;if(a===Pi)p=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===bl)p=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Pi){const l=this.elements,c=1/(t-e),u=1/(i-r),f=1/(o-s),h=(t+e)*c,p=(i+r)*u;let v,_;if(a===Pi)v=(o+s)*f,_=-2*f;else if(a===bl)v=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const ls=new H,Hn=new Wt,Bx=new H(0,0,0),Hx=new H(1,1,1),Gi=new H,Ta=new H,_n=new H,zf=new Wt,kf=new Gr;class ic{constructor(e=0,t=0,i=0,r=ic.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Qt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return zf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(zf,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return kf.setFromEuler(this),this.setFromQuaternion(kf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ic.DEFAULT_ORDER="XYZ";class Eg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Vx=0;const Bf=new H,cs=new Gr,xi=new Wt,Aa=new H,uo=new H,Gx=new H,Wx=new Gr,Hf=new H(1,0,0),Vf=new H(0,1,0),Gf=new H(0,0,1),Xx={type:"added"},jx={type:"removed"};class En extends $r{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vx++}),this.uuid=no(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=En.DEFAULT_UP.clone();const e=new H,t=new ic,i=new Gr,r=new H(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Wt},normalMatrix:{value:new Ye}}),this.matrix=new Wt,this.matrixWorld=new Wt,this.matrixAutoUpdate=En.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=En.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Eg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return cs.setFromAxisAngle(e,t),this.quaternion.multiply(cs),this}rotateOnWorldAxis(e,t){return cs.setFromAxisAngle(e,t),this.quaternion.premultiply(cs),this}rotateX(e){return this.rotateOnAxis(Hf,e)}rotateY(e){return this.rotateOnAxis(Vf,e)}rotateZ(e){return this.rotateOnAxis(Gf,e)}translateOnAxis(e,t){return Bf.copy(e).applyQuaternion(this.quaternion),this.position.add(Bf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Hf,e)}translateY(e){return this.translateOnAxis(Vf,e)}translateZ(e){return this.translateOnAxis(Gf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Aa.copy(e):Aa.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),uo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xi.lookAt(uo,Aa,this.up):xi.lookAt(Aa,uo,this.up),this.quaternion.setFromRotationMatrix(xi),r&&(xi.extractRotation(r.matrixWorld),cs.setFromRotationMatrix(xi),this.quaternion.premultiply(cs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Xx)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(jx)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xi.multiply(e.parent.matrixWorld)),e.applyMatrix4(xi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(uo,e,Gx),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(uo,Wx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++){const a=r[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),p=o(e.animations),v=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}En.DEFAULT_UP=new H(0,1,0);En.DEFAULT_MATRIX_AUTO_UPDATE=!0;En.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Vn=new H,yi=new H,Wc=new H,Si=new H,us=new H,hs=new H,Wf=new H,Xc=new H,jc=new H,qc=new H;let Ca=!1;class qn{constructor(e=new H,t=new H,i=new H){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Vn.subVectors(e,t),r.cross(Vn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Vn.subVectors(r,t),yi.subVectors(i,t),Wc.subVectors(e,t);const o=Vn.dot(Vn),a=Vn.dot(yi),l=Vn.dot(Wc),c=yi.dot(yi),u=yi.dot(Wc),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,p=(c*l-a*u)*h,v=(o*u-a*l)*h;return s.set(1-p-v,v,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Si)===null?!1:Si.x>=0&&Si.y>=0&&Si.x+Si.y<=1}static getUV(e,t,i,r,s,o,a,l){return Ca===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ca=!0),this.getInterpolation(e,t,i,r,s,o,a,l)}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,Si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Si.x),l.addScaledVector(o,Si.y),l.addScaledVector(a,Si.z),l)}static isFrontFacing(e,t,i,r){return Vn.subVectors(i,t),yi.subVectors(e,t),Vn.cross(yi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vn.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),Vn.cross(yi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return qn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return qn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return Ca===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ca=!0),qn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return qn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return qn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return qn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;us.subVectors(r,i),hs.subVectors(s,i),Xc.subVectors(e,i);const l=us.dot(Xc),c=hs.dot(Xc);if(l<=0&&c<=0)return t.copy(i);jc.subVectors(e,r);const u=us.dot(jc),f=hs.dot(jc);if(u>=0&&f<=u)return t.copy(r);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(us,o);qc.subVectors(e,s);const p=us.dot(qc),v=hs.dot(qc);if(v>=0&&p<=v)return t.copy(s);const _=p*c-l*v;if(_<=0&&c>=0&&v<=0)return a=c/(c-v),t.copy(i).addScaledVector(hs,a);const m=u*v-p*f;if(m<=0&&f-u>=0&&p-v>=0)return Wf.subVectors(s,r),a=(f-u)/(f-u+(p-v)),t.copy(r).addScaledVector(Wf,a);const d=1/(m+_+h);return o=_*d,a=h*d,t.copy(i).addScaledVector(us,o).addScaledVector(hs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Mg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},ba={h:0,s:0,l:0};function Yc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ze{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=st.workingColorSpace){if(e=Gh(e,1),t=Qt(t,0,1),i=Qt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Yc(o,s,e+1/3),this.g=Yc(o,s,e),this.b=Yc(o,s,e-1/3)}return st.toWorkingColorSpace(this,r),this}setStyle(e,t=zt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){const i=Mg[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=zs(e.r),this.g=zs(e.g),this.b=zs(e.b),this}copyLinearToSRGB(e){return this.r=Fc(e.r),this.g=Fc(e.g),this.b=Fc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return st.fromWorkingColorSpace($t.copy(this),e),Math.round(Qt($t.r*255,0,255))*65536+Math.round(Qt($t.g*255,0,255))*256+Math.round(Qt($t.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.fromWorkingColorSpace($t.copy(this),t);const i=$t.r,r=$t.g,s=$t.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=st.workingColorSpace){return st.fromWorkingColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=zt){st.fromWorkingColorSpace($t.copy(this),e);const t=$t.r,i=$t.g,r=$t.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Wi),this.setHSL(Wi.h+e,Wi.s+t,Wi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Wi),e.getHSL(ba);const i=Po(Wi.h,ba.h,t),r=Po(Wi.s,ba.s,t),s=Po(Wi.l,ba.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const $t=new ze;ze.NAMES=Mg;let qx=0;class rc extends $r{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qx++}),this.uuid=no(),this.name="",this.type="Material",this.blending=Os,this.side=fr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zu,this.blendDst=ku,this.blendEquation=Rr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=wl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=is,this.stencilZFail=is,this.stencilZPass=is,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Os&&(i.blending=this.blending),this.side!==fr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==zu&&(i.blendSrc=this.blendSrc),this.blendDst!==ku&&(i.blendDst=this.blendDst),this.blendEquation!==Rr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==wl&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Pf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==is&&(i.stencilFail=this.stencilFail),this.stencilZFail!==is&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==is&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class wg extends rc{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=og,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wt=new H,Ra=new Ge;class di{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Lf,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ji,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ra.fromBufferAttribute(this,t),Ra.applyMatrix3(e),this.setXY(t,Ra.x,Ra.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix3(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Es(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=tn(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Es(t,this.array)),t}setX(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Es(t,this.array)),t}setY(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Es(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Es(t,this.array)),t}setW(e,t){return this.normalized&&(t=tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),i=tn(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),i=tn(i,this.array),r=tn(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=tn(t,this.array),i=tn(i,this.array),r=tn(r,this.array),s=tn(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Lf&&(e.usage=this.usage),e}}class Tg extends di{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Ag extends di{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class kr extends di{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Yx=0;const Rn=new Wt,$c=new En,ds=new H,xn=new ca,ho=new ca,Ft=new H;class Kr extends $r{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yx++}),this.uuid=no(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vg(e)?Ag:Tg)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ye().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Rn.makeRotationFromQuaternion(e),this.applyMatrix4(Rn),this}rotateX(e){return Rn.makeRotationX(e),this.applyMatrix4(Rn),this}rotateY(e){return Rn.makeRotationY(e),this.applyMatrix4(Rn),this}rotateZ(e){return Rn.makeRotationZ(e),this.applyMatrix4(Rn),this}translate(e,t,i){return Rn.makeTranslation(e,t,i),this.applyMatrix4(Rn),this}scale(e,t,i){return Rn.makeScale(e,t,i),this.applyMatrix4(Rn),this}lookAt(e){return $c.lookAt(e),$c.updateMatrix(),this.applyMatrix4($c.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ds).negate(),this.translate(ds.x,ds.y,ds.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new kr(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ca);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];xn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wh);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new H,1/0);return}if(e){const i=this.boundingSphere.center;if(xn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];ho.setFromBufferAttribute(a),this.morphTargetsRelative?(Ft.addVectors(xn.min,ho.min),xn.expandByPoint(Ft),Ft.addVectors(xn.max,ho.max),xn.expandByPoint(Ft)):(xn.expandByPoint(ho.min),xn.expandByPoint(ho.max))}xn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Ft.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ft));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ft.fromBufferAttribute(a,c),l&&(ds.fromBufferAttribute(e,c),Ft.add(ds)),r=Math.max(r,i.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,o=t.uv.array,a=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new di(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],u=[];for(let T=0;T<a;T++)c[T]=new H,u[T]=new H;const f=new H,h=new H,p=new H,v=new Ge,_=new Ge,m=new Ge,d=new H,g=new H;function x(T,k,G){f.fromArray(r,T*3),h.fromArray(r,k*3),p.fromArray(r,G*3),v.fromArray(o,T*2),_.fromArray(o,k*2),m.fromArray(o,G*2),h.sub(f),p.sub(f),_.sub(v),m.sub(v);const z=1/(_.x*m.y-m.x*_.y);!isFinite(z)||(d.copy(h).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(z),g.copy(p).multiplyScalar(_.x).addScaledVector(h,-m.x).multiplyScalar(z),c[T].add(d),c[k].add(d),c[G].add(d),u[T].add(g),u[k].add(g),u[G].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:i.length}]);for(let T=0,k=y.length;T<k;++T){const G=y[T],z=G.start,P=G.count;for(let I=z,N=z+P;I<N;I+=3)x(i[I+0],i[I+1],i[I+2])}const C=new H,w=new H,M=new H,F=new H;function E(T){M.fromArray(s,T*3),F.copy(M);const k=c[T];C.copy(k),C.sub(M.multiplyScalar(M.dot(k))).normalize(),w.crossVectors(F,k);const z=w.dot(u[T])<0?-1:1;l[T*4]=C.x,l[T*4+1]=C.y,l[T*4+2]=C.z,l[T*4+3]=z}for(let T=0,k=y.length;T<k;++T){const G=y[T],z=G.start,P=G.count;for(let I=z,N=z+P;I<N;I+=3)E(i[I+0]),E(i[I+1]),E(i[I+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new di(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new H,s=new H,o=new H,a=new H,l=new H,c=new H,u=new H,f=new H;if(e)for(let h=0,p=e.count;h<p;h+=3){const v=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,v),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let p=0,v=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*u;for(let d=0;d<u;d++)h[v++]=c[p++]}return new di(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Kr,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],p=e(h,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,p=f.length;h<p;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Xf=new Wt,Mr=new Sg,Pa=new Wh,jf=new H,fs=new H,ps=new H,ms=new H,Kc=new H,La=new H,Na=new Ge,Da=new Ge,Ia=new Ge,qf=new H,Yf=new H,$f=new H,Ua=new H,Fa=new H;class Zn extends En{constructor(e=new Kr,t=new wg){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){La.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(Kc.fromBufferAttribute(f,e),o?La.addScaledVector(Kc,u):La.addScaledVector(Kc.sub(t),u))}t.add(La)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Pa.copy(i.boundingSphere),Pa.applyMatrix4(s),Mr.copy(e.ray).recast(e.near),!(Pa.containsPoint(Mr.origin)===!1&&(Mr.intersectSphere(Pa,jf)===null||Mr.origin.distanceToSquared(jf)>(e.far-e.near)**2))&&(Xf.copy(s).invert(),Mr.copy(e.ray).applyMatrix4(Xf),!(i.boundingBox!==null&&Mr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Mr)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,_=h.length;v<_;v++){const m=h[v],d=o[m.materialIndex],g=Math.max(m.start,p.start),x=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=g,C=x;y<C;y+=3){const w=a.getX(y),M=a.getX(y+1),F=a.getX(y+2);r=Oa(this,d,e,i,c,u,f,w,M,F),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const v=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=v,d=_;m<d;m+=3){const g=a.getX(m),x=a.getX(m+1),y=a.getX(m+2);r=Oa(this,o,e,i,c,u,f,g,x,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,_=h.length;v<_;v++){const m=h[v],d=o[m.materialIndex],g=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=g,C=x;y<C;y+=3){const w=y,M=y+1,F=y+2;r=Oa(this,d,e,i,c,u,f,w,M,F),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const v=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=v,d=_;m<d;m+=3){const g=m,x=m+1,y=m+2;r=Oa(this,o,e,i,c,u,f,g,x,y),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function $x(n,e,t,i,r,s,o,a){let l;if(e.side===dn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===fr,a),l===null)return null;Fa.copy(a),Fa.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Fa);return c<t.near||c>t.far?null:{distance:c,point:Fa.clone(),object:n}}function Oa(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,fs),n.getVertexPosition(l,ps),n.getVertexPosition(c,ms);const u=$x(n,e,t,i,fs,ps,ms,Ua);if(u){r&&(Na.fromBufferAttribute(r,a),Da.fromBufferAttribute(r,l),Ia.fromBufferAttribute(r,c),u.uv=qn.getInterpolation(Ua,fs,ps,ms,Na,Da,Ia,new Ge)),s&&(Na.fromBufferAttribute(s,a),Da.fromBufferAttribute(s,l),Ia.fromBufferAttribute(s,c),u.uv1=qn.getInterpolation(Ua,fs,ps,ms,Na,Da,Ia,new Ge),u.uv2=u.uv1),o&&(qf.fromBufferAttribute(o,a),Yf.fromBufferAttribute(o,l),$f.fromBufferAttribute(o,c),u.normal=qn.getInterpolation(Ua,fs,ps,ms,qf,Yf,$f,new H),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new H,materialIndex:0};qn.getNormal(fs,ps,ms,f.normal),u.face=f}return u}class Zr extends Kr{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,p=0;v("z","y","x",-1,-1,i,t,e,o,s,0),v("z","y","x",1,-1,i,t,-e,o,s,1),v("x","z","y",1,1,e,i,t,r,o,2),v("x","z","y",1,-1,e,i,-t,r,o,3),v("x","y","z",1,-1,e,t,i,r,s,4),v("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new kr(c,3)),this.setAttribute("normal",new kr(u,3)),this.setAttribute("uv",new kr(f,2));function v(_,m,d,g,x,y,C,w,M,F,E){const T=y/M,k=C/F,G=y/2,z=C/2,P=w/2,I=M+1,N=F+1;let Z=0,D=0;const O=new H;for(let V=0;V<N;V++){const Q=V*k-z;for(let W=0;W<I;W++){const $=W*T-G;O[_]=$*g,O[m]=Q*x,O[d]=P,c.push(O.x,O.y,O.z),O[_]=0,O[m]=0,O[d]=w>0?1:-1,u.push(O.x,O.y,O.z),f.push(W/M),f.push(1-V/F),Z+=1}}for(let V=0;V<F;V++)for(let Q=0;Q<M;Q++){const W=h+Q+I*V,$=h+Q+I*(V+1),J=h+(Q+1)+I*(V+1),ce=h+(Q+1)+I*V;l.push(W,$,ce),l.push($,J,ce),D+=6}a.addGroup(p,D,E),p+=D,h+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ys(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function nn(n){const e={};for(let t=0;t<n.length;t++){const i=Ys(n[t]);for(const r in i)e[r]=i[r]}return e}function Kx(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Cg(n){return n.getRenderTarget()===null?n.outputColorSpace:st.workingColorSpace}const Zx={clone:Ys,merge:nn};var Qx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mi extends rc{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qx,this.fragmentShader=Jx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ys(e.uniforms),this.uniformsGroups=Kx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class bg extends En{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Wt,this.projectionMatrix=new Wt,this.projectionMatrixInverse=new Wt,this.coordinateSystem=Pi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Ln extends bg{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Wo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ro*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Wo*2*Math.atan(Math.tan(Ro*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ro*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const gs=-90,vs=1;class ey extends En{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ln(gs,vs,e,t);r.layers=this.layers,this.add(r);const s=new Ln(gs,vs,e,t);s.layers=this.layers,this.add(s);const o=new Ln(gs,vs,e,t);o.layers=this.layers,this.add(o);const a=new Ln(gs,vs,e,t);a.layers=this.layers,this.add(a);const l=new Ln(gs,vs,e,t);l.layers=this.layers,this.add(l);const c=new Ln(gs,vs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Pi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===bl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(f,h,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class Rg extends fn{constructor(e,t,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:Xs,super(e,t,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ty extends Vr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(Lo("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===zr?zt:Un),this.texture=new Rg(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Pn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Zr(5,5,5),s=new mi({name:"CubemapFromEquirect",uniforms:Ys(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:dn,blending:nr});s.uniforms.tEquirect.value=t;const o=new Zn(r,s),a=t.minFilter;return t.minFilter===Vo&&(t.minFilter=Pn),new ey(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}const Zc=new H,ny=new H,iy=new Ye;class qi{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Zc.subVectors(i,t).cross(ny.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Zc),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||iy.getNormalMatrix(e),r=this.coplanarPoint(Zc).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const wr=new Wh,za=new H;class Pg{constructor(e=new qi,t=new qi,i=new qi,r=new qi,s=new qi,o=new qi){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Pi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],f=r[6],h=r[7],p=r[8],v=r[9],_=r[10],m=r[11],d=r[12],g=r[13],x=r[14],y=r[15];if(i[0].setComponents(l-s,h-c,m-p,y-d).normalize(),i[1].setComponents(l+s,h+c,m+p,y+d).normalize(),i[2].setComponents(l+o,h+u,m+v,y+g).normalize(),i[3].setComponents(l-o,h-u,m-v,y-g).normalize(),i[4].setComponents(l-a,h-f,m-_,y-x).normalize(),t===Pi)i[5].setComponents(l+a,h+f,m+_,y+x).normalize();else if(t===bl)i[5].setComponents(a,f,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),wr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),wr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(wr)}intersectsSprite(e){return wr.center.set(0,0,0),wr.radius=.7071067811865476,wr.applyMatrix4(e.matrixWorld),this.intersectsSphere(wr)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(za.x=r.normal.x>0?e.max.x:e.min.x,za.y=r.normal.y>0?e.max.y:e.min.y,za.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(za)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Lg(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function ry(n,e){const t=e.isWebGL2,i=new WeakMap;function r(c,u){const f=c.array,h=c.usage,p=f.byteLength,v=n.createBuffer();n.bindBuffer(u,v),n.bufferData(u,f,h),c.onUploadCallback();let _;if(f instanceof Float32Array)_=n.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)_=n.SHORT;else if(f instanceof Uint32Array)_=n.UNSIGNED_INT;else if(f instanceof Int32Array)_=n.INT;else if(f instanceof Int8Array)_=n.BYTE;else if(f instanceof Uint8Array)_=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)_=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:v,type:_,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:p}}function s(c,u,f){const h=u.array,p=u._updateRange,v=u.updateRanges;if(n.bindBuffer(f,c),p.count===-1&&v.length===0&&n.bufferSubData(f,0,h),v.length!==0){for(let _=0,m=v.length;_<m;_++){const d=v[_];t?n.bufferSubData(f,d.start*h.BYTES_PER_ELEMENT,h,d.start,d.count):n.bufferSubData(f,d.start*h.BYTES_PER_ELEMENT,h.subarray(d.start,d.start+d.count))}u.clearUpdateRanges()}p.count!==-1&&(t?n.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h,p.offset,p.count):n.bufferSubData(f,p.offset*h.BYTES_PER_ELEMENT,h.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);u&&(n.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const h=i.get(c);(!h||h.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=i.get(c);if(f===void 0)i.set(c,r(c,u));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,c,u),f.version=c.version}}return{get:o,remove:a,update:l}}class sc extends Kr{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,f=e/a,h=t/l,p=[],v=[],_=[],m=[];for(let d=0;d<u;d++){const g=d*h-o;for(let x=0;x<c;x++){const y=x*f-s;v.push(y,-g,0),_.push(0,0,1),m.push(x/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let g=0;g<a;g++){const x=g+c*d,y=g+c*(d+1),C=g+1+c*(d+1),w=g+1+c*d;p.push(x,y,w),p.push(y,C,w)}this.setIndex(p),this.setAttribute("position",new kr(v,3)),this.setAttribute("normal",new kr(_,3)),this.setAttribute("uv",new kr(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sc(e.width,e.height,e.widthSegments,e.heightSegments)}}var sy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,oy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ay=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ly=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cy=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,uy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,dy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fy=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,py=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,my=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,_y=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,xy=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,yy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Sy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ey=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,My=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wy=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ty=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ay=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Cy=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,by=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ry=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Py=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ly=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ny=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Iy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Uy="gl_FragColor = linearToOutputTexel( gl_FragColor );",Fy=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Oy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,zy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ky=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,By=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Wy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,qy=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Yy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$y=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ky=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Qy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Jy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,eS=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,tS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,nS=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,iS=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,rS=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,sS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,oS=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,aS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lS=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,cS=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uS=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,hS=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,dS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,pS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,mS=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,vS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_S=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,yS=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,SS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,ES=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,MS=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,wS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,TS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,AS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,CS=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,bS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,RS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,PS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,LS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,NS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,DS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,IS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,US=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,FS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,OS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,zS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,BS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,HS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,VS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,GS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,WS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,XS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,qS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,YS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$S=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,KS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ZS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,QS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,JS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,eE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,nE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,iE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,aE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,hE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,dE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,fE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,pE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,vE=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_E=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,xE=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yE=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,SE=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,EE=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ME=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wE=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,TE=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,AE=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,CE=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bE=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,RE=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,PE=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,LE=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,NE=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,DE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,IE=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,UE=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,FE=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,OE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:sy,alphahash_pars_fragment:oy,alphamap_fragment:ay,alphamap_pars_fragment:ly,alphatest_fragment:cy,alphatest_pars_fragment:uy,aomap_fragment:hy,aomap_pars_fragment:dy,batching_pars_vertex:fy,batching_vertex:py,begin_vertex:my,beginnormal_vertex:gy,bsdfs:vy,iridescence_fragment:_y,bumpmap_pars_fragment:xy,clipping_planes_fragment:yy,clipping_planes_pars_fragment:Sy,clipping_planes_pars_vertex:Ey,clipping_planes_vertex:My,color_fragment:wy,color_pars_fragment:Ty,color_pars_vertex:Ay,color_vertex:Cy,common:by,cube_uv_reflection_fragment:Ry,defaultnormal_vertex:Py,displacementmap_pars_vertex:Ly,displacementmap_vertex:Ny,emissivemap_fragment:Dy,emissivemap_pars_fragment:Iy,colorspace_fragment:Uy,colorspace_pars_fragment:Fy,envmap_fragment:Oy,envmap_common_pars_fragment:zy,envmap_pars_fragment:ky,envmap_pars_vertex:By,envmap_physical_pars_fragment:Qy,envmap_vertex:Hy,fog_vertex:Vy,fog_pars_vertex:Gy,fog_fragment:Wy,fog_pars_fragment:Xy,gradientmap_pars_fragment:jy,lightmap_fragment:qy,lightmap_pars_fragment:Yy,lights_lambert_fragment:$y,lights_lambert_pars_fragment:Ky,lights_pars_begin:Zy,lights_toon_fragment:Jy,lights_toon_pars_fragment:eS,lights_phong_fragment:tS,lights_phong_pars_fragment:nS,lights_physical_fragment:iS,lights_physical_pars_fragment:rS,lights_fragment_begin:sS,lights_fragment_maps:oS,lights_fragment_end:aS,logdepthbuf_fragment:lS,logdepthbuf_pars_fragment:cS,logdepthbuf_pars_vertex:uS,logdepthbuf_vertex:hS,map_fragment:dS,map_pars_fragment:fS,map_particle_fragment:pS,map_particle_pars_fragment:mS,metalnessmap_fragment:gS,metalnessmap_pars_fragment:vS,morphcolor_vertex:_S,morphnormal_vertex:xS,morphtarget_pars_vertex:yS,morphtarget_vertex:SS,normal_fragment_begin:ES,normal_fragment_maps:MS,normal_pars_fragment:wS,normal_pars_vertex:TS,normal_vertex:AS,normalmap_pars_fragment:CS,clearcoat_normal_fragment_begin:bS,clearcoat_normal_fragment_maps:RS,clearcoat_pars_fragment:PS,iridescence_pars_fragment:LS,opaque_fragment:NS,packing:DS,premultiplied_alpha_fragment:IS,project_vertex:US,dithering_fragment:FS,dithering_pars_fragment:OS,roughnessmap_fragment:zS,roughnessmap_pars_fragment:kS,shadowmap_pars_fragment:BS,shadowmap_pars_vertex:HS,shadowmap_vertex:VS,shadowmask_pars_fragment:GS,skinbase_vertex:WS,skinning_pars_vertex:XS,skinning_vertex:jS,skinnormal_vertex:qS,specularmap_fragment:YS,specularmap_pars_fragment:$S,tonemapping_fragment:KS,tonemapping_pars_fragment:ZS,transmission_fragment:QS,transmission_pars_fragment:JS,uv_pars_fragment:eE,uv_pars_vertex:tE,uv_vertex:nE,worldpos_vertex:iE,background_vert:rE,background_frag:sE,backgroundCube_vert:oE,backgroundCube_frag:aE,cube_vert:lE,cube_frag:cE,depth_vert:uE,depth_frag:hE,distanceRGBA_vert:dE,distanceRGBA_frag:fE,equirect_vert:pE,equirect_frag:mE,linedashed_vert:gE,linedashed_frag:vE,meshbasic_vert:_E,meshbasic_frag:xE,meshlambert_vert:yE,meshlambert_frag:SE,meshmatcap_vert:EE,meshmatcap_frag:ME,meshnormal_vert:wE,meshnormal_frag:TE,meshphong_vert:AE,meshphong_frag:CE,meshphysical_vert:bE,meshphysical_frag:RE,meshtoon_vert:PE,meshtoon_frag:LE,points_vert:NE,points_frag:DE,shadow_vert:IE,shadow_frag:UE,sprite_vert:FE,sprite_frag:OE},le={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new Ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new Ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},ci={basic:{uniforms:nn([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:nn([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new ze(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:nn([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:nn([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:nn([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new ze(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:nn([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:nn([le.points,le.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:nn([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:nn([le.common,le.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:nn([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:nn([le.sprite,le.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:nn([le.common,le.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:nn([le.lights,le.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};ci.physical={uniforms:nn([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new Ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new Ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new Ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const ka={r:0,b:0,g:0};function zE(n,e,t,i,r,s,o){const a=new ze(0);let l=s===!0?0:1,c,u,f=null,h=0,p=null;function v(m,d){let g=!1,x=d.isScene===!0?d.background:null;x&&x.isTexture&&(x=(d.backgroundBlurriness>0?t:e).get(x)),x===null?_(a,l):x&&x.isColor&&(_(x,1),g=!0);const y=n.xr.getEnvironmentBlendMode();y==="additive"?i.buffers.color.setClear(0,0,0,1,o):y==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||g)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),x&&(x.isCubeTexture||x.mapping===tc)?(u===void 0&&(u=new Zn(new Zr(1,1,1),new mi({name:"BackgroundCubeMaterial",uniforms:Ys(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,w,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.toneMapped=st.getTransfer(x.colorSpace)!==ut,(f!==x||h!==x.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,f=x,h=x.version,p=n.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Zn(new sc(2,2),new mi({name:"BackgroundMaterial",uniforms:Ys(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:fr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=st.getTransfer(x.colorSpace)!==ut,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||h!==x.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,f=x,h=x.version,p=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,d){m.getRGB(ka,Cg(n)),i.buffers.color.setClear(ka.r,ka.g,ka.b,d,o)}return{getClearColor:function(){return a},setClearColor:function(m,d=1){a.set(m),l=d,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(a,l)},render:v}}function kE(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),o=i.isWebGL2||s!==null,a={},l=m(null);let c=l,u=!1;function f(P,I,N,Z,D){let O=!1;if(o){const V=_(Z,N,I);c!==V&&(c=V,p(c.object)),O=d(P,Z,N,D),O&&g(P,Z,N,D)}else{const V=I.wireframe===!0;(c.geometry!==Z.id||c.program!==N.id||c.wireframe!==V)&&(c.geometry=Z.id,c.program=N.id,c.wireframe=V,O=!0)}D!==null&&t.update(D,n.ELEMENT_ARRAY_BUFFER),(O||u)&&(u=!1,F(P,I,N,Z),D!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(D).buffer))}function h(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function p(P){return i.isWebGL2?n.bindVertexArray(P):s.bindVertexArrayOES(P)}function v(P){return i.isWebGL2?n.deleteVertexArray(P):s.deleteVertexArrayOES(P)}function _(P,I,N){const Z=N.wireframe===!0;let D=a[P.id];D===void 0&&(D={},a[P.id]=D);let O=D[I.id];O===void 0&&(O={},D[I.id]=O);let V=O[Z];return V===void 0&&(V=m(h()),O[Z]=V),V}function m(P){const I=[],N=[],Z=[];for(let D=0;D<r;D++)I[D]=0,N[D]=0,Z[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:N,attributeDivisors:Z,object:P,attributes:{},index:null}}function d(P,I,N,Z){const D=c.attributes,O=I.attributes;let V=0;const Q=N.getAttributes();for(const W in Q)if(Q[W].location>=0){const J=D[W];let ce=O[W];if(ce===void 0&&(W==="instanceMatrix"&&P.instanceMatrix&&(ce=P.instanceMatrix),W==="instanceColor"&&P.instanceColor&&(ce=P.instanceColor)),J===void 0||J.attribute!==ce||ce&&J.data!==ce.data)return!0;V++}return c.attributesNum!==V||c.index!==Z}function g(P,I,N,Z){const D={},O=I.attributes;let V=0;const Q=N.getAttributes();for(const W in Q)if(Q[W].location>=0){let J=O[W];J===void 0&&(W==="instanceMatrix"&&P.instanceMatrix&&(J=P.instanceMatrix),W==="instanceColor"&&P.instanceColor&&(J=P.instanceColor));const ce={};ce.attribute=J,J&&J.data&&(ce.data=J.data),D[W]=ce,V++}c.attributes=D,c.attributesNum=V,c.index=Z}function x(){const P=c.newAttributes;for(let I=0,N=P.length;I<N;I++)P[I]=0}function y(P){C(P,0)}function C(P,I){const N=c.newAttributes,Z=c.enabledAttributes,D=c.attributeDivisors;N[P]=1,Z[P]===0&&(n.enableVertexAttribArray(P),Z[P]=1),D[P]!==I&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,I),D[P]=I)}function w(){const P=c.newAttributes,I=c.enabledAttributes;for(let N=0,Z=I.length;N<Z;N++)I[N]!==P[N]&&(n.disableVertexAttribArray(N),I[N]=0)}function M(P,I,N,Z,D,O,V){V===!0?n.vertexAttribIPointer(P,I,N,D,O):n.vertexAttribPointer(P,I,N,Z,D,O)}function F(P,I,N,Z){if(i.isWebGL2===!1&&(P.isInstancedMesh||Z.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const D=Z.attributes,O=N.getAttributes(),V=I.defaultAttributeValues;for(const Q in O){const W=O[Q];if(W.location>=0){let $=D[Q];if($===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&($=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&($=P.instanceColor)),$!==void 0){const J=$.normalized,ce=$.itemSize,pe=t.get($);if(pe===void 0)continue;const xe=pe.buffer,Fe=pe.type,Oe=pe.bytesPerElement,Pe=i.isWebGL2===!0&&(Fe===n.INT||Fe===n.UNSIGNED_INT||$.gpuType===lg);if($.isInterleavedBufferAttribute){const $e=$.data,j=$e.stride,Ht=$.offset;if($e.isInstancedInterleavedBuffer){for(let Ce=0;Ce<W.locationSize;Ce++)C(W.location+Ce,$e.meshPerAttribute);P.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=$e.meshPerAttribute*$e.count)}else for(let Ce=0;Ce<W.locationSize;Ce++)y(W.location+Ce);n.bindBuffer(n.ARRAY_BUFFER,xe);for(let Ce=0;Ce<W.locationSize;Ce++)M(W.location+Ce,ce/W.locationSize,Fe,J,j*Oe,(Ht+ce/W.locationSize*Ce)*Oe,Pe)}else{if($.isInstancedBufferAttribute){for(let $e=0;$e<W.locationSize;$e++)C(W.location+$e,$.meshPerAttribute);P.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let $e=0;$e<W.locationSize;$e++)y(W.location+$e);n.bindBuffer(n.ARRAY_BUFFER,xe);for(let $e=0;$e<W.locationSize;$e++)M(W.location+$e,ce/W.locationSize,Fe,J,ce*Oe,ce/W.locationSize*$e*Oe,Pe)}}else if(V!==void 0){const J=V[Q];if(J!==void 0)switch(J.length){case 2:n.vertexAttrib2fv(W.location,J);break;case 3:n.vertexAttrib3fv(W.location,J);break;case 4:n.vertexAttrib4fv(W.location,J);break;default:n.vertexAttrib1fv(W.location,J)}}}}w()}function E(){G();for(const P in a){const I=a[P];for(const N in I){const Z=I[N];for(const D in Z)v(Z[D].object),delete Z[D];delete I[N]}delete a[P]}}function T(P){if(a[P.id]===void 0)return;const I=a[P.id];for(const N in I){const Z=I[N];for(const D in Z)v(Z[D].object),delete Z[D];delete I[N]}delete a[P.id]}function k(P){for(const I in a){const N=a[I];if(N[P.id]===void 0)continue;const Z=N[P.id];for(const D in Z)v(Z[D].object),delete Z[D];delete N[P.id]}}function G(){z(),u=!0,c!==l&&(c=l,p(c.object))}function z(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:G,resetDefaultState:z,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfProgram:k,initAttributes:x,enableAttribute:y,disableUnusedAttributes:w}}function BE(n,e,t,i){const r=i.isWebGL2;let s;function o(u){s=u}function a(u,f){n.drawArrays(s,u,f),t.update(f,s,1)}function l(u,f,h){if(h===0)return;let p,v;if(r)p=n,v="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),v="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[v](s,u,f,h),t.update(f,s,h)}function c(u,f,h){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<h;v++)this.render(u[v],f[v]);else{p.multiDrawArraysWEBGL(s,u,0,f,0,h);let v=0;for(let _=0;_<h;_++)v+=f[_];t.update(v,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function HE(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const M=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(M){if(M==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),v=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),d=n.getParameter(n.MAX_VARYING_VECTORS),g=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),x=h>0,y=o||e.has("OES_texture_float"),C=x&&y,w=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:h,maxTextureSize:p,maxCubemapSize:v,maxAttributes:_,maxVertexUniforms:m,maxVaryings:d,maxFragmentUniforms:g,vertexTextures:x,floatFragmentTextures:y,floatVertexTextures:C,maxSamples:w}}function VE(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new qi,a=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const p=f.length!==0||h||i!==0||r;return r=h,i=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,p){const v=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,d=n.get(f);if(!r||v===null||v.length===0||s&&!m)s?u(null):c();else{const g=s?0:i,x=g*4;let y=d.clippingState||null;l.value=y,y=u(v,h,x,p);for(let C=0;C!==x;++C)y[C]=t[C];d.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=g}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,h,p,v){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,v!==!0||m===null){const d=p+_*4,g=h.matrixWorldInverse;a.getNormalMatrix(g),(m===null||m.length<d)&&(m=new Float32Array(d));for(let x=0,y=p;x!==_;++x,y+=4)o.copy(f[x]).applyMatrix4(g,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function GE(n){let e=new WeakMap;function t(o,a){return a===Bu?o.mapping=Xs:a===Hu&&(o.mapping=js),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Bu||a===Hu)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new ty(l.height/2);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class WE extends bg{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ms=4,Kf=[.125,.215,.35,.446,.526,.582],Pr=20,Qc=new WE,Zf=new ze;let Jc=null,eu=0,tu=0;const Ar=(1+Math.sqrt(5))/2,_s=1/Ar,Qf=[new H(1,1,1),new H(-1,1,1),new H(1,1,-1),new H(-1,1,-1),new H(0,Ar,_s),new H(0,Ar,-_s),new H(_s,0,Ar),new H(-_s,0,Ar),new H(Ar,_s,0),new H(-Ar,_s,0)];class Jf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Jc=this._renderer.getRenderTarget(),eu=this._renderer.getActiveCubeFace(),tu=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=np(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Jc,eu,tu),e.scissorTest=!1,Ba(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Xs||e.mapping===js?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Jc=this._renderer.getRenderTarget(),eu=this._renderer.getActiveCubeFace(),tu=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Pn,minFilter:Pn,generateMipmaps:!1,type:Go,format:Kn,colorSpace:Ii,depthBuffer:!1},r=ep(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ep(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=XE(s)),this._blurMaterial=jE(s,e,t)}return r}_compileMaterial(e){const t=new Zn(this._lodPlanes[0],e);this._renderer.compile(t,Qc)}_sceneToCubeUV(e,t,i,r){const a=new Ln(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(Zf),u.toneMapping=ir,u.autoClear=!1;const p=new wg({name:"PMREM.Background",side:dn,depthWrite:!1,depthTest:!1}),v=new Zn(new Zr,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(Zf),_=!0);for(let d=0;d<6;d++){const g=d%3;g===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):g===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const x=this._cubeSize;Ba(r,g*x,d>2?x:0,x,x),u.setRenderTarget(r),_&&u.render(v,a),u.render(e,a)}v.geometry.dispose(),v.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Xs||e.mapping===js;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=np()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tp());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new Zn(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Ba(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Qc)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Qf[(r-1)%Qf.length];this._blur(e,r-1,r,s,o)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new Zn(this._lodPlanes[r],c),h=c.uniforms,p=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Pr-1),_=s/v,m=isFinite(s)?1+Math.floor(u*_):Pr;m>Pr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Pr}`);const d=[];let g=0;for(let M=0;M<Pr;++M){const F=M/_,E=Math.exp(-F*F/2);d.push(E),M===0?g+=E:M<m&&(g+=2*E)}for(let M=0;M<d.length;M++)d[M]=d[M]/g;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=d,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:x}=this;h.dTheta.value=v,h.mipInt.value=x-i;const y=this._sizeLods[r],C=3*y*(r>x-Ms?r-x+Ms:0),w=4*(this._cubeSize-y);Ba(t,C,w,3*y,2*y),l.setRenderTarget(t),l.render(f,Qc)}}function XE(n){const e=[],t=[],i=[];let r=n;const s=n-Ms+1+Kf.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let l=1/a;o>n-Ms?l=Kf[o-n+Ms-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,v=6,_=3,m=2,d=1,g=new Float32Array(_*v*p),x=new Float32Array(m*v*p),y=new Float32Array(d*v*p);for(let w=0;w<p;w++){const M=w%3*2/3-1,F=w>2?0:-1,E=[M,F,0,M+2/3,F,0,M+2/3,F+1,0,M,F,0,M+2/3,F+1,0,M,F+1,0];g.set(E,_*v*w),x.set(h,m*v*w);const T=[w,w,w,w,w,w];y.set(T,d*v*w)}const C=new Kr;C.setAttribute("position",new di(g,_)),C.setAttribute("uv",new di(x,m)),C.setAttribute("faceIndex",new di(y,d)),e.push(C),r>Ms&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function ep(n,e,t){const i=new Vr(n,e,t);return i.texture.mapping=tc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ba(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function jE(n,e,t){const i=new Float32Array(Pr),r=new H(0,1,0);return new mi({name:"SphericalGaussianBlur",defines:{n:Pr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Xh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:nr,depthTest:!1,depthWrite:!1})}function tp(){return new mi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:nr,depthTest:!1,depthWrite:!1})}function np(){return new mi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:nr,depthTest:!1,depthWrite:!1})}function Xh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function qE(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Bu||l===Hu,u=l===Xs||l===js;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=e.get(a);return t===null&&(t=new Jf(n)),f=c?t.fromEquirectangular(a,f):t.fromCubemap(a,f),e.set(a,f),f.texture}else{if(e.has(a))return e.get(a).texture;{const f=a.image;if(c&&f&&f.height>0||u&&f&&r(f)){t===null&&(t=new Jf(n));const h=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",s),h.texture}else return null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function YE(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function $E(n,e,t,i){const r={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const v in h.attributes)e.remove(h.attributes[v]);for(const v in h.morphAttributes){const _=h.morphAttributes[v];for(let m=0,d=_.length;m<d;m++)e.remove(_[m])}h.removeEventListener("dispose",o),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(f,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const v in h)e.update(h[v],n.ARRAY_BUFFER);const p=f.morphAttributes;for(const v in p){const _=p[v];for(let m=0,d=_.length;m<d;m++)e.update(_[m],n.ARRAY_BUFFER)}}function c(f){const h=[],p=f.index,v=f.attributes.position;let _=0;if(p!==null){const g=p.array;_=p.version;for(let x=0,y=g.length;x<y;x+=3){const C=g[x+0],w=g[x+1],M=g[x+2];h.push(C,w,w,M,M,C)}}else if(v!==void 0){const g=v.array;_=v.version;for(let x=0,y=g.length/3-1;x<y;x+=3){const C=x+0,w=x+1,M=x+2;h.push(C,w,w,M,M,C)}}else return;const m=new(vg(h)?Ag:Tg)(h,1);m.version=_;const d=s.get(f);d&&e.remove(d),s.set(f,m)}function u(f){const h=s.get(f);if(h){const p=f.index;p!==null&&h.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function KE(n,e,t,i){const r=i.isWebGL2;let s;function o(p){s=p}let a,l;function c(p){a=p.type,l=p.bytesPerElement}function u(p,v){n.drawElements(s,v,a,p*l),t.update(v,s,1)}function f(p,v,_){if(_===0)return;let m,d;if(r)m=n,d="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[d](s,v,a,p*l,_),t.update(v,s,_)}function h(p,v,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<_;d++)this.render(p[d]/l,v[d]);else{m.multiDrawElementsWEBGL(s,v,0,a,p,0,_);let d=0;for(let g=0;g<_;g++)d+=v[g];t.update(d,s,1)}}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=f,this.renderMultiDraw=h}function ZE(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function QE(n,e){return n[0]-e[0]}function JE(n,e){return Math.abs(e[1])-Math.abs(n[1])}function eM(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,o=new Gt,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,f){const h=c.morphTargetInfluences;if(e.isWebGL2===!0){const v=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=v!==void 0?v.length:0;let m=s.get(u);if(m===void 0||m.count!==_){let I=function(){z.dispose(),s.delete(u),u.removeEventListener("dispose",I)};var p=I;m!==void 0&&m.texture.dispose();const x=u.morphAttributes.position!==void 0,y=u.morphAttributes.normal!==void 0,C=u.morphAttributes.color!==void 0,w=u.morphAttributes.position||[],M=u.morphAttributes.normal||[],F=u.morphAttributes.color||[];let E=0;x===!0&&(E=1),y===!0&&(E=2),C===!0&&(E=3);let T=u.attributes.position.count*E,k=1;T>e.maxTextureSize&&(k=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const G=new Float32Array(T*k*4*_),z=new yg(G,T,k,_);z.type=Ji,z.needsUpdate=!0;const P=E*4;for(let N=0;N<_;N++){const Z=w[N],D=M[N],O=F[N],V=T*k*4*N;for(let Q=0;Q<Z.count;Q++){const W=Q*P;x===!0&&(o.fromBufferAttribute(Z,Q),G[V+W+0]=o.x,G[V+W+1]=o.y,G[V+W+2]=o.z,G[V+W+3]=0),y===!0&&(o.fromBufferAttribute(D,Q),G[V+W+4]=o.x,G[V+W+5]=o.y,G[V+W+6]=o.z,G[V+W+7]=0),C===!0&&(o.fromBufferAttribute(O,Q),G[V+W+8]=o.x,G[V+W+9]=o.y,G[V+W+10]=o.z,G[V+W+11]=O.itemSize===4?o.w:1)}}m={count:_,texture:z,size:new Ge(T,k)},s.set(u,m),u.addEventListener("dispose",I)}let d=0;for(let x=0;x<h.length;x++)d+=h[x];const g=u.morphTargetsRelative?1:1-d;f.getUniforms().setValue(n,"morphTargetBaseInfluence",g),f.getUniforms().setValue(n,"morphTargetInfluences",h),f.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}else{const v=h===void 0?0:h.length;let _=i[u.id];if(_===void 0||_.length!==v){_=[];for(let y=0;y<v;y++)_[y]=[y,0];i[u.id]=_}for(let y=0;y<v;y++){const C=_[y];C[0]=y,C[1]=h[y]}_.sort(JE);for(let y=0;y<8;y++)y<v&&_[y][1]?(a[y][0]=_[y][0],a[y][1]=_[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(QE);const m=u.morphAttributes.position,d=u.morphAttributes.normal;let g=0;for(let y=0;y<8;y++){const C=a[y],w=C[0],M=C[1];w!==Number.MAX_SAFE_INTEGER&&M?(m&&u.getAttribute("morphTarget"+y)!==m[w]&&u.setAttribute("morphTarget"+y,m[w]),d&&u.getAttribute("morphNormal"+y)!==d[w]&&u.setAttribute("morphNormal"+y,d[w]),r[y]=M,g+=M):(m&&u.hasAttribute("morphTarget"+y)===!0&&u.deleteAttribute("morphTarget"+y),d&&u.hasAttribute("morphNormal"+y)===!0&&u.deleteAttribute("morphNormal"+y),r[y]=0)}const x=u.morphTargetsRelative?1:1-g;f.getUniforms().setValue(n,"morphTargetBaseInfluence",x),f.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:l}}function tM(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==c&&(h.update(),r.set(h,c))}return f}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class Ng extends fn{constructor(e,t,i,r,s,o,a,l,c,u){if(u=u!==void 0?u:Or,u!==Or&&u!==qs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===Or&&(i=Qi),i===void 0&&u===qs&&(i=Fr),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:sn,this.minFilter=l!==void 0?l:sn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Dg=new fn,Ig=new Ng(1,1);Ig.compareFunction=gg;const Ug=new yg,Fg=new zx,Og=new Rg,ip=[],rp=[],sp=new Float32Array(16),op=new Float32Array(9),ap=new Float32Array(4);function io(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=ip[r];if(s===void 0&&(s=new Float32Array(r),ip[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Dt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function It(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function oc(n,e){let t=rp[e];t===void 0&&(t=new Int32Array(e),rp[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function nM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function iM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2fv(this.addr,e),It(t,e)}}function rM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Dt(t,e))return;n.uniform3fv(this.addr,e),It(t,e)}}function sM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4fv(this.addr,e),It(t,e)}}function oM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,i))return;ap.set(i),n.uniformMatrix2fv(this.addr,!1,ap),It(t,i)}}function aM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,i))return;op.set(i),n.uniformMatrix3fv(this.addr,!1,op),It(t,i)}}function lM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Dt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),It(t,e)}else{if(Dt(t,i))return;sp.set(i),n.uniformMatrix4fv(this.addr,!1,sp),It(t,i)}}function cM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function uM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2iv(this.addr,e),It(t,e)}}function hM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;n.uniform3iv(this.addr,e),It(t,e)}}function dM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4iv(this.addr,e),It(t,e)}}function fM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function pM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Dt(t,e))return;n.uniform2uiv(this.addr,e),It(t,e)}}function mM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Dt(t,e))return;n.uniform3uiv(this.addr,e),It(t,e)}}function gM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Dt(t,e))return;n.uniform4uiv(this.addr,e),It(t,e)}}function vM(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?Ig:Dg;t.setTexture2D(e||s,r)}function _M(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Fg,r)}function xM(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Og,r)}function yM(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Ug,r)}function SM(n){switch(n){case 5126:return nM;case 35664:return iM;case 35665:return rM;case 35666:return sM;case 35674:return oM;case 35675:return aM;case 35676:return lM;case 5124:case 35670:return cM;case 35667:case 35671:return uM;case 35668:case 35672:return hM;case 35669:case 35673:return dM;case 5125:return fM;case 36294:return pM;case 36295:return mM;case 36296:return gM;case 35678:case 36198:case 36298:case 36306:case 35682:return vM;case 35679:case 36299:case 36307:return _M;case 35680:case 36300:case 36308:case 36293:return xM;case 36289:case 36303:case 36311:case 36292:return yM}}function EM(n,e){n.uniform1fv(this.addr,e)}function MM(n,e){const t=io(e,this.size,2);n.uniform2fv(this.addr,t)}function wM(n,e){const t=io(e,this.size,3);n.uniform3fv(this.addr,t)}function TM(n,e){const t=io(e,this.size,4);n.uniform4fv(this.addr,t)}function AM(n,e){const t=io(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function CM(n,e){const t=io(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function bM(n,e){const t=io(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function RM(n,e){n.uniform1iv(this.addr,e)}function PM(n,e){n.uniform2iv(this.addr,e)}function LM(n,e){n.uniform3iv(this.addr,e)}function NM(n,e){n.uniform4iv(this.addr,e)}function DM(n,e){n.uniform1uiv(this.addr,e)}function IM(n,e){n.uniform2uiv(this.addr,e)}function UM(n,e){n.uniform3uiv(this.addr,e)}function FM(n,e){n.uniform4uiv(this.addr,e)}function OM(n,e,t){const i=this.cache,r=e.length,s=oc(t,r);Dt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Dg,s[o])}function zM(n,e,t){const i=this.cache,r=e.length,s=oc(t,r);Dt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Fg,s[o])}function kM(n,e,t){const i=this.cache,r=e.length,s=oc(t,r);Dt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Og,s[o])}function BM(n,e,t){const i=this.cache,r=e.length,s=oc(t,r);Dt(i,s)||(n.uniform1iv(this.addr,s),It(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Ug,s[o])}function HM(n){switch(n){case 5126:return EM;case 35664:return MM;case 35665:return wM;case 35666:return TM;case 35674:return AM;case 35675:return CM;case 35676:return bM;case 5124:case 35670:return RM;case 35667:case 35671:return PM;case 35668:case 35672:return LM;case 35669:case 35673:return NM;case 5125:return DM;case 36294:return IM;case 36295:return UM;case 36296:return FM;case 35678:case 36198:case 36298:case 36306:case 35682:return OM;case 35679:case 36299:case 36307:return zM;case 35680:case 36300:case 36308:case 36293:return kM;case 36289:case 36303:case 36311:case 36292:return BM}}class VM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=SM(t.type)}}class GM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=HM(t.type)}}class WM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const nu=/(\w+)(\])?(\[|\.)?/g;function lp(n,e){n.seq.push(e),n.map[e.id]=e}function XM(n,e,t){const i=n.name,r=i.length;for(nu.lastIndex=0;;){const s=nu.exec(i),o=nu.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){lp(t,c===void 0?new VM(a,n,e):new GM(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new WM(a),lp(t,f)),t=f}}}class hl{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);XM(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function cp(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const jM=37297;let qM=0;function YM(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function $M(n){const e=st.getPrimaries(st.workingColorSpace),t=st.getPrimaries(n);let i;switch(e===t?i="":e===Cl&&t===Al?i="LinearDisplayP3ToLinearSRGB":e===Al&&t===Cl&&(i="LinearSRGBToLinearDisplayP3"),n){case Ii:case nc:return[i,"LinearTransferOETF"];case zt:case Vh:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function up(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+YM(n.getShaderSource(e),o)}else return r}function KM(n,e){const t=$M(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function ZM(n,e){let t;switch(e){case j_:t="Linear";break;case q_:t="Reinhard";break;case Y_:t="OptimizedCineon";break;case $_:t="ACESFilmic";break;case Z_:t="AgX";break;case K_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function QM(n){return[n.extensionDerivatives||!!n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ws).join(`
`)}function JM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(ws).join(`
`)}function e1(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function t1(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function ws(n){return n!==""}function hp(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function dp(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const n1=/^[ \t]*#include +<([\w\d./]+)>/gm;function ju(n){return n.replace(n1,r1)}const i1=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function r1(n,e){let t=We[e];if(t===void 0){const i=i1.get(e);if(i!==void 0)t=We[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return ju(t)}const s1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fp(n){return n.replace(s1,o1)}function o1(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function pp(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function a1(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===sg?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===y_?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Ci&&(e="SHADOWMAP_TYPE_VSM"),e}function l1(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Xs:case js:e="ENVMAP_TYPE_CUBE";break;case tc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function c1(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case js:e="ENVMAP_MODE_REFRACTION";break}return e}function u1(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case og:e="ENVMAP_BLENDING_MULTIPLY";break;case W_:e="ENVMAP_BLENDING_MIX";break;case X_:e="ENVMAP_BLENDING_ADD";break}return e}function h1(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function d1(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=a1(t),c=l1(t),u=c1(t),f=u1(t),h=h1(t),p=t.isWebGL2?"":QM(t),v=JM(t),_=e1(s),m=r.createProgram();let d,g,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ws).join(`
`),d.length>0&&(d+=`
`),g=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ws).join(`
`),g.length>0&&(g+=`
`)):(d=[pp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ws).join(`
`),g=[p,pp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ir?"#define TONE_MAPPING":"",t.toneMapping!==ir?We.tonemapping_pars_fragment:"",t.toneMapping!==ir?ZM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,KM("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ws).join(`
`)),o=ju(o),o=hp(o,t),o=dp(o,t),a=ju(a),a=hp(a,t),a=dp(a,t),o=fp(o),a=fp(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,d=[v,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,g=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Nf?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Nf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const y=x+d+o,C=x+g+a,w=cp(r,r.VERTEX_SHADER,y),M=cp(r,r.FRAGMENT_SHADER,C);r.attachShader(m,w),r.attachShader(m,M),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function F(G){if(n.debug.checkShaderErrors){const z=r.getProgramInfoLog(m).trim(),P=r.getShaderInfoLog(w).trim(),I=r.getShaderInfoLog(M).trim();let N=!0,Z=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(N=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,m,w,M);else{const D=up(r,w,"vertex"),O=up(r,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+z+`
`+D+`
`+O)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(P===""||I==="")&&(Z=!1);Z&&(G.diagnostics={runnable:N,programLog:z,vertexShader:{log:P,prefix:d},fragmentShader:{log:I,prefix:g}})}r.deleteShader(w),r.deleteShader(M),E=new hl(r,m),T=t1(r,m)}let E;this.getUniforms=function(){return E===void 0&&F(this),E};let T;this.getAttributes=function(){return T===void 0&&F(this),T};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=r.getProgramParameter(m,jM)),k},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=qM++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=M,this}let f1=0;class p1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new m1(e),t.set(e,i)),i}}class m1{constructor(e){this.id=f1++,this.code=e,this.usedTimes=0}}function g1(n,e,t,i,r,s,o){const a=new Eg,l=new p1,c=[],u=r.isWebGL2,f=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return E===0?"uv":`uv${E}`}function m(E,T,k,G,z){const P=G.fog,I=z.geometry,N=E.isMeshStandardMaterial?G.environment:null,Z=(E.isMeshStandardMaterial?t:e).get(E.envMap||N),D=!!Z&&Z.mapping===tc?Z.image.height:null,O=v[E.type];E.precision!==null&&(p=r.getMaxPrecision(E.precision),p!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",p,"instead."));const V=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,Q=V!==void 0?V.length:0;let W=0;I.morphAttributes.position!==void 0&&(W=1),I.morphAttributes.normal!==void 0&&(W=2),I.morphAttributes.color!==void 0&&(W=3);let $,J,ce,pe;if(O){const yt=ci[O];$=yt.vertexShader,J=yt.fragmentShader}else $=E.vertexShader,J=E.fragmentShader,l.update(E),ce=l.getVertexShaderID(E),pe=l.getFragmentShaderID(E);const xe=n.getRenderTarget(),Fe=z.isInstancedMesh===!0,Oe=z.isBatchedMesh===!0,Pe=!!E.map,$e=!!E.matcap,j=!!Z,Ht=!!E.aoMap,Ce=!!E.lightMap,De=!!E.bumpMap,Ee=!!E.normalMap,at=!!E.displacementMap,Be=!!E.emissiveMap,R=!!E.metalnessMap,A=!!E.roughnessMap,X=E.anisotropy>0,re=E.clearcoat>0,te=E.iridescence>0,se=E.sheen>0,Me=E.transmission>0,he=X&&!!E.anisotropyMap,ye=re&&!!E.clearcoatMap,Re=re&&!!E.clearcoatNormalMap,He=re&&!!E.clearcoatRoughnessMap,ee=te&&!!E.iridescenceMap,tt=te&&!!E.iridescenceThicknessMap,Xe=se&&!!E.sheenColorMap,Ie=se&&!!E.sheenRoughnessMap,Ae=!!E.specularMap,fe=!!E.specularColorMap,L=!!E.specularIntensityMap,oe=Me&&!!E.transmissionMap,we=Me&&!!E.thicknessMap,ve=!!E.gradientMap,ne=!!E.alphaMap,U=E.alphaTest>0,ae=!!E.alphaHash,ue=!!E.extensions,Le=!!I.attributes.uv1,be=!!I.attributes.uv2,Ke=!!I.attributes.uv3;let Ze=ir;return E.toneMapped&&(xe===null||xe.isXRRenderTarget===!0)&&(Ze=n.toneMapping),{isWebGL2:u,shaderID:O,shaderType:E.type,shaderName:E.name,vertexShader:$,fragmentShader:J,defines:E.defines,customVertexShaderID:ce,customFragmentShaderID:pe,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:p,batching:Oe,instancing:Fe,instancingColor:Fe&&z.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:xe===null?n.outputColorSpace:xe.isXRRenderTarget===!0?xe.texture.colorSpace:Ii,map:Pe,matcap:$e,envMap:j,envMapMode:j&&Z.mapping,envMapCubeUVHeight:D,aoMap:Ht,lightMap:Ce,bumpMap:De,normalMap:Ee,displacementMap:h&&at,emissiveMap:Be,normalMapObjectSpace:Ee&&E.normalMapType===ux,normalMapTangentSpace:Ee&&E.normalMapType===cx,metalnessMap:R,roughnessMap:A,anisotropy:X,anisotropyMap:he,clearcoat:re,clearcoatMap:ye,clearcoatNormalMap:Re,clearcoatRoughnessMap:He,iridescence:te,iridescenceMap:ee,iridescenceThicknessMap:tt,sheen:se,sheenColorMap:Xe,sheenRoughnessMap:Ie,specularMap:Ae,specularColorMap:fe,specularIntensityMap:L,transmission:Me,transmissionMap:oe,thicknessMap:we,gradientMap:ve,opaque:E.transparent===!1&&E.blending===Os,alphaMap:ne,alphaTest:U,alphaHash:ae,combine:E.combine,mapUv:Pe&&_(E.map.channel),aoMapUv:Ht&&_(E.aoMap.channel),lightMapUv:Ce&&_(E.lightMap.channel),bumpMapUv:De&&_(E.bumpMap.channel),normalMapUv:Ee&&_(E.normalMap.channel),displacementMapUv:at&&_(E.displacementMap.channel),emissiveMapUv:Be&&_(E.emissiveMap.channel),metalnessMapUv:R&&_(E.metalnessMap.channel),roughnessMapUv:A&&_(E.roughnessMap.channel),anisotropyMapUv:he&&_(E.anisotropyMap.channel),clearcoatMapUv:ye&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:Re&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:He&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:tt&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:Xe&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&_(E.sheenRoughnessMap.channel),specularMapUv:Ae&&_(E.specularMap.channel),specularColorMapUv:fe&&_(E.specularColorMap.channel),specularIntensityMapUv:L&&_(E.specularIntensityMap.channel),transmissionMapUv:oe&&_(E.transmissionMap.channel),thicknessMapUv:we&&_(E.thicknessMap.channel),alphaMapUv:ne&&_(E.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(Ee||X),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,vertexUv1s:Le,vertexUv2s:be,vertexUv3s:Ke,pointsUvs:z.isPoints===!0&&!!I.attributes.uv&&(Pe||ne),fog:!!P,useFog:E.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:z.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:W,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&k.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ze,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Pe&&E.map.isVideoTexture===!0&&st.getTransfer(E.map.colorSpace)===ut,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===ui,flipSided:E.side===dn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:ue&&E.extensions.derivatives===!0,extensionFragDepth:ue&&E.extensions.fragDepth===!0,extensionDrawBuffers:ue&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:ue&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ue&&E.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function d(E){const T=[];if(E.shaderID?T.push(E.shaderID):(T.push(E.customVertexShaderID),T.push(E.customFragmentShaderID)),E.defines!==void 0)for(const k in E.defines)T.push(k),T.push(E.defines[k]);return E.isRawShaderMaterial===!1&&(g(T,E),x(T,E),T.push(n.outputColorSpace)),T.push(E.customProgramCacheKey),T.join()}function g(E,T){E.push(T.precision),E.push(T.outputColorSpace),E.push(T.envMapMode),E.push(T.envMapCubeUVHeight),E.push(T.mapUv),E.push(T.alphaMapUv),E.push(T.lightMapUv),E.push(T.aoMapUv),E.push(T.bumpMapUv),E.push(T.normalMapUv),E.push(T.displacementMapUv),E.push(T.emissiveMapUv),E.push(T.metalnessMapUv),E.push(T.roughnessMapUv),E.push(T.anisotropyMapUv),E.push(T.clearcoatMapUv),E.push(T.clearcoatNormalMapUv),E.push(T.clearcoatRoughnessMapUv),E.push(T.iridescenceMapUv),E.push(T.iridescenceThicknessMapUv),E.push(T.sheenColorMapUv),E.push(T.sheenRoughnessMapUv),E.push(T.specularMapUv),E.push(T.specularColorMapUv),E.push(T.specularIntensityMapUv),E.push(T.transmissionMapUv),E.push(T.thicknessMapUv),E.push(T.combine),E.push(T.fogExp2),E.push(T.sizeAttenuation),E.push(T.morphTargetsCount),E.push(T.morphAttributeCount),E.push(T.numDirLights),E.push(T.numPointLights),E.push(T.numSpotLights),E.push(T.numSpotLightMaps),E.push(T.numHemiLights),E.push(T.numRectAreaLights),E.push(T.numDirLightShadows),E.push(T.numPointLightShadows),E.push(T.numSpotLightShadows),E.push(T.numSpotLightShadowsWithMaps),E.push(T.numLightProbes),E.push(T.shadowMapType),E.push(T.toneMapping),E.push(T.numClippingPlanes),E.push(T.numClipIntersection),E.push(T.depthPacking)}function x(E,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),E.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),E.push(a.mask)}function y(E){const T=v[E.type];let k;if(T){const G=ci[T];k=Zx.clone(G.uniforms)}else k=E.uniforms;return k}function C(E,T){let k;for(let G=0,z=c.length;G<z;G++){const P=c[G];if(P.cacheKey===T){k=P,++k.usedTimes;break}}return k===void 0&&(k=new d1(n,T,E,s),c.push(k)),k}function w(E){if(--E.usedTimes===0){const T=c.indexOf(E);c[T]=c[c.length-1],c.pop(),E.destroy()}}function M(E){l.remove(E)}function F(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:y,acquireProgram:C,releaseProgram:w,releaseShaderCache:M,programs:c,dispose:F}}function v1(){let n=new WeakMap;function e(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function t(s){n.delete(s)}function i(s,o,a){n.get(s)[o]=a}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function _1(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function mp(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function gp(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(f,h,p,v,_,m){let d=n[e];return d===void 0?(d={id:f.id,object:f,geometry:h,material:p,groupOrder:v,renderOrder:f.renderOrder,z:_,group:m},n[e]=d):(d.id=f.id,d.object=f,d.geometry=h,d.material=p,d.groupOrder=v,d.renderOrder=f.renderOrder,d.z=_,d.group=m),e++,d}function a(f,h,p,v,_,m){const d=o(f,h,p,v,_,m);p.transmission>0?i.push(d):p.transparent===!0?r.push(d):t.push(d)}function l(f,h,p,v,_,m){const d=o(f,h,p,v,_,m);p.transmission>0?i.unshift(d):p.transparent===!0?r.unshift(d):t.unshift(d)}function c(f,h){t.length>1&&t.sort(f||_1),i.length>1&&i.sort(h||mp),r.length>1&&r.sort(h||mp)}function u(){for(let f=e,h=n.length;f<h;f++){const p=n[f];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function x1(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new gp,n.set(i,[o])):r>=s.length?(o=new gp,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function y1(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new H,color:new ze};break;case"SpotLight":t={position:new H,direction:new H,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new H,halfWidth:new H,halfHeight:new H};break}return n[e.id]=t,t}}}function S1(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let E1=0;function M1(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function w1(n,e){const t=new y1,i=S1(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)r.probe.push(new H);const s=new H,o=new Wt,a=new Wt;function l(u,f){let h=0,p=0,v=0;for(let G=0;G<9;G++)r.probe[G].set(0,0,0);let _=0,m=0,d=0,g=0,x=0,y=0,C=0,w=0,M=0,F=0,E=0;u.sort(M1);const T=f===!0?Math.PI:1;for(let G=0,z=u.length;G<z;G++){const P=u[G],I=P.color,N=P.intensity,Z=P.distance,D=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=I.r*N*T,p+=I.g*N*T,v+=I.b*N*T;else if(P.isLightProbe){for(let O=0;O<9;O++)r.probe[O].addScaledVector(P.sh.coefficients[O],N);E++}else if(P.isDirectionalLight){const O=t.get(P);if(O.color.copy(P.color).multiplyScalar(P.intensity*T),P.castShadow){const V=P.shadow,Q=i.get(P);Q.shadowBias=V.bias,Q.shadowNormalBias=V.normalBias,Q.shadowRadius=V.radius,Q.shadowMapSize=V.mapSize,r.directionalShadow[_]=Q,r.directionalShadowMap[_]=D,r.directionalShadowMatrix[_]=P.shadow.matrix,y++}r.directional[_]=O,_++}else if(P.isSpotLight){const O=t.get(P);O.position.setFromMatrixPosition(P.matrixWorld),O.color.copy(I).multiplyScalar(N*T),O.distance=Z,O.coneCos=Math.cos(P.angle),O.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),O.decay=P.decay,r.spot[d]=O;const V=P.shadow;if(P.map&&(r.spotLightMap[M]=P.map,M++,V.updateMatrices(P),P.castShadow&&F++),r.spotLightMatrix[d]=V.matrix,P.castShadow){const Q=i.get(P);Q.shadowBias=V.bias,Q.shadowNormalBias=V.normalBias,Q.shadowRadius=V.radius,Q.shadowMapSize=V.mapSize,r.spotShadow[d]=Q,r.spotShadowMap[d]=D,w++}d++}else if(P.isRectAreaLight){const O=t.get(P);O.color.copy(I).multiplyScalar(N),O.halfWidth.set(P.width*.5,0,0),O.halfHeight.set(0,P.height*.5,0),r.rectArea[g]=O,g++}else if(P.isPointLight){const O=t.get(P);if(O.color.copy(P.color).multiplyScalar(P.intensity*T),O.distance=P.distance,O.decay=P.decay,P.castShadow){const V=P.shadow,Q=i.get(P);Q.shadowBias=V.bias,Q.shadowNormalBias=V.normalBias,Q.shadowRadius=V.radius,Q.shadowMapSize=V.mapSize,Q.shadowCameraNear=V.camera.near,Q.shadowCameraFar=V.camera.far,r.pointShadow[m]=Q,r.pointShadowMap[m]=D,r.pointShadowMatrix[m]=P.shadow.matrix,C++}r.point[m]=O,m++}else if(P.isHemisphereLight){const O=t.get(P);O.skyColor.copy(P.color).multiplyScalar(N*T),O.groundColor.copy(P.groundColor).multiplyScalar(N*T),r.hemi[x]=O,x++}}g>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=le.LTC_FLOAT_1,r.rectAreaLTC2=le.LTC_FLOAT_2):(r.rectAreaLTC1=le.LTC_HALF_1,r.rectAreaLTC2=le.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=le.LTC_FLOAT_1,r.rectAreaLTC2=le.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=le.LTC_HALF_1,r.rectAreaLTC2=le.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=h,r.ambient[1]=p,r.ambient[2]=v;const k=r.hash;(k.directionalLength!==_||k.pointLength!==m||k.spotLength!==d||k.rectAreaLength!==g||k.hemiLength!==x||k.numDirectionalShadows!==y||k.numPointShadows!==C||k.numSpotShadows!==w||k.numSpotMaps!==M||k.numLightProbes!==E)&&(r.directional.length=_,r.spot.length=d,r.rectArea.length=g,r.point.length=m,r.hemi.length=x,r.directionalShadow.length=y,r.directionalShadowMap.length=y,r.pointShadow.length=C,r.pointShadowMap.length=C,r.spotShadow.length=w,r.spotShadowMap.length=w,r.directionalShadowMatrix.length=y,r.pointShadowMatrix.length=C,r.spotLightMatrix.length=w+M-F,r.spotLightMap.length=M,r.numSpotLightShadowsWithMaps=F,r.numLightProbes=E,k.directionalLength=_,k.pointLength=m,k.spotLength=d,k.rectAreaLength=g,k.hemiLength=x,k.numDirectionalShadows=y,k.numPointShadows=C,k.numSpotShadows=w,k.numSpotMaps=M,k.numLightProbes=E,r.version=E1++)}function c(u,f){let h=0,p=0,v=0,_=0,m=0;const d=f.matrixWorldInverse;for(let g=0,x=u.length;g<x;g++){const y=u[g];if(y.isDirectionalLight){const C=r.directional[h];C.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(d),h++}else if(y.isSpotLight){const C=r.spot[v];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(d),C.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),C.direction.sub(s),C.direction.transformDirection(d),v++}else if(y.isRectAreaLight){const C=r.rectArea[_];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(d),a.identity(),o.copy(y.matrixWorld),o.premultiply(d),a.extractRotation(o),C.halfWidth.set(y.width*.5,0,0),C.halfHeight.set(0,y.height*.5,0),C.halfWidth.applyMatrix4(a),C.halfHeight.applyMatrix4(a),_++}else if(y.isPointLight){const C=r.point[p];C.position.setFromMatrixPosition(y.matrixWorld),C.position.applyMatrix4(d),p++}else if(y.isHemisphereLight){const C=r.hemi[m];C.direction.setFromMatrixPosition(y.matrixWorld),C.direction.transformDirection(d),m++}}}return{setup:l,setupView:c,state:r}}function vp(n,e){const t=new w1(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function o(f){i.push(f)}function a(f){r.push(f)}function l(f){t.setup(i,f)}function c(f){t.setupView(i,f)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function T1(n,e){let t=new WeakMap;function i(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new vp(n,e),t.set(s,[l])):o>=a.length?(l=new vp(n,e),a.push(l)):l=a[o],l}function r(){t=new WeakMap}return{get:i,dispose:r}}class A1 extends rc{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ax,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class C1 extends rc{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const b1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,R1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function P1(n,e,t){let i=new Pg;const r=new Ge,s=new Ge,o=new Gt,a=new A1({depthPacking:lx}),l=new C1,c={},u=t.maxTextureSize,f={[fr]:dn,[dn]:fr,[ui]:ui},h=new mi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ge},radius:{value:4}},vertexShader:b1,fragmentShader:R1}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const v=new Kr;v.setAttribute("position",new di(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Zn(v,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sg;let d=this.type;this.render=function(w,M,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const E=n.getRenderTarget(),T=n.getActiveCubeFace(),k=n.getActiveMipmapLevel(),G=n.state;G.setBlending(nr),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const z=d!==Ci&&this.type===Ci,P=d===Ci&&this.type!==Ci;for(let I=0,N=w.length;I<N;I++){const Z=w[I],D=Z.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);const O=D.getFrameExtents();if(r.multiply(O),s.copy(D.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/O.x),r.x=s.x*O.x,D.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/O.y),r.y=s.y*O.y,D.mapSize.y=s.y)),D.map===null||z===!0||P===!0){const Q=this.type!==Ci?{minFilter:sn,magFilter:sn}:{};D.map!==null&&D.map.dispose(),D.map=new Vr(r.x,r.y,Q),D.map.texture.name=Z.name+".shadowMap",D.camera.updateProjectionMatrix()}n.setRenderTarget(D.map),n.clear();const V=D.getViewportCount();for(let Q=0;Q<V;Q++){const W=D.getViewport(Q);o.set(s.x*W.x,s.y*W.y,s.x*W.z,s.y*W.w),G.viewport(o),D.updateMatrices(Z,Q),i=D.getFrustum(),y(M,F,D.camera,Z,this.type)}D.isPointLightShadow!==!0&&this.type===Ci&&g(D,F),D.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(E,T,k)};function g(w,M){const F=e.update(_);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Vr(r.x,r.y)),h.uniforms.shadow_pass.value=w.map.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(M,null,F,h,_,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(M,null,F,p,_,null)}function x(w,M,F,E){let T=null;const k=F.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(k!==void 0)T=k;else if(T=F.isPointLight===!0?l:a,n.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){const G=T.uuid,z=M.uuid;let P=c[G];P===void 0&&(P={},c[G]=P);let I=P[z];I===void 0&&(I=T.clone(),P[z]=I,M.addEventListener("dispose",C)),T=I}if(T.visible=M.visible,T.wireframe=M.wireframe,E===Ci?T.side=M.shadowSide!==null?M.shadowSide:M.side:T.side=M.shadowSide!==null?M.shadowSide:f[M.side],T.alphaMap=M.alphaMap,T.alphaTest=M.alphaTest,T.map=M.map,T.clipShadows=M.clipShadows,T.clippingPlanes=M.clippingPlanes,T.clipIntersection=M.clipIntersection,T.displacementMap=M.displacementMap,T.displacementScale=M.displacementScale,T.displacementBias=M.displacementBias,T.wireframeLinewidth=M.wireframeLinewidth,T.linewidth=M.linewidth,F.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const G=n.properties.get(T);G.light=F}return T}function y(w,M,F,E,T){if(w.visible===!1)return;if(w.layers.test(M.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&T===Ci)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,w.matrixWorld);const z=e.update(w),P=w.material;if(Array.isArray(P)){const I=z.groups;for(let N=0,Z=I.length;N<Z;N++){const D=I[N],O=P[D.materialIndex];if(O&&O.visible){const V=x(w,O,E,T);w.onBeforeShadow(n,w,M,F,z,V,D),n.renderBufferDirect(F,null,z,V,w,D),w.onAfterShadow(n,w,M,F,z,V,D)}}}else if(P.visible){const I=x(w,P,E,T);w.onBeforeShadow(n,w,M,F,z,I,null),n.renderBufferDirect(F,null,z,I,w,null),w.onAfterShadow(n,w,M,F,z,I,null)}}const G=w.children;for(let z=0,P=G.length;z<P;z++)y(G[z],M,F,E,T)}function C(w){w.target.removeEventListener("dispose",C);for(const F in c){const E=c[F],T=w.target.uuid;T in E&&(E[T].dispose(),delete E[T])}}}function L1(n,e,t){const i=t.isWebGL2;function r(){let U=!1;const ae=new Gt;let ue=null;const Le=new Gt(0,0,0,0);return{setMask:function(be){ue!==be&&!U&&(n.colorMask(be,be,be,be),ue=be)},setLocked:function(be){U=be},setClear:function(be,Ke,Ze,vt,yt){yt===!0&&(be*=vt,Ke*=vt,Ze*=vt),ae.set(be,Ke,Ze,vt),Le.equals(ae)===!1&&(n.clearColor(be,Ke,Ze,vt),Le.copy(ae))},reset:function(){U=!1,ue=null,Le.set(-1,0,0,0)}}}function s(){let U=!1,ae=null,ue=null,Le=null;return{setTest:function(be){be?Oe(n.DEPTH_TEST):Pe(n.DEPTH_TEST)},setMask:function(be){ae!==be&&!U&&(n.depthMask(be),ae=be)},setFunc:function(be){if(ue!==be){switch(be){case O_:n.depthFunc(n.NEVER);break;case z_:n.depthFunc(n.ALWAYS);break;case k_:n.depthFunc(n.LESS);break;case wl:n.depthFunc(n.LEQUAL);break;case B_:n.depthFunc(n.EQUAL);break;case H_:n.depthFunc(n.GEQUAL);break;case V_:n.depthFunc(n.GREATER);break;case G_:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ue=be}},setLocked:function(be){U=be},setClear:function(be){Le!==be&&(n.clearDepth(be),Le=be)},reset:function(){U=!1,ae=null,ue=null,Le=null}}}function o(){let U=!1,ae=null,ue=null,Le=null,be=null,Ke=null,Ze=null,vt=null,yt=null;return{setTest:function(et){U||(et?Oe(n.STENCIL_TEST):Pe(n.STENCIL_TEST))},setMask:function(et){ae!==et&&!U&&(n.stencilMask(et),ae=et)},setFunc:function(et,Mt,ni){(ue!==et||Le!==Mt||be!==ni)&&(n.stencilFunc(et,Mt,ni),ue=et,Le=Mt,be=ni)},setOp:function(et,Mt,ni){(Ke!==et||Ze!==Mt||vt!==ni)&&(n.stencilOp(et,Mt,ni),Ke=et,Ze=Mt,vt=ni)},setLocked:function(et){U=et},setClear:function(et){yt!==et&&(n.clearStencil(et),yt=et)},reset:function(){U=!1,ae=null,ue=null,Le=null,be=null,Ke=null,Ze=null,vt=null,yt=null}}}const a=new r,l=new s,c=new o,u=new WeakMap,f=new WeakMap;let h={},p={},v=new WeakMap,_=[],m=null,d=!1,g=null,x=null,y=null,C=null,w=null,M=null,F=null,E=new ze(0,0,0),T=0,k=!1,G=null,z=null,P=null,I=null,N=null;const Z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,O=0;const V=n.getParameter(n.VERSION);V.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(V)[1]),D=O>=1):V.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),D=O>=2);let Q=null,W={};const $=n.getParameter(n.SCISSOR_BOX),J=n.getParameter(n.VIEWPORT),ce=new Gt().fromArray($),pe=new Gt().fromArray(J);function xe(U,ae,ue,Le){const be=new Uint8Array(4),Ke=n.createTexture();n.bindTexture(U,Ke),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ze=0;Ze<ue;Ze++)i&&(U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY)?n.texImage3D(ae,0,n.RGBA,1,1,Le,0,n.RGBA,n.UNSIGNED_BYTE,be):n.texImage2D(ae+Ze,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,be);return Ke}const Fe={};Fe[n.TEXTURE_2D]=xe(n.TEXTURE_2D,n.TEXTURE_2D,1),Fe[n.TEXTURE_CUBE_MAP]=xe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Fe[n.TEXTURE_2D_ARRAY]=xe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Fe[n.TEXTURE_3D]=xe(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Oe(n.DEPTH_TEST),l.setFunc(wl),Be(!1),R(Zd),Oe(n.CULL_FACE),Ee(nr);function Oe(U){h[U]!==!0&&(n.enable(U),h[U]=!0)}function Pe(U){h[U]!==!1&&(n.disable(U),h[U]=!1)}function $e(U,ae){return p[U]!==ae?(n.bindFramebuffer(U,ae),p[U]=ae,i&&(U===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=ae),U===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=ae)),!0):!1}function j(U,ae){let ue=_,Le=!1;if(U)if(ue=v.get(ae),ue===void 0&&(ue=[],v.set(ae,ue)),U.isWebGLMultipleRenderTargets){const be=U.texture;if(ue.length!==be.length||ue[0]!==n.COLOR_ATTACHMENT0){for(let Ke=0,Ze=be.length;Ke<Ze;Ke++)ue[Ke]=n.COLOR_ATTACHMENT0+Ke;ue.length=be.length,Le=!0}}else ue[0]!==n.COLOR_ATTACHMENT0&&(ue[0]=n.COLOR_ATTACHMENT0,Le=!0);else ue[0]!==n.BACK&&(ue[0]=n.BACK,Le=!0);Le&&(t.isWebGL2?n.drawBuffers(ue):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ue))}function Ht(U){return m!==U?(n.useProgram(U),m=U,!0):!1}const Ce={[Rr]:n.FUNC_ADD,[E_]:n.FUNC_SUBTRACT,[M_]:n.FUNC_REVERSE_SUBTRACT};if(i)Ce[tf]=n.MIN,Ce[nf]=n.MAX;else{const U=e.get("EXT_blend_minmax");U!==null&&(Ce[tf]=U.MIN_EXT,Ce[nf]=U.MAX_EXT)}const De={[w_]:n.ZERO,[T_]:n.ONE,[A_]:n.SRC_COLOR,[zu]:n.SRC_ALPHA,[N_]:n.SRC_ALPHA_SATURATE,[P_]:n.DST_COLOR,[b_]:n.DST_ALPHA,[C_]:n.ONE_MINUS_SRC_COLOR,[ku]:n.ONE_MINUS_SRC_ALPHA,[L_]:n.ONE_MINUS_DST_COLOR,[R_]:n.ONE_MINUS_DST_ALPHA,[D_]:n.CONSTANT_COLOR,[I_]:n.ONE_MINUS_CONSTANT_COLOR,[U_]:n.CONSTANT_ALPHA,[F_]:n.ONE_MINUS_CONSTANT_ALPHA};function Ee(U,ae,ue,Le,be,Ke,Ze,vt,yt,et){if(U===nr){d===!0&&(Pe(n.BLEND),d=!1);return}if(d===!1&&(Oe(n.BLEND),d=!0),U!==S_){if(U!==g||et!==k){if((x!==Rr||w!==Rr)&&(n.blendEquation(n.FUNC_ADD),x=Rr,w=Rr),et)switch(U){case Os:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Qd:n.blendFunc(n.ONE,n.ONE);break;case Jd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ef:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Os:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Qd:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Jd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ef:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}y=null,C=null,M=null,F=null,E.set(0,0,0),T=0,g=U,k=et}return}be=be||ae,Ke=Ke||ue,Ze=Ze||Le,(ae!==x||be!==w)&&(n.blendEquationSeparate(Ce[ae],Ce[be]),x=ae,w=be),(ue!==y||Le!==C||Ke!==M||Ze!==F)&&(n.blendFuncSeparate(De[ue],De[Le],De[Ke],De[Ze]),y=ue,C=Le,M=Ke,F=Ze),(vt.equals(E)===!1||yt!==T)&&(n.blendColor(vt.r,vt.g,vt.b,yt),E.copy(vt),T=yt),g=U,k=!1}function at(U,ae){U.side===ui?Pe(n.CULL_FACE):Oe(n.CULL_FACE);let ue=U.side===dn;ae&&(ue=!ue),Be(ue),U.blending===Os&&U.transparent===!1?Ee(nr):Ee(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),l.setFunc(U.depthFunc),l.setTest(U.depthTest),l.setMask(U.depthWrite),a.setMask(U.colorWrite);const Le=U.stencilWrite;c.setTest(Le),Le&&(c.setMask(U.stencilWriteMask),c.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),c.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),X(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?Oe(n.SAMPLE_ALPHA_TO_COVERAGE):Pe(n.SAMPLE_ALPHA_TO_COVERAGE)}function Be(U){G!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),G=U)}function R(U){U!==__?(Oe(n.CULL_FACE),U!==z&&(U===Zd?n.cullFace(n.BACK):U===x_?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Pe(n.CULL_FACE),z=U}function A(U){U!==P&&(D&&n.lineWidth(U),P=U)}function X(U,ae,ue){U?(Oe(n.POLYGON_OFFSET_FILL),(I!==ae||N!==ue)&&(n.polygonOffset(ae,ue),I=ae,N=ue)):Pe(n.POLYGON_OFFSET_FILL)}function re(U){U?Oe(n.SCISSOR_TEST):Pe(n.SCISSOR_TEST)}function te(U){U===void 0&&(U=n.TEXTURE0+Z-1),Q!==U&&(n.activeTexture(U),Q=U)}function se(U,ae,ue){ue===void 0&&(Q===null?ue=n.TEXTURE0+Z-1:ue=Q);let Le=W[ue];Le===void 0&&(Le={type:void 0,texture:void 0},W[ue]=Le),(Le.type!==U||Le.texture!==ae)&&(Q!==ue&&(n.activeTexture(ue),Q=ue),n.bindTexture(U,ae||Fe[U]),Le.type=U,Le.texture=ae)}function Me(){const U=W[Q];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function he(){try{n.compressedTexImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ye(){try{n.compressedTexImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Re(){try{n.texSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function He(){try{n.texSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function tt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Xe(){try{n.texStorage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ie(){try{n.texStorage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ae(){try{n.texImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function fe(){try{n.texImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function L(U){ce.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),ce.copy(U))}function oe(U){pe.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),pe.copy(U))}function we(U,ae){let ue=f.get(ae);ue===void 0&&(ue=new WeakMap,f.set(ae,ue));let Le=ue.get(U);Le===void 0&&(Le=n.getUniformBlockIndex(ae,U.name),ue.set(U,Le))}function ve(U,ae){const Le=f.get(ae).get(U);u.get(ae)!==Le&&(n.uniformBlockBinding(ae,Le,U.__bindingPointIndex),u.set(ae,Le))}function ne(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},Q=null,W={},p={},v=new WeakMap,_=[],m=null,d=!1,g=null,x=null,y=null,C=null,w=null,M=null,F=null,E=new ze(0,0,0),T=0,k=!1,G=null,z=null,P=null,I=null,N=null,ce.set(0,0,n.canvas.width,n.canvas.height),pe.set(0,0,n.canvas.width,n.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Oe,disable:Pe,bindFramebuffer:$e,drawBuffers:j,useProgram:Ht,setBlending:Ee,setMaterial:at,setFlipSided:Be,setCullFace:R,setLineWidth:A,setPolygonOffset:X,setScissorTest:re,activeTexture:te,bindTexture:se,unbindTexture:Me,compressedTexImage2D:he,compressedTexImage3D:ye,texImage2D:Ae,texImage3D:fe,updateUBOMapping:we,uniformBlockBinding:ve,texStorage2D:Xe,texStorage3D:Ie,texSubImage2D:Re,texSubImage3D:He,compressedTexSubImage2D:ee,compressedTexSubImage3D:tt,scissor:L,viewport:oe,reset:ne}}function N1(n,e,t,i,r,s,o){const a=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap;let f;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(R,A){return p?new OffscreenCanvas(R,A):Xo("canvas")}function _(R,A,X,re){let te=1;if((R.width>re||R.height>re)&&(te=re/Math.max(R.width,R.height)),te<1||A===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const se=A?Rl:Math.floor,Me=se(te*R.width),he=se(te*R.height);f===void 0&&(f=v(Me,he));const ye=X?v(Me,he):f;return ye.width=Me,ye.height=he,ye.getContext("2d").drawImage(R,0,0,Me,he),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+Me+"x"+he+")."),ye}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function m(R){return Xu(R.width)&&Xu(R.height)}function d(R){return a?!1:R.wrapS!==$n||R.wrapT!==$n||R.minFilter!==sn&&R.minFilter!==Pn}function g(R,A){return R.generateMipmaps&&A&&R.minFilter!==sn&&R.minFilter!==Pn}function x(R){n.generateMipmap(R)}function y(R,A,X,re,te=!1){if(a===!1)return A;if(R!==null){if(n[R]!==void 0)return n[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let se=A;if(A===n.RED&&(X===n.FLOAT&&(se=n.R32F),X===n.HALF_FLOAT&&(se=n.R16F),X===n.UNSIGNED_BYTE&&(se=n.R8)),A===n.RED_INTEGER&&(X===n.UNSIGNED_BYTE&&(se=n.R8UI),X===n.UNSIGNED_SHORT&&(se=n.R16UI),X===n.UNSIGNED_INT&&(se=n.R32UI),X===n.BYTE&&(se=n.R8I),X===n.SHORT&&(se=n.R16I),X===n.INT&&(se=n.R32I)),A===n.RG&&(X===n.FLOAT&&(se=n.RG32F),X===n.HALF_FLOAT&&(se=n.RG16F),X===n.UNSIGNED_BYTE&&(se=n.RG8)),A===n.RGBA){const Me=te?Tl:st.getTransfer(re);X===n.FLOAT&&(se=n.RGBA32F),X===n.HALF_FLOAT&&(se=n.RGBA16F),X===n.UNSIGNED_BYTE&&(se=Me===ut?n.SRGB8_ALPHA8:n.RGBA8),X===n.UNSIGNED_SHORT_4_4_4_4&&(se=n.RGBA4),X===n.UNSIGNED_SHORT_5_5_5_1&&(se=n.RGB5_A1)}return(se===n.R16F||se===n.R32F||se===n.RG16F||se===n.RG32F||se===n.RGBA16F||se===n.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function C(R,A,X){return g(R,X)===!0||R.isFramebufferTexture&&R.minFilter!==sn&&R.minFilter!==Pn?Math.log2(Math.max(A.width,A.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?A.mipmaps.length:1}function w(R){return R===sn||R===rf||R===Rc?n.NEAREST:n.LINEAR}function M(R){const A=R.target;A.removeEventListener("dispose",M),E(A),A.isVideoTexture&&u.delete(A)}function F(R){const A=R.target;A.removeEventListener("dispose",F),k(A)}function E(R){const A=i.get(R);if(A.__webglInit===void 0)return;const X=R.source,re=h.get(X);if(re){const te=re[A.__cacheKey];te.usedTimes--,te.usedTimes===0&&T(R),Object.keys(re).length===0&&h.delete(X)}i.remove(R)}function T(R){const A=i.get(R);n.deleteTexture(A.__webglTexture);const X=R.source,re=h.get(X);delete re[A.__cacheKey],o.memory.textures--}function k(R){const A=R.texture,X=i.get(R),re=i.get(A);if(re.__webglTexture!==void 0&&(n.deleteTexture(re.__webglTexture),o.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(X.__webglFramebuffer[te]))for(let se=0;se<X.__webglFramebuffer[te].length;se++)n.deleteFramebuffer(X.__webglFramebuffer[te][se]);else n.deleteFramebuffer(X.__webglFramebuffer[te]);X.__webglDepthbuffer&&n.deleteRenderbuffer(X.__webglDepthbuffer[te])}else{if(Array.isArray(X.__webglFramebuffer))for(let te=0;te<X.__webglFramebuffer.length;te++)n.deleteFramebuffer(X.__webglFramebuffer[te]);else n.deleteFramebuffer(X.__webglFramebuffer);if(X.__webglDepthbuffer&&n.deleteRenderbuffer(X.__webglDepthbuffer),X.__webglMultisampledFramebuffer&&n.deleteFramebuffer(X.__webglMultisampledFramebuffer),X.__webglColorRenderbuffer)for(let te=0;te<X.__webglColorRenderbuffer.length;te++)X.__webglColorRenderbuffer[te]&&n.deleteRenderbuffer(X.__webglColorRenderbuffer[te]);X.__webglDepthRenderbuffer&&n.deleteRenderbuffer(X.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let te=0,se=A.length;te<se;te++){const Me=i.get(A[te]);Me.__webglTexture&&(n.deleteTexture(Me.__webglTexture),o.memory.textures--),i.remove(A[te])}i.remove(A),i.remove(R)}let G=0;function z(){G=0}function P(){const R=G;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),G+=1,R}function I(R){const A=[];return A.push(R.wrapS),A.push(R.wrapT),A.push(R.wrapR||0),A.push(R.magFilter),A.push(R.minFilter),A.push(R.anisotropy),A.push(R.internalFormat),A.push(R.format),A.push(R.type),A.push(R.generateMipmaps),A.push(R.premultiplyAlpha),A.push(R.flipY),A.push(R.unpackAlignment),A.push(R.colorSpace),A.join()}function N(R,A){const X=i.get(R);if(R.isVideoTexture&&at(R),R.isRenderTargetTexture===!1&&R.version>0&&X.__version!==R.version){const re=R.image;if(re===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(re.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(X,R,A);return}}t.bindTexture(n.TEXTURE_2D,X.__webglTexture,n.TEXTURE0+A)}function Z(R,A){const X=i.get(R);if(R.version>0&&X.__version!==R.version){ce(X,R,A);return}t.bindTexture(n.TEXTURE_2D_ARRAY,X.__webglTexture,n.TEXTURE0+A)}function D(R,A){const X=i.get(R);if(R.version>0&&X.__version!==R.version){ce(X,R,A);return}t.bindTexture(n.TEXTURE_3D,X.__webglTexture,n.TEXTURE0+A)}function O(R,A){const X=i.get(R);if(R.version>0&&X.__version!==R.version){pe(X,R,A);return}t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture,n.TEXTURE0+A)}const V={[Vu]:n.REPEAT,[$n]:n.CLAMP_TO_EDGE,[Gu]:n.MIRRORED_REPEAT},Q={[sn]:n.NEAREST,[rf]:n.NEAREST_MIPMAP_NEAREST,[Rc]:n.NEAREST_MIPMAP_LINEAR,[Pn]:n.LINEAR,[Q_]:n.LINEAR_MIPMAP_NEAREST,[Vo]:n.LINEAR_MIPMAP_LINEAR},W={[hx]:n.NEVER,[vx]:n.ALWAYS,[dx]:n.LESS,[gg]:n.LEQUAL,[fx]:n.EQUAL,[gx]:n.GEQUAL,[px]:n.GREATER,[mx]:n.NOTEQUAL};function $(R,A,X){if(X?(n.texParameteri(R,n.TEXTURE_WRAP_S,V[A.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,V[A.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,V[A.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,Q[A.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,Q[A.minFilter])):(n.texParameteri(R,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(R,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(A.wrapS!==$n||A.wrapT!==$n)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(R,n.TEXTURE_MAG_FILTER,w(A.magFilter)),n.texParameteri(R,n.TEXTURE_MIN_FILTER,w(A.minFilter)),A.minFilter!==sn&&A.minFilter!==Pn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,W[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const re=e.get("EXT_texture_filter_anisotropic");if(A.magFilter===sn||A.minFilter!==Rc&&A.minFilter!==Vo||A.type===Ji&&e.has("OES_texture_float_linear")===!1||a===!1&&A.type===Go&&e.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||i.get(A).__currentAnisotropy)&&(n.texParameterf(R,re.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,r.getMaxAnisotropy())),i.get(A).__currentAnisotropy=A.anisotropy)}}function J(R,A){let X=!1;R.__webglInit===void 0&&(R.__webglInit=!0,A.addEventListener("dispose",M));const re=A.source;let te=h.get(re);te===void 0&&(te={},h.set(re,te));const se=I(A);if(se!==R.__cacheKey){te[se]===void 0&&(te[se]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,X=!0),te[se].usedTimes++;const Me=te[R.__cacheKey];Me!==void 0&&(te[R.__cacheKey].usedTimes--,Me.usedTimes===0&&T(A)),R.__cacheKey=se,R.__webglTexture=te[se].texture}return X}function ce(R,A,X){let re=n.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(re=n.TEXTURE_2D_ARRAY),A.isData3DTexture&&(re=n.TEXTURE_3D);const te=J(R,A),se=A.source;t.bindTexture(re,R.__webglTexture,n.TEXTURE0+X);const Me=i.get(se);if(se.version!==Me.__version||te===!0){t.activeTexture(n.TEXTURE0+X);const he=st.getPrimaries(st.workingColorSpace),ye=A.colorSpace===Un?null:st.getPrimaries(A.colorSpace),Re=A.colorSpace===Un||he===ye?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const He=d(A)&&m(A.image)===!1;let ee=_(A.image,He,!1,r.maxTextureSize);ee=Be(A,ee);const tt=m(ee)||a,Xe=s.convert(A.format,A.colorSpace);let Ie=s.convert(A.type),Ae=y(A.internalFormat,Xe,Ie,A.colorSpace,A.isVideoTexture);$(re,A,tt);let fe;const L=A.mipmaps,oe=a&&A.isVideoTexture!==!0&&Ae!==pg,we=Me.__version===void 0||te===!0,ve=C(A,ee,tt);if(A.isDepthTexture)Ae=n.DEPTH_COMPONENT,a?A.type===Ji?Ae=n.DEPTH_COMPONENT32F:A.type===Qi?Ae=n.DEPTH_COMPONENT24:A.type===Fr?Ae=n.DEPTH24_STENCIL8:Ae=n.DEPTH_COMPONENT16:A.type===Ji&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===Or&&Ae===n.DEPTH_COMPONENT&&A.type!==Hh&&A.type!==Qi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=Qi,Ie=s.convert(A.type)),A.format===qs&&Ae===n.DEPTH_COMPONENT&&(Ae=n.DEPTH_STENCIL,A.type!==Fr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=Fr,Ie=s.convert(A.type))),we&&(oe?t.texStorage2D(n.TEXTURE_2D,1,Ae,ee.width,ee.height):t.texImage2D(n.TEXTURE_2D,0,Ae,ee.width,ee.height,0,Xe,Ie,null));else if(A.isDataTexture)if(L.length>0&&tt){oe&&we&&t.texStorage2D(n.TEXTURE_2D,ve,Ae,L[0].width,L[0].height);for(let ne=0,U=L.length;ne<U;ne++)fe=L[ne],oe?t.texSubImage2D(n.TEXTURE_2D,ne,0,0,fe.width,fe.height,Xe,Ie,fe.data):t.texImage2D(n.TEXTURE_2D,ne,Ae,fe.width,fe.height,0,Xe,Ie,fe.data);A.generateMipmaps=!1}else oe?(we&&t.texStorage2D(n.TEXTURE_2D,ve,Ae,ee.width,ee.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,ee.width,ee.height,Xe,Ie,ee.data)):t.texImage2D(n.TEXTURE_2D,0,Ae,ee.width,ee.height,0,Xe,Ie,ee.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){oe&&we&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ve,Ae,L[0].width,L[0].height,ee.depth);for(let ne=0,U=L.length;ne<U;ne++)fe=L[ne],A.format!==Kn?Xe!==null?oe?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,fe.width,fe.height,ee.depth,Xe,fe.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ne,Ae,fe.width,fe.height,ee.depth,0,fe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):oe?t.texSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,fe.width,fe.height,ee.depth,Xe,Ie,fe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ne,Ae,fe.width,fe.height,ee.depth,0,Xe,Ie,fe.data)}else{oe&&we&&t.texStorage2D(n.TEXTURE_2D,ve,Ae,L[0].width,L[0].height);for(let ne=0,U=L.length;ne<U;ne++)fe=L[ne],A.format!==Kn?Xe!==null?oe?t.compressedTexSubImage2D(n.TEXTURE_2D,ne,0,0,fe.width,fe.height,Xe,fe.data):t.compressedTexImage2D(n.TEXTURE_2D,ne,Ae,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):oe?t.texSubImage2D(n.TEXTURE_2D,ne,0,0,fe.width,fe.height,Xe,Ie,fe.data):t.texImage2D(n.TEXTURE_2D,ne,Ae,fe.width,fe.height,0,Xe,Ie,fe.data)}else if(A.isDataArrayTexture)oe?(we&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ve,Ae,ee.width,ee.height,ee.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,Xe,Ie,ee.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ae,ee.width,ee.height,ee.depth,0,Xe,Ie,ee.data);else if(A.isData3DTexture)oe?(we&&t.texStorage3D(n.TEXTURE_3D,ve,Ae,ee.width,ee.height,ee.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,Xe,Ie,ee.data)):t.texImage3D(n.TEXTURE_3D,0,Ae,ee.width,ee.height,ee.depth,0,Xe,Ie,ee.data);else if(A.isFramebufferTexture){if(we)if(oe)t.texStorage2D(n.TEXTURE_2D,ve,Ae,ee.width,ee.height);else{let ne=ee.width,U=ee.height;for(let ae=0;ae<ve;ae++)t.texImage2D(n.TEXTURE_2D,ae,Ae,ne,U,0,Xe,Ie,null),ne>>=1,U>>=1}}else if(L.length>0&&tt){oe&&we&&t.texStorage2D(n.TEXTURE_2D,ve,Ae,L[0].width,L[0].height);for(let ne=0,U=L.length;ne<U;ne++)fe=L[ne],oe?t.texSubImage2D(n.TEXTURE_2D,ne,0,0,Xe,Ie,fe):t.texImage2D(n.TEXTURE_2D,ne,Ae,Xe,Ie,fe);A.generateMipmaps=!1}else oe?(we&&t.texStorage2D(n.TEXTURE_2D,ve,Ae,ee.width,ee.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,Xe,Ie,ee)):t.texImage2D(n.TEXTURE_2D,0,Ae,Xe,Ie,ee);g(A,tt)&&x(re),Me.__version=se.version,A.onUpdate&&A.onUpdate(A)}R.__version=A.version}function pe(R,A,X){if(A.image.length!==6)return;const re=J(R,A),te=A.source;t.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+X);const se=i.get(te);if(te.version!==se.__version||re===!0){t.activeTexture(n.TEXTURE0+X);const Me=st.getPrimaries(st.workingColorSpace),he=A.colorSpace===Un?null:st.getPrimaries(A.colorSpace),ye=A.colorSpace===Un||Me===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const Re=A.isCompressedTexture||A.image[0].isCompressedTexture,He=A.image[0]&&A.image[0].isDataTexture,ee=[];for(let ne=0;ne<6;ne++)!Re&&!He?ee[ne]=_(A.image[ne],!1,!0,r.maxCubemapSize):ee[ne]=He?A.image[ne].image:A.image[ne],ee[ne]=Be(A,ee[ne]);const tt=ee[0],Xe=m(tt)||a,Ie=s.convert(A.format,A.colorSpace),Ae=s.convert(A.type),fe=y(A.internalFormat,Ie,Ae,A.colorSpace),L=a&&A.isVideoTexture!==!0,oe=se.__version===void 0||re===!0;let we=C(A,tt,Xe);$(n.TEXTURE_CUBE_MAP,A,Xe);let ve;if(Re){L&&oe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,we,fe,tt.width,tt.height);for(let ne=0;ne<6;ne++){ve=ee[ne].mipmaps;for(let U=0;U<ve.length;U++){const ae=ve[U];A.format!==Kn?Ie!==null?L?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,U,0,0,ae.width,ae.height,Ie,ae.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,U,fe,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,U,0,0,ae.width,ae.height,Ie,Ae,ae.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,U,fe,ae.width,ae.height,0,Ie,Ae,ae.data)}}}else{ve=A.mipmaps,L&&oe&&(ve.length>0&&we++,t.texStorage2D(n.TEXTURE_CUBE_MAP,we,fe,ee[0].width,ee[0].height));for(let ne=0;ne<6;ne++)if(He){L?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,ee[ne].width,ee[ne].height,Ie,Ae,ee[ne].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,fe,ee[ne].width,ee[ne].height,0,Ie,Ae,ee[ne].data);for(let U=0;U<ve.length;U++){const ue=ve[U].image[ne].image;L?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,U+1,0,0,ue.width,ue.height,Ie,Ae,ue.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,U+1,fe,ue.width,ue.height,0,Ie,Ae,ue.data)}}else{L?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Ie,Ae,ee[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,fe,Ie,Ae,ee[ne]);for(let U=0;U<ve.length;U++){const ae=ve[U];L?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,U+1,0,0,Ie,Ae,ae.image[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,U+1,fe,Ie,Ae,ae.image[ne])}}}g(A,Xe)&&x(n.TEXTURE_CUBE_MAP),se.__version=te.version,A.onUpdate&&A.onUpdate(A)}R.__version=A.version}function xe(R,A,X,re,te,se){const Me=s.convert(X.format,X.colorSpace),he=s.convert(X.type),ye=y(X.internalFormat,Me,he,X.colorSpace);if(!i.get(A).__hasExternalTextures){const He=Math.max(1,A.width>>se),ee=Math.max(1,A.height>>se);te===n.TEXTURE_3D||te===n.TEXTURE_2D_ARRAY?t.texImage3D(te,se,ye,He,ee,A.depth,0,Me,he,null):t.texImage2D(te,se,ye,He,ee,0,Me,he,null)}t.bindFramebuffer(n.FRAMEBUFFER,R),Ee(A)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,re,te,i.get(X).__webglTexture,0,De(A)):(te===n.TEXTURE_2D||te>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,re,te,i.get(X).__webglTexture,se),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Fe(R,A,X){if(n.bindRenderbuffer(n.RENDERBUFFER,R),A.depthBuffer&&!A.stencilBuffer){let re=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(X||Ee(A)){const te=A.depthTexture;te&&te.isDepthTexture&&(te.type===Ji?re=n.DEPTH_COMPONENT32F:te.type===Qi&&(re=n.DEPTH_COMPONENT24));const se=De(A);Ee(A)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,se,re,A.width,A.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,se,re,A.width,A.height)}else n.renderbufferStorage(n.RENDERBUFFER,re,A.width,A.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,R)}else if(A.depthBuffer&&A.stencilBuffer){const re=De(A);X&&Ee(A)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,re,n.DEPTH24_STENCIL8,A.width,A.height):Ee(A)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,re,n.DEPTH24_STENCIL8,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,R)}else{const re=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let te=0;te<re.length;te++){const se=re[te],Me=s.convert(se.format,se.colorSpace),he=s.convert(se.type),ye=y(se.internalFormat,Me,he,se.colorSpace),Re=De(A);X&&Ee(A)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Re,ye,A.width,A.height):Ee(A)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Re,ye,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,ye,A.width,A.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Oe(R,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,R),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),N(A.depthTexture,0);const re=i.get(A.depthTexture).__webglTexture,te=De(A);if(A.depthTexture.format===Or)Ee(A)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,re,0,te):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,re,0);else if(A.depthTexture.format===qs)Ee(A)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,re,0,te):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function Pe(R){const A=i.get(R),X=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!A.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");Oe(A.__webglFramebuffer,R)}else if(X){A.__webglDepthbuffer=[];for(let re=0;re<6;re++)t.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer[re]),A.__webglDepthbuffer[re]=n.createRenderbuffer(),Fe(A.__webglDepthbuffer[re],R,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=n.createRenderbuffer(),Fe(A.__webglDepthbuffer,R,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function $e(R,A,X){const re=i.get(R);A!==void 0&&xe(re.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),X!==void 0&&Pe(R)}function j(R){const A=R.texture,X=i.get(R),re=i.get(A);R.addEventListener("dispose",F),R.isWebGLMultipleRenderTargets!==!0&&(re.__webglTexture===void 0&&(re.__webglTexture=n.createTexture()),re.__version=A.version,o.memory.textures++);const te=R.isWebGLCubeRenderTarget===!0,se=R.isWebGLMultipleRenderTargets===!0,Me=m(R)||a;if(te){X.__webglFramebuffer=[];for(let he=0;he<6;he++)if(a&&A.mipmaps&&A.mipmaps.length>0){X.__webglFramebuffer[he]=[];for(let ye=0;ye<A.mipmaps.length;ye++)X.__webglFramebuffer[he][ye]=n.createFramebuffer()}else X.__webglFramebuffer[he]=n.createFramebuffer()}else{if(a&&A.mipmaps&&A.mipmaps.length>0){X.__webglFramebuffer=[];for(let he=0;he<A.mipmaps.length;he++)X.__webglFramebuffer[he]=n.createFramebuffer()}else X.__webglFramebuffer=n.createFramebuffer();if(se)if(r.drawBuffers){const he=R.texture;for(let ye=0,Re=he.length;ye<Re;ye++){const He=i.get(he[ye]);He.__webglTexture===void 0&&(He.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&R.samples>0&&Ee(R)===!1){const he=se?A:[A];X.__webglMultisampledFramebuffer=n.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let ye=0;ye<he.length;ye++){const Re=he[ye];X.__webglColorRenderbuffer[ye]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,X.__webglColorRenderbuffer[ye]);const He=s.convert(Re.format,Re.colorSpace),ee=s.convert(Re.type),tt=y(Re.internalFormat,He,ee,Re.colorSpace,R.isXRRenderTarget===!0),Xe=De(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,Xe,tt,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ye,n.RENDERBUFFER,X.__webglColorRenderbuffer[ye])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(X.__webglDepthRenderbuffer=n.createRenderbuffer(),Fe(X.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(te){t.bindTexture(n.TEXTURE_CUBE_MAP,re.__webglTexture),$(n.TEXTURE_CUBE_MAP,A,Me);for(let he=0;he<6;he++)if(a&&A.mipmaps&&A.mipmaps.length>0)for(let ye=0;ye<A.mipmaps.length;ye++)xe(X.__webglFramebuffer[he][ye],R,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+he,ye);else xe(X.__webglFramebuffer[he],R,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);g(A,Me)&&x(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(se){const he=R.texture;for(let ye=0,Re=he.length;ye<Re;ye++){const He=he[ye],ee=i.get(He);t.bindTexture(n.TEXTURE_2D,ee.__webglTexture),$(n.TEXTURE_2D,He,Me),xe(X.__webglFramebuffer,R,He,n.COLOR_ATTACHMENT0+ye,n.TEXTURE_2D,0),g(He,Me)&&x(n.TEXTURE_2D)}t.unbindTexture()}else{let he=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(a?he=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(he,re.__webglTexture),$(he,A,Me),a&&A.mipmaps&&A.mipmaps.length>0)for(let ye=0;ye<A.mipmaps.length;ye++)xe(X.__webglFramebuffer[ye],R,A,n.COLOR_ATTACHMENT0,he,ye);else xe(X.__webglFramebuffer,R,A,n.COLOR_ATTACHMENT0,he,0);g(A,Me)&&x(he),t.unbindTexture()}R.depthBuffer&&Pe(R)}function Ht(R){const A=m(R)||a,X=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let re=0,te=X.length;re<te;re++){const se=X[re];if(g(se,A)){const Me=R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,he=i.get(se).__webglTexture;t.bindTexture(Me,he),x(Me),t.unbindTexture()}}}function Ce(R){if(a&&R.samples>0&&Ee(R)===!1){const A=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],X=R.width,re=R.height;let te=n.COLOR_BUFFER_BIT;const se=[],Me=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,he=i.get(R),ye=R.isWebGLMultipleRenderTargets===!0;if(ye)for(let Re=0;Re<A.length;Re++)t.bindFramebuffer(n.FRAMEBUFFER,he.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,he.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let Re=0;Re<A.length;Re++){se.push(n.COLOR_ATTACHMENT0+Re),R.depthBuffer&&se.push(Me);const He=he.__ignoreDepthValues!==void 0?he.__ignoreDepthValues:!1;if(He===!1&&(R.depthBuffer&&(te|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&(te|=n.STENCIL_BUFFER_BIT)),ye&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,he.__webglColorRenderbuffer[Re]),He===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Me]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Me])),ye){const ee=i.get(A[Re]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ee,0)}n.blitFramebuffer(0,0,X,re,0,0,X,re,te,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,se)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ye)for(let Re=0;Re<A.length;Re++){t.bindFramebuffer(n.FRAMEBUFFER,he.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.RENDERBUFFER,he.__webglColorRenderbuffer[Re]);const He=i.get(A[Re]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,he.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Re,n.TEXTURE_2D,He,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}}function De(R){return Math.min(r.maxSamples,R.samples)}function Ee(R){const A=i.get(R);return a&&R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function at(R){const A=o.render.frame;u.get(R)!==A&&(u.set(R,A),R.update())}function Be(R,A){const X=R.colorSpace,re=R.format,te=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===Wu||X!==Ii&&X!==Un&&(st.getTransfer(X)===ut?a===!1?e.has("EXT_sRGB")===!0&&re===Kn?(R.format=Wu,R.minFilter=Pn,R.generateMipmaps=!1):A=_g.sRGBToLinear(A):(re!==Kn||te!==rr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),A}this.allocateTextureUnit=P,this.resetTextureUnits=z,this.setTexture2D=N,this.setTexture2DArray=Z,this.setTexture3D=D,this.setTextureCube=O,this.rebindTextures=$e,this.setupRenderTarget=j,this.updateRenderTargetMipmap=Ht,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=xe,this.useMultisampledRTT=Ee}function D1(n,e,t){const i=t.isWebGL2;function r(s,o=Un){let a;const l=st.getTransfer(o);if(s===rr)return n.UNSIGNED_BYTE;if(s===cg)return n.UNSIGNED_SHORT_4_4_4_4;if(s===ug)return n.UNSIGNED_SHORT_5_5_5_1;if(s===J_)return n.BYTE;if(s===ex)return n.SHORT;if(s===Hh)return n.UNSIGNED_SHORT;if(s===lg)return n.INT;if(s===Qi)return n.UNSIGNED_INT;if(s===Ji)return n.FLOAT;if(s===Go)return i?n.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===tx)return n.ALPHA;if(s===Kn)return n.RGBA;if(s===nx)return n.LUMINANCE;if(s===ix)return n.LUMINANCE_ALPHA;if(s===Or)return n.DEPTH_COMPONENT;if(s===qs)return n.DEPTH_STENCIL;if(s===Wu)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===rx)return n.RED;if(s===hg)return n.RED_INTEGER;if(s===sx)return n.RG;if(s===dg)return n.RG_INTEGER;if(s===fg)return n.RGBA_INTEGER;if(s===Pc||s===Lc||s===Nc||s===Dc)if(l===ut)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Pc)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Lc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Nc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Dc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Pc)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Lc)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Nc)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Dc)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===sf||s===of||s===af||s===lf)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===sf)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===of)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===af)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===lf)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===pg)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===cf||s===uf)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===cf)return l===ut?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===uf)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===hf||s===df||s===ff||s===pf||s===mf||s===gf||s===vf||s===_f||s===xf||s===yf||s===Sf||s===Ef||s===Mf||s===wf)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===hf)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===df)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===ff)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===pf)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===mf)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===gf)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===vf)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===_f)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===xf)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===yf)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Sf)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Ef)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Mf)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===wf)return l===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Ic||s===Tf||s===Af)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Ic)return l===ut?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Tf)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Af)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===ox||s===Cf||s===bf||s===Rf)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Ic)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Cf)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===bf)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Rf)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Fr?i?n.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class I1 extends Ln{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Nr extends En{constructor(){super(),this.isGroup=!0,this.type="Group"}}const U1={type:"move"};class iu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Nr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Nr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Nr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),p=.02,v=.005;c.inputState.pinching&&h>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(U1)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Nr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class F1 extends $r{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,p=null,v=null;const _=t.getContextAttributes();let m=null,d=null;const g=[],x=[],y=new Ge;let C=null;const w=new Ln;w.layers.enable(1),w.viewport=new Gt;const M=new Ln;M.layers.enable(2),M.viewport=new Gt;const F=[w,M],E=new I1;E.layers.enable(1),E.layers.enable(2);let T=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let J=g[$];return J===void 0&&(J=new iu,g[$]=J),J.getTargetRaySpace()},this.getControllerGrip=function($){let J=g[$];return J===void 0&&(J=new iu,g[$]=J),J.getGripSpace()},this.getHand=function($){let J=g[$];return J===void 0&&(J=new iu,g[$]=J),J.getHandSpace()};function G($){const J=x.indexOf($.inputSource);if(J===-1)return;const ce=g[J];ce!==void 0&&(ce.update($.inputSource,$.frame,c||o),ce.dispatchEvent({type:$.type,data:$.inputSource}))}function z(){r.removeEventListener("select",G),r.removeEventListener("selectstart",G),r.removeEventListener("selectend",G),r.removeEventListener("squeeze",G),r.removeEventListener("squeezestart",G),r.removeEventListener("squeezeend",G),r.removeEventListener("end",z),r.removeEventListener("inputsourceschange",P);for(let $=0;$<g.length;$++){const J=x[$];J!==null&&(x[$]=null,g[$].disconnect(J))}T=null,k=null,e.setRenderTarget(m),p=null,h=null,f=null,r=null,d=null,W.stop(),i.isPresenting=!1,e.setPixelRatio(C),e.setSize(y.width,y.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return f},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",G),r.addEventListener("selectstart",G),r.addEventListener("selectend",G),r.addEventListener("squeeze",G),r.addEventListener("squeezestart",G),r.addEventListener("squeezeend",G),r.addEventListener("end",z),r.addEventListener("inputsourceschange",P),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(y),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const J={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,J),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),d=new Vr(p.framebufferWidth,p.framebufferHeight,{format:Kn,type:rr,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let J=null,ce=null,pe=null;_.depth&&(pe=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,J=_.stencil?qs:Or,ce=_.stencil?Fr:Qi);const xe={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:s};f=new XRWebGLBinding(r,t),h=f.createProjectionLayer(xe),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),d=new Vr(h.textureWidth,h.textureHeight,{format:Kn,type:rr,depthTexture:new Ng(h.textureWidth,h.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Fe=e.properties.get(d);Fe.__ignoreDepthValues=h.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),W.setContext(r),W.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function P($){for(let J=0;J<$.removed.length;J++){const ce=$.removed[J],pe=x.indexOf(ce);pe>=0&&(x[pe]=null,g[pe].disconnect(ce))}for(let J=0;J<$.added.length;J++){const ce=$.added[J];let pe=x.indexOf(ce);if(pe===-1){for(let Fe=0;Fe<g.length;Fe++)if(Fe>=x.length){x.push(ce),pe=Fe;break}else if(x[Fe]===null){x[Fe]=ce,pe=Fe;break}if(pe===-1)break}const xe=g[pe];xe&&xe.connect(ce)}}const I=new H,N=new H;function Z($,J,ce){I.setFromMatrixPosition(J.matrixWorld),N.setFromMatrixPosition(ce.matrixWorld);const pe=I.distanceTo(N),xe=J.projectionMatrix.elements,Fe=ce.projectionMatrix.elements,Oe=xe[14]/(xe[10]-1),Pe=xe[14]/(xe[10]+1),$e=(xe[9]+1)/xe[5],j=(xe[9]-1)/xe[5],Ht=(xe[8]-1)/xe[0],Ce=(Fe[8]+1)/Fe[0],De=Oe*Ht,Ee=Oe*Ce,at=pe/(-Ht+Ce),Be=at*-Ht;J.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Be),$.translateZ(at),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert();const R=Oe+at,A=Pe+at,X=De-Be,re=Ee+(pe-Be),te=$e*Pe/A*R,se=j*Pe/A*R;$.projectionMatrix.makePerspective(X,re,te,se,R,A),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}function D($,J){J===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(J.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;E.near=M.near=w.near=$.near,E.far=M.far=w.far=$.far,(T!==E.near||k!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),T=E.near,k=E.far);const J=$.parent,ce=E.cameras;D(E,J);for(let pe=0;pe<ce.length;pe++)D(ce[pe],J);ce.length===2?Z(E,w,M):E.projectionMatrix.copy(w.projectionMatrix),O($,E,J)};function O($,J,ce){ce===null?$.matrix.copy(J.matrixWorld):($.matrix.copy(ce.matrixWorld),$.matrix.invert(),$.matrix.multiply(J.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(J.projectionMatrix),$.projectionMatrixInverse.copy(J.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Wo*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function($){l=$,h!==null&&(h.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)};let V=null;function Q($,J){if(u=J.getViewerPose(c||o),v=J,u!==null){const ce=u.views;p!==null&&(e.setRenderTargetFramebuffer(d,p.framebuffer),e.setRenderTarget(d));let pe=!1;ce.length!==E.cameras.length&&(E.cameras.length=0,pe=!0);for(let xe=0;xe<ce.length;xe++){const Fe=ce[xe];let Oe=null;if(p!==null)Oe=p.getViewport(Fe);else{const $e=f.getViewSubImage(h,Fe);Oe=$e.viewport,xe===0&&(e.setRenderTargetTextures(d,$e.colorTexture,h.ignoreDepthValues?void 0:$e.depthStencilTexture),e.setRenderTarget(d))}let Pe=F[xe];Pe===void 0&&(Pe=new Ln,Pe.layers.enable(xe),Pe.viewport=new Gt,F[xe]=Pe),Pe.matrix.fromArray(Fe.transform.matrix),Pe.matrix.decompose(Pe.position,Pe.quaternion,Pe.scale),Pe.projectionMatrix.fromArray(Fe.projectionMatrix),Pe.projectionMatrixInverse.copy(Pe.projectionMatrix).invert(),Pe.viewport.set(Oe.x,Oe.y,Oe.width,Oe.height),xe===0&&(E.matrix.copy(Pe.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),pe===!0&&E.cameras.push(Pe)}}for(let ce=0;ce<g.length;ce++){const pe=x[ce],xe=g[ce];pe!==null&&xe!==void 0&&xe.update(pe,J,c||o)}V&&V($,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),v=null}const W=new Lg;W.setAnimationLoop(Q),this.setAnimationLoop=function($){V=$},this.dispose=function(){}}}function O1(n,e){function t(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Cg(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function r(m,d,g,x,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(m,d):d.isMeshToonMaterial?(s(m,d),f(m,d)):d.isMeshPhongMaterial?(s(m,d),u(m,d)):d.isMeshStandardMaterial?(s(m,d),h(m,d),d.isMeshPhysicalMaterial&&p(m,d,y)):d.isMeshMatcapMaterial?(s(m,d),v(m,d)):d.isMeshDepthMaterial?s(m,d):d.isMeshDistanceMaterial?(s(m,d),_(m,d)):d.isMeshNormalMaterial?s(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,g,x):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,t(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===dn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,t(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===dn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,t(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,t(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const g=e.get(d).envMap;if(g&&(m.envMap.value=g,m.flipEnvMap.value=g.isCubeTexture&&g.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;const x=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*x,t(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,g,x){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*g,m.scale.value=x*.5,d.map&&(m.map.value=d.map,t(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,t(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,t(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,m.roughnessMapTransform)),e.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,g){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===dn&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=g.texture,m.transmissionSamplerSize.value.set(g.width,g.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const g=e.get(d).light;m.referencePosition.value.setFromMatrixPosition(g.matrixWorld),m.nearDistance.value=g.shadow.camera.near,m.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function z1(n,e,t,i){let r={},s={},o=[];const a=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(g,x){const y=x.program;i.uniformBlockBinding(g,y)}function c(g,x){let y=r[g.id];y===void 0&&(v(g),y=u(g),r[g.id]=y,g.addEventListener("dispose",m));const C=x.program;i.updateUBOMapping(g,C);const w=e.render.frame;s[g.id]!==w&&(h(g),s[g.id]=w)}function u(g){const x=f();g.__bindingPointIndex=x;const y=n.createBuffer(),C=g.__size,w=g.usage;return n.bindBuffer(n.UNIFORM_BUFFER,y),n.bufferData(n.UNIFORM_BUFFER,C,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,y),y}function f(){for(let g=0;g<a;g++)if(o.indexOf(g)===-1)return o.push(g),g;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(g){const x=r[g.id],y=g.uniforms,C=g.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let w=0,M=y.length;w<M;w++){const F=Array.isArray(y[w])?y[w]:[y[w]];for(let E=0,T=F.length;E<T;E++){const k=F[E];if(p(k,w,E,C)===!0){const G=k.__offset,z=Array.isArray(k.value)?k.value:[k.value];let P=0;for(let I=0;I<z.length;I++){const N=z[I],Z=_(N);typeof N=="number"||typeof N=="boolean"?(k.__data[0]=N,n.bufferSubData(n.UNIFORM_BUFFER,G+P,k.__data)):N.isMatrix3?(k.__data[0]=N.elements[0],k.__data[1]=N.elements[1],k.__data[2]=N.elements[2],k.__data[3]=0,k.__data[4]=N.elements[3],k.__data[5]=N.elements[4],k.__data[6]=N.elements[5],k.__data[7]=0,k.__data[8]=N.elements[6],k.__data[9]=N.elements[7],k.__data[10]=N.elements[8],k.__data[11]=0):(N.toArray(k.__data,P),P+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,G,k.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(g,x,y,C){const w=g.value,M=x+"_"+y;if(C[M]===void 0)return typeof w=="number"||typeof w=="boolean"?C[M]=w:C[M]=w.clone(),!0;{const F=C[M];if(typeof w=="number"||typeof w=="boolean"){if(F!==w)return C[M]=w,!0}else if(F.equals(w)===!1)return F.copy(w),!0}return!1}function v(g){const x=g.uniforms;let y=0;const C=16;for(let M=0,F=x.length;M<F;M++){const E=Array.isArray(x[M])?x[M]:[x[M]];for(let T=0,k=E.length;T<k;T++){const G=E[T],z=Array.isArray(G.value)?G.value:[G.value];for(let P=0,I=z.length;P<I;P++){const N=z[P],Z=_(N),D=y%C;D!==0&&C-D<Z.boundary&&(y+=C-D),G.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=y,y+=Z.storage}}}const w=y%C;return w>0&&(y+=C-w),g.__size=y,g.__cache={},this}function _(g){const x={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(x.boundary=4,x.storage=4):g.isVector2?(x.boundary=8,x.storage=8):g.isVector3||g.isColor?(x.boundary=16,x.storage=12):g.isVector4?(x.boundary=16,x.storage=16):g.isMatrix3?(x.boundary=48,x.storage=48):g.isMatrix4?(x.boundary=64,x.storage=64):g.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",g),x}function m(g){const x=g.target;x.removeEventListener("dispose",m);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),n.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function d(){for(const g in r)n.deleteBuffer(r[g]);o=[],r={},s={}}return{bind:l,update:c,dispose:d}}class zg{constructor(e={}){const{canvas:t=Dx(),context:i=null,depth:r=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=o;const p=new Uint32Array(4),v=new Int32Array(4);let _=null,m=null;const d=[],g=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=zt,this._useLegacyLights=!1,this.toneMapping=ir,this.toneMappingExposure=1;const x=this;let y=!1,C=0,w=0,M=null,F=-1,E=null;const T=new Gt,k=new Gt;let G=null;const z=new ze(0);let P=0,I=t.width,N=t.height,Z=1,D=null,O=null;const V=new Gt(0,0,I,N),Q=new Gt(0,0,I,N);let W=!1;const $=new Pg;let J=!1,ce=!1,pe=null;const xe=new Wt,Fe=new Ge,Oe=new H,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function $e(){return M===null?Z:1}let j=i;function Ht(b,B){for(let Y=0;Y<b.length;Y++){const K=b[Y],q=t.getContext(K,B);if(q!==null)return q}return null}try{const b={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Bh}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",U,!1),t.addEventListener("webglcontextcreationerror",ae,!1),j===null){const B=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&B.shift(),j=Ht(B,b),j===null)throw Ht(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&j instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),j.getShaderPrecisionFormat===void 0&&(j.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Ce,De,Ee,at,Be,R,A,X,re,te,se,Me,he,ye,Re,He,ee,tt,Xe,Ie,Ae,fe,L,oe;function we(){Ce=new YE(j),De=new HE(j,Ce,e),Ce.init(De),fe=new D1(j,Ce,De),Ee=new L1(j,Ce,De),at=new ZE(j),Be=new v1,R=new N1(j,Ce,Ee,Be,De,fe,at),A=new GE(x),X=new qE(x),re=new ry(j,De),L=new kE(j,Ce,re,De),te=new $E(j,re,at,L),se=new tM(j,te,re,at),Xe=new eM(j,De,R),He=new VE(Be),Me=new g1(x,A,X,Ce,De,L,He),he=new O1(x,Be),ye=new x1,Re=new T1(Ce,De),tt=new zE(x,A,X,Ee,se,h,l),ee=new P1(x,se,De),oe=new z1(j,at,De,Ee),Ie=new BE(j,Ce,at,De),Ae=new KE(j,Ce,at,De),at.programs=Me.programs,x.capabilities=De,x.extensions=Ce,x.properties=Be,x.renderLists=ye,x.shadowMap=ee,x.state=Ee,x.info=at}we();const ve=new F1(x,j);this.xr=ve,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){const b=Ce.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Ce.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(b){b!==void 0&&(Z=b,this.setSize(I,N,!1))},this.getSize=function(b){return b.set(I,N)},this.setSize=function(b,B,Y=!0){if(ve.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=b,N=B,t.width=Math.floor(b*Z),t.height=Math.floor(B*Z),Y===!0&&(t.style.width=b+"px",t.style.height=B+"px"),this.setViewport(0,0,b,B)},this.getDrawingBufferSize=function(b){return b.set(I*Z,N*Z).floor()},this.setDrawingBufferSize=function(b,B,Y){I=b,N=B,Z=Y,t.width=Math.floor(b*Y),t.height=Math.floor(B*Y),this.setViewport(0,0,b,B)},this.getCurrentViewport=function(b){return b.copy(T)},this.getViewport=function(b){return b.copy(V)},this.setViewport=function(b,B,Y,K){b.isVector4?V.set(b.x,b.y,b.z,b.w):V.set(b,B,Y,K),Ee.viewport(T.copy(V).multiplyScalar(Z).floor())},this.getScissor=function(b){return b.copy(Q)},this.setScissor=function(b,B,Y,K){b.isVector4?Q.set(b.x,b.y,b.z,b.w):Q.set(b,B,Y,K),Ee.scissor(k.copy(Q).multiplyScalar(Z).floor())},this.getScissorTest=function(){return W},this.setScissorTest=function(b){Ee.setScissorTest(W=b)},this.setOpaqueSort=function(b){D=b},this.setTransparentSort=function(b){O=b},this.getClearColor=function(b){return b.copy(tt.getClearColor())},this.setClearColor=function(){tt.setClearColor.apply(tt,arguments)},this.getClearAlpha=function(){return tt.getClearAlpha()},this.setClearAlpha=function(){tt.setClearAlpha.apply(tt,arguments)},this.clear=function(b=!0,B=!0,Y=!0){let K=0;if(b){let q=!1;if(M!==null){const me=M.texture.format;q=me===fg||me===dg||me===hg}if(q){const me=M.texture.type,Te=me===rr||me===Qi||me===Hh||me===Fr||me===cg||me===ug,Ne=tt.getClearColor(),Ue=tt.getClearAlpha(),je=Ne.r,ke=Ne.g,Ve=Ne.b;Te?(p[0]=je,p[1]=ke,p[2]=Ve,p[3]=Ue,j.clearBufferuiv(j.COLOR,0,p)):(v[0]=je,v[1]=ke,v[2]=Ve,v[3]=Ue,j.clearBufferiv(j.COLOR,0,v))}else K|=j.COLOR_BUFFER_BIT}B&&(K|=j.DEPTH_BUFFER_BIT),Y&&(K|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),j.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",U,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),ye.dispose(),Re.dispose(),Be.dispose(),A.dispose(),X.dispose(),se.dispose(),L.dispose(),oe.dispose(),Me.dispose(),ve.dispose(),ve.removeEventListener("sessionstart",yt),ve.removeEventListener("sessionend",et),pe&&(pe.dispose(),pe=null),Mt.stop()};function ne(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function U(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const b=at.autoReset,B=ee.enabled,Y=ee.autoUpdate,K=ee.needsUpdate,q=ee.type;we(),at.autoReset=b,ee.enabled=B,ee.autoUpdate=Y,ee.needsUpdate=K,ee.type=q}function ae(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ue(b){const B=b.target;B.removeEventListener("dispose",ue),Le(B)}function Le(b){be(b),Be.remove(b)}function be(b){const B=Be.get(b).programs;B!==void 0&&(B.forEach(function(Y){Me.releaseProgram(Y)}),b.isShaderMaterial&&Me.releaseShaderCache(b))}this.renderBufferDirect=function(b,B,Y,K,q,me){B===null&&(B=Pe);const Te=q.isMesh&&q.matrixWorld.determinant()<0,Ne=l_(b,B,Y,K,q);Ee.setMaterial(K,Te);let Ue=Y.index,je=1;if(K.wireframe===!0){if(Ue=te.getWireframeAttribute(Y),Ue===void 0)return;je=2}const ke=Y.drawRange,Ve=Y.attributes.position;let St=ke.start*je,vn=(ke.start+ke.count)*je;me!==null&&(St=Math.max(St,me.start*je),vn=Math.min(vn,(me.start+me.count)*je)),Ue!==null?(St=Math.max(St,0),vn=Math.min(vn,Ue.count)):Ve!=null&&(St=Math.max(St,0),vn=Math.min(vn,Ve.count));const Ut=vn-St;if(Ut<0||Ut===1/0)return;L.setup(q,K,Ne,Y,Ue);let gi,ft=Ie;if(Ue!==null&&(gi=re.get(Ue),ft=Ae,ft.setIndex(gi)),q.isMesh)K.wireframe===!0?(Ee.setLineWidth(K.wireframeLinewidth*$e()),ft.setMode(j.LINES)):ft.setMode(j.TRIANGLES);else if(q.isLine){let qe=K.linewidth;qe===void 0&&(qe=1),Ee.setLineWidth(qe*$e()),q.isLineSegments?ft.setMode(j.LINES):q.isLineLoop?ft.setMode(j.LINE_LOOP):ft.setMode(j.LINE_STRIP)}else q.isPoints?ft.setMode(j.POINTS):q.isSprite&&ft.setMode(j.TRIANGLES);if(q.isBatchedMesh)ft.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else if(q.isInstancedMesh)ft.renderInstances(St,Ut,q.count);else if(Y.isInstancedBufferGeometry){const qe=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Tc=Math.min(Y.instanceCount,qe);ft.renderInstances(St,Ut,Tc)}else ft.render(St,Ut)};function Ke(b,B,Y){b.transparent===!0&&b.side===ui&&b.forceSinglePass===!1?(b.side=dn,b.needsUpdate=!0,_a(b,B,Y),b.side=fr,b.needsUpdate=!0,_a(b,B,Y),b.side=ui):_a(b,B,Y)}this.compile=function(b,B,Y=null){Y===null&&(Y=b),m=Re.get(Y),m.init(),g.push(m),Y.traverseVisible(function(q){q.isLight&&q.layers.test(B.layers)&&(m.pushLight(q),q.castShadow&&m.pushShadow(q))}),b!==Y&&b.traverseVisible(function(q){q.isLight&&q.layers.test(B.layers)&&(m.pushLight(q),q.castShadow&&m.pushShadow(q))}),m.setupLights(x._useLegacyLights);const K=new Set;return b.traverse(function(q){const me=q.material;if(me)if(Array.isArray(me))for(let Te=0;Te<me.length;Te++){const Ne=me[Te];Ke(Ne,Y,q),K.add(Ne)}else Ke(me,Y,q),K.add(me)}),g.pop(),m=null,K},this.compileAsync=function(b,B,Y=null){const K=this.compile(b,B,Y);return new Promise(q=>{function me(){if(K.forEach(function(Te){Be.get(Te).currentProgram.isReady()&&K.delete(Te)}),K.size===0){q(b);return}setTimeout(me,10)}Ce.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let Ze=null;function vt(b){Ze&&Ze(b)}function yt(){Mt.stop()}function et(){Mt.start()}const Mt=new Lg;Mt.setAnimationLoop(vt),typeof self<"u"&&Mt.setContext(self),this.setAnimationLoop=function(b){Ze=b,ve.setAnimationLoop(b),b===null?Mt.stop():Mt.start()},ve.addEventListener("sessionstart",yt),ve.addEventListener("sessionend",et),this.render=function(b,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),ve.enabled===!0&&ve.isPresenting===!0&&(ve.cameraAutoUpdate===!0&&ve.updateCamera(B),B=ve.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,B,M),m=Re.get(b,g.length),m.init(),g.push(m),xe.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),$.setFromProjectionMatrix(xe),ce=this.localClippingEnabled,J=He.init(this.clippingPlanes,ce),_=ye.get(b,d.length),_.init(),d.push(_),ni(b,B,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(D,O),this.info.render.frame++,J===!0&&He.beginShadows();const Y=m.state.shadowsArray;if(ee.render(Y,b,B),J===!0&&He.endShadows(),this.info.autoReset===!0&&this.info.reset(),tt.render(_,b),m.setupLights(x._useLegacyLights),B.isArrayCamera){const K=B.cameras;for(let q=0,me=K.length;q<me;q++){const Te=K[q];Wd(_,b,Te,Te.viewport)}}else Wd(_,b,B);M!==null&&(R.updateMultisampleRenderTarget(M),R.updateRenderTargetMipmap(M)),b.isScene===!0&&b.onAfterRender(x,b,B),L.resetDefaultState(),F=-1,E=null,g.pop(),g.length>0?m=g[g.length-1]:m=null,d.pop(),d.length>0?_=d[d.length-1]:_=null};function ni(b,B,Y,K){if(b.visible===!1)return;if(b.layers.test(B.layers)){if(b.isGroup)Y=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(B);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||$.intersectsSprite(b)){K&&Oe.setFromMatrixPosition(b.matrixWorld).applyMatrix4(xe);const Te=se.update(b),Ne=b.material;Ne.visible&&_.push(b,Te,Ne,Y,Oe.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||$.intersectsObject(b))){const Te=se.update(b),Ne=b.material;if(K&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Oe.copy(b.boundingSphere.center)):(Te.boundingSphere===null&&Te.computeBoundingSphere(),Oe.copy(Te.boundingSphere.center)),Oe.applyMatrix4(b.matrixWorld).applyMatrix4(xe)),Array.isArray(Ne)){const Ue=Te.groups;for(let je=0,ke=Ue.length;je<ke;je++){const Ve=Ue[je],St=Ne[Ve.materialIndex];St&&St.visible&&_.push(b,Te,St,Y,Oe.z,Ve)}}else Ne.visible&&_.push(b,Te,Ne,Y,Oe.z,null)}}const me=b.children;for(let Te=0,Ne=me.length;Te<Ne;Te++)ni(me[Te],B,Y,K)}function Wd(b,B,Y,K){const q=b.opaque,me=b.transmissive,Te=b.transparent;m.setupLightsView(Y),J===!0&&He.setGlobalState(x.clippingPlanes,Y),me.length>0&&a_(q,me,B,Y),K&&Ee.viewport(T.copy(K)),q.length>0&&va(q,B,Y),me.length>0&&va(me,B,Y),Te.length>0&&va(Te,B,Y),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function a_(b,B,Y,K){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;const me=De.isWebGL2;pe===null&&(pe=new Vr(1,1,{generateMipmaps:!0,type:Ce.has("EXT_color_buffer_half_float")?Go:rr,minFilter:Vo,samples:me?4:0})),x.getDrawingBufferSize(Fe),me?pe.setSize(Fe.x,Fe.y):pe.setSize(Rl(Fe.x),Rl(Fe.y));const Te=x.getRenderTarget();x.setRenderTarget(pe),x.getClearColor(z),P=x.getClearAlpha(),P<1&&x.setClearColor(16777215,.5),x.clear();const Ne=x.toneMapping;x.toneMapping=ir,va(b,Y,K),R.updateMultisampleRenderTarget(pe),R.updateRenderTargetMipmap(pe);let Ue=!1;for(let je=0,ke=B.length;je<ke;je++){const Ve=B[je],St=Ve.object,vn=Ve.geometry,Ut=Ve.material,gi=Ve.group;if(Ut.side===ui&&St.layers.test(K.layers)){const ft=Ut.side;Ut.side=dn,Ut.needsUpdate=!0,Xd(St,Y,K,vn,Ut,gi),Ut.side=ft,Ut.needsUpdate=!0,Ue=!0}}Ue===!0&&(R.updateMultisampleRenderTarget(pe),R.updateRenderTargetMipmap(pe)),x.setRenderTarget(Te),x.setClearColor(z,P),x.toneMapping=Ne}function va(b,B,Y){const K=B.isScene===!0?B.overrideMaterial:null;for(let q=0,me=b.length;q<me;q++){const Te=b[q],Ne=Te.object,Ue=Te.geometry,je=K===null?Te.material:K,ke=Te.group;Ne.layers.test(Y.layers)&&Xd(Ne,B,Y,Ue,je,ke)}}function Xd(b,B,Y,K,q,me){b.onBeforeRender(x,B,Y,K,q,me),b.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),q.onBeforeRender(x,B,Y,K,b,me),q.transparent===!0&&q.side===ui&&q.forceSinglePass===!1?(q.side=dn,q.needsUpdate=!0,x.renderBufferDirect(Y,B,K,q,b,me),q.side=fr,q.needsUpdate=!0,x.renderBufferDirect(Y,B,K,q,b,me),q.side=ui):x.renderBufferDirect(Y,B,K,q,b,me),b.onAfterRender(x,B,Y,K,q,me)}function _a(b,B,Y){B.isScene!==!0&&(B=Pe);const K=Be.get(b),q=m.state.lights,me=m.state.shadowsArray,Te=q.state.version,Ne=Me.getParameters(b,q.state,me,B,Y),Ue=Me.getProgramCacheKey(Ne);let je=K.programs;K.environment=b.isMeshStandardMaterial?B.environment:null,K.fog=B.fog,K.envMap=(b.isMeshStandardMaterial?X:A).get(b.envMap||K.environment),je===void 0&&(b.addEventListener("dispose",ue),je=new Map,K.programs=je);let ke=je.get(Ue);if(ke!==void 0){if(K.currentProgram===ke&&K.lightsStateVersion===Te)return qd(b,Ne),ke}else Ne.uniforms=Me.getUniforms(b),b.onBuild(Y,Ne,x),b.onBeforeCompile(Ne,x),ke=Me.acquireProgram(Ne,Ue),je.set(Ue,ke),K.uniforms=Ne.uniforms;const Ve=K.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ve.clippingPlanes=He.uniform),qd(b,Ne),K.needsLights=u_(b),K.lightsStateVersion=Te,K.needsLights&&(Ve.ambientLightColor.value=q.state.ambient,Ve.lightProbe.value=q.state.probe,Ve.directionalLights.value=q.state.directional,Ve.directionalLightShadows.value=q.state.directionalShadow,Ve.spotLights.value=q.state.spot,Ve.spotLightShadows.value=q.state.spotShadow,Ve.rectAreaLights.value=q.state.rectArea,Ve.ltc_1.value=q.state.rectAreaLTC1,Ve.ltc_2.value=q.state.rectAreaLTC2,Ve.pointLights.value=q.state.point,Ve.pointLightShadows.value=q.state.pointShadow,Ve.hemisphereLights.value=q.state.hemi,Ve.directionalShadowMap.value=q.state.directionalShadowMap,Ve.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Ve.spotShadowMap.value=q.state.spotShadowMap,Ve.spotLightMatrix.value=q.state.spotLightMatrix,Ve.spotLightMap.value=q.state.spotLightMap,Ve.pointShadowMap.value=q.state.pointShadowMap,Ve.pointShadowMatrix.value=q.state.pointShadowMatrix),K.currentProgram=ke,K.uniformsList=null,ke}function jd(b){if(b.uniformsList===null){const B=b.currentProgram.getUniforms();b.uniformsList=hl.seqWithValue(B.seq,b.uniforms)}return b.uniformsList}function qd(b,B){const Y=Be.get(b);Y.outputColorSpace=B.outputColorSpace,Y.batching=B.batching,Y.instancing=B.instancing,Y.instancingColor=B.instancingColor,Y.skinning=B.skinning,Y.morphTargets=B.morphTargets,Y.morphNormals=B.morphNormals,Y.morphColors=B.morphColors,Y.morphTargetsCount=B.morphTargetsCount,Y.numClippingPlanes=B.numClippingPlanes,Y.numIntersection=B.numClipIntersection,Y.vertexAlphas=B.vertexAlphas,Y.vertexTangents=B.vertexTangents,Y.toneMapping=B.toneMapping}function l_(b,B,Y,K,q){B.isScene!==!0&&(B=Pe),R.resetTextureUnits();const me=B.fog,Te=K.isMeshStandardMaterial?B.environment:null,Ne=M===null?x.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Ii,Ue=(K.isMeshStandardMaterial?X:A).get(K.envMap||Te),je=K.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,ke=!!Y.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Ve=!!Y.morphAttributes.position,St=!!Y.morphAttributes.normal,vn=!!Y.morphAttributes.color;let Ut=ir;K.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(Ut=x.toneMapping);const gi=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ft=gi!==void 0?gi.length:0,qe=Be.get(K),Tc=m.state.lights;if(J===!0&&(ce===!0||b!==E)){const bn=b===E&&K.id===F;He.setState(K,b,bn)}let _t=!1;K.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==Tc.state.version||qe.outputColorSpace!==Ne||q.isBatchedMesh&&qe.batching===!1||!q.isBatchedMesh&&qe.batching===!0||q.isInstancedMesh&&qe.instancing===!1||!q.isInstancedMesh&&qe.instancing===!0||q.isSkinnedMesh&&qe.skinning===!1||!q.isSkinnedMesh&&qe.skinning===!0||q.isInstancedMesh&&qe.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&qe.instancingColor===!1&&q.instanceColor!==null||qe.envMap!==Ue||K.fog===!0&&qe.fog!==me||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==He.numPlanes||qe.numIntersection!==He.numIntersection)||qe.vertexAlphas!==je||qe.vertexTangents!==ke||qe.morphTargets!==Ve||qe.morphNormals!==St||qe.morphColors!==vn||qe.toneMapping!==Ut||De.isWebGL2===!0&&qe.morphTargetsCount!==ft)&&(_t=!0):(_t=!0,qe.__version=K.version);let xr=qe.currentProgram;_t===!0&&(xr=_a(K,B,q));let Yd=!1,ao=!1,Ac=!1;const qt=xr.getUniforms(),yr=qe.uniforms;if(Ee.useProgram(xr.program)&&(Yd=!0,ao=!0,Ac=!0),K.id!==F&&(F=K.id,ao=!0),Yd||E!==b){qt.setValue(j,"projectionMatrix",b.projectionMatrix),qt.setValue(j,"viewMatrix",b.matrixWorldInverse);const bn=qt.map.cameraPosition;bn!==void 0&&bn.setValue(j,Oe.setFromMatrixPosition(b.matrixWorld)),De.logarithmicDepthBuffer&&qt.setValue(j,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&qt.setValue(j,"isOrthographic",b.isOrthographicCamera===!0),E!==b&&(E=b,ao=!0,Ac=!0)}if(q.isSkinnedMesh){qt.setOptional(j,q,"bindMatrix"),qt.setOptional(j,q,"bindMatrixInverse");const bn=q.skeleton;bn&&(De.floatVertexTextures?(bn.boneTexture===null&&bn.computeBoneTexture(),qt.setValue(j,"boneTexture",bn.boneTexture,R)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}q.isBatchedMesh&&(qt.setOptional(j,q,"batchingTexture"),qt.setValue(j,"batchingTexture",q._matricesTexture,R));const Cc=Y.morphAttributes;if((Cc.position!==void 0||Cc.normal!==void 0||Cc.color!==void 0&&De.isWebGL2===!0)&&Xe.update(q,Y,xr),(ao||qe.receiveShadow!==q.receiveShadow)&&(qe.receiveShadow=q.receiveShadow,qt.setValue(j,"receiveShadow",q.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(yr.envMap.value=Ue,yr.flipEnvMap.value=Ue.isCubeTexture&&Ue.isRenderTargetTexture===!1?-1:1),ao&&(qt.setValue(j,"toneMappingExposure",x.toneMappingExposure),qe.needsLights&&c_(yr,Ac),me&&K.fog===!0&&he.refreshFogUniforms(yr,me),he.refreshMaterialUniforms(yr,K,Z,N,pe),hl.upload(j,jd(qe),yr,R)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(hl.upload(j,jd(qe),yr,R),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&qt.setValue(j,"center",q.center),qt.setValue(j,"modelViewMatrix",q.modelViewMatrix),qt.setValue(j,"normalMatrix",q.normalMatrix),qt.setValue(j,"modelMatrix",q.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const bn=K.uniformsGroups;for(let bc=0,h_=bn.length;bc<h_;bc++)if(De.isWebGL2){const $d=bn[bc];oe.update($d,xr),oe.bind($d,xr)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return xr}function c_(b,B){b.ambientLightColor.needsUpdate=B,b.lightProbe.needsUpdate=B,b.directionalLights.needsUpdate=B,b.directionalLightShadows.needsUpdate=B,b.pointLights.needsUpdate=B,b.pointLightShadows.needsUpdate=B,b.spotLights.needsUpdate=B,b.spotLightShadows.needsUpdate=B,b.rectAreaLights.needsUpdate=B,b.hemisphereLights.needsUpdate=B}function u_(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(b,B,Y){Be.get(b.texture).__webglTexture=B,Be.get(b.depthTexture).__webglTexture=Y;const K=Be.get(b);K.__hasExternalTextures=!0,K.__hasExternalTextures&&(K.__autoAllocateDepthBuffer=Y===void 0,K.__autoAllocateDepthBuffer||Ce.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,B){const Y=Be.get(b);Y.__webglFramebuffer=B,Y.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(b,B=0,Y=0){M=b,C=B,w=Y;let K=!0,q=null,me=!1,Te=!1;if(b){const Ue=Be.get(b);Ue.__useDefaultFramebuffer!==void 0?(Ee.bindFramebuffer(j.FRAMEBUFFER,null),K=!1):Ue.__webglFramebuffer===void 0?R.setupRenderTarget(b):Ue.__hasExternalTextures&&R.rebindTextures(b,Be.get(b.texture).__webglTexture,Be.get(b.depthTexture).__webglTexture);const je=b.texture;(je.isData3DTexture||je.isDataArrayTexture||je.isCompressedArrayTexture)&&(Te=!0);const ke=Be.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(ke[B])?q=ke[B][Y]:q=ke[B],me=!0):De.isWebGL2&&b.samples>0&&R.useMultisampledRTT(b)===!1?q=Be.get(b).__webglMultisampledFramebuffer:Array.isArray(ke)?q=ke[Y]:q=ke,T.copy(b.viewport),k.copy(b.scissor),G=b.scissorTest}else T.copy(V).multiplyScalar(Z).floor(),k.copy(Q).multiplyScalar(Z).floor(),G=W;if(Ee.bindFramebuffer(j.FRAMEBUFFER,q)&&De.drawBuffers&&K&&Ee.drawBuffers(b,q),Ee.viewport(T),Ee.scissor(k),Ee.setScissorTest(G),me){const Ue=Be.get(b.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ue.__webglTexture,Y)}else if(Te){const Ue=Be.get(b.texture),je=B||0;j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,Ue.__webglTexture,Y||0,je)}F=-1},this.readRenderTargetPixels=function(b,B,Y,K,q,me,Te){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ne=Be.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Te!==void 0&&(Ne=Ne[Te]),Ne){Ee.bindFramebuffer(j.FRAMEBUFFER,Ne);try{const Ue=b.texture,je=Ue.format,ke=Ue.type;if(je!==Kn&&fe.convert(je)!==j.getParameter(j.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ve=ke===Go&&(Ce.has("EXT_color_buffer_half_float")||De.isWebGL2&&Ce.has("EXT_color_buffer_float"));if(ke!==rr&&fe.convert(ke)!==j.getParameter(j.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ke===Ji&&(De.isWebGL2||Ce.has("OES_texture_float")||Ce.has("WEBGL_color_buffer_float")))&&!Ve){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=b.width-K&&Y>=0&&Y<=b.height-q&&j.readPixels(B,Y,K,q,fe.convert(je),fe.convert(ke),me)}finally{const Ue=M!==null?Be.get(M).__webglFramebuffer:null;Ee.bindFramebuffer(j.FRAMEBUFFER,Ue)}}},this.copyFramebufferToTexture=function(b,B,Y=0){const K=Math.pow(2,-Y),q=Math.floor(B.image.width*K),me=Math.floor(B.image.height*K);R.setTexture2D(B,0),j.copyTexSubImage2D(j.TEXTURE_2D,Y,0,0,b.x,b.y,q,me),Ee.unbindTexture()},this.copyTextureToTexture=function(b,B,Y,K=0){const q=B.image.width,me=B.image.height,Te=fe.convert(Y.format),Ne=fe.convert(Y.type);R.setTexture2D(Y,0),j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,Y.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,Y.unpackAlignment),B.isDataTexture?j.texSubImage2D(j.TEXTURE_2D,K,b.x,b.y,q,me,Te,Ne,B.image.data):B.isCompressedTexture?j.compressedTexSubImage2D(j.TEXTURE_2D,K,b.x,b.y,B.mipmaps[0].width,B.mipmaps[0].height,Te,B.mipmaps[0].data):j.texSubImage2D(j.TEXTURE_2D,K,b.x,b.y,Te,Ne,B.image),K===0&&Y.generateMipmaps&&j.generateMipmap(j.TEXTURE_2D),Ee.unbindTexture()},this.copyTextureToTexture3D=function(b,B,Y,K,q=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const me=b.max.x-b.min.x+1,Te=b.max.y-b.min.y+1,Ne=b.max.z-b.min.z+1,Ue=fe.convert(K.format),je=fe.convert(K.type);let ke;if(K.isData3DTexture)R.setTexture3D(K,0),ke=j.TEXTURE_3D;else if(K.isDataArrayTexture||K.isCompressedArrayTexture)R.setTexture2DArray(K,0),ke=j.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}j.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,K.flipY),j.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),j.pixelStorei(j.UNPACK_ALIGNMENT,K.unpackAlignment);const Ve=j.getParameter(j.UNPACK_ROW_LENGTH),St=j.getParameter(j.UNPACK_IMAGE_HEIGHT),vn=j.getParameter(j.UNPACK_SKIP_PIXELS),Ut=j.getParameter(j.UNPACK_SKIP_ROWS),gi=j.getParameter(j.UNPACK_SKIP_IMAGES),ft=Y.isCompressedTexture?Y.mipmaps[q]:Y.image;j.pixelStorei(j.UNPACK_ROW_LENGTH,ft.width),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,ft.height),j.pixelStorei(j.UNPACK_SKIP_PIXELS,b.min.x),j.pixelStorei(j.UNPACK_SKIP_ROWS,b.min.y),j.pixelStorei(j.UNPACK_SKIP_IMAGES,b.min.z),Y.isDataTexture||Y.isData3DTexture?j.texSubImage3D(ke,q,B.x,B.y,B.z,me,Te,Ne,Ue,je,ft.data):Y.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),j.compressedTexSubImage3D(ke,q,B.x,B.y,B.z,me,Te,Ne,Ue,ft.data)):j.texSubImage3D(ke,q,B.x,B.y,B.z,me,Te,Ne,Ue,je,ft),j.pixelStorei(j.UNPACK_ROW_LENGTH,Ve),j.pixelStorei(j.UNPACK_IMAGE_HEIGHT,St),j.pixelStorei(j.UNPACK_SKIP_PIXELS,vn),j.pixelStorei(j.UNPACK_SKIP_ROWS,Ut),j.pixelStorei(j.UNPACK_SKIP_IMAGES,gi),q===0&&K.generateMipmaps&&j.generateMipmap(ke),Ee.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?R.setTextureCube(b,0):b.isData3DTexture?R.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?R.setTexture2DArray(b,0):R.setTexture2D(b,0),Ee.unbindTexture()},this.resetState=function(){C=0,w=0,M=null,Ee.reset(),L.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Vh?"display-p3":"srgb",t.unpackColorSpace=st.workingColorSpace===nc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===zt?zr:mg}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===zr?zt:Ii}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class k1 extends zg{}k1.prototype.isWebGL1Renderer=!0;class B1 extends En{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}const _p={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class H1{constructor(e,t,i){const r=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.itemStart=function(u){a++,s===!1&&r.onStart!==void 0&&r.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,r.onProgress!==void 0&&r.onProgress(u,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){const f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){const p=c[f],v=c[f+1];if(p.global&&(p.lastIndex=0),p.test(u))return v}return null}}}const V1=new H1;class jh{constructor(e){this.manager=e!==void 0?e:V1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}jh.DEFAULT_MATERIAL_NAME="__DEFAULT";class G1 extends jh{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=_p.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Xo("img");function l(){u(),_p.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(f){u(),r&&r(f),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class kg extends jh{constructor(e){super(e)}load(e,t,i,r){const s=new fn,o=new G1(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}}class xp{constructor(e=1,t=0,i=0){return this.radius=e,this.phi=t,this.theta=i,this}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Qt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bh);class Qn{constructor(e){e===void 0&&(e=[0,0,0,0,0,0,0,0,0]),this.elements=e}identity(){const e=this.elements;e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=0,e[8]=1}setZero(){const e=this.elements;e[0]=0,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=0,e[6]=0,e[7]=0,e[8]=0}setTrace(e){const t=this.elements;t[0]=e.x,t[4]=e.y,t[8]=e.z}getTrace(e){e===void 0&&(e=new S);const t=this.elements;return e.x=t[0],e.y=t[4],e.z=t[8],e}vmult(e,t){t===void 0&&(t=new S);const i=this.elements,r=e.x,s=e.y,o=e.z;return t.x=i[0]*r+i[1]*s+i[2]*o,t.y=i[3]*r+i[4]*s+i[5]*o,t.z=i[6]*r+i[7]*s+i[8]*o,t}smult(e){for(let t=0;t<this.elements.length;t++)this.elements[t]*=e}mmult(e,t){t===void 0&&(t=new Qn);const i=this.elements,r=e.elements,s=t.elements,o=i[0],a=i[1],l=i[2],c=i[3],u=i[4],f=i[5],h=i[6],p=i[7],v=i[8],_=r[0],m=r[1],d=r[2],g=r[3],x=r[4],y=r[5],C=r[6],w=r[7],M=r[8];return s[0]=o*_+a*g+l*C,s[1]=o*m+a*x+l*w,s[2]=o*d+a*y+l*M,s[3]=c*_+u*g+f*C,s[4]=c*m+u*x+f*w,s[5]=c*d+u*y+f*M,s[6]=h*_+p*g+v*C,s[7]=h*m+p*x+v*w,s[8]=h*d+p*y+v*M,t}scale(e,t){t===void 0&&(t=new Qn);const i=this.elements,r=t.elements;for(let s=0;s!==3;s++)r[3*s+0]=e.x*i[3*s+0],r[3*s+1]=e.y*i[3*s+1],r[3*s+2]=e.z*i[3*s+2];return t}solve(e,t){t===void 0&&(t=new S);const i=3,r=4,s=[];let o,a;for(o=0;o<i*r;o++)s.push(0);for(o=0;o<3;o++)for(a=0;a<3;a++)s[o+r*a]=this.elements[o+3*a];s[3+4*0]=e.x,s[3+4*1]=e.y,s[3+4*2]=e.z;let l=3;const c=l;let u;const f=4;let h;do{if(o=c-l,s[o+r*o]===0){for(a=o+1;a<c;a++)if(s[o+r*a]!==0){u=f;do h=f-u,s[h+r*o]+=s[h+r*a];while(--u);break}}if(s[o+r*o]!==0)for(a=o+1;a<c;a++){const p=s[o+r*a]/s[o+r*o];u=f;do h=f-u,s[h+r*a]=h<=o?0:s[h+r*a]-s[h+r*o]*p;while(--u)}}while(--l);if(t.z=s[2*r+3]/s[2*r+2],t.y=(s[1*r+3]-s[1*r+2]*t.z)/s[1*r+1],t.x=(s[0*r+3]-s[0*r+2]*t.z-s[0*r+1]*t.y)/s[0*r+0],isNaN(t.x)||isNaN(t.y)||isNaN(t.z)||t.x===1/0||t.y===1/0||t.z===1/0)throw`Could not solve equation! Got x=[${t.toString()}], b=[${e.toString()}], A=[${this.toString()}]`;return t}e(e,t,i){if(i===void 0)return this.elements[t+3*e];this.elements[t+3*e]=i}copy(e){for(let t=0;t<e.elements.length;t++)this.elements[t]=e.elements[t];return this}toString(){let e="";const t=",";for(let i=0;i<9;i++)e+=this.elements[i]+t;return e}reverse(e){e===void 0&&(e=new Qn);const t=3,i=6,r=W1;let s,o;for(s=0;s<3;s++)for(o=0;o<3;o++)r[s+i*o]=this.elements[s+3*o];r[3+6*0]=1,r[3+6*1]=0,r[3+6*2]=0,r[4+6*0]=0,r[4+6*1]=1,r[4+6*2]=0,r[5+6*0]=0,r[5+6*1]=0,r[5+6*2]=1;let a=3;const l=a;let c;const u=i;let f;do{if(s=l-a,r[s+i*s]===0){for(o=s+1;o<l;o++)if(r[s+i*o]!==0){c=u;do f=u-c,r[f+i*s]+=r[f+i*o];while(--c);break}}if(r[s+i*s]!==0)for(o=s+1;o<l;o++){const h=r[s+i*o]/r[s+i*s];c=u;do f=u-c,r[f+i*o]=f<=s?0:r[f+i*o]-r[f+i*s]*h;while(--c)}}while(--a);s=2;do{o=s-1;do{const h=r[s+i*o]/r[s+i*s];c=i;do f=i-c,r[f+i*o]=r[f+i*o]-r[f+i*s]*h;while(--c)}while(o--)}while(--s);s=2;do{const h=1/r[s+i*s];c=i;do f=i-c,r[f+i*s]=r[f+i*s]*h;while(--c)}while(s--);s=2;do{o=2;do{if(f=r[t+o+i*s],isNaN(f)||f===1/0)throw`Could not reverse! A=[${this.toString()}]`;e.e(s,o,f)}while(o--)}while(s--);return e}setRotationFromQuaternion(e){const t=e.x,i=e.y,r=e.z,s=e.w,o=t+t,a=i+i,l=r+r,c=t*o,u=t*a,f=t*l,h=i*a,p=i*l,v=r*l,_=s*o,m=s*a,d=s*l,g=this.elements;return g[3*0+0]=1-(h+v),g[3*0+1]=u-d,g[3*0+2]=f+m,g[3*1+0]=u+d,g[3*1+1]=1-(c+v),g[3*1+2]=p-_,g[3*2+0]=f-m,g[3*2+1]=p+_,g[3*2+2]=1-(c+h),this}transpose(e){e===void 0&&(e=new Qn);const t=this.elements,i=e.elements;let r;return i[0]=t[0],i[4]=t[4],i[8]=t[8],r=t[1],i[1]=t[3],i[3]=r,r=t[2],i[2]=t[6],i[6]=r,r=t[5],i[5]=t[7],i[7]=r,e}}const W1=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class S{constructor(e,t,i){e===void 0&&(e=0),t===void 0&&(t=0),i===void 0&&(i=0),this.x=e,this.y=t,this.z=i}cross(e,t){t===void 0&&(t=new S);const i=e.x,r=e.y,s=e.z,o=this.x,a=this.y,l=this.z;return t.x=a*s-l*r,t.y=l*i-o*s,t.z=o*r-a*i,t}set(e,t,i){return this.x=e,this.y=t,this.z=i,this}setZero(){this.x=this.y=this.z=0}vadd(e,t){if(t)t.x=e.x+this.x,t.y=e.y+this.y,t.z=e.z+this.z;else return new S(this.x+e.x,this.y+e.y,this.z+e.z)}vsub(e,t){if(t)t.x=this.x-e.x,t.y=this.y-e.y,t.z=this.z-e.z;else return new S(this.x-e.x,this.y-e.y,this.z-e.z)}crossmat(){return new Qn([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const e=this.x,t=this.y,i=this.z,r=Math.sqrt(e*e+t*t+i*i);if(r>0){const s=1/r;this.x*=s,this.y*=s,this.z*=s}else this.x=0,this.y=0,this.z=0;return r}unit(e){e===void 0&&(e=new S);const t=this.x,i=this.y,r=this.z;let s=Math.sqrt(t*t+i*i+r*r);return s>0?(s=1/s,e.x=t*s,e.y=i*s,e.z=r*s):(e.x=1,e.y=0,e.z=0),e}length(){const e=this.x,t=this.y,i=this.z;return Math.sqrt(e*e+t*t+i*i)}lengthSquared(){return this.dot(this)}distanceTo(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z;return Math.sqrt((s-t)*(s-t)+(o-i)*(o-i)+(a-r)*(a-r))}distanceSquared(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z;return(s-t)*(s-t)+(o-i)*(o-i)+(a-r)*(a-r)}scale(e,t){t===void 0&&(t=new S);const i=this.x,r=this.y,s=this.z;return t.x=e*i,t.y=e*r,t.z=e*s,t}vmul(e,t){return t===void 0&&(t=new S),t.x=e.x*this.x,t.y=e.y*this.y,t.z=e.z*this.z,t}addScaledVector(e,t,i){return i===void 0&&(i=new S),i.x=this.x+e*t.x,i.y=this.y+e*t.y,i.z=this.z+e*t.z,i}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(e){return e===void 0&&(e=new S),e.x=-this.x,e.y=-this.y,e.z=-this.z,e}tangents(e,t){const i=this.length();if(i>0){const r=X1,s=1/i;r.set(this.x*s,this.y*s,this.z*s);const o=j1;Math.abs(r.x)<.9?(o.set(1,0,0),r.cross(o,e)):(o.set(0,1,0),r.cross(o,e)),r.cross(e,t)}else e.set(1,0,0),t.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}lerp(e,t,i){const r=this.x,s=this.y,o=this.z;i.x=r+(e.x-r)*t,i.y=s+(e.y-s)*t,i.z=o+(e.z-o)*t}almostEquals(e,t){return t===void 0&&(t=1e-6),!(Math.abs(this.x-e.x)>t||Math.abs(this.y-e.y)>t||Math.abs(this.z-e.z)>t)}almostZero(e){return e===void 0&&(e=1e-6),!(Math.abs(this.x)>e||Math.abs(this.y)>e||Math.abs(this.z)>e)}isAntiparallelTo(e,t){return this.negate(yp),yp.almostEquals(e,t)}clone(){return new S(this.x,this.y,this.z)}}S.ZERO=new S(0,0,0);S.UNIT_X=new S(1,0,0);S.UNIT_Y=new S(0,1,0);S.UNIT_Z=new S(0,0,1);const X1=new S,j1=new S,yp=new S;class Tn{constructor(e){e===void 0&&(e={}),this.lowerBound=new S,this.upperBound=new S,e.lowerBound&&this.lowerBound.copy(e.lowerBound),e.upperBound&&this.upperBound.copy(e.upperBound)}setFromPoints(e,t,i,r){const s=this.lowerBound,o=this.upperBound,a=i;s.copy(e[0]),a&&a.vmult(s,s),o.copy(s);for(let l=1;l<e.length;l++){let c=e[l];a&&(a.vmult(c,Sp),c=Sp),c.x>o.x&&(o.x=c.x),c.x<s.x&&(s.x=c.x),c.y>o.y&&(o.y=c.y),c.y<s.y&&(s.y=c.y),c.z>o.z&&(o.z=c.z),c.z<s.z&&(s.z=c.z)}return t&&(t.vadd(s,s),t.vadd(o,o)),r&&(s.x-=r,s.y-=r,s.z-=r,o.x+=r,o.y+=r,o.z+=r),this}copy(e){return this.lowerBound.copy(e.lowerBound),this.upperBound.copy(e.upperBound),this}clone(){return new Tn().copy(this)}extend(e){this.lowerBound.x=Math.min(this.lowerBound.x,e.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,e.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,e.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,e.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,e.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,e.upperBound.z)}overlaps(e){const t=this.lowerBound,i=this.upperBound,r=e.lowerBound,s=e.upperBound,o=r.x<=i.x&&i.x<=s.x||t.x<=s.x&&s.x<=i.x,a=r.y<=i.y&&i.y<=s.y||t.y<=s.y&&s.y<=i.y,l=r.z<=i.z&&i.z<=s.z||t.z<=s.z&&s.z<=i.z;return o&&a&&l}volume(){const e=this.lowerBound,t=this.upperBound;return(t.x-e.x)*(t.y-e.y)*(t.z-e.z)}contains(e){const t=this.lowerBound,i=this.upperBound,r=e.lowerBound,s=e.upperBound;return t.x<=r.x&&i.x>=s.x&&t.y<=r.y&&i.y>=s.y&&t.z<=r.z&&i.z>=s.z}getCorners(e,t,i,r,s,o,a,l){const c=this.lowerBound,u=this.upperBound;e.copy(c),t.set(u.x,c.y,c.z),i.set(u.x,u.y,c.z),r.set(c.x,u.y,u.z),s.set(u.x,c.y,u.z),o.set(c.x,u.y,c.z),a.set(c.x,c.y,u.z),l.copy(u)}toLocalFrame(e,t){const i=Ep,r=i[0],s=i[1],o=i[2],a=i[3],l=i[4],c=i[5],u=i[6],f=i[7];this.getCorners(r,s,o,a,l,c,u,f);for(let h=0;h!==8;h++){const p=i[h];e.pointToLocal(p,p)}return t.setFromPoints(i)}toWorldFrame(e,t){const i=Ep,r=i[0],s=i[1],o=i[2],a=i[3],l=i[4],c=i[5],u=i[6],f=i[7];this.getCorners(r,s,o,a,l,c,u,f);for(let h=0;h!==8;h++){const p=i[h];e.pointToWorld(p,p)}return t.setFromPoints(i)}overlapsRay(e){const{direction:t,from:i}=e,r=1/t.x,s=1/t.y,o=1/t.z,a=(this.lowerBound.x-i.x)*r,l=(this.upperBound.x-i.x)*r,c=(this.lowerBound.y-i.y)*s,u=(this.upperBound.y-i.y)*s,f=(this.lowerBound.z-i.z)*o,h=(this.upperBound.z-i.z)*o,p=Math.max(Math.max(Math.min(a,l),Math.min(c,u)),Math.min(f,h)),v=Math.min(Math.min(Math.max(a,l),Math.max(c,u)),Math.max(f,h));return!(v<0||p>v)}}const Sp=new S,Ep=[new S,new S,new S,new S,new S,new S,new S,new S];class Mp{constructor(){this.matrix=[]}get(e,t){let{index:i}=e,{index:r}=t;if(r>i){const s=r;r=i,i=s}return this.matrix[(i*(i+1)>>1)+r-1]}set(e,t,i){let{index:r}=e,{index:s}=t;if(s>r){const o=s;s=r,r=o}this.matrix[(r*(r+1)>>1)+s-1]=i?1:0}reset(){for(let e=0,t=this.matrix.length;e!==t;e++)this.matrix[e]=0}setNumObjects(e){this.matrix.length=e*(e-1)>>1}}class Bg{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;return i[e]===void 0&&(i[e]=[]),i[e].includes(t)||i[e].push(t),this}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return!!(i[e]!==void 0&&i[e].includes(t))}hasAnyEventListener(e){return this._listeners===void 0?!1:this._listeners[e]!==void 0}removeEventListener(e,t){if(this._listeners===void 0)return this;const i=this._listeners;if(i[e]===void 0)return this;const r=i[e].indexOf(t);return r!==-1&&i[e].splice(r,1),this}dispatchEvent(e){if(this._listeners===void 0)return this;const i=this._listeners[e.type];if(i!==void 0){e.target=this;for(let r=0,s=i.length;r<s;r++)i[r].call(this,e)}return this}}class At{constructor(e,t,i,r){e===void 0&&(e=0),t===void 0&&(t=0),i===void 0&&(i=0),r===void 0&&(r=1),this.x=e,this.y=t,this.z=i,this.w=r}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(e,t){const i=Math.sin(t*.5);return this.x=e.x*i,this.y=e.y*i,this.z=e.z*i,this.w=Math.cos(t*.5),this}toAxisAngle(e){e===void 0&&(e=new S),this.normalize();const t=2*Math.acos(this.w),i=Math.sqrt(1-this.w*this.w);return i<.001?(e.x=this.x,e.y=this.y,e.z=this.z):(e.x=this.x/i,e.y=this.y/i,e.z=this.z/i),[e,t]}setFromVectors(e,t){if(e.isAntiparallelTo(t)){const i=q1,r=Y1;e.tangents(i,r),this.setFromAxisAngle(i,Math.PI)}else{const i=e.cross(t);this.x=i.x,this.y=i.y,this.z=i.z,this.w=Math.sqrt(e.length()**2*t.length()**2)+e.dot(t),this.normalize()}return this}mult(e,t){t===void 0&&(t=new At);const i=this.x,r=this.y,s=this.z,o=this.w,a=e.x,l=e.y,c=e.z,u=e.w;return t.x=i*u+o*a+r*c-s*l,t.y=r*u+o*l+s*a-i*c,t.z=s*u+o*c+i*l-r*a,t.w=o*u-i*a-r*l-s*c,t}inverse(e){e===void 0&&(e=new At);const t=this.x,i=this.y,r=this.z,s=this.w;this.conjugate(e);const o=1/(t*t+i*i+r*r+s*s);return e.x*=o,e.y*=o,e.z*=o,e.w*=o,e}conjugate(e){return e===void 0&&(e=new At),e.x=-this.x,e.y=-this.y,e.z=-this.z,e.w=this.w,e}normalize(){let e=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return e===0?(this.x=0,this.y=0,this.z=0,this.w=0):(e=1/e,this.x*=e,this.y*=e,this.z*=e,this.w*=e),this}normalizeFast(){const e=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return e===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=e,this.y*=e,this.z*=e,this.w*=e),this}vmult(e,t){t===void 0&&(t=new S);const i=e.x,r=e.y,s=e.z,o=this.x,a=this.y,l=this.z,c=this.w,u=c*i+a*s-l*r,f=c*r+l*i-o*s,h=c*s+o*r-a*i,p=-o*i-a*r-l*s;return t.x=u*c+p*-o+f*-l-h*-a,t.y=f*c+p*-a+h*-o-u*-l,t.z=h*c+p*-l+u*-a-f*-o,t}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w,this}toEuler(e,t){t===void 0&&(t="YZX");let i,r,s;const o=this.x,a=this.y,l=this.z,c=this.w;switch(t){case"YZX":const u=o*a+l*c;if(u>.499&&(i=2*Math.atan2(o,c),r=Math.PI/2,s=0),u<-.499&&(i=-2*Math.atan2(o,c),r=-Math.PI/2,s=0),i===void 0){const f=o*o,h=a*a,p=l*l;i=Math.atan2(2*a*c-2*o*l,1-2*h-2*p),r=Math.asin(2*u),s=Math.atan2(2*o*c-2*a*l,1-2*f-2*p)}break;default:throw new Error(`Euler order ${t} not supported yet.`)}e.y=i,e.z=r,e.x=s}setFromEuler(e,t,i,r){r===void 0&&(r="XYZ");const s=Math.cos(e/2),o=Math.cos(t/2),a=Math.cos(i/2),l=Math.sin(e/2),c=Math.sin(t/2),u=Math.sin(i/2);return r==="XYZ"?(this.x=l*o*a+s*c*u,this.y=s*c*a-l*o*u,this.z=s*o*u+l*c*a,this.w=s*o*a-l*c*u):r==="YXZ"?(this.x=l*o*a+s*c*u,this.y=s*c*a-l*o*u,this.z=s*o*u-l*c*a,this.w=s*o*a+l*c*u):r==="ZXY"?(this.x=l*o*a-s*c*u,this.y=s*c*a+l*o*u,this.z=s*o*u+l*c*a,this.w=s*o*a-l*c*u):r==="ZYX"?(this.x=l*o*a-s*c*u,this.y=s*c*a+l*o*u,this.z=s*o*u-l*c*a,this.w=s*o*a+l*c*u):r==="YZX"?(this.x=l*o*a+s*c*u,this.y=s*c*a+l*o*u,this.z=s*o*u-l*c*a,this.w=s*o*a-l*c*u):r==="XZY"&&(this.x=l*o*a-s*c*u,this.y=s*c*a-l*o*u,this.z=s*o*u+l*c*a,this.w=s*o*a+l*c*u),this}clone(){return new At(this.x,this.y,this.z,this.w)}slerp(e,t,i){i===void 0&&(i=new At);const r=this.x,s=this.y,o=this.z,a=this.w;let l=e.x,c=e.y,u=e.z,f=e.w,h,p,v,_,m;return p=r*l+s*c+o*u+a*f,p<0&&(p=-p,l=-l,c=-c,u=-u,f=-f),1-p>1e-6?(h=Math.acos(p),v=Math.sin(h),_=Math.sin((1-t)*h)/v,m=Math.sin(t*h)/v):(_=1-t,m=t),i.x=_*r+m*l,i.y=_*s+m*c,i.z=_*o+m*u,i.w=_*a+m*f,i}integrate(e,t,i,r){r===void 0&&(r=new At);const s=e.x*i.x,o=e.y*i.y,a=e.z*i.z,l=this.x,c=this.y,u=this.z,f=this.w,h=t*.5;return r.x+=h*(s*f+o*u-a*c),r.y+=h*(o*f+a*l-s*u),r.z+=h*(a*f+s*c-o*l),r.w+=h*(-s*l-o*c-a*u),r}}const q1=new S,Y1=new S,$1={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class Se{constructor(e){e===void 0&&(e={}),this.id=Se.idCounter++,this.type=e.type||0,this.boundingSphereRadius=0,this.collisionResponse=e.collisionResponse?e.collisionResponse:!0,this.collisionFilterGroup=e.collisionFilterGroup!==void 0?e.collisionFilterGroup:1,this.collisionFilterMask=e.collisionFilterMask!==void 0?e.collisionFilterMask:-1,this.material=e.material?e.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(e,t){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(e,t,i,r){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}Se.idCounter=0;Se.types=$1;class nt{constructor(e){e===void 0&&(e={}),this.position=new S,this.quaternion=new At,e.position&&this.position.copy(e.position),e.quaternion&&this.quaternion.copy(e.quaternion)}pointToLocal(e,t){return nt.pointToLocalFrame(this.position,this.quaternion,e,t)}pointToWorld(e,t){return nt.pointToWorldFrame(this.position,this.quaternion,e,t)}vectorToWorldFrame(e,t){return t===void 0&&(t=new S),this.quaternion.vmult(e,t),t}static pointToLocalFrame(e,t,i,r){return r===void 0&&(r=new S),i.vsub(e,r),t.conjugate(wp),wp.vmult(r,r),r}static pointToWorldFrame(e,t,i,r){return r===void 0&&(r=new S),t.vmult(i,r),r.vadd(e,r),r}static vectorToWorldFrame(e,t,i){return i===void 0&&(i=new S),e.vmult(t,i),i}static vectorToLocalFrame(e,t,i,r){return r===void 0&&(r=new S),t.w*=-1,t.vmult(i,r),t.w*=-1,r}}const wp=new At;class No extends Se{constructor(e){e===void 0&&(e={});const{vertices:t=[],faces:i=[],normals:r=[],axes:s,boundingSphereRadius:o}=e;super({type:Se.types.CONVEXPOLYHEDRON}),this.vertices=t,this.faces=i,this.faceNormals=r,this.faceNormals.length===0&&this.computeNormals(),o?this.boundingSphereRadius=o:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=s?s.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const e=this.faces,t=this.vertices,i=this.uniqueEdges;i.length=0;const r=new S;for(let s=0;s!==e.length;s++){const o=e[s],a=o.length;for(let l=0;l!==a;l++){const c=(l+1)%a;t[o[l]].vsub(t[o[c]],r),r.normalize();let u=!1;for(let f=0;f!==i.length;f++)if(i[f].almostEquals(r)||i[f].almostEquals(r)){u=!0;break}u||i.push(r.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let e=0;e<this.faces.length;e++){for(let r=0;r<this.faces[e].length;r++)if(!this.vertices[this.faces[e][r]])throw new Error(`Vertex ${this.faces[e][r]} not found!`);const t=this.faceNormals[e]||new S;this.getFaceNormal(e,t),t.negate(t),this.faceNormals[e]=t;const i=this.vertices[this.faces[e][0]];if(t.dot(i)<0){console.error(`.faceNormals[${e}] = Vec3(${t.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let r=0;r<this.faces[e].length;r++)console.warn(`.vertices[${this.faces[e][r]}] = Vec3(${this.vertices[this.faces[e][r]].toString()})`)}}}getFaceNormal(e,t){const i=this.faces[e],r=this.vertices[i[0]],s=this.vertices[i[1]],o=this.vertices[i[2]];No.computeNormal(r,s,o,t)}static computeNormal(e,t,i,r){const s=new S,o=new S;t.vsub(e,o),i.vsub(t,s),s.cross(o,r),r.isZero()||r.normalize()}clipAgainstHull(e,t,i,r,s,o,a,l,c){const u=new S;let f=-1,h=-Number.MAX_VALUE;for(let v=0;v<i.faces.length;v++){u.copy(i.faceNormals[v]),s.vmult(u,u);const _=u.dot(o);_>h&&(h=_,f=v)}const p=[];for(let v=0;v<i.faces[f].length;v++){const _=i.vertices[i.faces[f][v]],m=new S;m.copy(_),s.vmult(m,m),r.vadd(m,m),p.push(m)}f>=0&&this.clipFaceAgainstHull(o,e,t,p,a,l,c)}findSeparatingAxis(e,t,i,r,s,o,a,l){const c=new S,u=new S,f=new S,h=new S,p=new S,v=new S;let _=Number.MAX_VALUE;const m=this;if(m.uniqueAxes)for(let d=0;d!==m.uniqueAxes.length;d++){i.vmult(m.uniqueAxes[d],c);const g=m.testSepAxis(c,e,t,i,r,s);if(g===!1)return!1;g<_&&(_=g,o.copy(c))}else{const d=a?a.length:m.faces.length;for(let g=0;g<d;g++){const x=a?a[g]:g;c.copy(m.faceNormals[x]),i.vmult(c,c);const y=m.testSepAxis(c,e,t,i,r,s);if(y===!1)return!1;y<_&&(_=y,o.copy(c))}}if(e.uniqueAxes)for(let d=0;d!==e.uniqueAxes.length;d++){s.vmult(e.uniqueAxes[d],u);const g=m.testSepAxis(u,e,t,i,r,s);if(g===!1)return!1;g<_&&(_=g,o.copy(u))}else{const d=l?l.length:e.faces.length;for(let g=0;g<d;g++){const x=l?l[g]:g;u.copy(e.faceNormals[x]),s.vmult(u,u);const y=m.testSepAxis(u,e,t,i,r,s);if(y===!1)return!1;y<_&&(_=y,o.copy(u))}}for(let d=0;d!==m.uniqueEdges.length;d++){i.vmult(m.uniqueEdges[d],h);for(let g=0;g!==e.uniqueEdges.length;g++)if(s.vmult(e.uniqueEdges[g],p),h.cross(p,v),!v.almostZero()){v.normalize();const x=m.testSepAxis(v,e,t,i,r,s);if(x===!1)return!1;x<_&&(_=x,o.copy(v))}}return r.vsub(t,f),f.dot(o)>0&&o.negate(o),!0}testSepAxis(e,t,i,r,s,o){const a=this;No.project(a,e,i,r,ru),No.project(t,e,s,o,su);const l=ru[0],c=ru[1],u=su[0],f=su[1];if(l<f||u<c)return!1;const h=l-f,p=u-c;return h<p?h:p}calculateLocalInertia(e,t){const i=new S,r=new S;this.computeLocalAABB(r,i);const s=i.x-r.x,o=i.y-r.y,a=i.z-r.z;t.x=1/12*e*(2*o*2*o+2*a*2*a),t.y=1/12*e*(2*s*2*s+2*a*2*a),t.z=1/12*e*(2*o*2*o+2*s*2*s)}getPlaneConstantOfFace(e){const t=this.faces[e],i=this.faceNormals[e],r=this.vertices[t[0]];return-i.dot(r)}clipFaceAgainstHull(e,t,i,r,s,o,a){const l=new S,c=new S,u=new S,f=new S,h=new S,p=new S,v=new S,_=new S,m=this,d=[],g=r,x=d;let y=-1,C=Number.MAX_VALUE;for(let T=0;T<m.faces.length;T++){l.copy(m.faceNormals[T]),i.vmult(l,l);const k=l.dot(e);k<C&&(C=k,y=T)}if(y<0)return;const w=m.faces[y];w.connectedFaces=[];for(let T=0;T<m.faces.length;T++)for(let k=0;k<m.faces[T].length;k++)w.indexOf(m.faces[T][k])!==-1&&T!==y&&w.connectedFaces.indexOf(T)===-1&&w.connectedFaces.push(T);const M=w.length;for(let T=0;T<M;T++){const k=m.vertices[w[T]],G=m.vertices[w[(T+1)%M]];k.vsub(G,c),u.copy(c),i.vmult(u,u),t.vadd(u,u),f.copy(this.faceNormals[y]),i.vmult(f,f),t.vadd(f,f),u.cross(f,h),h.negate(h),p.copy(k),i.vmult(p,p),t.vadd(p,p);const z=w.connectedFaces[T];v.copy(this.faceNormals[z]);const P=this.getPlaneConstantOfFace(z);_.copy(v),i.vmult(_,_);const I=P-_.dot(t);for(this.clipFaceAgainstPlane(g,x,_,I);g.length;)g.shift();for(;x.length;)g.push(x.shift())}v.copy(this.faceNormals[y]);const F=this.getPlaneConstantOfFace(y);_.copy(v),i.vmult(_,_);const E=F-_.dot(t);for(let T=0;T<g.length;T++){let k=_.dot(g[T])+E;if(k<=s&&(console.log(`clamped: depth=${k} to minDist=${s}`),k=s),k<=o){const G=g[T];if(k<=1e-6){const z={point:G,normal:_,depth:k};a.push(z)}}}}clipFaceAgainstPlane(e,t,i,r){let s,o;const a=e.length;if(a<2)return t;let l=e[e.length-1],c=e[0];s=i.dot(l)+r;for(let u=0;u<a;u++){if(c=e[u],o=i.dot(c)+r,s<0)if(o<0){const f=new S;f.copy(c),t.push(f)}else{const f=new S;l.lerp(c,s/(s-o),f),t.push(f)}else if(o<0){const f=new S;l.lerp(c,s/(s-o),f),t.push(f),t.push(c)}l=c,s=o}return t}computeWorldVertices(e,t){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new S);const i=this.vertices,r=this.worldVertices;for(let s=0;s!==this.vertices.length;s++)t.vmult(i[s],r[s]),e.vadd(r[s],r[s]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(e,t){const i=this.vertices;e.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),t.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let r=0;r<this.vertices.length;r++){const s=i[r];s.x<e.x?e.x=s.x:s.x>t.x&&(t.x=s.x),s.y<e.y?e.y=s.y:s.y>t.y&&(t.y=s.y),s.z<e.z?e.z=s.z:s.z>t.z&&(t.z=s.z)}}computeWorldFaceNormals(e){const t=this.faceNormals.length;for(;this.worldFaceNormals.length<t;)this.worldFaceNormals.push(new S);const i=this.faceNormals,r=this.worldFaceNormals;for(let s=0;s!==t;s++)e.vmult(i[s],r[s]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let e=0;const t=this.vertices;for(let i=0;i!==t.length;i++){const r=t[i].lengthSquared();r>e&&(e=r)}this.boundingSphereRadius=Math.sqrt(e)}calculateWorldAABB(e,t,i,r){const s=this.vertices;let o,a,l,c,u,f,h=new S;for(let p=0;p<s.length;p++){h.copy(s[p]),t.vmult(h,h),e.vadd(h,h);const v=h;(o===void 0||v.x<o)&&(o=v.x),(c===void 0||v.x>c)&&(c=v.x),(a===void 0||v.y<a)&&(a=v.y),(u===void 0||v.y>u)&&(u=v.y),(l===void 0||v.z<l)&&(l=v.z),(f===void 0||v.z>f)&&(f=v.z)}i.set(o,a,l),r.set(c,u,f)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(e){e===void 0&&(e=new S);const t=this.vertices;for(let i=0;i<t.length;i++)e.vadd(t[i],e);return e.scale(1/t.length,e),e}transformAllPoints(e,t){const i=this.vertices.length,r=this.vertices;if(t){for(let s=0;s<i;s++){const o=r[s];t.vmult(o,o)}for(let s=0;s<this.faceNormals.length;s++){const o=this.faceNormals[s];t.vmult(o,o)}}if(e)for(let s=0;s<i;s++){const o=r[s];o.vadd(e,o)}}pointIsInside(e){const t=this.vertices,i=this.faces,r=this.faceNormals,s=null,o=new S;this.getAveragePointLocal(o);for(let a=0;a<this.faces.length;a++){let l=r[a];const c=t[i[a][0]],u=new S;e.vsub(c,u);const f=l.dot(u),h=new S;o.vsub(c,h);const p=l.dot(h);if(f<0&&p>0||f>0&&p<0)return!1}return s?1:-1}static project(e,t,i,r,s){const o=e.vertices.length,a=K1;let l=0,c=0;const u=Z1,f=e.vertices;u.setZero(),nt.vectorToLocalFrame(i,r,t,a),nt.pointToLocalFrame(i,r,u,u);const h=u.dot(a);c=l=f[0].dot(a);for(let p=1;p<o;p++){const v=f[p].dot(a);v>l&&(l=v),v<c&&(c=v)}if(c-=h,l-=h,c>l){const p=c;c=l,l=p}s[0]=l,s[1]=c}}const ru=[],su=[];new S;const K1=new S,Z1=new S;class ac extends Se{constructor(e){super({type:Se.types.BOX}),this.halfExtents=e,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const e=this.halfExtents.x,t=this.halfExtents.y,i=this.halfExtents.z,r=S,s=[new r(-e,-t,-i),new r(e,-t,-i),new r(e,t,-i),new r(-e,t,-i),new r(-e,-t,i),new r(e,-t,i),new r(e,t,i),new r(-e,t,i)],o=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new r(0,0,1),new r(0,1,0),new r(1,0,0)],l=new No({vertices:s,faces:o,axes:a});this.convexPolyhedronRepresentation=l,l.material=this.material}calculateLocalInertia(e,t){return t===void 0&&(t=new S),ac.calculateInertia(this.halfExtents,e,t),t}static calculateInertia(e,t,i){const r=e;i.x=1/12*t*(2*r.y*2*r.y+2*r.z*2*r.z),i.y=1/12*t*(2*r.x*2*r.x+2*r.z*2*r.z),i.z=1/12*t*(2*r.y*2*r.y+2*r.x*2*r.x)}getSideNormals(e,t){const i=e,r=this.halfExtents;if(i[0].set(r.x,0,0),i[1].set(0,r.y,0),i[2].set(0,0,r.z),i[3].set(-r.x,0,0),i[4].set(0,-r.y,0),i[5].set(0,0,-r.z),t!==void 0)for(let s=0;s!==i.length;s++)t.vmult(i[s],i[s]);return i}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(e,t,i){const r=this.halfExtents,s=[[r.x,r.y,r.z],[-r.x,r.y,r.z],[-r.x,-r.y,r.z],[-r.x,-r.y,-r.z],[r.x,-r.y,-r.z],[r.x,r.y,-r.z],[-r.x,r.y,-r.z],[r.x,-r.y,r.z]];for(let o=0;o<s.length;o++)Xi.set(s[o][0],s[o][1],s[o][2]),t.vmult(Xi,Xi),e.vadd(Xi,Xi),i(Xi.x,Xi.y,Xi.z)}calculateWorldAABB(e,t,i,r){const s=this.halfExtents;ii[0].set(s.x,s.y,s.z),ii[1].set(-s.x,s.y,s.z),ii[2].set(-s.x,-s.y,s.z),ii[3].set(-s.x,-s.y,-s.z),ii[4].set(s.x,-s.y,-s.z),ii[5].set(s.x,s.y,-s.z),ii[6].set(-s.x,s.y,-s.z),ii[7].set(s.x,-s.y,s.z);const o=ii[0];t.vmult(o,o),e.vadd(o,o),r.copy(o),i.copy(o);for(let a=1;a<8;a++){const l=ii[a];t.vmult(l,l),e.vadd(l,l);const c=l.x,u=l.y,f=l.z;c>r.x&&(r.x=c),u>r.y&&(r.y=u),f>r.z&&(r.z=f),c<i.x&&(i.x=c),u<i.y&&(i.y=u),f<i.z&&(i.z=f)}}}const Xi=new S,ii=[new S,new S,new S,new S,new S,new S,new S,new S],qh={DYNAMIC:1,STATIC:2,KINEMATIC:4},Yh={AWAKE:0,SLEEPY:1,SLEEPING:2};class _e extends Bg{constructor(e){e===void 0&&(e={}),super(),this.id=_e.idCounter++,this.index=-1,this.world=null,this.vlambda=new S,this.collisionFilterGroup=typeof e.collisionFilterGroup=="number"?e.collisionFilterGroup:1,this.collisionFilterMask=typeof e.collisionFilterMask=="number"?e.collisionFilterMask:-1,this.collisionResponse=typeof e.collisionResponse=="boolean"?e.collisionResponse:!0,this.position=new S,this.previousPosition=new S,this.interpolatedPosition=new S,this.initPosition=new S,e.position&&(this.position.copy(e.position),this.previousPosition.copy(e.position),this.interpolatedPosition.copy(e.position),this.initPosition.copy(e.position)),this.velocity=new S,e.velocity&&this.velocity.copy(e.velocity),this.initVelocity=new S,this.force=new S;const t=typeof e.mass=="number"?e.mass:0;this.mass=t,this.invMass=t>0?1/t:0,this.material=e.material||null,this.linearDamping=typeof e.linearDamping=="number"?e.linearDamping:.01,this.type=t<=0?_e.STATIC:_e.DYNAMIC,typeof e.type==typeof _e.STATIC&&(this.type=e.type),this.allowSleep=typeof e.allowSleep<"u"?e.allowSleep:!0,this.sleepState=_e.AWAKE,this.sleepSpeedLimit=typeof e.sleepSpeedLimit<"u"?e.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof e.sleepTimeLimit<"u"?e.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new S,this.quaternion=new At,this.initQuaternion=new At,this.previousQuaternion=new At,this.interpolatedQuaternion=new At,e.quaternion&&(this.quaternion.copy(e.quaternion),this.initQuaternion.copy(e.quaternion),this.previousQuaternion.copy(e.quaternion),this.interpolatedQuaternion.copy(e.quaternion)),this.angularVelocity=new S,e.angularVelocity&&this.angularVelocity.copy(e.angularVelocity),this.initAngularVelocity=new S,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new S,this.invInertia=new S,this.invInertiaWorld=new Qn,this.invMassSolve=0,this.invInertiaSolve=new S,this.invInertiaWorldSolve=new Qn,this.fixedRotation=typeof e.fixedRotation<"u"?e.fixedRotation:!1,this.angularDamping=typeof e.angularDamping<"u"?e.angularDamping:.01,this.linearFactor=new S(1,1,1),e.linearFactor&&this.linearFactor.copy(e.linearFactor),this.angularFactor=new S(1,1,1),e.angularFactor&&this.angularFactor.copy(e.angularFactor),this.aabb=new Tn,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new S,this.isTrigger=Boolean(e.isTrigger),e.shape&&this.addShape(e.shape),this.updateMassProperties()}wakeUp(){const e=this.sleepState;this.sleepState=_e.AWAKE,this.wakeUpAfterNarrowphase=!1,e===_e.SLEEPING&&this.dispatchEvent(_e.wakeupEvent)}sleep(){this.sleepState=_e.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(e){if(this.allowSleep){const t=this.sleepState,i=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),r=this.sleepSpeedLimit**2;t===_e.AWAKE&&i<r?(this.sleepState=_e.SLEEPY,this.timeLastSleepy=e,this.dispatchEvent(_e.sleepyEvent)):t===_e.SLEEPY&&i>r?this.wakeUp():t===_e.SLEEPY&&e-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(_e.sleepEvent))}}updateSolveMassProperties(){this.sleepState===_e.SLEEPING||this.type===_e.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(e,t){return t===void 0&&(t=new S),e.vsub(this.position,t),this.quaternion.conjugate().vmult(t,t),t}vectorToLocalFrame(e,t){return t===void 0&&(t=new S),this.quaternion.conjugate().vmult(e,t),t}pointToWorldFrame(e,t){return t===void 0&&(t=new S),this.quaternion.vmult(e,t),t.vadd(this.position,t),t}vectorToWorldFrame(e,t){return t===void 0&&(t=new S),this.quaternion.vmult(e,t),t}addShape(e,t,i){const r=new S,s=new At;return t&&r.copy(t),i&&s.copy(i),this.shapes.push(e),this.shapeOffsets.push(r),this.shapeOrientations.push(s),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,e.body=this,this}removeShape(e){const t=this.shapes.indexOf(e);return t===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(t,1),this.shapeOffsets.splice(t,1),this.shapeOrientations.splice(t,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,e.body=null,this)}updateBoundingRadius(){const e=this.shapes,t=this.shapeOffsets,i=e.length;let r=0;for(let s=0;s!==i;s++){const o=e[s];o.updateBoundingSphereRadius();const a=t[s].length(),l=o.boundingSphereRadius;a+l>r&&(r=a+l)}this.boundingRadius=r}updateAABB(){const e=this.shapes,t=this.shapeOffsets,i=this.shapeOrientations,r=e.length,s=Q1,o=J1,a=this.quaternion,l=this.aabb,c=ew;for(let u=0;u!==r;u++){const f=e[u];a.vmult(t[u],s),s.vadd(this.position,s),a.mult(i[u],o),f.calculateWorldAABB(s,o,c.lowerBound,c.upperBound),u===0?l.copy(c):l.extend(c)}this.aabbNeedsUpdate=!1}updateInertiaWorld(e){const t=this.invInertia;if(!(t.x===t.y&&t.y===t.z&&!e)){const i=tw,r=nw;i.setRotationFromQuaternion(this.quaternion),i.transpose(r),i.scale(t,i),i.mmult(r,this.invInertiaWorld)}}applyForce(e,t){if(t===void 0&&(t=new S),this.type!==_e.DYNAMIC)return;this.sleepState===_e.SLEEPING&&this.wakeUp();const i=rw;t.cross(e,i),this.force.vadd(e,this.force),this.torque.vadd(i,this.torque)}applyLocalForce(e,t){if(t===void 0&&(t=new S),this.type!==_e.DYNAMIC)return;const i=sw,r=ow;this.vectorToWorldFrame(e,i),this.vectorToWorldFrame(t,r),this.applyForce(i,r)}applyTorque(e){this.type===_e.DYNAMIC&&(this.sleepState===_e.SLEEPING&&this.wakeUp(),this.torque.vadd(e,this.torque))}applyImpulse(e,t){if(t===void 0&&(t=new S),this.type!==_e.DYNAMIC)return;this.sleepState===_e.SLEEPING&&this.wakeUp();const i=t,r=aw;r.copy(e),r.scale(this.invMass,r),this.velocity.vadd(r,this.velocity);const s=lw;i.cross(e,s),this.invInertiaWorld.vmult(s,s),this.angularVelocity.vadd(s,this.angularVelocity)}applyLocalImpulse(e,t){if(t===void 0&&(t=new S),this.type!==_e.DYNAMIC)return;const i=cw,r=uw;this.vectorToWorldFrame(e,i),this.vectorToWorldFrame(t,r),this.applyImpulse(i,r)}updateMassProperties(){const e=hw;this.invMass=this.mass>0?1/this.mass:0;const t=this.inertia,i=this.fixedRotation;this.updateAABB(),e.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),ac.calculateInertia(e,this.mass,t),this.invInertia.set(t.x>0&&!i?1/t.x:0,t.y>0&&!i?1/t.y:0,t.z>0&&!i?1/t.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(e,t){const i=new S;return e.vsub(this.position,i),this.angularVelocity.cross(i,t),this.velocity.vadd(t,t),t}integrate(e,t,i){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===_e.DYNAMIC||this.type===_e.KINEMATIC)||this.sleepState===_e.SLEEPING)return;const r=this.velocity,s=this.angularVelocity,o=this.position,a=this.force,l=this.torque,c=this.quaternion,u=this.invMass,f=this.invInertiaWorld,h=this.linearFactor,p=u*e;r.x+=a.x*p*h.x,r.y+=a.y*p*h.y,r.z+=a.z*p*h.z;const v=f.elements,_=this.angularFactor,m=l.x*_.x,d=l.y*_.y,g=l.z*_.z;s.x+=e*(v[0]*m+v[1]*d+v[2]*g),s.y+=e*(v[3]*m+v[4]*d+v[5]*g),s.z+=e*(v[6]*m+v[7]*d+v[8]*g),o.x+=r.x*e,o.y+=r.y*e,o.z+=r.z*e,c.integrate(this.angularVelocity,e,this.angularFactor,c),t&&(i?c.normalizeFast():c.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}_e.idCounter=0;_e.COLLIDE_EVENT_NAME="collide";_e.DYNAMIC=qh.DYNAMIC;_e.STATIC=qh.STATIC;_e.KINEMATIC=qh.KINEMATIC;_e.AWAKE=Yh.AWAKE;_e.SLEEPY=Yh.SLEEPY;_e.SLEEPING=Yh.SLEEPING;_e.wakeupEvent={type:"wakeup"};_e.sleepyEvent={type:"sleepy"};_e.sleepEvent={type:"sleep"};const Q1=new S,J1=new At,ew=new Tn,tw=new Qn,nw=new Qn,iw=new Qn,rw=new S,sw=new S,ow=new S,aw=new S,lw=new S,cw=new S,uw=new S,hw=new S;class dw{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(e,t,i){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(e,t){return!((e.collisionFilterGroup&t.collisionFilterMask)===0||(t.collisionFilterGroup&e.collisionFilterMask)===0||((e.type&_e.STATIC)!==0||e.sleepState===_e.SLEEPING)&&((t.type&_e.STATIC)!==0||t.sleepState===_e.SLEEPING))}intersectionTest(e,t,i,r){this.useBoundingBoxes?this.doBoundingBoxBroadphase(e,t,i,r):this.doBoundingSphereBroadphase(e,t,i,r)}doBoundingSphereBroadphase(e,t,i,r){const s=fw;t.position.vsub(e.position,s);const o=(e.boundingRadius+t.boundingRadius)**2;s.lengthSquared()<o&&(i.push(e),r.push(t))}doBoundingBoxBroadphase(e,t,i,r){e.aabbNeedsUpdate&&e.updateAABB(),t.aabbNeedsUpdate&&t.updateAABB(),e.aabb.overlaps(t.aabb)&&(i.push(e),r.push(t))}makePairsUnique(e,t){const i=pw,r=mw,s=gw,o=e.length;for(let a=0;a!==o;a++)r[a]=e[a],s[a]=t[a];e.length=0,t.length=0;for(let a=0;a!==o;a++){const l=r[a].id,c=s[a].id,u=l<c?`${l},${c}`:`${c},${l}`;i[u]=a,i.keys.push(u)}for(let a=0;a!==i.keys.length;a++){const l=i.keys.pop(),c=i[l];e.push(r[c]),t.push(s[c]),delete i[l]}}setWorld(e){}static boundingSphereCheck(e,t){const i=new S;e.position.vsub(t.position,i);const r=e.shapes[0],s=t.shapes[0];return Math.pow(r.boundingSphereRadius+s.boundingSphereRadius,2)>i.lengthSquared()}aabbQuery(e,t,i){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const fw=new S;new S;new At;new S;const pw={keys:[]},mw=[],gw=[];new S;new S;new S;class vw extends dw{constructor(){super()}collisionPairs(e,t,i){const r=e.bodies,s=r.length;let o,a;for(let l=0;l!==s;l++)for(let c=0;c!==l;c++)o=r[l],a=r[c],this.needBroadphaseCollision(o,a)&&this.intersectionTest(o,a,t,i)}aabbQuery(e,t,i){i===void 0&&(i=[]);for(let r=0;r<e.bodies.length;r++){const s=e.bodies[r];s.aabbNeedsUpdate&&s.updateAABB(),s.aabb.overlaps(t)&&i.push(s)}return i}}class Pl{constructor(){this.rayFromWorld=new S,this.rayToWorld=new S,this.hitNormalWorld=new S,this.hitPointWorld=new S,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(e,t,i,r,s,o,a){this.rayFromWorld.copy(e),this.rayToWorld.copy(t),this.hitNormalWorld.copy(i),this.hitPointWorld.copy(r),this.shape=s,this.body=o,this.distance=a}}let Hg,Vg,Gg,Wg,Xg,jg,qg;const $h={CLOSEST:1,ANY:2,ALL:4};Hg=Se.types.SPHERE;Vg=Se.types.PLANE;Gg=Se.types.BOX;Wg=Se.types.CYLINDER;Xg=Se.types.CONVEXPOLYHEDRON;jg=Se.types.HEIGHTFIELD;qg=Se.types.TRIMESH;class Tt{get[Hg](){return this._intersectSphere}get[Vg](){return this._intersectPlane}get[Gg](){return this._intersectBox}get[Wg](){return this._intersectConvex}get[Xg](){return this._intersectConvex}get[jg](){return this._intersectHeightfield}get[qg](){return this._intersectTrimesh}constructor(e,t){e===void 0&&(e=new S),t===void 0&&(t=new S),this.from=e.clone(),this.to=t.clone(),this.direction=new S,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=Tt.ANY,this.result=new Pl,this.hasHit=!1,this.callback=i=>{}}intersectWorld(e,t){return this.mode=t.mode||Tt.ANY,this.result=t.result||new Pl,this.skipBackfaces=!!t.skipBackfaces,this.collisionFilterMask=typeof t.collisionFilterMask<"u"?t.collisionFilterMask:-1,this.collisionFilterGroup=typeof t.collisionFilterGroup<"u"?t.collisionFilterGroup:-1,this.checkCollisionResponse=typeof t.checkCollisionResponse<"u"?t.checkCollisionResponse:!0,t.from&&this.from.copy(t.from),t.to&&this.to.copy(t.to),this.callback=t.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(Tp),ou.length=0,e.broadphase.aabbQuery(e,Tp,ou),this.intersectBodies(ou),this.hasHit}intersectBody(e,t){t&&(this.result=t,this.updateDirection());const i=this.checkCollisionResponse;if(i&&!e.collisionResponse||(this.collisionFilterGroup&e.collisionFilterMask)===0||(e.collisionFilterGroup&this.collisionFilterMask)===0)return;const r=_w,s=xw;for(let o=0,a=e.shapes.length;o<a;o++){const l=e.shapes[o];if(!(i&&!l.collisionResponse)&&(e.quaternion.mult(e.shapeOrientations[o],s),e.quaternion.vmult(e.shapeOffsets[o],r),r.vadd(e.position,r),this.intersectShape(l,s,r,e),this.result.shouldStop))break}}intersectBodies(e,t){t&&(this.result=t,this.updateDirection());for(let i=0,r=e.length;!this.result.shouldStop&&i<r;i++)this.intersectBody(e[i])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(e,t,i,r){const s=this.from;if(Dw(s,this.direction,i)>e.boundingSphereRadius)return;const a=this[e.type];a&&a.call(this,e,t,i,r,e)}_intersectBox(e,t,i,r,s){return this._intersectConvex(e.convexPolyhedronRepresentation,t,i,r,s)}_intersectPlane(e,t,i,r,s){const o=this.from,a=this.to,l=this.direction,c=new S(0,0,1);t.vmult(c,c);const u=new S;o.vsub(i,u);const f=u.dot(c);a.vsub(i,u);const h=u.dot(c);if(f*h>0||o.distanceTo(a)<f)return;const p=c.dot(l);if(Math.abs(p)<this.precision)return;const v=new S,_=new S,m=new S;o.vsub(i,v);const d=-c.dot(v)/p;l.scale(d,_),o.vadd(_,m),this.reportIntersection(c,m,s,r,-1)}getAABB(e){const{lowerBound:t,upperBound:i}=e,r=this.to,s=this.from;t.x=Math.min(r.x,s.x),t.y=Math.min(r.y,s.y),t.z=Math.min(r.z,s.z),i.x=Math.max(r.x,s.x),i.y=Math.max(r.y,s.y),i.z=Math.max(r.z,s.z)}_intersectHeightfield(e,t,i,r,s){e.data,e.elementSize;const o=yw;o.from.copy(this.from),o.to.copy(this.to),nt.pointToLocalFrame(i,t,o.from,o.from),nt.pointToLocalFrame(i,t,o.to,o.to),o.updateDirection();const a=Sw;let l,c,u,f;l=c=0,u=f=e.data.length-1;const h=new Tn;o.getAABB(h),e.getIndexOfPosition(h.lowerBound.x,h.lowerBound.y,a,!0),l=Math.max(l,a[0]),c=Math.max(c,a[1]),e.getIndexOfPosition(h.upperBound.x,h.upperBound.y,a,!0),u=Math.min(u,a[0]+1),f=Math.min(f,a[1]+1);for(let p=l;p<u;p++)for(let v=c;v<f;v++){if(this.result.shouldStop)return;if(e.getAabbAtIndex(p,v,h),!!h.overlapsRay(o)){if(e.getConvexTrianglePillar(p,v,!1),nt.pointToWorldFrame(i,t,e.pillarOffset,Ha),this._intersectConvex(e.pillarConvex,t,Ha,r,s,Ap),this.result.shouldStop)return;e.getConvexTrianglePillar(p,v,!0),nt.pointToWorldFrame(i,t,e.pillarOffset,Ha),this._intersectConvex(e.pillarConvex,t,Ha,r,s,Ap)}}}_intersectSphere(e,t,i,r,s){const o=this.from,a=this.to,l=e.radius,c=(a.x-o.x)**2+(a.y-o.y)**2+(a.z-o.z)**2,u=2*((a.x-o.x)*(o.x-i.x)+(a.y-o.y)*(o.y-i.y)+(a.z-o.z)*(o.z-i.z)),f=(o.x-i.x)**2+(o.y-i.y)**2+(o.z-i.z)**2-l**2,h=u**2-4*c*f,p=Ew,v=Mw;if(!(h<0))if(h===0)o.lerp(a,h,p),p.vsub(i,v),v.normalize(),this.reportIntersection(v,p,s,r,-1);else{const _=(-u-Math.sqrt(h))/(2*c),m=(-u+Math.sqrt(h))/(2*c);if(_>=0&&_<=1&&(o.lerp(a,_,p),p.vsub(i,v),v.normalize(),this.reportIntersection(v,p,s,r,-1)),this.result.shouldStop)return;m>=0&&m<=1&&(o.lerp(a,m,p),p.vsub(i,v),v.normalize(),this.reportIntersection(v,p,s,r,-1))}}_intersectConvex(e,t,i,r,s,o){const a=ww,l=Cp,c=o&&o.faceList||null,u=e.faces,f=e.vertices,h=e.faceNormals,p=this.direction,v=this.from,_=this.to,m=v.distanceTo(_),d=c?c.length:u.length,g=this.result;for(let x=0;!g.shouldStop&&x<d;x++){const y=c?c[x]:x,C=u[y],w=h[y],M=t,F=i;l.copy(f[C[0]]),M.vmult(l,l),l.vadd(F,l),l.vsub(v,l),M.vmult(w,a);const E=p.dot(a);if(Math.abs(E)<this.precision)continue;const T=a.dot(l)/E;if(!(T<0)){p.scale(T,cn),cn.vadd(v,cn),Gn.copy(f[C[0]]),M.vmult(Gn,Gn),F.vadd(Gn,Gn);for(let k=1;!g.shouldStop&&k<C.length-1;k++){ri.copy(f[C[k]]),si.copy(f[C[k+1]]),M.vmult(ri,ri),M.vmult(si,si),F.vadd(ri,ri),F.vadd(si,si);const G=cn.distanceTo(v);!(Tt.pointInTriangle(cn,Gn,ri,si)||Tt.pointInTriangle(cn,ri,Gn,si))||G>m||this.reportIntersection(a,cn,s,r,y)}}}}_intersectTrimesh(e,t,i,r,s,o){const a=Tw,l=Lw,c=Nw,u=Cp,f=Aw,h=Cw,p=bw,v=Pw,_=Rw,m=e.indices;e.vertices;const d=this.from,g=this.to,x=this.direction;c.position.copy(i),c.quaternion.copy(t),nt.vectorToLocalFrame(i,t,x,f),nt.pointToLocalFrame(i,t,d,h),nt.pointToLocalFrame(i,t,g,p),p.x*=e.scale.x,p.y*=e.scale.y,p.z*=e.scale.z,h.x*=e.scale.x,h.y*=e.scale.y,h.z*=e.scale.z,p.vsub(h,f),f.normalize();const y=h.distanceSquared(p);e.tree.rayQuery(this,c,l);for(let C=0,w=l.length;!this.result.shouldStop&&C!==w;C++){const M=l[C];e.getNormal(M,a),e.getVertex(m[M*3],Gn),Gn.vsub(h,u);const F=f.dot(a),E=a.dot(u)/F;if(E<0)continue;f.scale(E,cn),cn.vadd(h,cn),e.getVertex(m[M*3+1],ri),e.getVertex(m[M*3+2],si);const T=cn.distanceSquared(h);!(Tt.pointInTriangle(cn,ri,Gn,si)||Tt.pointInTriangle(cn,Gn,ri,si))||T>y||(nt.vectorToWorldFrame(t,a,_),nt.pointToWorldFrame(i,t,cn,v),this.reportIntersection(_,v,s,r,M))}l.length=0}reportIntersection(e,t,i,r,s){const o=this.from,a=this.to,l=o.distanceTo(t),c=this.result;if(!(this.skipBackfaces&&e.dot(this.direction)>0))switch(c.hitFaceIndex=typeof s<"u"?s:-1,this.mode){case Tt.ALL:this.hasHit=!0,c.set(o,a,e,t,i,r,l),c.hasHit=!0,this.callback(c);break;case Tt.CLOSEST:(l<c.distance||!c.hasHit)&&(this.hasHit=!0,c.hasHit=!0,c.set(o,a,e,t,i,r,l));break;case Tt.ANY:this.hasHit=!0,c.hasHit=!0,c.set(o,a,e,t,i,r,l),c.shouldStop=!0;break}}static pointInTriangle(e,t,i,r){r.vsub(t,Lr),i.vsub(t,fo),e.vsub(t,au);const s=Lr.dot(Lr),o=Lr.dot(fo),a=Lr.dot(au),l=fo.dot(fo),c=fo.dot(au);let u,f;return(u=l*a-o*c)>=0&&(f=s*c-o*a)>=0&&u+f<s*l-o*o}}Tt.CLOSEST=$h.CLOSEST;Tt.ANY=$h.ANY;Tt.ALL=$h.ALL;const Tp=new Tn,ou=[],fo=new S,au=new S,_w=new S,xw=new At,cn=new S,Gn=new S,ri=new S,si=new S;new S;new Pl;const Ap={faceList:[0]},Ha=new S,yw=new Tt,Sw=[],Ew=new S,Mw=new S,ww=new S;new S;new S;const Cp=new S,Tw=new S,Aw=new S,Cw=new S,bw=new S,Rw=new S,Pw=new S;new Tn;const Lw=[],Nw=new nt,Lr=new S,Va=new S;function Dw(n,e,t){t.vsub(n,Lr);const i=Lr.dot(e);return e.scale(i,Va),Va.vadd(n,Va),t.distanceTo(Va)}class Iw{static defaults(e,t){e===void 0&&(e={});for(let i in t)i in e||(e[i]=t[i]);return e}}class bp{constructor(){this.spatial=new S,this.rotational=new S}multiplyElement(e){return e.spatial.dot(this.spatial)+e.rotational.dot(this.rotational)}multiplyVectors(e,t){return e.dot(this.spatial)+t.dot(this.rotational)}}class ua{constructor(e,t,i,r){i===void 0&&(i=-1e6),r===void 0&&(r=1e6),this.id=ua.idCounter++,this.minForce=i,this.maxForce=r,this.bi=e,this.bj=t,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new bp,this.jacobianElementB=new bp,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(e,t,i){const r=t,s=e,o=i;this.a=4/(o*(1+4*r)),this.b=4*r/(1+4*r),this.eps=4/(o*o*s*(1+4*r))}computeB(e,t,i){const r=this.computeGW(),s=this.computeGq(),o=this.computeGiMf();return-s*e-r*t-o*i}computeGq(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,r=this.bj,s=i.position,o=r.position;return e.spatial.dot(s)+t.spatial.dot(o)}computeGW(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,r=this.bj,s=i.velocity,o=r.velocity,a=i.angularVelocity,l=r.angularVelocity;return e.multiplyVectors(s,a)+t.multiplyVectors(o,l)}computeGWlambda(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,r=this.bj,s=i.vlambda,o=r.vlambda,a=i.wlambda,l=r.wlambda;return e.multiplyVectors(s,a)+t.multiplyVectors(o,l)}computeGiMf(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,r=this.bj,s=i.force,o=i.torque,a=r.force,l=r.torque,c=i.invMassSolve,u=r.invMassSolve;return s.scale(c,Rp),a.scale(u,Pp),i.invInertiaWorldSolve.vmult(o,Lp),r.invInertiaWorldSolve.vmult(l,Np),e.multiplyVectors(Rp,Lp)+t.multiplyVectors(Pp,Np)}computeGiMGt(){const e=this.jacobianElementA,t=this.jacobianElementB,i=this.bi,r=this.bj,s=i.invMassSolve,o=r.invMassSolve,a=i.invInertiaWorldSolve,l=r.invInertiaWorldSolve;let c=s+o;return a.vmult(e.rotational,Ga),c+=Ga.dot(e.rotational),l.vmult(t.rotational,Ga),c+=Ga.dot(t.rotational),c}addToWlambda(e){const t=this.jacobianElementA,i=this.jacobianElementB,r=this.bi,s=this.bj,o=Uw;r.vlambda.addScaledVector(r.invMassSolve*e,t.spatial,r.vlambda),s.vlambda.addScaledVector(s.invMassSolve*e,i.spatial,s.vlambda),r.invInertiaWorldSolve.vmult(t.rotational,o),r.wlambda.addScaledVector(e,o,r.wlambda),s.invInertiaWorldSolve.vmult(i.rotational,o),s.wlambda.addScaledVector(e,o,s.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}ua.idCounter=0;const Rp=new S,Pp=new S,Lp=new S,Np=new S,Ga=new S,Uw=new S;class Fw extends ua{constructor(e,t,i){i===void 0&&(i=1e6),super(e,t,0,i),this.restitution=0,this.ri=new S,this.rj=new S,this.ni=new S}computeB(e){const t=this.a,i=this.b,r=this.bi,s=this.bj,o=this.ri,a=this.rj,l=Ow,c=zw,u=r.velocity,f=r.angularVelocity;r.force,r.torque;const h=s.velocity,p=s.angularVelocity;s.force,s.torque;const v=kw,_=this.jacobianElementA,m=this.jacobianElementB,d=this.ni;o.cross(d,l),a.cross(d,c),d.negate(_.spatial),l.negate(_.rotational),m.spatial.copy(d),m.rotational.copy(c),v.copy(s.position),v.vadd(a,v),v.vsub(r.position,v),v.vsub(o,v);const g=d.dot(v),x=this.restitution+1,y=x*h.dot(d)-x*u.dot(d)+p.dot(c)-f.dot(l),C=this.computeGiMf();return-g*t-y*i-e*C}getImpactVelocityAlongNormal(){const e=Bw,t=Hw,i=Vw,r=Gw,s=Ww;return this.bi.position.vadd(this.ri,i),this.bj.position.vadd(this.rj,r),this.bi.getVelocityAtWorldPoint(i,e),this.bj.getVelocityAtWorldPoint(r,t),e.vsub(t,s),this.ni.dot(s)}}const Ow=new S,zw=new S,kw=new S,Bw=new S,Hw=new S,Vw=new S,Gw=new S,Ww=new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;class Dp extends ua{constructor(e,t,i){super(e,t,-i,i),this.ri=new S,this.rj=new S,this.t=new S}computeB(e){this.a;const t=this.b;this.bi,this.bj;const i=this.ri,r=this.rj,s=Xw,o=jw,a=this.t;i.cross(a,s),r.cross(a,o);const l=this.jacobianElementA,c=this.jacobianElementB;a.negate(l.spatial),s.negate(l.rotational),c.spatial.copy(a),c.rotational.copy(o);const u=this.computeGW(),f=this.computeGiMf();return-u*t-e*f}}const Xw=new S,jw=new S;class lc{constructor(e,t,i){i=Iw.defaults(i,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=lc.idCounter++,this.materials=[e,t],this.friction=i.friction,this.restitution=i.restitution,this.contactEquationStiffness=i.contactEquationStiffness,this.contactEquationRelaxation=i.contactEquationRelaxation,this.frictionEquationStiffness=i.frictionEquationStiffness,this.frictionEquationRelaxation=i.frictionEquationRelaxation}}lc.idCounter=0;class ha{constructor(e){e===void 0&&(e={});let t="";typeof e=="string"&&(t=e,e={}),this.name=t,this.id=ha.idCounter++,this.friction=typeof e.friction<"u"?e.friction:-1,this.restitution=typeof e.restitution<"u"?e.restitution:-1}}ha.idCounter=0;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new Tt;new S;new S;new S;new S(1,0,0),new S(0,1,0),new S(0,0,1);new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;class qw extends Se{constructor(){super({type:Se.types.PLANE}),this.worldNormal=new S,this.worldNormalNeedsUpdate=!0,this.boundingSphereRadius=Number.MAX_VALUE}computeWorldNormal(e){const t=this.worldNormal;t.set(0,0,1),e.vmult(t,t),this.worldNormalNeedsUpdate=!1}calculateLocalInertia(e,t){return t===void 0&&(t=new S),t}volume(){return Number.MAX_VALUE}calculateWorldAABB(e,t,i,r){Ei.set(0,0,1),t.vmult(Ei,Ei);const s=Number.MAX_VALUE;i.set(-s,-s,-s),r.set(s,s,s),Ei.x===1?r.x=e.x:Ei.x===-1&&(i.x=e.x),Ei.y===1?r.y=e.y:Ei.y===-1&&(i.y=e.y),Ei.z===1?r.z=e.z:Ei.z===-1&&(i.z=e.z)}updateBoundingSphereRadius(){this.boundingSphereRadius=Number.MAX_VALUE}}const Ei=new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new S;new Tn;new S;new Tn;new S;new S;new S;new S;new S;new S;new S;new Tn;new S;new nt;new Tn;class Yw{constructor(){this.equations=[]}solve(e,t){return 0}addEquation(e){e.enabled&&!e.bi.isTrigger&&!e.bj.isTrigger&&this.equations.push(e)}removeEquation(e){const t=this.equations,i=t.indexOf(e);i!==-1&&t.splice(i,1)}removeAllEquations(){this.equations.length=0}}class $w extends Yw{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(e,t){let i=0;const r=this.iterations,s=this.tolerance*this.tolerance,o=this.equations,a=o.length,l=t.bodies,c=l.length,u=e;let f,h,p,v,_,m;if(a!==0)for(let y=0;y!==c;y++)l[y].updateSolveMassProperties();const d=Zw,g=Qw,x=Kw;d.length=a,g.length=a,x.length=a;for(let y=0;y!==a;y++){const C=o[y];x[y]=0,g[y]=C.computeB(u),d[y]=1/C.computeC()}if(a!==0){for(let w=0;w!==c;w++){const M=l[w],F=M.vlambda,E=M.wlambda;F.set(0,0,0),E.set(0,0,0)}for(i=0;i!==r;i++){v=0;for(let w=0;w!==a;w++){const M=o[w];f=g[w],h=d[w],m=x[w],_=M.computeGWlambda(),p=h*(f-_-M.eps*m),m+p<M.minForce?p=M.minForce-m:m+p>M.maxForce&&(p=M.maxForce-m),x[w]+=p,v+=p>0?p:-p,M.addToWlambda(p)}if(v*v<s)break}for(let w=0;w!==c;w++){const M=l[w],F=M.velocity,E=M.angularVelocity;M.vlambda.vmul(M.linearFactor,M.vlambda),F.vadd(M.vlambda,F),M.wlambda.vmul(M.angularFactor,M.wlambda),E.vadd(M.wlambda,E)}let y=o.length;const C=1/u;for(;y--;)o[y].multiplier=x[y]*C}return i}}const Kw=[],Zw=[],Qw=[];_e.STATIC;class Jw{constructor(){this.objects=[],this.type=Object}release(){const e=arguments.length;for(let t=0;t!==e;t++)this.objects.push(t<0||arguments.length<=t?void 0:arguments[t]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(e){const t=this.objects;for(;t.length>e;)t.pop();for(;t.length<e;)t.push(this.constructObject());return this}}class eT extends Jw{constructor(){super(...arguments),this.type=S}constructObject(){return new S}}const lt={sphereSphere:Se.types.SPHERE,spherePlane:Se.types.SPHERE|Se.types.PLANE,boxBox:Se.types.BOX|Se.types.BOX,sphereBox:Se.types.SPHERE|Se.types.BOX,planeBox:Se.types.PLANE|Se.types.BOX,convexConvex:Se.types.CONVEXPOLYHEDRON,sphereConvex:Se.types.SPHERE|Se.types.CONVEXPOLYHEDRON,planeConvex:Se.types.PLANE|Se.types.CONVEXPOLYHEDRON,boxConvex:Se.types.BOX|Se.types.CONVEXPOLYHEDRON,sphereHeightfield:Se.types.SPHERE|Se.types.HEIGHTFIELD,boxHeightfield:Se.types.BOX|Se.types.HEIGHTFIELD,convexHeightfield:Se.types.CONVEXPOLYHEDRON|Se.types.HEIGHTFIELD,sphereParticle:Se.types.PARTICLE|Se.types.SPHERE,planeParticle:Se.types.PLANE|Se.types.PARTICLE,boxParticle:Se.types.BOX|Se.types.PARTICLE,convexParticle:Se.types.PARTICLE|Se.types.CONVEXPOLYHEDRON,cylinderCylinder:Se.types.CYLINDER,sphereCylinder:Se.types.SPHERE|Se.types.CYLINDER,planeCylinder:Se.types.PLANE|Se.types.CYLINDER,boxCylinder:Se.types.BOX|Se.types.CYLINDER,convexCylinder:Se.types.CONVEXPOLYHEDRON|Se.types.CYLINDER,heightfieldCylinder:Se.types.HEIGHTFIELD|Se.types.CYLINDER,particleCylinder:Se.types.PARTICLE|Se.types.CYLINDER,sphereTrimesh:Se.types.SPHERE|Se.types.TRIMESH,planeTrimesh:Se.types.PLANE|Se.types.TRIMESH};class tT{get[lt.sphereSphere](){return this.sphereSphere}get[lt.spherePlane](){return this.spherePlane}get[lt.boxBox](){return this.boxBox}get[lt.sphereBox](){return this.sphereBox}get[lt.planeBox](){return this.planeBox}get[lt.convexConvex](){return this.convexConvex}get[lt.sphereConvex](){return this.sphereConvex}get[lt.planeConvex](){return this.planeConvex}get[lt.boxConvex](){return this.boxConvex}get[lt.sphereHeightfield](){return this.sphereHeightfield}get[lt.boxHeightfield](){return this.boxHeightfield}get[lt.convexHeightfield](){return this.convexHeightfield}get[lt.sphereParticle](){return this.sphereParticle}get[lt.planeParticle](){return this.planeParticle}get[lt.boxParticle](){return this.boxParticle}get[lt.convexParticle](){return this.convexParticle}get[lt.cylinderCylinder](){return this.convexConvex}get[lt.sphereCylinder](){return this.sphereConvex}get[lt.planeCylinder](){return this.planeConvex}get[lt.boxCylinder](){return this.boxConvex}get[lt.convexCylinder](){return this.convexConvex}get[lt.heightfieldCylinder](){return this.heightfieldCylinder}get[lt.particleCylinder](){return this.particleCylinder}get[lt.sphereTrimesh](){return this.sphereTrimesh}get[lt.planeTrimesh](){return this.planeTrimesh}constructor(e){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new eT,this.world=e,this.currentContactMaterial=e.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(e,t,i,r,s,o){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=e,a.bj=t):a=new Fw(e,t),a.enabled=e.collisionResponse&&t.collisionResponse&&i.collisionResponse&&r.collisionResponse;const l=this.currentContactMaterial;a.restitution=l.restitution,a.setSpookParams(l.contactEquationStiffness,l.contactEquationRelaxation,this.world.dt);const c=i.material||e.material,u=r.material||t.material;return c&&u&&c.restitution>=0&&u.restitution>=0&&(a.restitution=c.restitution*u.restitution),a.si=s||i,a.sj=o||r,a}createFrictionEquationsFromContact(e,t){const i=e.bi,r=e.bj,s=e.si,o=e.sj,a=this.world,l=this.currentContactMaterial;let c=l.friction;const u=s.material||i.material,f=o.material||r.material;if(u&&f&&u.friction>=0&&f.friction>=0&&(c=u.friction*f.friction),c>0){const h=c*(a.frictionGravity||a.gravity).length();let p=i.invMass+r.invMass;p>0&&(p=1/p);const v=this.frictionEquationPool,_=v.length?v.pop():new Dp(i,r,h*p),m=v.length?v.pop():new Dp(i,r,h*p);return _.bi=m.bi=i,_.bj=m.bj=r,_.minForce=m.minForce=-h*p,_.maxForce=m.maxForce=h*p,_.ri.copy(e.ri),_.rj.copy(e.rj),m.ri.copy(e.ri),m.rj.copy(e.rj),e.ni.tangents(_.t,m.t),_.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),m.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),_.enabled=m.enabled=e.enabled,t.push(_,m),!0}return!1}createFrictionFromAverage(e){let t=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(t,this.frictionResult)||e===1)return;const i=this.frictionResult[this.frictionResult.length-2],r=this.frictionResult[this.frictionResult.length-1];Tr.setZero(),xs.setZero(),ys.setZero();const s=t.bi;t.bj;for(let a=0;a!==e;a++)t=this.result[this.result.length-1-a],t.bi!==s?(Tr.vadd(t.ni,Tr),xs.vadd(t.ri,xs),ys.vadd(t.rj,ys)):(Tr.vsub(t.ni,Tr),xs.vadd(t.rj,xs),ys.vadd(t.ri,ys));const o=1/e;xs.scale(o,i.ri),ys.scale(o,i.rj),r.ri.copy(i.ri),r.rj.copy(i.rj),Tr.normalize(),Tr.tangents(i.t,r.t)}getContacts(e,t,i,r,s,o,a){this.contactPointPool=s,this.frictionEquationPool=a,this.result=r,this.frictionResult=o;const l=rT,c=sT,u=nT,f=iT;for(let h=0,p=e.length;h!==p;h++){const v=e[h],_=t[h];let m=null;v.material&&_.material&&(m=i.getContactMaterial(v.material,_.material)||null);const d=v.type&_e.KINEMATIC&&_.type&_e.STATIC||v.type&_e.STATIC&&_.type&_e.KINEMATIC||v.type&_e.KINEMATIC&&_.type&_e.KINEMATIC;for(let g=0;g<v.shapes.length;g++){v.quaternion.mult(v.shapeOrientations[g],l),v.quaternion.vmult(v.shapeOffsets[g],u),u.vadd(v.position,u);const x=v.shapes[g];for(let y=0;y<_.shapes.length;y++){_.quaternion.mult(_.shapeOrientations[y],c),_.quaternion.vmult(_.shapeOffsets[y],f),f.vadd(_.position,f);const C=_.shapes[y];if(!(x.collisionFilterMask&C.collisionFilterGroup&&C.collisionFilterMask&x.collisionFilterGroup)||u.distanceTo(f)>x.boundingSphereRadius+C.boundingSphereRadius)continue;let w=null;x.material&&C.material&&(w=i.getContactMaterial(x.material,C.material)||null),this.currentContactMaterial=w||m||i.defaultContactMaterial;const M=x.type|C.type,F=this[M];if(F){let E=!1;x.type<C.type?E=F.call(this,x,C,u,f,l,c,v,_,x,C,d):E=F.call(this,C,x,f,u,c,l,_,v,x,C,d),E&&d&&(i.shapeOverlapKeeper.set(x.id,C.id),i.bodyOverlapKeeper.set(v.id,_.id))}}}}}sphereSphere(e,t,i,r,s,o,a,l,c,u,f){if(f)return i.distanceSquared(r)<(e.radius+t.radius)**2;const h=this.createContactEquation(a,l,e,t,c,u);r.vsub(i,h.ni),h.ni.normalize(),h.ri.copy(h.ni),h.rj.copy(h.ni),h.ri.scale(e.radius,h.ri),h.rj.scale(-t.radius,h.rj),h.ri.vadd(i,h.ri),h.ri.vsub(a.position,h.ri),h.rj.vadd(r,h.rj),h.rj.vsub(l.position,h.rj),this.result.push(h),this.createFrictionEquationsFromContact(h,this.frictionResult)}spherePlane(e,t,i,r,s,o,a,l,c,u,f){const h=this.createContactEquation(a,l,e,t,c,u);if(h.ni.set(0,0,1),o.vmult(h.ni,h.ni),h.ni.negate(h.ni),h.ni.normalize(),h.ni.scale(e.radius,h.ri),i.vsub(r,Wa),h.ni.scale(h.ni.dot(Wa),Ip),Wa.vsub(Ip,h.rj),-Wa.dot(h.ni)<=e.radius){if(f)return!0;const p=h.ri,v=h.rj;p.vadd(i,p),p.vsub(a.position,p),v.vadd(r,v),v.vsub(l.position,v),this.result.push(h),this.createFrictionEquationsFromContact(h,this.frictionResult)}}boxBox(e,t,i,r,s,o,a,l,c,u,f){return e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(e.convexPolyhedronRepresentation,t.convexPolyhedronRepresentation,i,r,s,o,a,l,e,t,f)}sphereBox(e,t,i,r,s,o,a,l,c,u,f){const h=this.v3pool,p=LT;i.vsub(r,Xa),t.getSideNormals(p,o);const v=e.radius;let _=!1;const m=DT,d=IT,g=UT;let x=null,y=0,C=0,w=0,M=null;for(let N=0,Z=p.length;N!==Z&&_===!1;N++){const D=bT;D.copy(p[N]);const O=D.length();D.normalize();const V=Xa.dot(D);if(V<O+v&&V>0){const Q=RT,W=PT;Q.copy(p[(N+1)%3]),W.copy(p[(N+2)%3]);const $=Q.length(),J=W.length();Q.normalize(),W.normalize();const ce=Xa.dot(Q),pe=Xa.dot(W);if(ce<$&&ce>-$&&pe<J&&pe>-J){const xe=Math.abs(V-O-v);if((M===null||xe<M)&&(M=xe,C=ce,w=pe,x=O,m.copy(D),d.copy(Q),g.copy(W),y++,f))return!0}}}if(y){_=!0;const N=this.createContactEquation(a,l,e,t,c,u);m.scale(-v,N.ri),N.ni.copy(m),N.ni.negate(N.ni),m.scale(x,m),d.scale(C,d),m.vadd(d,m),g.scale(w,g),m.vadd(g,N.rj),N.ri.vadd(i,N.ri),N.ri.vsub(a.position,N.ri),N.rj.vadd(r,N.rj),N.rj.vsub(l.position,N.rj),this.result.push(N),this.createFrictionEquationsFromContact(N,this.frictionResult)}let F=h.get();const E=NT;for(let N=0;N!==2&&!_;N++)for(let Z=0;Z!==2&&!_;Z++)for(let D=0;D!==2&&!_;D++)if(F.set(0,0,0),N?F.vadd(p[0],F):F.vsub(p[0],F),Z?F.vadd(p[1],F):F.vsub(p[1],F),D?F.vadd(p[2],F):F.vsub(p[2],F),r.vadd(F,E),E.vsub(i,E),E.lengthSquared()<v*v){if(f)return!0;_=!0;const O=this.createContactEquation(a,l,e,t,c,u);O.ri.copy(E),O.ri.normalize(),O.ni.copy(O.ri),O.ri.scale(v,O.ri),O.rj.copy(F),O.ri.vadd(i,O.ri),O.ri.vsub(a.position,O.ri),O.rj.vadd(r,O.rj),O.rj.vsub(l.position,O.rj),this.result.push(O),this.createFrictionEquationsFromContact(O,this.frictionResult)}h.release(F),F=null;const T=h.get(),k=h.get(),G=h.get(),z=h.get(),P=h.get(),I=p.length;for(let N=0;N!==I&&!_;N++)for(let Z=0;Z!==I&&!_;Z++)if(N%3!==Z%3){p[Z].cross(p[N],T),T.normalize(),p[N].vadd(p[Z],k),G.copy(i),G.vsub(k,G),G.vsub(r,G);const D=G.dot(T);T.scale(D,z);let O=0;for(;O===N%3||O===Z%3;)O++;P.copy(i),P.vsub(z,P),P.vsub(k,P),P.vsub(r,P);const V=Math.abs(D),Q=P.length();if(V<p[O].length()&&Q<v){if(f)return!0;_=!0;const W=this.createContactEquation(a,l,e,t,c,u);k.vadd(z,W.rj),W.rj.copy(W.rj),P.negate(W.ni),W.ni.normalize(),W.ri.copy(W.rj),W.ri.vadd(r,W.ri),W.ri.vsub(i,W.ri),W.ri.normalize(),W.ri.scale(v,W.ri),W.ri.vadd(i,W.ri),W.ri.vsub(a.position,W.ri),W.rj.vadd(r,W.rj),W.rj.vsub(l.position,W.rj),this.result.push(W),this.createFrictionEquationsFromContact(W,this.frictionResult)}}h.release(T,k,G,z,P)}planeBox(e,t,i,r,s,o,a,l,c,u,f){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,t.convexPolyhedronRepresentation.id=t.id,this.planeConvex(e,t.convexPolyhedronRepresentation,i,r,s,o,a,l,e,t,f)}convexConvex(e,t,i,r,s,o,a,l,c,u,f,h,p){const v=KT;if(!(i.distanceTo(r)>e.boundingSphereRadius+t.boundingSphereRadius)&&e.findSeparatingAxis(t,i,s,r,o,v,h,p)){const _=[],m=ZT;e.clipAgainstHull(i,s,t,r,o,v,-100,100,_);let d=0;for(let g=0;g!==_.length;g++){if(f)return!0;const x=this.createContactEquation(a,l,e,t,c,u),y=x.ri,C=x.rj;v.negate(x.ni),_[g].normal.negate(m),m.scale(_[g].depth,m),_[g].point.vadd(m,y),C.copy(_[g].point),y.vsub(i,y),C.vsub(r,C),y.vadd(i,y),y.vsub(a.position,y),C.vadd(r,C),C.vsub(l.position,C),this.result.push(x),d++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(x,this.frictionResult)}this.enableFrictionReduction&&d&&this.createFrictionFromAverage(d)}}sphereConvex(e,t,i,r,s,o,a,l,c,u,f){const h=this.v3pool;i.vsub(r,FT);const p=t.faceNormals,v=t.faces,_=t.vertices,m=e.radius;let d=!1;for(let g=0;g!==_.length;g++){const x=_[g],y=BT;o.vmult(x,y),r.vadd(y,y);const C=kT;if(y.vsub(i,C),C.lengthSquared()<m*m){if(f)return!0;d=!0;const w=this.createContactEquation(a,l,e,t,c,u);w.ri.copy(C),w.ri.normalize(),w.ni.copy(w.ri),w.ri.scale(m,w.ri),y.vsub(r,w.rj),w.ri.vadd(i,w.ri),w.ri.vsub(a.position,w.ri),w.rj.vadd(r,w.rj),w.rj.vsub(l.position,w.rj),this.result.push(w),this.createFrictionEquationsFromContact(w,this.frictionResult);return}}for(let g=0,x=v.length;g!==x&&d===!1;g++){const y=p[g],C=v[g],w=HT;o.vmult(y,w);const M=VT;o.vmult(_[C[0]],M),M.vadd(r,M);const F=GT;w.scale(-m,F),i.vadd(F,F);const E=WT;F.vsub(M,E);const T=E.dot(w),k=XT;if(i.vsub(M,k),T<0&&k.dot(w)>0){const G=[];for(let z=0,P=C.length;z!==P;z++){const I=h.get();o.vmult(_[C[z]],I),r.vadd(I,I),G.push(I)}if(CT(G,w,i)){if(f)return!0;d=!0;const z=this.createContactEquation(a,l,e,t,c,u);w.scale(-m,z.ri),w.negate(z.ni);const P=h.get();w.scale(-T,P);const I=h.get();w.scale(-m,I),i.vsub(r,z.rj),z.rj.vadd(I,z.rj),z.rj.vadd(P,z.rj),z.rj.vadd(r,z.rj),z.rj.vsub(l.position,z.rj),z.ri.vadd(i,z.ri),z.ri.vsub(a.position,z.ri),h.release(P),h.release(I),this.result.push(z),this.createFrictionEquationsFromContact(z,this.frictionResult);for(let N=0,Z=G.length;N!==Z;N++)h.release(G[N]);return}else for(let z=0;z!==C.length;z++){const P=h.get(),I=h.get();o.vmult(_[C[(z+1)%C.length]],P),o.vmult(_[C[(z+2)%C.length]],I),r.vadd(P,P),r.vadd(I,I);const N=OT;I.vsub(P,N);const Z=zT;N.unit(Z);const D=h.get(),O=h.get();i.vsub(P,O);const V=O.dot(Z);Z.scale(V,D),D.vadd(P,D);const Q=h.get();if(D.vsub(i,Q),V>0&&V*V<N.lengthSquared()&&Q.lengthSquared()<m*m){if(f)return!0;const W=this.createContactEquation(a,l,e,t,c,u);D.vsub(r,W.rj),D.vsub(i,W.ni),W.ni.normalize(),W.ni.scale(m,W.ri),W.rj.vadd(r,W.rj),W.rj.vsub(l.position,W.rj),W.ri.vadd(i,W.ri),W.ri.vsub(a.position,W.ri),this.result.push(W),this.createFrictionEquationsFromContact(W,this.frictionResult);for(let $=0,J=G.length;$!==J;$++)h.release(G[$]);h.release(P),h.release(I),h.release(D),h.release(Q),h.release(O);return}h.release(P),h.release(I),h.release(D),h.release(Q),h.release(O)}for(let z=0,P=G.length;z!==P;z++)h.release(G[z])}}}planeConvex(e,t,i,r,s,o,a,l,c,u,f){const h=jT,p=qT;p.set(0,0,1),s.vmult(p,p);let v=0;const _=YT;for(let m=0;m!==t.vertices.length;m++)if(h.copy(t.vertices[m]),o.vmult(h,h),r.vadd(h,h),h.vsub(i,_),p.dot(_)<=0){if(f)return!0;const g=this.createContactEquation(a,l,e,t,c,u),x=$T;p.scale(p.dot(_),x),h.vsub(x,x),x.vsub(i,g.ri),g.ni.copy(p),h.vsub(r,g.rj),g.ri.vadd(i,g.ri),g.ri.vsub(a.position,g.ri),g.rj.vadd(r,g.rj),g.rj.vsub(l.position,g.rj),this.result.push(g),v++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(g,this.frictionResult)}this.enableFrictionReduction&&v&&this.createFrictionFromAverage(v)}boxConvex(e,t,i,r,s,o,a,l,c,u,f){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(e.convexPolyhedronRepresentation,t,i,r,s,o,a,l,e,t,f)}sphereHeightfield(e,t,i,r,s,o,a,l,c,u,f){const h=t.data,p=e.radius,v=t.elementSize,_=cA,m=lA;nt.pointToLocalFrame(r,o,i,m);let d=Math.floor((m.x-p)/v)-1,g=Math.ceil((m.x+p)/v)+1,x=Math.floor((m.y-p)/v)-1,y=Math.ceil((m.y+p)/v)+1;if(g<0||y<0||d>h.length||x>h[0].length)return;d<0&&(d=0),g<0&&(g=0),x<0&&(x=0),y<0&&(y=0),d>=h.length&&(d=h.length-1),g>=h.length&&(g=h.length-1),y>=h[0].length&&(y=h[0].length-1),x>=h[0].length&&(x=h[0].length-1);const C=[];t.getRectMinMax(d,x,g,y,C);const w=C[0],M=C[1];if(m.z-p>M||m.z+p<w)return;const F=this.result;for(let E=d;E<g;E++)for(let T=x;T<y;T++){const k=F.length;let G=!1;if(t.getConvexTrianglePillar(E,T,!1),nt.pointToWorldFrame(r,o,t.pillarOffset,_),i.distanceTo(_)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(G=this.sphereConvex(e,t.pillarConvex,i,_,s,o,a,l,e,t,f)),f&&G||(t.getConvexTrianglePillar(E,T,!0),nt.pointToWorldFrame(r,o,t.pillarOffset,_),i.distanceTo(_)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(G=this.sphereConvex(e,t.pillarConvex,i,_,s,o,a,l,e,t,f)),f&&G))return!0;if(F.length-k>2)return}}boxHeightfield(e,t,i,r,s,o,a,l,c,u,f){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexHeightfield(e.convexPolyhedronRepresentation,t,i,r,s,o,a,l,e,t,f)}convexHeightfield(e,t,i,r,s,o,a,l,c,u,f){const h=t.data,p=t.elementSize,v=e.boundingSphereRadius,_=oA,m=aA,d=sA;nt.pointToLocalFrame(r,o,i,d);let g=Math.floor((d.x-v)/p)-1,x=Math.ceil((d.x+v)/p)+1,y=Math.floor((d.y-v)/p)-1,C=Math.ceil((d.y+v)/p)+1;if(x<0||C<0||g>h.length||y>h[0].length)return;g<0&&(g=0),x<0&&(x=0),y<0&&(y=0),C<0&&(C=0),g>=h.length&&(g=h.length-1),x>=h.length&&(x=h.length-1),C>=h[0].length&&(C=h[0].length-1),y>=h[0].length&&(y=h[0].length-1);const w=[];t.getRectMinMax(g,y,x,C,w);const M=w[0],F=w[1];if(!(d.z-v>F||d.z+v<M))for(let E=g;E<x;E++)for(let T=y;T<C;T++){let k=!1;if(t.getConvexTrianglePillar(E,T,!1),nt.pointToWorldFrame(r,o,t.pillarOffset,_),i.distanceTo(_)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(k=this.convexConvex(e,t.pillarConvex,i,_,s,o,a,l,null,null,f,m,null)),f&&k||(t.getConvexTrianglePillar(E,T,!0),nt.pointToWorldFrame(r,o,t.pillarOffset,_),i.distanceTo(_)<t.pillarConvex.boundingSphereRadius+e.boundingSphereRadius&&(k=this.convexConvex(e,t.pillarConvex,i,_,s,o,a,l,null,null,f,m,null)),f&&k))return!0}}sphereParticle(e,t,i,r,s,o,a,l,c,u,f){const h=tA;if(h.set(0,0,1),r.vsub(i,h),h.lengthSquared()<=e.radius*e.radius){if(f)return!0;const v=this.createContactEquation(l,a,t,e,c,u);h.normalize(),v.rj.copy(h),v.rj.scale(e.radius,v.rj),v.ni.copy(h),v.ni.negate(v.ni),v.ri.set(0,0,0),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}planeParticle(e,t,i,r,s,o,a,l,c,u,f){const h=QT;h.set(0,0,1),a.quaternion.vmult(h,h);const p=JT;if(r.vsub(a.position,p),h.dot(p)<=0){if(f)return!0;const _=this.createContactEquation(l,a,t,e,c,u);_.ni.copy(h),_.ni.negate(_.ni),_.ri.set(0,0,0);const m=eA;h.scale(h.dot(r),m),r.vsub(m,m),_.rj.copy(m),this.result.push(_),this.createFrictionEquationsFromContact(_,this.frictionResult)}}boxParticle(e,t,i,r,s,o,a,l,c,u,f){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexParticle(e.convexPolyhedronRepresentation,t,i,r,s,o,a,l,e,t,f)}convexParticle(e,t,i,r,s,o,a,l,c,u,f){let h=-1;const p=iA,v=rA;let _=null;const m=nA;if(m.copy(r),m.vsub(i,m),s.conjugate(Up),Up.vmult(m,m),e.pointIsInside(m)){e.worldVerticesNeedsUpdate&&e.computeWorldVertices(i,s),e.worldFaceNormalsNeedsUpdate&&e.computeWorldFaceNormals(s);for(let d=0,g=e.faces.length;d!==g;d++){const x=[e.worldVertices[e.faces[d][0]]],y=e.worldFaceNormals[d];r.vsub(x[0],Fp);const C=-y.dot(Fp);if(_===null||Math.abs(C)<Math.abs(_)){if(f)return!0;_=C,h=d,p.copy(y)}}if(h!==-1){const d=this.createContactEquation(l,a,t,e,c,u);p.scale(_,v),v.vadd(r,v),v.vsub(i,v),d.rj.copy(v),p.negate(d.ni),d.ri.set(0,0,0);const g=d.ri,x=d.rj;g.vadd(r,g),g.vsub(l.position,g),x.vadd(i,x),x.vsub(a.position,x),this.result.push(d),this.createFrictionEquationsFromContact(d,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(e,t,i,r,s,o,a,l,c,u,f){return this.convexHeightfield(t,e,r,i,o,s,l,a,c,u,f)}particleCylinder(e,t,i,r,s,o,a,l,c,u,f){return this.convexParticle(t,e,r,i,o,s,l,a,c,u,f)}sphereTrimesh(e,t,i,r,s,o,a,l,c,u,f){const h=fT,p=pT,v=mT,_=gT,m=vT,d=_T,g=ET,x=dT,y=uT,C=MT;nt.pointToLocalFrame(r,o,i,m);const w=e.radius;g.lowerBound.set(m.x-w,m.y-w,m.z-w),g.upperBound.set(m.x+w,m.y+w,m.z+w),t.getTrianglesInAABB(g,C);const M=hT,F=e.radius*e.radius;for(let z=0;z<C.length;z++)for(let P=0;P<3;P++)if(t.getVertex(t.indices[C[z]*3+P],M),M.vsub(m,y),y.lengthSquared()<=F){if(x.copy(M),nt.pointToWorldFrame(r,o,x,M),M.vsub(i,y),f)return!0;let I=this.createContactEquation(a,l,e,t,c,u);I.ni.copy(y),I.ni.normalize(),I.ri.copy(I.ni),I.ri.scale(e.radius,I.ri),I.ri.vadd(i,I.ri),I.ri.vsub(a.position,I.ri),I.rj.copy(M),I.rj.vsub(l.position,I.rj),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult)}for(let z=0;z<C.length;z++)for(let P=0;P<3;P++){t.getVertex(t.indices[C[z]*3+P],h),t.getVertex(t.indices[C[z]*3+(P+1)%3],p),p.vsub(h,v),m.vsub(p,d);const I=d.dot(v);m.vsub(h,d);let N=d.dot(v);if(N>0&&I<0&&(m.vsub(h,d),_.copy(v),_.normalize(),N=d.dot(_),_.scale(N,d),d.vadd(h,d),d.distanceTo(m)<e.radius)){if(f)return!0;const D=this.createContactEquation(a,l,e,t,c,u);d.vsub(m,D.ni),D.ni.normalize(),D.ni.scale(e.radius,D.ri),D.ri.vadd(i,D.ri),D.ri.vsub(a.position,D.ri),nt.pointToWorldFrame(r,o,d,d),d.vsub(l.position,D.rj),nt.vectorToWorldFrame(o,D.ni,D.ni),nt.vectorToWorldFrame(o,D.ri,D.ri),this.result.push(D),this.createFrictionEquationsFromContact(D,this.frictionResult)}}const E=xT,T=yT,k=ST,G=cT;for(let z=0,P=C.length;z!==P;z++){t.getTriangleVertices(C[z],E,T,k),t.getNormal(C[z],G),m.vsub(E,d);let I=d.dot(G);if(G.scale(I,d),m.vsub(d,d),I=d.distanceTo(m),Tt.pointInTriangle(d,E,T,k)&&I<e.radius){if(f)return!0;let N=this.createContactEquation(a,l,e,t,c,u);d.vsub(m,N.ni),N.ni.normalize(),N.ni.scale(e.radius,N.ri),N.ri.vadd(i,N.ri),N.ri.vsub(a.position,N.ri),nt.pointToWorldFrame(r,o,d,d),d.vsub(l.position,N.rj),nt.vectorToWorldFrame(o,N.ni,N.ni),nt.vectorToWorldFrame(o,N.ri,N.ri),this.result.push(N),this.createFrictionEquationsFromContact(N,this.frictionResult)}}C.length=0}planeTrimesh(e,t,i,r,s,o,a,l,c,u,f){const h=new S,p=oT;p.set(0,0,1),s.vmult(p,p);for(let v=0;v<t.vertices.length/3;v++){t.getVertex(v,h);const _=new S;_.copy(h),nt.pointToWorldFrame(r,o,_,h);const m=aT;if(h.vsub(i,m),p.dot(m)<=0){if(f)return!0;const g=this.createContactEquation(a,l,e,t,c,u);g.ni.copy(p);const x=lT;p.scale(m.dot(p),x),h.vsub(x,x),g.ri.copy(x),g.ri.vsub(a.position,g.ri),g.rj.copy(h),g.rj.vsub(l.position,g.rj),this.result.push(g),this.createFrictionEquationsFromContact(g,this.frictionResult)}}}}const Tr=new S,xs=new S,ys=new S,nT=new S,iT=new S,rT=new At,sT=new At,oT=new S,aT=new S,lT=new S,cT=new S,uT=new S;new S;const hT=new S,dT=new S,fT=new S,pT=new S,mT=new S,gT=new S,vT=new S,_T=new S,xT=new S,yT=new S,ST=new S,ET=new Tn,MT=[],Wa=new S,Ip=new S,wT=new S,TT=new S,AT=new S;function CT(n,e,t){let i=null;const r=n.length;for(let s=0;s!==r;s++){const o=n[s],a=wT;n[(s+1)%r].vsub(o,a);const l=TT;a.cross(e,l);const c=AT;t.vsub(o,c);const u=l.dot(c);if(i===null||u>0&&i===!0||u<=0&&i===!1){i===null&&(i=u>0);continue}else return!1}return!0}const Xa=new S,bT=new S,RT=new S,PT=new S,LT=[new S,new S,new S,new S,new S,new S],NT=new S,DT=new S,IT=new S,UT=new S,FT=new S,OT=new S,zT=new S,kT=new S,BT=new S,HT=new S,VT=new S,GT=new S,WT=new S,XT=new S;new S;new S;const jT=new S,qT=new S,YT=new S,$T=new S,KT=new S,ZT=new S,QT=new S,JT=new S,eA=new S,tA=new S,Up=new At,nA=new S;new S;const iA=new S,Fp=new S,rA=new S,sA=new S,oA=new S,aA=[0],lA=new S,cA=new S;class Op{constructor(){this.current=[],this.previous=[]}getKey(e,t){if(t<e){const i=t;t=e,e=i}return e<<16|t}set(e,t){const i=this.getKey(e,t),r=this.current;let s=0;for(;i>r[s];)s++;if(i!==r[s]){for(let o=r.length-1;o>=s;o--)r[o+1]=r[o];r[s]=i}}tick(){const e=this.current;this.current=this.previous,this.previous=e,this.current.length=0}getDiff(e,t){const i=this.current,r=this.previous,s=i.length,o=r.length;let a=0;for(let l=0;l<s;l++){let c=!1;const u=i[l];for(;u>r[a];)a++;c=u===r[a],c||zp(e,u)}a=0;for(let l=0;l<o;l++){let c=!1;const u=r[l];for(;u>i[a];)a++;c=i[a]===u,c||zp(t,u)}}}function zp(n,e){n.push((e&4294901760)>>16,e&65535)}const lu=(n,e)=>n<e?`${n}-${e}`:`${e}-${n}`;class uA{constructor(){this.data={keys:[]}}get(e,t){const i=lu(e,t);return this.data[i]}set(e,t,i){const r=lu(e,t);this.get(e,t)||this.data.keys.push(r),this.data[r]=i}delete(e,t){const i=lu(e,t),r=this.data.keys.indexOf(i);r!==-1&&this.data.keys.splice(r,1),delete this.data[i]}reset(){const e=this.data,t=e.keys;for(;t.length>0;){const i=t.pop();delete e[i]}}}class hA extends Bg{constructor(e){e===void 0&&(e={}),super(),this.dt=-1,this.allowSleep=!!e.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=e.quatNormalizeSkip!==void 0?e.quatNormalizeSkip:0,this.quatNormalizeFast=e.quatNormalizeFast!==void 0?e.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new S,e.gravity&&this.gravity.copy(e.gravity),e.frictionGravity&&(this.frictionGravity=new S,this.frictionGravity.copy(e.frictionGravity)),this.broadphase=e.broadphase!==void 0?e.broadphase:new vw,this.bodies=[],this.hasActiveBodies=!1,this.solver=e.solver!==void 0?e.solver:new $w,this.constraints=[],this.narrowphase=new tT(this),this.collisionMatrix=new Mp,this.collisionMatrixPrevious=new Mp,this.bodyOverlapKeeper=new Op,this.shapeOverlapKeeper=new Op,this.contactmaterials=[],this.contactMaterialTable=new uA,this.defaultMaterial=new ha("default"),this.defaultContactMaterial=new lc(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(e,t){return this.contactMaterialTable.get(e.id,t.id)}collisionMatrixTick(){const e=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=e,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(e){this.constraints.push(e)}removeConstraint(e){const t=this.constraints.indexOf(e);t!==-1&&this.constraints.splice(t,1)}rayTest(e,t,i){i instanceof Pl?this.raycastClosest(e,t,{skipBackfaces:!0},i):this.raycastAll(e,t,{skipBackfaces:!0},i)}raycastAll(e,t,i,r){return i===void 0&&(i={}),i.mode=Tt.ALL,i.from=e,i.to=t,i.callback=r,cu.intersectWorld(this,i)}raycastAny(e,t,i,r){return i===void 0&&(i={}),i.mode=Tt.ANY,i.from=e,i.to=t,i.result=r,cu.intersectWorld(this,i)}raycastClosest(e,t,i,r){return i===void 0&&(i={}),i.mode=Tt.CLOSEST,i.from=e,i.to=t,i.result=r,cu.intersectWorld(this,i)}addBody(e){this.bodies.includes(e)||(e.index=this.bodies.length,this.bodies.push(e),e.world=this,e.initPosition.copy(e.position),e.initVelocity.copy(e.velocity),e.timeLastSleepy=this.time,e instanceof _e&&(e.initAngularVelocity.copy(e.angularVelocity),e.initQuaternion.copy(e.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=e,this.idToBodyMap[e.id]=e,this.dispatchEvent(this.addBodyEvent))}removeBody(e){e.world=null;const t=this.bodies.length-1,i=this.bodies,r=i.indexOf(e);if(r!==-1){i.splice(r,1);for(let s=0;s!==i.length;s++)i[s].index=s;this.collisionMatrix.setNumObjects(t),this.removeBodyEvent.body=e,delete this.idToBodyMap[e.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(e){return this.idToBodyMap[e]}getShapeById(e){const t=this.bodies;for(let i=0;i<t.length;i++){const r=t[i].shapes;for(let s=0;s<r.length;s++){const o=r[s];if(o.id===e)return o}}return null}addContactMaterial(e){this.contactmaterials.push(e),this.contactMaterialTable.set(e.materials[0].id,e.materials[1].id,e)}removeContactMaterial(e){const t=this.contactmaterials.indexOf(e);t!==-1&&(this.contactmaterials.splice(t,1),this.contactMaterialTable.delete(e.materials[0].id,e.materials[1].id))}fixedStep(e,t){e===void 0&&(e=1/60),t===void 0&&(t=10);const i=Rt.now()/1e3;if(!this.lastCallTime)this.step(e,void 0,t);else{const r=i-this.lastCallTime;this.step(e,r,t)}this.lastCallTime=i}step(e,t,i){if(i===void 0&&(i=10),t===void 0)this.internalStep(e),this.time+=e;else{this.accumulator+=t;const r=Rt.now();let s=0;for(;this.accumulator>=e&&s<i&&(this.internalStep(e),this.accumulator-=e,s++,!(Rt.now()-r>e*1e3)););this.accumulator=this.accumulator%e;const o=this.accumulator/e;for(let a=0;a!==this.bodies.length;a++){const l=this.bodies[a];l.previousPosition.lerp(l.position,o,l.interpolatedPosition),l.previousQuaternion.slerp(l.quaternion,o,l.interpolatedQuaternion),l.previousQuaternion.normalize()}this.time+=t}}internalStep(e){this.dt=e;const t=this.contacts,i=gA,r=vA,s=this.bodies.length,o=this.bodies,a=this.solver,l=this.gravity,c=this.doProfiling,u=this.profile,f=_e.DYNAMIC;let h=-1/0;const p=this.constraints,v=mA;l.length();const _=l.x,m=l.y,d=l.z;let g=0;for(c&&(h=Rt.now()),g=0;g!==s;g++){const z=o[g];if(z.type===f){const P=z.force,I=z.mass;P.x+=I*_,P.y+=I*m,P.z+=I*d}}for(let z=0,P=this.subsystems.length;z!==P;z++)this.subsystems[z].update();c&&(h=Rt.now()),i.length=0,r.length=0,this.broadphase.collisionPairs(this,i,r),c&&(u.broadphase=Rt.now()-h);let x=p.length;for(g=0;g!==x;g++){const z=p[g];if(!z.collideConnected)for(let P=i.length-1;P>=0;P-=1)(z.bodyA===i[P]&&z.bodyB===r[P]||z.bodyB===i[P]&&z.bodyA===r[P])&&(i.splice(P,1),r.splice(P,1))}this.collisionMatrixTick(),c&&(h=Rt.now());const y=pA,C=t.length;for(g=0;g!==C;g++)y.push(t[g]);t.length=0;const w=this.frictionEquations.length;for(g=0;g!==w;g++)v.push(this.frictionEquations[g]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(i,r,this,t,y,this.frictionEquations,v),c&&(u.narrowphase=Rt.now()-h),c&&(h=Rt.now()),g=0;g<this.frictionEquations.length;g++)a.addEquation(this.frictionEquations[g]);const M=t.length;for(let z=0;z!==M;z++){const P=t[z],I=P.bi,N=P.bj,Z=P.si,D=P.sj;let O;if(I.material&&N.material?O=this.getContactMaterial(I.material,N.material)||this.defaultContactMaterial:O=this.defaultContactMaterial,O.friction,I.material&&N.material&&(I.material.friction>=0&&N.material.friction>=0&&I.material.friction*N.material.friction,I.material.restitution>=0&&N.material.restitution>=0&&(P.restitution=I.material.restitution*N.material.restitution)),a.addEquation(P),I.allowSleep&&I.type===_e.DYNAMIC&&I.sleepState===_e.SLEEPING&&N.sleepState===_e.AWAKE&&N.type!==_e.STATIC){const V=N.velocity.lengthSquared()+N.angularVelocity.lengthSquared(),Q=N.sleepSpeedLimit**2;V>=Q*2&&(I.wakeUpAfterNarrowphase=!0)}if(N.allowSleep&&N.type===_e.DYNAMIC&&N.sleepState===_e.SLEEPING&&I.sleepState===_e.AWAKE&&I.type!==_e.STATIC){const V=I.velocity.lengthSquared()+I.angularVelocity.lengthSquared(),Q=I.sleepSpeedLimit**2;V>=Q*2&&(N.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(I,N,!0),this.collisionMatrixPrevious.get(I,N)||(po.body=N,po.contact=P,I.dispatchEvent(po),po.body=I,N.dispatchEvent(po)),this.bodyOverlapKeeper.set(I.id,N.id),this.shapeOverlapKeeper.set(Z.id,D.id)}for(this.emitContactEvents(),c&&(u.makeContactConstraints=Rt.now()-h,h=Rt.now()),g=0;g!==s;g++){const z=o[g];z.wakeUpAfterNarrowphase&&(z.wakeUp(),z.wakeUpAfterNarrowphase=!1)}for(x=p.length,g=0;g!==x;g++){const z=p[g];z.update();for(let P=0,I=z.equations.length;P!==I;P++){const N=z.equations[P];a.addEquation(N)}}a.solve(e,this),c&&(u.solve=Rt.now()-h),a.removeAllEquations();const F=Math.pow;for(g=0;g!==s;g++){const z=o[g];if(z.type&f){const P=F(1-z.linearDamping,e),I=z.velocity;I.scale(P,I);const N=z.angularVelocity;if(N){const Z=F(1-z.angularDamping,e);N.scale(Z,N)}}}this.dispatchEvent(fA),c&&(h=Rt.now());const T=this.stepnumber%(this.quatNormalizeSkip+1)===0,k=this.quatNormalizeFast;for(g=0;g!==s;g++)o[g].integrate(e,T,k);this.clearForces(),this.broadphase.dirty=!0,c&&(u.integrate=Rt.now()-h),this.stepnumber+=1,this.dispatchEvent(dA);let G=!0;if(this.allowSleep)for(G=!1,g=0;g!==s;g++){const z=o[g];z.sleepTick(this.time),z.sleepState!==_e.SLEEPING&&(G=!0)}this.hasActiveBodies=G}emitContactEvents(){const e=this.hasAnyEventListener("beginContact"),t=this.hasAnyEventListener("endContact");if((e||t)&&this.bodyOverlapKeeper.getDiff(Mi,wi),e){for(let s=0,o=Mi.length;s<o;s+=2)mo.bodyA=this.getBodyById(Mi[s]),mo.bodyB=this.getBodyById(Mi[s+1]),this.dispatchEvent(mo);mo.bodyA=mo.bodyB=null}if(t){for(let s=0,o=wi.length;s<o;s+=2)go.bodyA=this.getBodyById(wi[s]),go.bodyB=this.getBodyById(wi[s+1]),this.dispatchEvent(go);go.bodyA=go.bodyB=null}Mi.length=wi.length=0;const i=this.hasAnyEventListener("beginShapeContact"),r=this.hasAnyEventListener("endShapeContact");if((i||r)&&this.shapeOverlapKeeper.getDiff(Mi,wi),i){for(let s=0,o=Mi.length;s<o;s+=2){const a=this.getShapeById(Mi[s]),l=this.getShapeById(Mi[s+1]);Ti.shapeA=a,Ti.shapeB=l,a&&(Ti.bodyA=a.body),l&&(Ti.bodyB=l.body),this.dispatchEvent(Ti)}Ti.bodyA=Ti.bodyB=Ti.shapeA=Ti.shapeB=null}if(r){for(let s=0,o=wi.length;s<o;s+=2){const a=this.getShapeById(wi[s]),l=this.getShapeById(wi[s+1]);Ai.shapeA=a,Ai.shapeB=l,a&&(Ai.bodyA=a.body),l&&(Ai.bodyB=l.body),this.dispatchEvent(Ai)}Ai.bodyA=Ai.bodyB=Ai.shapeA=Ai.shapeB=null}}clearForces(){const e=this.bodies,t=e.length;for(let i=0;i!==t;i++){const r=e[i];r.force,r.torque,r.force.set(0,0,0),r.torque.set(0,0,0)}}}new Tn;const cu=new Tt,Rt=globalThis.performance||{};if(!Rt.now){let n=Date.now();Rt.timing&&Rt.timing.navigationStart&&(n=Rt.timing.navigationStart),Rt.now=()=>Date.now()-n}new S;const dA={type:"postStep"},fA={type:"preStep"},po={type:_e.COLLIDE_EVENT_NAME,body:null,contact:null},pA=[],mA=[],gA=[],vA=[],Mi=[],wi=[],mo={type:"beginContact",bodyA:null,bodyB:null},go={type:"endContact",bodyA:null,bodyB:null},Ti={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},Ai={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};class _A{constructor(){this.world=null,this.timeActive=0}attach(e){this.timeActive=0,this.startTime=performance.now(),this.world=new hA,this.boxes=e,this.world.gravity.set(Math.random()*2-1,-10,Math.random()*2-1);const t=new ha,i=new _e({mass:0,material:t}),r=new qw;i.addShape(r),i.quaternion.setFromAxisAngle(new S(1,0,0),-Math.PI/2),this.world.addBody(i);for(const[s,o]of this.boxes){const a=new ac(new S(o.mesh.scale.x/2,o.mesh.scale.y/2,o.mesh.scale.z/2));o._body=new _e({mass:10,position:new S(o.mesh.position.x,o.mesh.position.y,o.mesh.position.z)}),o._body.addShape(a),this.world.addBody(o._body)}}animate(){var e,t,i;if((e=this.world)==null||e.step(1/60),this.startTime!==void 0){this.timeActive=performance.now()-this.startTime;for(const[r,s]of this.boxes)(t=s.mesh)==null||t.position.copy(s._body.position),(i=s.mesh)==null||i.quaternion.copy(s._body.quaternion)}}}const Yg={},xA=(n,e)=>{Yg[n]=e},yA=n=>Yg[n],Nn={set:xA,get:yA},kp={type:"change"},uu={type:"start"},Bp={type:"end"},ja=new Sg,Hp=new qi,SA=Math.cos(70*Nx.DEG2RAD);class EA extends $r{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new H,this.cursor=new H,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ts.ROTATE,MIDDLE:ts.DOLLY,RIGHT:ts.PAN},this.touches={ONE:ns.ROTATE,TWO:ns.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(L){L.addEventListener("keydown",Re),this._domElementKeyEvents=L},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Re),this._domElementKeyEvents=null},this.saveState=function(){i.target0.copy(i.target),i.position0.copy(i.object.position),i.zoom0=i.object.zoom},this.reset=function(){i.target.copy(i.target0),i.object.position.copy(i.position0),i.object.zoom=i.zoom0,i.object.updateProjectionMatrix(),i.dispatchEvent(kp),i.update(),s=r.NONE},this.update=function(){const L=new H,oe=new Gr().setFromUnitVectors(e.up,new H(0,1,0)),we=oe.clone().invert(),ve=new H,ne=new Gr,U=new H,ae=2*Math.PI;return function(Le=null){const be=i.object.position;L.copy(be).sub(i.target),L.applyQuaternion(oe),a.setFromVector3(L),i.autoRotate&&s===r.NONE&&G(T(Le)),i.enableDamping?(a.theta+=l.theta*i.dampingFactor,a.phi+=l.phi*i.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let Ke=i.minAzimuthAngle,Ze=i.maxAzimuthAngle;isFinite(Ke)&&isFinite(Ze)&&(Ke<-Math.PI?Ke+=ae:Ke>Math.PI&&(Ke-=ae),Ze<-Math.PI?Ze+=ae:Ze>Math.PI&&(Ze-=ae),Ke<=Ze?a.theta=Math.max(Ke,Math.min(Ze,a.theta)):a.theta=a.theta>(Ke+Ze)/2?Math.max(Ke,a.theta):Math.min(Ze,a.theta)),a.phi=Math.max(i.minPolarAngle,Math.min(i.maxPolarAngle,a.phi)),a.makeSafe(),i.enableDamping===!0?i.target.addScaledVector(u,i.dampingFactor):i.target.add(u),i.target.sub(i.cursor),i.target.clampLength(i.minTargetRadius,i.maxTargetRadius),i.target.add(i.cursor),i.zoomToCursor&&w||i.object.isOrthographicCamera?a.radius=V(a.radius):a.radius=V(a.radius*c),L.setFromSpherical(a),L.applyQuaternion(we),be.copy(i.target).add(L),i.object.lookAt(i.target),i.enableDamping===!0?(l.theta*=1-i.dampingFactor,l.phi*=1-i.dampingFactor,u.multiplyScalar(1-i.dampingFactor)):(l.set(0,0,0),u.set(0,0,0));let vt=!1;if(i.zoomToCursor&&w){let yt=null;if(i.object.isPerspectiveCamera){const et=L.length();yt=V(et*c);const Mt=et-yt;i.object.position.addScaledVector(y,Mt),i.object.updateMatrixWorld()}else if(i.object.isOrthographicCamera){const et=new H(C.x,C.y,0);et.unproject(i.object),i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),vt=!0;const Mt=new H(C.x,C.y,0);Mt.unproject(i.object),i.object.position.sub(Mt).add(et),i.object.updateMatrixWorld(),yt=L.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),i.zoomToCursor=!1;yt!==null&&(this.screenSpacePanning?i.target.set(0,0,-1).transformDirection(i.object.matrix).multiplyScalar(yt).add(i.object.position):(ja.origin.copy(i.object.position),ja.direction.set(0,0,-1).transformDirection(i.object.matrix),Math.abs(i.object.up.dot(ja.direction))<SA?e.lookAt(i.target):(Hp.setFromNormalAndCoplanarPoint(i.object.up,i.target),ja.intersectPlane(Hp,i.target))))}else i.object.isOrthographicCamera&&(i.object.zoom=Math.max(i.minZoom,Math.min(i.maxZoom,i.object.zoom/c)),i.object.updateProjectionMatrix(),vt=!0);return c=1,w=!1,vt||ve.distanceToSquared(i.object.position)>o||8*(1-ne.dot(i.object.quaternion))>o||U.distanceToSquared(i.target)>0?(i.dispatchEvent(kp),ve.copy(i.object.position),ne.copy(i.object.quaternion),U.copy(i.target),!0):!1}}(),this.dispose=function(){i.domElement.removeEventListener("contextmenu",tt),i.domElement.removeEventListener("pointerdown",R),i.domElement.removeEventListener("pointercancel",X),i.domElement.removeEventListener("wheel",se),i.domElement.removeEventListener("pointermove",A),i.domElement.removeEventListener("pointerup",X),i._domElementKeyEvents!==null&&(i._domElementKeyEvents.removeEventListener("keydown",Re),i._domElementKeyEvents=null)};const i=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=r.NONE;const o=1e-6,a=new xp,l=new xp;let c=1;const u=new H,f=new Ge,h=new Ge,p=new Ge,v=new Ge,_=new Ge,m=new Ge,d=new Ge,g=new Ge,x=new Ge,y=new H,C=new Ge;let w=!1;const M=[],F={};let E=!1;function T(L){return L!==null?2*Math.PI/60*i.autoRotateSpeed*L:2*Math.PI/60/60*i.autoRotateSpeed}function k(L){const oe=Math.abs(L*.01);return Math.pow(.95,i.zoomSpeed*oe)}function G(L){l.theta-=L}function z(L){l.phi-=L}const P=function(){const L=new H;return function(we,ve){L.setFromMatrixColumn(ve,0),L.multiplyScalar(-we),u.add(L)}}(),I=function(){const L=new H;return function(we,ve){i.screenSpacePanning===!0?L.setFromMatrixColumn(ve,1):(L.setFromMatrixColumn(ve,0),L.crossVectors(i.object.up,L)),L.multiplyScalar(we),u.add(L)}}(),N=function(){const L=new H;return function(we,ve){const ne=i.domElement;if(i.object.isPerspectiveCamera){const U=i.object.position;L.copy(U).sub(i.target);let ae=L.length();ae*=Math.tan(i.object.fov/2*Math.PI/180),P(2*we*ae/ne.clientHeight,i.object.matrix),I(2*ve*ae/ne.clientHeight,i.object.matrix)}else i.object.isOrthographicCamera?(P(we*(i.object.right-i.object.left)/i.object.zoom/ne.clientWidth,i.object.matrix),I(ve*(i.object.top-i.object.bottom)/i.object.zoom/ne.clientHeight,i.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),i.enablePan=!1)}}();function Z(L){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c/=L:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function D(L){i.object.isPerspectiveCamera||i.object.isOrthographicCamera?c*=L:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),i.enableZoom=!1)}function O(L,oe){if(!i.zoomToCursor)return;w=!0;const we=i.domElement.getBoundingClientRect(),ve=L-we.left,ne=oe-we.top,U=we.width,ae=we.height;C.x=ve/U*2-1,C.y=-(ne/ae)*2+1,y.set(C.x,C.y,1).unproject(i.object).sub(i.object.position).normalize()}function V(L){return Math.max(i.minDistance,Math.min(i.maxDistance,L))}function Q(L){f.set(L.clientX,L.clientY)}function W(L){O(L.clientX,L.clientX),d.set(L.clientX,L.clientY)}function $(L){v.set(L.clientX,L.clientY)}function J(L){h.set(L.clientX,L.clientY),p.subVectors(h,f).multiplyScalar(i.rotateSpeed);const oe=i.domElement;G(2*Math.PI*p.x/oe.clientHeight),z(2*Math.PI*p.y/oe.clientHeight),f.copy(h),i.update()}function ce(L){g.set(L.clientX,L.clientY),x.subVectors(g,d),x.y>0?Z(k(x.y)):x.y<0&&D(k(x.y)),d.copy(g),i.update()}function pe(L){_.set(L.clientX,L.clientY),m.subVectors(_,v).multiplyScalar(i.panSpeed),N(m.x,m.y),v.copy(_),i.update()}function xe(L){O(L.clientX,L.clientY),L.deltaY<0?D(k(L.deltaY)):L.deltaY>0&&Z(k(L.deltaY)),i.update()}function Fe(L){let oe=!1;switch(L.code){case i.keys.UP:L.ctrlKey||L.metaKey||L.shiftKey?z(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(0,i.keyPanSpeed),oe=!0;break;case i.keys.BOTTOM:L.ctrlKey||L.metaKey||L.shiftKey?z(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(0,-i.keyPanSpeed),oe=!0;break;case i.keys.LEFT:L.ctrlKey||L.metaKey||L.shiftKey?G(2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(i.keyPanSpeed,0),oe=!0;break;case i.keys.RIGHT:L.ctrlKey||L.metaKey||L.shiftKey?G(-2*Math.PI*i.rotateSpeed/i.domElement.clientHeight):N(-i.keyPanSpeed,0),oe=!0;break}oe&&(L.preventDefault(),i.update())}function Oe(L){if(M.length===1)f.set(L.pageX,L.pageY);else{const oe=fe(L),we=.5*(L.pageX+oe.x),ve=.5*(L.pageY+oe.y);f.set(we,ve)}}function Pe(L){if(M.length===1)v.set(L.pageX,L.pageY);else{const oe=fe(L),we=.5*(L.pageX+oe.x),ve=.5*(L.pageY+oe.y);v.set(we,ve)}}function $e(L){const oe=fe(L),we=L.pageX-oe.x,ve=L.pageY-oe.y,ne=Math.sqrt(we*we+ve*ve);d.set(0,ne)}function j(L){i.enableZoom&&$e(L),i.enablePan&&Pe(L)}function Ht(L){i.enableZoom&&$e(L),i.enableRotate&&Oe(L)}function Ce(L){if(M.length==1)h.set(L.pageX,L.pageY);else{const we=fe(L),ve=.5*(L.pageX+we.x),ne=.5*(L.pageY+we.y);h.set(ve,ne)}p.subVectors(h,f).multiplyScalar(i.rotateSpeed);const oe=i.domElement;G(2*Math.PI*p.x/oe.clientHeight),z(2*Math.PI*p.y/oe.clientHeight),f.copy(h)}function De(L){if(M.length===1)_.set(L.pageX,L.pageY);else{const oe=fe(L),we=.5*(L.pageX+oe.x),ve=.5*(L.pageY+oe.y);_.set(we,ve)}m.subVectors(_,v).multiplyScalar(i.panSpeed),N(m.x,m.y),v.copy(_)}function Ee(L){const oe=fe(L),we=L.pageX-oe.x,ve=L.pageY-oe.y,ne=Math.sqrt(we*we+ve*ve);g.set(0,ne),x.set(0,Math.pow(g.y/d.y,i.zoomSpeed)),Z(x.y),d.copy(g);const U=(L.pageX+oe.x)*.5,ae=(L.pageY+oe.y)*.5;O(U,ae)}function at(L){i.enableZoom&&Ee(L),i.enablePan&&De(L)}function Be(L){i.enableZoom&&Ee(L),i.enableRotate&&Ce(L)}function R(L){i.enabled!==!1&&(M.length===0&&(i.domElement.setPointerCapture(L.pointerId),i.domElement.addEventListener("pointermove",A),i.domElement.addEventListener("pointerup",X)),Xe(L),L.pointerType==="touch"?He(L):re(L))}function A(L){i.enabled!==!1&&(L.pointerType==="touch"?ee(L):te(L))}function X(L){Ie(L),M.length===0&&(i.domElement.releasePointerCapture(L.pointerId),i.domElement.removeEventListener("pointermove",A),i.domElement.removeEventListener("pointerup",X)),i.dispatchEvent(Bp),s=r.NONE}function re(L){let oe;switch(L.button){case 0:oe=i.mouseButtons.LEFT;break;case 1:oe=i.mouseButtons.MIDDLE;break;case 2:oe=i.mouseButtons.RIGHT;break;default:oe=-1}switch(oe){case ts.DOLLY:if(i.enableZoom===!1)return;W(L),s=r.DOLLY;break;case ts.ROTATE:if(L.ctrlKey||L.metaKey||L.shiftKey){if(i.enablePan===!1)return;$(L),s=r.PAN}else{if(i.enableRotate===!1)return;Q(L),s=r.ROTATE}break;case ts.PAN:if(L.ctrlKey||L.metaKey||L.shiftKey){if(i.enableRotate===!1)return;Q(L),s=r.ROTATE}else{if(i.enablePan===!1)return;$(L),s=r.PAN}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(uu)}function te(L){switch(s){case r.ROTATE:if(i.enableRotate===!1)return;J(L);break;case r.DOLLY:if(i.enableZoom===!1)return;ce(L);break;case r.PAN:if(i.enablePan===!1)return;pe(L);break}}function se(L){i.enabled===!1||i.enableZoom===!1||s!==r.NONE||(L.preventDefault(),i.dispatchEvent(uu),xe(Me(L)),i.dispatchEvent(Bp))}function Me(L){const oe=L.deltaMode,we={clientX:L.clientX,clientY:L.clientY,deltaY:L.deltaY};switch(oe){case 1:we.deltaY*=16;break;case 2:we.deltaY*=100;break}return L.ctrlKey&&!E&&(we.deltaY*=10),we}function he(L){L.key==="Control"&&(E=!0,document.addEventListener("keyup",ye,{passive:!0,capture:!0}))}function ye(L){L.key==="Control"&&(E=!1,document.removeEventListener("keyup",ye,{passive:!0,capture:!0}))}function Re(L){i.enabled===!1||i.enablePan===!1||Fe(L)}function He(L){switch(Ae(L),M.length){case 1:switch(i.touches.ONE){case ns.ROTATE:if(i.enableRotate===!1)return;Oe(L),s=r.TOUCH_ROTATE;break;case ns.PAN:if(i.enablePan===!1)return;Pe(L),s=r.TOUCH_PAN;break;default:s=r.NONE}break;case 2:switch(i.touches.TWO){case ns.DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;j(L),s=r.TOUCH_DOLLY_PAN;break;case ns.DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Ht(L),s=r.TOUCH_DOLLY_ROTATE;break;default:s=r.NONE}break;default:s=r.NONE}s!==r.NONE&&i.dispatchEvent(uu)}function ee(L){switch(Ae(L),s){case r.TOUCH_ROTATE:if(i.enableRotate===!1)return;Ce(L),i.update();break;case r.TOUCH_PAN:if(i.enablePan===!1)return;De(L),i.update();break;case r.TOUCH_DOLLY_PAN:if(i.enableZoom===!1&&i.enablePan===!1)return;at(L),i.update();break;case r.TOUCH_DOLLY_ROTATE:if(i.enableZoom===!1&&i.enableRotate===!1)return;Be(L),i.update();break;default:s=r.NONE}}function tt(L){i.enabled!==!1&&L.preventDefault()}function Xe(L){M.push(L.pointerId)}function Ie(L){delete F[L.pointerId];for(let oe=0;oe<M.length;oe++)if(M[oe]==L.pointerId){M.splice(oe,1);return}}function Ae(L){let oe=F[L.pointerId];oe===void 0&&(oe=new Ge,F[L.pointerId]=oe),oe.set(L.pageX,L.pageY)}function fe(L){const oe=L.pointerId===M[0]?M[1]:M[0];return F[oe]}i.domElement.addEventListener("contextmenu",tt),i.domElement.addEventListener("pointerdown",R),i.domElement.addEventListener("pointercancel",X),i.domElement.addEventListener("wheel",se,{passive:!1}),document.addEventListener("keydown",he,{passive:!0,capture:!0}),this.update()}}class MA{constructor(e,t){this.floorCenterX=0,this.floorCenterZ=0,this.targetPosition=null,this.cameraInMotion=!1,this.rotate=s=>{this.lastRotationTime=performance.now(),this.cameraInMotion=!0,s==="right"&&(this.activeCamera+=1,this.activeCamera>=this.cameraPositions.length&&(this.activeCamera=0)),s==="left"&&(this.activeCamera-=1,this.activeCamera<0&&(this.activeCamera=this.cameraPositions.length-1)),this.setPosition(this.cameraPositions[this.activeCamera].x,this.stage.width*2,this.cameraPositions[this.activeCamera].z)},this.lastRotationTime=0,this.activeCamera=0,this.stage=e,this.renderer=t,this.floorCenterZ=this.stage.depth/2-.5,this.floorCenterX=this.stage.width/2-.5,this.cameraPositions=[{x:this.floorCenterX+this.stage.width-5,z:this.floorCenterZ+this.stage.depth,pointer:{x:this.stage.width-.5,z:this.stage.depth-.5}},{x:this.floorCenterX+this.stage.width,z:this.floorCenterZ-this.stage.depth+5,pointer:{x:this.stage.width-.5,z:this.stage.depth-.5-6}},{x:this.floorCenterX-this.stage.width+5,z:this.floorCenterZ-this.stage.depth,pointer:{x:this.stage.width-.5-6,z:this.stage.depth-.5-6}},{x:this.floorCenterX-this.stage.width,z:this.floorCenterZ+this.stage.depth-5,pointer:{x:this.stage.width-.5-6,z:this.stage.depth-.5}}];const i=window.innerWidth,r=window.innerHeight;this.camera=new Ln(120,i/r,.1,1e3),this.camera.zoom=5.5,kt.subscribe(["status"],s=>{s.status==="inDemo"?this.camera._targetZoom=5.5:this.camera._targetZoom=3}),this.reset(),this.camera.updateProjectionMatrix(),this.controls=new EA(this.camera,this.renderer.domElement),this.controls.target.set(this.floorCenterX,0,this.floorCenterZ),this.controls.update()}reset(){this.setPosition(this.floorCenterX+this.stage.width-5,this.stage.width*4.5,this.floorCenterZ+this.stage.depth*2.2)}centerOnScene(){if(!this.camera)return;const e=window.innerWidth,t=window.innerHeight;this.camera.setViewOffset(e,t,0,0,e,t)}setPosition(e,t,i){this.targetPosition||(this.camera.position.x=e,this.camera.position.y=t,this.camera.position.z=i),this.targetPosition=new H(e,t,i)}lerp(){this.targetPosition&&(this.camera.position.lerp(this.targetPosition,.035),this.camera.position.distanceTo(this.targetPosition)<.005&&(this.camera.position.set(this.targetPosition.x,this.targetPosition.y,this.targetPosition.z),this.targetPosition=null))}doWobble(){const e=performance.now()/2e3;this.camera.position.x+=Math.sin(e)/20,this.camera.position.y+=Math.cos(e)/30,this.camera.position.z+=Math.cos(e)/30}animate(){this.doWobble(),this.lerp(),this.camera._targetZoom-this.camera.zoom>.01&&(this.camera.zoom+=(this.camera._targetZoom-this.camera.zoom)/10),this.cameraInMotion&&performance.now()-this.lastRotationTime>400&&(this.cameraInMotion=!1),this.camera.lookAt(new H(this.floorCenterX,0,this.floorCenterZ));const e=this.cameraPositions[this.activeCamera],i=new H(e.pointer.x,-.5,e.pointer.z).project(this.camera);return Nn.set("stage_x",(i.x*.5+.5)*window.innerWidth),Nn.set("stage_y",-(i.y*.5-.5)*window.innerHeight),this.camera.updateProjectionMatrix(),this.camera}}const $g="./assets/porous.60671847.jpg",wA=new kg,qu=[wA.load($g,()=>{window.__READY__=!0})];class TA{constructor(e,t){this.positionInitiated=!1,this.targetPosition=null,this.targetScale=null,this.destroying=!1,this.variant=null,this.variantName="",this.onTweakPaneChange=()=>{this.setColor(),this.setPattern(),this.setThickness(),this.setScale()},this.animate=()=>{if(!this.mesh)return;if(this.targetPosition&&(this.mesh.position.lerp(this.targetPosition,.22),this.mesh.position.distanceTo(this.targetPosition)<.001&&(this.mesh.position.set(this.targetPosition.x,this.targetPosition.y,this.targetPosition.z),this.targetPosition=null)),this.targetScale&&(this.mesh.scale.lerp(this.targetScale,.12),this.mesh.scale.distanceTo(this.targetScale)<.001&&(this.mesh.scale.set(this.targetScale.x,this.targetScale.y,this.targetScale.z),this.targetScale=null)),this.destroying&&!this.targetScale&&!this.targetPosition){this.scene.remove(this.mesh),this.mesh=null;return}const i=this.mesh.material;i.uniforms.u_time.value+=.05},this.scene=t,this.mesh=new Zn(new Zr(1,1,1),AA()),this.setVariant(e),this.scene.add(this.mesh),requestAnimationFrame(this.animate)}setColor(){if(!this.variant||!this.mesh)return;const e=this.mesh.material;e.uniforms.u_color_top_bottom.value=new ze().setStyle(this.variant.faceColors.topBottom),e.uniforms.u_color_left_right.value=new ze().setStyle(this.variant.faceColors.leftRight),e.uniforms.u_color_front_back.value=new ze().setStyle(this.variant.faceColors.frontBack)}setPattern(){if(!this.variant||!this.mesh)return;const e=this.mesh.material;e.uniforms.u_pattern_factor.value=this.variant.patternFactor,e.uniforms.u_pattern_scale.value=this.variant.patternScale,e.uniforms.u_random_offset.value=new Ge(Math.random()*this.variant.patternPositionRandomness,Math.random()*this.variant.patternPositionRandomness),this.variant.patternFaceConfig.includes("V")?e.uniforms.u_pattern_face_v.value=1:e.uniforms.u_pattern_face_v.value=0,this.variant.patternFaceConfig.includes("H")?e.uniforms.u_pattern_face_h.value=1:e.uniforms.u_pattern_face_h.value=0,e.uniforms.u_texture.value=qu[Math.min(this.variant.pattern,qu.length-1)]}setThickness(){var t;if(!((t=this.variant)!=null&&t.edge)||!this.mesh)return;const e=this.mesh.material;e.uniforms.u_thickness.value=this.variant.edge.thickness}setVariant(e){if(this.variantName===e){this.setPattern();return}this.variantName=e,this.variant=m_[e],this.setColor(),this.setPattern(),this.setThickness(),this.setScale()}setPosition(e,t,i){return this.mesh&&!this.positionInitiated?(this.mesh.position.x=e,this.mesh.position.y=t,this.mesh.position.z=i,this.positionInitiated=!0):this.targetPosition=new H(e,t,i),this}setScale(){var e,t,i;if(!this.destroying)return this.targetScale=new H(((e=this.variant)==null?void 0:e.scale)||1,((t=this.variant)==null?void 0:t.scale)||1,((i=this.variant)==null?void 0:i.scale)||1),this}destroy(){this.destroying=!0,this.targetScale=new H(0,0,0)}}const AA=()=>new mi({uniforms:{u_texture:{value:qu[0]},u_pattern_factor:{value:2},u_pattern_scale:{value:1},u_pattern_face_h:{value:0},u_pattern_face_v:{value:0},u_random_offset:{value:new Ge(0,0)},u_time:{value:1},u_color_left_right:{value:new ze("rgb(224,222,216)")},u_color_front_back:{value:new ze("rgb(224,222,216)")},u_color_top_bottom:{value:new ze("rgb(224,222,216)")},u_thickness:{value:0}},vertexShader:`
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform sampler2D u_texture;
      uniform float u_thickness;
      uniform float u_time;
      varying vec2 vUv;
      varying vec3 vNormal;
      uniform vec3 u_color_top_bottom;
      uniform vec3 u_color_left_right;
      uniform vec3 u_color_front_back;
      uniform float u_pattern_factor;
      uniform float u_pattern_scale;
      uniform float u_pattern_face_h;
      uniform float u_pattern_face_v;
      uniform vec2 u_random_offset;

      void main() {
        float uvScale = u_pattern_scale;
        vec2 scaledUV = vUv * uvScale + u_random_offset;
        vec4 texColor = texture2D(u_texture, scaledUV);
        float thickness = u_thickness;
        vec3 color;
        vec3 absNor = abs(vNormal);

        float mixFactor = texColor.r; // Assuming the texture is grayscale

        if (vNormal.x > 0.9) color = u_color_left_right;
        else if (vNormal.x < -0.9) color = u_color_left_right;
        else if (vNormal.y > 0.9) color = u_color_top_bottom;
        else if (vNormal.y < -0.9) color = u_color_top_bottom;
        else if (vNormal.z > 0.9) color = u_color_front_back;
        else if (vNormal.z < -0.9) color = u_color_front_back;
        else color = vec3(1.0, 1.0, 1.0); // Shouldn't happen; set to White

				if (u_pattern_face_h == 1.0) {
					if (vNormal.x > 0.9 || vNormal.x < -0.9 || vNormal.z > 0.9 || vNormal.z < -0.9) {
		        color = mix(color + u_pattern_factor, color, mixFactor);
					}
        }

				if (u_pattern_face_v == 1.0) {
					if (vNormal.y > 0.9 || vNormal.y < -0.9 || vNormal.z > 0.9 || vNormal.z < -0.9) {
		        color = mix(color + u_pattern_factor, color, mixFactor);
					}
        }

        if (vUv.y < thickness || vUv.y > 1.0 - thickness || vUv.x < thickness || vUv.x > 1.0 - thickness) {
          gl_FragColor = vec4(0.03, 0.03, 0.03, 1.0);
        } else {
          gl_FragColor = LinearTosRGB(vec4(color, 1.0));
        }
      }
    `,transparent:!0}),CA=new kg,bA=CA.load($g);class RA{constructor(e,t,i,r,s){this.onTweakPaneChange=()=>{for(let o=0;o<this.floor.children.length;o++){const l=this.floor.children[o].material;l.uniforms.u_color.value=new ze(rt.enclosure.color),l.uniforms.u_factor.value=rt.enclosure.noiseFactor}for(let o=0;o<this.wallL.children.length;o++){const l=this.wallL.children[o].material;l.uniforms.u_color.value=new ze(rt.enclosure.color),l.uniforms.u_factor.value=rt.enclosure.noiseFactor}for(let o=0;o<this.wallB.children.length;o++){const l=this.wallB.children[o].material;l.uniforms.u_color.value=new ze(rt.enclosure.color),l.uniforms.u_factor.value=rt.enclosure.noiseFactor}for(let o=0;o<this.wallR.children.length;o++){const l=this.wallR.children[o].material;l.uniforms.u_color.value=new ze(rt.enclosure.color),l.uniforms.u_factor.value=rt.enclosure.noiseFactor}for(let o=0;o<this.wallF.children.length;o++){const l=this.wallF.children[o].material;l.uniforms.u_color.value=new ze(rt.enclosure.color),l.uniforms.u_factor.value=rt.enclosure.noiseFactor}},this.wallsHidden=!1,this.camera=s,this.floor=this.renderPlaneGrid(e,t),this.wallL=this.renderPlaneGrid(e,i),this.wallB=this.renderPlaneGrid(e,i),this.wallR=this.renderPlaneGrid(e,i),this.wallF=this.renderPlaneGrid(e,i),this.floor.position.y-=.5,r==null||r.add(this.floor),this.wallL.rotation.z=Math.PI/2,this.wallL.rotation.x=Math.PI/2,this.wallL.position.y+=e/2,this.wallL.position.x-=.5,r==null||r.add(this.wallL),this.wallB.rotation.x=Math.PI/2,this.wallB.position.y+=e/2,this.wallB.position.z-=.5,r==null||r.add(this.wallB),this.wallR.rotation.z=Math.PI/2,this.wallR.rotation.x=Math.PI/2,this.wallR.position.y+=e/2,this.wallR.position.x+=e-.5,r==null||r.add(this.wallR),this.wallF.rotation.x=Math.PI/2,this.wallF.position.y+=e/2,this.wallF.position.z+=e-.5,r==null||r.add(this.wallF)}hideWalls(){this.wallsHidden=!0}animate(){if(this.wallsHidden){this.wallL.visible=!1,this.wallB.visible=!1,this.wallR.visible=!1,this.wallF.visible=!1;return}switch(this.camera.activeCamera){case 0:this.wallL.visible=!0,this.wallB.visible=!0,this.wallR.visible=!1,this.wallF.visible=!1;break;case 1:this.wallL.visible=!0,this.wallB.visible=!1,this.wallR.visible=!1,this.wallF.visible=!0;break;case 2:this.wallL.visible=!1,this.wallB.visible=!1,this.wallR.visible=!0,this.wallF.visible=!0;break;case 3:this.wallL.visible=!1,this.wallB.visible=!0,this.wallR.visible=!0,this.wallF.visible=!1;break}}renderPlaneGrid(e,t){const i=new Nr;for(let r=0;r<e;r+=1)for(let s=0;s<t;s+=1){const o=this.renderPlane();o.position.x=r,o.position.z=s,i.add(o)}return i}renderPlane(){const t=new sc(1,1),i=new Zn(t,PA());return i.material.uniforms.u_color.value=new ze(rt.enclosure.color),i.material.uniforms.u_factor.value=rt.enclosure.noiseFactor,i.material.side=ui,i.material.depthTest=!1,i.scale.set(.95,.95,.95),i.rotation.x=Math.PI/2,i}}const PA=()=>new mi({uniforms:{u_color:{value:new ze(0)},u_factor:{value:.3},u_texture:{value:bA}},vertexShader:`
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        vUv = uv;
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
		`,fragmentShader:`
      varying vec2 vUv;
			uniform sampler2D u_texture;
			uniform vec3 u_color;
			uniform float u_factor;

			void main() {
				vec3 color;
        vec2 scaledUV = vUv;
        vec4 texColor = texture2D(u_texture, scaledUV);
        float mixFactor = texColor.r;
        color = mix(u_color + u_factor, u_color, mixFactor);
        gl_FragColor = LinearTosRGB(vec4(color, 1.0));
			}			
		`}),LA=new mi({uniforms:{u_time:{value:1},u_colorA:{value:new ze("rgb(250,250,000)")},u_colorB:{value:new ze("rgb(58,58,58)")},u_thickness:{value:.03}},vertexShader:`
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vUv = uv;
      vNormal = normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    varying vec2 vUv;
    varying float y;
    uniform float u_time;
    uniform float u_thickness;
    uniform vec3 u_colorA;
    uniform vec3 u_colorB;

    void main() {
      float thickness = u_thickness;
      if (vUv.y < thickness || vUv.y > 1.0 - thickness || vUv.x < thickness || vUv.x > 1.0 - thickness) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      } else {
        gl_FragColor = LinearTosRGB(vec4(0.1, 0.1, 0.1, 0.0));
      }
    }
  `,transparent:!0});class NA{constructor(e,t){this.onTweakPaneChange=()=>{var i;(i=this.renderer)==null||i.setClearColor(rt.background.color)},this.stage=e,this.boxes=new Map,this.shadowCubes=[],this.shadowGroup=new Nr,this.idsInStage=[],this.floorCenterX=0,this.floorCenterZ=0,this.floor=null,this.camera=null,this.physics=null,this.usePhysics=!1,this.setup(),t(this)}reset(){!this.camera||!this.floor||!this.physics||(this.usePhysics=!1,this.physics.timeActive=0,this.camera.activeCamera=0,this.floor.wallsHidden=!1,this.camera.reset())}setup(){this.renderer=new zg({antialias:!0,powerPreference:"high-performance"});const e=document.getElementById("canvas-root");e==null||e.appendChild(this.renderer.domElement),this.scene=new B1,this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setClearColor(rt.background.color),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.outputColorSpace=zt,this.camera=new MA(this.stage,this.renderer),this.floor=new RA(rt.stage.width,rt.stage.depth,rt.stage.limit,this.scene,this.camera),this.physics=new _A,window.addEventListener("resize",()=>{!this.camera||!this.renderer||(this.camera.camera.aspect=window.innerWidth/window.innerHeight,this.camera.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight))},!1)}handleCube(e,t,i,r){if(!(!(e!=null&&e.id)||!this.scene)){if(this.boxes.has(e.id)){const s=this.boxes.get(e.id);if(s==null||s.setPosition(t,i,r),e.state==="locked"){const o=rt.cubes.locked.length,a=rt.cubes.locked[i%o];s==null||s.setVariant(a)}e.state==="active"&&this.shadowCubes.push({...e,x:t,y:i,z:r});return}this.boxes.set(e.id,new TA(rt.cubes.active,this.scene).setPosition(t,i,r))}}applyStage(){if(!!this.scene){this.idsInStage=[];for(let e=0;e<this.stage.width;e++)for(let t=0;t<this.stage.height;t++)for(let i=0;i<this.stage.depth;i++){const r=this.stage.cubes[e][t][i];r&&(r.id&&this.idsInStage.push(r.id),this.handleCube(r,e,t,i))}for(const[e,t]of this.boxes){if(t===null)return;!t.destroying&&!this.idsInStage.includes(e)&&t.destroy(),t.mesh===null&&this.boxes.delete(e)}}}renderShadows(){var i;if(!this.scene)return;this.scene.remove(this.shadowGroup),this.shadowGroup=new Nr;let e=-1,t=1e3;for(const r of this.shadowCubes){const s=new Zr(1,1,1),o=new Zn(s,LA);r.y<t&&(t=r.y);for(let a=r.y-1;a>=0;a-=1)this.stage.isCubeDefined(r.x,a,r.z)&&((i=this.stage.cubes[r.x][a][r.z])==null?void 0:i.state)==="locked"&&a>e&&(e=a);o.position.x=r.x,o.position.y=r.y,o.position.z=r.z,this.shadowGroup.add(o)}this.shadowGroup.position.y=e-t+1,e-t+1!==0&&e-t+1!==1e3&&this.scene.add(this.shadowGroup),this.shadowCubes=[]}captureSceneWithPhysics(){var e;this.usePhysics||((e=this.physics)==null||e.attach(this.boxes),this.usePhysics=!0)}animate(){var t,i,r;if(!this.camera||!this.renderer||!this.scene||!this.floor)return;this.usePhysics?((t=this.physics)==null||t.animate(),this.floor.wallsHidden=!0):this.stage.dirty&&(this.applyStage(),this.renderShadows(),this.stage.dirty=!1),this.floor.animate();let e=null;for(const[s,o]of this.boxes)o==null||o.animate(),((i=o==null?void 0:o.variant)==null?void 0:i.edge.thickness)&&!e&&(e=o);if(e){const s=(r=e.mesh)==null?void 0:r.getWorldPosition(new H);if(s){s.z+=.45,s.y+=.45;const o=s.project(this.camera.camera);Nn.set("active_box_x",(o.x*.5+.5)*window.innerWidth),Nn.set("active_box_y",-(o.y*.5-.5)*window.innerHeight)}}this.renderer.render(this.scene,this.camera.animate())}}class DA{constructor(){this.fastForward=!1,this.onResetGame=()=>{var e,t;(e=this.engine)==null||e.reset(),(t=this.controls)==null||t.reset(),this.stage.reset(),this.lastBlockStepTime=this.getClock(),this.resetTempo(),this.addBrick()},this.go=()=>{var e,t;(e=this.controls)==null||e.applyActions(),this.onNextStep(()=>{var i,r,s;(i=this.engine)!=null&&i.usePhysics||((r=this.brick)==null||r.fallStep(),(s=this.brick)!=null&&s.locked&&(this.resetTempo(),this.stage.checkForFilledLines(),this.addBrick()))}),(t=this.engine)==null||t.animate(),this.processEndGame(),requestAnimationFrame(this.go)},this.stage=new rg(rt.stage.height,rt.stage.width,rt.stage.depth),new NA(this.stage,e=>{this.engine=e,this.controls=new v_(this.onResetGame,e,()=>{this.fastForward=!0}),this.lastBlockStepTime=this.getClock(),this.addBrick(),this.go(),kt.subscribe(["status"],t=>{t.status==="playing"&&this.onResetGame()})})}getClock(){const e=this.fastForward?.1:1;return Math.round(performance.now()/(this.stage.cycleTime*e))}onNextStep(e){var i,r;const t=this.getClock();t>this.lastBlockStepTime&&(this.lastBlockStepTime=t,(r=(i=this.engine)==null?void 0:i.camera)!=null&&r.cameraInMotion||e())}resetTempo(){this.fastForward&&(this.fastForward=!1,this.lastBlockStepTime=this.getClock())}addBrick(){var e;this.brick=new ig(this.stage),(e=this.controls)==null||e.setBrick(this.brick)}processEndGame(){var s,o,a,l;const e=this.stage.lastLockedY>=rt.stage.limit,t=kt.state.status==="playing",i=kt.state.status==="inDemo",r=(((o=(s=this.engine)==null?void 0:s.physics)==null?void 0:o.timeActive)||0)>3e3;!((a=this.engine)!=null&&a.usePhysics)&&e&&((l=this.engine)==null||l.captureSceneWithPhysics(),t&&kt.changeStatus("gameOver")),i&&e&&r&&this.onResetGame()}}new DA;var de={exports:{}},cc={},bt={exports:{}},Qe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var da=Symbol.for("react.element"),IA=Symbol.for("react.portal"),UA=Symbol.for("react.fragment"),FA=Symbol.for("react.strict_mode"),OA=Symbol.for("react.profiler"),zA=Symbol.for("react.provider"),kA=Symbol.for("react.context"),BA=Symbol.for("react.forward_ref"),HA=Symbol.for("react.suspense"),VA=Symbol.for("react.memo"),GA=Symbol.for("react.lazy"),Vp=Symbol.iterator;function WA(n){return n===null||typeof n!="object"?null:(n=Vp&&n[Vp]||n["@@iterator"],typeof n=="function"?n:null)}var Kg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Zg=Object.assign,Qg={};function ro(n,e,t){this.props=n,this.context=e,this.refs=Qg,this.updater=t||Kg}ro.prototype.isReactComponent={};ro.prototype.setState=function(n,e){if(typeof n!="object"&&typeof n!="function"&&n!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,n,e,"setState")};ro.prototype.forceUpdate=function(n){this.updater.enqueueForceUpdate(this,n,"forceUpdate")};function Jg(){}Jg.prototype=ro.prototype;function Kh(n,e,t){this.props=n,this.context=e,this.refs=Qg,this.updater=t||Kg}var Zh=Kh.prototype=new Jg;Zh.constructor=Kh;Zg(Zh,ro.prototype);Zh.isPureReactComponent=!0;var Gp=Array.isArray,ev=Object.prototype.hasOwnProperty,Qh={current:null},tv={key:!0,ref:!0,__self:!0,__source:!0};function nv(n,e,t){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)ev.call(e,i)&&!tv.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=t;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(n&&n.defaultProps)for(i in a=n.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:da,type:n,key:s,ref:o,props:r,_owner:Qh.current}}function XA(n,e){return{$$typeof:da,type:n.type,key:e,ref:n.ref,props:n.props,_owner:n._owner}}function Jh(n){return typeof n=="object"&&n!==null&&n.$$typeof===da}function jA(n){var e={"=":"=0",":":"=2"};return"$"+n.replace(/[=:]/g,function(t){return e[t]})}var Wp=/\/+/g;function hu(n,e){return typeof n=="object"&&n!==null&&n.key!=null?jA(""+n.key):e.toString(36)}function dl(n,e,t,i,r){var s=typeof n;(s==="undefined"||s==="boolean")&&(n=null);var o=!1;if(n===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(n.$$typeof){case da:case IA:o=!0}}if(o)return o=n,r=r(o),n=i===""?"."+hu(o,0):i,Gp(r)?(t="",n!=null&&(t=n.replace(Wp,"$&/")+"/"),dl(r,e,t,"",function(c){return c})):r!=null&&(Jh(r)&&(r=XA(r,t+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Wp,"$&/")+"/")+n)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Gp(n))for(var a=0;a<n.length;a++){s=n[a];var l=i+hu(s,a);o+=dl(s,e,t,l,r)}else if(l=WA(n),typeof l=="function")for(n=l.call(n),a=0;!(s=n.next()).done;)s=s.value,l=i+hu(s,a++),o+=dl(s,e,t,l,r);else if(s==="object")throw e=String(n),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function qa(n,e,t){if(n==null)return n;var i=[],r=0;return dl(n,i,"","",function(s){return e.call(t,s,r++)}),i}function qA(n){if(n._status===-1){var e=n._result;e=e(),e.then(function(t){(n._status===0||n._status===-1)&&(n._status=1,n._result=t)},function(t){(n._status===0||n._status===-1)&&(n._status=2,n._result=t)}),n._status===-1&&(n._status=0,n._result=e)}if(n._status===1)return n._result.default;throw n._result}var an={current:null},fl={transition:null},YA={ReactCurrentDispatcher:an,ReactCurrentBatchConfig:fl,ReactCurrentOwner:Qh};Qe.Children={map:qa,forEach:function(n,e,t){qa(n,function(){e.apply(this,arguments)},t)},count:function(n){var e=0;return qa(n,function(){e++}),e},toArray:function(n){return qa(n,function(e){return e})||[]},only:function(n){if(!Jh(n))throw Error("React.Children.only expected to receive a single React element child.");return n}};Qe.Component=ro;Qe.Fragment=UA;Qe.Profiler=OA;Qe.PureComponent=Kh;Qe.StrictMode=FA;Qe.Suspense=HA;Qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=YA;Qe.cloneElement=function(n,e,t){if(n==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+n+".");var i=Zg({},n.props),r=n.key,s=n.ref,o=n._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Qh.current),e.key!==void 0&&(r=""+e.key),n.type&&n.type.defaultProps)var a=n.type.defaultProps;for(l in e)ev.call(e,l)&&!tv.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=t;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:da,type:n.type,key:r,ref:s,props:i,_owner:o}};Qe.createContext=function(n){return n={$$typeof:kA,_currentValue:n,_currentValue2:n,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},n.Provider={$$typeof:zA,_context:n},n.Consumer=n};Qe.createElement=nv;Qe.createFactory=function(n){var e=nv.bind(null,n);return e.type=n,e};Qe.createRef=function(){return{current:null}};Qe.forwardRef=function(n){return{$$typeof:BA,render:n}};Qe.isValidElement=Jh;Qe.lazy=function(n){return{$$typeof:GA,_payload:{_status:-1,_result:n},_init:qA}};Qe.memo=function(n,e){return{$$typeof:VA,type:n,compare:e===void 0?null:e}};Qe.startTransition=function(n){var e=fl.transition;fl.transition={};try{n()}finally{fl.transition=e}};Qe.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")};Qe.useCallback=function(n,e){return an.current.useCallback(n,e)};Qe.useContext=function(n){return an.current.useContext(n)};Qe.useDebugValue=function(){};Qe.useDeferredValue=function(n){return an.current.useDeferredValue(n)};Qe.useEffect=function(n,e){return an.current.useEffect(n,e)};Qe.useId=function(){return an.current.useId()};Qe.useImperativeHandle=function(n,e,t){return an.current.useImperativeHandle(n,e,t)};Qe.useInsertionEffect=function(n,e){return an.current.useInsertionEffect(n,e)};Qe.useLayoutEffect=function(n,e){return an.current.useLayoutEffect(n,e)};Qe.useMemo=function(n,e){return an.current.useMemo(n,e)};Qe.useReducer=function(n,e,t){return an.current.useReducer(n,e,t)};Qe.useRef=function(n){return an.current.useRef(n)};Qe.useState=function(n){return an.current.useState(n)};Qe.useSyncExternalStore=function(n,e,t){return an.current.useSyncExternalStore(n,e,t)};Qe.useTransition=function(){return an.current.useTransition()};Qe.version="18.2.0";(function(n){n.exports=Qe})(bt);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $A=bt.exports,KA=Symbol.for("react.element"),ZA=Symbol.for("react.fragment"),QA=Object.prototype.hasOwnProperty,JA=$A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,eC={key:!0,ref:!0,__self:!0,__source:!0};function iv(n,e,t){var i,r={},s=null,o=null;t!==void 0&&(s=""+t),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)QA.call(e,i)&&!eC.hasOwnProperty(i)&&(r[i]=e[i]);if(n&&n.defaultProps)for(i in e=n.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:KA,type:n,key:s,ref:o,props:r,_owner:JA.current}}cc.Fragment=ZA;cc.jsx=iv;cc.jsxs=iv;(function(n){n.exports=cc})(de);var rv={exports:{}},An={},sv={exports:{}},ov={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(n){function e(D,O){var V=D.length;D.push(O);e:for(;0<V;){var Q=V-1>>>1,W=D[Q];if(0<r(W,O))D[Q]=O,D[V]=W,V=Q;else break e}}function t(D){return D.length===0?null:D[0]}function i(D){if(D.length===0)return null;var O=D[0],V=D.pop();if(V!==O){D[0]=V;e:for(var Q=0,W=D.length,$=W>>>1;Q<$;){var J=2*(Q+1)-1,ce=D[J],pe=J+1,xe=D[pe];if(0>r(ce,V))pe<W&&0>r(xe,ce)?(D[Q]=xe,D[pe]=V,Q=pe):(D[Q]=ce,D[J]=V,Q=J);else if(pe<W&&0>r(xe,V))D[Q]=xe,D[pe]=V,Q=pe;else break e}}return O}function r(D,O){var V=D.sortIndex-O.sortIndex;return V!==0?V:D.id-O.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;n.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();n.unstable_now=function(){return o.now()-a}}var l=[],c=[],u=1,f=null,h=3,p=!1,v=!1,_=!1,m=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,g=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function x(D){for(var O=t(c);O!==null;){if(O.callback===null)i(c);else if(O.startTime<=D)i(c),O.sortIndex=O.expirationTime,e(l,O);else break;O=t(c)}}function y(D){if(_=!1,x(D),!v)if(t(l)!==null)v=!0,N(C);else{var O=t(c);O!==null&&Z(y,O.startTime-D)}}function C(D,O){v=!1,_&&(_=!1,d(F),F=-1),p=!0;var V=h;try{for(x(O),f=t(l);f!==null&&(!(f.expirationTime>O)||D&&!k());){var Q=f.callback;if(typeof Q=="function"){f.callback=null,h=f.priorityLevel;var W=Q(f.expirationTime<=O);O=n.unstable_now(),typeof W=="function"?f.callback=W:f===t(l)&&i(l),x(O)}else i(l);f=t(l)}if(f!==null)var $=!0;else{var J=t(c);J!==null&&Z(y,J.startTime-O),$=!1}return $}finally{f=null,h=V,p=!1}}var w=!1,M=null,F=-1,E=5,T=-1;function k(){return!(n.unstable_now()-T<E)}function G(){if(M!==null){var D=n.unstable_now();T=D;var O=!0;try{O=M(!0,D)}finally{O?z():(w=!1,M=null)}}else w=!1}var z;if(typeof g=="function")z=function(){g(G)};else if(typeof MessageChannel<"u"){var P=new MessageChannel,I=P.port2;P.port1.onmessage=G,z=function(){I.postMessage(null)}}else z=function(){m(G,0)};function N(D){M=D,w||(w=!0,z())}function Z(D,O){F=m(function(){D(n.unstable_now())},O)}n.unstable_IdlePriority=5,n.unstable_ImmediatePriority=1,n.unstable_LowPriority=4,n.unstable_NormalPriority=3,n.unstable_Profiling=null,n.unstable_UserBlockingPriority=2,n.unstable_cancelCallback=function(D){D.callback=null},n.unstable_continueExecution=function(){v||p||(v=!0,N(C))},n.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):E=0<D?Math.floor(1e3/D):5},n.unstable_getCurrentPriorityLevel=function(){return h},n.unstable_getFirstCallbackNode=function(){return t(l)},n.unstable_next=function(D){switch(h){case 1:case 2:case 3:var O=3;break;default:O=h}var V=h;h=O;try{return D()}finally{h=V}},n.unstable_pauseExecution=function(){},n.unstable_requestPaint=function(){},n.unstable_runWithPriority=function(D,O){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var V=h;h=D;try{return O()}finally{h=V}},n.unstable_scheduleCallback=function(D,O,V){var Q=n.unstable_now();switch(typeof V=="object"&&V!==null?(V=V.delay,V=typeof V=="number"&&0<V?Q+V:Q):V=Q,D){case 1:var W=-1;break;case 2:W=250;break;case 5:W=1073741823;break;case 4:W=1e4;break;default:W=5e3}return W=V+W,D={id:u++,callback:O,priorityLevel:D,startTime:V,expirationTime:W,sortIndex:-1},V>Q?(D.sortIndex=V,e(c,D),t(l)===null&&D===t(c)&&(_?(d(F),F=-1):_=!0,Z(y,V-Q))):(D.sortIndex=W,e(l,D),v||p||(v=!0,N(C))),D},n.unstable_shouldYield=k,n.unstable_wrapCallback=function(D){var O=h;return function(){var V=h;h=O;try{return D.apply(this,arguments)}finally{h=V}}}})(ov);(function(n){n.exports=ov})(sv);/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var av=bt.exports,wn=sv.exports;function ie(n){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+n,t=1;t<arguments.length;t++)e+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+n+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var lv=new Set,jo={};function Qr(n,e){$s(n,e),$s(n+"Capture",e)}function $s(n,e){for(jo[n]=e,n=0;n<e.length;n++)lv.add(e[n])}var Ui=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Yu=Object.prototype.hasOwnProperty,tC=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Xp={},jp={};function nC(n){return Yu.call(jp,n)?!0:Yu.call(Xp,n)?!1:tC.test(n)?jp[n]=!0:(Xp[n]=!0,!1)}function iC(n,e,t,i){if(t!==null&&t.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:t!==null?!t.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function rC(n,e,t,i){if(e===null||typeof e>"u"||iC(n,e,t,i))return!0;if(i)return!1;if(t!==null)switch(t.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function ln(n,e,t,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=t,this.propertyName=n,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var jt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){jt[n]=new ln(n,0,!1,n,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var e=n[0];jt[e]=new ln(e,1,!1,n[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(n){jt[n]=new ln(n,2,!1,n.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){jt[n]=new ln(n,2,!1,n,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){jt[n]=new ln(n,3,!1,n.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(n){jt[n]=new ln(n,3,!0,n,null,!1,!1)});["capture","download"].forEach(function(n){jt[n]=new ln(n,4,!1,n,null,!1,!1)});["cols","rows","size","span"].forEach(function(n){jt[n]=new ln(n,6,!1,n,null,!1,!1)});["rowSpan","start"].forEach(function(n){jt[n]=new ln(n,5,!1,n.toLowerCase(),null,!1,!1)});var ed=/[\-:]([a-z])/g;function td(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var e=n.replace(ed,td);jt[e]=new ln(e,1,!1,n,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var e=n.replace(ed,td);jt[e]=new ln(e,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(n){var e=n.replace(ed,td);jt[e]=new ln(e,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(n){jt[n]=new ln(n,1,!1,n.toLowerCase(),null,!1,!1)});jt.xlinkHref=new ln("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(n){jt[n]=new ln(n,1,!1,n.toLowerCase(),null,!0,!0)});function nd(n,e,t,i){var r=jt.hasOwnProperty(e)?jt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(rC(e,t,r,i)&&(t=null),i||r===null?nC(e)&&(t===null?n.removeAttribute(e):n.setAttribute(e,""+t)):r.mustUseProperty?n[r.propertyName]=t===null?r.type===3?!1:"":t:(e=r.attributeName,i=r.attributeNamespace,t===null?n.removeAttribute(e):(r=r.type,t=r===3||r===4&&t===!0?"":""+t,i?n.setAttributeNS(i,e,t):n.setAttribute(e,t))))}var ki=av.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ya=Symbol.for("react.element"),Ts=Symbol.for("react.portal"),As=Symbol.for("react.fragment"),id=Symbol.for("react.strict_mode"),$u=Symbol.for("react.profiler"),cv=Symbol.for("react.provider"),uv=Symbol.for("react.context"),rd=Symbol.for("react.forward_ref"),Ku=Symbol.for("react.suspense"),Zu=Symbol.for("react.suspense_list"),sd=Symbol.for("react.memo"),Yi=Symbol.for("react.lazy"),hv=Symbol.for("react.offscreen"),qp=Symbol.iterator;function vo(n){return n===null||typeof n!="object"?null:(n=qp&&n[qp]||n["@@iterator"],typeof n=="function"?n:null)}var gt=Object.assign,du;function To(n){if(du===void 0)try{throw Error()}catch(t){var e=t.stack.trim().match(/\n( *(at )?)/);du=e&&e[1]||""}return`
`+du+n}var fu=!1;function pu(n,e){if(!n||fu)return"";fu=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(n,[],e)}else{try{e.call()}catch(c){i=c}n.call(e.prototype)}else{try{throw Error()}catch(c){i=c}n()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return n.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",n.displayName)),l}while(1<=o&&0<=a);break}}}finally{fu=!1,Error.prepareStackTrace=t}return(n=n?n.displayName||n.name:"")?To(n):""}function sC(n){switch(n.tag){case 5:return To(n.type);case 16:return To("Lazy");case 13:return To("Suspense");case 19:return To("SuspenseList");case 0:case 2:case 15:return n=pu(n.type,!1),n;case 11:return n=pu(n.type.render,!1),n;case 1:return n=pu(n.type,!0),n;default:return""}}function Qu(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case As:return"Fragment";case Ts:return"Portal";case $u:return"Profiler";case id:return"StrictMode";case Ku:return"Suspense";case Zu:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case uv:return(n.displayName||"Context")+".Consumer";case cv:return(n._context.displayName||"Context")+".Provider";case rd:var e=n.render;return n=n.displayName,n||(n=e.displayName||e.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case sd:return e=n.displayName||null,e!==null?e:Qu(n.type)||"Memo";case Yi:e=n._payload,n=n._init;try{return Qu(n(e))}catch{}}return null}function oC(n){var e=n.type;switch(n.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=e.render,n=n.displayName||n.name||"",e.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Qu(e);case 8:return e===id?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function pr(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function dv(n){var e=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function aC(n){var e=dv(n)?"checked":"value",t=Object.getOwnPropertyDescriptor(n.constructor.prototype,e),i=""+n[e];if(!n.hasOwnProperty(e)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var r=t.get,s=t.set;return Object.defineProperty(n,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(n,e,{enumerable:t.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){n._valueTracker=null,delete n[e]}}}}function $a(n){n._valueTracker||(n._valueTracker=aC(n))}function fv(n){if(!n)return!1;var e=n._valueTracker;if(!e)return!0;var t=e.getValue(),i="";return n&&(i=dv(n)?n.checked?"true":"false":n.value),n=i,n!==t?(e.setValue(n),!0):!1}function Ll(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function Ju(n,e){var t=e.checked;return gt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t!=null?t:n._wrapperState.initialChecked})}function Yp(n,e){var t=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;t=pr(e.value!=null?e.value:t),n._wrapperState={initialChecked:i,initialValue:t,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function pv(n,e){e=e.checked,e!=null&&nd(n,"checked",e,!1)}function eh(n,e){pv(n,e);var t=pr(e.value),i=e.type;if(t!=null)i==="number"?(t===0&&n.value===""||n.value!=t)&&(n.value=""+t):n.value!==""+t&&(n.value=""+t);else if(i==="submit"||i==="reset"){n.removeAttribute("value");return}e.hasOwnProperty("value")?th(n,e.type,t):e.hasOwnProperty("defaultValue")&&th(n,e.type,pr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(n.defaultChecked=!!e.defaultChecked)}function $p(n,e,t){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+n._wrapperState.initialValue,t||e===n.value||(n.value=e),n.defaultValue=e}t=n.name,t!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,t!==""&&(n.name=t)}function th(n,e,t){(e!=="number"||Ll(n.ownerDocument)!==n)&&(t==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+t&&(n.defaultValue=""+t))}var Ao=Array.isArray;function ks(n,e,t,i){if(n=n.options,e){e={};for(var r=0;r<t.length;r++)e["$"+t[r]]=!0;for(t=0;t<n.length;t++)r=e.hasOwnProperty("$"+n[t].value),n[t].selected!==r&&(n[t].selected=r),r&&i&&(n[t].defaultSelected=!0)}else{for(t=""+pr(t),e=null,r=0;r<n.length;r++){if(n[r].value===t){n[r].selected=!0,i&&(n[r].defaultSelected=!0);return}e!==null||n[r].disabled||(e=n[r])}e!==null&&(e.selected=!0)}}function nh(n,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ie(91));return gt({},e,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function Kp(n,e){var t=e.value;if(t==null){if(t=e.children,e=e.defaultValue,t!=null){if(e!=null)throw Error(ie(92));if(Ao(t)){if(1<t.length)throw Error(ie(93));t=t[0]}e=t}e==null&&(e=""),t=e}n._wrapperState={initialValue:pr(t)}}function mv(n,e){var t=pr(e.value),i=pr(e.defaultValue);t!=null&&(t=""+t,t!==n.value&&(n.value=t),e.defaultValue==null&&n.defaultValue!==t&&(n.defaultValue=t)),i!=null&&(n.defaultValue=""+i)}function Zp(n){var e=n.textContent;e===n._wrapperState.initialValue&&e!==""&&e!==null&&(n.value=e)}function gv(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ih(n,e){return n==null||n==="http://www.w3.org/1999/xhtml"?gv(e):n==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Ka,vv=function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,t,i,r){MSApp.execUnsafeLocalFunction(function(){return n(e,t,i,r)})}:n}(function(n,e){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=e;else{for(Ka=Ka||document.createElement("div"),Ka.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ka.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;e.firstChild;)n.appendChild(e.firstChild)}});function qo(n,e){if(e){var t=n.firstChild;if(t&&t===n.lastChild&&t.nodeType===3){t.nodeValue=e;return}}n.textContent=e}var Do={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},lC=["Webkit","ms","Moz","O"];Object.keys(Do).forEach(function(n){lC.forEach(function(e){e=e+n.charAt(0).toUpperCase()+n.substring(1),Do[e]=Do[n]})});function _v(n,e,t){return e==null||typeof e=="boolean"||e===""?"":t||typeof e!="number"||e===0||Do.hasOwnProperty(n)&&Do[n]?(""+e).trim():e+"px"}function xv(n,e){n=n.style;for(var t in e)if(e.hasOwnProperty(t)){var i=t.indexOf("--")===0,r=_v(t,e[t],i);t==="float"&&(t="cssFloat"),i?n.setProperty(t,r):n[t]=r}}var cC=gt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function rh(n,e){if(e){if(cC[n]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ie(137,n));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ie(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ie(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ie(62))}}function sh(n,e){if(n.indexOf("-")===-1)return typeof e.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var oh=null;function od(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var ah=null,Bs=null,Hs=null;function Qp(n){if(n=ma(n)){if(typeof ah!="function")throw Error(ie(280));var e=n.stateNode;e&&(e=pc(e),ah(n.stateNode,n.type,e))}}function yv(n){Bs?Hs?Hs.push(n):Hs=[n]:Bs=n}function Sv(){if(Bs){var n=Bs,e=Hs;if(Hs=Bs=null,Qp(n),e)for(n=0;n<e.length;n++)Qp(e[n])}}function Ev(n,e){return n(e)}function Mv(){}var mu=!1;function wv(n,e,t){if(mu)return n(e,t);mu=!0;try{return Ev(n,e,t)}finally{mu=!1,(Bs!==null||Hs!==null)&&(Mv(),Sv())}}function Yo(n,e){var t=n.stateNode;if(t===null)return null;var i=pc(t);if(i===null)return null;t=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(n=n.type,i=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!i;break e;default:n=!1}if(n)return null;if(t&&typeof t!="function")throw Error(ie(231,e,typeof t));return t}var lh=!1;if(Ui)try{var _o={};Object.defineProperty(_o,"passive",{get:function(){lh=!0}}),window.addEventListener("test",_o,_o),window.removeEventListener("test",_o,_o)}catch{lh=!1}function uC(n,e,t,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(t,c)}catch(u){this.onError(u)}}var Io=!1,Nl=null,Dl=!1,ch=null,hC={onError:function(n){Io=!0,Nl=n}};function dC(n,e,t,i,r,s,o,a,l){Io=!1,Nl=null,uC.apply(hC,arguments)}function fC(n,e,t,i,r,s,o,a,l){if(dC.apply(this,arguments),Io){if(Io){var c=Nl;Io=!1,Nl=null}else throw Error(ie(198));Dl||(Dl=!0,ch=c)}}function Jr(n){var e=n,t=n;if(n.alternate)for(;e.return;)e=e.return;else{n=e;do e=n,(e.flags&4098)!==0&&(t=e.return),n=e.return;while(n)}return e.tag===3?t:null}function Tv(n){if(n.tag===13){var e=n.memoizedState;if(e===null&&(n=n.alternate,n!==null&&(e=n.memoizedState)),e!==null)return e.dehydrated}return null}function Jp(n){if(Jr(n)!==n)throw Error(ie(188))}function pC(n){var e=n.alternate;if(!e){if(e=Jr(n),e===null)throw Error(ie(188));return e!==n?null:n}for(var t=n,i=e;;){var r=t.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){t=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===t)return Jp(r),n;if(s===i)return Jp(r),e;s=s.sibling}throw Error(ie(188))}if(t.return!==i.return)t=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===t){o=!0,t=r,i=s;break}if(a===i){o=!0,i=r,t=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===t){o=!0,t=s,i=r;break}if(a===i){o=!0,i=s,t=r;break}a=a.sibling}if(!o)throw Error(ie(189))}}if(t.alternate!==i)throw Error(ie(190))}if(t.tag!==3)throw Error(ie(188));return t.stateNode.current===t?n:e}function Av(n){return n=pC(n),n!==null?Cv(n):null}function Cv(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var e=Cv(n);if(e!==null)return e;n=n.sibling}return null}var bv=wn.unstable_scheduleCallback,em=wn.unstable_cancelCallback,mC=wn.unstable_shouldYield,gC=wn.unstable_requestPaint,Et=wn.unstable_now,vC=wn.unstable_getCurrentPriorityLevel,ad=wn.unstable_ImmediatePriority,Rv=wn.unstable_UserBlockingPriority,Il=wn.unstable_NormalPriority,_C=wn.unstable_LowPriority,Pv=wn.unstable_IdlePriority,uc=null,fi=null;function xC(n){if(fi&&typeof fi.onCommitFiberRoot=="function")try{fi.onCommitFiberRoot(uc,n,void 0,(n.current.flags&128)===128)}catch{}}var Jn=Math.clz32?Math.clz32:EC,yC=Math.log,SC=Math.LN2;function EC(n){return n>>>=0,n===0?32:31-(yC(n)/SC|0)|0}var Za=64,Qa=4194304;function Co(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function Ul(n,e){var t=n.pendingLanes;if(t===0)return 0;var i=0,r=n.suspendedLanes,s=n.pingedLanes,o=t&268435455;if(o!==0){var a=o&~r;a!==0?i=Co(a):(s&=o,s!==0&&(i=Co(s)))}else o=t&~r,o!==0?i=Co(o):s!==0&&(i=Co(s));if(i===0)return 0;if(e!==0&&e!==i&&(e&r)===0&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if((i&4)!==0&&(i|=t&16),e=n.entangledLanes,e!==0)for(n=n.entanglements,e&=i;0<e;)t=31-Jn(e),r=1<<t,i|=n[t],e&=~r;return i}function MC(n,e){switch(n){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function wC(n,e){for(var t=n.suspendedLanes,i=n.pingedLanes,r=n.expirationTimes,s=n.pendingLanes;0<s;){var o=31-Jn(s),a=1<<o,l=r[o];l===-1?((a&t)===0||(a&i)!==0)&&(r[o]=MC(a,e)):l<=e&&(n.expiredLanes|=a),s&=~a}}function uh(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function Lv(){var n=Za;return Za<<=1,(Za&4194240)===0&&(Za=64),n}function gu(n){for(var e=[],t=0;31>t;t++)e.push(n);return e}function fa(n,e,t){n.pendingLanes|=e,e!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,e=31-Jn(e),n[e]=t}function TC(n,e){var t=n.pendingLanes&~e;n.pendingLanes=e,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=e,n.mutableReadLanes&=e,n.entangledLanes&=e,e=n.entanglements;var i=n.eventTimes;for(n=n.expirationTimes;0<t;){var r=31-Jn(t),s=1<<r;e[r]=0,i[r]=-1,n[r]=-1,t&=~s}}function ld(n,e){var t=n.entangledLanes|=e;for(n=n.entanglements;t;){var i=31-Jn(t),r=1<<i;r&e|n[i]&e&&(n[i]|=e),t&=~r}}var it=0;function Nv(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var Dv,cd,Iv,Uv,Fv,hh=!1,Ja=[],sr=null,or=null,ar=null,$o=new Map,Ko=new Map,Ki=[],AC="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function tm(n,e){switch(n){case"focusin":case"focusout":sr=null;break;case"dragenter":case"dragleave":or=null;break;case"mouseover":case"mouseout":ar=null;break;case"pointerover":case"pointerout":$o.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ko.delete(e.pointerId)}}function xo(n,e,t,i,r,s){return n===null||n.nativeEvent!==s?(n={blockedOn:e,domEventName:t,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=ma(e),e!==null&&cd(e)),n):(n.eventSystemFlags|=i,e=n.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),n)}function CC(n,e,t,i,r){switch(e){case"focusin":return sr=xo(sr,n,e,t,i,r),!0;case"dragenter":return or=xo(or,n,e,t,i,r),!0;case"mouseover":return ar=xo(ar,n,e,t,i,r),!0;case"pointerover":var s=r.pointerId;return $o.set(s,xo($o.get(s)||null,n,e,t,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Ko.set(s,xo(Ko.get(s)||null,n,e,t,i,r)),!0}return!1}function Ov(n){var e=Dr(n.target);if(e!==null){var t=Jr(e);if(t!==null){if(e=t.tag,e===13){if(e=Tv(t),e!==null){n.blockedOn=e,Fv(n.priority,function(){Iv(t)});return}}else if(e===3&&t.stateNode.current.memoizedState.isDehydrated){n.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}n.blockedOn=null}function pl(n){if(n.blockedOn!==null)return!1;for(var e=n.targetContainers;0<e.length;){var t=dh(n.domEventName,n.eventSystemFlags,e[0],n.nativeEvent);if(t===null){t=n.nativeEvent;var i=new t.constructor(t.type,t);oh=i,t.target.dispatchEvent(i),oh=null}else return e=ma(t),e!==null&&cd(e),n.blockedOn=t,!1;e.shift()}return!0}function nm(n,e,t){pl(n)&&t.delete(e)}function bC(){hh=!1,sr!==null&&pl(sr)&&(sr=null),or!==null&&pl(or)&&(or=null),ar!==null&&pl(ar)&&(ar=null),$o.forEach(nm),Ko.forEach(nm)}function yo(n,e){n.blockedOn===e&&(n.blockedOn=null,hh||(hh=!0,wn.unstable_scheduleCallback(wn.unstable_NormalPriority,bC)))}function Zo(n){function e(r){return yo(r,n)}if(0<Ja.length){yo(Ja[0],n);for(var t=1;t<Ja.length;t++){var i=Ja[t];i.blockedOn===n&&(i.blockedOn=null)}}for(sr!==null&&yo(sr,n),or!==null&&yo(or,n),ar!==null&&yo(ar,n),$o.forEach(e),Ko.forEach(e),t=0;t<Ki.length;t++)i=Ki[t],i.blockedOn===n&&(i.blockedOn=null);for(;0<Ki.length&&(t=Ki[0],t.blockedOn===null);)Ov(t),t.blockedOn===null&&Ki.shift()}var Vs=ki.ReactCurrentBatchConfig,Fl=!0;function RC(n,e,t,i){var r=it,s=Vs.transition;Vs.transition=null;try{it=1,ud(n,e,t,i)}finally{it=r,Vs.transition=s}}function PC(n,e,t,i){var r=it,s=Vs.transition;Vs.transition=null;try{it=4,ud(n,e,t,i)}finally{it=r,Vs.transition=s}}function ud(n,e,t,i){if(Fl){var r=dh(n,e,t,i);if(r===null)Au(n,e,i,Ol,t),tm(n,i);else if(CC(r,n,e,t,i))i.stopPropagation();else if(tm(n,i),e&4&&-1<AC.indexOf(n)){for(;r!==null;){var s=ma(r);if(s!==null&&Dv(s),s=dh(n,e,t,i),s===null&&Au(n,e,i,Ol,t),s===r)break;r=s}r!==null&&i.stopPropagation()}else Au(n,e,i,null,t)}}var Ol=null;function dh(n,e,t,i){if(Ol=null,n=od(i),n=Dr(n),n!==null)if(e=Jr(n),e===null)n=null;else if(t=e.tag,t===13){if(n=Tv(e),n!==null)return n;n=null}else if(t===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;n=null}else e!==n&&(n=null);return Ol=n,null}function zv(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(vC()){case ad:return 1;case Rv:return 4;case Il:case _C:return 16;case Pv:return 536870912;default:return 16}default:return 16}}var er=null,hd=null,ml=null;function kv(){if(ml)return ml;var n,e=hd,t=e.length,i,r="value"in er?er.value:er.textContent,s=r.length;for(n=0;n<t&&e[n]===r[n];n++);var o=t-n;for(i=1;i<=o&&e[t-i]===r[s-i];i++);return ml=r.slice(n,1<i?1-i:void 0)}function gl(n){var e=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&e===13&&(n=13)):n=e,n===10&&(n=13),32<=n||n===13?n:0}function el(){return!0}function im(){return!1}function Cn(n){function e(t,i,r,s,o){this._reactName=t,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in n)n.hasOwnProperty(a)&&(t=n[a],this[a]=t?t(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?el:im,this.isPropagationStopped=im,this}return gt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=el)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=el)},persist:function(){},isPersistent:el}),e}var so={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},dd=Cn(so),pa=gt({},so,{view:0,detail:0}),LC=Cn(pa),vu,_u,So,hc=gt({},pa,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:fd,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==So&&(So&&n.type==="mousemove"?(vu=n.screenX-So.screenX,_u=n.screenY-So.screenY):_u=vu=0,So=n),vu)},movementY:function(n){return"movementY"in n?n.movementY:_u}}),rm=Cn(hc),NC=gt({},hc,{dataTransfer:0}),DC=Cn(NC),IC=gt({},pa,{relatedTarget:0}),xu=Cn(IC),UC=gt({},so,{animationName:0,elapsedTime:0,pseudoElement:0}),FC=Cn(UC),OC=gt({},so,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),zC=Cn(OC),kC=gt({},so,{data:0}),sm=Cn(kC),BC={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},HC={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},VC={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function GC(n){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(n):(n=VC[n])?!!e[n]:!1}function fd(){return GC}var WC=gt({},pa,{key:function(n){if(n.key){var e=BC[n.key]||n.key;if(e!=="Unidentified")return e}return n.type==="keypress"?(n=gl(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?HC[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:fd,charCode:function(n){return n.type==="keypress"?gl(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?gl(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),XC=Cn(WC),jC=gt({},hc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),om=Cn(jC),qC=gt({},pa,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:fd}),YC=Cn(qC),$C=gt({},so,{propertyName:0,elapsedTime:0,pseudoElement:0}),KC=Cn($C),ZC=gt({},hc,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),QC=Cn(ZC),JC=[9,13,27,32],pd=Ui&&"CompositionEvent"in window,Uo=null;Ui&&"documentMode"in document&&(Uo=document.documentMode);var eb=Ui&&"TextEvent"in window&&!Uo,Bv=Ui&&(!pd||Uo&&8<Uo&&11>=Uo),am=String.fromCharCode(32),lm=!1;function Hv(n,e){switch(n){case"keyup":return JC.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Vv(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var Cs=!1;function tb(n,e){switch(n){case"compositionend":return Vv(e);case"keypress":return e.which!==32?null:(lm=!0,am);case"textInput":return n=e.data,n===am&&lm?null:n;default:return null}}function nb(n,e){if(Cs)return n==="compositionend"||!pd&&Hv(n,e)?(n=kv(),ml=hd=er=null,Cs=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Bv&&e.locale!=="ko"?null:e.data;default:return null}}var ib={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function cm(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e==="input"?!!ib[n.type]:e==="textarea"}function Gv(n,e,t,i){yv(i),e=zl(e,"onChange"),0<e.length&&(t=new dd("onChange","change",null,t,i),n.push({event:t,listeners:e}))}var Fo=null,Qo=null;function rb(n){e0(n,0)}function dc(n){var e=Ps(n);if(fv(e))return n}function sb(n,e){if(n==="change")return e}var Wv=!1;if(Ui){var yu;if(Ui){var Su="oninput"in document;if(!Su){var um=document.createElement("div");um.setAttribute("oninput","return;"),Su=typeof um.oninput=="function"}yu=Su}else yu=!1;Wv=yu&&(!document.documentMode||9<document.documentMode)}function hm(){Fo&&(Fo.detachEvent("onpropertychange",Xv),Qo=Fo=null)}function Xv(n){if(n.propertyName==="value"&&dc(Qo)){var e=[];Gv(e,Qo,n,od(n)),wv(rb,e)}}function ob(n,e,t){n==="focusin"?(hm(),Fo=e,Qo=t,Fo.attachEvent("onpropertychange",Xv)):n==="focusout"&&hm()}function ab(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return dc(Qo)}function lb(n,e){if(n==="click")return dc(e)}function cb(n,e){if(n==="input"||n==="change")return dc(e)}function ub(n,e){return n===e&&(n!==0||1/n===1/e)||n!==n&&e!==e}var ti=typeof Object.is=="function"?Object.is:ub;function Jo(n,e){if(ti(n,e))return!0;if(typeof n!="object"||n===null||typeof e!="object"||e===null)return!1;var t=Object.keys(n),i=Object.keys(e);if(t.length!==i.length)return!1;for(i=0;i<t.length;i++){var r=t[i];if(!Yu.call(e,r)||!ti(n[r],e[r]))return!1}return!0}function dm(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function fm(n,e){var t=dm(n);n=0;for(var i;t;){if(t.nodeType===3){if(i=n+t.textContent.length,n<=e&&i>=e)return{node:t,offset:e-n};n=i}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=dm(t)}}function jv(n,e){return n&&e?n===e?!0:n&&n.nodeType===3?!1:e&&e.nodeType===3?jv(n,e.parentNode):"contains"in n?n.contains(e):n.compareDocumentPosition?!!(n.compareDocumentPosition(e)&16):!1:!1}function qv(){for(var n=window,e=Ll();e instanceof n.HTMLIFrameElement;){try{var t=typeof e.contentWindow.location.href=="string"}catch{t=!1}if(t)n=e.contentWindow;else break;e=Ll(n.document)}return e}function md(n){var e=n&&n.nodeName&&n.nodeName.toLowerCase();return e&&(e==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||e==="textarea"||n.contentEditable==="true")}function hb(n){var e=qv(),t=n.focusedElem,i=n.selectionRange;if(e!==t&&t&&t.ownerDocument&&jv(t.ownerDocument.documentElement,t)){if(i!==null&&md(t)){if(e=i.start,n=i.end,n===void 0&&(n=e),"selectionStart"in t)t.selectionStart=e,t.selectionEnd=Math.min(n,t.value.length);else if(n=(e=t.ownerDocument||document)&&e.defaultView||window,n.getSelection){n=n.getSelection();var r=t.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!n.extend&&s>i&&(r=i,i=s,s=r),r=fm(t,s);var o=fm(t,i);r&&o&&(n.rangeCount!==1||n.anchorNode!==r.node||n.anchorOffset!==r.offset||n.focusNode!==o.node||n.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),n.removeAllRanges(),s>i?(n.addRange(e),n.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),n.addRange(e)))}}for(e=[],n=t;n=n.parentNode;)n.nodeType===1&&e.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<e.length;t++)n=e[t],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var db=Ui&&"documentMode"in document&&11>=document.documentMode,bs=null,fh=null,Oo=null,ph=!1;function pm(n,e,t){var i=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;ph||bs==null||bs!==Ll(i)||(i=bs,"selectionStart"in i&&md(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Oo&&Jo(Oo,i)||(Oo=i,i=zl(fh,"onSelect"),0<i.length&&(e=new dd("onSelect","select",null,e,t),n.push({event:e,listeners:i}),e.target=bs)))}function tl(n,e){var t={};return t[n.toLowerCase()]=e.toLowerCase(),t["Webkit"+n]="webkit"+e,t["Moz"+n]="moz"+e,t}var Rs={animationend:tl("Animation","AnimationEnd"),animationiteration:tl("Animation","AnimationIteration"),animationstart:tl("Animation","AnimationStart"),transitionend:tl("Transition","TransitionEnd")},Eu={},Yv={};Ui&&(Yv=document.createElement("div").style,"AnimationEvent"in window||(delete Rs.animationend.animation,delete Rs.animationiteration.animation,delete Rs.animationstart.animation),"TransitionEvent"in window||delete Rs.transitionend.transition);function fc(n){if(Eu[n])return Eu[n];if(!Rs[n])return n;var e=Rs[n],t;for(t in e)if(e.hasOwnProperty(t)&&t in Yv)return Eu[n]=e[t];return n}var $v=fc("animationend"),Kv=fc("animationiteration"),Zv=fc("animationstart"),Qv=fc("transitionend"),Jv=new Map,mm="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function gr(n,e){Jv.set(n,e),Qr(e,[n])}for(var Mu=0;Mu<mm.length;Mu++){var wu=mm[Mu],fb=wu.toLowerCase(),pb=wu[0].toUpperCase()+wu.slice(1);gr(fb,"on"+pb)}gr($v,"onAnimationEnd");gr(Kv,"onAnimationIteration");gr(Zv,"onAnimationStart");gr("dblclick","onDoubleClick");gr("focusin","onFocus");gr("focusout","onBlur");gr(Qv,"onTransitionEnd");$s("onMouseEnter",["mouseout","mouseover"]);$s("onMouseLeave",["mouseout","mouseover"]);$s("onPointerEnter",["pointerout","pointerover"]);$s("onPointerLeave",["pointerout","pointerover"]);Qr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Qr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Qr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Qr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Qr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Qr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var bo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mb=new Set("cancel close invalid load scroll toggle".split(" ").concat(bo));function gm(n,e,t){var i=n.type||"unknown-event";n.currentTarget=t,fC(i,e,void 0,n),n.currentTarget=null}function e0(n,e){e=(e&4)!==0;for(var t=0;t<n.length;t++){var i=n[t],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;gm(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;gm(r,a,c),s=l}}}if(Dl)throw n=ch,Dl=!1,ch=null,n}function ct(n,e){var t=e[xh];t===void 0&&(t=e[xh]=new Set);var i=n+"__bubble";t.has(i)||(t0(e,n,2,!1),t.add(i))}function Tu(n,e,t){var i=0;e&&(i|=4),t0(t,n,i,e)}var nl="_reactListening"+Math.random().toString(36).slice(2);function ea(n){if(!n[nl]){n[nl]=!0,lv.forEach(function(t){t!=="selectionchange"&&(mb.has(t)||Tu(t,!1,n),Tu(t,!0,n))});var e=n.nodeType===9?n:n.ownerDocument;e===null||e[nl]||(e[nl]=!0,Tu("selectionchange",!1,e))}}function t0(n,e,t,i){switch(zv(e)){case 1:var r=RC;break;case 4:r=PC;break;default:r=ud}t=r.bind(null,e,t,n),r=void 0,!lh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?n.addEventListener(e,t,{capture:!0,passive:r}):n.addEventListener(e,t,!0):r!==void 0?n.addEventListener(e,t,{passive:r}):n.addEventListener(e,t,!1)}function Au(n,e,t,i,r){var s=i;if((e&1)===0&&(e&2)===0&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=Dr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}wv(function(){var c=s,u=od(t),f=[];e:{var h=Jv.get(n);if(h!==void 0){var p=dd,v=n;switch(n){case"keypress":if(gl(t)===0)break e;case"keydown":case"keyup":p=XC;break;case"focusin":v="focus",p=xu;break;case"focusout":v="blur",p=xu;break;case"beforeblur":case"afterblur":p=xu;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=rm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=DC;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=YC;break;case $v:case Kv:case Zv:p=FC;break;case Qv:p=KC;break;case"scroll":p=LC;break;case"wheel":p=QC;break;case"copy":case"cut":case"paste":p=zC;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=om}var _=(e&4)!==0,m=!_&&n==="scroll",d=_?h!==null?h+"Capture":null:h;_=[];for(var g=c,x;g!==null;){x=g;var y=x.stateNode;if(x.tag===5&&y!==null&&(x=y,d!==null&&(y=Yo(g,d),y!=null&&_.push(ta(g,y,x)))),m)break;g=g.return}0<_.length&&(h=new p(h,v,null,t,u),f.push({event:h,listeners:_}))}}if((e&7)===0){e:{if(h=n==="mouseover"||n==="pointerover",p=n==="mouseout"||n==="pointerout",h&&t!==oh&&(v=t.relatedTarget||t.fromElement)&&(Dr(v)||v[Fi]))break e;if((p||h)&&(h=u.window===u?u:(h=u.ownerDocument)?h.defaultView||h.parentWindow:window,p?(v=t.relatedTarget||t.toElement,p=c,v=v?Dr(v):null,v!==null&&(m=Jr(v),v!==m||v.tag!==5&&v.tag!==6)&&(v=null)):(p=null,v=c),p!==v)){if(_=rm,y="onMouseLeave",d="onMouseEnter",g="mouse",(n==="pointerout"||n==="pointerover")&&(_=om,y="onPointerLeave",d="onPointerEnter",g="pointer"),m=p==null?h:Ps(p),x=v==null?h:Ps(v),h=new _(y,g+"leave",p,t,u),h.target=m,h.relatedTarget=x,y=null,Dr(u)===c&&(_=new _(d,g+"enter",v,t,u),_.target=x,_.relatedTarget=m,y=_),m=y,p&&v)t:{for(_=p,d=v,g=0,x=_;x;x=Ss(x))g++;for(x=0,y=d;y;y=Ss(y))x++;for(;0<g-x;)_=Ss(_),g--;for(;0<x-g;)d=Ss(d),x--;for(;g--;){if(_===d||d!==null&&_===d.alternate)break t;_=Ss(_),d=Ss(d)}_=null}else _=null;p!==null&&vm(f,h,p,_,!1),v!==null&&m!==null&&vm(f,m,v,_,!0)}}e:{if(h=c?Ps(c):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var C=sb;else if(cm(h))if(Wv)C=cb;else{C=ab;var w=ob}else(p=h.nodeName)&&p.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(C=lb);if(C&&(C=C(n,c))){Gv(f,C,t,u);break e}w&&w(n,h,c),n==="focusout"&&(w=h._wrapperState)&&w.controlled&&h.type==="number"&&th(h,"number",h.value)}switch(w=c?Ps(c):window,n){case"focusin":(cm(w)||w.contentEditable==="true")&&(bs=w,fh=c,Oo=null);break;case"focusout":Oo=fh=bs=null;break;case"mousedown":ph=!0;break;case"contextmenu":case"mouseup":case"dragend":ph=!1,pm(f,t,u);break;case"selectionchange":if(db)break;case"keydown":case"keyup":pm(f,t,u)}var M;if(pd)e:{switch(n){case"compositionstart":var F="onCompositionStart";break e;case"compositionend":F="onCompositionEnd";break e;case"compositionupdate":F="onCompositionUpdate";break e}F=void 0}else Cs?Hv(n,t)&&(F="onCompositionEnd"):n==="keydown"&&t.keyCode===229&&(F="onCompositionStart");F&&(Bv&&t.locale!=="ko"&&(Cs||F!=="onCompositionStart"?F==="onCompositionEnd"&&Cs&&(M=kv()):(er=u,hd="value"in er?er.value:er.textContent,Cs=!0)),w=zl(c,F),0<w.length&&(F=new sm(F,n,null,t,u),f.push({event:F,listeners:w}),M?F.data=M:(M=Vv(t),M!==null&&(F.data=M)))),(M=eb?tb(n,t):nb(n,t))&&(c=zl(c,"onBeforeInput"),0<c.length&&(u=new sm("onBeforeInput","beforeinput",null,t,u),f.push({event:u,listeners:c}),u.data=M))}e0(f,e)})}function ta(n,e,t){return{instance:n,listener:e,currentTarget:t}}function zl(n,e){for(var t=e+"Capture",i=[];n!==null;){var r=n,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Yo(n,t),s!=null&&i.unshift(ta(n,s,r)),s=Yo(n,e),s!=null&&i.push(ta(n,s,r))),n=n.return}return i}function Ss(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function vm(n,e,t,i,r){for(var s=e._reactName,o=[];t!==null&&t!==i;){var a=t,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=Yo(t,s),l!=null&&o.unshift(ta(t,l,a))):r||(l=Yo(t,s),l!=null&&o.push(ta(t,l,a)))),t=t.return}o.length!==0&&n.push({event:e,listeners:o})}var gb=/\r\n?/g,vb=/\u0000|\uFFFD/g;function _m(n){return(typeof n=="string"?n:""+n).replace(gb,`
`).replace(vb,"")}function il(n,e,t){if(e=_m(e),_m(n)!==e&&t)throw Error(ie(425))}function kl(){}var mh=null,gh=null;function vh(n,e){return n==="textarea"||n==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var _h=typeof setTimeout=="function"?setTimeout:void 0,_b=typeof clearTimeout=="function"?clearTimeout:void 0,xm=typeof Promise=="function"?Promise:void 0,xb=typeof queueMicrotask=="function"?queueMicrotask:typeof xm<"u"?function(n){return xm.resolve(null).then(n).catch(yb)}:_h;function yb(n){setTimeout(function(){throw n})}function Cu(n,e){var t=e,i=0;do{var r=t.nextSibling;if(n.removeChild(t),r&&r.nodeType===8)if(t=r.data,t==="/$"){if(i===0){n.removeChild(r),Zo(e);return}i--}else t!=="$"&&t!=="$?"&&t!=="$!"||i++;t=r}while(t);Zo(e)}function lr(n){for(;n!=null;n=n.nextSibling){var e=n.nodeType;if(e===1||e===3)break;if(e===8){if(e=n.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return n}function ym(n){n=n.previousSibling;for(var e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="$"||t==="$!"||t==="$?"){if(e===0)return n;e--}else t==="/$"&&e++}n=n.previousSibling}return null}var oo=Math.random().toString(36).slice(2),hi="__reactFiber$"+oo,na="__reactProps$"+oo,Fi="__reactContainer$"+oo,xh="__reactEvents$"+oo,Sb="__reactListeners$"+oo,Eb="__reactHandles$"+oo;function Dr(n){var e=n[hi];if(e)return e;for(var t=n.parentNode;t;){if(e=t[Fi]||t[hi]){if(t=e.alternate,e.child!==null||t!==null&&t.child!==null)for(n=ym(n);n!==null;){if(t=n[hi])return t;n=ym(n)}return e}n=t,t=n.parentNode}return null}function ma(n){return n=n[hi]||n[Fi],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function Ps(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(ie(33))}function pc(n){return n[na]||null}var yh=[],Ls=-1;function vr(n){return{current:n}}function ht(n){0>Ls||(n.current=yh[Ls],yh[Ls]=null,Ls--)}function ot(n,e){Ls++,yh[Ls]=n.current,n.current=e}var mr={},en=vr(mr),pn=vr(!1),Wr=mr;function Ks(n,e){var t=n.type.contextTypes;if(!t)return mr;var i=n.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in t)r[s]=e[s];return i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=e,n.__reactInternalMemoizedMaskedChildContext=r),r}function mn(n){return n=n.childContextTypes,n!=null}function Bl(){ht(pn),ht(en)}function Sm(n,e,t){if(en.current!==mr)throw Error(ie(168));ot(en,e),ot(pn,t)}function n0(n,e,t){var i=n.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return t;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ie(108,oC(n)||"Unknown",r));return gt({},t,i)}function Hl(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||mr,Wr=en.current,ot(en,n),ot(pn,pn.current),!0}function Em(n,e,t){var i=n.stateNode;if(!i)throw Error(ie(169));t?(n=n0(n,e,Wr),i.__reactInternalMemoizedMergedChildContext=n,ht(pn),ht(en),ot(en,n)):ht(pn),ot(pn,t)}var Ri=null,mc=!1,bu=!1;function i0(n){Ri===null?Ri=[n]:Ri.push(n)}function Mb(n){mc=!0,i0(n)}function _r(){if(!bu&&Ri!==null){bu=!0;var n=0,e=it;try{var t=Ri;for(it=1;n<t.length;n++){var i=t[n];do i=i(!0);while(i!==null)}Ri=null,mc=!1}catch(r){throw Ri!==null&&(Ri=Ri.slice(n+1)),bv(ad,_r),r}finally{it=e,bu=!1}}return null}var Ns=[],Ds=0,Vl=null,Gl=0,Dn=[],In=0,Xr=null,Li=1,Ni="";function Cr(n,e){Ns[Ds++]=Gl,Ns[Ds++]=Vl,Vl=n,Gl=e}function r0(n,e,t){Dn[In++]=Li,Dn[In++]=Ni,Dn[In++]=Xr,Xr=n;var i=Li;n=Ni;var r=32-Jn(i)-1;i&=~(1<<r),t+=1;var s=32-Jn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Li=1<<32-Jn(e)+r|t<<r|i,Ni=s+n}else Li=1<<s|t<<r|i,Ni=n}function gd(n){n.return!==null&&(Cr(n,1),r0(n,1,0))}function vd(n){for(;n===Vl;)Vl=Ns[--Ds],Ns[Ds]=null,Gl=Ns[--Ds],Ns[Ds]=null;for(;n===Xr;)Xr=Dn[--In],Dn[In]=null,Ni=Dn[--In],Dn[In]=null,Li=Dn[--In],Dn[In]=null}var Mn=null,Sn=null,dt=!1,Yn=null;function s0(n,e){var t=Fn(5,null,null,0);t.elementType="DELETED",t.stateNode=e,t.return=n,e=n.deletions,e===null?(n.deletions=[t],n.flags|=16):e.push(t)}function Mm(n,e){switch(n.tag){case 5:var t=n.type;return e=e.nodeType!==1||t.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(n.stateNode=e,Mn=n,Sn=lr(e.firstChild),!0):!1;case 6:return e=n.pendingProps===""||e.nodeType!==3?null:e,e!==null?(n.stateNode=e,Mn=n,Sn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(t=Xr!==null?{id:Li,overflow:Ni}:null,n.memoizedState={dehydrated:e,treeContext:t,retryLane:1073741824},t=Fn(18,null,null,0),t.stateNode=e,t.return=n,n.child=t,Mn=n,Sn=null,!0):!1;default:return!1}}function Sh(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Eh(n){if(dt){var e=Sn;if(e){var t=e;if(!Mm(n,e)){if(Sh(n))throw Error(ie(418));e=lr(t.nextSibling);var i=Mn;e&&Mm(n,e)?s0(i,t):(n.flags=n.flags&-4097|2,dt=!1,Mn=n)}}else{if(Sh(n))throw Error(ie(418));n.flags=n.flags&-4097|2,dt=!1,Mn=n}}}function wm(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Mn=n}function rl(n){if(n!==Mn)return!1;if(!dt)return wm(n),dt=!0,!1;var e;if((e=n.tag!==3)&&!(e=n.tag!==5)&&(e=n.type,e=e!=="head"&&e!=="body"&&!vh(n.type,n.memoizedProps)),e&&(e=Sn)){if(Sh(n))throw o0(),Error(ie(418));for(;e;)s0(n,e),e=lr(e.nextSibling)}if(wm(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(ie(317));e:{for(n=n.nextSibling,e=0;n;){if(n.nodeType===8){var t=n.data;if(t==="/$"){if(e===0){Sn=lr(n.nextSibling);break e}e--}else t!=="$"&&t!=="$!"&&t!=="$?"||e++}n=n.nextSibling}Sn=null}}else Sn=Mn?lr(n.stateNode.nextSibling):null;return!0}function o0(){for(var n=Sn;n;)n=lr(n.nextSibling)}function Zs(){Sn=Mn=null,dt=!1}function _d(n){Yn===null?Yn=[n]:Yn.push(n)}var wb=ki.ReactCurrentBatchConfig;function Xn(n,e){if(n&&n.defaultProps){e=gt({},e),n=n.defaultProps;for(var t in n)e[t]===void 0&&(e[t]=n[t]);return e}return e}var Wl=vr(null),Xl=null,Is=null,xd=null;function yd(){xd=Is=Xl=null}function Sd(n){var e=Wl.current;ht(Wl),n._currentValue=e}function Mh(n,e,t){for(;n!==null;){var i=n.alternate;if((n.childLanes&e)!==e?(n.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),n===t)break;n=n.return}}function Gs(n,e){Xl=n,xd=Is=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&e)!==0&&(hn=!0),n.firstContext=null)}function zn(n){var e=n._currentValue;if(xd!==n)if(n={context:n,memoizedValue:e,next:null},Is===null){if(Xl===null)throw Error(ie(308));Is=n,Xl.dependencies={lanes:0,firstContext:n}}else Is=Is.next=n;return e}var Ir=null;function Ed(n){Ir===null?Ir=[n]:Ir.push(n)}function a0(n,e,t,i){var r=e.interleaved;return r===null?(t.next=t,Ed(e)):(t.next=r.next,r.next=t),e.interleaved=t,Oi(n,i)}function Oi(n,e){n.lanes|=e;var t=n.alternate;for(t!==null&&(t.lanes|=e),t=n,n=n.return;n!==null;)n.childLanes|=e,t=n.alternate,t!==null&&(t.childLanes|=e),t=n,n=n.return;return t.tag===3?t.stateNode:null}var $i=!1;function Md(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function l0(n,e){n=n.updateQueue,e.updateQueue===n&&(e.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Di(n,e){return{eventTime:n,lane:e,tag:0,payload:null,callback:null,next:null}}function cr(n,e,t){var i=n.updateQueue;if(i===null)return null;if(i=i.shared,(Je&2)!==0){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Oi(n,t)}return r=i.interleaved,r===null?(e.next=e,Ed(i)):(e.next=r.next,r.next=e),i.interleaved=e,Oi(n,t)}function vl(n,e,t){if(e=e.updateQueue,e!==null&&(e=e.shared,(t&4194240)!==0)){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,ld(n,t)}}function Tm(n,e){var t=n.updateQueue,i=n.alternate;if(i!==null&&(i=i.updateQueue,t===i)){var r=null,s=null;if(t=t.firstBaseUpdate,t!==null){do{var o={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};s===null?r=s=o:s=s.next=o,t=t.next}while(t!==null);s===null?r=s=e:s=s.next=e}else r=s=e;t={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},n.updateQueue=t;return}n=t.lastBaseUpdate,n===null?t.firstBaseUpdate=e:n.next=e,t.lastBaseUpdate=e}function jl(n,e,t,i){var r=n.updateQueue;$i=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var u=n.alternate;u!==null&&(u=u.updateQueue,a=u.lastBaseUpdate,a!==o&&(a===null?u.firstBaseUpdate=c:a.next=c,u.lastBaseUpdate=l))}if(s!==null){var f=r.baseState;o=0,u=c=l=null,a=s;do{var h=a.lane,p=a.eventTime;if((i&h)===h){u!==null&&(u=u.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var v=n,_=a;switch(h=e,p=t,_.tag){case 1:if(v=_.payload,typeof v=="function"){f=v.call(p,f,h);break e}f=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=_.payload,h=typeof v=="function"?v.call(p,f,h):v,h==null)break e;f=gt({},f,h);break e;case 2:$i=!0}}a.callback!==null&&a.lane!==0&&(n.flags|=64,h=r.effects,h===null?r.effects=[a]:h.push(a))}else p={eventTime:p,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},u===null?(c=u=p,l=f):u=u.next=p,o|=h;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;h=a,a=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(1);if(u===null&&(l=f),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);qr|=o,n.lanes=o,n.memoizedState=f}}function Am(n,e,t){if(n=e.effects,e.effects=null,n!==null)for(e=0;e<n.length;e++){var i=n[e],r=i.callback;if(r!==null){if(i.callback=null,i=t,typeof r!="function")throw Error(ie(191,r));r.call(i)}}}var c0=new av.Component().refs;function wh(n,e,t,i){e=n.memoizedState,t=t(i,e),t=t==null?e:gt({},e,t),n.memoizedState=t,n.lanes===0&&(n.updateQueue.baseState=t)}var gc={isMounted:function(n){return(n=n._reactInternals)?Jr(n)===n:!1},enqueueSetState:function(n,e,t){n=n._reactInternals;var i=on(),r=hr(n),s=Di(i,r);s.payload=e,t!=null&&(s.callback=t),e=cr(n,s,r),e!==null&&(ei(e,n,r,i),vl(e,n,r))},enqueueReplaceState:function(n,e,t){n=n._reactInternals;var i=on(),r=hr(n),s=Di(i,r);s.tag=1,s.payload=e,t!=null&&(s.callback=t),e=cr(n,s,r),e!==null&&(ei(e,n,r,i),vl(e,n,r))},enqueueForceUpdate:function(n,e){n=n._reactInternals;var t=on(),i=hr(n),r=Di(t,i);r.tag=2,e!=null&&(r.callback=e),e=cr(n,r,i),e!==null&&(ei(e,n,i,t),vl(e,n,i))}};function Cm(n,e,t,i,r,s,o){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!Jo(t,i)||!Jo(r,s):!0}function u0(n,e,t){var i=!1,r=mr,s=e.contextType;return typeof s=="object"&&s!==null?s=zn(s):(r=mn(e)?Wr:en.current,i=e.contextTypes,s=(i=i!=null)?Ks(n,r):mr),e=new e(t,s),n.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=gc,n.stateNode=e,e._reactInternals=n,i&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=r,n.__reactInternalMemoizedMaskedChildContext=s),e}function bm(n,e,t,i){n=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(t,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(t,i),e.state!==n&&gc.enqueueReplaceState(e,e.state,null)}function Th(n,e,t,i){var r=n.stateNode;r.props=t,r.state=n.memoizedState,r.refs=c0,Md(n);var s=e.contextType;typeof s=="object"&&s!==null?r.context=zn(s):(s=mn(e)?Wr:en.current,r.context=Ks(n,s)),r.state=n.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(wh(n,e,s,t),r.state=n.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&gc.enqueueReplaceState(r,r.state,null),jl(n,t,r,i),r.state=n.memoizedState),typeof r.componentDidMount=="function"&&(n.flags|=4194308)}function Eo(n,e,t){if(n=t.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(ie(309));var i=t.stateNode}if(!i)throw Error(ie(147,n));var r=i,s=""+n;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;a===c0&&(a=r.refs={}),o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof n!="string")throw Error(ie(284));if(!t._owner)throw Error(ie(290,n))}return n}function sl(n,e){throw n=Object.prototype.toString.call(e),Error(ie(31,n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n))}function Rm(n){var e=n._init;return e(n._payload)}function h0(n){function e(d,g){if(n){var x=d.deletions;x===null?(d.deletions=[g],d.flags|=16):x.push(g)}}function t(d,g){if(!n)return null;for(;g!==null;)e(d,g),g=g.sibling;return null}function i(d,g){for(d=new Map;g!==null;)g.key!==null?d.set(g.key,g):d.set(g.index,g),g=g.sibling;return d}function r(d,g){return d=dr(d,g),d.index=0,d.sibling=null,d}function s(d,g,x){return d.index=x,n?(x=d.alternate,x!==null?(x=x.index,x<g?(d.flags|=2,g):x):(d.flags|=2,g)):(d.flags|=1048576,g)}function o(d){return n&&d.alternate===null&&(d.flags|=2),d}function a(d,g,x,y){return g===null||g.tag!==6?(g=Uu(x,d.mode,y),g.return=d,g):(g=r(g,x),g.return=d,g)}function l(d,g,x,y){var C=x.type;return C===As?u(d,g,x.props.children,y,x.key):g!==null&&(g.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===Yi&&Rm(C)===g.type)?(y=r(g,x.props),y.ref=Eo(d,g,x),y.return=d,y):(y=Ml(x.type,x.key,x.props,null,d.mode,y),y.ref=Eo(d,g,x),y.return=d,y)}function c(d,g,x,y){return g===null||g.tag!==4||g.stateNode.containerInfo!==x.containerInfo||g.stateNode.implementation!==x.implementation?(g=Fu(x,d.mode,y),g.return=d,g):(g=r(g,x.children||[]),g.return=d,g)}function u(d,g,x,y,C){return g===null||g.tag!==7?(g=Hr(x,d.mode,y,C),g.return=d,g):(g=r(g,x),g.return=d,g)}function f(d,g,x){if(typeof g=="string"&&g!==""||typeof g=="number")return g=Uu(""+g,d.mode,x),g.return=d,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Ya:return x=Ml(g.type,g.key,g.props,null,d.mode,x),x.ref=Eo(d,null,g),x.return=d,x;case Ts:return g=Fu(g,d.mode,x),g.return=d,g;case Yi:var y=g._init;return f(d,y(g._payload),x)}if(Ao(g)||vo(g))return g=Hr(g,d.mode,x,null),g.return=d,g;sl(d,g)}return null}function h(d,g,x,y){var C=g!==null?g.key:null;if(typeof x=="string"&&x!==""||typeof x=="number")return C!==null?null:a(d,g,""+x,y);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ya:return x.key===C?l(d,g,x,y):null;case Ts:return x.key===C?c(d,g,x,y):null;case Yi:return C=x._init,h(d,g,C(x._payload),y)}if(Ao(x)||vo(x))return C!==null?null:u(d,g,x,y,null);sl(d,x)}return null}function p(d,g,x,y,C){if(typeof y=="string"&&y!==""||typeof y=="number")return d=d.get(x)||null,a(g,d,""+y,C);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Ya:return d=d.get(y.key===null?x:y.key)||null,l(g,d,y,C);case Ts:return d=d.get(y.key===null?x:y.key)||null,c(g,d,y,C);case Yi:var w=y._init;return p(d,g,x,w(y._payload),C)}if(Ao(y)||vo(y))return d=d.get(x)||null,u(g,d,y,C,null);sl(g,y)}return null}function v(d,g,x,y){for(var C=null,w=null,M=g,F=g=0,E=null;M!==null&&F<x.length;F++){M.index>F?(E=M,M=null):E=M.sibling;var T=h(d,M,x[F],y);if(T===null){M===null&&(M=E);break}n&&M&&T.alternate===null&&e(d,M),g=s(T,g,F),w===null?C=T:w.sibling=T,w=T,M=E}if(F===x.length)return t(d,M),dt&&Cr(d,F),C;if(M===null){for(;F<x.length;F++)M=f(d,x[F],y),M!==null&&(g=s(M,g,F),w===null?C=M:w.sibling=M,w=M);return dt&&Cr(d,F),C}for(M=i(d,M);F<x.length;F++)E=p(M,d,F,x[F],y),E!==null&&(n&&E.alternate!==null&&M.delete(E.key===null?F:E.key),g=s(E,g,F),w===null?C=E:w.sibling=E,w=E);return n&&M.forEach(function(k){return e(d,k)}),dt&&Cr(d,F),C}function _(d,g,x,y){var C=vo(x);if(typeof C!="function")throw Error(ie(150));if(x=C.call(x),x==null)throw Error(ie(151));for(var w=C=null,M=g,F=g=0,E=null,T=x.next();M!==null&&!T.done;F++,T=x.next()){M.index>F?(E=M,M=null):E=M.sibling;var k=h(d,M,T.value,y);if(k===null){M===null&&(M=E);break}n&&M&&k.alternate===null&&e(d,M),g=s(k,g,F),w===null?C=k:w.sibling=k,w=k,M=E}if(T.done)return t(d,M),dt&&Cr(d,F),C;if(M===null){for(;!T.done;F++,T=x.next())T=f(d,T.value,y),T!==null&&(g=s(T,g,F),w===null?C=T:w.sibling=T,w=T);return dt&&Cr(d,F),C}for(M=i(d,M);!T.done;F++,T=x.next())T=p(M,d,F,T.value,y),T!==null&&(n&&T.alternate!==null&&M.delete(T.key===null?F:T.key),g=s(T,g,F),w===null?C=T:w.sibling=T,w=T);return n&&M.forEach(function(G){return e(d,G)}),dt&&Cr(d,F),C}function m(d,g,x,y){if(typeof x=="object"&&x!==null&&x.type===As&&x.key===null&&(x=x.props.children),typeof x=="object"&&x!==null){switch(x.$$typeof){case Ya:e:{for(var C=x.key,w=g;w!==null;){if(w.key===C){if(C=x.type,C===As){if(w.tag===7){t(d,w.sibling),g=r(w,x.props.children),g.return=d,d=g;break e}}else if(w.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===Yi&&Rm(C)===w.type){t(d,w.sibling),g=r(w,x.props),g.ref=Eo(d,w,x),g.return=d,d=g;break e}t(d,w);break}else e(d,w);w=w.sibling}x.type===As?(g=Hr(x.props.children,d.mode,y,x.key),g.return=d,d=g):(y=Ml(x.type,x.key,x.props,null,d.mode,y),y.ref=Eo(d,g,x),y.return=d,d=y)}return o(d);case Ts:e:{for(w=x.key;g!==null;){if(g.key===w)if(g.tag===4&&g.stateNode.containerInfo===x.containerInfo&&g.stateNode.implementation===x.implementation){t(d,g.sibling),g=r(g,x.children||[]),g.return=d,d=g;break e}else{t(d,g);break}else e(d,g);g=g.sibling}g=Fu(x,d.mode,y),g.return=d,d=g}return o(d);case Yi:return w=x._init,m(d,g,w(x._payload),y)}if(Ao(x))return v(d,g,x,y);if(vo(x))return _(d,g,x,y);sl(d,x)}return typeof x=="string"&&x!==""||typeof x=="number"?(x=""+x,g!==null&&g.tag===6?(t(d,g.sibling),g=r(g,x),g.return=d,d=g):(t(d,g),g=Uu(x,d.mode,y),g.return=d,d=g),o(d)):t(d,g)}return m}var Qs=h0(!0),d0=h0(!1),ga={},pi=vr(ga),ia=vr(ga),ra=vr(ga);function Ur(n){if(n===ga)throw Error(ie(174));return n}function wd(n,e){switch(ot(ra,e),ot(ia,n),ot(pi,ga),n=e.nodeType,n){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:ih(null,"");break;default:n=n===8?e.parentNode:e,e=n.namespaceURI||null,n=n.tagName,e=ih(e,n)}ht(pi),ot(pi,e)}function Js(){ht(pi),ht(ia),ht(ra)}function f0(n){Ur(ra.current);var e=Ur(pi.current),t=ih(e,n.type);e!==t&&(ot(ia,n),ot(pi,t))}function Td(n){ia.current===n&&(ht(pi),ht(ia))}var pt=vr(0);function ql(n){for(var e=n;e!==null;){if(e.tag===13){var t=e.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if((e.flags&128)!==0)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ru=[];function Ad(){for(var n=0;n<Ru.length;n++)Ru[n]._workInProgressVersionPrimary=null;Ru.length=0}var _l=ki.ReactCurrentDispatcher,Pu=ki.ReactCurrentBatchConfig,jr=0,mt=null,Lt=null,Ot=null,Yl=!1,zo=!1,sa=0,Tb=0;function Kt(){throw Error(ie(321))}function Cd(n,e){if(e===null)return!1;for(var t=0;t<e.length&&t<n.length;t++)if(!ti(n[t],e[t]))return!1;return!0}function bd(n,e,t,i,r,s){if(jr=s,mt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,_l.current=n===null||n.memoizedState===null?Rb:Pb,n=t(i,r),zo){s=0;do{if(zo=!1,sa=0,25<=s)throw Error(ie(301));s+=1,Ot=Lt=null,e.updateQueue=null,_l.current=Lb,n=t(i,r)}while(zo)}if(_l.current=$l,e=Lt!==null&&Lt.next!==null,jr=0,Ot=Lt=mt=null,Yl=!1,e)throw Error(ie(300));return n}function Rd(){var n=sa!==0;return sa=0,n}function li(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ot===null?mt.memoizedState=Ot=n:Ot=Ot.next=n,Ot}function kn(){if(Lt===null){var n=mt.alternate;n=n!==null?n.memoizedState:null}else n=Lt.next;var e=Ot===null?mt.memoizedState:Ot.next;if(e!==null)Ot=e,Lt=n;else{if(n===null)throw Error(ie(310));Lt=n,n={memoizedState:Lt.memoizedState,baseState:Lt.baseState,baseQueue:Lt.baseQueue,queue:Lt.queue,next:null},Ot===null?mt.memoizedState=Ot=n:Ot=Ot.next=n}return Ot}function oa(n,e){return typeof e=="function"?e(n):e}function Lu(n){var e=kn(),t=e.queue;if(t===null)throw Error(ie(311));t.lastRenderedReducer=n;var i=Lt,r=i.baseQueue,s=t.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,t.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var u=c.lane;if((jr&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:n(i,c.action);else{var f={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=f,o=i):l=l.next=f,mt.lanes|=u,qr|=u}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,ti(i,e.memoizedState)||(hn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,t.lastRenderedState=i}if(n=t.interleaved,n!==null){r=n;do s=r.lane,mt.lanes|=s,qr|=s,r=r.next;while(r!==n)}else r===null&&(t.lanes=0);return[e.memoizedState,t.dispatch]}function Nu(n){var e=kn(),t=e.queue;if(t===null)throw Error(ie(311));t.lastRenderedReducer=n;var i=t.dispatch,r=t.pending,s=e.memoizedState;if(r!==null){t.pending=null;var o=r=r.next;do s=n(s,o.action),o=o.next;while(o!==r);ti(s,e.memoizedState)||(hn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),t.lastRenderedState=s}return[s,i]}function p0(){}function m0(n,e){var t=mt,i=kn(),r=e(),s=!ti(i.memoizedState,r);if(s&&(i.memoizedState=r,hn=!0),i=i.queue,Pd(_0.bind(null,t,i,n),[n]),i.getSnapshot!==e||s||Ot!==null&&Ot.memoizedState.tag&1){if(t.flags|=2048,aa(9,v0.bind(null,t,i,r,e),void 0,null),Bt===null)throw Error(ie(349));(jr&30)!==0||g0(t,e,r)}return r}function g0(n,e,t){n.flags|=16384,n={getSnapshot:e,value:t},e=mt.updateQueue,e===null?(e={lastEffect:null,stores:null},mt.updateQueue=e,e.stores=[n]):(t=e.stores,t===null?e.stores=[n]:t.push(n))}function v0(n,e,t,i){e.value=t,e.getSnapshot=i,x0(e)&&y0(n)}function _0(n,e,t){return t(function(){x0(e)&&y0(n)})}function x0(n){var e=n.getSnapshot;n=n.value;try{var t=e();return!ti(n,t)}catch{return!0}}function y0(n){var e=Oi(n,1);e!==null&&ei(e,n,1,-1)}function Pm(n){var e=li();return typeof n=="function"&&(n=n()),e.memoizedState=e.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:oa,lastRenderedState:n},e.queue=n,n=n.dispatch=bb.bind(null,mt,n),[e.memoizedState,n]}function aa(n,e,t,i){return n={tag:n,create:e,destroy:t,deps:i,next:null},e=mt.updateQueue,e===null?(e={lastEffect:null,stores:null},mt.updateQueue=e,e.lastEffect=n.next=n):(t=e.lastEffect,t===null?e.lastEffect=n.next=n:(i=t.next,t.next=n,n.next=i,e.lastEffect=n)),n}function S0(){return kn().memoizedState}function xl(n,e,t,i){var r=li();mt.flags|=n,r.memoizedState=aa(1|e,t,void 0,i===void 0?null:i)}function vc(n,e,t,i){var r=kn();i=i===void 0?null:i;var s=void 0;if(Lt!==null){var o=Lt.memoizedState;if(s=o.destroy,i!==null&&Cd(i,o.deps)){r.memoizedState=aa(e,t,s,i);return}}mt.flags|=n,r.memoizedState=aa(1|e,t,s,i)}function Lm(n,e){return xl(8390656,8,n,e)}function Pd(n,e){return vc(2048,8,n,e)}function E0(n,e){return vc(4,2,n,e)}function M0(n,e){return vc(4,4,n,e)}function w0(n,e){if(typeof e=="function")return n=n(),e(n),function(){e(null)};if(e!=null)return n=n(),e.current=n,function(){e.current=null}}function T0(n,e,t){return t=t!=null?t.concat([n]):null,vc(4,4,w0.bind(null,e,n),t)}function Ld(){}function A0(n,e){var t=kn();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&Cd(e,i[1])?i[0]:(t.memoizedState=[n,e],n)}function C0(n,e){var t=kn();e=e===void 0?null:e;var i=t.memoizedState;return i!==null&&e!==null&&Cd(e,i[1])?i[0]:(n=n(),t.memoizedState=[n,e],n)}function b0(n,e,t){return(jr&21)===0?(n.baseState&&(n.baseState=!1,hn=!0),n.memoizedState=t):(ti(t,e)||(t=Lv(),mt.lanes|=t,qr|=t,n.baseState=!0),e)}function Ab(n,e){var t=it;it=t!==0&&4>t?t:4,n(!0);var i=Pu.transition;Pu.transition={};try{n(!1),e()}finally{it=t,Pu.transition=i}}function R0(){return kn().memoizedState}function Cb(n,e,t){var i=hr(n);if(t={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null},P0(n))L0(e,t);else if(t=a0(n,e,t,i),t!==null){var r=on();ei(t,n,i,r),N0(t,e,i)}}function bb(n,e,t){var i=hr(n),r={lane:i,action:t,hasEagerState:!1,eagerState:null,next:null};if(P0(n))L0(e,r);else{var s=n.alternate;if(n.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,t);if(r.hasEagerState=!0,r.eagerState=a,ti(a,o)){var l=e.interleaved;l===null?(r.next=r,Ed(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}t=a0(n,e,r,i),t!==null&&(r=on(),ei(t,n,i,r),N0(t,e,i))}}function P0(n){var e=n.alternate;return n===mt||e!==null&&e===mt}function L0(n,e){zo=Yl=!0;var t=n.pending;t===null?e.next=e:(e.next=t.next,t.next=e),n.pending=e}function N0(n,e,t){if((t&4194240)!==0){var i=e.lanes;i&=n.pendingLanes,t|=i,e.lanes=t,ld(n,t)}}var $l={readContext:zn,useCallback:Kt,useContext:Kt,useEffect:Kt,useImperativeHandle:Kt,useInsertionEffect:Kt,useLayoutEffect:Kt,useMemo:Kt,useReducer:Kt,useRef:Kt,useState:Kt,useDebugValue:Kt,useDeferredValue:Kt,useTransition:Kt,useMutableSource:Kt,useSyncExternalStore:Kt,useId:Kt,unstable_isNewReconciler:!1},Rb={readContext:zn,useCallback:function(n,e){return li().memoizedState=[n,e===void 0?null:e],n},useContext:zn,useEffect:Lm,useImperativeHandle:function(n,e,t){return t=t!=null?t.concat([n]):null,xl(4194308,4,w0.bind(null,e,n),t)},useLayoutEffect:function(n,e){return xl(4194308,4,n,e)},useInsertionEffect:function(n,e){return xl(4,2,n,e)},useMemo:function(n,e){var t=li();return e=e===void 0?null:e,n=n(),t.memoizedState=[n,e],n},useReducer:function(n,e,t){var i=li();return e=t!==void 0?t(e):e,i.memoizedState=i.baseState=e,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:e},i.queue=n,n=n.dispatch=Cb.bind(null,mt,n),[i.memoizedState,n]},useRef:function(n){var e=li();return n={current:n},e.memoizedState=n},useState:Pm,useDebugValue:Ld,useDeferredValue:function(n){return li().memoizedState=n},useTransition:function(){var n=Pm(!1),e=n[0];return n=Ab.bind(null,n[1]),li().memoizedState=n,[e,n]},useMutableSource:function(){},useSyncExternalStore:function(n,e,t){var i=mt,r=li();if(dt){if(t===void 0)throw Error(ie(407));t=t()}else{if(t=e(),Bt===null)throw Error(ie(349));(jr&30)!==0||g0(i,e,t)}r.memoizedState=t;var s={value:t,getSnapshot:e};return r.queue=s,Lm(_0.bind(null,i,s,n),[n]),i.flags|=2048,aa(9,v0.bind(null,i,s,t,e),void 0,null),t},useId:function(){var n=li(),e=Bt.identifierPrefix;if(dt){var t=Ni,i=Li;t=(i&~(1<<32-Jn(i)-1)).toString(32)+t,e=":"+e+"R"+t,t=sa++,0<t&&(e+="H"+t.toString(32)),e+=":"}else t=Tb++,e=":"+e+"r"+t.toString(32)+":";return n.memoizedState=e},unstable_isNewReconciler:!1},Pb={readContext:zn,useCallback:A0,useContext:zn,useEffect:Pd,useImperativeHandle:T0,useInsertionEffect:E0,useLayoutEffect:M0,useMemo:C0,useReducer:Lu,useRef:S0,useState:function(){return Lu(oa)},useDebugValue:Ld,useDeferredValue:function(n){var e=kn();return b0(e,Lt.memoizedState,n)},useTransition:function(){var n=Lu(oa)[0],e=kn().memoizedState;return[n,e]},useMutableSource:p0,useSyncExternalStore:m0,useId:R0,unstable_isNewReconciler:!1},Lb={readContext:zn,useCallback:A0,useContext:zn,useEffect:Pd,useImperativeHandle:T0,useInsertionEffect:E0,useLayoutEffect:M0,useMemo:C0,useReducer:Nu,useRef:S0,useState:function(){return Nu(oa)},useDebugValue:Ld,useDeferredValue:function(n){var e=kn();return Lt===null?e.memoizedState=n:b0(e,Lt.memoizedState,n)},useTransition:function(){var n=Nu(oa)[0],e=kn().memoizedState;return[n,e]},useMutableSource:p0,useSyncExternalStore:m0,useId:R0,unstable_isNewReconciler:!1};function eo(n,e){try{var t="",i=e;do t+=sC(i),i=i.return;while(i);var r=t}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:n,source:e,stack:r,digest:null}}function Du(n,e,t){return{value:n,source:null,stack:t!=null?t:null,digest:e!=null?e:null}}function Ah(n,e){try{console.error(e.value)}catch(t){setTimeout(function(){throw t})}}var Nb=typeof WeakMap=="function"?WeakMap:Map;function D0(n,e,t){t=Di(-1,t),t.tag=3,t.payload={element:null};var i=e.value;return t.callback=function(){Zl||(Zl=!0,Fh=i),Ah(n,e)},t}function I0(n,e,t){t=Di(-1,t),t.tag=3;var i=n.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;t.payload=function(){return i(r)},t.callback=function(){Ah(n,e)}}var s=n.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(t.callback=function(){Ah(n,e),typeof i!="function"&&(ur===null?ur=new Set([this]):ur.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),t}function Nm(n,e,t){var i=n.pingCache;if(i===null){i=n.pingCache=new Nb;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(t)||(r.add(t),n=jb.bind(null,n,e,t),e.then(n,n))}function Dm(n){do{var e;if((e=n.tag===13)&&(e=n.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return n;n=n.return}while(n!==null);return null}function Im(n,e,t,i,r){return(n.mode&1)===0?(n===e?n.flags|=65536:(n.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(e=Di(-1,1),e.tag=2,cr(t,e,1))),t.lanes|=1),n):(n.flags|=65536,n.lanes=r,n)}var Db=ki.ReactCurrentOwner,hn=!1;function rn(n,e,t,i){e.child=n===null?d0(e,null,t,i):Qs(e,n.child,t,i)}function Um(n,e,t,i,r){t=t.render;var s=e.ref;return Gs(e,r),i=bd(n,e,t,i,s,r),t=Rd(),n!==null&&!hn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~r,zi(n,e,r)):(dt&&t&&gd(e),e.flags|=1,rn(n,e,i,r),e.child)}function Fm(n,e,t,i,r){if(n===null){var s=t.type;return typeof s=="function"&&!kd(s)&&s.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(e.tag=15,e.type=s,U0(n,e,s,i,r)):(n=Ml(t.type,null,i,e,e.mode,r),n.ref=e.ref,n.return=e,e.child=n)}if(s=n.child,(n.lanes&r)===0){var o=s.memoizedProps;if(t=t.compare,t=t!==null?t:Jo,t(o,i)&&n.ref===e.ref)return zi(n,e,r)}return e.flags|=1,n=dr(s,i),n.ref=e.ref,n.return=e,e.child=n}function U0(n,e,t,i,r){if(n!==null){var s=n.memoizedProps;if(Jo(s,i)&&n.ref===e.ref)if(hn=!1,e.pendingProps=i=s,(n.lanes&r)!==0)(n.flags&131072)!==0&&(hn=!0);else return e.lanes=n.lanes,zi(n,e,r)}return Ch(n,e,t,i,r)}function F0(n,e,t){var i=e.pendingProps,r=i.children,s=n!==null?n.memoizedState:null;if(i.mode==="hidden")if((e.mode&1)===0)e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ot(Fs,yn),yn|=t;else{if((t&1073741824)===0)return n=s!==null?s.baseLanes|t:t,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:n,cachePool:null,transitions:null},e.updateQueue=null,ot(Fs,yn),yn|=n,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:t,ot(Fs,yn),yn|=i}else s!==null?(i=s.baseLanes|t,e.memoizedState=null):i=t,ot(Fs,yn),yn|=i;return rn(n,e,r,t),e.child}function O0(n,e){var t=e.ref;(n===null&&t!==null||n!==null&&n.ref!==t)&&(e.flags|=512,e.flags|=2097152)}function Ch(n,e,t,i,r){var s=mn(t)?Wr:en.current;return s=Ks(e,s),Gs(e,r),t=bd(n,e,t,i,s,r),i=Rd(),n!==null&&!hn?(e.updateQueue=n.updateQueue,e.flags&=-2053,n.lanes&=~r,zi(n,e,r)):(dt&&i&&gd(e),e.flags|=1,rn(n,e,t,r),e.child)}function Om(n,e,t,i,r){if(mn(t)){var s=!0;Hl(e)}else s=!1;if(Gs(e,r),e.stateNode===null)yl(n,e),u0(e,t,i),Th(e,t,i,r),i=!0;else if(n===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=t.contextType;typeof c=="object"&&c!==null?c=zn(c):(c=mn(t)?Wr:en.current,c=Ks(e,c));var u=t.getDerivedStateFromProps,f=typeof u=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&bm(e,o,i,c),$i=!1;var h=e.memoizedState;o.state=h,jl(e,i,o,r),l=e.memoizedState,a!==i||h!==l||pn.current||$i?(typeof u=="function"&&(wh(e,t,u,i),l=e.memoizedState),(a=$i||Cm(e,t,a,i,h,l,c))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,l0(n,e),a=e.memoizedProps,c=e.type===e.elementType?a:Xn(e.type,a),o.props=c,f=e.pendingProps,h=o.context,l=t.contextType,typeof l=="object"&&l!==null?l=zn(l):(l=mn(t)?Wr:en.current,l=Ks(e,l));var p=t.getDerivedStateFromProps;(u=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==f||h!==l)&&bm(e,o,i,l),$i=!1,h=e.memoizedState,o.state=h,jl(e,i,o,r);var v=e.memoizedState;a!==f||h!==v||pn.current||$i?(typeof p=="function"&&(wh(e,t,p,i),v=e.memoizedState),(c=$i||Cm(e,t,c,i,h,v,l)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,v,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,v,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=v),o.props=i,o.state=v,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===n.memoizedProps&&h===n.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===n.memoizedProps&&h===n.memoizedState||(e.flags|=1024),i=!1)}return bh(n,e,t,i,s,r)}function bh(n,e,t,i,r,s){O0(n,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&Em(e,t,!1),zi(n,e,s);i=e.stateNode,Db.current=e;var a=o&&typeof t.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,n!==null&&o?(e.child=Qs(e,n.child,null,s),e.child=Qs(e,null,a,s)):rn(n,e,a,s),e.memoizedState=i.state,r&&Em(e,t,!0),e.child}function z0(n){var e=n.stateNode;e.pendingContext?Sm(n,e.pendingContext,e.pendingContext!==e.context):e.context&&Sm(n,e.context,!1),wd(n,e.containerInfo)}function zm(n,e,t,i,r){return Zs(),_d(r),e.flags|=256,rn(n,e,t,i),e.child}var Rh={dehydrated:null,treeContext:null,retryLane:0};function Ph(n){return{baseLanes:n,cachePool:null,transitions:null}}function k0(n,e,t){var i=e.pendingProps,r=pt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=n!==null&&n.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(n===null||n.memoizedState!==null)&&(r|=1),ot(pt,r&1),n===null)return Eh(e),n=e.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((e.mode&1)===0?e.lanes=1:n.data==="$!"?e.lanes=8:e.lanes=1073741824,null):(o=i.children,n=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},(i&1)===0&&s!==null?(s.childLanes=0,s.pendingProps=o):s=yc(o,i,0,null),n=Hr(n,i,t,null),s.return=e,n.return=e,s.sibling=n,e.child=s,e.child.memoizedState=Ph(t),e.memoizedState=Rh,n):Nd(e,o));if(r=n.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return Ib(n,e,o,i,a,r,t);if(s){s=i.fallback,o=e.mode,r=n.child,a=r.sibling;var l={mode:"hidden",children:i.children};return(o&1)===0&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=dr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=dr(a,s):(s=Hr(s,o,t,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=n.child.memoizedState,o=o===null?Ph(t):{baseLanes:o.baseLanes|t,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=n.childLanes&~t,e.memoizedState=Rh,i}return s=n.child,n=s.sibling,i=dr(s,{mode:"visible",children:i.children}),(e.mode&1)===0&&(i.lanes=t),i.return=e,i.sibling=null,n!==null&&(t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)),e.child=i,e.memoizedState=null,i}function Nd(n,e){return e=yc({mode:"visible",children:e},n.mode,0,null),e.return=n,n.child=e}function ol(n,e,t,i){return i!==null&&_d(i),Qs(e,n.child,null,t),n=Nd(e,e.pendingProps.children),n.flags|=2,e.memoizedState=null,n}function Ib(n,e,t,i,r,s,o){if(t)return e.flags&256?(e.flags&=-257,i=Du(Error(ie(422))),ol(n,e,o,i)):e.memoizedState!==null?(e.child=n.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=yc({mode:"visible",children:i.children},r,0,null),s=Hr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,(e.mode&1)!==0&&Qs(e,n.child,null,o),e.child.memoizedState=Ph(o),e.memoizedState=Rh,s);if((e.mode&1)===0)return ol(n,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(ie(419)),i=Du(s,i,void 0),ol(n,e,o,i)}if(a=(o&n.childLanes)!==0,hn||a){if(i=Bt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=(r&(i.suspendedLanes|o))!==0?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Oi(n,r),ei(i,n,r,-1))}return zd(),i=Du(Error(ie(421))),ol(n,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=n.child,e=qb.bind(null,n),r._reactRetry=e,null):(n=s.treeContext,Sn=lr(r.nextSibling),Mn=e,dt=!0,Yn=null,n!==null&&(Dn[In++]=Li,Dn[In++]=Ni,Dn[In++]=Xr,Li=n.id,Ni=n.overflow,Xr=e),e=Nd(e,i.children),e.flags|=4096,e)}function km(n,e,t){n.lanes|=e;var i=n.alternate;i!==null&&(i.lanes|=e),Mh(n.return,e,t)}function Iu(n,e,t,i,r){var s=n.memoizedState;s===null?n.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:t,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=t,s.tailMode=r)}function B0(n,e,t){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(rn(n,e,i.children,t),i=pt.current,(i&2)!==0)i=i&1|2,e.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=e.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&km(n,t,e);else if(n.tag===19)km(n,t,e);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break e;for(;n.sibling===null;){if(n.return===null||n.return===e)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}i&=1}if(ot(pt,i),(e.mode&1)===0)e.memoizedState=null;else switch(r){case"forwards":for(t=e.child,r=null;t!==null;)n=t.alternate,n!==null&&ql(n)===null&&(r=t),t=t.sibling;t=r,t===null?(r=e.child,e.child=null):(r=t.sibling,t.sibling=null),Iu(e,!1,r,t,s);break;case"backwards":for(t=null,r=e.child,e.child=null;r!==null;){if(n=r.alternate,n!==null&&ql(n)===null){e.child=r;break}n=r.sibling,r.sibling=t,t=r,r=n}Iu(e,!0,t,null,s);break;case"together":Iu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function yl(n,e){(e.mode&1)===0&&n!==null&&(n.alternate=null,e.alternate=null,e.flags|=2)}function zi(n,e,t){if(n!==null&&(e.dependencies=n.dependencies),qr|=e.lanes,(t&e.childLanes)===0)return null;if(n!==null&&e.child!==n.child)throw Error(ie(153));if(e.child!==null){for(n=e.child,t=dr(n,n.pendingProps),e.child=t,t.return=e;n.sibling!==null;)n=n.sibling,t=t.sibling=dr(n,n.pendingProps),t.return=e;t.sibling=null}return e.child}function Ub(n,e,t){switch(e.tag){case 3:z0(e),Zs();break;case 5:f0(e);break;case 1:mn(e.type)&&Hl(e);break;case 4:wd(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;ot(Wl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(ot(pt,pt.current&1),e.flags|=128,null):(t&e.child.childLanes)!==0?k0(n,e,t):(ot(pt,pt.current&1),n=zi(n,e,t),n!==null?n.sibling:null);ot(pt,pt.current&1);break;case 19:if(i=(t&e.childLanes)!==0,(n.flags&128)!==0){if(i)return B0(n,e,t);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ot(pt,pt.current),i)break;return null;case 22:case 23:return e.lanes=0,F0(n,e,t)}return zi(n,e,t)}var H0,Lh,V0,G0;H0=function(n,e){for(var t=e.child;t!==null;){if(t.tag===5||t.tag===6)n.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Lh=function(){};V0=function(n,e,t,i){var r=n.memoizedProps;if(r!==i){n=e.stateNode,Ur(pi.current);var s=null;switch(t){case"input":r=Ju(n,r),i=Ju(n,i),s=[];break;case"select":r=gt({},r,{value:void 0}),i=gt({},i,{value:void 0}),s=[];break;case"textarea":r=nh(n,r),i=nh(n,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(n.onclick=kl)}rh(t,i);var o;t=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(t||(t={}),t[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(jo.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(t||(t={}),t[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(t||(t={}),t[o]=l[o])}else t||(s||(s=[]),s.push(c,t)),t=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(jo.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&ct("scroll",n),s||a===l||(s=[])):(s=s||[]).push(c,l))}t&&(s=s||[]).push("style",t);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};G0=function(n,e,t,i){t!==i&&(e.flags|=4)};function Mo(n,e){if(!dt)switch(n.tailMode){case"hidden":e=n.tail;for(var t=null;e!==null;)e.alternate!==null&&(t=e),e=e.sibling;t===null?n.tail=null:t.sibling=null;break;case"collapsed":t=n.tail;for(var i=null;t!==null;)t.alternate!==null&&(i=t),t=t.sibling;i===null?e||n.tail===null?n.tail=null:n.tail.sibling=null:i.sibling=null}}function Zt(n){var e=n.alternate!==null&&n.alternate.child===n.child,t=0,i=0;if(e)for(var r=n.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=n,r=r.sibling;else for(r=n.child;r!==null;)t|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=n,r=r.sibling;return n.subtreeFlags|=i,n.childLanes=t,e}function Fb(n,e,t){var i=e.pendingProps;switch(vd(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Zt(e),null;case 1:return mn(e.type)&&Bl(),Zt(e),null;case 3:return i=e.stateNode,Js(),ht(pn),ht(en),Ad(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(n===null||n.child===null)&&(rl(e)?e.flags|=4:n===null||n.memoizedState.isDehydrated&&(e.flags&256)===0||(e.flags|=1024,Yn!==null&&(kh(Yn),Yn=null))),Lh(n,e),Zt(e),null;case 5:Td(e);var r=Ur(ra.current);if(t=e.type,n!==null&&e.stateNode!=null)V0(n,e,t,i,r),n.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ie(166));return Zt(e),null}if(n=Ur(pi.current),rl(e)){i=e.stateNode,t=e.type;var s=e.memoizedProps;switch(i[hi]=e,i[na]=s,n=(e.mode&1)!==0,t){case"dialog":ct("cancel",i),ct("close",i);break;case"iframe":case"object":case"embed":ct("load",i);break;case"video":case"audio":for(r=0;r<bo.length;r++)ct(bo[r],i);break;case"source":ct("error",i);break;case"img":case"image":case"link":ct("error",i),ct("load",i);break;case"details":ct("toggle",i);break;case"input":Yp(i,s),ct("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},ct("invalid",i);break;case"textarea":Kp(i,s),ct("invalid",i)}rh(t,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&il(i.textContent,a,n),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&il(i.textContent,a,n),r=["children",""+a]):jo.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&ct("scroll",i)}switch(t){case"input":$a(i),$p(i,s,!0);break;case"textarea":$a(i),Zp(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=kl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=gv(t)),n==="http://www.w3.org/1999/xhtml"?t==="script"?(n=o.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof i.is=="string"?n=o.createElement(t,{is:i.is}):(n=o.createElement(t),t==="select"&&(o=n,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):n=o.createElementNS(n,t),n[hi]=e,n[na]=i,H0(n,e,!1,!1),e.stateNode=n;e:{switch(o=sh(t,i),t){case"dialog":ct("cancel",n),ct("close",n),r=i;break;case"iframe":case"object":case"embed":ct("load",n),r=i;break;case"video":case"audio":for(r=0;r<bo.length;r++)ct(bo[r],n);r=i;break;case"source":ct("error",n),r=i;break;case"img":case"image":case"link":ct("error",n),ct("load",n),r=i;break;case"details":ct("toggle",n),r=i;break;case"input":Yp(n,i),r=Ju(n,i),ct("invalid",n);break;case"option":r=i;break;case"select":n._wrapperState={wasMultiple:!!i.multiple},r=gt({},i,{value:void 0}),ct("invalid",n);break;case"textarea":Kp(n,i),r=nh(n,i),ct("invalid",n);break;default:r=i}rh(t,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?xv(n,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&vv(n,l)):s==="children"?typeof l=="string"?(t!=="textarea"||l!=="")&&qo(n,l):typeof l=="number"&&qo(n,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(jo.hasOwnProperty(s)?l!=null&&s==="onScroll"&&ct("scroll",n):l!=null&&nd(n,s,l,o))}switch(t){case"input":$a(n),$p(n,i,!1);break;case"textarea":$a(n),Zp(n);break;case"option":i.value!=null&&n.setAttribute("value",""+pr(i.value));break;case"select":n.multiple=!!i.multiple,s=i.value,s!=null?ks(n,!!i.multiple,s,!1):i.defaultValue!=null&&ks(n,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(n.onclick=kl)}switch(t){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Zt(e),null;case 6:if(n&&e.stateNode!=null)G0(n,e,n.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ie(166));if(t=Ur(ra.current),Ur(pi.current),rl(e)){if(i=e.stateNode,t=e.memoizedProps,i[hi]=e,(s=i.nodeValue!==t)&&(n=Mn,n!==null))switch(n.tag){case 3:il(i.nodeValue,t,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&il(i.nodeValue,t,(n.mode&1)!==0)}s&&(e.flags|=4)}else i=(t.nodeType===9?t:t.ownerDocument).createTextNode(i),i[hi]=e,e.stateNode=i}return Zt(e),null;case 13:if(ht(pt),i=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(dt&&Sn!==null&&(e.mode&1)!==0&&(e.flags&128)===0)o0(),Zs(),e.flags|=98560,s=!1;else if(s=rl(e),i!==null&&i.dehydrated!==null){if(n===null){if(!s)throw Error(ie(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ie(317));s[hi]=e}else Zs(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Zt(e),s=!1}else Yn!==null&&(kh(Yn),Yn=null),s=!0;if(!s)return e.flags&65536?e:null}return(e.flags&128)!==0?(e.lanes=t,e):(i=i!==null,i!==(n!==null&&n.memoizedState!==null)&&i&&(e.child.flags|=8192,(e.mode&1)!==0&&(n===null||(pt.current&1)!==0?Nt===0&&(Nt=3):zd())),e.updateQueue!==null&&(e.flags|=4),Zt(e),null);case 4:return Js(),Lh(n,e),n===null&&ea(e.stateNode.containerInfo),Zt(e),null;case 10:return Sd(e.type._context),Zt(e),null;case 17:return mn(e.type)&&Bl(),Zt(e),null;case 19:if(ht(pt),s=e.memoizedState,s===null)return Zt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Mo(s,!1);else{if(Nt!==0||n!==null&&(n.flags&128)!==0)for(n=e.child;n!==null;){if(o=ql(n),o!==null){for(e.flags|=128,Mo(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=t,t=e.child;t!==null;)s=t,n=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=n,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,n=o.dependencies,s.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t=t.sibling;return ot(pt,pt.current&1|2),e.child}n=n.sibling}s.tail!==null&&Et()>to&&(e.flags|=128,i=!0,Mo(s,!1),e.lanes=4194304)}else{if(!i)if(n=ql(o),n!==null){if(e.flags|=128,i=!0,t=n.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),Mo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!dt)return Zt(e),null}else 2*Et()-s.renderingStartTime>to&&t!==1073741824&&(e.flags|=128,i=!0,Mo(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(t=s.last,t!==null?t.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Et(),e.sibling=null,t=pt.current,ot(pt,i?t&1|2:t&1),e):(Zt(e),null);case 22:case 23:return Od(),i=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==i&&(e.flags|=8192),i&&(e.mode&1)!==0?(yn&1073741824)!==0&&(Zt(e),e.subtreeFlags&6&&(e.flags|=8192)):Zt(e),null;case 24:return null;case 25:return null}throw Error(ie(156,e.tag))}function Ob(n,e){switch(vd(e),e.tag){case 1:return mn(e.type)&&Bl(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return Js(),ht(pn),ht(en),Ad(),n=e.flags,(n&65536)!==0&&(n&128)===0?(e.flags=n&-65537|128,e):null;case 5:return Td(e),null;case 13:if(ht(pt),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(ie(340));Zs()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return ht(pt),null;case 4:return Js(),null;case 10:return Sd(e.type._context),null;case 22:case 23:return Od(),null;case 24:return null;default:return null}}var al=!1,Jt=!1,zb=typeof WeakSet=="function"?WeakSet:Set,ge=null;function Us(n,e){var t=n.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(i){xt(n,e,i)}else t.current=null}function Nh(n,e,t){try{t()}catch(i){xt(n,e,i)}}var Bm=!1;function kb(n,e){if(mh=Fl,n=qv(),md(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else e:{t=(t=n.ownerDocument)&&t.defaultView||window;var i=t.getSelection&&t.getSelection();if(i&&i.rangeCount!==0){t=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{t.nodeType,s.nodeType}catch{t=null;break e}var o=0,a=-1,l=-1,c=0,u=0,f=n,h=null;t:for(;;){for(var p;f!==t||r!==0&&f.nodeType!==3||(a=o+r),f!==s||i!==0&&f.nodeType!==3||(l=o+i),f.nodeType===3&&(o+=f.nodeValue.length),(p=f.firstChild)!==null;)h=f,f=p;for(;;){if(f===n)break t;if(h===t&&++c===r&&(a=o),h===s&&++u===i&&(l=o),(p=f.nextSibling)!==null)break;f=h,h=f.parentNode}f=p}t=a===-1||l===-1?null:{start:a,end:l}}else t=null}t=t||{start:0,end:0}}else t=null;for(gh={focusedElem:n,selectionRange:t},Fl=!1,ge=e;ge!==null;)if(e=ge,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,ge=n;else for(;ge!==null;){e=ge;try{var v=e.alternate;if((e.flags&1024)!==0)switch(e.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var _=v.memoizedProps,m=v.memoizedState,d=e.stateNode,g=d.getSnapshotBeforeUpdate(e.elementType===e.type?_:Xn(e.type,_),m);d.__reactInternalSnapshotBeforeUpdate=g}break;case 3:var x=e.stateNode.containerInfo;x.nodeType===1?x.textContent="":x.nodeType===9&&x.documentElement&&x.removeChild(x.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ie(163))}}catch(y){xt(e,e.return,y)}if(n=e.sibling,n!==null){n.return=e.return,ge=n;break}ge=e.return}return v=Bm,Bm=!1,v}function ko(n,e,t){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&n)===n){var s=r.destroy;r.destroy=void 0,s!==void 0&&Nh(e,t,s)}r=r.next}while(r!==i)}}function _c(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var t=e=e.next;do{if((t.tag&n)===n){var i=t.create;t.destroy=i()}t=t.next}while(t!==e)}}function Dh(n){var e=n.ref;if(e!==null){var t=n.stateNode;switch(n.tag){case 5:n=t;break;default:n=t}typeof e=="function"?e(n):e.current=n}}function W0(n){var e=n.alternate;e!==null&&(n.alternate=null,W0(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[hi],delete e[na],delete e[xh],delete e[Sb],delete e[Eb])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function X0(n){return n.tag===5||n.tag===3||n.tag===4}function Hm(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||X0(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Ih(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.nodeType===8?t.parentNode.insertBefore(n,e):t.insertBefore(n,e):(t.nodeType===8?(e=t.parentNode,e.insertBefore(n,t)):(e=t,e.appendChild(n)),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=kl));else if(i!==4&&(n=n.child,n!==null))for(Ih(n,e,t),n=n.sibling;n!==null;)Ih(n,e,t),n=n.sibling}function Uh(n,e,t){var i=n.tag;if(i===5||i===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(i!==4&&(n=n.child,n!==null))for(Uh(n,e,t),n=n.sibling;n!==null;)Uh(n,e,t),n=n.sibling}var Vt=null,jn=!1;function ji(n,e,t){for(t=t.child;t!==null;)j0(n,e,t),t=t.sibling}function j0(n,e,t){if(fi&&typeof fi.onCommitFiberUnmount=="function")try{fi.onCommitFiberUnmount(uc,t)}catch{}switch(t.tag){case 5:Jt||Us(t,e);case 6:var i=Vt,r=jn;Vt=null,ji(n,e,t),Vt=i,jn=r,Vt!==null&&(jn?(n=Vt,t=t.stateNode,n.nodeType===8?n.parentNode.removeChild(t):n.removeChild(t)):Vt.removeChild(t.stateNode));break;case 18:Vt!==null&&(jn?(n=Vt,t=t.stateNode,n.nodeType===8?Cu(n.parentNode,t):n.nodeType===1&&Cu(n,t),Zo(n)):Cu(Vt,t.stateNode));break;case 4:i=Vt,r=jn,Vt=t.stateNode.containerInfo,jn=!0,ji(n,e,t),Vt=i,jn=r;break;case 0:case 11:case 14:case 15:if(!Jt&&(i=t.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&((s&2)!==0||(s&4)!==0)&&Nh(t,e,o),r=r.next}while(r!==i)}ji(n,e,t);break;case 1:if(!Jt&&(Us(t,e),i=t.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=t.memoizedProps,i.state=t.memoizedState,i.componentWillUnmount()}catch(a){xt(t,e,a)}ji(n,e,t);break;case 21:ji(n,e,t);break;case 22:t.mode&1?(Jt=(i=Jt)||t.memoizedState!==null,ji(n,e,t),Jt=i):ji(n,e,t);break;default:ji(n,e,t)}}function Vm(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var t=n.stateNode;t===null&&(t=n.stateNode=new zb),e.forEach(function(i){var r=Yb.bind(null,n,i);t.has(i)||(t.add(i),i.then(r,r))})}}function Wn(n,e){var t=e.deletions;if(t!==null)for(var i=0;i<t.length;i++){var r=t[i];try{var s=n,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Vt=a.stateNode,jn=!1;break e;case 3:Vt=a.stateNode.containerInfo,jn=!0;break e;case 4:Vt=a.stateNode.containerInfo,jn=!0;break e}a=a.return}if(Vt===null)throw Error(ie(160));j0(s,o,r),Vt=null,jn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){xt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)q0(e,n),e=e.sibling}function q0(n,e){var t=n.alternate,i=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Wn(e,n),oi(n),i&4){try{ko(3,n,n.return),_c(3,n)}catch(_){xt(n,n.return,_)}try{ko(5,n,n.return)}catch(_){xt(n,n.return,_)}}break;case 1:Wn(e,n),oi(n),i&512&&t!==null&&Us(t,t.return);break;case 5:if(Wn(e,n),oi(n),i&512&&t!==null&&Us(t,t.return),n.flags&32){var r=n.stateNode;try{qo(r,"")}catch(_){xt(n,n.return,_)}}if(i&4&&(r=n.stateNode,r!=null)){var s=n.memoizedProps,o=t!==null?t.memoizedProps:s,a=n.type,l=n.updateQueue;if(n.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&pv(r,s),sh(a,o);var c=sh(a,s);for(o=0;o<l.length;o+=2){var u=l[o],f=l[o+1];u==="style"?xv(r,f):u==="dangerouslySetInnerHTML"?vv(r,f):u==="children"?qo(r,f):nd(r,u,f,c)}switch(a){case"input":eh(r,s);break;case"textarea":mv(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?ks(r,!!s.multiple,p,!1):h!==!!s.multiple&&(s.defaultValue!=null?ks(r,!!s.multiple,s.defaultValue,!0):ks(r,!!s.multiple,s.multiple?[]:"",!1))}r[na]=s}catch(_){xt(n,n.return,_)}}break;case 6:if(Wn(e,n),oi(n),i&4){if(n.stateNode===null)throw Error(ie(162));r=n.stateNode,s=n.memoizedProps;try{r.nodeValue=s}catch(_){xt(n,n.return,_)}}break;case 3:if(Wn(e,n),oi(n),i&4&&t!==null&&t.memoizedState.isDehydrated)try{Zo(e.containerInfo)}catch(_){xt(n,n.return,_)}break;case 4:Wn(e,n),oi(n);break;case 13:Wn(e,n),oi(n),r=n.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Ud=Et())),i&4&&Vm(n);break;case 22:if(u=t!==null&&t.memoizedState!==null,n.mode&1?(Jt=(c=Jt)||u,Wn(e,n),Jt=c):Wn(e,n),oi(n),i&8192){if(c=n.memoizedState!==null,(n.stateNode.isHidden=c)&&!u&&(n.mode&1)!==0)for(ge=n,u=n.child;u!==null;){for(f=ge=u;ge!==null;){switch(h=ge,p=h.child,h.tag){case 0:case 11:case 14:case 15:ko(4,h,h.return);break;case 1:Us(h,h.return);var v=h.stateNode;if(typeof v.componentWillUnmount=="function"){i=h,t=h.return;try{e=i,v.props=e.memoizedProps,v.state=e.memoizedState,v.componentWillUnmount()}catch(_){xt(i,t,_)}}break;case 5:Us(h,h.return);break;case 22:if(h.memoizedState!==null){Wm(f);continue}}p!==null?(p.return=h,ge=p):Wm(f)}u=u.sibling}e:for(u=null,f=n;;){if(f.tag===5){if(u===null){u=f;try{r=f.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=f.stateNode,l=f.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=_v("display",o))}catch(_){xt(n,n.return,_)}}}else if(f.tag===6){if(u===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(_){xt(n,n.return,_)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===n)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===n)break e;for(;f.sibling===null;){if(f.return===null||f.return===n)break e;u===f&&(u=null),f=f.return}u===f&&(u=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Wn(e,n),oi(n),i&4&&Vm(n);break;case 21:break;default:Wn(e,n),oi(n)}}function oi(n){var e=n.flags;if(e&2){try{e:{for(var t=n.return;t!==null;){if(X0(t)){var i=t;break e}t=t.return}throw Error(ie(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(qo(r,""),i.flags&=-33);var s=Hm(n);Uh(n,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=Hm(n);Ih(n,a,o);break;default:throw Error(ie(161))}}catch(l){xt(n,n.return,l)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function Bb(n,e,t){ge=n,Y0(n)}function Y0(n,e,t){for(var i=(n.mode&1)!==0;ge!==null;){var r=ge,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||al;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Jt;a=al;var c=Jt;if(al=o,(Jt=l)&&!c)for(ge=r;ge!==null;)o=ge,l=o.child,o.tag===22&&o.memoizedState!==null?Xm(r):l!==null?(l.return=o,ge=l):Xm(r);for(;s!==null;)ge=s,Y0(s),s=s.sibling;ge=r,al=a,Jt=c}Gm(n)}else(r.subtreeFlags&8772)!==0&&s!==null?(s.return=r,ge=s):Gm(n)}}function Gm(n){for(;ge!==null;){var e=ge;if((e.flags&8772)!==0){var t=e.alternate;try{if((e.flags&8772)!==0)switch(e.tag){case 0:case 11:case 15:Jt||_c(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Jt)if(t===null)i.componentDidMount();else{var r=e.elementType===e.type?t.memoizedProps:Xn(e.type,t.memoizedProps);i.componentDidUpdate(r,t.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Am(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(t=null,e.child!==null)switch(e.child.tag){case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}Am(e,o,t)}break;case 5:var a=e.stateNode;if(t===null&&e.flags&4){t=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&t.focus();break;case"img":l.src&&(t.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var f=u.dehydrated;f!==null&&Zo(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ie(163))}Jt||e.flags&512&&Dh(e)}catch(h){xt(e,e.return,h)}}if(e===n){ge=null;break}if(t=e.sibling,t!==null){t.return=e.return,ge=t;break}ge=e.return}}function Wm(n){for(;ge!==null;){var e=ge;if(e===n){ge=null;break}var t=e.sibling;if(t!==null){t.return=e.return,ge=t;break}ge=e.return}}function Xm(n){for(;ge!==null;){var e=ge;try{switch(e.tag){case 0:case 11:case 15:var t=e.return;try{_c(4,e)}catch(l){xt(e,t,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){xt(e,r,l)}}var s=e.return;try{Dh(e)}catch(l){xt(e,s,l)}break;case 5:var o=e.return;try{Dh(e)}catch(l){xt(e,o,l)}}}catch(l){xt(e,e.return,l)}if(e===n){ge=null;break}var a=e.sibling;if(a!==null){a.return=e.return,ge=a;break}ge=e.return}}var Hb=Math.ceil,Kl=ki.ReactCurrentDispatcher,Dd=ki.ReactCurrentOwner,On=ki.ReactCurrentBatchConfig,Je=0,Bt=null,Ct=null,Xt=0,yn=0,Fs=vr(0),Nt=0,la=null,qr=0,xc=0,Id=0,Bo=null,un=null,Ud=0,to=1/0,bi=null,Zl=!1,Fh=null,ur=null,ll=!1,tr=null,Ql=0,Ho=0,Oh=null,Sl=-1,El=0;function on(){return(Je&6)!==0?Et():Sl!==-1?Sl:Sl=Et()}function hr(n){return(n.mode&1)===0?1:(Je&2)!==0&&Xt!==0?Xt&-Xt:wb.transition!==null?(El===0&&(El=Lv()),El):(n=it,n!==0||(n=window.event,n=n===void 0?16:zv(n.type)),n)}function ei(n,e,t,i){if(50<Ho)throw Ho=0,Oh=null,Error(ie(185));fa(n,t,i),((Je&2)===0||n!==Bt)&&(n===Bt&&((Je&2)===0&&(xc|=t),Nt===4&&Zi(n,Xt)),gn(n,i),t===1&&Je===0&&(e.mode&1)===0&&(to=Et()+500,mc&&_r()))}function gn(n,e){var t=n.callbackNode;wC(n,e);var i=Ul(n,n===Bt?Xt:0);if(i===0)t!==null&&em(t),n.callbackNode=null,n.callbackPriority=0;else if(e=i&-i,n.callbackPriority!==e){if(t!=null&&em(t),e===1)n.tag===0?Mb(jm.bind(null,n)):i0(jm.bind(null,n)),xb(function(){(Je&6)===0&&_r()}),t=null;else{switch(Nv(i)){case 1:t=ad;break;case 4:t=Rv;break;case 16:t=Il;break;case 536870912:t=Pv;break;default:t=Il}t=n_(t,$0.bind(null,n))}n.callbackPriority=e,n.callbackNode=t}}function $0(n,e){if(Sl=-1,El=0,(Je&6)!==0)throw Error(ie(327));var t=n.callbackNode;if(Ws()&&n.callbackNode!==t)return null;var i=Ul(n,n===Bt?Xt:0);if(i===0)return null;if((i&30)!==0||(i&n.expiredLanes)!==0||e)e=Jl(n,i);else{e=i;var r=Je;Je|=2;var s=Z0();(Bt!==n||Xt!==e)&&(bi=null,to=Et()+500,Br(n,e));do try{Wb();break}catch(a){K0(n,a)}while(1);yd(),Kl.current=s,Je=r,Ct!==null?e=0:(Bt=null,Xt=0,e=Nt)}if(e!==0){if(e===2&&(r=uh(n),r!==0&&(i=r,e=zh(n,r))),e===1)throw t=la,Br(n,0),Zi(n,i),gn(n,Et()),t;if(e===6)Zi(n,i);else{if(r=n.current.alternate,(i&30)===0&&!Vb(r)&&(e=Jl(n,i),e===2&&(s=uh(n),s!==0&&(i=s,e=zh(n,s))),e===1))throw t=la,Br(n,0),Zi(n,i),gn(n,Et()),t;switch(n.finishedWork=r,n.finishedLanes=i,e){case 0:case 1:throw Error(ie(345));case 2:br(n,un,bi);break;case 3:if(Zi(n,i),(i&130023424)===i&&(e=Ud+500-Et(),10<e)){if(Ul(n,0)!==0)break;if(r=n.suspendedLanes,(r&i)!==i){on(),n.pingedLanes|=n.suspendedLanes&r;break}n.timeoutHandle=_h(br.bind(null,n,un,bi),e);break}br(n,un,bi);break;case 4:if(Zi(n,i),(i&4194240)===i)break;for(e=n.eventTimes,r=-1;0<i;){var o=31-Jn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=Et()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Hb(i/1960))-i,10<i){n.timeoutHandle=_h(br.bind(null,n,un,bi),i);break}br(n,un,bi);break;case 5:br(n,un,bi);break;default:throw Error(ie(329))}}}return gn(n,Et()),n.callbackNode===t?$0.bind(null,n):null}function zh(n,e){var t=Bo;return n.current.memoizedState.isDehydrated&&(Br(n,e).flags|=256),n=Jl(n,e),n!==2&&(e=un,un=t,e!==null&&kh(e)),n}function kh(n){un===null?un=n:un.push.apply(un,n)}function Vb(n){for(var e=n;;){if(e.flags&16384){var t=e.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var i=0;i<t.length;i++){var r=t[i],s=r.getSnapshot;r=r.value;try{if(!ti(s(),r))return!1}catch{return!1}}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Zi(n,e){for(e&=~Id,e&=~xc,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var t=31-Jn(e),i=1<<t;n[t]=-1,e&=~i}}function jm(n){if((Je&6)!==0)throw Error(ie(327));Ws();var e=Ul(n,0);if((e&1)===0)return gn(n,Et()),null;var t=Jl(n,e);if(n.tag!==0&&t===2){var i=uh(n);i!==0&&(e=i,t=zh(n,i))}if(t===1)throw t=la,Br(n,0),Zi(n,e),gn(n,Et()),t;if(t===6)throw Error(ie(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,br(n,un,bi),gn(n,Et()),null}function Fd(n,e){var t=Je;Je|=1;try{return n(e)}finally{Je=t,Je===0&&(to=Et()+500,mc&&_r())}}function Yr(n){tr!==null&&tr.tag===0&&(Je&6)===0&&Ws();var e=Je;Je|=1;var t=On.transition,i=it;try{if(On.transition=null,it=1,n)return n()}finally{it=i,On.transition=t,Je=e,(Je&6)===0&&_r()}}function Od(){yn=Fs.current,ht(Fs)}function Br(n,e){n.finishedWork=null,n.finishedLanes=0;var t=n.timeoutHandle;if(t!==-1&&(n.timeoutHandle=-1,_b(t)),Ct!==null)for(t=Ct.return;t!==null;){var i=t;switch(vd(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Bl();break;case 3:Js(),ht(pn),ht(en),Ad();break;case 5:Td(i);break;case 4:Js();break;case 13:ht(pt);break;case 19:ht(pt);break;case 10:Sd(i.type._context);break;case 22:case 23:Od()}t=t.return}if(Bt=n,Ct=n=dr(n.current,null),Xt=yn=e,Nt=0,la=null,Id=xc=qr=0,un=Bo=null,Ir!==null){for(e=0;e<Ir.length;e++)if(t=Ir[e],i=t.interleaved,i!==null){t.interleaved=null;var r=i.next,s=t.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}t.pending=i}Ir=null}return n}function K0(n,e){do{var t=Ct;try{if(yd(),_l.current=$l,Yl){for(var i=mt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Yl=!1}if(jr=0,Ot=Lt=mt=null,zo=!1,sa=0,Dd.current=null,t===null||t.return===null){Nt=1,la=e,Ct=null;break}e:{var s=n,o=t.return,a=t,l=e;if(e=Xt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=a,f=u.tag;if((u.mode&1)===0&&(f===0||f===11||f===15)){var h=u.alternate;h?(u.updateQueue=h.updateQueue,u.memoizedState=h.memoizedState,u.lanes=h.lanes):(u.updateQueue=null,u.memoizedState=null)}var p=Dm(o);if(p!==null){p.flags&=-257,Im(p,o,a,s,e),p.mode&1&&Nm(s,c,e),e=p,l=c;var v=e.updateQueue;if(v===null){var _=new Set;_.add(l),e.updateQueue=_}else v.add(l);break e}else{if((e&1)===0){Nm(s,c,e),zd();break e}l=Error(ie(426))}}else if(dt&&a.mode&1){var m=Dm(o);if(m!==null){(m.flags&65536)===0&&(m.flags|=256),Im(m,o,a,s,e),_d(eo(l,a));break e}}s=l=eo(l,a),Nt!==4&&(Nt=2),Bo===null?Bo=[s]:Bo.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var d=D0(s,l,e);Tm(s,d);break e;case 1:a=l;var g=s.type,x=s.stateNode;if((s.flags&128)===0&&(typeof g.getDerivedStateFromError=="function"||x!==null&&typeof x.componentDidCatch=="function"&&(ur===null||!ur.has(x)))){s.flags|=65536,e&=-e,s.lanes|=e;var y=I0(s,a,e);Tm(s,y);break e}}s=s.return}while(s!==null)}J0(t)}catch(C){e=C,Ct===t&&t!==null&&(Ct=t=t.return);continue}break}while(1)}function Z0(){var n=Kl.current;return Kl.current=$l,n===null?$l:n}function zd(){(Nt===0||Nt===3||Nt===2)&&(Nt=4),Bt===null||(qr&268435455)===0&&(xc&268435455)===0||Zi(Bt,Xt)}function Jl(n,e){var t=Je;Je|=2;var i=Z0();(Bt!==n||Xt!==e)&&(bi=null,Br(n,e));do try{Gb();break}catch(r){K0(n,r)}while(1);if(yd(),Je=t,Kl.current=i,Ct!==null)throw Error(ie(261));return Bt=null,Xt=0,Nt}function Gb(){for(;Ct!==null;)Q0(Ct)}function Wb(){for(;Ct!==null&&!mC();)Q0(Ct)}function Q0(n){var e=t_(n.alternate,n,yn);n.memoizedProps=n.pendingProps,e===null?J0(n):Ct=e,Dd.current=null}function J0(n){var e=n;do{var t=e.alternate;if(n=e.return,(e.flags&32768)===0){if(t=Fb(t,e,yn),t!==null){Ct=t;return}}else{if(t=Ob(t,e),t!==null){t.flags&=32767,Ct=t;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{Nt=6,Ct=null;return}}if(e=e.sibling,e!==null){Ct=e;return}Ct=e=n}while(e!==null);Nt===0&&(Nt=5)}function br(n,e,t){var i=it,r=On.transition;try{On.transition=null,it=1,Xb(n,e,t,i)}finally{On.transition=r,it=i}return null}function Xb(n,e,t,i){do Ws();while(tr!==null);if((Je&6)!==0)throw Error(ie(327));t=n.finishedWork;var r=n.finishedLanes;if(t===null)return null;if(n.finishedWork=null,n.finishedLanes=0,t===n.current)throw Error(ie(177));n.callbackNode=null,n.callbackPriority=0;var s=t.lanes|t.childLanes;if(TC(n,s),n===Bt&&(Ct=Bt=null,Xt=0),(t.subtreeFlags&2064)===0&&(t.flags&2064)===0||ll||(ll=!0,n_(Il,function(){return Ws(),null})),s=(t.flags&15990)!==0,(t.subtreeFlags&15990)!==0||s){s=On.transition,On.transition=null;var o=it;it=1;var a=Je;Je|=4,Dd.current=null,kb(n,t),q0(t,n),hb(gh),Fl=!!mh,gh=mh=null,n.current=t,Bb(t),gC(),Je=a,it=o,On.transition=s}else n.current=t;if(ll&&(ll=!1,tr=n,Ql=r),s=n.pendingLanes,s===0&&(ur=null),xC(t.stateNode),gn(n,Et()),e!==null)for(i=n.onRecoverableError,t=0;t<e.length;t++)r=e[t],i(r.value,{componentStack:r.stack,digest:r.digest});if(Zl)throw Zl=!1,n=Fh,Fh=null,n;return(Ql&1)!==0&&n.tag!==0&&Ws(),s=n.pendingLanes,(s&1)!==0?n===Oh?Ho++:(Ho=0,Oh=n):Ho=0,_r(),null}function Ws(){if(tr!==null){var n=Nv(Ql),e=On.transition,t=it;try{if(On.transition=null,it=16>n?16:n,tr===null)var i=!1;else{if(n=tr,tr=null,Ql=0,(Je&6)!==0)throw Error(ie(331));var r=Je;for(Je|=4,ge=n.current;ge!==null;){var s=ge,o=s.child;if((ge.flags&16)!==0){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(ge=c;ge!==null;){var u=ge;switch(u.tag){case 0:case 11:case 15:ko(8,u,s)}var f=u.child;if(f!==null)f.return=u,ge=f;else for(;ge!==null;){u=ge;var h=u.sibling,p=u.return;if(W0(u),u===c){ge=null;break}if(h!==null){h.return=p,ge=h;break}ge=p}}}var v=s.alternate;if(v!==null){var _=v.child;if(_!==null){v.child=null;do{var m=_.sibling;_.sibling=null,_=m}while(_!==null)}}ge=s}}if((s.subtreeFlags&2064)!==0&&o!==null)o.return=s,ge=o;else e:for(;ge!==null;){if(s=ge,(s.flags&2048)!==0)switch(s.tag){case 0:case 11:case 15:ko(9,s,s.return)}var d=s.sibling;if(d!==null){d.return=s.return,ge=d;break e}ge=s.return}}var g=n.current;for(ge=g;ge!==null;){o=ge;var x=o.child;if((o.subtreeFlags&2064)!==0&&x!==null)x.return=o,ge=x;else e:for(o=g;ge!==null;){if(a=ge,(a.flags&2048)!==0)try{switch(a.tag){case 0:case 11:case 15:_c(9,a)}}catch(C){xt(a,a.return,C)}if(a===o){ge=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,ge=y;break e}ge=a.return}}if(Je=r,_r(),fi&&typeof fi.onPostCommitFiberRoot=="function")try{fi.onPostCommitFiberRoot(uc,n)}catch{}i=!0}return i}finally{it=t,On.transition=e}}return!1}function qm(n,e,t){e=eo(t,e),e=D0(n,e,1),n=cr(n,e,1),e=on(),n!==null&&(fa(n,1,e),gn(n,e))}function xt(n,e,t){if(n.tag===3)qm(n,n,t);else for(;e!==null;){if(e.tag===3){qm(e,n,t);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ur===null||!ur.has(i))){n=eo(t,n),n=I0(e,n,1),e=cr(e,n,1),n=on(),e!==null&&(fa(e,1,n),gn(e,n));break}}e=e.return}}function jb(n,e,t){var i=n.pingCache;i!==null&&i.delete(e),e=on(),n.pingedLanes|=n.suspendedLanes&t,Bt===n&&(Xt&t)===t&&(Nt===4||Nt===3&&(Xt&130023424)===Xt&&500>Et()-Ud?Br(n,0):Id|=t),gn(n,e)}function e_(n,e){e===0&&((n.mode&1)===0?e=1:(e=Qa,Qa<<=1,(Qa&130023424)===0&&(Qa=4194304)));var t=on();n=Oi(n,e),n!==null&&(fa(n,e,t),gn(n,t))}function qb(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),e_(n,t)}function Yb(n,e){var t=0;switch(n.tag){case 13:var i=n.stateNode,r=n.memoizedState;r!==null&&(t=r.retryLane);break;case 19:i=n.stateNode;break;default:throw Error(ie(314))}i!==null&&i.delete(e),e_(n,t)}var t_;t_=function(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps||pn.current)hn=!0;else{if((n.lanes&t)===0&&(e.flags&128)===0)return hn=!1,Ub(n,e,t);hn=(n.flags&131072)!==0}else hn=!1,dt&&(e.flags&1048576)!==0&&r0(e,Gl,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;yl(n,e),n=e.pendingProps;var r=Ks(e,en.current);Gs(e,t),r=bd(null,e,i,n,r,t);var s=Rd();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,mn(i)?(s=!0,Hl(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Md(e),r.updater=gc,e.stateNode=r,r._reactInternals=e,Th(e,i,n,t),e=bh(null,e,i,!0,s,t)):(e.tag=0,dt&&s&&gd(e),rn(null,e,r,t),e=e.child),e;case 16:i=e.elementType;e:{switch(yl(n,e),n=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=Kb(i),n=Xn(i,n),r){case 0:e=Ch(null,e,i,n,t);break e;case 1:e=Om(null,e,i,n,t);break e;case 11:e=Um(null,e,i,n,t);break e;case 14:e=Fm(null,e,i,Xn(i.type,n),t);break e}throw Error(ie(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Xn(i,r),Ch(n,e,i,r,t);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Xn(i,r),Om(n,e,i,r,t);case 3:e:{if(z0(e),n===null)throw Error(ie(387));i=e.pendingProps,s=e.memoizedState,r=s.element,l0(n,e),jl(e,i,null,t);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=eo(Error(ie(423)),e),e=zm(n,e,i,t,r);break e}else if(i!==r){r=eo(Error(ie(424)),e),e=zm(n,e,i,t,r);break e}else for(Sn=lr(e.stateNode.containerInfo.firstChild),Mn=e,dt=!0,Yn=null,t=d0(e,null,i,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(Zs(),i===r){e=zi(n,e,t);break e}rn(n,e,i,t)}e=e.child}return e;case 5:return f0(e),n===null&&Eh(e),i=e.type,r=e.pendingProps,s=n!==null?n.memoizedProps:null,o=r.children,vh(i,r)?o=null:s!==null&&vh(i,s)&&(e.flags|=32),O0(n,e),rn(n,e,o,t),e.child;case 6:return n===null&&Eh(e),null;case 13:return k0(n,e,t);case 4:return wd(e,e.stateNode.containerInfo),i=e.pendingProps,n===null?e.child=Qs(e,null,i,t):rn(n,e,i,t),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Xn(i,r),Um(n,e,i,r,t);case 7:return rn(n,e,e.pendingProps,t),e.child;case 8:return rn(n,e,e.pendingProps.children,t),e.child;case 12:return rn(n,e,e.pendingProps.children,t),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,ot(Wl,i._currentValue),i._currentValue=o,s!==null)if(ti(s.value,o)){if(s.children===r.children&&!pn.current){e=zi(n,e,t);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Di(-1,t&-t),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}s.lanes|=t,l=s.alternate,l!==null&&(l.lanes|=t),Mh(s.return,t,e),a.lanes|=t;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ie(341));o.lanes|=t,a=o.alternate,a!==null&&(a.lanes|=t),Mh(o,t,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}rn(n,e,r.children,t),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Gs(e,t),r=zn(r),i=i(r),e.flags|=1,rn(n,e,i,t),e.child;case 14:return i=e.type,r=Xn(i,e.pendingProps),r=Xn(i.type,r),Fm(n,e,i,r,t);case 15:return U0(n,e,e.type,e.pendingProps,t);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Xn(i,r),yl(n,e),e.tag=1,mn(i)?(n=!0,Hl(e)):n=!1,Gs(e,t),u0(e,i,r),Th(e,i,r,t),bh(null,e,i,!0,n,t);case 19:return B0(n,e,t);case 22:return F0(n,e,t)}throw Error(ie(156,e.tag))};function n_(n,e){return bv(n,e)}function $b(n,e,t,i){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Fn(n,e,t,i){return new $b(n,e,t,i)}function kd(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Kb(n){if(typeof n=="function")return kd(n)?1:0;if(n!=null){if(n=n.$$typeof,n===rd)return 11;if(n===sd)return 14}return 2}function dr(n,e){var t=n.alternate;return t===null?(t=Fn(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&14680064,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t}function Ml(n,e,t,i,r,s){var o=2;if(i=n,typeof n=="function")kd(n)&&(o=1);else if(typeof n=="string")o=5;else e:switch(n){case As:return Hr(t.children,r,s,e);case id:o=8,r|=8;break;case $u:return n=Fn(12,t,e,r|2),n.elementType=$u,n.lanes=s,n;case Ku:return n=Fn(13,t,e,r),n.elementType=Ku,n.lanes=s,n;case Zu:return n=Fn(19,t,e,r),n.elementType=Zu,n.lanes=s,n;case hv:return yc(t,r,s,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case cv:o=10;break e;case uv:o=9;break e;case rd:o=11;break e;case sd:o=14;break e;case Yi:o=16,i=null;break e}throw Error(ie(130,n==null?n:typeof n,""))}return e=Fn(o,t,e,r),e.elementType=n,e.type=i,e.lanes=s,e}function Hr(n,e,t,i){return n=Fn(7,n,i,e),n.lanes=t,n}function yc(n,e,t,i){return n=Fn(22,n,i,e),n.elementType=hv,n.lanes=t,n.stateNode={isHidden:!1},n}function Uu(n,e,t){return n=Fn(6,n,null,e),n.lanes=t,n}function Fu(n,e,t){return e=Fn(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function Zb(n,e,t,i,r){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=gu(0),this.expirationTimes=gu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=gu(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Bd(n,e,t,i,r,s,o,a,l){return n=new Zb(n,e,t,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Fn(3,null,null,e),n.current=s,s.stateNode=n,s.memoizedState={element:i,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Md(s),n}function Qb(n,e,t){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Ts,key:i==null?null:""+i,children:n,containerInfo:e,implementation:t}}function i_(n){if(!n)return mr;n=n._reactInternals;e:{if(Jr(n)!==n||n.tag!==1)throw Error(ie(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(mn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ie(171))}if(n.tag===1){var t=n.type;if(mn(t))return n0(n,t,e)}return e}function r_(n,e,t,i,r,s,o,a,l){return n=Bd(t,i,!0,n,r,s,o,a,l),n.context=i_(null),t=n.current,i=on(),r=hr(t),s=Di(i,r),s.callback=e!=null?e:null,cr(t,s,r),n.current.lanes=r,fa(n,r,i),gn(n,i),n}function Sc(n,e,t,i){var r=e.current,s=on(),o=hr(r);return t=i_(t),e.context===null?e.context=t:e.pendingContext=t,e=Di(s,o),e.payload={element:n},i=i===void 0?null:i,i!==null&&(e.callback=i),n=cr(r,e,o),n!==null&&(ei(n,r,o,s),vl(n,r,o)),o}function ec(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Ym(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function Hd(n,e){Ym(n,e),(n=n.alternate)&&Ym(n,e)}function Jb(){return null}var s_=typeof reportError=="function"?reportError:function(n){console.error(n)};function Vd(n){this._internalRoot=n}Ec.prototype.render=Vd.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(ie(409));Sc(n,e,null,null)};Ec.prototype.unmount=Vd.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;Yr(function(){Sc(null,n,null,null)}),e[Fi]=null}};function Ec(n){this._internalRoot=n}Ec.prototype.unstable_scheduleHydration=function(n){if(n){var e=Uv();n={blockedOn:null,target:n,priority:e};for(var t=0;t<Ki.length&&e!==0&&e<Ki[t].priority;t++);Ki.splice(t,0,n),t===0&&Ov(n)}};function Gd(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function Mc(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function $m(){}function e2(n,e,t,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=ec(o);s.call(c)}}var o=r_(e,i,n,0,null,!1,!1,"",$m);return n._reactRootContainer=o,n[Fi]=o.current,ea(n.nodeType===8?n.parentNode:n),Yr(),o}for(;r=n.lastChild;)n.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=ec(l);a.call(c)}}var l=Bd(n,0,!1,null,null,!1,!1,"",$m);return n._reactRootContainer=l,n[Fi]=l.current,ea(n.nodeType===8?n.parentNode:n),Yr(function(){Sc(e,l,t,i)}),l}function wc(n,e,t,i,r){var s=t._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=ec(o);a.call(l)}}Sc(e,o,n,r)}else o=e2(t,e,n,r,i);return ec(o)}Dv=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var t=Co(e.pendingLanes);t!==0&&(ld(e,t|1),gn(e,Et()),(Je&6)===0&&(to=Et()+500,_r()))}break;case 13:Yr(function(){var i=Oi(n,1);if(i!==null){var r=on();ei(i,n,1,r)}}),Hd(n,1)}};cd=function(n){if(n.tag===13){var e=Oi(n,134217728);if(e!==null){var t=on();ei(e,n,134217728,t)}Hd(n,134217728)}};Iv=function(n){if(n.tag===13){var e=hr(n),t=Oi(n,e);if(t!==null){var i=on();ei(t,n,e,i)}Hd(n,e)}};Uv=function(){return it};Fv=function(n,e){var t=it;try{return it=n,e()}finally{it=t}};ah=function(n,e,t){switch(e){case"input":if(eh(n,t),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<t.length;e++){var i=t[e];if(i!==n&&i.form===n.form){var r=pc(i);if(!r)throw Error(ie(90));fv(i),eh(i,r)}}}break;case"textarea":mv(n,t);break;case"select":e=t.value,e!=null&&ks(n,!!t.multiple,e,!1)}};Ev=Fd;Mv=Yr;var t2={usingClientEntryPoint:!1,Events:[ma,Ps,pc,yv,Sv,Fd]},wo={findFiberByHostInstance:Dr,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"},n2={bundleType:wo.bundleType,version:wo.version,rendererPackageName:wo.rendererPackageName,rendererConfig:wo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ki.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=Av(n),n===null?null:n.stateNode},findFiberByHostInstance:wo.findFiberByHostInstance||Jb,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var cl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!cl.isDisabled&&cl.supportsFiber)try{uc=cl.inject(n2),fi=cl}catch{}}An.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=t2;An.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Gd(e))throw Error(ie(200));return Qb(n,e,null,t)};An.createRoot=function(n,e){if(!Gd(n))throw Error(ie(299));var t=!1,i="",r=s_;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Bd(n,1,!1,null,null,t,!1,i,r),n[Fi]=e.current,ea(n.nodeType===8?n.parentNode:n),new Vd(e)};An.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(ie(188)):(n=Object.keys(n).join(","),Error(ie(268,n)));return n=Av(e),n=n===null?null:n.stateNode,n};An.flushSync=function(n){return Yr(n)};An.hydrate=function(n,e,t){if(!Mc(e))throw Error(ie(200));return wc(null,n,e,!0,t)};An.hydrateRoot=function(n,e,t){if(!Gd(n))throw Error(ie(405));var i=t!=null&&t.hydratedSources||null,r=!1,s="",o=s_;if(t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),e=r_(e,null,n,1,t!=null?t:null,r,!1,s,o),n[Fi]=e.current,ea(n),i)for(n=0;n<i.length;n++)t=i[n],r=t._getVersion,r=r(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,r]:e.mutableSourceEagerHydrationData.push(t,r);return new Ec(e)};An.render=function(n,e,t){if(!Mc(e))throw Error(ie(200));return wc(null,n,e,!1,t)};An.unmountComponentAtNode=function(n){if(!Mc(n))throw Error(ie(40));return n._reactRootContainer?(Yr(function(){wc(null,null,n,!1,function(){n._reactRootContainer=null,n[Fi]=null})}),!0):!1};An.unstable_batchedUpdates=Fd;An.unstable_renderSubtreeIntoContainer=function(n,e,t,i){if(!Mc(t))throw Error(ie(200));if(n==null||n._reactInternals===void 0)throw Error(ie(38));return wc(n,e,t,!1,i)};An.version="18.2.0-next-9e3b772b8-20220608";(function(n){function e(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(t){console.error(t)}}e(),n.exports=An})(rv);var o_,Km=rv.exports;o_=Km.createRoot,Km.hydrateRoot;const i2=()=>de.exports.jsx("svg",{width:"32",height:"32",viewBox:"0 0 23 23",fill:"none",role:"img","aria-label":"Fire",children:de.exports.jsx("path",{d:"M11.8801 21.1467C15.6955 21.1467 18.8299 18.1231 18.8299 14.2423C18.8299 13.2895 18.7815 12.2682 18.2534 10.6809C17.7253 9.09364 17.6189 8.88875 17.0605 7.90849C16.822 9.90891 15.5455 10.7426 15.2212 10.9918C15.2212 10.7326 14.449 7.86587 13.2783 6.15063C12.1289 4.46695 10.5659 3.36235 9.64936 2.61365C9.64936 4.03595 9.24932 6.15063 8.67642 7.2281C8.10351 8.30557 7.99593 8.34481 7.28032 9.14664C6.56476 9.94847 6.23631 10.1961 5.63792 11.169C5.03956 12.142 4.93024 13.4378 4.93024 14.3905C4.93024 18.2714 8.06478 21.1467 11.8801 21.1467Z",fill:"#D97205",stroke:"#C81B51",strokeWidth:"2",strokeLinejoin:"round"})}),Zm=()=>de.exports.jsxs("svg",{width:"32",height:"22",viewBox:"0 0 36 22",fill:"none",role:"img","aria-label":"Control",children:[de.exports.jsx("path",{d:"M24.7091 0H11.2909C5.07273 0 0 4.87143 0 10.8429V11.1571C0 17.1286 5.07273 22 11.2909 22H24.7091C30.9273 22 36 17.1286 36 11.1571V10.8429C36 4.87143 30.9273 0 24.7091 0ZM32.7273 11.1571C32.7273 15.4 29.1273 18.8571 24.7091 18.8571H11.2909C6.87273 18.8571 3.27273 15.4 3.27273 11.1571V10.8429C3.27273 6.6 6.87273 3.14286 11.2909 3.14286H24.7091C29.1273 3.14286 32.7273 6.6 32.7273 10.8429V11.1571Z",fill:"white"}),de.exports.jsx("path",{d:"M14.0074 9.51852H12.8667V8.48148C12.8667 7.59259 12.2148 7 11.237 7C10.2593 7 9.60741 7.59259 9.60741 8.48148V9.51852H8.62963C7.65185 9.51852 7 10.1111 7 11C7 11.8889 7.65185 12.4815 8.62963 12.4815H9.77037V13.5185C9.77037 14.4074 10.4222 15 11.4 15C12.3778 15 13.0296 14.4074 13.0296 13.5185V12.4815H14.1704C15.1481 12.4815 15.8 11.8889 15.8 11C15.8 10.1111 14.9852 9.51852 14.0074 9.51852ZM22.8074 11.1481C23.0856 11.1481 23.3611 11.0983 23.6181 11.0015C23.8752 10.9048 24.1087 10.7629 24.3054 10.5841C24.5021 10.4052 24.6582 10.1929 24.7647 9.95924C24.8711 9.72558 24.9259 9.47514 24.9259 9.22222C24.9259 8.96931 24.8711 8.71887 24.7647 8.4852C24.6582 8.25154 24.5021 8.03923 24.3054 7.86039C24.1087 7.68155 23.8752 7.53968 23.6181 7.4429C23.3611 7.34611 23.0856 7.2963 22.8074 7.2963C22.2455 7.2963 21.7067 7.49921 21.3094 7.86039C20.9121 8.22157 20.6889 8.71144 20.6889 9.22222C20.6889 9.73301 20.9121 10.2229 21.3094 10.5841C21.7067 10.9452 22.2455 11.1481 22.8074 11.1481ZM26.8815 14.8519C27.4433 14.8519 27.9822 14.6489 28.3795 14.2878C28.7768 13.9266 29 13.4367 29 12.9259C29 12.4151 28.7768 11.9253 28.3795 11.5641C27.9822 11.2029 27.4433 11 26.8815 11C26.3196 11 25.7808 11.2029 25.3835 11.5641C24.9862 11.9253 24.763 12.4151 24.763 12.9259C24.763 13.4367 24.9862 13.9266 25.3835 14.2878C25.7808 14.6489 26.3196 14.8519 26.8815 14.8519Z",fill:"white"})]}),Pt=n=>de.exports.jsx("span",{style:{fontFamily:n.mono?"monospace, monospace":'"Lato", sans-serif',fontWeight:300,letterSpacing:1.03,lineHeight:1.65,fontSize:n.size||15,fontStyle:"normal",color:n.color||"#FFFFFF"},children:n.children}),Qm={inDemo:{icon:Zm,label:()=>de.exports.jsxs("div",{children:[de.exports.jsx(Pt,{color:"#f5e6d0",children:"\u6309"}),de.exports.jsx(Pt,{children:" "}),de.exports.jsx(Pt,{color:"#f5e6d0",size:16,children:de.exports.jsx("b",{children:"\u56DE\u8F66\u952E"})}),de.exports.jsx(Pt,{children:" "}),de.exports.jsx(Pt,{color:"#f5e6d0",children:de.exports.jsx("b",{children:"\u5F00\u59CB\u6E38\u620F\uFF01"})})]})},gameOver:{icon:Zm,label:()=>de.exports.jsxs("div",{children:[de.exports.jsx(Pt,{color:"#f5e6d080",children:"\u6309"}),de.exports.jsx(Pt,{children:" "}),de.exports.jsx(Pt,{color:"#f5e6d0CC",size:16,children:de.exports.jsx("b",{children:"\u56DE\u8F66\u952E"})}),de.exports.jsx(Pt,{children:" "}),de.exports.jsx(Pt,{color:"#f5e6d0CC",children:de.exports.jsx("b",{children:"\u518D\u6765\u4E00\u5C40\uFF01"})})]})},mini:{icon:null,label:null,minimized:!0}},r2=n=>{var o,a;const[e,t]=bt.exports.useState("inDemo"),i=bt.exports.useRef(null),r=bt.exports.useRef(null),s=()=>{i.current,r.current=requestAnimationFrame(s)};return bt.exports.useEffect(()=>(document.addEventListener("keydown",l=>{l.key==="Enter"&&n.onAction()}),kt.subscribe(["status"],l=>{l.status==="playing"?t("mini"):l.status==="gameOver"&&t("gameOver")}),r.current=requestAnimationFrame(s),()=>{typeof r.current=="number"&&cancelAnimationFrame(r.current)}),[]),de.exports.jsxs(de.exports.Fragment,{children:[de.exports.jsx("div",{className:kt.state.status!=="gameOver"?"hidden":"visible",style:{height:"50%",bottom:0,position:"absolute",animation:"opacity 2s linear",background:"linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))",width:"100%"}}),de.exports.jsxs("div",{style:{position:"absolute",bottom:96,left:"calc(50% - 130px)",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:260,height:120,overflow:"hidden",gap:20,transform:"scale(1.25)"},children:[e!=="mini"&&de.exports.jsx("div",{style:{animation:"rotate 1.2s linear infinite",width:66,height:66,background:"conic-gradient(from 90deg, rgb(232 149 109), rgb(180 100 60), rgb(210 160 100), rgb(232 149 109))",margin:10,borderRadius:"50%",position:"absolute",bottom:40}}),de.exports.jsx("div",{style:{width:60,height:60,borderRadius:"50%",background:"#2a1f14",display:"flex",justifyContent:"center",alignItems:"center",cursor:"pointer",zIndex:1},ref:i,"data-test":"cta-button",onPointerUp:n.onAction,children:e!=="mini"&&((o=Qm[e])==null?void 0:o.icon())}),e!=="mini"&&((a=Qm[e])==null?void 0:a.label())]})]})},Jm=n=>{const e=bt.exports.useRef(null),t=bt.exports.useRef(null),i=()=>{if(e.current){const r=performance.now()/1600,s=Math.cos(r)*12+window.innerWidth*n.x,o=Math.sin(r)*12+window.innerHeight*n.y;e.current.style.transform=`translate3d(${s}px, ${o}px, 0)`,Nn.set(`${n.publishPosition}_x`,s+(n.hook==="right"?n.w+12:0)),Nn.set(`${n.publishPosition}_y`,o+n.h/2+4)}t.current=requestAnimationFrame(i)};return bt.exports.useEffect(()=>(t.current=requestAnimationFrame(i),()=>{typeof t.current=="number"&&cancelAnimationFrame(t.current)}),[]),de.exports.jsx("div",{ref:e,style:{position:"absolute"},children:de.exports.jsx("div",{style:{position:"absolute",background:"#3a2a1880",borderRadius:12,width:n.w,height:n.h,padding:6},children:de.exports.jsxs("div",{style:{background:"#3a2a18",borderRadius:12,width:n.w,height:n.h,padding:16,boxSizing:"border-box",paddingTop:42},children:[de.exports.jsx("div",{style:{position:"absolute",top:19,left:22,width:"100%",display:"flex"},children:de.exports.jsx(Pt,{size:11,color:"#FFFFFF99",children:n.header.toUpperCase()})}),n.children]})})})},ai=n=>{const e=n.w||1;return de.exports.jsx("div",{style:{background:"#8b2510",overflow:"hidden",width:14*e,height:14,borderRadius:2,display:"inline-flex",justifyContent:"center",alignItems:"center",margin:"0 2px",padding:3},children:de.exports.jsx(Pt,{size:13,children:n.label})})},eg=n=>{const e=String(n),t=4;return[...new Array(t-e.length).fill("_"),...e].join("")},s2=()=>{const[n,e]=bt.exports.useState(0),[t,i]=bt.exports.useState(Number(localStorage.getItem("bestScore"))||0),[r,s]=bt.exports.useState(!0);bt.exports.useEffect(()=>{kt.subscribe(["score","bestScore"],l=>{i(l.bestScore),e(l.score)}),kt.subscribe(["status"],l=>{l.status!=="inDemo"&&s(!1)})},[]);const o=eg(n),a=eg(t);return de.exports.jsxs("div",{style:{position:"absolute",top:32,right:32,height:60,display:"flex",gap:12,transformOrigin:"top right",transform:"scale(1.20)"},children:[!r&&de.exports.jsx(Pt,{size:24,mono:!0,children:o}),de.exports.jsx(i2,{}),de.exports.jsx(Pt,{size:24,mono:!0,children:a}),de.exports.jsx("div",{style:{position:"absolute",right:-5,bottom:10},children:de.exports.jsx(Pt,{size:10,color:"#FFFFFFDD",children:"BEST SCORE"})})]})},tg=n=>{const e=bt.exports.useRef(null),t=bt.exports.useRef(null),i=bt.exports.useRef(null),r=()=>{e.current&&t.current&&(e.current.setAttribute("x1",Nn.get(`${n.subPositionStart}_x`)),e.current.setAttribute("y1",Nn.get(`${n.subPositionStart}_y`)),e.current.setAttribute("x2",Nn.get(`${n.subPositionEnd}_x`)),e.current.setAttribute("y2",Nn.get(`${n.subPositionEnd}_y`)),t.current.setAttribute("cx",Nn.get(`${n.subPositionEnd}_x`)),t.current.setAttribute("cy",Nn.get(`${n.subPositionEnd}_y`))),i.current=requestAnimationFrame(r)};return bt.exports.useEffect(()=>(i.current=requestAnimationFrame(r),()=>cancelAnimationFrame(i.current)),[]),de.exports.jsxs("svg",{style:{position:"absolute",pointerEvents:"none"},width:"100vw",height:"100vh",role:"img","aria-label":"A line connecting two points",children:[de.exports.jsx("line",{ref:e,x1:"0",y1:"0",x2:"0",y2:"0",stroke:"#F16883",strokeWidth:"2",strokeDasharray:"5, 5",children:de.exports.jsx("animate",{attributeName:"stroke-dashoffset",values:"100;0",dur:"3s",calcMode:"linear",repeatCount:"indefinite"})}),de.exports.jsx("circle",{ref:t,cx:"0",cy:"0",r:"12",fill:"#F16883"})]})},ng=["left","right","up","down","left","right","up","down","left","right","up","down","fall","fall","fall","rotate","rotate","rotate","rotate","camera_rotate_right","camera_rotate_left"],o2=()=>{setInterval(()=>{if(kt.state.status!=="inDemo")return;const n=.1;if(Math.random()<n){const e=ng[Math.floor(Math.random()*ng.length)],t=rt.controls[e];if(!t)return;document.dispatchEvent(t)}},30)};const a2=()=>{const[n,e]=bt.exports.useState(!0),t=()=>{["inDemo","gameOver"].includes(kt.state.status)&&(e(!1),setTimeout(()=>{kt.changeStatus("playing")},200))};return bt.exports.useEffect(()=>{o2()},[]),de.exports.jsxs(de.exports.Fragment,{children:[de.exports.jsxs("div",{className:n?"":"hidden",children:[de.exports.jsx(tg,{subPositionStart:"legend1",subPositionEnd:"active_box"}),de.exports.jsx(Jm,{header:"\u79FB\u52A8\u63A7\u5236",hook:"right",dots:1,publishPosition:"legend1",w:220,h:156,x:.18,y:.15,children:de.exports.jsxs(Pt,{size:15,children:["\u4F7F\u7528 ",de.exports.jsx(ai,{label:"\u2190"}),de.exports.jsx(ai,{label:"\u2191"}),de.exports.jsx(ai,{label:"\u2192"}),de.exports.jsx(ai,{label:"\u2193"})," \u79FB\u52A8\u65B9\u5757\uFF0C\u6309 ",de.exports.jsx(ai,{label:"r"})," \u65CB\u8F6C\u3002",de.exports.jsx("br",{}),"\u6309 ",de.exports.jsx(ai,{label:"\u7A7A\u683C",w:5})," \u5FEB\u901F\u843D\u4E0B\u3002"]})}),de.exports.jsx(tg,{subPositionStart:"legend2",subPositionEnd:"stage"}),de.exports.jsx(Jm,{header:"\u89C6\u89D2\u65CB\u8F6C",hook:"left",dots:2,publishPosition:"legend2",w:174,h:128,x:.7,y:.5,children:de.exports.jsxs(Pt,{size:15,children:["\u6309 ",de.exports.jsx(ai,{label:"shift",w:3}),de.exports.jsxs(Pt,{color:"#d4502a",size:13,children:[" ","+"," "]}),de.exports.jsx(ai,{label:"\u2192"}),de.exports.jsx("br",{}),"\u6216 ",de.exports.jsx(ai,{label:"shift",w:3}),de.exports.jsxs(Pt,{color:"#d4502a",size:13,children:[" ","+"," "]}),de.exports.jsx(ai,{label:"\u2190"})," ",de.exports.jsx("br",{}),"\u65CB\u8F6C\u821E\u53F0\u3002"]})})]}),de.exports.jsx(r2,{onAction:t}),de.exports.jsx(s2,{})]})};o_(document.getElementById("react-root")).render(de.exports.jsx(a2,{}));