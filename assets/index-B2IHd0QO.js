(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const oe={lessonTime:90,countdown:3,lastRush:20,biteTime:.6,stowTime:.25,mouthWindow:.6,perfectWindow:.3,assistTurnMul:1.5,caughtFreeze:1.2,strikes:3,susp:{decay:8,alert:60,sightDesk:14,sightEat:55,bookMul:.25,bookRate:3,smokeRate:6,sniffRate:28,afterCaught:30,afterChalk:55,noiseGain:60,noiseCap:25,tattle:25,comboBreak:15},vision:{podiumHalf:35,patrolHalf:45,range:12,proctorRange:6},noise:{low:.2,mid:.4,high:.9,falloff:8,thrBack:.4,thrFace:.25,rustle:.15,burpMul:3,burpChance:.2,classmateTurn:.7,attention:.1,fanHum:.05},smell:{low:.15,mid:.3,high:.6,extreme:1,diffuse:.25,windowMul:2,sniffThr:.35,max:1.5},teacher:{write:[2.5,6],turn:[.5,1],look:[1.5,3],patrolPrep:1.2,patrolDur:[8,14],walkSpeed:1.8,rollPrep:1.5,rollName:.9,rollWindow:1.5,sniff:1.8,rushMul:.6,alertMul:.7,ngMul:.8,lessonShrink:.08,minWrite:1.2,firstWrite:3,firstTurn:1,firstLook:2,pauseChance:.4,pauseTime:1.5},chalk:{warn:.7,flight:.45,stun:1,cooldown:6},score:{bite:10,serving:20,perfect:30,comboStep:.25,comboCap:4,rollOk:20,rollMiss:50,reflect:50,underQuotaMul:.6,dayClear:300,pointsPer:10},items:{fanCd:20,decoyCd:25,decoyTime:3,bribeTime:10,sleepCd:15,sleepTime:3},finale:{work:[3,6],turn:[.6,1],look:[1.5,2.5],approach:1.5,serveWindow:2,react:2.2,craveStep:6,craveQuality:8,cravePassive:1.5,craveReady:7}},Do={classroom:{lessons:3,baseQuota:2,writeMul:1,noiseThrMul:1,book:!0,chalk:!0,maxPatrol:2,maxRoll:1},library:{lessons:3,baseQuota:2,writeMul:.92,noiseThrMul:.5,book:!0,chalk:!0,maxPatrol:2,maxRoll:1},exam:{lessons:3,baseQuota:1,writeMul:.85,noiseThrMul:1,book:!1,chalk:!1,maxPatrol:1,maxRoll:1},office:{lessons:1,baseQuota:0,writeMul:1,noiseThrMul:1,book:!1,chalk:!1,maxPatrol:0,maxRoll:0}},Uo=["classroom","library","exam","office"];class Ds{s;constructor(e){this.s=e>>>0||1}next(){let e=this.s+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}range(e,t){return e+(t-e)*this.next()}int(e,t){return Math.floor(this.range(e,t+1))}chance(e){return this.next()<e}pick(e){return e[Math.floor(this.next()*e.length)]}shuffle(e){const t=e.slice();for(let n=t.length-1;n>0;n--){const i=Math.floor(this.next()*(n+1));[t[n],t[i]]=[t[i],t[n]]}return t}}const ri=6,wi=5,Jh=1.5,Pa=1.35,La=2.2,qt=s=>(s-2.5)*Jh,zt=s=>La+s*Pa,it={col:0,row:3},je=qt(it.col),He=zt(it.row),un=[-3,-1.5,0,1.5,3],Us=1.2,kr=8.5,Nr=(s,e,t,n)=>Math.hypot(s-t,e-n),Mt=(s,e,t)=>Math.max(e,Math.min(t,s));function Ia(s,e){let t=(s-e)%(Math.PI*2);return t>Math.PI&&(t-=Math.PI*2),t<-Math.PI&&(t+=Math.PI*2),t}const ft=oe.teacher,Qh=s=>(s=Mt(s,0,1),s*s*(3-2*s));class eu{constructor(e,t){this.rng=e,this.cfg=t}state="write";t=0;dur=ft.firstWrite;x=-.8;z=0;yaw=Math.PI;log=[];path=[];pi=0;speed=ft.walkSpeed;pauseT=0;pausedOnce=!1;resume=null;savedT=0;savedDur=0;sniffed=new Set;sniffTarget=null;patrols=0;rolls=0;since=0;cycles=0;turnFrom=Math.PI;rollQueue=[];rollI=0;onEnter=()=>{};get callingYou(){return this.state==="rollcall"&&!!this.rollQueue[this.rollI]}get visionOn(){return this.state==="looking"||this.state==="rollcall"||this.state==="patrol"||this.state==="sniff"||this.state==="chalkAim"}get onPodium(){return this.state!=="patrol"&&this.state!=="sniff"&&!(this.state==="chalkAim"&&this.resume==="patrol")}get visionHalf(){return this.onPodium?oe.vision.podiumHalf:oe.vision.patrolHalf}get visionYaw(){return this.state==="looking"||this.state==="rollcall"?0:this.yaw}get facingClass(){return this.state!=="write"&&this.state!=="turning"}enter(e,t){this.log.push({state:this.state,dur:this.t});const n=this.state;this.state=e,this.t=0,this.dur=t,e==="turning"&&(this.turnFrom=this.yaw),this.onEnter(e,n)}turnDur(e=!1){const t=e?ft.firstTurn:this.rng.range(ft.turn[0],ft.turn[1]);return Math.max(ft.turn[0],(t+this.cfg.turnBonus)*(this.cfg.assist?oe.assistTurnMul:1))}writeDur(e){let t=this.rng.range(ft.write[0],ft.write[1])*this.cfg.writeMul;return e.timeLeft<=oe.lastRush&&(t*=ft.rushMul),e.alert&&(t*=ft.alertMul),this.cfg.ng&&(t*=ft.ngMul),Math.max(ft.minWrite,t)}forceTurn(){this.state==="write"&&this.enter("turning",this.turnDur())}hurry(){this.state==="write"&&(this.dur=Math.min(this.dur,this.t+.3))}startChalk(){return this.state==="chalkAim"||this.state==="rollcall"||this.state==="rollPrep"||this.state==="patrolPrep"?!1:(this.resume=this.state==="sniff"?"patrol":this.state,this.savedT=this.t,this.savedDur=this.dur,this.enter("chalkAim",oe.chalk.warn),!0)}reset(){this.x=-.8,this.z=0,this.yaw=Math.PI,this.pauseT=0,this.resume=null,this.enter("write",3)}nextRoll(){this.rollI++,this.rollI>=this.rollQueue.length?this.enter("write",2.5):this.enter("rollcall",this.rollQueue[this.rollI]?ft.rollWindow*(this.cfg.assist?oe.assistTurnMul:1):ft.rollName)}step(e,t){switch(this.t+=e,this.state){case"write":this.x=-.8+Math.sin(t.time*.35)*.9,this.yaw=Math.PI,this.t>=this.dur&&this.enter("turning",this.turnDur(this.cycles===0));break;case"turning":this.yaw=this.turnFrom*(1-Qh(this.t/this.dur)),this.t>=this.dur&&this.enter("looking",this.cycles===0?ft.firstLook:this.rng.range(ft.look[0],ft.look[1]));break;case"looking":this.yaw=.25*Math.sin(this.t*2.2),this.t>=this.dur&&this.afterLook(t);break;case"patrolPrep":this.yaw=0,this.t>=this.dur&&(this.buildPath(),this.enter("patrol",99));break;case"patrol":this.movePatrol(e,t);break;case"sniff":this.sniffTarget&&this.face(this.sniffTarget,e,8),this.t>=this.dur&&this.enter("patrol",99);break;case"rollPrep":if(this.yaw=0,this.t>=this.dur){const n=this.rng.chance(.7);this.rollQueue=n?this.rng.chance(.5)?[!1,!0]:[!1,!1,!0]:[!1,!1],this.rollI=-1,this.nextRoll()}break;case"rollcall":this.yaw=0,this.t>=this.dur&&this.nextRoll();break;case"chalkAim":if(this.face({x:je,z:He},e,12),this.t>=this.dur){const n=this.resume;this.resume=null,n==="patrol"?this.enter("patrol",99):this.enter("turning",this.turnDur())}break}}face(e,t,n){const i=Math.atan2(e.x-this.x,e.z-this.z),r=Ia(i,this.yaw);this.yaw+=Mt(r,-n*t,n*t)}afterLook(e){if(this.cycles++,this.since++,e.time>(this.cfg.tutorial?22:12)&&this.since>=2){const n=this.cfg.maxPatrol>0&&this.patrols===0&&e.time>38,i=this.rng.next();if(this.patrols<this.cfg.maxPatrol&&(n||i<.3)&&e.timeLeft>17){this.patrols++,this.since=0,this.enter("patrolPrep",ft.patrolPrep);return}if(this.rolls<this.cfg.maxRoll&&i<.52&&e.timeLeft>8){this.rolls++,this.since=0,this.enter("rollPrep",ft.rollPrep);return}}this.enter("write",this.writeDur(e))}buildPath(){const e=this.patrols===1?0:this.rng.int(0,un.length-1);let t=this.rng.int(0,un.length-1);t===e&&(t=(e+2)%un.length),this.path=[{x:un[e],z:Us},{x:un[e],z:kr},{x:un[t],z:kr},{x:un[t],z:Us},{x:-.8,z:0}];let n=0,i=this.x,r=this.z;for(const a of this.path)n+=Math.hypot(a.x-i,a.z-r),i=a.x,r=a.z;const o=Mt(n/ft.walkSpeed,ft.patrolDur[0],ft.patrolDur[1]);this.speed=n/o,this.pi=0,this.pausedOnce=!1}movePatrol(e,t){if(this.pauseT>0){this.pauseT-=e,this.face({x:je,z:He},e,6);return}const n=this.path[this.pi];if(!n){this.enter("write",this.writeDur(t));return}const i=n.x-this.x,r=n.z-this.z,o=Math.hypot(i,r),a=this.speed*e;if(o<=a){this.x=n.x,this.z=n.z,this.pi++,this.pi>=this.path.length&&(this.yaw=Math.PI,this.enter("write",this.writeDur(t)));return}this.x+=i/o*a,this.z+=r/o*a,this.face({x:this.x+i,z:this.z+r},e,7);const l=un.indexOf(n.x);if(l>=0&&Math.abs(i)<.01){const c=Math.round((this.z-La)/Pa);if(c>=0&&c<wi&&Math.abs(this.z-zt(c))<.12){const h=`${this.patrols}:${this.pi}:${c}`;if(!this.sniffed.has(h)){this.sniffed.add(h);const u=t.sniff(l,c);if(u){this.sniffTarget=u,this.enter("sniff",ft.sniff);return}l===0&&c===it.row&&!this.pausedOnce&&this.rng.chance(ft.pauseChance)&&(this.pausedOnce=!0,this.pauseT=ft.pauseTime)}}}}}class ml{constructor(e,t=1.1){this.kind=e,this.speed=t;const n=un[0],i=un[4];this.path=[{x:i,z:Us},{x:i,z:kr},{x:n,z:kr},{x:n,z:Us}],this.x=i,this.z=Us}x;z;yaw=0;pi=1;sniffT=0;sniffTarget=null;path;lap=0;sniffed=new Set;get sees(){return this.kind==="proctor"}get sniffing(){return this.sniffT>0}step(e,t){if(this.sniffT>0){this.sniffT-=e,this.sniffTarget&&this.face(this.sniffTarget,e);return}const n=this.path[this.pi],i=n.x-this.x,r=n.z-this.z,o=Math.hypot(i,r),a=this.speed*e;if(o<=a){this.x=n.x,this.z=n.z,this.pi=(this.pi+1)%this.path.length,this.pi===1&&this.lap++;return}this.x+=i/o*a,this.z+=r/o*a,this.face({x:this.x+i,z:this.z+r},e);const l=un.indexOf(n.x);if(l>=0&&Math.abs(i)<.01){const c=Math.round((this.z-La)/Pa);if(c>=0&&c<wi&&Math.abs(this.z-zt(c))<.1){const h=`${this.lap}:${this.pi}:${c}`;if(!this.sniffed.has(h)){this.sniffed.add(h);const u=t(l,c);u&&(this.sniffTarget=u,this.sniffT=oe.teacher.sniff)}}}}face(e,t){const n=Ia(Math.atan2(e.x-this.x,e.z-this.z),this.yaw);this.yaw+=Mt(n,-6*t,6*t)}}class tu{x=-4.6;z=-1;yaw;t=0;off=6;warn=1.2;on=3.5;constructor(e,t){this.yaw=Math.atan2(e-this.x,t-this.z)}get phase(){const e=this.t%(this.off+this.warn+this.on);return e<this.off?"off":e<this.off+this.warn?"warn":"on"}step(e){this.t+=e}}function nu(s){const e=[],t=["doze","note","pen","idle","idle"];for(let n=0;n<wi;n++)for(let i=0;i<ri;i++)i===it.col&&n===it.row||e.push({col:i,row:n,anim:s.pick(t),phase:s.range(0,6.28),girl:s.chance(.5),tint:s.range(.9,1.05)});return e}function iu(s){let e=s.int(1,ri-1),t=s.int(0,2);return e===it.col&&t===it.row&&(e=2),{time:s.range(14,40),col:e,row:t}}class su{constructor(e=6,t=5){this.cols=e,this.rows=t,this.c=new Float32Array(e*t),this.tmp=new Float32Array(e*t),this.decayMul=new Float32Array(e*t).fill(1)}c;tmp;decayMul;idx(e,t){return t*this.cols+e}inside(e,t){return e>=0&&t>=0&&e<this.cols&&t<this.rows}at(e,t){return this.inside(e,t)?this.c[this.idx(e,t)]:0}emit(e,t,n){this.inside(e,t)&&(this.c[this.idx(e,t)]+=n)}move(e,t,n,i){if(!this.inside(e,t)||!this.inside(n,i))return 0;const r=this.c[this.idx(e,t)];return this.c[this.idx(n,i)]+=r,this.c[this.idx(e,t)]=0,r}total(){let e=0;for(const t of this.c)e+=t;return e}step(e,t=1){const{cols:n,rows:i,c:r,tmp:o}=this,a=Math.min(.2,oe.smell.diffuse*t*e);for(let l=0;l<i;l++)for(let c=0;c<n;c++){const h=l*n+c;let u=0,d=0;c>0&&(u+=r[h-1],d++),c<n-1&&(u+=r[h+1],d++),l>0&&(u+=r[h-n],d++),l<i-1&&(u+=r[h+n],d++),o[h]=r[h]+a*(u-d*r[h])}for(let l=0;l<r.length;l++){const c=l%n===0?oe.smell.windowMul:1,h=o[l]*Math.exp(-.12*c*this.decayMul[l]*e);r[l]=h<1e-4?0:h}}}function ru(s,e){return s/(1+(e/oe.noise.falloff)**2)}function gl(s,e,t){const n=s?oe.noise.thrFace:oe.noise.thrBack;return Math.max(.03,n*e-(t?oe.noise.attention:0))}function _l(s,e,t){const n=ru(s,e)-t;return n>0?Math.min(oe.susp.noiseCap,n*oe.susp.noiseGain):0}function xl(s,e,t,n,i,r,o){const a=r-s,l=o-e,c=Math.hypot(a,l);return c>i?!1:c<.01?!0:Math.abs(Ia(Math.atan2(a,l),t))<=n*Math.PI/180}function ou(s){return 1+oe.score.comboStep*s}function au(s,e,t=1){return Math.round(oe.score.bite*s*ou(e)*t)}function lu(s,e=1){return Math.floor(s/oe.score.pointsPer*e)}const Rn=oe.noise,Cn=oe.smell,nh={latiao:{id:"latiao",tier:1,bites:4,noise:Rn.low,smell:Cn.mid,color:"red",chew:"soft"},chips:{id:"chips",tier:1,bites:5,noise:Rn.high,smell:Cn.low,color:"yellow",chew:"crunch"},jelly:{id:"jelly",tier:1,bites:3,noise:Rn.low,smell:Cn.low,color:"pink",chew:"soft"},noodles:{id:"noodles",tier:2,bites:6,noise:Rn.mid,smell:Cn.high,color:"yellow",chew:"slurp",prep:[{key:"soak",time:3,soak:!0}]},luosifen:{id:"luosifen",tier:3,bites:6,noise:Rn.mid,smell:Cn.extreme,spread:2,color:"green",chew:"slurp"},durian:{id:"durian",tier:3,bites:4,noise:Rn.low,smell:Cn.extreme,color:"leaf",chew:"soft",prep:[{key:"peel1",time:.8},{key:"peel2",time:.8}]},hotpot:{id:"hotpot",tier:4,bites:10,noise:Rn.mid,smell:Cn.high,color:"orange",chew:"slurp",smoke:!0,prep:[{key:"setpot",time:1.5},{key:"fire",time:1.5}]},teppan:{id:"teppan",tier:4,bites:8,noise:Rn.high,smell:Cn.high,color:"meat",chew:"sizzle",sizzle:!0},lamb:{id:"lamb",tier:5,bites:14,noise:Rn.high,smell:Cn.extreme,color:"orange",chew:"crunch"}};function cu(s,e,t={}){let n;return s==="classroom"?n=e===0?["latiao","chips"]:["latiao","chips","noodles"]:s==="library"?n=e===0?["chips","noodles","luosifen"]:["noodles","luosifen","durian"]:n=e===0?["luosifen","durian","hotpot"]:["durian","hotpot","teppan"],t.extraSnack&&s==="classroom"&&(n=[...n,"jelly"]),t.lamb&&s==="exam"&&e===2&&(n=[...n,"lamb"]),n}const ih=[{id:"saliva",tag:"silent",pool:"base"},{id:"earplug",tag:"silent",pool:"base"},{id:"quietbag",tag:"silent",pool:"base",noCost:!0},{id:"snakejaw",tag:"gulp",pool:"base"},{id:"chug",tag:"gulp",pool:"base"},{id:"digest",tag:"gulp",pool:"base",noCost:!0},{id:"fan",tag:"frame",pool:"base",active:!0},{id:"blame",tag:"frame",pool:"base"},{id:"decoy",tag:"frame",pool:"base",active:!0},{id:"share",tag:"bribe",pool:"base",active:!0},{id:"monitor",tag:"bribe",pool:"base"},{id:"bookwall",tag:"tough",pool:"base"},{id:"exhaust",tag:"tough",pool:"base"},{id:"deskkitchen",tag:"tough",pool:"base"},{id:"steelbook",tag:"guard",pool:"base",noCost:!0},{id:"playdead",tag:"guard",pool:"base",active:!0},{id:"gourmet",tag:"score",pool:"base"},{id:"combohigh",tag:"score",pool:"base"},{id:"heat",tag:"cook",pool:"cook"},{id:"spice",tag:"cook",pool:"cook"},{id:"knife",tag:"cook",pool:"cook"},{id:"lookout",tag:"duo",pool:"duo"},{id:"relay",tag:"duo",pool:"duo"},{id:"scapegoat",tag:"duo",pool:"duo"}],Da=Object.fromEntries(ih.map(s=>[s.id,s]));function sh(s,e){return s.filter(t=>Da[t]?.tag===e).length}function hu(s,e,t,n=[],i=3){const r=ih.filter(o=>t.includes(o.pool)&&!e.includes(o.id)&&!n.includes(o.id));return s.shuffle(r).slice(0,i)}function uu(s,e){return sh(s,e.tag)+1}function du(s,e,t){const n=s.slice();return n.length>=t&&n.shift(),n.push(e),n}const en=oe.susp;class ko{rng;cfg;scene;lessonIdx;ups;slots;perks;phase="countdown";countdown=oe.countdown;time=0;freezeT=0;teacher;extras=[];cam=null;npcs;npcScript;smell=new su;food=null;foodState="hidden";stowT=0;biteProg=0;mouthT=0;stunT=0;bookUp=!1;biteCount=0;locked=!1;susp=0;strikes;score=0;combo=0;servings=0;quota;perfects=0;sight=0;sound=0;seen=!1;events=[];cds=[0,0];shieldT=0;sleepT=0;distractT=0;attentionT=0;chalk=null;chalkCd=0;stareCd=0;rollPending=!1;monitorUsed=!1;sniffMeT=0;fanBlownT=0;tattleAt=-1;grudge=!1;mercy;scapegoat;scapegoatUsed;bribes;frames=0;god;result=null;eatAtTurn=!1;lastEatStop=-9;perfectUsed=!0;eatNeedsRelease=!1;sizzleT=0;lastFood="";pool;opts;constructor(e){this.opts=e,this.scene=e.scene,this.lessonIdx=e.lessonIdx,this.cfg=Do[e.scene],this.rng=new Ds(e.seed),this.ups=new Set(e.upgrades??[]),this.slots=(e.slots??[]).slice(),this.perks=new Set(e.perks??[]),this.strikes=e.strikes??0,this.mercy=e.mercy??0,this.scapegoat=e.scapegoat??0,this.scapegoatUsed=!!e.scapegoatUsed,this.bribes=e.bribes??0,this.god=!!e.god,this.quota=this.cfg.baseQuota+e.lessonIdx+1+(this.has("gourmet")?1:0),this.pool=cu(e.scene,e.lessonIdx,{extraSnack:e.extraSnack,lamb:e.lamb});const t=e.scene==="classroom"&&e.lessonIdx===0;this.teacher=new eu(this.rng,{writeMul:this.cfg.writeMul*(1-oe.teacher.lessonShrink*e.lessonIdx),assist:!!e.assist,ng:!!e.ng,maxPatrol:this.cfg.maxPatrol,maxRoll:this.cfg.maxRoll,tutorial:t,turnBonus:(this.perks.has("tell")?.15:0)+(this.has("lookout")?.3:0)}),this.teacher.onEnter=(n,i)=>this.onTeacher(n,i),e.scene==="library"&&this.extras.push(new ml("librarian",1.1)),e.scene==="exam"&&(this.extras.push(new ml("proctor",1)),this.cam=new tu(je+1,He)),this.npcs=nu(new Ds(e.seed^24301)),this.npcScript=iu(new Ds(e.seed^48879)),this.has("exhaust")&&(this.smell.decayMul[this.smell.idx(it.col,it.row)]=2),this.nextFood(t?"latiao":void 0)}has(e){return this.ups.has(e)}tags(e){return sh([...this.ups],e)}emit(e){this.events.push(e)}drain(){const e=this.events;return this.events=[],e}get timeLeft(){return Math.max(0,oe.lessonTime-this.time)}get alertLevel(){return en.alert+(this.perks.has("goodkid")?10:0)}get alert(){return this.susp>=this.alertLevel}get smoking(){return!!this.food&&this.food.lit&&!!this.food.def.smoke}get safe(){return this.foodState==="hidden"&&!this.smoking}get mouthFull(){return this.foodState==="eating"||this.mouthT>0}get prepping(){return!!this.food&&this.food.prepStep<(this.food.def.prep?.length??0)}get biteTime(){if(this.has("chug"))return 1.5;let e=oe.biteTime-(this.perks.has("chew")?.05:0);return this.has("snakejaw")&&(e*=.6),this.has("saliva")&&(e+=.2),this.tags("gulp")>=2&&(e*=.9),this.bookUp&&this.has("bookwall")&&(e/=.8),e}get mouthWindow(){return oe.mouthWindow*(this.has("digest")?.3:1)}get stowTime(){return this.has("relay")?0:oe.stowTime}get comboCap(){return oe.score.comboCap+(this.has("combohigh")?3:0)}get scoreMul(){return(this.has("spice")?1.25:1)*(this.has("lookout")?.9:1)*(this.scapegoatUsed?.85:1)}noiseMul(e){let t=1;this.has("earplug")&&(t*=.7),e&&e.chew==="crunch"&&this.has("saliva")&&(t*=.4);const n=this.tags("silent");return n>=2&&(t*=1-.15*(n-1)),this.has("knife")&&(t*=1.2),t}itemCd(e){return(e==="fan"?oe.items.fanCd:e==="decoy"?oe.items.decoyCd:e==="playdead"?oe.items.sleepCd:1)*(this.tags("frame")>=2&&(e==="fan"||e==="decoy")?.7:1)}nextFood(e){let t=e??this.rng.pick(this.pool);if(!e&&this.pool.length>1)for(;t===this.lastFood;)t=this.rng.pick(this.pool);this.lastFood=t;const n=nh[t],i=Math.max(2,n.bites-(this.has("knife")&&n.tier>=3?2:0));this.food={def:n,bitesLeft:i,total:i,prepStep:0,prepProg:0,lit:!1},this.foodState="hidden",this.biteProg=0,this.stowT=0,this.locked=!1,this.emit({type:"food",id:t})}addSusp(e){e<=0||this.safe||(this.susp=Math.min(100,this.susp+e*(this.opts.ng?1.2:1)))}breakCombo(){this.combo>0&&this.has("combohigh")&&this.addSusp(en.comboBreak),this.combo=0}hear(e){this.has("exhaust")&&(e+=oe.noise.fanHum),this.sound=Math.max(this.sound,Math.min(1,e));const t=this.teacher,n=gl(t.facingClass,this.cfg.noiseThrMul,this.attentionT>0);let i=_l(e,Nr(t.x,t.z,je,He),n);for(const r of this.extras)i=Math.max(i,_l(e,Nr(r.x,r.z,je,He),gl(!0,this.cfg.noiseThrMul,this.attentionT>0)));i>0&&(this.addSusp(i),this.emit({type:"heard",add:i}),this.alert&&t.hurry()),e>=oe.noise.classmateTurn&&this.tags("silent")<3&&(this.attentionT=3,this.emit({type:"classmateTurn"}))}onTeacher(e,t){t==="rollcall"&&this.rollPending&&(this.rollPending=!1,this.score=Math.max(0,this.score-oe.score.rollMiss),this.combo=0,this.emit({type:"rollMiss"})),t==="chalkAim"&&this.phase==="play"&&e!=="write"&&(this.chalk={t:0,dur:oe.chalk.flight,from:{x:this.teacher.x,z:this.teacher.z}},this.emit({type:"chalkThrow"})),e==="turning"?(this.eatAtTurn=this.foodState==="eating"||this.time-this.lastEatStop<.2,this.perfectUsed=!1,this.emit({type:"turnWarn",from:t,silent:this.has("earplug")})):e==="looking"?this.emit({type:"look"}):e==="patrolPrep"?this.emit({type:"clap"}):e==="rollPrep"?this.emit({type:"rollStart"}):e==="chalkAim"?this.emit({type:"chalkAim"}):e==="write"?this.emit({type:"writeStart"}):e==="rollcall"&&(this.teacher.callingYou?this.has("monitor")&&!this.monitorUsed?(this.monitorUsed=!0,this.emit({type:"rollOk",monitor:!0}),this.teacher.dur=.6):(this.rollPending=!0,this.emit({type:"rollYou"})):this.emit({type:"rollName"}))}answerRoll(){if(!(!this.rollPending||this.phase!=="play")){if(this.rollPending=!1,this.mouthFull||this.sleepT>0){this.emit({type:"mumble"}),this.caught("roll");return}this.score+=oe.score.rollOk,this.emit({type:"rollOk"}),this.teacher.nextRoll()}}useItem(e){const t=this.slots[e];if(!t||this.phase!=="play"||this.cds[e]>0||this.stunT>0)return!1;const n=oe.items;if(t==="fan")this.smell.move(it.col,it.row,it.col+1,it.row)>.05&&(this.fanBlownT=12);else if(t==="decoy")this.distractT=n.decoyTime,this.teacher.visionOn&&this.frames++;else if(t==="share"){if(!this.food||this.food.bitesLeft<=1)return!1;this.food.bitesLeft--,this.bribes++,this.frames++,this.shieldT=n.bribeTime+(this.tags("bribe")>=2?4:0),this.has("monitor")&&this.bribes>3&&this.rng.chance(.25)&&(this.tattleAt=this.time+3)}else if(t==="playdead")this.sleepT=n.sleepTime,this.foodState==="eating"&&(this.foodState="desk",this.biteProg=0);else return!1;return this.cds[e]=this.itemCd(t),this.emit({type:"item",id:t}),!0}sniffAt(e,t){const n=this.smell.at(e,t),i=this.smell.at(e+1,t);if(Math.max(n,i)<oe.smell.sniffThr)return null;let r=n>=i?e:e+1;const o=this.scene!=="classroom";return r===it.col&&t===it.row?this.has("blame")&&this.rng.chance(.5)?(r=it.col+1,this.frames++,this.grudge=!0,this.tattleAt=this.time+this.rng.range(8,14),this.emit({type:"frame",col:r,row:t}),this.emit({type:"sniff",me:!1,drool:o})):(this.sniffMeT=oe.teacher.sniff,this.emit({type:"sniff",me:!0,drool:o})):(this.fanBlownT>0&&r===it.col+1&&t===it.row&&(this.frames++,this.fanBlownT=0,this.emit({type:"frame",col:r,row:t})),this.emit({type:"sniff",me:!1,drool:o})),{x:qt(r),z:zt(t)}}bite(){const e=this.food,t=this.has("chug")?Math.min(3,e.bitesLeft):1;e.bitesLeft-=t,this.biteProg=0,this.locked=!1;let n=e.def.noise*this.noiseMul(e.def);for(let r=0;r<t;r++)this.biteCount++,this.has("snakejaw")&&this.biteCount%3===0&&this.rng.chance(oe.noise.burpChance)&&(n=Math.max(n,e.def.noise*oe.noise.burpMul*this.noiseMul()),this.emit({type:"burp"}));const i=au(e.def.tier,this.combo,this.scoreMul*(this.has("gourmet")&&e.def.tier>=4?1.5:1))*t;if(this.score+=i,this.emit({type:"bite",food:e.def.id,chew:e.def.chew,gain:i,n:t}),this.hear(n),e.bitesLeft<=0){this.servings++;const r=Math.round(oe.score.serving*e.def.tier*this.scoreMul);this.score+=r,this.emit({type:"serving",food:e.def.id,bonus:r,quotaMet:this.servings===this.quota}),this.mouthT=this.mouthWindow,this.lastEatStop=this.time,this.nextFood()}}caught(e){if(this.god){this.susp=40;return}this.phase="freeze",this.freezeT=oe.caughtFreeze;let t=!1;this.mercy>0?(this.mercy--,t=!0):this.scapegoat>0&&(this.scapegoat--,this.scapegoatUsed=!0,t=!0),t||this.strikes++,this.breakCombo(),this.emit({type:"caught",why:e,free:t,strikes:this.strikes})}afterFreeze(){if(this.strikes>=oe.strikes){this.phase="over",this.result="parents",this.emit({type:"parents"});return}this.phase="play",this.susp=en.afterCaught,this.chalk=null,this.rollPending=!1,this.sniffMeT=0,this.nextFood(),this.mouthT=0,this.teacher.reset()}step(e,t){if(this.phase==="over")return;if(this.phase==="countdown"){this.countdown-=e,this.countdown<=0&&(this.phase="play",this.emit({type:"start"}));return}if(this.phase==="freeze"){this.freezeT-=e,this.freezeT<=0&&this.afterFreeze();return}this.time+=e;const n=this.food;for(let p=0;p<2;p++)this.cds[p]=Math.max(0,this.cds[p]-e);this.shieldT=Math.max(0,this.shieldT-e),this.sleepT=Math.max(0,this.sleepT-e),this.distractT=Math.max(0,this.distractT-e),this.attentionT=Math.max(0,this.attentionT-e),this.fanBlownT=Math.max(0,this.fanBlownT-e),this.chalkCd=Math.max(0,this.chalkCd-e),this.stareCd=Math.max(0,this.stareCd-e);const i=this.stunT>0||this.sleepT>0;this.stunT>0&&(this.stunT-=e),this.bookUp=t.book&&this.cfg.book&&!i,i&&(this.locked=!1);const r=t.hide&&!this.locked&&!i;if(t.eat||(this.eatNeedsRelease=!1),r&&t.eat&&this.foodState!=="hidden"&&(this.eatNeedsRelease=!0),(t.eat&&!this.eatNeedsRelease||this.locked)&&!r&&!i?(this.foodState==="hidden"&&(this.emit({type:"takeout"}),this.has("quietbag")||this.hear(oe.noise.rustle*this.noiseMul())),this.foodState="eating",this.stowT=0):this.foodState==="eating"&&(this.foodState="desk",this.biteProg=0,this.lastEatStop=this.time),r&&this.foodState==="desk"&&this.stowT<=0){this.stowT=Math.max(1e-4,this.stowTime);const p=oe.perfectWindow*(this.opts.assist?oe.assistTurnMul:1);if(!this.perfectUsed&&this.teacher.state==="turning"&&this.teacher.t<=p&&this.eatAtTurn){this.perfectUsed=!0,this.perfects++,this.combo=Math.min(this.comboCap,this.combo+1);const f=oe.score.perfect*(this.tags("score")>=2?2:1);this.score+=f,this.emit({type:"perfect",bonus:f,combo:this.combo})}}this.stowT>0&&this.foodState==="desk"&&(this.stowT-=e,this.stowT<=0&&(this.has("relay")?this.hear(.3*this.noiseMul()):this.has("quietbag")||this.hear(oe.noise.rustle*this.noiseMul()),this.foodState="hidden",this.emit({type:"stow"})));const a=this.has("heat")?2:1;let l=0;const c=(this.has("spice")?1.3:1)*(this.has("heat")?1.2:1);if(this.prepping&&(this.foodState==="eating"||this.foodState==="hidden"&&this.has("deskkitchen")&&n.prepProg+n.prepStep>0)){const p=n.def.prep[n.prepStep];n.prepProg+=e*a,p.soak&&(l=n.def.smell*.6),n.prepProg>=p.time&&(n.prepProg=0,n.prepStep++,n.def.smoke&&n.prepStep>=n.def.prep.length&&(n.lit=!0),this.emit({type:"prep",key:p.key,done:!this.prepping}))}else this.foodState==="eating"&&(this.has("chug")&&(this.locked=!0),this.biteProg+=e/this.biteTime,l=n.def.smell,this.biteProg>=1&&this.bite());this.foodState==="eating"?this.mouthT=this.mouthWindow:this.mouthT=Math.max(0,this.mouthT-e),this.smoking&&(l=Math.max(l,n.def.smell*.5)),this.food&&this.food.def.sizzle&&this.foodState!=="hidden"&&(this.sizzleT-=e,this.sizzleT<=0&&(this.sizzleT=.5,this.hear(.5*this.noiseMul()),this.emit({type:"sizzle"}))),l>0&&this.smell.emit(it.col,it.row,l*c*e),this.smell.step(e,l>0?this.food?.def.spread??1:1),this.sound=Math.max(this.has("exhaust")?oe.noise.fanHum:0,this.sound-e*1.2);const h=(p,f)=>this.sniffAt(p,f);this.teacher.step(e,{time:this.time,timeLeft:this.timeLeft,alert:this.alert,sniff:h});for(const p of this.extras)p.step(e,h);if(this.cam?.step(e),this.phase!=="play")return;this.npcScript&&this.time>=this.npcScript.time&&this.teacher.state==="looking"&&(this.emit({type:"npcCaught",col:this.npcScript.col,row:this.npcScript.row}),this.npcScript=null),this.tattleAt>0&&this.time>=this.tattleAt&&(this.tattleAt=-1,this.grudge=!1,this.emit({type:"tattle"}),this.addSusp(en.tattle),this.teacher.forceTurn());const u=this.teacher,d=oe.vision;let m=!1;if(this.sleepT<=0&&this.distractT<=0){u.visionOn&&!(u.onPodium&&this.shieldT>0)&&xl(u.x,u.z,u.visionYaw,u.visionHalf,d.range,je,He)&&(m=!0);for(const p of this.extras)p.sees&&xl(p.x,p.z,p.yaw,d.patrolHalf,d.proctorRange,je,He)&&(m=!0);this.cam&&this.cam.phase==="on"&&(m=!0)}this.seen=m;let g=0;m&&(this.foodState==="eating"?g=en.sightEat:this.foodState==="desk"?g=en.sightDesk:this.smoking&&(g=en.smokeRate*(this.has("deskkitchen")?1.5:1)),this.bookUp&&this.foodState!=="hidden"&&(g*=en.bookMul)),this.bookUp&&this.foodState!=="hidden"&&!this.has("bookwall")&&(g+=en.bookRate),this.sight+=((m?this.foodState==="eating"?1:this.foodState==="desk"?.5:this.smoking?.25:.08:0)-this.sight)*Math.min(1,e*10),this.addSusp(g*e);const _=this.sniffMeT>0;if(_&&(this.sniffMeT-=e,this.addSusp(en.sniffRate*e)),this.safe&&!_){const p=(en.decay+(this.perks.has("decay")?2:0))*(this.tags("tough")>=2?1.25:1);this.susp=Math.max(0,this.susp-p*e)}if(this.chalk&&(this.chalk.t+=e,this.chalk.t>=this.chalk.dur&&(this.chalk=null,this.chalkCd=oe.chalk.cooldown,this.susp=Math.min(this.susp,en.afterChalk),this.bookUp?(this.emit({type:"chalkBlock",reflect:this.has("steelbook")}),this.has("steelbook")&&(this.score+=oe.score.reflect)):this.sleepT<=0&&!this.god?(this.stunT=oe.chalk.stun*(this.tags("guard")>=2?.5:1),this.foodState!=="hidden"&&(this.foodState="hidden",this.biteProg=0,this.stowT=0,this.locked=!1),this.breakCombo(),this.emit({type:"chalkHit"})):this.emit({type:"chalkMiss"}))),this.susp>=100){if(m&&this.foodState==="eating"){this.caught("sight");return}this.cfg.chalk?this.chalkCd<=0&&!this.chalk&&u.startChalk():this.stareCd<=0&&(this.stareCd=6,this.susp=90,this.emit({type:"stare"}),u.forceTurn())}this.time>=oe.lessonTime&&(this.phase="over",this.result="bell",this.emit({type:"bell"}))}get quotaMet(){return this.servings>=this.quota}get finalScore(){return Math.round(this.score*(this.quotaMet?1:oe.score.underQuotaMul))}}class fu{constructor(e){this.o=e,this.scene=e.scene,this.rng=new Ds(e.seed),this.maxSlots=e.nodes.includes("bag")?2:1,this.mercy=e.perks.includes("mercy")?1:0}scene;lessonIdx=0;strikes=0;score=0;upgrades=[];slots=[];maxSlots;bribes=0;mercy;scapegoat=0;scapegoatUsed=!1;servings=0;frames=0;perfects=0;lesson;rng;over=null;get total(){return Do[this.scene].lessons}get isLast(){return this.lessonIdx>=this.total-1}startLesson(){return this.lesson=new ko({scene:this.scene,lessonIdx:this.lessonIdx,seed:this.rng.int(1,2**30),upgrades:this.upgrades,slots:this.slots,perks:this.o.perks,assist:this.o.assist,ng:this.o.ng,strikes:this.strikes,extraSnack:this.o.nodes.includes("awaken"),lamb:this.o.nodes.includes("chef"),mercy:this.mercy,scapegoat:this.scapegoat,scapegoatUsed:this.scapegoatUsed,bribes:this.bribes,god:this.o.god}),this.lesson}endLesson(){const e=this.lesson,t=e.finalScore;return this.score+=t,this.strikes=e.strikes,this.bribes=e.bribes,this.mercy=e.mercy,this.scapegoat=e.scapegoat,this.scapegoatUsed=e.scapegoatUsed,this.servings+=e.servings,this.frames+=e.frames,this.perfects+=e.perfects,e.result==="parents"?this.over="parents":this.isLast&&(this.over="clear",this.score+=oe.score.dayClear),{gained:t,quotaMet:e.quotaMet,canPick:e.quotaMet&&!this.over}}choices(){const e=["base"];this.o.nodes.includes("mentor")&&e.push("cook"),this.o.nodes.includes("network")&&e.push("duo");const t=Do[this.scene].book?[]:["bookwall","steelbook"];return hu(this.rng,this.upgrades,e,t)}pick(e){this.upgrades.push(e),Da[e].active&&(this.slots=du(this.slots,e,this.maxSlots)),e==="scapegoat"&&(this.scapegoat=1)}next(){this.lessonIdx++}}const No=[{key:"starter",steps:[{key:"chop",kind:"rhythm"},{key:"season",kind:"hold"},{key:"plate",kind:"drag"}]},{key:"main",steps:[{key:"chop",kind:"rhythm"},{key:"sear",kind:"hold"},{key:"season",kind:"rhythm"},{key:"plate",kind:"drag"}]},{key:"dessert",steps:[{key:"whisk",kind:"rhythm"},{key:"torch",kind:"hold"},{key:"plate",kind:"drag"}]}],Dt=oe.finale,pu=2,Er=[.68,.86],Si=4,ks=.6,vl=.16,Fo=3;function mu(s,e,t,n){const i=.7*s*e+.3*t;return Mt(Math.round(1+2*i)-n,1,3)}function gu(s){return s>=7?"grand":s>=4?"ok":"parents"}class _u{constructor(e,t=!1){this.assist=t,this.rng=new Ds(e)}rng;time=0;events=[];dishI=0;stepI=0;qualities=[];stars=[];crave=0;missed=0;phase="cook";phaseT=0;dState="work";dT=0;dDur=4;active=!1;prog=0;beat=0;hits=0;placed=0;dragQ=0;lastReact=0;emit(e){this.events.push(e)}drain(){const e=this.events;return this.events=[],e}get dish(){return No[this.dishI]}get step_(){return this.dish?.steps[this.stepI]}get dishDone(){return!!this.dish&&this.stepI>=this.dish.steps.length}get completion(){return this.dish?this.stepI/this.dish.steps.length:1}get watching(){return this.dState==="looking"&&this.phase==="cook"}get total(){return this.stars.reduce((e,t)=>e+t,0)}finishStep(e){e=Mt(e,0,1),this.qualities.push(e),this.active=!1,this.prog=0,this.stepI++,this.crave=Math.min(100,this.crave+Dt.craveStep+Dt.craveQuality*e),this.emit({type:"stepDone",q:e,dishDone:this.dishDone})}interrupt(){this.active&&(this.active=!1,this.prog=0,this.beat=0,this.hits=0,this.placed=0,this.dragQ=0,this.emit({type:"interrupt"}))}press(){const e=this.step_;if(!(this.phase!=="cook"||!e)){if(e.kind==="hold")this.active||(this.active=!0,this.prog=0,this.emit({type:"stepStart"}));else if(e.kind==="rhythm"){if(!this.active){this.active=!0,this.prog=0,this.beat=0,this.hits=0,this.emit({type:"stepStart"});return}const t=(this.beat+1)*ks;Math.abs(this.prog-t)<=vl*(this.assist?1.4:1)?(this.hits++,this.emit({type:"beatHit"}),this.beat++,this.beat>=Si&&this.finishStep(this.hits/Si)):this.emit({type:"beatMiss"})}}}release(){const e=this.step_;if(!(this.phase!=="cook"||!e||!this.active)&&e.kind==="hold"){const t=this.prog,[n,i]=Er,r=t>=n&&t<=i?1:t<n?Math.max(.1,1-(n-t)*2.2):Math.max(.2,1-(t-i)*4);this.finishStep(r)}}place(e){const t=this.step_;this.phase!=="cook"||!t||t.kind!=="drag"||(this.active||(this.active=!0,this.placed=0,this.dragQ=0),this.placed++,this.dragQ+=Mt(e,0,1),this.emit({type:"placed"}),this.placed>=Fo&&this.finishStep(this.dragQ/Fo))}dragStart(){const e=this.step_;this.phase==="cook"&&e?.kind==="drag"&&!this.active&&(this.active=!0,this.placed=0,this.dragQ=0)}serve(){if(this.phase!=="serve")return;const e=1-Math.abs(this.phaseT-Dt.serveWindow/2)/(Dt.serveWindow/2),t=this.qualities.length,n=t?this.qualities.reduce((r,o)=>r+o,0)/t:0,i=mu(n,this.completion,Mt(e,0,1),this.missed);this.stars.push(i),this.lastReact=i,this.phase="react",this.phaseT=0,this.emit({type:"served",stars:i,dish:this.dishI})}step(e){if(this.phase!=="done")if(this.time+=e,this.phaseT+=e,this.phase==="cook"){this.dT+=e,this.dT>=this.dDur&&(this.dT=0,this.dState==="work"?(this.dState="turning",this.dDur=this.rng.range(Dt.turn[0],Dt.turn[1])*(this.assist?oe.assistTurnMul:1),this.emit({type:"turnWarn"})):this.dState==="turning"?(this.dState="looking",this.dDur=this.rng.range(Dt.look[0],Dt.look[1]),this.emit({type:"look"})):(this.dState="work",this.dDur=this.rng.range(Dt.work[0],Dt.work[1]),this.emit({type:"writeStart"}))),this.watching&&this.active&&this.interrupt();const t=this.step_;this.active&&t&&(t.kind==="hold"?(this.prog+=e/pu,this.prog>=1.15&&this.finishStep(.2)):t.kind==="rhythm"&&(this.prog+=e,this.prog>(this.beat+1)*ks+vl*1.5&&(this.beat++,this.emit({type:"beatMiss"}),this.beat>=Si&&this.finishStep(this.hits/Si)))),this.crave=Math.min(100,this.crave+(this.dishDone?Dt.craveReady:Dt.cravePassive*this.completion)*e),this.crave>=100&&(this.interrupt(),this.phase="approach",this.phaseT=0,this.dState="looking",this.emit({type:"approach"}))}else this.phase==="approach"?this.phaseT>=Dt.approach&&(this.phase="serve",this.phaseT=0,this.emit({type:"serveWindow"})):this.phase==="serve"?this.phaseT>=Dt.serveWindow*(this.assist?1.5:1)&&(this.missed=Math.min(2,this.missed+1),this.crave=55,this.phase="cook",this.phaseT=0,this.dState="work",this.dT=0,this.dDur=3,this.emit({type:"serveMiss"})):this.phase==="react"&&this.phaseT>=Dt.react&&(this.dishI++,this.stepI=0,this.qualities=[],this.crave=0,this.missed=0,this.active=!1,this.dishI>=No.length?(this.phase="done",this.emit({type:"finaleDone",total:this.total})):(this.phase="cook",this.phaseT=0,this.dState="work",this.dT=0,this.dDur=4,this.emit({type:"nextDish"})))}}class xu{eatSrc=new Set;hideSrc=new Set;bookSrc=new Set;set(e,t,n){const i=e==="eat"?this.eatSrc:e==="hide"?this.hideSrc:this.bookSrc;n?i.add(t):i.delete(t)}cancelAll(){this.eatSrc.clear(),this.hideSrc.clear(),this.bookSrc.clear()}get input(){return{eat:this.eatSrc.size>0,hide:this.hideSrc.size>0,book:this.bookSrc.size>0}}}class vu{paused=!1;acc=0;step=1/60;tick(e,t){if(this.paused)return 0;this.acc+=Math.min(e,.1);let n=0;for(;this.acc>=this.step;)t(this.step),this.acc-=this.step,n++;return n}}const Ua="michelin-under-desk-save",rh=2;function Bs(){return{v:rh,points:0,best:0,cleared:{classroom:!1,library:!1,exam:!1,office:!1},nodes:[],perks:[],stats:{servings:0,frames:0,runs:0},ending:null,ngUnlocked:!1,ngOn:!1,seenIntro:!1,settings:{lang:"en",volume:.6,muted:!1,reduceMotion:!1,assist:!1,tripo:!0}}}function yu(s){const e=Bs();if(!s||typeof s!="object")return e;if(!s.v||s.v<2){const t=Bs();t.points=Number(s.score)||0,t.best=Number(s.best)||0;const n=Array.isArray(s.unlocked)?s.unlocked:[];return n.includes("library")&&(t.cleared.classroom=!0),n.includes("exam")&&(t.cleared.library=!0),n.includes("office")&&(t.cleared.exam=!0),s.settings&&(t.settings={...t.settings,...s.settings}),t}return{...e,...s,v:rh,cleared:{...e.cleared,...s.cleared??{}},stats:{...e.stats,...s.stats??{}},settings:{...e.settings,...s.settings??{}},nodes:Array.isArray(s.nodes)?s.nodes:[],perks:Array.isArray(s.perks)?s.perks:[]}}function bu(s){try{const e=s.getItem(Ua);return e?yu(JSON.parse(e)):Bs()}catch{return Bs()}}function Mu(s,e){try{s.setItem(Ua,JSON.stringify(e))}catch{}}function Su(s){try{s.removeItem(Ua)}catch{}}function Tu(s,e){return e==="classroom"?!0:e==="library"?s.cleared.classroom:e==="exam"?s.cleared.library:s.cleared.exam&&s.nodes.includes("chef")}const oh=[{id:"awaken",cost:40,cond:s=>s.cleared.classroom,lines:6},{id:"bag",cost:90,cond:s=>s.stats.servings>=50,lines:5},{id:"mentor",cost:120,cond:s=>s.cleared.library,lines:6},{id:"network",cost:120,cond:s=>s.stats.frames>=30,lines:5},{id:"chef",cost:160,cond:s=>s.cleared.exam,lines:6}],Eu=[{id:"goodkid",cost:30},{id:"tell",cost:60},{id:"decay",cost:90},{id:"chew",cost:130},{id:"mercy",cost:170},{id:"interest",cost:220}];function ah(s,e){return!s.nodes.includes(e.id)&&e.cond(s)&&s.points>=e.cost}function wu(s,e){return ah(s,e)?(s.points-=e.cost,s.nodes.push(e.id),!0):!1}function Au(s,e){return s.perks.includes(e.id)||s.points<e.cost?!1:(s.points-=e.cost,s.perks.push(e.id),!0)}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ka="170",Ru=0,yl=1,Cu=2,Na=1,Pu=2,Fn=3,Vn=0,Vt=1,dn=2,oi=0,Ki=1,bl=2,Ml=3,Sl=4,Lu=5,bi=100,Iu=101,Du=102,Uu=103,ku=104,Nu=200,Fu=201,Ou=202,Bu=203,Oo=204,Bo=205,zu=206,Hu=207,Vu=208,Gu=209,Wu=210,Xu=211,qu=212,$u=213,Yu=214,zo=0,Ho=1,Vo=2,ts=3,Go=4,Wo=5,Xo=6,qo=7,Fa=0,ju=1,Ku=2,ai=0,Zu=1,Ju=2,Qu=3,ed=4,td=5,nd=6,id=7,Tl="attached",sd="detached",lh=300,ns=301,is=302,$o=303,Yo=304,Hr=306,ss=1e3,ni=1001,Fr=1002,It=1003,ch=1004,Cs=1005,$t=1006,wr=1007,Bn=1008,Gn=1009,hh=1010,uh=1011,zs=1012,Oa=1013,Ai=1014,mn=1015,Ws=1016,Ba=1017,za=1018,rs=1020,dh=35902,fh=1021,ph=1022,rn=1023,mh=1024,gh=1025,Zi=1026,os=1027,Ha=1028,Va=1029,_h=1030,Ga=1031,Wa=1033,Ar=33776,Rr=33777,Cr=33778,Pr=33779,jo=35840,Ko=35841,Zo=35842,Jo=35843,Qo=36196,ea=37492,ta=37496,na=37808,ia=37809,sa=37810,ra=37811,oa=37812,aa=37813,la=37814,ca=37815,ha=37816,ua=37817,da=37818,fa=37819,pa=37820,ma=37821,Lr=36492,ga=36494,_a=36495,xh=36283,xa=36284,va=36285,ya=36286,Hs=2300,Vs=2301,Yr=2302,El=2400,wl=2401,Al=2402,rd=2500,od=0,vh=1,ba=2,ad=3200,ld=3201,Xa=0,cd=1,ti="",At="srgb",Ot="srgb-linear",Vr="linear",rt="srgb",Pi=7680,Rl=519,hd=512,ud=513,dd=514,yh=515,fd=516,pd=517,md=518,gd=519,Ma=35044,_d=35048,Cl="300 es",zn=2e3,Or=2001;class ds{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const Ct=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Pl=1234567;const Ns=Math.PI/180,as=180/Math.PI;function gn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ct[s&255]+Ct[s>>8&255]+Ct[s>>16&255]+Ct[s>>24&255]+"-"+Ct[e&255]+Ct[e>>8&255]+"-"+Ct[e>>16&15|64]+Ct[e>>24&255]+"-"+Ct[t&63|128]+Ct[t>>8&255]+"-"+Ct[t>>16&255]+Ct[t>>24&255]+Ct[n&255]+Ct[n>>8&255]+Ct[n>>16&255]+Ct[n>>24&255]).toLowerCase()}function Lt(s,e,t){return Math.max(e,Math.min(t,s))}function qa(s,e){return(s%e+e)%e}function xd(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function vd(s,e,t){return s!==e?(t-s)/(e-s):0}function Fs(s,e,t){return(1-t)*s+t*e}function yd(s,e,t,n){return Fs(s,e,1-Math.exp(-t*n))}function bd(s,e=1){return e-Math.abs(qa(s,e*2)-e)}function Md(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Sd(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Td(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Ed(s,e){return s+Math.random()*(e-s)}function wd(s){return s*(.5-Math.random())}function Ad(s){s!==void 0&&(Pl=s);let e=Pl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Rd(s){return s*Ns}function Cd(s){return s*as}function Pd(s){return(s&s-1)===0&&s!==0}function Ld(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Id(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Dd(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),m=r((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*m,a*c);break;case"YXY":s.set(l*m,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*m,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function fn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function nt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Ud={DEG2RAD:Ns,RAD2DEG:as,generateUUID:gn,clamp:Lt,euclideanModulo:qa,mapLinear:xd,inverseLerp:vd,lerp:Fs,damp:yd,pingpong:bd,smoothstep:Md,smootherstep:Sd,randInt:Td,randFloat:Ed,randFloatSpread:wd,seededRandom:Ad,degToRad:Rd,radToDeg:Cd,isPowerOfTwo:Pd,ceilPowerOfTwo:Ld,floorPowerOfTwo:Id,setQuaternionFromProperEuler:Dd,normalize:nt,denormalize:fn};class Ge{constructor(e=0,t=0){Ge.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ne{constructor(e,t,n,i,r,o,a,l,c){Ne.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],m=n[5],g=n[8],_=i[0],p=i[3],f=i[6],E=i[1],M=i[4],v=i[7],O=i[2],R=i[5],A=i[8];return r[0]=o*_+a*E+l*O,r[3]=o*p+a*M+l*R,r[6]=o*f+a*v+l*A,r[1]=c*_+h*E+u*O,r[4]=c*p+h*M+u*R,r[7]=c*f+h*v+u*A,r[2]=d*_+m*E+g*O,r[5]=d*p+m*M+g*R,r[8]=d*f+m*v+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,m=c*r-o*l,g=t*u+n*d+i*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*c-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-a*t)*_,e[6]=m*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(jr.makeScale(e,t)),this}rotate(e){return this.premultiply(jr.makeRotation(-e)),this}translate(e,t){return this.premultiply(jr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const jr=new Ne;function bh(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Gs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function kd(){const s=Gs("canvas");return s.style.display="block",s}const Ll={};function Ps(s){s in Ll||(Ll[s]=!0,console.warn(s))}function Nd(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Fd(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Od(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ve={enabled:!0,workingColorSpace:Ot,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===rt&&(s.r=Hn(s.r),s.g=Hn(s.g),s.b=Hn(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===rt&&(s.r=Ji(s.r),s.g=Ji(s.g),s.b=Ji(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ti?Vr:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Hn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ji(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Il=[.64,.33,.3,.6,.15,.06],Dl=[.2126,.7152,.0722],Ul=[.3127,.329],kl=new Ne().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nl=new Ne().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ve.define({[Ot]:{primaries:Il,whitePoint:Ul,transfer:Vr,toXYZ:kl,fromXYZ:Nl,luminanceCoefficients:Dl,workingColorSpaceConfig:{unpackColorSpace:At},outputColorSpaceConfig:{drawingBufferColorSpace:At}},[At]:{primaries:Il,whitePoint:Ul,transfer:rt,toXYZ:kl,fromXYZ:Nl,luminanceCoefficients:Dl,outputColorSpaceConfig:{drawingBufferColorSpace:At}}});let Li;class Bd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Li===void 0&&(Li=Gs("canvas")),Li.width=e.width,Li.height=e.height;const n=Li.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Li}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Gs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Hn(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Hn(t[n]/255)*255):t[n]=Hn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let zd=0;class Mh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zd++}),this.uuid=gn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Kr(i[o].image)):r.push(Kr(i[o]))}else r=Kr(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Kr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Bd.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Hd=0;class wt extends ds{constructor(e=wt.DEFAULT_IMAGE,t=wt.DEFAULT_MAPPING,n=ni,i=ni,r=$t,o=Bn,a=rn,l=Gn,c=wt.DEFAULT_ANISOTROPY,h=ti){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=gn(),this.name="",this.source=new Mh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ge(0,0),this.repeat=new Ge(1,1),this.center=new Ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ne,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==lh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ss:e.x=e.x-Math.floor(e.x);break;case ni:e.x=e.x<0?0:1;break;case Fr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ss:e.y=e.y-Math.floor(e.y);break;case ni:e.y=e.y<0?0:1;break;case Fr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}wt.DEFAULT_IMAGE=null;wt.DEFAULT_MAPPING=lh;wt.DEFAULT_ANISOTROPY=1;class Je{constructor(e=0,t=0,n=0,i=1){Je.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],m=l[5],g=l[9],_=l[2],p=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,v=(m+1)/2,O=(f+1)/2,R=(h+d)/4,A=(u+_)/4,P=(g+p)/4;return M>v&&M>O?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=R/n,r=A/n):v>O?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=R/i,r=P/i):O<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(O),n=A/r,i=P/r),this.set(n,i,r,t),this}let E=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(E)<.001&&(E=1),this.x=(p-g)/E,this.y=(u-_)/E,this.z=(d-h)/E,this.w=Math.acos((c+m+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Vd extends ds{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Je(0,0,e,t),this.scissorTest=!1,this.viewport=new Je(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$t,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new wt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Mh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ri extends Vd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Sh extends wt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=It,this.minFilter=It,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Gd extends wt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=It,this.minFilter=It,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],m=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==m||h!==g){let p=1-a;const f=l*d+c*m+h*g+u*_,E=f>=0?1:-1,M=1-f*f;if(M>Number.EPSILON){const O=Math.sqrt(M),R=Math.atan2(O,f*E);p=Math.sin(p*R)/O,a=Math.sin(a*R)/O}const v=a*E;if(l=l*p+d*v,c=c*p+m*v,h=h*p+g*v,u=u*p+_*v,p===1-a){const O=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=O,c*=O,h*=O,u*=O}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],m=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*m-c*d,e[t+1]=l*g+h*d+c*u-a*m,e[t+2]=c*g+h*m+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),m=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*m*g,this._y=c*m*u-d*h*g,this._z=c*h*g+d*m*u,this._w=c*h*u-d*m*g;break;case"YXZ":this._x=d*h*u+c*m*g,this._y=c*m*u-d*h*g,this._z=c*h*g-d*m*u,this._w=c*h*u+d*m*g;break;case"ZXY":this._x=d*h*u-c*m*g,this._y=c*m*u+d*h*g,this._z=c*h*g+d*m*u,this._w=c*h*u-d*m*g;break;case"ZYX":this._x=d*h*u-c*m*g,this._y=c*m*u+d*h*g,this._z=c*h*g-d*m*u,this._w=c*h*u+d*m*g;break;case"YZX":this._x=d*h*u+c*m*g,this._y=c*m*u+d*h*g,this._z=c*h*g-d*m*u,this._w=c*h*u-d*m*g;break;case"XZY":this._x=d*h*u-c*m*g,this._y=c*m*u-d*h*g,this._z=c*h*g+d*m*u,this._w=c*h*u+d*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(o-i)*m}else if(n>a&&n>u){const m=2*Math.sqrt(1+n-a-u);this._w=(h-l)/m,this._x=.25*m,this._y=(i+o)/m,this._z=(r+c)/m}else if(a>u){const m=2*Math.sqrt(1+a-n-u);this._w=(r-c)/m,this._x=(i+o)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+u-n-a);this._w=(o-i)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Lt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*n+t*this._x,this._y=m*i+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Zr.copy(this).projectOnVector(e),this.sub(Zr)}reflect(e){return this.sub(Zr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Zr=new L,Fl=new bn;class Mn{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ln):ln.fromBufferAttribute(r,o),ln.applyMatrix4(e.matrixWorld),this.expandByPoint(ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ys.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ys.copy(n.boundingBox)),Ys.applyMatrix4(e.matrixWorld),this.union(Ys)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ln),ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vs),js.subVectors(this.max,vs),Ii.subVectors(e.a,vs),Di.subVectors(e.b,vs),Ui.subVectors(e.c,vs),qn.subVectors(Di,Ii),$n.subVectors(Ui,Di),hi.subVectors(Ii,Ui);let t=[0,-qn.z,qn.y,0,-$n.z,$n.y,0,-hi.z,hi.y,qn.z,0,-qn.x,$n.z,0,-$n.x,hi.z,0,-hi.x,-qn.y,qn.x,0,-$n.y,$n.x,0,-hi.y,hi.x,0];return!Jr(t,Ii,Di,Ui,js)||(t=[1,0,0,0,1,0,0,0,1],!Jr(t,Ii,Di,Ui,js))?!1:(Ks.crossVectors(qn,$n),t=[Ks.x,Ks.y,Ks.z],Jr(t,Ii,Di,Ui,js))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Pn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Pn=[new L,new L,new L,new L,new L,new L,new L,new L],ln=new L,Ys=new Mn,Ii=new L,Di=new L,Ui=new L,qn=new L,$n=new L,hi=new L,vs=new L,js=new L,Ks=new L,ui=new L;function Jr(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ui.fromArray(s,r);const a=i.x*Math.abs(ui.x)+i.y*Math.abs(ui.y)+i.z*Math.abs(ui.z),l=e.dot(ui),c=t.dot(ui),h=n.dot(ui);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Wd=new Mn,ys=new L,Qr=new L;class Sn{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Wd.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ys.subVectors(e,this.center);const t=ys.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ys,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Qr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ys.copy(e.center).add(Qr)),this.expandByPoint(ys.copy(e.center).sub(Qr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ln=new L,eo=new L,Zs=new L,Yn=new L,to=new L,Js=new L,no=new L;class Gr{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ln)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ln.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ln.copy(this.origin).addScaledVector(this.direction,t),Ln.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){eo.copy(e).add(t).multiplyScalar(.5),Zs.copy(t).sub(e).normalize(),Yn.copy(this.origin).sub(eo);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Zs),a=Yn.dot(this.direction),l=-Yn.dot(Zs),c=Yn.lengthSq(),h=Math.abs(1-o*o);let u,d,m,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,m=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),m=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),m=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),m=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),m=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(eo).addScaledVector(Zs,d),m}intersectSphere(e,t){Ln.subVectors(e.center,this.origin);const n=Ln.dot(this.direction),i=Ln.dot(Ln)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Ln)!==null}intersectTriangle(e,t,n,i,r){to.subVectors(t,e),Js.subVectors(n,e),no.crossVectors(to,Js);let o=this.direction.dot(no),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Yn.subVectors(this.origin,e);const l=a*this.direction.dot(Js.crossVectors(Yn,Js));if(l<0)return null;const c=a*this.direction.dot(to.cross(Yn));if(c<0||l+c>o)return null;const h=-a*Yn.dot(no);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pe{constructor(e,t,n,i,r,o,a,l,c,h,u,d,m,g,_,p){Pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,u,d,m,g,_,p)}set(e,t,n,i,r,o,a,l,c,h,u,d,m,g,_,p){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=i,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=m,f[7]=g,f[11]=_,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/ki.setFromMatrixColumn(e,0).length(),r=1/ki.setFromMatrixColumn(e,1).length(),o=1/ki.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=o*h,m=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=m+g*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=g+m*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,m=l*u,g=c*h,_=c*u;t[0]=d+_*a,t[4]=g*a-m,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=m*a-g,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,m=l*u,g=c*h,_=c*u;t[0]=d-_*a,t[4]=-o*u,t[8]=g+m*a,t[1]=m+g*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,m=o*u,g=a*h,_=a*u;t[0]=l*h,t[4]=g*c-m,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=m*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,m=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+m,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=m*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=o*l,m=o*c,g=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=o*h,t[9]=m*u-g,t[2]=g*u-m,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Xd,e,qd)}lookAt(e,t,n){const i=this.elements;return Wt.subVectors(e,t),Wt.lengthSq()===0&&(Wt.z=1),Wt.normalize(),jn.crossVectors(n,Wt),jn.lengthSq()===0&&(Math.abs(n.z)===1?Wt.x+=1e-4:Wt.z+=1e-4,Wt.normalize(),jn.crossVectors(n,Wt)),jn.normalize(),Qs.crossVectors(Wt,jn),i[0]=jn.x,i[4]=Qs.x,i[8]=Wt.x,i[1]=jn.y,i[5]=Qs.y,i[9]=Wt.y,i[2]=jn.z,i[6]=Qs.z,i[10]=Wt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],m=n[13],g=n[2],_=n[6],p=n[10],f=n[14],E=n[3],M=n[7],v=n[11],O=n[15],R=i[0],A=i[4],P=i[8],T=i[12],y=i[1],C=i[5],W=i[9],V=i[13],Y=i[2],j=i[6],q=i[10],J=i[14],D=i[3],ee=i[7],ne=i[11],re=i[15];return r[0]=o*R+a*y+l*Y+c*D,r[4]=o*A+a*C+l*j+c*ee,r[8]=o*P+a*W+l*q+c*ne,r[12]=o*T+a*V+l*J+c*re,r[1]=h*R+u*y+d*Y+m*D,r[5]=h*A+u*C+d*j+m*ee,r[9]=h*P+u*W+d*q+m*ne,r[13]=h*T+u*V+d*J+m*re,r[2]=g*R+_*y+p*Y+f*D,r[6]=g*A+_*C+p*j+f*ee,r[10]=g*P+_*W+p*q+f*ne,r[14]=g*T+_*V+p*J+f*re,r[3]=E*R+M*y+v*Y+O*D,r[7]=E*A+M*C+v*j+O*ee,r[11]=E*P+M*W+v*q+O*ne,r[15]=E*T+M*V+v*J+O*re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],m=e[14],g=e[3],_=e[7],p=e[11],f=e[15];return g*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*m-n*l*m)+_*(+t*l*m-t*c*d+r*o*d-i*o*m+i*c*h-r*l*h)+p*(+t*c*u-t*a*m-r*o*u+n*o*m+r*a*h-n*c*h)+f*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],m=e[11],g=e[12],_=e[13],p=e[14],f=e[15],E=u*p*c-_*d*c+_*l*m-a*p*m-u*l*f+a*d*f,M=g*d*c-h*p*c-g*l*m+o*p*m+h*l*f-o*d*f,v=h*_*c-g*u*c+g*a*m-o*_*m-h*a*f+o*u*f,O=g*u*l-h*_*l-g*a*d+o*_*d+h*a*p-o*u*p,R=t*E+n*M+i*v+r*O;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return e[0]=E*A,e[1]=(_*d*r-u*p*r-_*i*m+n*p*m+u*i*f-n*d*f)*A,e[2]=(a*p*r-_*l*r+_*i*c-n*p*c-a*i*f+n*l*f)*A,e[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*m-n*l*m)*A,e[4]=M*A,e[5]=(h*p*r-g*d*r+g*i*m-t*p*m-h*i*f+t*d*f)*A,e[6]=(g*l*r-o*p*r-g*i*c+t*p*c+o*i*f-t*l*f)*A,e[7]=(o*d*r-h*l*r+h*i*c-t*d*c-o*i*m+t*l*m)*A,e[8]=v*A,e[9]=(g*u*r-h*_*r-g*n*m+t*_*m+h*n*f-t*u*f)*A,e[10]=(o*_*r-g*a*r+g*n*c-t*_*c-o*n*f+t*a*f)*A,e[11]=(h*a*r-o*u*r-h*n*c+t*u*c+o*n*m-t*a*m)*A,e[12]=O*A,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*p+t*u*p)*A,e[14]=(g*a*i-o*_*i-g*n*l+t*_*l+o*n*p-t*a*p)*A,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,m=r*h,g=r*u,_=o*h,p=o*u,f=a*u,E=l*c,M=l*h,v=l*u,O=n.x,R=n.y,A=n.z;return i[0]=(1-(_+f))*O,i[1]=(m+v)*O,i[2]=(g-M)*O,i[3]=0,i[4]=(m-v)*R,i[5]=(1-(d+f))*R,i[6]=(p+E)*R,i[7]=0,i[8]=(g+M)*A,i[9]=(p-E)*A,i[10]=(1-(d+_))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=ki.set(i[0],i[1],i[2]).length();const o=ki.set(i[4],i[5],i[6]).length(),a=ki.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],cn.copy(this);const c=1/r,h=1/o,u=1/a;return cn.elements[0]*=c,cn.elements[1]*=c,cn.elements[2]*=c,cn.elements[4]*=h,cn.elements[5]*=h,cn.elements[6]*=h,cn.elements[8]*=u,cn.elements[9]*=u,cn.elements[10]*=u,t.setFromRotationMatrix(cn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=zn){const l=this.elements,c=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let m,g;if(a===zn)m=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Or)m=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=zn){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(o-r),d=(t+e)*c,m=(n+i)*h;let g,_;if(a===zn)g=(o+r)*u,_=-2*u;else if(a===Or)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ki=new L,cn=new Pe,Xd=new L(0,0,0),qd=new L(1,1,1),jn=new L,Qs=new L,Wt=new L,Ol=new Pe,Bl=new bn;class Kt{constructor(e=0,t=0,n=0,i=Kt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],m=i[10];switch(t){case"XYZ":this._y=Math.asin(Lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Lt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Lt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Lt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ol.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ol,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Bl.setFromEuler(this),this.setFromQuaternion(Bl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Kt.DEFAULT_ORDER="XYZ";class Th{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let $d=0;const zl=new L,Ni=new bn,In=new Pe,er=new L,bs=new L,Yd=new L,jd=new bn,Hl=new L(1,0,0),Vl=new L(0,1,0),Gl=new L(0,0,1),Wl={type:"added"},Kd={type:"removed"},Fi={type:"childadded",child:null},io={type:"childremoved",child:null};class mt extends ds{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$d++}),this.uuid=gn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mt.DEFAULT_UP.clone();const e=new L,t=new Kt,n=new bn,i=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Pe},normalMatrix:{value:new Ne}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=mt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Th,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ni.setFromAxisAngle(e,t),this.quaternion.multiply(Ni),this}rotateOnWorldAxis(e,t){return Ni.setFromAxisAngle(e,t),this.quaternion.premultiply(Ni),this}rotateX(e){return this.rotateOnAxis(Hl,e)}rotateY(e){return this.rotateOnAxis(Vl,e)}rotateZ(e){return this.rotateOnAxis(Gl,e)}translateOnAxis(e,t){return zl.copy(e).applyQuaternion(this.quaternion),this.position.add(zl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Hl,e)}translateY(e){return this.translateOnAxis(Vl,e)}translateZ(e){return this.translateOnAxis(Gl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(In.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?er.copy(e):er.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?In.lookAt(bs,er,this.up):In.lookAt(er,bs,this.up),this.quaternion.setFromRotationMatrix(In),i&&(In.extractRotation(i.matrixWorld),Ni.setFromRotationMatrix(In),this.quaternion.premultiply(Ni.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wl),Fi.child=e,this.dispatchEvent(Fi),Fi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Kd),io.child=e,this.dispatchEvent(io),io.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),In.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),In.multiply(e.parent.matrixWorld)),e.applyMatrix4(In),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wl),Fi.child=e,this.dispatchEvent(Fi),Fi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,e,Yd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,jd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),m=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}mt.DEFAULT_UP=new L(0,1,0);mt.DEFAULT_MATRIX_AUTO_UPDATE=!0;mt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const hn=new L,Dn=new L,so=new L,Un=new L,Oi=new L,Bi=new L,Xl=new L,ro=new L,oo=new L,ao=new L,lo=new Je,co=new Je,ho=new Je;class pn{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),hn.subVectors(e,t),i.cross(hn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){hn.subVectors(i,t),Dn.subVectors(n,t),so.subVectors(e,t);const o=hn.dot(hn),a=hn.dot(Dn),l=hn.dot(so),c=Dn.dot(Dn),h=Dn.dot(so),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,m=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-m-g,g,m)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,Un)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Un.x),l.addScaledVector(o,Un.y),l.addScaledVector(a,Un.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return lo.setScalar(0),co.setScalar(0),ho.setScalar(0),lo.fromBufferAttribute(e,t),co.fromBufferAttribute(e,n),ho.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(lo,r.x),o.addScaledVector(co,r.y),o.addScaledVector(ho,r.z),o}static isFrontFacing(e,t,n,i){return hn.subVectors(n,t),Dn.subVectors(e,t),hn.cross(Dn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return hn.subVectors(this.c,this.b),Dn.subVectors(this.a,this.b),hn.cross(Dn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return pn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return pn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return pn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return pn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return pn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;Oi.subVectors(i,n),Bi.subVectors(r,n),ro.subVectors(e,n);const l=Oi.dot(ro),c=Bi.dot(ro);if(l<=0&&c<=0)return t.copy(n);oo.subVectors(e,i);const h=Oi.dot(oo),u=Bi.dot(oo);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Oi,o);ao.subVectors(e,r);const m=Oi.dot(ao),g=Bi.dot(ao);if(g>=0&&m<=g)return t.copy(r);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Bi,a);const p=h*g-m*u;if(p<=0&&u-h>=0&&m-g>=0)return Xl.subVectors(r,i),a=(u-h)/(u-h+(m-g)),t.copy(i).addScaledVector(Xl,a);const f=1/(p+_+d);return o=_*f,a=d*f,t.copy(n).addScaledVector(Oi,o).addScaledVector(Bi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Eh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kn={h:0,s:0,l:0},tr={h:0,s:0,l:0};function uo(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Se{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=At){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ve.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ve.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ve.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ve.workingColorSpace){if(e=qa(e,1),t=Lt(t,0,1),n=Lt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=uo(o,r,e+1/3),this.g=uo(o,r,e),this.b=uo(o,r,e-1/3)}return Ve.toWorkingColorSpace(this,i),this}setStyle(e,t=At){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=At){const n=Eh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Hn(e.r),this.g=Hn(e.g),this.b=Hn(e.b),this}copyLinearToSRGB(e){return this.r=Ji(e.r),this.g=Ji(e.g),this.b=Ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=At){return Ve.fromWorkingColorSpace(Pt.copy(this),e),Math.round(Lt(Pt.r*255,0,255))*65536+Math.round(Lt(Pt.g*255,0,255))*256+Math.round(Lt(Pt.b*255,0,255))}getHexString(e=At){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ve.workingColorSpace){Ve.fromWorkingColorSpace(Pt.copy(this),t);const n=Pt.r,i=Pt.g,r=Pt.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ve.workingColorSpace){return Ve.fromWorkingColorSpace(Pt.copy(this),t),e.r=Pt.r,e.g=Pt.g,e.b=Pt.b,e}getStyle(e=At){Ve.fromWorkingColorSpace(Pt.copy(this),e);const t=Pt.r,n=Pt.g,i=Pt.b;return e!==At?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Kn),this.setHSL(Kn.h+e,Kn.s+t,Kn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Kn),e.getHSL(tr);const n=Fs(Kn.h,tr.h,t),i=Fs(Kn.s,tr.s,t),r=Fs(Kn.l,tr.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pt=new Se;Se.NAMES=Eh;let Zd=0;class _n extends ds{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=gn(),this.name="",this.blending=Ki,this.side=Vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oo,this.blendDst=Bo,this.blendEquation=bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Se(0,0,0),this.blendAlpha=0,this.depthFunc=ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Rl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pi,this.stencilZFail=Pi,this.stencilZPass=Pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ki&&(n.blending=this.blending),this.side!==Vn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Oo&&(n.blendSrc=this.blendSrc),this.blendDst!==Bo&&(n.blendDst=this.blendDst),this.blendEquation!==bi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ts&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Rl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Pi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Pi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Pi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Yt extends _n{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kt,this.combine=Fa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const bt=new L,nr=new Ge;class Ft{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ma,this.updateRanges=[],this.gpuType=mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)nr.fromBufferAttribute(this,t),nr.applyMatrix3(e),this.setXY(t,nr.x,nr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=fn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=fn(t,this.array)),t}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=fn(t,this.array)),t}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=fn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=fn(t,this.array)),t}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array),r=nt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ma&&(e.usage=this.usage),e}}class wh extends Ft{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ah extends Ft{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class jt extends Ft{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Jd=0;const tn=new Pe,fo=new mt,zi=new L,Xt=new Mn,Ms=new Mn,Et=new L;class Zt extends ds{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jd++}),this.uuid=gn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(bh(e)?Ah:wh)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ne().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return tn.makeRotationFromQuaternion(e),this.applyMatrix4(tn),this}rotateX(e){return tn.makeRotationX(e),this.applyMatrix4(tn),this}rotateY(e){return tn.makeRotationY(e),this.applyMatrix4(tn),this}rotateZ(e){return tn.makeRotationZ(e),this.applyMatrix4(tn),this}translate(e,t,n){return tn.makeTranslation(e,t,n),this.applyMatrix4(tn),this}scale(e,t,n){return tn.makeScale(e,t,n),this.applyMatrix4(tn),this}lookAt(e){return fo.lookAt(e),fo.updateMatrix(),this.applyMatrix4(fo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zi).negate(),this.translate(zi.x,zi.y,zi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new jt(n,3))}else{for(let n=0,i=t.count;n<i;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];Xt.setFromBufferAttribute(r),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,Xt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,Xt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(Xt.min),this.boundingBox.expandByPoint(Xt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(Xt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Ms.setFromBufferAttribute(a),this.morphTargetsRelative?(Et.addVectors(Xt.min,Ms.min),Xt.expandByPoint(Et),Et.addVectors(Xt.max,Ms.max),Xt.expandByPoint(Et)):(Xt.expandByPoint(Ms.min),Xt.expandByPoint(Ms.max))}Xt.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Et.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Et));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Et.fromBufferAttribute(a,c),l&&(zi.fromBufferAttribute(e,c),Et.add(zi)),i=Math.max(i,n.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ft(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new L,l[P]=new L;const c=new L,h=new L,u=new L,d=new Ge,m=new Ge,g=new Ge,_=new L,p=new L;function f(P,T,y){c.fromBufferAttribute(n,P),h.fromBufferAttribute(n,T),u.fromBufferAttribute(n,y),d.fromBufferAttribute(r,P),m.fromBufferAttribute(r,T),g.fromBufferAttribute(r,y),h.sub(c),u.sub(c),m.sub(d),g.sub(d);const C=1/(m.x*g.y-g.x*m.y);isFinite(C)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(C),p.copy(u).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(C),a[P].add(_),a[T].add(_),a[y].add(_),l[P].add(p),l[T].add(p),l[y].add(p))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let P=0,T=E.length;P<T;++P){const y=E[P],C=y.start,W=y.count;for(let V=C,Y=C+W;V<Y;V+=3)f(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const M=new L,v=new L,O=new L,R=new L;function A(P){O.fromBufferAttribute(i,P),R.copy(O);const T=a[P];M.copy(T),M.sub(O.multiplyScalar(O.dot(T))).normalize(),v.crossVectors(R,T);const C=v.dot(l[P])<0?-1:1;o.setXYZW(P,M.x,M.y,M.z,C)}for(let P=0,T=E.length;P<T;++P){const y=E[P],C=y.start,W=y.count;for(let V=C,Y=C+W;V<Y;V+=3)A(e.getX(V+0)),A(e.getX(V+1)),A(e.getX(V+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ft(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);const i=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,u=new L;if(e)for(let d=0,m=e.count;d<m;d+=3){const g=e.getX(d+0),_=e.getX(d+1),p=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,p),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,m=t.count;d<m;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let m=0,g=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?m=l[_]*a.data.stride+a.offset:m=l[_]*h;for(let f=0;f<h;f++)d[g++]=c[m++]}return new Ft(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Zt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],m=e(d,n);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const m=c[u];h.push(m.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ql=new Pe,di=new Gr,ir=new Sn,$l=new L,sr=new L,rr=new L,or=new L,po=new L,ar=new L,Yl=new L,lr=new L;class ct extends mt{constructor(e=new Zt,t=new Yt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){ar.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(po.fromBufferAttribute(u,e),o?ar.addScaledVector(po,h):ar.addScaledVector(po.sub(t),h))}t.add(ar)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ir.copy(n.boundingSphere),ir.applyMatrix4(r),di.copy(e.ray).recast(e.near),!(ir.containsPoint(di.origin)===!1&&(di.intersectSphere(ir,$l)===null||di.origin.distanceToSquared($l)>(e.far-e.near)**2))&&(ql.copy(r).invert(),di.copy(e.ray).applyMatrix4(ql),!(n.boundingBox!==null&&di.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,di)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const p=d[g],f=o[p.materialIndex],E=Math.max(p.start,m.start),M=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let v=E,O=M;v<O;v+=3){const R=a.getX(v),A=a.getX(v+1),P=a.getX(v+2);i=cr(this,f,e,n,c,h,u,R,A,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,m.start),_=Math.min(a.count,m.start+m.count);for(let p=g,f=_;p<f;p+=3){const E=a.getX(p),M=a.getX(p+1),v=a.getX(p+2);i=cr(this,o,e,n,c,h,u,E,M,v),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const p=d[g],f=o[p.materialIndex],E=Math.max(p.start,m.start),M=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let v=E,O=M;v<O;v+=3){const R=v,A=v+1,P=v+2;i=cr(this,f,e,n,c,h,u,R,A,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let p=g,f=_;p<f;p+=3){const E=p,M=p+1,v=p+2;i=cr(this,o,e,n,c,h,u,E,M,v),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function Qd(s,e,t,n,i,r,o,a){let l;if(e.side===Vt?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Vn,a),l===null)return null;lr.copy(a),lr.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(lr);return c<t.near||c>t.far?null:{distance:c,point:lr.clone(),object:s}}function cr(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,sr),s.getVertexPosition(l,rr),s.getVertexPosition(c,or);const h=Qd(s,e,t,n,sr,rr,or,Yl);if(h){const u=new L;pn.getBarycoord(Yl,sr,rr,or,u),i&&(h.uv=pn.getInterpolatedAttribute(i,a,l,c,u,new Ge)),r&&(h.uv1=pn.getInterpolatedAttribute(r,a,l,c,u,new Ge)),o&&(h.normal=pn.getInterpolatedAttribute(o,a,l,c,u,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new L,materialIndex:0};pn.getNormal(sr,rr,or,d.normal),h.face=d,h.barycoord=u}return h}class Ht extends Zt{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,m=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new jt(c,3)),this.setAttribute("normal",new jt(h,3)),this.setAttribute("uv",new jt(u,2));function g(_,p,f,E,M,v,O,R,A,P,T){const y=v/A,C=O/P,W=v/2,V=O/2,Y=R/2,j=A+1,q=P+1;let J=0,D=0;const ee=new L;for(let ne=0;ne<q;ne++){const re=ne*C-V;for(let Ee=0;Ee<j;Ee++){const Ze=Ee*y-W;ee[_]=Ze*E,ee[p]=re*M,ee[f]=Y,c.push(ee.x,ee.y,ee.z),ee[_]=0,ee[p]=0,ee[f]=R>0?1:-1,h.push(ee.x,ee.y,ee.z),u.push(Ee/A),u.push(1-ne/P),J+=1}}for(let ne=0;ne<P;ne++)for(let re=0;re<A;re++){const Ee=d+re+j*ne,Ze=d+re+j*(ne+1),X=d+(re+1)+j*(ne+1),se=d+(re+1)+j*ne;l.push(Ee,Ze,se),l.push(Ze,X,se),D+=6}a.addGroup(m,D,T),m+=D,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ht(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ls(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function kt(s){const e={};for(let t=0;t<s.length;t++){const n=ls(s[t]);for(const i in n)e[i]=n[i]}return e}function ef(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Rh(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ve.workingColorSpace}const tf={clone:ls,merge:kt};var nf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class li extends _n{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nf,this.fragmentShader=sf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ls(e.uniforms),this.uniformsGroups=ef(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ch extends mt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe,this.coordinateSystem=zn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Zn=new L,jl=new Ge,Kl=new Ge;class Nt extends Ch{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=as*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ns*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return as*2*Math.atan(Math.tan(Ns*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Zn.x,Zn.y).multiplyScalar(-e/Zn.z),Zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Zn.x,Zn.y).multiplyScalar(-e/Zn.z)}getViewSize(e,t){return this.getViewBounds(e,jl,Kl),t.subVectors(Kl,jl)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ns*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Hi=-90,Vi=1;class rf extends mt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Nt(Hi,Vi,e,t);i.layers=this.layers,this.add(i);const r=new Nt(Hi,Vi,e,t);r.layers=this.layers,this.add(r);const o=new Nt(Hi,Vi,e,t);o.layers=this.layers,this.add(o);const a=new Nt(Hi,Vi,e,t);a.layers=this.layers,this.add(a);const l=new Nt(Hi,Vi,e,t);l.layers=this.layers,this.add(l);const c=new Nt(Hi,Vi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===zn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Or)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Ph extends wt{constructor(e,t,n,i,r,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:ns,super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class of extends Ri{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ph(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:$t}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Ht(5,5,5),r=new li({name:"CubemapFromEquirect",uniforms:ls(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vt,blending:oi});r.uniforms.tEquirect.value=t;const o=new ct(i,r),a=t.minFilter;return t.minFilter===Bn&&(t.minFilter=$t),new rf(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}const mo=new L,af=new L,lf=new Ne;class vi{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=mo.subVectors(n,t).cross(af.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(mo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||lf.getNormalMatrix(e),i=this.coplanarPoint(mo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fi=new Sn,hr=new L;class $a{constructor(e=new vi,t=new vi,n=new vi,i=new vi,r=new vi,o=new vi){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zn){const n=this.planes,i=e.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],m=i[8],g=i[9],_=i[10],p=i[11],f=i[12],E=i[13],M=i[14],v=i[15];if(n[0].setComponents(l-r,d-c,p-m,v-f).normalize(),n[1].setComponents(l+r,d+c,p+m,v+f).normalize(),n[2].setComponents(l+o,d+h,p+g,v+E).normalize(),n[3].setComponents(l-o,d-h,p-g,v-E).normalize(),n[4].setComponents(l-a,d-u,p-_,v-M).normalize(),t===zn)n[5].setComponents(l+a,d+u,p+_,v+M).normalize();else if(t===Or)n[5].setComponents(a,u,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),fi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),fi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(fi)}intersectsSprite(e){return fi.center.set(0,0,0),fi.radius=.7071067811865476,fi.applyMatrix4(e.matrixWorld),this.intersectsSphere(fi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(hr.x=i.normal.x>0?e.max.x:e.min.x,hr.y=i.normal.y>0?e.max.y:e.min.y,hr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(hr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Lh(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function cf(s){const e=new WeakMap;function t(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let m;if(c instanceof Float32Array)m=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?m=s.HALF_FLOAT:m=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=s.SHORT;else if(c instanceof Uint32Array)m=s.UNSIGNED_INT;else if(c instanceof Int32Array)m=s.INT;else if(c instanceof Int8Array)m=s.BYTE;else if(c instanceof Uint8Array)m=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((m,g)=>m.start-g.start);let d=0;for(let m=1;m<u.length;m++){const g=u[d],_=u[m];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let m=0,g=u.length;m<g;m++){const _=u[m];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}class Wr extends Zt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,m=[],g=[],_=[],p=[];for(let f=0;f<h;f++){const E=f*d-o;for(let M=0;M<c;M++){const v=M*u-r;g.push(v,-E,0),_.push(0,0,1),p.push(M/a),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let E=0;E<a;E++){const M=E+c*f,v=E+c*(f+1),O=E+1+c*(f+1),R=E+1+c*f;m.push(M,v,R),m.push(v,O,R)}this.setIndex(m),this.setAttribute("position",new jt(g,3)),this.setAttribute("normal",new jt(_,3)),this.setAttribute("uv",new jt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wr(e.width,e.height,e.widthSegments,e.heightSegments)}}var hf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uf=`#ifdef USE_ALPHAHASH
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
#endif`,df=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ff=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gf=`#ifdef USE_AOMAP
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
#endif`,_f=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
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
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,vf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,yf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Mf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Sf=`#ifdef USE_IRIDESCENCE
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
#endif`,Tf=`#ifdef USE_BUMPMAP
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
#endif`,Ef=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
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
	#endif
#endif`,wf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Af=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Rf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Cf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Pf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Lf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,If=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Df=`#define PI 3.141592653589793
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
} // validated`,Uf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,kf=`vec3 transformedNormal = objectNormal;
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
#endif`,Nf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ff=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Of=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Hf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Vf=`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
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
#endif`,Gf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Wf=`#ifdef USE_ENVMAP
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
#endif`,Xf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qf=`#ifdef USE_ENVMAP
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
#endif`,$f=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Kf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zf=`#ifdef USE_GRADIENTMAP
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
}`,Jf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Qf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ep=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tp=`uniform bool receiveShadow;
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
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
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
#endif`,np=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
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
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
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
#endif`,ip=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,op=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ap=`PhysicalMaterial material;
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
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
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
#endif`,lp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
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
}`,cp=`
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif`,hp=`#if defined( RE_IndirectDiffuse )
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
#endif`,up=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,dp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,fp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,gp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_p=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,vp=`#if defined( USE_POINTS_UV )
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
#endif`,yp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Sp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Tp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ep=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,wp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ap=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Rp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Cp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ip=`#ifdef USE_NORMALMAP
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
#endif`,Dp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Up=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,kp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Np=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Fp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Op=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
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
}`,Bp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Hp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Vp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Wp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Xp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
			float shadowIntensity;
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
			float shadowIntensity;
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
			float shadowIntensity;
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
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
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
		return mix( 1.0, shadow, shadowIntensity );
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
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
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
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,qp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
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
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,$p=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Yp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,jp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Kp=`#ifdef USE_SKINNING
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
#endif`,Zp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Jp=`#ifdef USE_SKINNING
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
#endif`,Qp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,em=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nm=`#ifndef saturate
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
vec3 CineonToneMapping( vec3 color ) {
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
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,im=`#ifdef USE_TRANSMISSION
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
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,sm=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,rm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,om=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,am=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hm=`uniform sampler2D t2D;
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
}`,um=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mm=`#include <common>
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
	#include <morphinstance_vertex>
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
}`,gm=`#if DEPTH_PACKING == 3200
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
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
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
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,_m=`#define DISTANCE
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
	#include <morphinstance_vertex>
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
}`,xm=`#define DISTANCE
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
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,vm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ym=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bm=`uniform float scale;
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
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mm=`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Sm=`#include <common>
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
	#include <morphinstance_vertex>
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
}`,Tm=`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,Em=`#define LAMBERT
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
	#include <morphinstance_vertex>
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
}`,wm=`#define LAMBERT
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,Am=`#define MATCAP
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
	#include <morphinstance_vertex>
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
}`,Rm=`#define MATCAP
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,Cm=`#define NORMAL
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
	#include <morphinstance_vertex>
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
}`,Pm=`#define NORMAL
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
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Lm=`#define PHONG
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
	#include <morphinstance_vertex>
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
}`,Im=`#define PHONG
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,Dm=`#define STANDARD
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
	#include <morphinstance_vertex>
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
}`,Um=`#define STANDARD
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
#ifdef USE_DISPERSION
	uniform float dispersion;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,km=`#define TOON
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
	#include <morphinstance_vertex>
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
}`,Nm=`#define TOON
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
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
}`,Fm=`uniform float size;
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
	#include <morphinstance_vertex>
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
}`,Om=`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
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
}`,Bm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
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
}`,zm=`uniform vec3 color;
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
}`,Hm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
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
}`,Vm=`uniform vec3 diffuse;
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
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
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
}`,Oe={alphahash_fragment:hf,alphahash_pars_fragment:uf,alphamap_fragment:df,alphamap_pars_fragment:ff,alphatest_fragment:pf,alphatest_pars_fragment:mf,aomap_fragment:gf,aomap_pars_fragment:_f,batching_pars_vertex:xf,batching_vertex:vf,begin_vertex:yf,beginnormal_vertex:bf,bsdfs:Mf,iridescence_fragment:Sf,bumpmap_pars_fragment:Tf,clipping_planes_fragment:Ef,clipping_planes_pars_fragment:wf,clipping_planes_pars_vertex:Af,clipping_planes_vertex:Rf,color_fragment:Cf,color_pars_fragment:Pf,color_pars_vertex:Lf,color_vertex:If,common:Df,cube_uv_reflection_fragment:Uf,defaultnormal_vertex:kf,displacementmap_pars_vertex:Nf,displacementmap_vertex:Ff,emissivemap_fragment:Of,emissivemap_pars_fragment:Bf,colorspace_fragment:zf,colorspace_pars_fragment:Hf,envmap_fragment:Vf,envmap_common_pars_fragment:Gf,envmap_pars_fragment:Wf,envmap_pars_vertex:Xf,envmap_physical_pars_fragment:np,envmap_vertex:qf,fog_vertex:$f,fog_pars_vertex:Yf,fog_fragment:jf,fog_pars_fragment:Kf,gradientmap_pars_fragment:Zf,lightmap_pars_fragment:Jf,lights_lambert_fragment:Qf,lights_lambert_pars_fragment:ep,lights_pars_begin:tp,lights_toon_fragment:ip,lights_toon_pars_fragment:sp,lights_phong_fragment:rp,lights_phong_pars_fragment:op,lights_physical_fragment:ap,lights_physical_pars_fragment:lp,lights_fragment_begin:cp,lights_fragment_maps:hp,lights_fragment_end:up,logdepthbuf_fragment:dp,logdepthbuf_pars_fragment:fp,logdepthbuf_pars_vertex:pp,logdepthbuf_vertex:mp,map_fragment:gp,map_pars_fragment:_p,map_particle_fragment:xp,map_particle_pars_fragment:vp,metalnessmap_fragment:yp,metalnessmap_pars_fragment:bp,morphinstance_vertex:Mp,morphcolor_vertex:Sp,morphnormal_vertex:Tp,morphtarget_pars_vertex:Ep,morphtarget_vertex:wp,normal_fragment_begin:Ap,normal_fragment_maps:Rp,normal_pars_fragment:Cp,normal_pars_vertex:Pp,normal_vertex:Lp,normalmap_pars_fragment:Ip,clearcoat_normal_fragment_begin:Dp,clearcoat_normal_fragment_maps:Up,clearcoat_pars_fragment:kp,iridescence_pars_fragment:Np,opaque_fragment:Fp,packing:Op,premultiplied_alpha_fragment:Bp,project_vertex:zp,dithering_fragment:Hp,dithering_pars_fragment:Vp,roughnessmap_fragment:Gp,roughnessmap_pars_fragment:Wp,shadowmap_pars_fragment:Xp,shadowmap_pars_vertex:qp,shadowmap_vertex:$p,shadowmask_pars_fragment:Yp,skinbase_vertex:jp,skinning_pars_vertex:Kp,skinning_vertex:Zp,skinnormal_vertex:Jp,specularmap_fragment:Qp,specularmap_pars_fragment:em,tonemapping_fragment:tm,tonemapping_pars_fragment:nm,transmission_fragment:im,transmission_pars_fragment:sm,uv_pars_fragment:rm,uv_pars_vertex:om,uv_vertex:am,worldpos_vertex:lm,background_vert:cm,background_frag:hm,backgroundCube_vert:um,backgroundCube_frag:dm,cube_vert:fm,cube_frag:pm,depth_vert:mm,depth_frag:gm,distanceRGBA_vert:_m,distanceRGBA_frag:xm,equirect_vert:vm,equirect_frag:ym,linedashed_vert:bm,linedashed_frag:Mm,meshbasic_vert:Sm,meshbasic_frag:Tm,meshlambert_vert:Em,meshlambert_frag:wm,meshmatcap_vert:Am,meshmatcap_frag:Rm,meshnormal_vert:Cm,meshnormal_frag:Pm,meshphong_vert:Lm,meshphong_frag:Im,meshphysical_vert:Dm,meshphysical_frag:Um,meshtoon_vert:km,meshtoon_frag:Nm,points_vert:Fm,points_frag:Om,shadow_vert:Bm,shadow_frag:zm,sprite_vert:Hm,sprite_frag:Vm},ae={common:{diffuse:{value:new Se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ne}},envmap:{envMap:{value:null},envMapRotation:{value:new Ne},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ne}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ne}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ne},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ne},normalScale:{value:new Ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ne},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ne}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ne}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ne}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0},uvTransform:{value:new Ne}},sprite:{diffuse:{value:new Se(16777215)},opacity:{value:1},center:{value:new Ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ne},alphaMap:{value:null},alphaMapTransform:{value:new Ne},alphaTest:{value:0}}},yn={basic:{uniforms:kt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:kt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Se(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:kt([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Se(0)},specular:{value:new Se(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:kt([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new Se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:kt([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new Se(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:kt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:kt([ae.points,ae.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:kt([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:kt([ae.common,ae.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:kt([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:kt([ae.sprite,ae.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ne},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ne}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:kt([ae.common,ae.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:kt([ae.lights,ae.fog,{color:{value:new Se(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};yn.physical={uniforms:kt([yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ne},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ne},clearcoatNormalScale:{value:new Ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ne},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ne},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ne},sheen:{value:0},sheenColor:{value:new Se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ne},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ne},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ne},transmissionSamplerSize:{value:new Ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ne},attenuationDistance:{value:0},attenuationColor:{value:new Se(0)},specularColor:{value:new Se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ne},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ne},anisotropyVector:{value:new Ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ne}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const ur={r:0,b:0,g:0},pi=new Kt,Gm=new Pe;function Wm(s,e,t,n,i,r,o){const a=new Se(0);let l=r===!0?0:1,c,h,u=null,d=0,m=null;function g(E){let M=E.isScene===!0?E.background:null;return M&&M.isTexture&&(M=(E.backgroundBlurriness>0?t:e).get(M)),M}function _(E){let M=!1;const v=g(E);v===null?f(a,l):v&&v.isColor&&(f(v,1),M=!0);const O=s.xr.getEnvironmentBlendMode();O==="additive"?n.buffers.color.setClear(0,0,0,1,o):O==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function p(E,M){const v=g(M);v&&(v.isCubeTexture||v.mapping===Hr)?(h===void 0&&(h=new ct(new Ht(1,1,1),new li({name:"BackgroundCubeMaterial",uniforms:ls(yn.backgroundCube.uniforms),vertexShader:yn.backgroundCube.vertexShader,fragmentShader:yn.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(O,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),pi.copy(M.backgroundRotation),pi.x*=-1,pi.y*=-1,pi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Gm.makeRotationFromEuler(pi)),h.material.toneMapped=Ve.getTransfer(v.colorSpace)!==rt,(u!==v||d!==v.version||m!==s.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,m=s.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new ct(new Wr(2,2),new li({name:"BackgroundMaterial",uniforms:ls(yn.background.uniforms),vertexShader:yn.background.vertexShader,fragmentShader:yn.background.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=Ve.getTransfer(v.colorSpace)!==rt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||m!==s.toneMapping)&&(c.material.needsUpdate=!0,u=v,d=v.version,m=s.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function f(E,M){E.getRGB(ur,Rh(s)),n.buffers.color.setClear(ur.r,ur.g,ur.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(E,M=1){a.set(E),l=M,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,f(a,l)},render:_,addToRenderList:p}}function Xm(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,o=!1;function a(y,C,W,V,Y){let j=!1;const q=u(V,W,C);r!==q&&(r=q,c(r.object)),j=m(y,V,W,Y),j&&g(y,V,W,Y),Y!==null&&e.update(Y,s.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,v(y,C,W,V),Y!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function l(){return s.createVertexArray()}function c(y){return s.bindVertexArray(y)}function h(y){return s.deleteVertexArray(y)}function u(y,C,W){const V=W.wireframe===!0;let Y=n[y.id];Y===void 0&&(Y={},n[y.id]=Y);let j=Y[C.id];j===void 0&&(j={},Y[C.id]=j);let q=j[V];return q===void 0&&(q=d(l()),j[V]=q),q}function d(y){const C=[],W=[],V=[];for(let Y=0;Y<t;Y++)C[Y]=0,W[Y]=0,V[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:W,attributeDivisors:V,object:y,attributes:{},index:null}}function m(y,C,W,V){const Y=r.attributes,j=C.attributes;let q=0;const J=W.getAttributes();for(const D in J)if(J[D].location>=0){const ne=Y[D];let re=j[D];if(re===void 0&&(D==="instanceMatrix"&&y.instanceMatrix&&(re=y.instanceMatrix),D==="instanceColor"&&y.instanceColor&&(re=y.instanceColor)),ne===void 0||ne.attribute!==re||re&&ne.data!==re.data)return!0;q++}return r.attributesNum!==q||r.index!==V}function g(y,C,W,V){const Y={},j=C.attributes;let q=0;const J=W.getAttributes();for(const D in J)if(J[D].location>=0){let ne=j[D];ne===void 0&&(D==="instanceMatrix"&&y.instanceMatrix&&(ne=y.instanceMatrix),D==="instanceColor"&&y.instanceColor&&(ne=y.instanceColor));const re={};re.attribute=ne,ne&&ne.data&&(re.data=ne.data),Y[D]=re,q++}r.attributes=Y,r.attributesNum=q,r.index=V}function _(){const y=r.newAttributes;for(let C=0,W=y.length;C<W;C++)y[C]=0}function p(y){f(y,0)}function f(y,C){const W=r.newAttributes,V=r.enabledAttributes,Y=r.attributeDivisors;W[y]=1,V[y]===0&&(s.enableVertexAttribArray(y),V[y]=1),Y[y]!==C&&(s.vertexAttribDivisor(y,C),Y[y]=C)}function E(){const y=r.newAttributes,C=r.enabledAttributes;for(let W=0,V=C.length;W<V;W++)C[W]!==y[W]&&(s.disableVertexAttribArray(W),C[W]=0)}function M(y,C,W,V,Y,j,q){q===!0?s.vertexAttribIPointer(y,C,W,Y,j):s.vertexAttribPointer(y,C,W,V,Y,j)}function v(y,C,W,V){_();const Y=V.attributes,j=W.getAttributes(),q=C.defaultAttributeValues;for(const J in j){const D=j[J];if(D.location>=0){let ee=Y[J];if(ee===void 0&&(J==="instanceMatrix"&&y.instanceMatrix&&(ee=y.instanceMatrix),J==="instanceColor"&&y.instanceColor&&(ee=y.instanceColor)),ee!==void 0){const ne=ee.normalized,re=ee.itemSize,Ee=e.get(ee);if(Ee===void 0)continue;const Ze=Ee.buffer,X=Ee.type,se=Ee.bytesPerElement,ye=X===s.INT||X===s.UNSIGNED_INT||ee.gpuType===Oa;if(ee.isInterleavedBufferAttribute){const ce=ee.data,Ce=ce.stride,De=ee.offset;if(ce.isInstancedInterleavedBuffer){for(let Be=0;Be<D.locationSize;Be++)f(D.location+Be,ce.meshPerAttribute);y.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Be=0;Be<D.locationSize;Be++)p(D.location+Be);s.bindBuffer(s.ARRAY_BUFFER,Ze);for(let Be=0;Be<D.locationSize;Be++)M(D.location+Be,re/D.locationSize,X,ne,Ce*se,(De+re/D.locationSize*Be)*se,ye)}else{if(ee.isInstancedBufferAttribute){for(let ce=0;ce<D.locationSize;ce++)f(D.location+ce,ee.meshPerAttribute);y.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ce=0;ce<D.locationSize;ce++)p(D.location+ce);s.bindBuffer(s.ARRAY_BUFFER,Ze);for(let ce=0;ce<D.locationSize;ce++)M(D.location+ce,re/D.locationSize,X,ne,re*se,re/D.locationSize*ce*se,ye)}}else if(q!==void 0){const ne=q[J];if(ne!==void 0)switch(ne.length){case 2:s.vertexAttrib2fv(D.location,ne);break;case 3:s.vertexAttrib3fv(D.location,ne);break;case 4:s.vertexAttrib4fv(D.location,ne);break;default:s.vertexAttrib1fv(D.location,ne)}}}}E()}function O(){P();for(const y in n){const C=n[y];for(const W in C){const V=C[W];for(const Y in V)h(V[Y].object),delete V[Y];delete C[W]}delete n[y]}}function R(y){if(n[y.id]===void 0)return;const C=n[y.id];for(const W in C){const V=C[W];for(const Y in V)h(V[Y].object),delete V[Y];delete C[W]}delete n[y.id]}function A(y){for(const C in n){const W=n[C];if(W[y.id]===void 0)continue;const V=W[y.id];for(const Y in V)h(V[Y].object),delete V[Y];delete W[y.id]}}function P(){T(),o=!0,r!==i&&(r=i,c(r.object))}function T(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:T,dispose:O,releaseStatesOfGeometry:R,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:p,disableUnusedAttributes:E}}function qm(s,e,t){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),t.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let m=0;for(let g=0;g<u;g++)m+=h[g];t.update(m,n,1)}function l(c,h,u,d){if(u===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];t.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function $m(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(A){return!(A!==rn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const P=A===Ws&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Gn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==mn&&!P)}function l(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),f=s.getParameter(s.MAX_VERTEX_ATTRIBS),E=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),O=g>0,R=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:m,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:E,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:O,maxSamples:R}}function Ym(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new vi,a=new Ne,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const m=u.length!==0||d||n!==0||i;return i=d,n=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,m){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,f=s.get(u);if(!i||g===null||g.length===0||r&&!p)r?h(null):c();else{const E=r?0:n,M=E*4;let v=f.clippingState||null;l.value=v,v=h(g,d,M,m);for(let O=0;O!==M;++O)v[O]=t[O];f.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,m,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const f=m+_*4,E=d.matrixWorldInverse;a.getNormalMatrix(E),(p===null||p.length<f)&&(p=new Float32Array(f));for(let M=0,v=m;M!==_;++M,v+=4)o.copy(u[M]).applyMatrix4(E,a),o.normal.toArray(p,v),p[v+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function jm(s){let e=new WeakMap;function t(o,a){return a===$o?o.mapping=ns:a===Yo&&(o.mapping=is),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===$o||a===Yo)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new of(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Ya extends Ch{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Yi=4,Zl=[.125,.215,.35,.446,.526,.582],Mi=20,go=new Ya,Jl=new Se;let _o=null,xo=0,vo=0,yo=!1;const yi=(1+Math.sqrt(5))/2,Gi=1/yi,Ql=[new L(-yi,Gi,0),new L(yi,Gi,0),new L(-Gi,0,yi),new L(Gi,0,yi),new L(0,yi,-Gi),new L(0,yi,Gi),new L(-1,1,-1),new L(1,1,-1),new L(-1,1,1),new L(1,1,1)];class ec{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){_o=this._renderer.getRenderTarget(),xo=this._renderer.getActiveCubeFace(),vo=this._renderer.getActiveMipmapLevel(),yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ic(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=nc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(_o,xo,vo),this._renderer.xr.enabled=yo,e.scissorTest=!1,dr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ns||e.mapping===is?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_o=this._renderer.getRenderTarget(),xo=this._renderer.getActiveCubeFace(),vo=this._renderer.getActiveMipmapLevel(),yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:$t,minFilter:$t,generateMipmaps:!1,type:Ws,format:rn,colorSpace:Ot,depthBuffer:!1},i=tc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tc(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Km(r)),this._blurMaterial=Zm(r,e,t)}return i}_compileMaterial(e){const t=new ct(this._lodPlanes[0],e);this._renderer.compile(t,go)}_sceneToCubeUV(e,t,n,i){const a=new Nt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Jl),h.toneMapping=ai,h.autoClear=!1;const m=new Yt({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1}),g=new ct(new Ht,m);let _=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,_=!0):(m.color.copy(Jl),_=!0);for(let f=0;f<6;f++){const E=f%3;E===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):E===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const M=this._cubeSize;dr(i,E*M,f>2?M:0,M,M),h.setRenderTarget(i),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===ns||e.mapping===is;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=ic()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=nc());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new ct(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;dr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,go)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Ql[(i-r-1)%Ql.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ct(this._lodPlanes[i],c),d=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Mi-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):Mi;p>Mi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Mi}`);const f=[];let E=0;for(let A=0;A<Mi;++A){const P=A/_,T=Math.exp(-P*P/2);f.push(T),A===0?E+=T:A<p&&(E+=2*T)}for(let A=0;A<f.length;A++)f[A]=f[A]/E;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;const v=this._sizeLods[i],O=3*v*(i>M-Yi?i-M+Yi:0),R=4*(this._cubeSize-v);dr(t,O,R,3*v,2*v),l.setRenderTarget(t),l.render(u,go)}}function Km(s){const e=[],t=[],n=[];let i=s;const r=s-Yi+1+Zl.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>s-Yi?l=Zl[o-s+Yi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,g=6,_=3,p=2,f=1,E=new Float32Array(_*g*m),M=new Float32Array(p*g*m),v=new Float32Array(f*g*m);for(let R=0;R<m;R++){const A=R%3*2/3-1,P=R>2?0:-1,T=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];E.set(T,_*g*R),M.set(d,p*g*R);const y=[R,R,R,R,R,R];v.set(y,f*g*R)}const O=new Zt;O.setAttribute("position",new Ft(E,_)),O.setAttribute("uv",new Ft(M,p)),O.setAttribute("faceIndex",new Ft(v,f)),e.push(O),i>Yi&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function tc(s,e,t){const n=new Ri(s,e,t);return n.texture.mapping=Hr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function dr(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Zm(s,e,t){const n=new Float32Array(Mi),i=new L(0,1,0);return new li({name:"SphericalGaussianBlur",defines:{n:Mi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ja(),fragmentShader:`

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
		`,blending:oi,depthTest:!1,depthWrite:!1})}function nc(){return new li({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ja(),fragmentShader:`

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
		`,blending:oi,depthTest:!1,depthWrite:!1})}function ic(){return new li({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ja(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function ja(){return`

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
	`}function Jm(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===$o||l===Yo,h=l===ns||l===is;if(c||h){let u=e.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new ec(s)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const m=a.image;return c&&m&&m.height>0||h&&m&&i(m)?(t===null&&(t=new ec(s)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Qm(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Ps("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function eg(s,e,t,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let p=0,f=_.length;p<f;p++)e.remove(_[p])}d.removeEventListener("dispose",o),delete i[d.id];const m=r.get(d);m&&(e.remove(m),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],s.ARRAY_BUFFER);const m=u.morphAttributes;for(const g in m){const _=m[g];for(let p=0,f=_.length;p<f;p++)e.update(_[p],s.ARRAY_BUFFER)}}function c(u){const d=[],m=u.index,g=u.attributes.position;let _=0;if(m!==null){const E=m.array;_=m.version;for(let M=0,v=E.length;M<v;M+=3){const O=E[M+0],R=E[M+1],A=E[M+2];d.push(O,R,R,A,A,O)}}else if(g!==void 0){const E=g.array;_=g.version;for(let M=0,v=E.length/3-1;M<v;M+=3){const O=M+0,R=M+1,A=M+2;d.push(O,R,R,A,A,O)}}else return;const p=new(bh(d)?Ah:wh)(d,1);p.version=_;const f=r.get(u);f&&e.remove(f),r.set(u,p)}function h(u){const d=r.get(u);if(d){const m=u.index;m!==null&&d.version<m.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function tg(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,m){s.drawElements(n,m,r,d*o),t.update(m,n,1)}function c(d,m,g){g!==0&&(s.drawElementsInstanced(n,m,r,d*o,g),t.update(m,n,g))}function h(d,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,d,0,g);let p=0;for(let f=0;f<g;f++)p+=m[f];t.update(p,n,1)}function u(d,m,g,_){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<d.length;f++)c(d[f]/o,m[f],_[f]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,r,d,0,_,0,g);let f=0;for(let E=0;E<g;E++)f+=m[E]*_[E];t.update(f,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function ng(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function ig(s,e,t){const n=new WeakMap,i=new Je;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let y=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var m=y;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),p===!0&&(v=3);let O=a.attributes.position.count*v,R=1;O>e.maxTextureSize&&(R=Math.ceil(O/e.maxTextureSize),O=e.maxTextureSize);const A=new Float32Array(O*R*4*u),P=new Sh(A,O,R,u);P.type=mn,P.needsUpdate=!0;const T=v*4;for(let C=0;C<u;C++){const W=f[C],V=E[C],Y=M[C],j=O*R*4*C;for(let q=0;q<W.count;q++){const J=q*T;g===!0&&(i.fromBufferAttribute(W,q),A[j+J+0]=i.x,A[j+J+1]=i.y,A[j+J+2]=i.z,A[j+J+3]=0),_===!0&&(i.fromBufferAttribute(V,q),A[j+J+4]=i.x,A[j+J+5]=i.y,A[j+J+6]=i.z,A[j+J+7]=0),p===!0&&(i.fromBufferAttribute(Y,q),A[j+J+8]=i.x,A[j+J+9]=i.y,A[j+J+10]=i.z,A[j+J+11]=Y.itemSize===4?i.w:1)}}d={count:u,texture:P,size:new Ge(O,R)},n.set(a,d),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",_),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function sg(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}class Ih extends wt{constructor(e,t,n,i,r,o,a,l,c,h=Zi){if(h!==Zi&&h!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Zi&&(n=Ai),n===void 0&&h===os&&(n=rs),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:It,this.minFilter=l!==void 0?l:It,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Dh=new wt,sc=new Ih(1,1),Uh=new Sh,kh=new Gd,Nh=new Ph,rc=[],oc=[],ac=new Float32Array(16),lc=new Float32Array(9),cc=new Float32Array(4);function fs(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=rc[i];if(r===void 0&&(r=new Float32Array(i),rc[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function St(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Tt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Xr(s,e){let t=oc[e];t===void 0&&(t=new Int32Array(e),oc[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function rg(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function og(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;s.uniform2fv(this.addr,e),Tt(t,e)}}function ag(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(St(t,e))return;s.uniform3fv(this.addr,e),Tt(t,e)}}function lg(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;s.uniform4fv(this.addr,e),Tt(t,e)}}function cg(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(St(t,n))return;cc.set(n),s.uniformMatrix2fv(this.addr,!1,cc),Tt(t,n)}}function hg(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(St(t,n))return;lc.set(n),s.uniformMatrix3fv(this.addr,!1,lc),Tt(t,n)}}function ug(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(St(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(St(t,n))return;ac.set(n),s.uniformMatrix4fv(this.addr,!1,ac),Tt(t,n)}}function dg(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function fg(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;s.uniform2iv(this.addr,e),Tt(t,e)}}function pg(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;s.uniform3iv(this.addr,e),Tt(t,e)}}function mg(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;s.uniform4iv(this.addr,e),Tt(t,e)}}function gg(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function _g(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(St(t,e))return;s.uniform2uiv(this.addr,e),Tt(t,e)}}function xg(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(St(t,e))return;s.uniform3uiv(this.addr,e),Tt(t,e)}}function vg(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(St(t,e))return;s.uniform4uiv(this.addr,e),Tt(t,e)}}function yg(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(sc.compareFunction=yh,r=sc):r=Dh,t.setTexture2D(e||r,i)}function bg(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||kh,i)}function Mg(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Nh,i)}function Sg(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Uh,i)}function Tg(s){switch(s){case 5126:return rg;case 35664:return og;case 35665:return ag;case 35666:return lg;case 35674:return cg;case 35675:return hg;case 35676:return ug;case 5124:case 35670:return dg;case 35667:case 35671:return fg;case 35668:case 35672:return pg;case 35669:case 35673:return mg;case 5125:return gg;case 36294:return _g;case 36295:return xg;case 36296:return vg;case 35678:case 36198:case 36298:case 36306:case 35682:return yg;case 35679:case 36299:case 36307:return bg;case 35680:case 36300:case 36308:case 36293:return Mg;case 36289:case 36303:case 36311:case 36292:return Sg}}function Eg(s,e){s.uniform1fv(this.addr,e)}function wg(s,e){const t=fs(e,this.size,2);s.uniform2fv(this.addr,t)}function Ag(s,e){const t=fs(e,this.size,3);s.uniform3fv(this.addr,t)}function Rg(s,e){const t=fs(e,this.size,4);s.uniform4fv(this.addr,t)}function Cg(s,e){const t=fs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Pg(s,e){const t=fs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Lg(s,e){const t=fs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Ig(s,e){s.uniform1iv(this.addr,e)}function Dg(s,e){s.uniform2iv(this.addr,e)}function Ug(s,e){s.uniform3iv(this.addr,e)}function kg(s,e){s.uniform4iv(this.addr,e)}function Ng(s,e){s.uniform1uiv(this.addr,e)}function Fg(s,e){s.uniform2uiv(this.addr,e)}function Og(s,e){s.uniform3uiv(this.addr,e)}function Bg(s,e){s.uniform4uiv(this.addr,e)}function zg(s,e,t){const n=this.cache,i=e.length,r=Xr(t,i);St(n,r)||(s.uniform1iv(this.addr,r),Tt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Dh,r[o])}function Hg(s,e,t){const n=this.cache,i=e.length,r=Xr(t,i);St(n,r)||(s.uniform1iv(this.addr,r),Tt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||kh,r[o])}function Vg(s,e,t){const n=this.cache,i=e.length,r=Xr(t,i);St(n,r)||(s.uniform1iv(this.addr,r),Tt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Nh,r[o])}function Gg(s,e,t){const n=this.cache,i=e.length,r=Xr(t,i);St(n,r)||(s.uniform1iv(this.addr,r),Tt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Uh,r[o])}function Wg(s){switch(s){case 5126:return Eg;case 35664:return wg;case 35665:return Ag;case 35666:return Rg;case 35674:return Cg;case 35675:return Pg;case 35676:return Lg;case 5124:case 35670:return Ig;case 35667:case 35671:return Dg;case 35668:case 35672:return Ug;case 35669:case 35673:return kg;case 5125:return Ng;case 36294:return Fg;case 36295:return Og;case 36296:return Bg;case 35678:case 36198:case 36298:case 36306:case 35682:return zg;case 35679:case 36299:case 36307:return Hg;case 35680:case 36300:case 36308:case 36293:return Vg;case 36289:case 36303:case 36311:case 36292:return Gg}}class Xg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Tg(t.type)}}class qg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Wg(t.type)}}class $g{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const bo=/(\w+)(\])?(\[|\.)?/g;function hc(s,e){s.seq.push(e),s.map[e.id]=e}function Yg(s,e,t){const n=s.name,i=n.length;for(bo.lastIndex=0;;){const r=bo.exec(n),o=bo.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){hc(t,c===void 0?new Xg(a,s,e):new qg(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new $g(a),hc(t,u)),t=u}}}class Ir{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);Yg(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function uc(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const jg=37297;let Kg=0;function Zg(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const dc=new Ne;function Jg(s){Ve._getMatrix(dc,Ve.workingColorSpace,s);const e=`mat3( ${dc.elements.map(t=>t.toFixed(4))} )`;switch(Ve.getTransfer(s)){case Vr:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function fc(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+Zg(s.getShaderSource(e),o)}else return i}function Qg(s,e){const t=Jg(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function e0(s,e){let t;switch(e){case Zu:t="Linear";break;case Ju:t="Reinhard";break;case Qu:t="Cineon";break;case ed:t="ACESFilmic";break;case nd:t="AgX";break;case id:t="Neutral";break;case td:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const fr=new L;function t0(){Ve.getLuminanceCoefficients(fr);const s=fr.x.toFixed(4),e=fr.y.toFixed(4),t=fr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function n0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ls).join(`
`)}function i0(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function s0(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Ls(s){return s!==""}function pc(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function mc(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const r0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sa(s){return s.replace(r0,a0)}const o0=new Map;function a0(s,e){let t=Oe[e];if(t===void 0){const n=o0.get(e);if(n!==void 0)t=Oe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Sa(t)}const l0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gc(s){return s.replace(l0,c0)}function c0(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function _c(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function h0(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Na?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Pu?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Fn&&(e="SHADOWMAP_TYPE_VSM"),e}function u0(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ns:case is:e="ENVMAP_TYPE_CUBE";break;case Hr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function d0(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case is:e="ENVMAP_MODE_REFRACTION";break}return e}function f0(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Fa:e="ENVMAP_BLENDING_MULTIPLY";break;case ju:e="ENVMAP_BLENDING_MIX";break;case Ku:e="ENVMAP_BLENDING_ADD";break}return e}function p0(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function m0(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=h0(t),c=u0(t),h=d0(t),u=f0(t),d=p0(t),m=n0(t),g=i0(r),_=i.createProgram();let p,f,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ls).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ls).join(`
`),f.length>0&&(f+=`
`)):(p=[_c(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ls).join(`
`),f=[_c(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ai?"#define TONE_MAPPING":"",t.toneMapping!==ai?Oe.tonemapping_pars_fragment:"",t.toneMapping!==ai?e0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,Qg("linearToOutputTexel",t.outputColorSpace),t0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ls).join(`
`)),o=Sa(o),o=pc(o,t),o=mc(o,t),a=Sa(a),a=pc(a,t),a=mc(a,t),o=gc(o),a=gc(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",t.glslVersion===Cl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Cl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const M=E+p+o,v=E+f+a,O=uc(i,i.VERTEX_SHADER,M),R=uc(i,i.FRAGMENT_SHADER,v);i.attachShader(_,O),i.attachShader(_,R),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function A(C){if(s.debug.checkShaderErrors){const W=i.getProgramInfoLog(_).trim(),V=i.getShaderInfoLog(O).trim(),Y=i.getShaderInfoLog(R).trim();let j=!0,q=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(j=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,O,R);else{const J=fc(i,O,"vertex"),D=fc(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+W+`
`+J+`
`+D)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(V===""||Y==="")&&(q=!1);q&&(C.diagnostics={runnable:j,programLog:W,vertexShader:{log:V,prefix:p},fragmentShader:{log:Y,prefix:f}})}i.deleteShader(O),i.deleteShader(R),P=new Ir(i,_),T=s0(i,_)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(_,jg)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Kg++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=O,this.fragmentShader=R,this}let g0=0;class _0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new x0(e),t.set(e,n)),n}}class x0{constructor(e){this.id=g0++,this.code=e,this.usedTimes=0}}function v0(s,e,t,n,i,r,o){const a=new Th,l=new _0,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let m=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(T){return c.add(T),T===0?"uv":`uv${T}`}function p(T,y,C,W,V){const Y=W.fog,j=V.geometry,q=T.isMeshStandardMaterial?W.environment:null,J=(T.isMeshStandardMaterial?t:e).get(T.envMap||q),D=J&&J.mapping===Hr?J.image.height:null,ee=g[T.type];T.precision!==null&&(m=i.getMaxPrecision(T.precision),m!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",m,"instead."));const ne=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,re=ne!==void 0?ne.length:0;let Ee=0;j.morphAttributes.position!==void 0&&(Ee=1),j.morphAttributes.normal!==void 0&&(Ee=2),j.morphAttributes.color!==void 0&&(Ee=3);let Ze,X,se,ye;if(ee){const tt=yn[ee];Ze=tt.vertexShader,X=tt.fragmentShader}else Ze=T.vertexShader,X=T.fragmentShader,l.update(T),se=l.getVertexShaderID(T),ye=l.getFragmentShaderID(T);const ce=s.getRenderTarget(),Ce=s.state.buffers.depth.getReversed(),De=V.isInstancedMesh===!0,Be=V.isBatchedMesh===!0,gt=!!T.map,$e=!!T.matcap,vt=!!J,F=!!T.aoMap,Jt=!!T.lightMap,We=!!T.bumpMap,Xe=!!T.normalMap,we=!!T.displacementMap,ht=!!T.emissiveMap,Te=!!T.metalnessMap,w=!!T.roughnessMap,x=T.anisotropy>0,B=T.clearcoat>0,K=T.dispersion>0,Q=T.iridescence>0,$=T.sheen>0,be=T.transmission>0,he=x&&!!T.anisotropyMap,pe=B&&!!T.clearcoatMap,Ye=B&&!!T.clearcoatNormalMap,te=B&&!!T.clearcoatRoughnessMap,me=Q&&!!T.iridescenceMap,Re=Q&&!!T.iridescenceThicknessMap,Le=$&&!!T.sheenColorMap,ge=$&&!!T.sheenRoughnessMap,qe=!!T.specularMap,Fe=!!T.specularColorMap,at=!!T.specularIntensityMap,I=be&&!!T.transmissionMap,le=be&&!!T.thicknessMap,G=!!T.gradientMap,Z=!!T.alphaMap,fe=T.alphaTest>0,ue=!!T.alphaHash,Ue=!!T.extensions;let _t=ai;T.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(_t=s.toneMapping);const Rt={shaderID:ee,shaderType:T.type,shaderName:T.name,vertexShader:Ze,fragmentShader:X,defines:T.defines,customVertexShaderID:se,customFragmentShaderID:ye,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:m,batching:Be,batchingColor:Be&&V._colorsTexture!==null,instancing:De,instancingColor:De&&V.instanceColor!==null,instancingMorph:De&&V.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ce===null?s.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:Ot,alphaToCoverage:!!T.alphaToCoverage,map:gt,matcap:$e,envMap:vt,envMapMode:vt&&J.mapping,envMapCubeUVHeight:D,aoMap:F,lightMap:Jt,bumpMap:We,normalMap:Xe,displacementMap:d&&we,emissiveMap:ht,normalMapObjectSpace:Xe&&T.normalMapType===cd,normalMapTangentSpace:Xe&&T.normalMapType===Xa,metalnessMap:Te,roughnessMap:w,anisotropy:x,anisotropyMap:he,clearcoat:B,clearcoatMap:pe,clearcoatNormalMap:Ye,clearcoatRoughnessMap:te,dispersion:K,iridescence:Q,iridescenceMap:me,iridescenceThicknessMap:Re,sheen:$,sheenColorMap:Le,sheenRoughnessMap:ge,specularMap:qe,specularColorMap:Fe,specularIntensityMap:at,transmission:be,transmissionMap:I,thicknessMap:le,gradientMap:G,opaque:T.transparent===!1&&T.blending===Ki&&T.alphaToCoverage===!1,alphaMap:Z,alphaTest:fe,alphaHash:ue,combine:T.combine,mapUv:gt&&_(T.map.channel),aoMapUv:F&&_(T.aoMap.channel),lightMapUv:Jt&&_(T.lightMap.channel),bumpMapUv:We&&_(T.bumpMap.channel),normalMapUv:Xe&&_(T.normalMap.channel),displacementMapUv:we&&_(T.displacementMap.channel),emissiveMapUv:ht&&_(T.emissiveMap.channel),metalnessMapUv:Te&&_(T.metalnessMap.channel),roughnessMapUv:w&&_(T.roughnessMap.channel),anisotropyMapUv:he&&_(T.anisotropyMap.channel),clearcoatMapUv:pe&&_(T.clearcoatMap.channel),clearcoatNormalMapUv:Ye&&_(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&_(T.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&_(T.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&_(T.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&_(T.sheenColorMap.channel),sheenRoughnessMapUv:ge&&_(T.sheenRoughnessMap.channel),specularMapUv:qe&&_(T.specularMap.channel),specularColorMapUv:Fe&&_(T.specularColorMap.channel),specularIntensityMapUv:at&&_(T.specularIntensityMap.channel),transmissionMapUv:I&&_(T.transmissionMap.channel),thicknessMapUv:le&&_(T.thicknessMap.channel),alphaMapUv:Z&&_(T.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Xe||x),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!j.attributes.uv&&(gt||Z),fog:!!Y,useFog:T.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ce,skinning:V.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:Ee,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:_t,decodeVideoTexture:gt&&T.map.isVideoTexture===!0&&Ve.getTransfer(T.map.colorSpace)===rt,decodeVideoTextureEmissive:ht&&T.emissiveMap.isVideoTexture===!0&&Ve.getTransfer(T.emissiveMap.colorSpace)===rt,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===dn,flipSided:T.side===Vt,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Ue&&T.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ue&&T.extensions.multiDraw===!0||Be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Rt.vertexUv1s=c.has(1),Rt.vertexUv2s=c.has(2),Rt.vertexUv3s=c.has(3),c.clear(),Rt}function f(T){const y=[];if(T.shaderID?y.push(T.shaderID):(y.push(T.customVertexShaderID),y.push(T.customFragmentShaderID)),T.defines!==void 0)for(const C in T.defines)y.push(C),y.push(T.defines[C]);return T.isRawShaderMaterial===!1&&(E(y,T),M(y,T),y.push(s.outputColorSpace)),y.push(T.customProgramCacheKey),y.join()}function E(T,y){T.push(y.precision),T.push(y.outputColorSpace),T.push(y.envMapMode),T.push(y.envMapCubeUVHeight),T.push(y.mapUv),T.push(y.alphaMapUv),T.push(y.lightMapUv),T.push(y.aoMapUv),T.push(y.bumpMapUv),T.push(y.normalMapUv),T.push(y.displacementMapUv),T.push(y.emissiveMapUv),T.push(y.metalnessMapUv),T.push(y.roughnessMapUv),T.push(y.anisotropyMapUv),T.push(y.clearcoatMapUv),T.push(y.clearcoatNormalMapUv),T.push(y.clearcoatRoughnessMapUv),T.push(y.iridescenceMapUv),T.push(y.iridescenceThicknessMapUv),T.push(y.sheenColorMapUv),T.push(y.sheenRoughnessMapUv),T.push(y.specularMapUv),T.push(y.specularColorMapUv),T.push(y.specularIntensityMapUv),T.push(y.transmissionMapUv),T.push(y.thicknessMapUv),T.push(y.combine),T.push(y.fogExp2),T.push(y.sizeAttenuation),T.push(y.morphTargetsCount),T.push(y.morphAttributeCount),T.push(y.numDirLights),T.push(y.numPointLights),T.push(y.numSpotLights),T.push(y.numSpotLightMaps),T.push(y.numHemiLights),T.push(y.numRectAreaLights),T.push(y.numDirLightShadows),T.push(y.numPointLightShadows),T.push(y.numSpotLightShadows),T.push(y.numSpotLightShadowsWithMaps),T.push(y.numLightProbes),T.push(y.shadowMapType),T.push(y.toneMapping),T.push(y.numClippingPlanes),T.push(y.numClipIntersection),T.push(y.depthPacking)}function M(T,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),T.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),T.push(a.mask)}function v(T){const y=g[T.type];let C;if(y){const W=yn[y];C=tf.clone(W.uniforms)}else C=T.uniforms;return C}function O(T,y){let C;for(let W=0,V=h.length;W<V;W++){const Y=h[W];if(Y.cacheKey===y){C=Y,++C.usedTimes;break}}return C===void 0&&(C=new m0(s,y,T,r),h.push(C)),C}function R(T){if(--T.usedTimes===0){const y=h.indexOf(T);h[y]=h[h.length-1],h.pop(),T.destroy()}}function A(T){l.remove(T)}function P(){l.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:v,acquireProgram:O,releaseProgram:R,releaseShaderCache:A,programs:h,dispose:P}}function y0(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function b0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function xc(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function vc(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,m,g,_,p){let f=s[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:m,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},s[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=m,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=p),e++,f}function a(u,d,m,g,_,p){const f=o(u,d,m,g,_,p);m.transmission>0?n.push(f):m.transparent===!0?i.push(f):t.push(f)}function l(u,d,m,g,_,p){const f=o(u,d,m,g,_,p);m.transmission>0?n.unshift(f):m.transparent===!0?i.unshift(f):t.unshift(f)}function c(u,d){t.length>1&&t.sort(u||b0),n.length>1&&n.sort(d||xc),i.length>1&&i.sort(d||xc)}function h(){for(let u=e,d=s.length;u<d;u++){const m=s[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function M0(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new vc,s.set(n,[o])):i>=r.length?(o=new vc,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function S0(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Se};break;case"SpotLight":t={position:new L,direction:new L,color:new Se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Se,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Se,groundColor:new Se};break;case"RectAreaLight":t={color:new Se,position:new L,halfWidth:new L,halfHeight:new L};break}return s[e.id]=t,t}}}function T0(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let E0=0;function w0(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function A0(s){const e=new S0,t=T0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const i=new L,r=new Pe,o=new Pe;function a(c){let h=0,u=0,d=0;for(let T=0;T<9;T++)n.probe[T].set(0,0,0);let m=0,g=0,_=0,p=0,f=0,E=0,M=0,v=0,O=0,R=0,A=0;c.sort(w0);for(let T=0,y=c.length;T<y;T++){const C=c[T],W=C.color,V=C.intensity,Y=C.distance,j=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=W.r*V,u+=W.g*V,d+=W.b*V;else if(C.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(C.sh.coefficients[q],V);A++}else if(C.isDirectionalLight){const q=e.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const J=C.shadow,D=t.get(C);D.shadowIntensity=J.intensity,D.shadowBias=J.bias,D.shadowNormalBias=J.normalBias,D.shadowRadius=J.radius,D.shadowMapSize=J.mapSize,n.directionalShadow[m]=D,n.directionalShadowMap[m]=j,n.directionalShadowMatrix[m]=C.shadow.matrix,E++}n.directional[m]=q,m++}else if(C.isSpotLight){const q=e.get(C);q.position.setFromMatrixPosition(C.matrixWorld),q.color.copy(W).multiplyScalar(V),q.distance=Y,q.coneCos=Math.cos(C.angle),q.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),q.decay=C.decay,n.spot[_]=q;const J=C.shadow;if(C.map&&(n.spotLightMap[O]=C.map,O++,J.updateMatrices(C),C.castShadow&&R++),n.spotLightMatrix[_]=J.matrix,C.castShadow){const D=t.get(C);D.shadowIntensity=J.intensity,D.shadowBias=J.bias,D.shadowNormalBias=J.normalBias,D.shadowRadius=J.radius,D.shadowMapSize=J.mapSize,n.spotShadow[_]=D,n.spotShadowMap[_]=j,v++}_++}else if(C.isRectAreaLight){const q=e.get(C);q.color.copy(W).multiplyScalar(V),q.halfWidth.set(C.width*.5,0,0),q.halfHeight.set(0,C.height*.5,0),n.rectArea[p]=q,p++}else if(C.isPointLight){const q=e.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),q.distance=C.distance,q.decay=C.decay,C.castShadow){const J=C.shadow,D=t.get(C);D.shadowIntensity=J.intensity,D.shadowBias=J.bias,D.shadowNormalBias=J.normalBias,D.shadowRadius=J.radius,D.shadowMapSize=J.mapSize,D.shadowCameraNear=J.camera.near,D.shadowCameraFar=J.camera.far,n.pointShadow[g]=D,n.pointShadowMap[g]=j,n.pointShadowMatrix[g]=C.shadow.matrix,M++}n.point[g]=q,g++}else if(C.isHemisphereLight){const q=e.get(C);q.skyColor.copy(C.color).multiplyScalar(V),q.groundColor.copy(C.groundColor).multiplyScalar(V),n.hemi[f]=q,f++}}p>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ae.LTC_FLOAT_1,n.rectAreaLTC2=ae.LTC_FLOAT_2):(n.rectAreaLTC1=ae.LTC_HALF_1,n.rectAreaLTC2=ae.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const P=n.hash;(P.directionalLength!==m||P.pointLength!==g||P.spotLength!==_||P.rectAreaLength!==p||P.hemiLength!==f||P.numDirectionalShadows!==E||P.numPointShadows!==M||P.numSpotShadows!==v||P.numSpotMaps!==O||P.numLightProbes!==A)&&(n.directional.length=m,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=E,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=v+O-R,n.spotLightMap.length=O,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=A,P.directionalLength=m,P.pointLength=g,P.spotLength=_,P.rectAreaLength=p,P.hemiLength=f,P.numDirectionalShadows=E,P.numPointShadows=M,P.numSpotShadows=v,P.numSpotMaps=O,P.numLightProbes=A,n.version=E0++)}function l(c,h){let u=0,d=0,m=0,g=0,_=0;const p=h.matrixWorldInverse;for(let f=0,E=c.length;f<E;f++){const M=c[f];if(M.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),u++}else if(M.isSpotLight){const v=n.spot[m];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),m++}else if(M.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(p),o.identity(),r.copy(M.matrixWorld),r.premultiply(p),o.extractRotation(r),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(p),d++}else if(M.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(p),_++}}}return{setup:a,setupView:l,state:n}}function yc(s){const e=new A0(s),t=[],n=[];function i(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function R0(s){let e=new WeakMap;function t(i,r=0){const o=e.get(i);let a;return o===void 0?(a=new yc(s),e.set(i,[a])):r>=o.length?(a=new yc(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class C0 extends _n{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=ad,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class P0 extends _n{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const L0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,I0=`uniform sampler2D shadow_pass;
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
}`;function D0(s,e,t){let n=new $a;const i=new Ge,r=new Ge,o=new Je,a=new C0({depthPacking:ld}),l=new P0,c={},h=t.maxTextureSize,u={[Vn]:Vt,[Vt]:Vn,[dn]:dn},d=new li({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ge},radius:{value:4}},vertexShader:L0,fragmentShader:I0}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const g=new Zt;g.setAttribute("position",new Ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ct(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Na;let f=this.type;this.render=function(R,A,P){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;const T=s.getRenderTarget(),y=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),W=s.state;W.setBlending(oi),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const V=f!==Fn&&this.type===Fn,Y=f===Fn&&this.type!==Fn;for(let j=0,q=R.length;j<q;j++){const J=R[j],D=J.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;i.copy(D.mapSize);const ee=D.getFrameExtents();if(i.multiply(ee),r.copy(D.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ee.x),i.x=r.x*ee.x,D.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ee.y),i.y=r.y*ee.y,D.mapSize.y=r.y)),D.map===null||V===!0||Y===!0){const re=this.type!==Fn?{minFilter:It,magFilter:It}:{};D.map!==null&&D.map.dispose(),D.map=new Ri(i.x,i.y,re),D.map.texture.name=J.name+".shadowMap",D.camera.updateProjectionMatrix()}s.setRenderTarget(D.map),s.clear();const ne=D.getViewportCount();for(let re=0;re<ne;re++){const Ee=D.getViewport(re);o.set(r.x*Ee.x,r.y*Ee.y,r.x*Ee.z,r.y*Ee.w),W.viewport(o),D.updateMatrices(J,re),n=D.getFrustum(),v(A,P,D.camera,J,this.type)}D.isPointLightShadow!==!0&&this.type===Fn&&E(D,P),D.needsUpdate=!1}f=this.type,p.needsUpdate=!1,s.setRenderTarget(T,y,C)};function E(R,A){const P=e.update(_);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Ri(i.x,i.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,s.setRenderTarget(R.mapPass),s.clear(),s.renderBufferDirect(A,null,P,d,_,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,s.setRenderTarget(R.map),s.clear(),s.renderBufferDirect(A,null,P,m,_,null)}function M(R,A,P,T){let y=null;const C=P.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(C!==void 0)y=C;else if(y=P.isPointLight===!0?l:a,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const W=y.uuid,V=A.uuid;let Y=c[W];Y===void 0&&(Y={},c[W]=Y);let j=Y[V];j===void 0&&(j=y.clone(),Y[V]=j,A.addEventListener("dispose",O)),y=j}if(y.visible=A.visible,y.wireframe=A.wireframe,T===Fn?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:u[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,P.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const W=s.properties.get(y);W.light=P}return y}function v(R,A,P,T,y){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&y===Fn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,R.matrixWorld);const V=e.update(R),Y=R.material;if(Array.isArray(Y)){const j=V.groups;for(let q=0,J=j.length;q<J;q++){const D=j[q],ee=Y[D.materialIndex];if(ee&&ee.visible){const ne=M(R,ee,T,y);R.onBeforeShadow(s,R,A,P,V,ne,D),s.renderBufferDirect(P,null,V,ne,R,D),R.onAfterShadow(s,R,A,P,V,ne,D)}}}else if(Y.visible){const j=M(R,Y,T,y);R.onBeforeShadow(s,R,A,P,V,j,null),s.renderBufferDirect(P,null,V,j,R,null),R.onAfterShadow(s,R,A,P,V,j,null)}}const W=R.children;for(let V=0,Y=W.length;V<Y;V++)v(W[V],A,P,T,y)}function O(R){R.target.removeEventListener("dispose",O);for(const P in c){const T=c[P],y=R.target.uuid;y in T&&(T[y].dispose(),delete T[y])}}}const U0={[zo]:Ho,[Vo]:Xo,[Go]:qo,[ts]:Wo,[Ho]:zo,[Xo]:Vo,[qo]:Go,[Wo]:ts};function k0(s,e){function t(){let I=!1;const le=new Je;let G=null;const Z=new Je(0,0,0,0);return{setMask:function(fe){G!==fe&&!I&&(s.colorMask(fe,fe,fe,fe),G=fe)},setLocked:function(fe){I=fe},setClear:function(fe,ue,Ue,_t,Rt){Rt===!0&&(fe*=_t,ue*=_t,Ue*=_t),le.set(fe,ue,Ue,_t),Z.equals(le)===!1&&(s.clearColor(fe,ue,Ue,_t),Z.copy(le))},reset:function(){I=!1,G=null,Z.set(-1,0,0,0)}}}function n(){let I=!1,le=!1,G=null,Z=null,fe=null;return{setReversed:function(ue){if(le!==ue){const Ue=e.get("EXT_clip_control");le?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT);const _t=fe;fe=null,this.setClear(_t)}le=ue},getReversed:function(){return le},setTest:function(ue){ue?ce(s.DEPTH_TEST):Ce(s.DEPTH_TEST)},setMask:function(ue){G!==ue&&!I&&(s.depthMask(ue),G=ue)},setFunc:function(ue){if(le&&(ue=U0[ue]),Z!==ue){switch(ue){case zo:s.depthFunc(s.NEVER);break;case Ho:s.depthFunc(s.ALWAYS);break;case Vo:s.depthFunc(s.LESS);break;case ts:s.depthFunc(s.LEQUAL);break;case Go:s.depthFunc(s.EQUAL);break;case Wo:s.depthFunc(s.GEQUAL);break;case Xo:s.depthFunc(s.GREATER);break;case qo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Z=ue}},setLocked:function(ue){I=ue},setClear:function(ue){fe!==ue&&(le&&(ue=1-ue),s.clearDepth(ue),fe=ue)},reset:function(){I=!1,G=null,Z=null,fe=null,le=!1}}}function i(){let I=!1,le=null,G=null,Z=null,fe=null,ue=null,Ue=null,_t=null,Rt=null;return{setTest:function(tt){I||(tt?ce(s.STENCIL_TEST):Ce(s.STENCIL_TEST))},setMask:function(tt){le!==tt&&!I&&(s.stencilMask(tt),le=tt)},setFunc:function(tt,on,wn){(G!==tt||Z!==on||fe!==wn)&&(s.stencilFunc(tt,on,wn),G=tt,Z=on,fe=wn)},setOp:function(tt,on,wn){(ue!==tt||Ue!==on||_t!==wn)&&(s.stencilOp(tt,on,wn),ue=tt,Ue=on,_t=wn)},setLocked:function(tt){I=tt},setClear:function(tt){Rt!==tt&&(s.clearStencil(tt),Rt=tt)},reset:function(){I=!1,le=null,G=null,Z=null,fe=null,ue=null,Ue=null,_t=null,Rt=null}}}const r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,m=[],g=null,_=!1,p=null,f=null,E=null,M=null,v=null,O=null,R=null,A=new Se(0,0,0),P=0,T=!1,y=null,C=null,W=null,V=null,Y=null;const j=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,J=0;const D=s.getParameter(s.VERSION);D.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(D)[1]),q=J>=1):D.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),q=J>=2);let ee=null,ne={};const re=s.getParameter(s.SCISSOR_BOX),Ee=s.getParameter(s.VIEWPORT),Ze=new Je().fromArray(re),X=new Je().fromArray(Ee);function se(I,le,G,Z){const fe=new Uint8Array(4),ue=s.createTexture();s.bindTexture(I,ue),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ue=0;Ue<G;Ue++)I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY?s.texImage3D(le,0,s.RGBA,1,1,Z,0,s.RGBA,s.UNSIGNED_BYTE,fe):s.texImage2D(le+Ue,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,fe);return ue}const ye={};ye[s.TEXTURE_2D]=se(s.TEXTURE_2D,s.TEXTURE_2D,1),ye[s.TEXTURE_CUBE_MAP]=se(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ye[s.TEXTURE_2D_ARRAY]=se(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ye[s.TEXTURE_3D]=se(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ce(s.DEPTH_TEST),o.setFunc(ts),We(!1),Xe(yl),ce(s.CULL_FACE),F(oi);function ce(I){h[I]!==!0&&(s.enable(I),h[I]=!0)}function Ce(I){h[I]!==!1&&(s.disable(I),h[I]=!1)}function De(I,le){return u[I]!==le?(s.bindFramebuffer(I,le),u[I]=le,I===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=le),I===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=le),!0):!1}function Be(I,le){let G=m,Z=!1;if(I){G=d.get(le),G===void 0&&(G=[],d.set(le,G));const fe=I.textures;if(G.length!==fe.length||G[0]!==s.COLOR_ATTACHMENT0){for(let ue=0,Ue=fe.length;ue<Ue;ue++)G[ue]=s.COLOR_ATTACHMENT0+ue;G.length=fe.length,Z=!0}}else G[0]!==s.BACK&&(G[0]=s.BACK,Z=!0);Z&&s.drawBuffers(G)}function gt(I){return g!==I?(s.useProgram(I),g=I,!0):!1}const $e={[bi]:s.FUNC_ADD,[Iu]:s.FUNC_SUBTRACT,[Du]:s.FUNC_REVERSE_SUBTRACT};$e[Uu]=s.MIN,$e[ku]=s.MAX;const vt={[Nu]:s.ZERO,[Fu]:s.ONE,[Ou]:s.SRC_COLOR,[Oo]:s.SRC_ALPHA,[Wu]:s.SRC_ALPHA_SATURATE,[Vu]:s.DST_COLOR,[zu]:s.DST_ALPHA,[Bu]:s.ONE_MINUS_SRC_COLOR,[Bo]:s.ONE_MINUS_SRC_ALPHA,[Gu]:s.ONE_MINUS_DST_COLOR,[Hu]:s.ONE_MINUS_DST_ALPHA,[Xu]:s.CONSTANT_COLOR,[qu]:s.ONE_MINUS_CONSTANT_COLOR,[$u]:s.CONSTANT_ALPHA,[Yu]:s.ONE_MINUS_CONSTANT_ALPHA};function F(I,le,G,Z,fe,ue,Ue,_t,Rt,tt){if(I===oi){_===!0&&(Ce(s.BLEND),_=!1);return}if(_===!1&&(ce(s.BLEND),_=!0),I!==Lu){if(I!==p||tt!==T){if((f!==bi||v!==bi)&&(s.blendEquation(s.FUNC_ADD),f=bi,v=bi),tt)switch(I){case Ki:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case bl:s.blendFunc(s.ONE,s.ONE);break;case Ml:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Sl:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Ki:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case bl:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Ml:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Sl:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}E=null,M=null,O=null,R=null,A.set(0,0,0),P=0,p=I,T=tt}return}fe=fe||le,ue=ue||G,Ue=Ue||Z,(le!==f||fe!==v)&&(s.blendEquationSeparate($e[le],$e[fe]),f=le,v=fe),(G!==E||Z!==M||ue!==O||Ue!==R)&&(s.blendFuncSeparate(vt[G],vt[Z],vt[ue],vt[Ue]),E=G,M=Z,O=ue,R=Ue),(_t.equals(A)===!1||Rt!==P)&&(s.blendColor(_t.r,_t.g,_t.b,Rt),A.copy(_t),P=Rt),p=I,T=!1}function Jt(I,le){I.side===dn?Ce(s.CULL_FACE):ce(s.CULL_FACE);let G=I.side===Vt;le&&(G=!G),We(G),I.blending===Ki&&I.transparent===!1?F(oi):F(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);const Z=I.stencilWrite;a.setTest(Z),Z&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),ht(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ce(s.SAMPLE_ALPHA_TO_COVERAGE):Ce(s.SAMPLE_ALPHA_TO_COVERAGE)}function We(I){y!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),y=I)}function Xe(I){I!==Ru?(ce(s.CULL_FACE),I!==C&&(I===yl?s.cullFace(s.BACK):I===Cu?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ce(s.CULL_FACE),C=I}function we(I){I!==W&&(q&&s.lineWidth(I),W=I)}function ht(I,le,G){I?(ce(s.POLYGON_OFFSET_FILL),(V!==le||Y!==G)&&(s.polygonOffset(le,G),V=le,Y=G)):Ce(s.POLYGON_OFFSET_FILL)}function Te(I){I?ce(s.SCISSOR_TEST):Ce(s.SCISSOR_TEST)}function w(I){I===void 0&&(I=s.TEXTURE0+j-1),ee!==I&&(s.activeTexture(I),ee=I)}function x(I,le,G){G===void 0&&(ee===null?G=s.TEXTURE0+j-1:G=ee);let Z=ne[G];Z===void 0&&(Z={type:void 0,texture:void 0},ne[G]=Z),(Z.type!==I||Z.texture!==le)&&(ee!==G&&(s.activeTexture(G),ee=G),s.bindTexture(I,le||ye[I]),Z.type=I,Z.texture=le)}function B(){const I=ne[ee];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function K(){try{s.compressedTexImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Q(){try{s.compressedTexImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function $(){try{s.texSubImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function be(){try{s.texSubImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function he(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pe(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ye(){try{s.texStorage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function te(){try{s.texStorage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function me(){try{s.texImage2D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Re(){try{s.texImage3D.apply(s,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Le(I){Ze.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),Ze.copy(I))}function ge(I){X.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),X.copy(I))}function qe(I,le){let G=c.get(le);G===void 0&&(G=new WeakMap,c.set(le,G));let Z=G.get(I);Z===void 0&&(Z=s.getUniformBlockIndex(le,I.name),G.set(I,Z))}function Fe(I,le){const Z=c.get(le).get(I);l.get(le)!==Z&&(s.uniformBlockBinding(le,Z,I.__bindingPointIndex),l.set(le,Z))}function at(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},ee=null,ne={},u={},d=new WeakMap,m=[],g=null,_=!1,p=null,f=null,E=null,M=null,v=null,O=null,R=null,A=new Se(0,0,0),P=0,T=!1,y=null,C=null,W=null,V=null,Y=null,Ze.set(0,0,s.canvas.width,s.canvas.height),X.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ce,disable:Ce,bindFramebuffer:De,drawBuffers:Be,useProgram:gt,setBlending:F,setMaterial:Jt,setFlipSided:We,setCullFace:Xe,setLineWidth:we,setPolygonOffset:ht,setScissorTest:Te,activeTexture:w,bindTexture:x,unbindTexture:B,compressedTexImage2D:K,compressedTexImage3D:Q,texImage2D:me,texImage3D:Re,updateUBOMapping:qe,uniformBlockBinding:Fe,texStorage2D:Ye,texStorage3D:te,texSubImage2D:$,texSubImage3D:be,compressedTexSubImage2D:he,compressedTexSubImage3D:pe,scissor:Le,viewport:ge,reset:at}}function bc(s,e,t,n){const i=N0(n);switch(t){case fh:return s*e;case mh:return s*e;case gh:return s*e*2;case Ha:return s*e/i.components*i.byteLength;case Va:return s*e/i.components*i.byteLength;case _h:return s*e*2/i.components*i.byteLength;case Ga:return s*e*2/i.components*i.byteLength;case ph:return s*e*3/i.components*i.byteLength;case rn:return s*e*4/i.components*i.byteLength;case Wa:return s*e*4/i.components*i.byteLength;case Ar:case Rr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Cr:case Pr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ko:case Jo:return Math.max(s,16)*Math.max(e,8)/4;case jo:case Zo:return Math.max(s,8)*Math.max(e,8)/2;case Qo:case ea:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ta:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case na:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ia:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case sa:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case ra:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case oa:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case aa:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case la:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case ca:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case ha:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case ua:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case da:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case fa:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case pa:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case ma:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Lr:case ga:case _a:return Math.ceil(s/4)*Math.ceil(e/4)*16;case xh:case xa:return Math.ceil(s/4)*Math.ceil(e/4)*8;case va:case ya:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function N0(s){switch(s){case Gn:case hh:return{byteLength:1,components:1};case zs:case uh:case Ws:return{byteLength:2,components:1};case Ba:case za:return{byteLength:2,components:4};case Ai:case Oa:case mn:return{byteLength:4,components:1};case dh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function F0(s,e,t,n,i,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ge,h=new WeakMap;let u;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,x){return m?new OffscreenCanvas(w,x):Gs("canvas")}function _(w,x,B){let K=1;const Q=Te(w);if((Q.width>B||Q.height>B)&&(K=B/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const $=Math.floor(K*Q.width),be=Math.floor(K*Q.height);u===void 0&&(u=g($,be));const he=x?g($,be):u;return he.width=$,he.height=be,he.getContext("2d").drawImage(w,0,0,$,be),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+$+"x"+be+")."),he}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),w;return w}function p(w){return w.generateMipmaps}function f(w){s.generateMipmap(w)}function E(w){return w.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?s.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(w,x,B,K,Q=!1){if(w!==null){if(s[w]!==void 0)return s[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let $=x;if(x===s.RED&&(B===s.FLOAT&&($=s.R32F),B===s.HALF_FLOAT&&($=s.R16F),B===s.UNSIGNED_BYTE&&($=s.R8)),x===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&($=s.R8UI),B===s.UNSIGNED_SHORT&&($=s.R16UI),B===s.UNSIGNED_INT&&($=s.R32UI),B===s.BYTE&&($=s.R8I),B===s.SHORT&&($=s.R16I),B===s.INT&&($=s.R32I)),x===s.RG&&(B===s.FLOAT&&($=s.RG32F),B===s.HALF_FLOAT&&($=s.RG16F),B===s.UNSIGNED_BYTE&&($=s.RG8)),x===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&($=s.RG8UI),B===s.UNSIGNED_SHORT&&($=s.RG16UI),B===s.UNSIGNED_INT&&($=s.RG32UI),B===s.BYTE&&($=s.RG8I),B===s.SHORT&&($=s.RG16I),B===s.INT&&($=s.RG32I)),x===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&($=s.RGB8UI),B===s.UNSIGNED_SHORT&&($=s.RGB16UI),B===s.UNSIGNED_INT&&($=s.RGB32UI),B===s.BYTE&&($=s.RGB8I),B===s.SHORT&&($=s.RGB16I),B===s.INT&&($=s.RGB32I)),x===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&($=s.RGBA8UI),B===s.UNSIGNED_SHORT&&($=s.RGBA16UI),B===s.UNSIGNED_INT&&($=s.RGBA32UI),B===s.BYTE&&($=s.RGBA8I),B===s.SHORT&&($=s.RGBA16I),B===s.INT&&($=s.RGBA32I)),x===s.RGB&&B===s.UNSIGNED_INT_5_9_9_9_REV&&($=s.RGB9_E5),x===s.RGBA){const be=Q?Vr:Ve.getTransfer(K);B===s.FLOAT&&($=s.RGBA32F),B===s.HALF_FLOAT&&($=s.RGBA16F),B===s.UNSIGNED_BYTE&&($=be===rt?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT_4_4_4_4&&($=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&($=s.RGB5_A1)}return($===s.R16F||$===s.R32F||$===s.RG16F||$===s.RG32F||$===s.RGBA16F||$===s.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function v(w,x){let B;return w?x===null||x===Ai||x===rs?B=s.DEPTH24_STENCIL8:x===mn?B=s.DEPTH32F_STENCIL8:x===zs&&(B=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Ai||x===rs?B=s.DEPTH_COMPONENT24:x===mn?B=s.DEPTH_COMPONENT32F:x===zs&&(B=s.DEPTH_COMPONENT16),B}function O(w,x){return p(w)===!0||w.isFramebufferTexture&&w.minFilter!==It&&w.minFilter!==$t?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function R(w){const x=w.target;x.removeEventListener("dispose",R),P(x),x.isVideoTexture&&h.delete(x)}function A(w){const x=w.target;x.removeEventListener("dispose",A),y(x)}function P(w){const x=n.get(w);if(x.__webglInit===void 0)return;const B=w.source,K=d.get(B);if(K){const Q=K[x.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&T(w),Object.keys(K).length===0&&d.delete(B)}n.remove(w)}function T(w){const x=n.get(w);s.deleteTexture(x.__webglTexture);const B=w.source,K=d.get(B);delete K[x.__cacheKey],o.memory.textures--}function y(w){const x=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(x.__webglFramebuffer[K]))for(let Q=0;Q<x.__webglFramebuffer[K].length;Q++)s.deleteFramebuffer(x.__webglFramebuffer[K][Q]);else s.deleteFramebuffer(x.__webglFramebuffer[K]);x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer[K])}else{if(Array.isArray(x.__webglFramebuffer))for(let K=0;K<x.__webglFramebuffer.length;K++)s.deleteFramebuffer(x.__webglFramebuffer[K]);else s.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&s.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let K=0;K<x.__webglColorRenderbuffer.length;K++)x.__webglColorRenderbuffer[K]&&s.deleteRenderbuffer(x.__webglColorRenderbuffer[K]);x.__webglDepthRenderbuffer&&s.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const B=w.textures;for(let K=0,Q=B.length;K<Q;K++){const $=n.get(B[K]);$.__webglTexture&&(s.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(B[K])}n.remove(w)}let C=0;function W(){C=0}function V(){const w=C;return w>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+i.maxTextures),C+=1,w}function Y(w){const x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function j(w,x){const B=n.get(w);if(w.isVideoTexture&&we(w),w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){const K=w.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(B,w,x);return}}t.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+x)}function q(w,x){const B=n.get(w);if(w.version>0&&B.__version!==w.version){X(B,w,x);return}t.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+x)}function J(w,x){const B=n.get(w);if(w.version>0&&B.__version!==w.version){X(B,w,x);return}t.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+x)}function D(w,x){const B=n.get(w);if(w.version>0&&B.__version!==w.version){se(B,w,x);return}t.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+x)}const ee={[ss]:s.REPEAT,[ni]:s.CLAMP_TO_EDGE,[Fr]:s.MIRRORED_REPEAT},ne={[It]:s.NEAREST,[ch]:s.NEAREST_MIPMAP_NEAREST,[Cs]:s.NEAREST_MIPMAP_LINEAR,[$t]:s.LINEAR,[wr]:s.LINEAR_MIPMAP_NEAREST,[Bn]:s.LINEAR_MIPMAP_LINEAR},re={[hd]:s.NEVER,[gd]:s.ALWAYS,[ud]:s.LESS,[yh]:s.LEQUAL,[dd]:s.EQUAL,[md]:s.GEQUAL,[fd]:s.GREATER,[pd]:s.NOTEQUAL};function Ee(w,x){if(x.type===mn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===$t||x.magFilter===wr||x.magFilter===Cs||x.magFilter===Bn||x.minFilter===$t||x.minFilter===wr||x.minFilter===Cs||x.minFilter===Bn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(w,s.TEXTURE_WRAP_S,ee[x.wrapS]),s.texParameteri(w,s.TEXTURE_WRAP_T,ee[x.wrapT]),(w===s.TEXTURE_3D||w===s.TEXTURE_2D_ARRAY)&&s.texParameteri(w,s.TEXTURE_WRAP_R,ee[x.wrapR]),s.texParameteri(w,s.TEXTURE_MAG_FILTER,ne[x.magFilter]),s.texParameteri(w,s.TEXTURE_MIN_FILTER,ne[x.minFilter]),x.compareFunction&&(s.texParameteri(w,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(w,s.TEXTURE_COMPARE_FUNC,re[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===It||x.minFilter!==Cs&&x.minFilter!==Bn||x.type===mn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");s.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,i.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function Ze(w,x){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",R));const K=x.source;let Q=d.get(K);Q===void 0&&(Q={},d.set(K,Q));const $=Y(x);if($!==w.__cacheKey){Q[$]===void 0&&(Q[$]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,B=!0),Q[$].usedTimes++;const be=Q[w.__cacheKey];be!==void 0&&(Q[w.__cacheKey].usedTimes--,be.usedTimes===0&&T(x)),w.__cacheKey=$,w.__webglTexture=Q[$].texture}return B}function X(w,x,B){let K=s.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(K=s.TEXTURE_2D_ARRAY),x.isData3DTexture&&(K=s.TEXTURE_3D);const Q=Ze(w,x),$=x.source;t.bindTexture(K,w.__webglTexture,s.TEXTURE0+B);const be=n.get($);if($.version!==be.__version||Q===!0){t.activeTexture(s.TEXTURE0+B);const he=Ve.getPrimaries(Ve.workingColorSpace),pe=x.colorSpace===ti?null:Ve.getPrimaries(x.colorSpace),Ye=x.colorSpace===ti||he===pe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ye);let te=_(x.image,!1,i.maxTextureSize);te=ht(x,te);const me=r.convert(x.format,x.colorSpace),Re=r.convert(x.type);let Le=M(x.internalFormat,me,Re,x.colorSpace,x.isVideoTexture);Ee(K,x);let ge;const qe=x.mipmaps,Fe=x.isVideoTexture!==!0,at=be.__version===void 0||Q===!0,I=$.dataReady,le=O(x,te);if(x.isDepthTexture)Le=v(x.format===os,x.type),at&&(Fe?t.texStorage2D(s.TEXTURE_2D,1,Le,te.width,te.height):t.texImage2D(s.TEXTURE_2D,0,Le,te.width,te.height,0,me,Re,null));else if(x.isDataTexture)if(qe.length>0){Fe&&at&&t.texStorage2D(s.TEXTURE_2D,le,Le,qe[0].width,qe[0].height);for(let G=0,Z=qe.length;G<Z;G++)ge=qe[G],Fe?I&&t.texSubImage2D(s.TEXTURE_2D,G,0,0,ge.width,ge.height,me,Re,ge.data):t.texImage2D(s.TEXTURE_2D,G,Le,ge.width,ge.height,0,me,Re,ge.data);x.generateMipmaps=!1}else Fe?(at&&t.texStorage2D(s.TEXTURE_2D,le,Le,te.width,te.height),I&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,te.width,te.height,me,Re,te.data)):t.texImage2D(s.TEXTURE_2D,0,Le,te.width,te.height,0,me,Re,te.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Fe&&at&&t.texStorage3D(s.TEXTURE_2D_ARRAY,le,Le,qe[0].width,qe[0].height,te.depth);for(let G=0,Z=qe.length;G<Z;G++)if(ge=qe[G],x.format!==rn)if(me!==null)if(Fe){if(I)if(x.layerUpdates.size>0){const fe=bc(ge.width,ge.height,x.format,x.type);for(const ue of x.layerUpdates){const Ue=ge.data.subarray(ue*fe/ge.data.BYTES_PER_ELEMENT,(ue+1)*fe/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,G,0,0,ue,ge.width,ge.height,1,me,Ue)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,G,0,0,0,ge.width,ge.height,te.depth,me,ge.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,G,Le,ge.width,ge.height,te.depth,0,ge.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?I&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,G,0,0,0,ge.width,ge.height,te.depth,me,Re,ge.data):t.texImage3D(s.TEXTURE_2D_ARRAY,G,Le,ge.width,ge.height,te.depth,0,me,Re,ge.data)}else{Fe&&at&&t.texStorage2D(s.TEXTURE_2D,le,Le,qe[0].width,qe[0].height);for(let G=0,Z=qe.length;G<Z;G++)ge=qe[G],x.format!==rn?me!==null?Fe?I&&t.compressedTexSubImage2D(s.TEXTURE_2D,G,0,0,ge.width,ge.height,me,ge.data):t.compressedTexImage2D(s.TEXTURE_2D,G,Le,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?I&&t.texSubImage2D(s.TEXTURE_2D,G,0,0,ge.width,ge.height,me,Re,ge.data):t.texImage2D(s.TEXTURE_2D,G,Le,ge.width,ge.height,0,me,Re,ge.data)}else if(x.isDataArrayTexture)if(Fe){if(at&&t.texStorage3D(s.TEXTURE_2D_ARRAY,le,Le,te.width,te.height,te.depth),I)if(x.layerUpdates.size>0){const G=bc(te.width,te.height,x.format,x.type);for(const Z of x.layerUpdates){const fe=te.data.subarray(Z*G/te.data.BYTES_PER_ELEMENT,(Z+1)*G/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Z,te.width,te.height,1,me,Re,fe)}x.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,me,Re,te.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Le,te.width,te.height,te.depth,0,me,Re,te.data);else if(x.isData3DTexture)Fe?(at&&t.texStorage3D(s.TEXTURE_3D,le,Le,te.width,te.height,te.depth),I&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,me,Re,te.data)):t.texImage3D(s.TEXTURE_3D,0,Le,te.width,te.height,te.depth,0,me,Re,te.data);else if(x.isFramebufferTexture){if(at)if(Fe)t.texStorage2D(s.TEXTURE_2D,le,Le,te.width,te.height);else{let G=te.width,Z=te.height;for(let fe=0;fe<le;fe++)t.texImage2D(s.TEXTURE_2D,fe,Le,G,Z,0,me,Re,null),G>>=1,Z>>=1}}else if(qe.length>0){if(Fe&&at){const G=Te(qe[0]);t.texStorage2D(s.TEXTURE_2D,le,Le,G.width,G.height)}for(let G=0,Z=qe.length;G<Z;G++)ge=qe[G],Fe?I&&t.texSubImage2D(s.TEXTURE_2D,G,0,0,me,Re,ge):t.texImage2D(s.TEXTURE_2D,G,Le,me,Re,ge);x.generateMipmaps=!1}else if(Fe){if(at){const G=Te(te);t.texStorage2D(s.TEXTURE_2D,le,Le,G.width,G.height)}I&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,me,Re,te)}else t.texImage2D(s.TEXTURE_2D,0,Le,me,Re,te);p(x)&&f(K),be.__version=$.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function se(w,x,B){if(x.image.length!==6)return;const K=Ze(w,x),Q=x.source;t.bindTexture(s.TEXTURE_CUBE_MAP,w.__webglTexture,s.TEXTURE0+B);const $=n.get(Q);if(Q.version!==$.__version||K===!0){t.activeTexture(s.TEXTURE0+B);const be=Ve.getPrimaries(Ve.workingColorSpace),he=x.colorSpace===ti?null:Ve.getPrimaries(x.colorSpace),pe=x.colorSpace===ti||be===he?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);const Ye=x.isCompressedTexture||x.image[0].isCompressedTexture,te=x.image[0]&&x.image[0].isDataTexture,me=[];for(let Z=0;Z<6;Z++)!Ye&&!te?me[Z]=_(x.image[Z],!0,i.maxCubemapSize):me[Z]=te?x.image[Z].image:x.image[Z],me[Z]=ht(x,me[Z]);const Re=me[0],Le=r.convert(x.format,x.colorSpace),ge=r.convert(x.type),qe=M(x.internalFormat,Le,ge,x.colorSpace),Fe=x.isVideoTexture!==!0,at=$.__version===void 0||K===!0,I=Q.dataReady;let le=O(x,Re);Ee(s.TEXTURE_CUBE_MAP,x);let G;if(Ye){Fe&&at&&t.texStorage2D(s.TEXTURE_CUBE_MAP,le,qe,Re.width,Re.height);for(let Z=0;Z<6;Z++){G=me[Z].mipmaps;for(let fe=0;fe<G.length;fe++){const ue=G[fe];x.format!==rn?Le!==null?Fe?I&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,fe,0,0,ue.width,ue.height,Le,ue.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,fe,qe,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?I&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,fe,0,0,ue.width,ue.height,Le,ge,ue.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,fe,qe,ue.width,ue.height,0,Le,ge,ue.data)}}}else{if(G=x.mipmaps,Fe&&at){G.length>0&&le++;const Z=Te(me[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,le,qe,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(te){Fe?I&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,me[Z].width,me[Z].height,Le,ge,me[Z].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,qe,me[Z].width,me[Z].height,0,Le,ge,me[Z].data);for(let fe=0;fe<G.length;fe++){const Ue=G[fe].image[Z].image;Fe?I&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,fe+1,0,0,Ue.width,Ue.height,Le,ge,Ue.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,fe+1,qe,Ue.width,Ue.height,0,Le,ge,Ue.data)}}else{Fe?I&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Le,ge,me[Z]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,qe,Le,ge,me[Z]);for(let fe=0;fe<G.length;fe++){const ue=G[fe];Fe?I&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,fe+1,0,0,Le,ge,ue.image[Z]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Z,fe+1,qe,Le,ge,ue.image[Z])}}}p(x)&&f(s.TEXTURE_CUBE_MAP),$.__version=Q.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function ye(w,x,B,K,Q,$){const be=r.convert(B.format,B.colorSpace),he=r.convert(B.type),pe=M(B.internalFormat,be,he,B.colorSpace),Ye=n.get(x),te=n.get(B);if(te.__renderTarget=x,!Ye.__hasExternalTextures){const me=Math.max(1,x.width>>$),Re=Math.max(1,x.height>>$);Q===s.TEXTURE_3D||Q===s.TEXTURE_2D_ARRAY?t.texImage3D(Q,$,pe,me,Re,x.depth,0,be,he,null):t.texImage2D(Q,$,pe,me,Re,0,be,he,null)}t.bindFramebuffer(s.FRAMEBUFFER,w),Xe(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,K,Q,te.__webglTexture,0,We(x)):(Q===s.TEXTURE_2D||Q>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,K,Q,te.__webglTexture,$),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ce(w,x,B){if(s.bindRenderbuffer(s.RENDERBUFFER,w),x.depthBuffer){const K=x.depthTexture,Q=K&&K.isDepthTexture?K.type:null,$=v(x.stencilBuffer,Q),be=x.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,he=We(x);Xe(x)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,he,$,x.width,x.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,he,$,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,$,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,be,s.RENDERBUFFER,w)}else{const K=x.textures;for(let Q=0;Q<K.length;Q++){const $=K[Q],be=r.convert($.format,$.colorSpace),he=r.convert($.type),pe=M($.internalFormat,be,he,$.colorSpace),Ye=We(x);B&&Xe(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ye,pe,x.width,x.height):Xe(x)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ye,pe,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,pe,x.width,x.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Ce(w,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(x.depthTexture);K.__renderTarget=x,(!K.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),j(x.depthTexture,0);const Q=K.__webglTexture,$=We(x);if(x.depthTexture.format===Zi)Xe(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0);else if(x.depthTexture.format===os)Xe(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0,$):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function De(w){const x=n.get(w),B=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){const K=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),K){const Q=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),x.__depthDisposeCallback=Q}x.__boundDepthTexture=K}if(w.depthTexture&&!x.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Ce(x.__webglFramebuffer,w)}else if(B){x.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[K]),x.__webglDepthbuffer[K]===void 0)x.__webglDepthbuffer[K]=s.createRenderbuffer(),ce(x.__webglDepthbuffer[K],w,!1);else{const Q=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,$=x.__webglDepthbuffer[K];s.bindRenderbuffer(s.RENDERBUFFER,$),s.framebufferRenderbuffer(s.FRAMEBUFFER,Q,s.RENDERBUFFER,$)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=s.createRenderbuffer(),ce(x.__webglDepthbuffer,w,!1);else{const K=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Q=x.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Q),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,Q)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Be(w,x,B){const K=n.get(w);x!==void 0&&ye(K.__webglFramebuffer,w,w.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&De(w)}function gt(w){const x=w.texture,B=n.get(w),K=n.get(x);w.addEventListener("dispose",A);const Q=w.textures,$=w.isWebGLCubeRenderTarget===!0,be=Q.length>1;if(be||(K.__webglTexture===void 0&&(K.__webglTexture=s.createTexture()),K.__version=x.version,o.memory.textures++),$){B.__webglFramebuffer=[];for(let he=0;he<6;he++)if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer[he]=[];for(let pe=0;pe<x.mipmaps.length;pe++)B.__webglFramebuffer[he][pe]=s.createFramebuffer()}else B.__webglFramebuffer[he]=s.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer=[];for(let he=0;he<x.mipmaps.length;he++)B.__webglFramebuffer[he]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(be)for(let he=0,pe=Q.length;he<pe;he++){const Ye=n.get(Q[he]);Ye.__webglTexture===void 0&&(Ye.__webglTexture=s.createTexture(),o.memory.textures++)}if(w.samples>0&&Xe(w)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let he=0;he<Q.length;he++){const pe=Q[he];B.__webglColorRenderbuffer[he]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[he]);const Ye=r.convert(pe.format,pe.colorSpace),te=r.convert(pe.type),me=M(pe.internalFormat,Ye,te,pe.colorSpace,w.isXRRenderTarget===!0),Re=We(w);s.renderbufferStorageMultisample(s.RENDERBUFFER,Re,me,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+he,s.RENDERBUFFER,B.__webglColorRenderbuffer[he])}s.bindRenderbuffer(s.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),ce(B.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if($){t.bindTexture(s.TEXTURE_CUBE_MAP,K.__webglTexture),Ee(s.TEXTURE_CUBE_MAP,x);for(let he=0;he<6;he++)if(x.mipmaps&&x.mipmaps.length>0)for(let pe=0;pe<x.mipmaps.length;pe++)ye(B.__webglFramebuffer[he][pe],w,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+he,pe);else ye(B.__webglFramebuffer[he],w,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);p(x)&&f(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let he=0,pe=Q.length;he<pe;he++){const Ye=Q[he],te=n.get(Ye);t.bindTexture(s.TEXTURE_2D,te.__webglTexture),Ee(s.TEXTURE_2D,Ye),ye(B.__webglFramebuffer,w,Ye,s.COLOR_ATTACHMENT0+he,s.TEXTURE_2D,0),p(Ye)&&f(s.TEXTURE_2D)}t.unbindTexture()}else{let he=s.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(he=w.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(he,K.__webglTexture),Ee(he,x),x.mipmaps&&x.mipmaps.length>0)for(let pe=0;pe<x.mipmaps.length;pe++)ye(B.__webglFramebuffer[pe],w,x,s.COLOR_ATTACHMENT0,he,pe);else ye(B.__webglFramebuffer,w,x,s.COLOR_ATTACHMENT0,he,0);p(x)&&f(he),t.unbindTexture()}w.depthBuffer&&De(w)}function $e(w){const x=w.textures;for(let B=0,K=x.length;B<K;B++){const Q=x[B];if(p(Q)){const $=E(w),be=n.get(Q).__webglTexture;t.bindTexture($,be),f($),t.unbindTexture()}}}const vt=[],F=[];function Jt(w){if(w.samples>0){if(Xe(w)===!1){const x=w.textures,B=w.width,K=w.height;let Q=s.COLOR_BUFFER_BIT;const $=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=n.get(w),he=x.length>1;if(he)for(let pe=0;pe<x.length;pe++)t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+pe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let pe=0;pe<x.length;pe++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Q|=s.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Q|=s.STENCIL_BUFFER_BIT)),he){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,be.__webglColorRenderbuffer[pe]);const Ye=n.get(x[pe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ye,0)}s.blitFramebuffer(0,0,B,K,0,0,B,K,Q,s.NEAREST),l===!0&&(vt.length=0,F.length=0,vt.push(s.COLOR_ATTACHMENT0+pe),w.depthBuffer&&w.resolveDepthBuffer===!1&&(vt.push($),F.push($),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,F)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,vt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),he)for(let pe=0;pe<x.length;pe++){t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pe,s.RENDERBUFFER,be.__webglColorRenderbuffer[pe]);const Ye=n.get(x[pe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+pe,s.TEXTURE_2D,Ye,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const x=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[x])}}}function We(w){return Math.min(i.maxSamples,w.samples)}function Xe(w){const x=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function we(w){const x=o.render.frame;h.get(w)!==x&&(h.set(w,x),w.update())}function ht(w,x){const B=w.colorSpace,K=w.format,Q=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==Ot&&B!==ti&&(Ve.getTransfer(B)===rt?(K!==rn||Q!==Gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),x}function Te(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=W,this.setTexture2D=j,this.setTexture2DArray=q,this.setTexture3D=J,this.setTextureCube=D,this.rebindTextures=Be,this.setupRenderTarget=gt,this.updateRenderTargetMipmap=$e,this.updateMultisampleRenderTarget=Jt,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=Xe}function O0(s,e){function t(n,i=ti){let r;const o=Ve.getTransfer(i);if(n===Gn)return s.UNSIGNED_BYTE;if(n===Ba)return s.UNSIGNED_SHORT_4_4_4_4;if(n===za)return s.UNSIGNED_SHORT_5_5_5_1;if(n===dh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===hh)return s.BYTE;if(n===uh)return s.SHORT;if(n===zs)return s.UNSIGNED_SHORT;if(n===Oa)return s.INT;if(n===Ai)return s.UNSIGNED_INT;if(n===mn)return s.FLOAT;if(n===Ws)return s.HALF_FLOAT;if(n===fh)return s.ALPHA;if(n===ph)return s.RGB;if(n===rn)return s.RGBA;if(n===mh)return s.LUMINANCE;if(n===gh)return s.LUMINANCE_ALPHA;if(n===Zi)return s.DEPTH_COMPONENT;if(n===os)return s.DEPTH_STENCIL;if(n===Ha)return s.RED;if(n===Va)return s.RED_INTEGER;if(n===_h)return s.RG;if(n===Ga)return s.RG_INTEGER;if(n===Wa)return s.RGBA_INTEGER;if(n===Ar||n===Rr||n===Cr||n===Pr)if(o===rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ar)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ar)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Rr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Cr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Pr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===jo||n===Ko||n===Zo||n===Jo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===jo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ko)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Zo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Jo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Qo||n===ea||n===ta)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Qo||n===ea)return o===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ta)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===na||n===ia||n===sa||n===ra||n===oa||n===aa||n===la||n===ca||n===ha||n===ua||n===da||n===fa||n===pa||n===ma)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===na)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ia)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===sa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ra)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===oa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===aa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===la)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ca)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ha)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ua)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===da)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===fa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===pa)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ma)return o===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Lr||n===ga||n===_a)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Lr)return o===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ga)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===_a)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===xh||n===xa||n===va||n===ya)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Lr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===xa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===va)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ya)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===rs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class B0 extends Nt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ot extends mt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const z0={type:"move"};class Mo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ot,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ot,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ot,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),f=this._getHandJoint(c,_);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,g=.005;c.inputState.pinching&&d>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(z0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ot;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const H0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,V0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class G0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new wt,r=e.properties.get(i);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new li({vertexShader:H0,fragmentShader:V0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ct(new Wr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class W0 extends ds{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,m=null,g=null;const _=new G0,p=t.getContextAttributes();let f=null,E=null;const M=[],v=[],O=new Ge;let R=null;const A=new Nt;A.viewport=new Je;const P=new Nt;P.viewport=new Je;const T=[A,P],y=new B0;let C=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let se=M[X];return se===void 0&&(se=new Mo,M[X]=se),se.getTargetRaySpace()},this.getControllerGrip=function(X){let se=M[X];return se===void 0&&(se=new Mo,M[X]=se),se.getGripSpace()},this.getHand=function(X){let se=M[X];return se===void 0&&(se=new Mo,M[X]=se),se.getHandSpace()};function V(X){const se=v.indexOf(X.inputSource);if(se===-1)return;const ye=M[se];ye!==void 0&&(ye.update(X.inputSource,X.frame,c||o),ye.dispatchEvent({type:X.type,data:X.inputSource}))}function Y(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",j);for(let X=0;X<M.length;X++){const se=v[X];se!==null&&(v[X]=null,M[X].disconnect(se))}C=null,W=null,_.reset(),e.setRenderTarget(f),m=null,d=null,u=null,i=null,E=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(O.width,O.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(X){if(i=X,i!==null){if(f=e.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",j),p.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(O),i.renderState.layers===void 0){const se={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(i,t,se),i.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new Ri(m.framebufferWidth,m.framebufferHeight,{format:rn,type:Gn,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let se=null,ye=null,ce=null;p.depth&&(ce=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=p.stencil?os:Zi,ye=p.stencil?rs:Ai);const Ce={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(Ce),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),E=new Ri(d.textureWidth,d.textureHeight,{format:rn,type:Gn,depthTexture:new Ih(d.textureWidth,d.textureHeight,ye,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Ze.setContext(i),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function j(X){for(let se=0;se<X.removed.length;se++){const ye=X.removed[se],ce=v.indexOf(ye);ce>=0&&(v[ce]=null,M[ce].disconnect(ye))}for(let se=0;se<X.added.length;se++){const ye=X.added[se];let ce=v.indexOf(ye);if(ce===-1){for(let De=0;De<M.length;De++)if(De>=v.length){v.push(ye),ce=De;break}else if(v[De]===null){v[De]=ye,ce=De;break}if(ce===-1)break}const Ce=M[ce];Ce&&Ce.connect(ye)}}const q=new L,J=new L;function D(X,se,ye){q.setFromMatrixPosition(se.matrixWorld),J.setFromMatrixPosition(ye.matrixWorld);const ce=q.distanceTo(J),Ce=se.projectionMatrix.elements,De=ye.projectionMatrix.elements,Be=Ce[14]/(Ce[10]-1),gt=Ce[14]/(Ce[10]+1),$e=(Ce[9]+1)/Ce[5],vt=(Ce[9]-1)/Ce[5],F=(Ce[8]-1)/Ce[0],Jt=(De[8]+1)/De[0],We=Be*F,Xe=Be*Jt,we=ce/(-F+Jt),ht=we*-F;if(se.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(ht),X.translateZ(we),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Ce[10]===-1)X.projectionMatrix.copy(se.projectionMatrix),X.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const Te=Be+we,w=gt+we,x=We-ht,B=Xe+(ce-ht),K=$e*gt/w*Te,Q=vt*gt/w*Te;X.projectionMatrix.makePerspective(x,B,K,Q,Te,w),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ee(X,se){se===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(se.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(i===null)return;let se=X.near,ye=X.far;_.texture!==null&&(_.depthNear>0&&(se=_.depthNear),_.depthFar>0&&(ye=_.depthFar)),y.near=P.near=A.near=se,y.far=P.far=A.far=ye,(C!==y.near||W!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),C=y.near,W=y.far),A.layers.mask=X.layers.mask|2,P.layers.mask=X.layers.mask|4,y.layers.mask=A.layers.mask|P.layers.mask;const ce=X.parent,Ce=y.cameras;ee(y,ce);for(let De=0;De<Ce.length;De++)ee(Ce[De],ce);Ce.length===2?D(y,A,P):y.projectionMatrix.copy(A.projectionMatrix),ne(X,y,ce)};function ne(X,se,ye){ye===null?X.matrix.copy(se.matrixWorld):(X.matrix.copy(ye.matrixWorld),X.matrix.invert(),X.matrix.multiply(se.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(se.projectionMatrix),X.projectionMatrixInverse.copy(se.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=as*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(y)};let re=null;function Ee(X,se){if(h=se.getViewerPose(c||o),g=se,h!==null){const ye=h.views;m!==null&&(e.setRenderTargetFramebuffer(E,m.framebuffer),e.setRenderTarget(E));let ce=!1;ye.length!==y.cameras.length&&(y.cameras.length=0,ce=!0);for(let De=0;De<ye.length;De++){const Be=ye[De];let gt=null;if(m!==null)gt=m.getViewport(Be);else{const vt=u.getViewSubImage(d,Be);gt=vt.viewport,De===0&&(e.setRenderTargetTextures(E,vt.colorTexture,d.ignoreDepthValues?void 0:vt.depthStencilTexture),e.setRenderTarget(E))}let $e=T[De];$e===void 0&&($e=new Nt,$e.layers.enable(De),$e.viewport=new Je,T[De]=$e),$e.matrix.fromArray(Be.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(Be.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(gt.x,gt.y,gt.width,gt.height),De===0&&(y.matrix.copy($e.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),ce===!0&&y.cameras.push($e)}const Ce=i.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")){const De=u.getDepthInformation(ye[0]);De&&De.isValid&&De.texture&&_.init(e,De,i.renderState)}}for(let ye=0;ye<M.length;ye++){const ce=v[ye],Ce=M[ye];ce!==null&&Ce!==void 0&&Ce.update(ce,se,c||o)}re&&re(X,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),g=null}const Ze=new Lh;Ze.setAnimationLoop(Ee),this.setAnimationLoop=function(X){re=X},this.dispose=function(){}}}const mi=new Kt,X0=new Pe;function q0(s,e){function t(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function n(p,f){f.color.getRGB(p.fogColor.value,Rh(s)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function i(p,f,E,M,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(p,f):f.isMeshToonMaterial?(r(p,f),u(p,f)):f.isMeshPhongMaterial?(r(p,f),h(p,f)):f.isMeshStandardMaterial?(r(p,f),d(p,f),f.isMeshPhysicalMaterial&&m(p,f,v)):f.isMeshMatcapMaterial?(r(p,f),g(p,f)):f.isMeshDepthMaterial?r(p,f):f.isMeshDistanceMaterial?(r(p,f),_(p,f)):f.isMeshNormalMaterial?r(p,f):f.isLineBasicMaterial?(o(p,f),f.isLineDashedMaterial&&a(p,f)):f.isPointsMaterial?l(p,f,E,M):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,t(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Vt&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,t(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Vt&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,t(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,t(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const E=e.get(f),M=E.envMap,v=E.envMapRotation;M&&(p.envMap.value=M,mi.copy(v),mi.x*=-1,mi.y*=-1,mi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),p.envMapRotation.value.setFromMatrix4(X0.makeRotationFromEuler(mi)),p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,p.aoMapTransform))}function o(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform))}function a(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,E,M){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*E,p.scale.value=M*.5,f.map&&(p.map.value=f.map,t(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function h(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function u(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function d(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,E){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Vt&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=E.texture,p.transmissionSamplerSize.value.set(E.width,E.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,f){f.matcap&&(p.matcap.value=f.matcap)}function _(p,f){const E=e.get(f).light;p.referencePosition.value.setFromMatrixPosition(E.matrixWorld),p.nearDistance.value=E.shadow.camera.near,p.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function $0(s,e,t,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,M){const v=M.program;n.uniformBlockBinding(E,v)}function c(E,M){let v=i[E.id];v===void 0&&(g(E),v=h(E),i[E.id]=v,E.addEventListener("dispose",p));const O=M.program;n.updateUBOMapping(E,O);const R=e.render.frame;r[E.id]!==R&&(d(E),r[E.id]=R)}function h(E){const M=u();E.__bindingPointIndex=M;const v=s.createBuffer(),O=E.__size,R=E.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,O,R),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,v),v}function u(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(E){const M=i[E.id],v=E.uniforms,O=E.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let R=0,A=v.length;R<A;R++){const P=Array.isArray(v[R])?v[R]:[v[R]];for(let T=0,y=P.length;T<y;T++){const C=P[T];if(m(C,R,T,O)===!0){const W=C.__offset,V=Array.isArray(C.value)?C.value:[C.value];let Y=0;for(let j=0;j<V.length;j++){const q=V[j],J=_(q);typeof q=="number"||typeof q=="boolean"?(C.__data[0]=q,s.bufferSubData(s.UNIFORM_BUFFER,W+Y,C.__data)):q.isMatrix3?(C.__data[0]=q.elements[0],C.__data[1]=q.elements[1],C.__data[2]=q.elements[2],C.__data[3]=0,C.__data[4]=q.elements[3],C.__data[5]=q.elements[4],C.__data[6]=q.elements[5],C.__data[7]=0,C.__data[8]=q.elements[6],C.__data[9]=q.elements[7],C.__data[10]=q.elements[8],C.__data[11]=0):(q.toArray(C.__data,Y),Y+=J.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,W,C.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function m(E,M,v,O){const R=E.value,A=M+"_"+v;if(O[A]===void 0)return typeof R=="number"||typeof R=="boolean"?O[A]=R:O[A]=R.clone(),!0;{const P=O[A];if(typeof R=="number"||typeof R=="boolean"){if(P!==R)return O[A]=R,!0}else if(P.equals(R)===!1)return P.copy(R),!0}return!1}function g(E){const M=E.uniforms;let v=0;const O=16;for(let A=0,P=M.length;A<P;A++){const T=Array.isArray(M[A])?M[A]:[M[A]];for(let y=0,C=T.length;y<C;y++){const W=T[y],V=Array.isArray(W.value)?W.value:[W.value];for(let Y=0,j=V.length;Y<j;Y++){const q=V[Y],J=_(q),D=v%O,ee=D%J.boundary,ne=D+ee;v+=ee,ne!==0&&O-ne<J.storage&&(v+=O-ne),W.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=v,v+=J.storage}}}const R=v%O;return R>0&&(v+=O-R),E.__size=v,E.__cache={},this}function _(E){const M={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(M.boundary=4,M.storage=4):E.isVector2?(M.boundary=8,M.storage=8):E.isVector3||E.isColor?(M.boundary=16,M.storage=12):E.isVector4?(M.boundary=16,M.storage=16):E.isMatrix3?(M.boundary=48,M.storage=48):E.isMatrix4?(M.boundary=64,M.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),M}function p(E){const M=E.target;M.removeEventListener("dispose",p);const v=o.indexOf(M.__bindingPointIndex);o.splice(v,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function f(){for(const E in i)s.deleteBuffer(i[E]);o=[],i={},r={}}return{bind:l,update:c,dispose:f}}class Y0{constructor(e={}){const{canvas:t=kd(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;const g=new Uint32Array(4),_=new Int32Array(4);let p=null,f=null;const E=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=At,this.toneMapping=ai,this.toneMappingExposure=1;const v=this;let O=!1,R=0,A=0,P=null,T=-1,y=null;const C=new Je,W=new Je;let V=null;const Y=new Se(0);let j=0,q=t.width,J=t.height,D=1,ee=null,ne=null;const re=new Je(0,0,q,J),Ee=new Je(0,0,q,J);let Ze=!1;const X=new $a;let se=!1,ye=!1;const ce=new Pe,Ce=new Pe,De=new L,Be=new Je,gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let $e=!1;function vt(){return P===null?D:1}let F=n;function Jt(b,U){return t.getContext(b,U)}try{const b={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ka}`),t.addEventListener("webglcontextlost",Z,!1),t.addEventListener("webglcontextrestored",fe,!1),t.addEventListener("webglcontextcreationerror",ue,!1),F===null){const U="webgl2";if(F=Jt(U,b),F===null)throw Jt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let We,Xe,we,ht,Te,w,x,B,K,Q,$,be,he,pe,Ye,te,me,Re,Le,ge,qe,Fe,at,I;function le(){We=new Qm(F),We.init(),Fe=new O0(F,We),Xe=new $m(F,We,e,Fe),we=new k0(F,We),Xe.reverseDepthBuffer&&d&&we.buffers.depth.setReversed(!0),ht=new ng(F),Te=new y0,w=new F0(F,We,we,Te,Xe,Fe,ht),x=new jm(v),B=new Jm(v),K=new cf(F),at=new Xm(F,K),Q=new eg(F,K,ht,at),$=new sg(F,Q,K,ht),Le=new ig(F,Xe,w),te=new Ym(Te),be=new v0(v,x,B,We,Xe,at,te),he=new q0(v,Te),pe=new M0,Ye=new R0(We),Re=new Wm(v,x,B,we,$,m,l),me=new D0(v,$,Xe),I=new $0(F,ht,Xe,we),ge=new qm(F,We,ht),qe=new tg(F,We,ht),ht.programs=be.programs,v.capabilities=Xe,v.extensions=We,v.properties=Te,v.renderLists=pe,v.shadowMap=me,v.state=we,v.info=ht}le();const G=new W0(v,F);this.xr=G,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const b=We.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=We.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(b){b!==void 0&&(D=b,this.setSize(q,J,!1))},this.getSize=function(b){return b.set(q,J)},this.setSize=function(b,U,z=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=b,J=U,t.width=Math.floor(b*D),t.height=Math.floor(U*D),z===!0&&(t.style.width=b+"px",t.style.height=U+"px"),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(q*D,J*D).floor()},this.setDrawingBufferSize=function(b,U,z){q=b,J=U,D=z,t.width=Math.floor(b*z),t.height=Math.floor(U*z),this.setViewport(0,0,b,U)},this.getCurrentViewport=function(b){return b.copy(C)},this.getViewport=function(b){return b.copy(re)},this.setViewport=function(b,U,z,H){b.isVector4?re.set(b.x,b.y,b.z,b.w):re.set(b,U,z,H),we.viewport(C.copy(re).multiplyScalar(D).round())},this.getScissor=function(b){return b.copy(Ee)},this.setScissor=function(b,U,z,H){b.isVector4?Ee.set(b.x,b.y,b.z,b.w):Ee.set(b,U,z,H),we.scissor(W.copy(Ee).multiplyScalar(D).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(b){we.setScissorTest(Ze=b)},this.setOpaqueSort=function(b){ee=b},this.setTransparentSort=function(b){ne=b},this.getClearColor=function(b){return b.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor.apply(Re,arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha.apply(Re,arguments)},this.clear=function(b=!0,U=!0,z=!0){let H=0;if(b){let k=!1;if(P!==null){const ie=P.texture.format;k=ie===Wa||ie===Ga||ie===Va}if(k){const ie=P.texture.type,de=ie===Gn||ie===Ai||ie===zs||ie===rs||ie===Ba||ie===za,_e=Re.getClearColor(),xe=Re.getClearAlpha(),Ie=_e.r,ke=_e.g,ve=_e.b;de?(g[0]=Ie,g[1]=ke,g[2]=ve,g[3]=xe,F.clearBufferuiv(F.COLOR,0,g)):(_[0]=Ie,_[1]=ke,_[2]=ve,_[3]=xe,F.clearBufferiv(F.COLOR,0,_))}else H|=F.COLOR_BUFFER_BIT}U&&(H|=F.DEPTH_BUFFER_BIT),z&&(H|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Z,!1),t.removeEventListener("webglcontextrestored",fe,!1),t.removeEventListener("webglcontextcreationerror",ue,!1),pe.dispose(),Ye.dispose(),Te.dispose(),x.dispose(),B.dispose(),$.dispose(),at.dispose(),I.dispose(),be.dispose(),G.dispose(),G.removeEventListener("sessionstart",al),G.removeEventListener("sessionend",ll),ci.stop()};function Z(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),O=!0}function fe(){console.log("THREE.WebGLRenderer: Context Restored."),O=!1;const b=ht.autoReset,U=me.enabled,z=me.autoUpdate,H=me.needsUpdate,k=me.type;le(),ht.autoReset=b,me.enabled=U,me.autoUpdate=z,me.needsUpdate=H,me.type=k}function ue(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Ue(b){const U=b.target;U.removeEventListener("dispose",Ue),_t(U)}function _t(b){Rt(b),Te.remove(b)}function Rt(b){const U=Te.get(b).programs;U!==void 0&&(U.forEach(function(z){be.releaseProgram(z)}),b.isShaderMaterial&&be.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,z,H,k,ie){U===null&&(U=gt);const de=k.isMesh&&k.matrixWorld.determinant()<0,_e=jh(b,U,z,H,k);we.setMaterial(H,de);let xe=z.index,Ie=1;if(H.wireframe===!0){if(xe=Q.getWireframeAttribute(z),xe===void 0)return;Ie=2}const ke=z.drawRange,ve=z.attributes.position;let Ke=ke.start*Ie,lt=(ke.start+ke.count)*Ie;ie!==null&&(Ke=Math.max(Ke,ie.start*Ie),lt=Math.min(lt,(ie.start+ie.count)*Ie)),xe!==null?(Ke=Math.max(Ke,0),lt=Math.min(lt,xe.count)):ve!=null&&(Ke=Math.max(Ke,0),lt=Math.min(lt,ve.count));const ut=lt-Ke;if(ut<0||ut===1/0)return;at.setup(k,H,_e,z,xe);let Bt,Qe=ge;if(xe!==null&&(Bt=K.get(xe),Qe=qe,Qe.setIndex(Bt)),k.isMesh)H.wireframe===!0?(we.setLineWidth(H.wireframeLinewidth*vt()),Qe.setMode(F.LINES)):Qe.setMode(F.TRIANGLES);else if(k.isLine){let Me=H.linewidth;Me===void 0&&(Me=1),we.setLineWidth(Me*vt()),k.isLineSegments?Qe.setMode(F.LINES):k.isLineLoop?Qe.setMode(F.LINE_LOOP):Qe.setMode(F.LINE_STRIP)}else k.isPoints?Qe.setMode(F.POINTS):k.isSprite&&Qe.setMode(F.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Qe.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(We.get("WEBGL_multi_draw"))Qe.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Me=k._multiDrawStarts,An=k._multiDrawCounts,et=k._multiDrawCount,an=xe?K.get(xe).bytesPerElement:1,Ci=Te.get(H).currentProgram.getUniforms();for(let Gt=0;Gt<et;Gt++)Ci.setValue(F,"_gl_DrawID",Gt),Qe.render(Me[Gt]/an,An[Gt])}else if(k.isInstancedMesh)Qe.renderInstances(Ke,ut,k.count);else if(z.isInstancedBufferGeometry){const Me=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,An=Math.min(z.instanceCount,Me);Qe.renderInstances(Ke,ut,An)}else Qe.render(Ke,ut)};function tt(b,U,z){b.transparent===!0&&b.side===dn&&b.forceSinglePass===!1?(b.side=Vt,b.needsUpdate=!0,$s(b,U,z),b.side=Vn,b.needsUpdate=!0,$s(b,U,z),b.side=dn):$s(b,U,z)}this.compile=function(b,U,z=null){z===null&&(z=b),f=Ye.get(z),f.init(U),M.push(f),z.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(f.pushLight(k),k.castShadow&&f.pushShadow(k))}),b!==z&&b.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(f.pushLight(k),k.castShadow&&f.pushShadow(k))}),f.setupLights();const H=new Set;return b.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const ie=k.material;if(ie)if(Array.isArray(ie))for(let de=0;de<ie.length;de++){const _e=ie[de];tt(_e,z,k),H.add(_e)}else tt(ie,z,k),H.add(ie)}),M.pop(),f=null,H},this.compileAsync=function(b,U,z=null){const H=this.compile(b,U,z);return new Promise(k=>{function ie(){if(H.forEach(function(de){Te.get(de).currentProgram.isReady()&&H.delete(de)}),H.size===0){k(b);return}setTimeout(ie,10)}We.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let on=null;function wn(b){on&&on(b)}function al(){ci.stop()}function ll(){ci.start()}const ci=new Lh;ci.setAnimationLoop(wn),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(b){on=b,G.setAnimationLoop(b),b===null?ci.stop():ci.start()},G.addEventListener("sessionstart",al),G.addEventListener("sessionend",ll),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(U),U=G.getCamera()),b.isScene===!0&&b.onBeforeRender(v,b,U,P),f=Ye.get(b,M.length),f.init(U),M.push(f),Ce.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),X.setFromProjectionMatrix(Ce),ye=this.localClippingEnabled,se=te.init(this.clippingPlanes,ye),p=pe.get(b,E.length),p.init(),E.push(p),G.enabled===!0&&G.isPresenting===!0){const ie=v.xr.getDepthSensingMesh();ie!==null&&$r(ie,U,-1/0,v.sortObjects)}$r(b,U,0,v.sortObjects),p.finish(),v.sortObjects===!0&&p.sort(ee,ne),$e=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,$e&&Re.addToRenderList(p,b),this.info.render.frame++,se===!0&&te.beginShadows();const z=f.state.shadowsArray;me.render(z,b,U),se===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=p.opaque,k=p.transmissive;if(f.setupLights(),U.isArrayCamera){const ie=U.cameras;if(k.length>0)for(let de=0,_e=ie.length;de<_e;de++){const xe=ie[de];hl(H,k,b,xe)}$e&&Re.render(b);for(let de=0,_e=ie.length;de<_e;de++){const xe=ie[de];cl(p,b,xe,xe.viewport)}}else k.length>0&&hl(H,k,b,U),$e&&Re.render(b),cl(p,b,U);P!==null&&(w.updateMultisampleRenderTarget(P),w.updateRenderTargetMipmap(P)),b.isScene===!0&&b.onAfterRender(v,b,U),at.resetDefaultState(),T=-1,y=null,M.pop(),M.length>0?(f=M[M.length-1],se===!0&&te.setGlobalState(v.clippingPlanes,f.state.camera)):f=null,E.pop(),E.length>0?p=E[E.length-1]:p=null};function $r(b,U,z,H){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)f.pushLight(b),b.castShadow&&f.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||X.intersectsSprite(b)){H&&Be.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Ce);const de=$.update(b),_e=b.material;_e.visible&&p.push(b,de,_e,z,Be.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||X.intersectsObject(b))){const de=$.update(b),_e=b.material;if(H&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Be.copy(b.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),Be.copy(de.boundingSphere.center)),Be.applyMatrix4(b.matrixWorld).applyMatrix4(Ce)),Array.isArray(_e)){const xe=de.groups;for(let Ie=0,ke=xe.length;Ie<ke;Ie++){const ve=xe[Ie],Ke=_e[ve.materialIndex];Ke&&Ke.visible&&p.push(b,de,Ke,z,Be.z,ve)}}else _e.visible&&p.push(b,de,_e,z,Be.z,null)}}const ie=b.children;for(let de=0,_e=ie.length;de<_e;de++)$r(ie[de],U,z,H)}function cl(b,U,z,H){const k=b.opaque,ie=b.transmissive,de=b.transparent;f.setupLightsView(z),se===!0&&te.setGlobalState(v.clippingPlanes,z),H&&we.viewport(C.copy(H)),k.length>0&&qs(k,U,z),ie.length>0&&qs(ie,U,z),de.length>0&&qs(de,U,z),we.buffers.depth.setTest(!0),we.buffers.depth.setMask(!0),we.buffers.color.setMask(!0),we.setPolygonOffset(!1)}function hl(b,U,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[H.id]===void 0&&(f.state.transmissionRenderTarget[H.id]=new Ri(1,1,{generateMipmaps:!0,type:We.has("EXT_color_buffer_half_float")||We.has("EXT_color_buffer_float")?Ws:Gn,minFilter:Bn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ve.workingColorSpace}));const ie=f.state.transmissionRenderTarget[H.id],de=H.viewport||C;ie.setSize(de.z,de.w);const _e=v.getRenderTarget();v.setRenderTarget(ie),v.getClearColor(Y),j=v.getClearAlpha(),j<1&&v.setClearColor(16777215,.5),v.clear(),$e&&Re.render(z);const xe=v.toneMapping;v.toneMapping=ai;const Ie=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),f.setupLightsView(H),se===!0&&te.setGlobalState(v.clippingPlanes,H),qs(b,z,H),w.updateMultisampleRenderTarget(ie),w.updateRenderTargetMipmap(ie),We.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let ve=0,Ke=U.length;ve<Ke;ve++){const lt=U[ve],ut=lt.object,Bt=lt.geometry,Qe=lt.material,Me=lt.group;if(Qe.side===dn&&ut.layers.test(H.layers)){const An=Qe.side;Qe.side=Vt,Qe.needsUpdate=!0,ul(ut,z,H,Bt,Qe,Me),Qe.side=An,Qe.needsUpdate=!0,ke=!0}}ke===!0&&(w.updateMultisampleRenderTarget(ie),w.updateRenderTargetMipmap(ie))}v.setRenderTarget(_e),v.setClearColor(Y,j),Ie!==void 0&&(H.viewport=Ie),v.toneMapping=xe}function qs(b,U,z){const H=U.isScene===!0?U.overrideMaterial:null;for(let k=0,ie=b.length;k<ie;k++){const de=b[k],_e=de.object,xe=de.geometry,Ie=H===null?de.material:H,ke=de.group;_e.layers.test(z.layers)&&ul(_e,U,z,xe,Ie,ke)}}function ul(b,U,z,H,k,ie){b.onBeforeRender(v,U,z,H,k,ie),b.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),k.onBeforeRender(v,U,z,H,b,ie),k.transparent===!0&&k.side===dn&&k.forceSinglePass===!1?(k.side=Vt,k.needsUpdate=!0,v.renderBufferDirect(z,U,H,k,b,ie),k.side=Vn,k.needsUpdate=!0,v.renderBufferDirect(z,U,H,k,b,ie),k.side=dn):v.renderBufferDirect(z,U,H,k,b,ie),b.onAfterRender(v,U,z,H,k,ie)}function $s(b,U,z){U.isScene!==!0&&(U=gt);const H=Te.get(b),k=f.state.lights,ie=f.state.shadowsArray,de=k.state.version,_e=be.getParameters(b,k.state,ie,U,z),xe=be.getProgramCacheKey(_e);let Ie=H.programs;H.environment=b.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(b.isMeshStandardMaterial?B:x).get(b.envMap||H.environment),H.envMapRotation=H.environment!==null&&b.envMap===null?U.environmentRotation:b.envMapRotation,Ie===void 0&&(b.addEventListener("dispose",Ue),Ie=new Map,H.programs=Ie);let ke=Ie.get(xe);if(ke!==void 0){if(H.currentProgram===ke&&H.lightsStateVersion===de)return fl(b,_e),ke}else _e.uniforms=be.getUniforms(b),b.onBeforeCompile(_e,v),ke=be.acquireProgram(_e,xe),Ie.set(xe,ke),H.uniforms=_e.uniforms;const ve=H.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(ve.clippingPlanes=te.uniform),fl(b,_e),H.needsLights=Zh(b),H.lightsStateVersion=de,H.needsLights&&(ve.ambientLightColor.value=k.state.ambient,ve.lightProbe.value=k.state.probe,ve.directionalLights.value=k.state.directional,ve.directionalLightShadows.value=k.state.directionalShadow,ve.spotLights.value=k.state.spot,ve.spotLightShadows.value=k.state.spotShadow,ve.rectAreaLights.value=k.state.rectArea,ve.ltc_1.value=k.state.rectAreaLTC1,ve.ltc_2.value=k.state.rectAreaLTC2,ve.pointLights.value=k.state.point,ve.pointLightShadows.value=k.state.pointShadow,ve.hemisphereLights.value=k.state.hemi,ve.directionalShadowMap.value=k.state.directionalShadowMap,ve.directionalShadowMatrix.value=k.state.directionalShadowMatrix,ve.spotShadowMap.value=k.state.spotShadowMap,ve.spotLightMatrix.value=k.state.spotLightMatrix,ve.spotLightMap.value=k.state.spotLightMap,ve.pointShadowMap.value=k.state.pointShadowMap,ve.pointShadowMatrix.value=k.state.pointShadowMatrix),H.currentProgram=ke,H.uniformsList=null,ke}function dl(b){if(b.uniformsList===null){const U=b.currentProgram.getUniforms();b.uniformsList=Ir.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function fl(b,U){const z=Te.get(b);z.outputColorSpace=U.outputColorSpace,z.batching=U.batching,z.batchingColor=U.batchingColor,z.instancing=U.instancing,z.instancingColor=U.instancingColor,z.instancingMorph=U.instancingMorph,z.skinning=U.skinning,z.morphTargets=U.morphTargets,z.morphNormals=U.morphNormals,z.morphColors=U.morphColors,z.morphTargetsCount=U.morphTargetsCount,z.numClippingPlanes=U.numClippingPlanes,z.numIntersection=U.numClipIntersection,z.vertexAlphas=U.vertexAlphas,z.vertexTangents=U.vertexTangents,z.toneMapping=U.toneMapping}function jh(b,U,z,H,k){U.isScene!==!0&&(U=gt),w.resetTextureUnits();const ie=U.fog,de=H.isMeshStandardMaterial?U.environment:null,_e=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ot,xe=(H.isMeshStandardMaterial?B:x).get(H.envMap||de),Ie=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,ke=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),ve=!!z.morphAttributes.position,Ke=!!z.morphAttributes.normal,lt=!!z.morphAttributes.color;let ut=ai;H.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ut=v.toneMapping);const Bt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Qe=Bt!==void 0?Bt.length:0,Me=Te.get(H),An=f.state.lights;if(se===!0&&(ye===!0||b!==y)){const Qt=b===y&&H.id===T;te.setState(H,b,Qt)}let et=!1;H.version===Me.__version?(Me.needsLights&&Me.lightsStateVersion!==An.state.version||Me.outputColorSpace!==_e||k.isBatchedMesh&&Me.batching===!1||!k.isBatchedMesh&&Me.batching===!0||k.isBatchedMesh&&Me.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Me.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Me.instancing===!1||!k.isInstancedMesh&&Me.instancing===!0||k.isSkinnedMesh&&Me.skinning===!1||!k.isSkinnedMesh&&Me.skinning===!0||k.isInstancedMesh&&Me.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Me.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Me.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Me.instancingMorph===!1&&k.morphTexture!==null||Me.envMap!==xe||H.fog===!0&&Me.fog!==ie||Me.numClippingPlanes!==void 0&&(Me.numClippingPlanes!==te.numPlanes||Me.numIntersection!==te.numIntersection)||Me.vertexAlphas!==Ie||Me.vertexTangents!==ke||Me.morphTargets!==ve||Me.morphNormals!==Ke||Me.morphColors!==lt||Me.toneMapping!==ut||Me.morphTargetsCount!==Qe)&&(et=!0):(et=!0,Me.__version=H.version);let an=Me.currentProgram;et===!0&&(an=$s(H,U,k));let Ci=!1,Gt=!1,_s=!1;const dt=an.getUniforms(),xn=Me.uniforms;if(we.useProgram(an.program)&&(Ci=!0,Gt=!0,_s=!0),H.id!==T&&(T=H.id,Gt=!0),Ci||y!==b){we.buffers.depth.getReversed()?(ce.copy(b.projectionMatrix),Fd(ce),Od(ce),dt.setValue(F,"projectionMatrix",ce)):dt.setValue(F,"projectionMatrix",b.projectionMatrix),dt.setValue(F,"viewMatrix",b.matrixWorldInverse);const Wn=dt.map.cameraPosition;Wn!==void 0&&Wn.setValue(F,De.setFromMatrixPosition(b.matrixWorld)),Xe.logarithmicDepthBuffer&&dt.setValue(F,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&dt.setValue(F,"isOrthographic",b.isOrthographicCamera===!0),y!==b&&(y=b,Gt=!0,_s=!0)}if(k.isSkinnedMesh){dt.setOptional(F,k,"bindMatrix"),dt.setOptional(F,k,"bindMatrixInverse");const Qt=k.skeleton;Qt&&(Qt.boneTexture===null&&Qt.computeBoneTexture(),dt.setValue(F,"boneTexture",Qt.boneTexture,w))}k.isBatchedMesh&&(dt.setOptional(F,k,"batchingTexture"),dt.setValue(F,"batchingTexture",k._matricesTexture,w),dt.setOptional(F,k,"batchingIdTexture"),dt.setValue(F,"batchingIdTexture",k._indirectTexture,w),dt.setOptional(F,k,"batchingColorTexture"),k._colorsTexture!==null&&dt.setValue(F,"batchingColorTexture",k._colorsTexture,w));const xs=z.morphAttributes;if((xs.position!==void 0||xs.normal!==void 0||xs.color!==void 0)&&Le.update(k,z,an),(Gt||Me.receiveShadow!==k.receiveShadow)&&(Me.receiveShadow=k.receiveShadow,dt.setValue(F,"receiveShadow",k.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(xn.envMap.value=xe,xn.flipEnvMap.value=xe.isCubeTexture&&xe.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(xn.envMapIntensity.value=U.environmentIntensity),Gt&&(dt.setValue(F,"toneMappingExposure",v.toneMappingExposure),Me.needsLights&&Kh(xn,_s),ie&&H.fog===!0&&he.refreshFogUniforms(xn,ie),he.refreshMaterialUniforms(xn,H,D,J,f.state.transmissionRenderTarget[b.id]),Ir.upload(F,dl(Me),xn,w)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Ir.upload(F,dl(Me),xn,w),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&dt.setValue(F,"center",k.center),dt.setValue(F,"modelViewMatrix",k.modelViewMatrix),dt.setValue(F,"normalMatrix",k.normalMatrix),dt.setValue(F,"modelMatrix",k.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Qt=H.uniformsGroups;for(let Wn=0,Xn=Qt.length;Wn<Xn;Wn++){const pl=Qt[Wn];I.update(pl,an),I.bind(pl,an)}}return an}function Kh(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function Zh(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(b,U,z){Te.get(b.texture).__webglTexture=U,Te.get(b.depthTexture).__webglTexture=z;const H=Te.get(b);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=z===void 0,H.__autoAllocateDepthBuffer||We.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,U){const z=Te.get(b);z.__webglFramebuffer=U,z.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(b,U=0,z=0){P=b,R=U,A=z;let H=!0,k=null,ie=!1,de=!1;if(b){const xe=Te.get(b);if(xe.__useDefaultFramebuffer!==void 0)we.bindFramebuffer(F.FRAMEBUFFER,null),H=!1;else if(xe.__webglFramebuffer===void 0)w.setupRenderTarget(b);else if(xe.__hasExternalTextures)w.rebindTextures(b,Te.get(b.texture).__webglTexture,Te.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const ve=b.depthTexture;if(xe.__boundDepthTexture!==ve){if(ve!==null&&Te.has(ve)&&(b.width!==ve.image.width||b.height!==ve.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(b)}}const Ie=b.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(de=!0);const ke=Te.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(ke[U])?k=ke[U][z]:k=ke[U],ie=!0):b.samples>0&&w.useMultisampledRTT(b)===!1?k=Te.get(b).__webglMultisampledFramebuffer:Array.isArray(ke)?k=ke[z]:k=ke,C.copy(b.viewport),W.copy(b.scissor),V=b.scissorTest}else C.copy(re).multiplyScalar(D).floor(),W.copy(Ee).multiplyScalar(D).floor(),V=Ze;if(we.bindFramebuffer(F.FRAMEBUFFER,k)&&H&&we.drawBuffers(b,k),we.viewport(C),we.scissor(W),we.setScissorTest(V),ie){const xe=Te.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+U,xe.__webglTexture,z)}else if(de){const xe=Te.get(b.texture),Ie=U||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,xe.__webglTexture,z||0,Ie)}T=-1},this.readRenderTargetPixels=function(b,U,z,H,k,ie,de){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=Te.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&de!==void 0&&(_e=_e[de]),_e){we.bindFramebuffer(F.FRAMEBUFFER,_e);try{const xe=b.texture,Ie=xe.format,ke=xe.type;if(!Xe.textureFormatReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xe.textureTypeReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-H&&z>=0&&z<=b.height-k&&F.readPixels(U,z,H,k,Fe.convert(Ie),Fe.convert(ke),ie)}finally{const xe=P!==null?Te.get(P).__webglFramebuffer:null;we.bindFramebuffer(F.FRAMEBUFFER,xe)}}},this.readRenderTargetPixelsAsync=async function(b,U,z,H,k,ie,de){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=Te.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&de!==void 0&&(_e=_e[de]),_e){const xe=b.texture,Ie=xe.format,ke=xe.type;if(!Xe.textureFormatReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xe.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=b.width-H&&z>=0&&z<=b.height-k){we.bindFramebuffer(F.FRAMEBUFFER,_e);const ve=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,ve),F.bufferData(F.PIXEL_PACK_BUFFER,ie.byteLength,F.STREAM_READ),F.readPixels(U,z,H,k,Fe.convert(Ie),Fe.convert(ke),0);const Ke=P!==null?Te.get(P).__webglFramebuffer:null;we.bindFramebuffer(F.FRAMEBUFFER,Ke);const lt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Nd(F,lt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,ve),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,ie),F.deleteBuffer(ve),F.deleteSync(lt),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,U=null,z=0){b.isTexture!==!0&&(Ps("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,b=arguments[1]);const H=Math.pow(2,-z),k=Math.floor(b.image.width*H),ie=Math.floor(b.image.height*H),de=U!==null?U.x:0,_e=U!==null?U.y:0;w.setTexture2D(b,0),F.copyTexSubImage2D(F.TEXTURE_2D,z,0,0,de,_e,k,ie),we.unbindTexture()},this.copyTextureToTexture=function(b,U,z=null,H=null,k=0){b.isTexture!==!0&&(Ps("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,b=arguments[1],U=arguments[2],k=arguments[3]||0,z=null);let ie,de,_e,xe,Ie,ke,ve,Ke,lt;const ut=b.isCompressedTexture?b.mipmaps[k]:b.image;z!==null?(ie=z.max.x-z.min.x,de=z.max.y-z.min.y,_e=z.isBox3?z.max.z-z.min.z:1,xe=z.min.x,Ie=z.min.y,ke=z.isBox3?z.min.z:0):(ie=ut.width,de=ut.height,_e=ut.depth||1,xe=0,Ie=0,ke=0),H!==null?(ve=H.x,Ke=H.y,lt=H.z):(ve=0,Ke=0,lt=0);const Bt=Fe.convert(U.format),Qe=Fe.convert(U.type);let Me;U.isData3DTexture?(w.setTexture3D(U,0),Me=F.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(w.setTexture2DArray(U,0),Me=F.TEXTURE_2D_ARRAY):(w.setTexture2D(U,0),Me=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,U.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,U.unpackAlignment);const An=F.getParameter(F.UNPACK_ROW_LENGTH),et=F.getParameter(F.UNPACK_IMAGE_HEIGHT),an=F.getParameter(F.UNPACK_SKIP_PIXELS),Ci=F.getParameter(F.UNPACK_SKIP_ROWS),Gt=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,ut.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ut.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,xe),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ie),F.pixelStorei(F.UNPACK_SKIP_IMAGES,ke);const _s=b.isDataArrayTexture||b.isData3DTexture,dt=U.isDataArrayTexture||U.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const xn=Te.get(b),xs=Te.get(U),Qt=Te.get(xn.__renderTarget),Wn=Te.get(xs.__renderTarget);we.bindFramebuffer(F.READ_FRAMEBUFFER,Qt.__webglFramebuffer),we.bindFramebuffer(F.DRAW_FRAMEBUFFER,Wn.__webglFramebuffer);for(let Xn=0;Xn<_e;Xn++)_s&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Te.get(b).__webglTexture,k,ke+Xn),b.isDepthTexture?(dt&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Te.get(U).__webglTexture,k,lt+Xn),F.blitFramebuffer(xe,Ie,ie,de,ve,Ke,ie,de,F.DEPTH_BUFFER_BIT,F.NEAREST)):dt?F.copyTexSubImage3D(Me,k,ve,Ke,lt+Xn,xe,Ie,ie,de):F.copyTexSubImage2D(Me,k,ve,Ke,lt+Xn,xe,Ie,ie,de);we.bindFramebuffer(F.READ_FRAMEBUFFER,null),we.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else dt?b.isDataTexture||b.isData3DTexture?F.texSubImage3D(Me,k,ve,Ke,lt,ie,de,_e,Bt,Qe,ut.data):U.isCompressedArrayTexture?F.compressedTexSubImage3D(Me,k,ve,Ke,lt,ie,de,_e,Bt,ut.data):F.texSubImage3D(Me,k,ve,Ke,lt,ie,de,_e,Bt,Qe,ut):b.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,k,ve,Ke,ie,de,Bt,Qe,ut.data):b.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,k,ve,Ke,ut.width,ut.height,Bt,ut.data):F.texSubImage2D(F.TEXTURE_2D,k,ve,Ke,ie,de,Bt,Qe,ut);F.pixelStorei(F.UNPACK_ROW_LENGTH,An),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,et),F.pixelStorei(F.UNPACK_SKIP_PIXELS,an),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ci),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Gt),k===0&&U.generateMipmaps&&F.generateMipmap(Me),we.unbindTexture()},this.copyTextureToTexture3D=function(b,U,z=null,H=null,k=0){return b.isTexture!==!0&&(Ps("WebGLRenderer: copyTextureToTexture3D function signature has changed."),z=arguments[0]||null,H=arguments[1]||null,b=arguments[2],U=arguments[3],k=arguments[4]||0),Ps('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,U,z,H,k)},this.initRenderTarget=function(b){Te.get(b).__webglFramebuffer===void 0&&w.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?w.setTextureCube(b,0):b.isData3DTexture?w.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?w.setTexture2DArray(b,0):w.setTexture2D(b,0),we.unbindTexture()},this.resetState=function(){R=0,A=0,P=null,we.reset(),at.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Ve._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ve._getUnpackColorSpace()}}class Ka{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Se(e),this.near=t,this.far=n}clone(){return new Ka(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class j0 extends mt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Kt,this.environmentIntensity=1,this.environmentRotation=new Kt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class K0{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ma,this.updateRanges=[],this.version=0,this.uuid=gn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ut=new L;class Za{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyMatrix4(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.applyNormalMatrix(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ut.fromBufferAttribute(this,t),Ut.transformDirection(e),this.setXYZ(t,Ut.x,Ut.y,Ut.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=fn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=fn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=fn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=fn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=fn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),n=nt(n,this.array),i=nt(i,this.array),r=nt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Ft(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Za(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Mc=new L,Sc=new Je,Tc=new Je,Z0=new L,Ec=new Pe,pr=new L,So=new Sn,wc=new Pe,To=new Gr;class J0 extends ct{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Tl,this.bindMatrix=new Pe,this.bindMatrixInverse=new Pe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Mn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,pr),this.boundingBox.expandByPoint(pr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Sn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,pr),this.boundingSphere.expandByPoint(pr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),So.copy(this.boundingSphere),So.applyMatrix4(i),e.ray.intersectsSphere(So)!==!1&&(wc.copy(i).invert(),To.copy(e.ray).applyMatrix4(wc),!(this.boundingBox!==null&&To.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,To)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Je,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Tl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===sd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Sc.fromBufferAttribute(i.attributes.skinIndex,e),Tc.fromBufferAttribute(i.attributes.skinWeight,e),Mc.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=Tc.getComponent(r);if(o!==0){const a=Sc.getComponent(r);Ec.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Z0.copy(Mc).applyMatrix4(Ec),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Fh extends mt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Oh extends wt{constructor(e=null,t=1,n=1,i,r,o,a,l,c=It,h=It,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ac=new Pe,Q0=new Pe;class Ja{constructor(e=[],t=[]){this.uuid=gn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Pe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Pe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:Q0;Ac.multiplyMatrices(a,t[r]),Ac.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Ja(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Oh(t,e,e,rn,mn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Fh),this.bones.push(o),this.boneInverses.push(new Pe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Ta extends Ft{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Wi=new Pe,Rc=new Pe,mr=[],Cc=new Mn,e_=new Pe,Ss=new ct,Ts=new Sn;class Ti extends ct{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ta(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,e_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Mn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Wi),Cc.copy(e.boundingBox).applyMatrix4(Wi),this.boundingBox.union(Cc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Sn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Wi),Ts.copy(e.boundingSphere).applyMatrix4(Wi),this.boundingSphere.union(Ts)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Ss.geometry=this.geometry,Ss.material=this.material,Ss.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ts.copy(this.boundingSphere),Ts.applyMatrix4(n),e.ray.intersectsSphere(Ts)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Wi),Rc.multiplyMatrices(n,Wi),Ss.matrixWorld=Rc,Ss.raycast(e,mr);for(let o=0,a=mr.length;o<a;o++){const l=mr[o];l.instanceId=r,l.object=this,t.push(l)}mr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ta(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Oh(new Float32Array(i*this.count),i,this.count,Ha,mn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Bh extends _n{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Se(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Br=new L,zr=new L,Pc=new Pe,Es=new Gr,gr=new Sn,Eo=new L,Lc=new L;class Qa extends mt{constructor(e=new Zt,t=new Bh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Br.fromBufferAttribute(t,i-1),zr.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Br.distanceTo(zr);e.setAttribute("lineDistance",new jt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(i),gr.radius+=r,e.ray.intersectsSphere(gr)===!1)return;Pc.copy(i).invert(),Es.copy(e.ray).applyMatrix4(Pc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const m=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let _=m,p=g-1;_<p;_+=c){const f=h.getX(_),E=h.getX(_+1),M=_r(this,e,Es,l,f,E);M&&t.push(M)}if(this.isLineLoop){const _=h.getX(g-1),p=h.getX(m),f=_r(this,e,Es,l,_,p);f&&t.push(f)}}else{const m=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=m,p=g-1;_<p;_+=c){const f=_r(this,e,Es,l,_,_+1);f&&t.push(f)}if(this.isLineLoop){const _=_r(this,e,Es,l,g-1,m);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function _r(s,e,t,n,i,r){const o=s.geometry.attributes.position;if(Br.fromBufferAttribute(o,i),zr.fromBufferAttribute(o,r),t.distanceSqToSegment(Br,zr,Eo,Lc)>n)return;Eo.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(Eo);if(!(l<e.near||l>e.far))return{distance:l,point:Lc.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:s}}const Ic=new L,Dc=new L;class t_ extends Qa{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Ic.fromBufferAttribute(t,i),Dc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Ic.distanceTo(Dc);e.setAttribute("lineDistance",new jt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class n_ extends Qa{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class zh extends _n{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Se(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Uc=new Pe,Ea=new Gr,xr=new Sn,vr=new L;class i_ extends mt{constructor(e=new Zt,t=new zh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xr.copy(n.boundingSphere),xr.applyMatrix4(i),xr.radius+=r,e.ray.intersectsSphere(xr)===!1)return;Uc.copy(i).invert(),Ea.copy(e.ray).applyMatrix4(Uc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let g=d,_=m;g<_;g++){const p=c.getX(g);vr.fromBufferAttribute(u,p),kc(vr,p,l,i,e,t,this)}}else{const d=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let g=d,_=m;g<_;g++)vr.fromBufferAttribute(u,g),kc(vr,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function kc(s,e,t,n,i,r,o){const a=Ea.distanceSqToPoint(s);if(a<t){const l=new L;Ea.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class el extends _n{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Se(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xa,this.normalScale=new Ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Tn extends el{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ge(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Se(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Se(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Se(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Qi extends _n{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new Se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Se(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xa,this.normalScale=new Ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kt,this.combine=Fa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function yr(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function s_(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function r_(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Nc(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function Hh(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push.apply(t,o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}class Xs{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class o_ extends Xs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:El,endingEnd:El}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case wl:r=e,a=2*t-n;break;case Al:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case wl:o=e,l=2*n-t;break;case Al:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,m=this._weightNext,g=(n-t)/(i-t),_=g*g,p=_*g,f=-d*p+2*d*_-d*g,E=(1+d)*p+(-1.5-2*d)*_+(-.5+d)*g+1,M=(-1-m)*p+(1.5+m)*_+.5*g,v=m*p-m*_;for(let O=0;O!==a;++O)r[O]=f*o[h+O]+E*o[c+O]+M*o[l+O]+v*o[u+O];return r}}class a_ extends Xs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}}class l_ extends Xs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class En{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=yr(t,this.TimeBufferType),this.values=yr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:yr(e.times,Array),values:yr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new l_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new a_(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new o_(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Hs:t=this.InterpolantFactoryMethodDiscrete;break;case Vs:t=this.InterpolantFactoryMethodLinear;break;case Yr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Hs;case this.InterpolantFactoryMethodLinear:return Vs;case this.InterpolantFactoryMethodSmooth:return Yr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&s_(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Yr,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,m=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[m+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let m=0;m!==n;++m)t[d+m]=t[u+m]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}En.prototype.TimeBufferType=Float32Array;En.prototype.ValueBufferType=Float32Array;En.prototype.DefaultInterpolation=Vs;class ps extends En{constructor(e,t,n){super(e,t,n)}}ps.prototype.ValueTypeName="bool";ps.prototype.ValueBufferType=Array;ps.prototype.DefaultInterpolation=Hs;ps.prototype.InterpolantFactoryMethodLinear=void 0;ps.prototype.InterpolantFactoryMethodSmooth=void 0;class Vh extends En{}Vh.prototype.ValueTypeName="color";class cs extends En{}cs.prototype.ValueTypeName="number";class c_ extends Xs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)bn.slerpFlat(r,0,o,c-a,o,c,l);return r}}class hs extends En{InterpolantFactoryMethodLinear(e){return new c_(this.times,this.values,this.getValueSize(),e)}}hs.prototype.ValueTypeName="quaternion";hs.prototype.InterpolantFactoryMethodSmooth=void 0;class ms extends En{constructor(e,t,n){super(e,t,n)}}ms.prototype.ValueTypeName="string";ms.prototype.ValueBufferType=Array;ms.prototype.DefaultInterpolation=Hs;ms.prototype.InterpolantFactoryMethodLinear=void 0;ms.prototype.InterpolantFactoryMethodSmooth=void 0;class us extends En{}us.prototype.ValueTypeName="vector";class h_{constructor(e="",t=-1,n=[],i=rd){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=gn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(d_(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(En.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const h=r_(l);l=Nc(l,1,h),c=Nc(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new cs(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,m,g,_){if(m.length!==0){const p=[],f=[];Hh(m,p,f,g),p.length!==0&&_.push(new u(d,p,f))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const m={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)m[d[g].morphTargets[_]]=-1;for(const _ in m){const p=[],f=[];for(let E=0;E!==d[g].morphTargets.length;++E){const M=d[g];p.push(M.time),f.push(M.morphTarget===_?1:0)}i.push(new cs(".morphTargetInfluence["+_+"]",p,f))}l=m.length*o}else{const m=".bones["+t[u].name+"]";n(us,m+".position",d,"pos",i),n(hs,m+".quaternion",d,"rot",i),n(us,m+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function u_(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return cs;case"vector":case"vector2":case"vector3":case"vector4":return us;case"color":return Vh;case"quaternion":return hs;case"bool":case"boolean":return ps;case"string":return ms}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function d_(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=u_(s.type);if(s.times===void 0){const t=[],n=[];Hh(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const ii={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class f_{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const m=c[u],g=c[u+1];if(m.global&&(m.lastIndex=0),m.test(h))return g}return null}}}const p_=new f_;class gs{constructor(e){this.manager=e!==void 0?e:p_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}gs.DEFAULT_MATERIAL_NAME="__DEFAULT";const kn={};class m_ extends Error{constructor(e,t){super(e),this.response=t}}class Gh extends gs{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=ii.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(kn[e]!==void 0){kn[e].push({onLoad:t,onProgress:n,onError:i});return}kn[e]=[],kn[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=kn[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),m=d?parseInt(d):0,g=m!==0;let _=0;const p=new ReadableStream({start(f){E();function E(){u.read().then(({done:M,value:v})=>{if(M)f.close();else{_+=v.byteLength;const O=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:m});for(let R=0,A=h.length;R<A;R++){const P=h[R];P.onProgress&&P.onProgress(O)}f.enqueue(v),E()}},M=>{f.error(M)})}}});return new Response(p)}else throw new m_(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,m=new TextDecoder(d);return c.arrayBuffer().then(g=>m.decode(g))}}}).then(c=>{ii.add(e,c);const h=kn[e];delete kn[e];for(let u=0,d=h.length;u<d;u++){const m=h[u];m.onLoad&&m.onLoad(c)}}).catch(c=>{const h=kn[e];if(h===void 0)throw this.manager.itemError(e),c;delete kn[e];for(let u=0,d=h.length;u<d;u++){const m=h[u];m.onError&&m.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class g_ extends gs{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ii.get(e);if(o!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o;const a=Gs("img");function l(){h(),ii.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(e),a.src=e,a}}class __ extends gs{constructor(e){super(e)}load(e,t,n,i){const r=new wt,o=new g_(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class qr extends mt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Se(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class x_ extends qr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Se(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const wo=new Pe,Fc=new L,Oc=new L;class tl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ge(512,512),this.map=null,this.mapPass=null,this.matrix=new Pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $a,this._frameExtents=new Ge(1,1),this._viewportCount=1,this._viewports=[new Je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Fc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Fc),Oc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Oc),t.updateMatrixWorld(),wo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(wo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class v_ extends tl{constructor(){super(new Nt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=as*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class y_ extends qr{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new v_}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Bc=new Pe,ws=new L,Ao=new L;class b_ extends tl{constructor(){super(new Nt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ge(4,2),this._viewportCount=6,this._viewports=[new Je(2,1,1,1),new Je(0,1,1,1),new Je(3,1,1,1),new Je(1,1,1,1),new Je(3,0,1,1),new Je(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ws.setFromMatrixPosition(e.matrixWorld),n.position.copy(ws),Ao.copy(n.position),Ao.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ao),n.updateMatrixWorld(),i.makeTranslation(-ws.x,-ws.y,-ws.z),Bc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bc)}}class M_ extends qr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new b_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class S_ extends tl{constructor(){super(new Ya(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class wa extends qr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mt.DEFAULT_UP),this.updateMatrix(),this.target=new mt,this.shadow=new S_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Os{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class T_ extends gs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=ii.get(e);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return ii.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),ii.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});ii.add(e,l),r.manager.itemStart(e)}}const nl="\\[\\]\\.:\\/",E_=new RegExp("["+nl+"]","g"),il="[^"+nl+"]",w_="[^"+nl.replace("\\.","")+"]",A_=/((?:WC+[\/:])*)/.source.replace("WC",il),R_=/(WCOD+)?/.source.replace("WCOD",w_),C_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",il),P_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",il),L_=new RegExp("^"+A_+R_+C_+P_+"$"),I_=["material","materials","bones","map"];class D_{constructor(e,t,n){const i=n||st.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class st{constructor(e,t,n){this.path=t,this.parsedPath=n||st.parseTrackName(t),this.node=st.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new st.Composite(e,t,n):new st(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(E_,"")}static parseTrackName(e){const t=L_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);I_.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=st.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}st.Composite=D_;st.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};st.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};st.prototype.GetterByBindingType=[st.prototype._getValue_direct,st.prototype._getValue_array,st.prototype._getValue_arrayElement,st.prototype._getValue_toArray];st.prototype.SetterByBindingTypeAndVersioning=[[st.prototype._setValue_direct,st.prototype._setValue_direct_setNeedsUpdate,st.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[st.prototype._setValue_array,st.prototype._setValue_array_setNeedsUpdate,st.prototype._setValue_array_setMatrixWorldNeedsUpdate],[st.prototype._setValue_arrayElement,st.prototype._setValue_arrayElement_setNeedsUpdate,st.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[st.prototype._setValue_fromArray,st.prototype._setValue_fromArray_setNeedsUpdate,st.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ka}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ka);const sl=[["woodLight",13145679],["wood",11039802],["woodDark",8016168],["floor",12159578],["floorDark",10844232],["wall",15721416],["wallTrim",14272931],["board",3104070],["boardDark",2312245],["chalk",16052710],["uniBlue",4157380],["uniWhite",15922423],["navy",2569822],["skin",15910810],["skinDark",14262899],["hair",2827298],["hairBrown",5978917],["grey",9211798],["greyDark",5066839],["black",1908002],["red",14169386],["orange",15764004],["yellow",16174908],["green",6270538],["leaf",4164156],["sky",10474738],["glass",13626103],["pink",15899568],["purple",9068496],["metal",12173512],["cream",16247236],["meat",10242594]],S={};sl.forEach(([s],e)=>S[s]=e+1);const Nn=s=>sl[s-1][1],Xi=64;class U_{mesh;parts=[];m=new Pe;q=new bn;s=new L;p=new L;e=new Kt;col=new Se;next=0;constructor(){const e=new Yt({transparent:!0,opacity:.8,depthWrite:!1});this.mesh=new Ti(new Ht(1,1,1),e,Xi),this.mesh.frustumCulled=!1,this.mesh.instanceMatrix.setUsage(_d);for(let t=0;t<Xi;t++)this.parts.push({alive:!1,x:0,y:0,z:0,vx:0,vy:0,vz:0,life:0,max:1,size:.1,grow:0,g:0,spin:0,rot:0}),this.mesh.setColorAt(t,this.col.set(16777215));this.clear()}get aliveCount(){return this.parts.filter(e=>e.alive).length}clear(){for(const e of this.parts)e.alive=!1;this.update(0)}spawn(e){let t=-1;for(let o=0;o<Xi;o++){const a=(this.next+o)%Xi;if(!this.parts[a].alive){t=a;break}}t<0&&(t=this.next),this.next=(t+1)%Xi;const n=e.spread??0,i=()=>(Math.random()-.5)*2,r=this.parts[t];r.alive=!0,r.x=e.x+i()*n,r.y=e.y+i()*n*.5,r.z=e.z+i()*n,r.vx=e.vx??0,r.vy=e.vy??0,r.vz=e.vz??0,r.max=r.life=e.life??1,r.size=e.size??.1,r.grow=e.grow??0,r.g=e.g??0,r.spin=i()*3,r.rot=Math.random()*6,this.mesh.setColorAt(t,this.col.set(e.color)),this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}burst(e,t,n=2){for(let i=0;i<e;i++)this.spawn({...t,vx:(Math.random()-.5)*n,vy:Math.random()*n,vz:(Math.random()-.5)*n})}update(e){for(let t=0;t<Xi;t++){const n=this.parts[t];if(n.alive&&(n.life-=e,n.life<=0&&(n.alive=!1),n.vy-=n.g*e,n.x+=n.vx*e,n.y+=n.vy*e,n.z+=n.vz*e,n.rot+=n.spin*e,n.g>0&&n.y<.05&&(n.y=.05,n.vy*=-.4,n.vx*=.6,n.vz*=.6)),!n.alive)this.s.setScalar(0),this.p.set(0,-10,0),this.q.identity();else{const i=n.life/n.max,r=(n.size+n.grow*(1-i))*Math.min(1,i*4);this.s.setScalar(r),this.p.set(n.x,n.y,n.z),this.q.setFromEuler(this.e.set(0,n.rot,0))}this.mesh.setMatrixAt(t,this.m.compose(this.p,this.q,this.s))}this.mesh.instanceMatrix.needsUpdate=!0}}const vn=.1;class pt{constructor(e,t,n){this.w=e,this.h=t,this.d=n,this.data=new Uint8Array(e*t*n)}data;get(e,t,n){return e<0||t<0||n<0||e>=this.w||t>=this.h||n>=this.d?0:this.data[e+this.w*(t+this.h*n)]}set(e,t,n,i){return e<0||t<0||n<0||e>=this.w||t>=this.h||n>=this.d?this:(this.data[e+this.w*(t+this.h*n)]=i,this)}box(e,t,n,i,r,o,a){for(let l=n;l<=o;l++)for(let c=t;c<=r;c++)for(let h=e;h<=i;h++)this.set(h,c,l,a);return this}}const zc=sl.map(([,s])=>new Se(s)),k_=[.52,.68,.84,1],N_=[.96,1,1.04];function F_(s,e,t){let n=s*374761393+e*668265263+t*2147483647|0;return n=(n^n>>>13)*1274126177,((n^n>>>16)>>>0)%3}function Wh(s,e={}){const t=e.scale??vn,n=e.origin??[s.w/2,0,s.d/2],i=e.jitterCell??1,r=[s.w,s.h,s.d],o=[],a=[],l=[],c=[],h=m=>s.get(m[0],m[1],m[2])?1:0,u=[0,0,0];for(let m=0;m<3;m++){const g=(m+1)%3,_=(m+2)%3,p=[0,0,0],f=new Int32Array(r[g]*r[_]),E=(M,v)=>{const O=s.get(M[0],M[1],M[2]),R=M[m]+v;let A=0;const P=[[-1,-1],[1,-1],[1,1],[-1,1]];for(let y=0;y<4;y++){const[C,W]=P[y];u[m]=R,u[g]=M[g]+C,u[_]=M[_];const V=h(u);u[g]=M[g],u[_]=M[_]+W;const Y=h(u);u[g]=M[g]+C;const j=h(u);A|=(V&&Y?0:3-(V+Y+j))<<y*2}const T=F_(Math.floor(M[0]/i),Math.floor(M[1]/i),Math.floor(M[2]/i));return O|A<<8|T<<16};for(p[m]=-1;p[m]<r[m];){let M=0;for(p[_]=0;p[_]<r[_];p[_]++)for(p[g]=0;p[g]<r[g];p[g]++){const v=p[m]>=0?s.get(p[0],p[1],p[2]):0;p[m]++;const O=p[m]<r[m]?s.get(p[0],p[1],p[2]):0;!!v==!!O?f[M]=0:v?(p[m]--,f[M]=E(p,1),p[m]++):f[M]=-E(p,-1),p[m]--,M++}p[m]++,M=0;for(let v=0;v<r[_];v++)for(let O=0;O<r[g];){const R=f[M];if(!R){O++,M++;continue}const A=Math.abs(R),P=A>>8&255,T=P===255||P===170||P===85||P===0;let y=1,C=1;if(T){for(;O+y<r[g]&&f[M+y]===R;)y++;e:for(;v+C<r[_];C++)for(let re=0;re<y;re++)if(f[M+re+C*r[g]]!==R)break e}p[g]=O,p[_]=v;const W=[0,0,0],V=[0,0,0];W[g]=y,V[_]=C;const Y=o.length/3,j=zc[(A&255)-1]??zc[0],q=N_[A>>16&3],J=[[0,0],[1,0],[1,1],[0,1]],D=[P&3,P>>2&3,P>>4&3,P>>6&3];for(let re=0;re<4;re++){const[Ee,Ze]=J[re];o.push((p[0]+W[0]*Ee+V[0]*Ze-n[0])*t,(p[1]+W[1]*Ee+V[1]*Ze-n[1])*t,(p[2]+W[2]*Ee+V[2]*Ze-n[2])*t);const X=k_[D[re]]*q;a.push(j.r*X,j.g*X,j.b*X),l.push(m===0?Math.sign(R):0,m===1?Math.sign(R):0,m===2?Math.sign(R):0)}const ne=D[0]+D[2]<D[1]+D[3]?[1,2,3,1,3,0]:[0,1,2,0,2,3];if(R>0)for(const re of ne)c.push(Y+re);else for(let re=5;re>=0;re--)c.push(Y+ne[re]);for(let re=0;re<C;re++)for(let Ee=0;Ee<y;Ee++)f[M+Ee+re*r[g]]=0;O+=y,M+=y}}}const d=new Zt;return d.setAttribute("position",new jt(o,3)),d.setAttribute("color",new jt(a,3)),d.setAttribute("normal",new jt(l,3)),d.setIndex(c),d.computeBoundingSphere(),d.computeBoundingBox(),d}const si=new Qi({vertexColors:!0}),Hc=new Map;function Ei(s,e,t){let n=Hc.get(s);return n||(n=Wh(e(),t),Hc.set(s,n)),n}function ei(s,e,t){const n=new ct(Ei(s,e,t),si);return n.castShadow=!0,n.receiveShadow=!0,n}const O_={E:"111100110100111","=":"000111000111000",M:"101111111101101",C:"111100100100111",2:"110001010100111",1:"010110010010111","+":"000010111010000","?":"110001010000010",X:"101101010101101",Y:"101101010010010",4:"101101111001001",3:"110001010001110",".":"000000000000010",A:"010101111101101",S:"011100010001110",H:"101101111101101",Z:"111001010100111",0:"111101101101111",9:"111101111001111","-":"000000111000000"};function gi(s,e,t,n,i,r,o=1){for(const a of e){const l=O_[a];if(l)for(let c=0;c<5;c++)for(let h=0;h<3;h++)l[c*3+h]==="1"&&s.box(t+h*o,n+(4-c)*o,i,t+h*o+o-1,n+(4-c)*o+o-1,i,r);t+=4*o}}function Xh(s,e,t,n,i,r){const o=new pt(s,e+1,t+(r==="pony"?2:0)),a=r==="pony"?2:0;return o.box(0,0,a,s-1,e-1,a+t-1,n),o.box(0,e-2,a,s-1,e-1,a+t-1,i),o.box(0,2,a,s-1,e-1,a,i),o.box(0,e-4,a,0,e-1,a+t-3,i),o.box(s-1,e-4,a,s-1,e-1,a+t-3,i),r==="short"&&o.box(1,e-1,a+1,s-2,e,a+t-2,i),r==="side"&&(o.box(0,e-3,a+t-1,3,e-2,a+t-1,i),o.box(0,e,a+1,s-3,e,a+t-2,i)),r==="neat"&&o.box(0,e-2,a+t-1,s-1,e-2,a+t-1,i),r==="pony"&&(o.box(s/2-1|0,e-4,0,s/2|0,e-2,1,i),o.box(s/2-1|0,1,0,s/2|0,e-4,0,i),o.box(1,e-2,a+t-1,s-2,e-2,a+t-1,i)),e>=7&&(o.set(0,3,a+t-4,n),o.set(s-1,3,a+t-4,n)),o}function B_(s,e,t,n=!1){const i=new pt(s,e,1),r=S.black,o=S.chalk,a=S.sky,l=s>=7,c=l?1:0,h=1,u=s-2-c,d=l?e-5:e-4,m=l?4:3,g=s-m>>1,_=l?1:0,p=f=>{t==="normal"||t==="drool"?(i.box(f,d,0,f+c,d+1,0,r),t==="drool"&&l&&i.set(f+1,d+1,0,o)):t==="squint"?i.box(f,d,0,f+c,d,0,r):t==="shock"?(i.box(f,d-1,0,f+c,d+1,0,o),i.set(f,d,0,r),i.set(f+c,d,0,r)):(i.box(f,d+1,0,f+c,d+1,0,r),i.box(f,d-2,0,f,d,0,a))};if(p(h),p(u),t==="squint"&&l&&(i.box(h,d+2,0,h+1,d+2,0,r),i.box(u,d+2,0,u+1,d+2,0,r),i.set(h+2,d+1,0,r),i.set(u-1,d+1,0,r)),t==="shock"?i.box(g+1,0,0,g+2,_+1,0,r):t==="cry"?(i.box(g,_,0,g+m-1,_,0,r),l&&(i.set(g,_+1,0,r),i.set(g+3,_+1,0,r))):(i.box(g,_,0,g+m-1,_,0,t==="drool"?S.red:r),t==="drool"&&i.box(g+m-1,0,0,g+m-1,_-1,0,a)),n){const f=S.greyDark;for(const E of[h,u])i.box(E-1,d+2,0,E+2,d+2,0,f),i.box(E-1,d-1,0,E+2,d-1,0,f),E-1>=0&&i.box(E-1,d-1,0,E-1,d+2,0,f),E+2<s&&i.box(E+2,d-1,0,E+2,d+2,0,f);i.box(h+3,d+1,0,u-2,d+1,0,f)}return i}function z_(s,e,t,n,i={}){const r=new pt(s,e,t).box(0,0,0,s-1,e-1,t-1,n);return i.vest&&(r.box(0,0,0,s-1,e-2,t-1,i.vest),r.box((s>>1)-1,e-3,t-1,s>>1,e-2,t-1,n)),i.collar&&r.box(0,e-1,0,s-1,e-1,t-1,i.collar),i.stripe&&r.box(0,1,0,s-1,1,t-1,i.stripe),i.tie&&(r.box((s>>1)-1,1,t-1,s>>1,e-1,t-1,S.uniWhite),r.box((s>>1)-1,1,t-1,(s>>1)-1,e-1,t-1,i.tie)),r}function Vc(s,e,t,n,i,r=1,o){const a=new pt(s,e+(o?2:0),t),l=o?2:0;return a.box(0,l,0,s-1,l+e-1,t-1,n).box(0,l,0,s-1,l+r-1,t-1,i),o&&a.box(0,0,t-1,0,1,t-1,o),a}function H_(){const s=new pt(10,7,9),e=S.uniWhite,t=S.uniBlue;return s.box(2,2,6,7,6,8,e),s.box(2,6,6,7,6,8,t),s.box(2,3,6,7,3,8,t),s.box(0,3,6,1,6,8,t),s.box(8,3,6,9,6,8,t),s.box(0,3,2,1,4,6,t),s.box(8,3,2,9,4,6,t),s.box(0,3,1,1,4,1,S.skin),s.box(8,3,1,9,4,1,S.skin),s.box(2,0,2,4,1,8,S.navy),s.box(5,0,2,7,1,8,S.navy),s}function Gc(s){const e=Xh(5,5,5,S.skin,s?S.hairBrown:S.hair,s?"pony":"short"),t=(s?2:0)+4;return e.box(1,1,t,1,2,t,S.black),e.box(3,1,t,3,2,t,S.black),e.set(2,0,t,S.black),e}function V_(s=!0){const e=new pt(8,10,13),t=S.woodLight,n=S.wood,i=S.grey;e.box(0,6,0,7,6,4,t),e.box(0,3,0,7,3,4,n),e.box(0,4,0,0,5,4,n),e.box(7,4,0,7,5,4,n),e.box(0,4,0,7,5,0,n);for(const[r,o]of[[0,0],[7,0],[0,4],[7,4]])e.box(r,0,o,r,2,o,i);e.box(1,3,7,6,3,11,n),e.box(1,4,12,6,8,12,n);for(const[r,o]of[[1,7],[6,7],[1,12],[6,12]])e.box(r,0,o,r,2,o,i);return s&&(e.box(1,7,1,3,7,3,S.uniBlue),e.box(5,7,1,6,7,1,S.yellow)),e}const G_=[4,0,9.5];function W_(){const s=new pt(7,9,2);return s.box(0,0,0,6,8,1,S.uniBlue),s.box(1,1,1,5,7,1,S.chalk),s.box(1,5,0,5,6,0,S.yellow),s.box(2,2,0,4,3,0,S.red),s}const X_={latiao:()=>{const s=new pt(5,7,2);return s.box(0,0,0,4,5,1,S.red),s.box(1,2,1,3,3,1,S.yellow),s.set(0,6,0,S.red).set(2,6,0,S.red).set(4,6,0,S.red),s.box(1,6,1,3,6,1,S.orange),s.set(4,5,1,S.chalk),s},chips:()=>{const s=new pt(6,8,3);return s.box(0,0,1,5,7,1,S.yellow),s.box(1,1,0,4,6,2,S.yellow),s.box(1,3,2,4,4,2,S.red),s.box(0,7,1,5,7,1,S.metal),s.box(2,5,2,3,5,2,S.orange),s},jelly:()=>{const s=new pt(4,4,4);return s.box(0,0,0,3,2,3,S.pink),s.box(0,3,0,3,3,3,S.chalk),s.set(1,1,3,S.red),s},noodles:()=>{const s=new pt(6,6,6);return s.box(1,0,1,4,0,4,S.chalk),s.box(0,1,0,5,3,5,S.chalk),s.box(0,2,0,5,2,5,S.red),s.box(1,4,1,4,4,4,S.yellow),s.set(2,5,2,S.yellow).set(3,4,3,S.orange).set(1,4,3,S.green),s.box(4,4,0,4,5,0,S.wood),s},luosifen:()=>{const s=new pt(7,5,7);return s.box(1,0,1,5,0,5,S.leaf),s.box(0,1,0,6,2,6,S.leaf),s.box(1,3,1,5,3,5,S.meat),s.box(2,3,2,4,3,3,S.cream),s.set(1,3,4,S.green).set(5,3,2,S.red).set(3,4,4,S.green).set(4,3,5,S.yellow),s},durian:()=>{const s=new pt(7,7,7);s.box(1,1,1,5,5,5,S.green);for(let e=0;e<7;e+=2)for(let t=0;t<7;t+=2)s.set(e,3+((e+t)%4?1:-1),t,S.leaf),s.set(e,t,0,S.leaf).set(e,t,6,S.leaf).set(0,e,t,S.leaf).set(6,e,t,S.leaf);return s.box(2,5,2,4,6,4,S.yellow),s.set(3,6,3,S.cream),s},hotpot:()=>{const s=new pt(8,6,8);return s.box(1,0,1,6,1,6,S.greyDark),s.set(3,1,7,S.red),s.box(0,2,0,7,4,7,S.metal),s.box(1,4,1,6,4,6,S.red),s.box(4,4,1,6,4,6,S.cream),s.box(3,4,1,3,5,6,S.metal),s.set(1,5,2,S.red).set(2,5,5,S.orange).set(5,5,3,S.green).set(6,5,5,S.chalk),s},teppan:()=>{const s=new pt(9,4,7);return s.box(0,0,0,8,0,6,S.wood),s.box(1,1,1,7,1,5,S.black),s.box(2,2,2,4,2,4,S.meat),s.box(5,2,1,6,2,2,S.chalk),s.set(5,3,1,S.yellow),s.box(5,2,4,6,2,5,S.green),s.set(3,3,3,S.orange),s},lamb:()=>{const s=new pt(14,7,7);s.box(0,0,0,13,0,6,S.wood),s.box(2,1,1,10,4,5,S.orange),s.box(3,4,2,9,5,4,S.meat),s.box(11,2,2,13,4,4,S.orange),s.set(13,4,2,S.meat).set(13,4,4,S.meat);for(const[e,t]of[[3,1],[3,5],[9,1],[9,5]])s.box(e,5,t,e,6,t,S.meat);return s.set(1,1,3,S.green).set(12,1,1,S.red).set(6,5,3,S.yellow),s}},q_={latiao:"🌶️",chips:"🥔",jelly:"🍮",noodles:"🍜",luosifen:"🐌",durian:"🍈",hotpot:"🍲",teppan:"🥩",lamb:"🐑"};function $_(s,e){const t=new pt(9,5,9);return t.box(1,0,1,7,0,7,S.chalk),t.box(0,0,2,8,0,6,S.chalk),t.box(2,0,0,6,0,8,S.chalk),e<=0||(s===0?(t.box(3,1,3,5,1,5,S.green),e>.4&&(t.set(4,2,4,S.red),t.set(3,2,5,S.leaf)),e>.8&&(t.set(5,2,3,S.yellow),t.set(2,1,2,S.orange).set(6,1,6,S.orange))):s===1?(t.box(2,1,3,6,2,5,S.meat),e>.4&&t.box(3,3,4,5,3,4,S.woodDark),e>.7&&(t.set(1,1,6,S.green).set(2,1,7,S.green),t.set(7,1,2,S.orange)),e>.9&&t.set(4,4,4,S.yellow)):(t.box(3,1,3,5,2,5,S.cream),e>.4&&t.box(3,3,3,5,3,5,S.wood),e>.8&&(t.set(4,4,4,S.red),t.set(2,1,6,S.pink).set(6,1,2,S.pink)))),t}const xt=s=>Math.round(s*10+52),nn=s=>Math.round(s*10+16),ji=[S.red,S.uniBlue,S.green,S.yellow,S.purple,S.cream,S.orange,S.navy],Is=(s,e)=>{let t=s*73856093^e*19349663;return t=(t^t>>>13)*1274126177,(t^t>>>16)>>>0};function Aa(s,e,t,n,i,r,o,a){s.box(e,n,r,t,i,o,S.woodDark);for(let l=n+1;l+5<=i;l+=6)if(a){s.box(e+1,l,o,t-1,l+4,o,0);for(let c=e+1;c<t;c++)s.box(c,l,o,c,l+2+Is(c,l)%3,o,ji[Is(c,l+7)%ji.length])}else{s.box(e,l,r+1,e,l+4,o-1,0);for(let c=r+1;c<o;c++)s.box(e,l,c,e,l+2+Is(c,l)%3,c,ji[Is(c,l+3)%ji.length])}}function Y_(s,e,t,n){s.box(e-2,t-3,n,e+2,t+3,n,S.chalk),s.box(e-3,t-2,n,e+3,t+2,n,S.chalk),s.box(e,t,n,e,t+2,n,S.black),s.box(e,t,n,e+2,t,n,S.red)}function j_(s){const e=new pt(104,34,112);e.box(0,0,0,103,0,111,S.floor);for(let n=0;n<104;n+=8)e.box(n,0,0,n,0,111,S.floorDark);e.box(0,1,0,103,33,0,S.wall),e.box(0,1,111,103,33,111,S.wall),e.box(103,1,0,103,33,111,S.wall),e.box(0,1,0,0,33,111,S.wall),e.box(1,1,1,102,1,1,S.wallTrim),e.box(102,1,1,102,7,110,S.wallTrim),e.box(1,1,1,1,7,110,S.wallTrim),e.box(0,1,0,103,7,0,S.wallTrim);for(const n of[.5,3.5,6.5]){const i=nn(n),r=nn(n+2.2);e.box(0,9,i,1,26,r,0),e.box(0,8,i-1,1,8,r+1,S.woodLight),e.box(0,27,i-1,0,27,r+1,S.woodLight),e.box(0,9,i-1,0,26,i-1,S.woodLight),e.box(0,9,r+1,0,26,r+1,S.woodLight),e.box(0,9,i+r>>1,0,26,i+r>>1,S.woodLight),e.box(0,18,i,0,18,r,S.woodLight)}if(e.box(xt(-3.6),1,1,xt(3.6),2,nn(.8),S.woodDark),e.box(xt(1.9),3,nn(-.2),xt(2.8),11,nn(.3),S.wood),e.box(xt(1.9)-1,12,nn(-.2)-1,xt(2.8)+1,12,nn(.3)+1,S.woodLight),e.box(102,1,nn(-.9),102,22,nn(.1),S.woodDark),e.set(101,11,nn(-.1),S.yellow),s==="library")Aa(e,xt(-4.4),xt(4.4),3,28,1,3,!0),Aa(e,100,102,1,26,nn(1.5),nn(8.5),!1),e.box(xt(-.9),29,1,xt(.9),33,1,S.chalk),gi(e,"SHH",xt(-.5),29,2,S.red);else{const n=xt(-3),i=xt(3);if(e.box(n,9,1,i,24,1,S.woodLight),e.box(n+1,10,1,i-1,23,1,S.board),e.box(n,8,1,i,8,2,S.woodLight),e.set(n+6,9,2,S.chalk).set(n+9,9,2,S.pink).set(i-8,9,2,S.yellow),s==="classroom"){gi(e,"E=MC2",n+4,17,1,S.chalk),gi(e,"1+1=?",n+4,11,1,S.chalk),gi(e,"X+Y=42",n+30,17,1,S.yellow),gi(e,"3.14",i-20,11,1,S.chalk);const r=n+36,o=13;e.box(r-2,o+1,1,r-2,o+2,1,S.pink),e.box(r+2,o+1,1,r+2,o+2,1,S.pink),e.box(r-2,o-2,1,r+2,o-2,1,S.pink),e.set(r-3,o-1,1,S.pink).set(r+3,o-1,1,S.pink)}else gi(e,"EXAM",n+14,12,1,S.chalk,2),gi(e,"9-0",i-16,18,1,S.yellow)}Y_(e,xt(0),29,1);const t=110;return e.box(xt(-3),9,t,xt(3),24,t,S.boardDark),e.box(xt(-2.6),17,t,xt(-1),22,t,S.red),e.box(xt(-.6),12,t,xt(.8),21,t,S.yellow),e.box(xt(1.2),14,t,xt(2.6),22,t,S.sky),s==="exam"&&(e.box(2,27,2,5,29,5,S.greyDark),e.box(4,26,5,5,27,6,S.black)),e}const K_=[52,1,16];function Z_(){const s=new pt(80,32,92);s.box(0,0,0,79,0,91,S.floorDark),s.box(14,0,14,65,0,80,S.red),s.box(16,0,16,63,0,78,S.meat),s.box(0,1,0,79,31,0,S.wall),s.box(0,1,91,79,31,91,S.wall),s.box(0,1,0,0,31,91,S.wall),s.box(79,1,0,79,31,91,S.wall),s.box(0,1,0,79,8,0,S.woodDark),s.box(0,1,0,0,8,91,S.woodDark),s.box(79,1,0,79,8,91,S.woodDark);for(const e of[20,54])s.box(0,10,e,1,26,e+20,0),s.box(0,9,e-1,0,9,e+21,S.woodLight),s.box(0,27,e-1,0,27,e+21,S.woodLight),s.box(0,10,e+10,0,26,e+10,S.woodLight);Aa(s,4,30,1,27,1,3,!0);for(const e of[38,48,58])s.box(e,16,1,e+7,24,1,S.yellow),s.box(e+1,17,1,e+6,23,1,S.cream),s.box(e+2,20,1,e+5,20,1,S.red);return s.box(66,1,2,74,12,6,S.woodDark),s.box(69,13,3,71,14,5,S.yellow),s.box(68,15,3,72,17,5,S.yellow),s.set(67,16,4,S.yellow).set(73,16,4,S.yellow),s.box(27,1,20,52,7,29,S.woodDark),s.box(26,8,19,53,8,30,S.wood),s.box(30,9,22,35,9,26,S.chalk),s.box(44,9,23,47,10,26,S.red),s.box(37,9,28,42,10,28,S.yellow),s.box(72,1,80,76,4,84,S.orange),s.box(73,5,81,75,12,83,S.leaf),s.box(71,9,80,77,11,85,S.green),s}const J_=[40,1,16];function Q_(){const s=new pt(16,9,9);s.box(0,7,0,15,7,8,S.woodLight);for(const[e,t]of[[0,0],[15,0],[0,8],[15,8]])s.box(e,0,t,e,6,t,S.wood);return s.box(1,8,2,6,8,6,S.greyDark),s.set(3,8,7,S.red),s}function ex(){const s=new pt(6,2,9);return s.box(0,0,0,5,0,5,S.black),s.box(0,1,0,5,1,0,S.black),s.box(0,1,5,5,1,5,S.black),s.box(0,1,0,0,1,5,S.black),s.box(5,1,0,5,1,5,S.black),s.box(2,1,6,3,1,8,S.wood),s}function tx(){const s=new pt(60,28,60);s.box(0,0,0,59,0,59,S.floor);for(let e=0;e<60;e+=6)s.box(e,0,0,e,0,59,S.floorDark);s.box(0,1,0,59,27,0,S.sky),s.box(0,1,0,0,27,59,S.cream),s.box(59,1,0,59,27,59,S.cream),s.box(18,0,22,42,0,44,S.uniBlue),s.box(20,0,24,40,0,42,S.chalk),s.box(2,1,4,16,3,30,S.woodDark),s.box(2,4,4,16,5,30,S.uniWhite),s.box(2,5,12,16,6,30,S.uniBlue),s.box(4,6,5,14,7,9,S.chalk),s.box(34,1,2,56,1,2,S.wood),s.box(34,7,1,56,7,9,S.woodLight);for(const[e,t]of[[34,1],[56,1],[34,9],[56,9]])s.box(e,1,t,e,6,t,S.wood);s.box(41,8,2,50,14,2,S.black),s.box(42,9,3,49,13,3,S.sky),s.box(45,8,3,46,8,4,S.greyDark),s.box(40,8,6,47,8,7,S.grey),s.box(53,8,3,54,12,4,S.yellow),s.box(52,13,2,55,14,5,S.orange),s.box(20,12,0,30,24,1,0),s.box(19,11,0,31,11,0,S.woodLight),s.box(19,25,0,31,25,0,S.woodLight),s.box(25,12,0,25,24,0,S.woodLight),s.box(59,1,30,59,20,40,S.woodDark),s.box(1,12,36,1,22,50,S.red),s.box(1,14,39,1,20,47,S.yellow),s.box(52,1,48,58,14,56,S.wood);for(let e=2;e<14;e+=4)for(let t=49;t<56;t++)s.box(52,e,t,52,e+2,t,ji[Is(t,e)%ji.length]);return s}const nx=[30,1,30];function Wc(){const s=new pt(34,22,40);s.box(0,0,0,33,0,39,S.leaf);const e=[[26,6],[27,18],[24,30],[18,12],[17,26],[28,37]];for(const[i,r]of e)s.box(i,1,r,i,4,r,S.woodDark),s.box(i-2,5,r-2,i+2,8,r+2,S.leaf),s.box(i-1,9,r-1,i+1,10,r+1,S.green),s.set(i-2,7,r,S.green).set(i+2,6,r+1,S.green);const t=(i,r,o,a,l,c)=>{s.box(i,1,r,i+o,a,r+l,c);for(let h=3;h<a;h+=3)for(let u=r+1;u<r+l;u+=2)s.set(i+o,h,u,S.glass)};t(2,2,6,16,8,S.cream),t(4,14,5,20,9,S.grey),t(1,27,7,13,10,S.wallTrim);const n=new ct(Wh(s,{scale:.4,origin:[34,2,6],jitterCell:1}),si);return n.position.set(-5.6,0,0),n}const ix={teacher:{head:[8,8,8],hair:S.hair,style:"side",torso:[6,6,4],shirt:S.uniWhite,vest:S.grey,sleeve:S.uniWhite,armH:6,legH:5,legW:3,pants:S.navy,shoe:S.black,glasses:!0,chalk:!0},director:{head:[8,8,8],hair:S.black,style:"neat",torso:[6,6,4],shirt:S.navy,tie:S.red,sleeve:S.navy,armH:6,legH:5,legW:3,pants:S.black,shoe:S.black},librarian:{head:[8,8,8],hair:S.hairBrown,style:"pony",torso:[6,6,4],shirt:S.cream,vest:S.purple,sleeve:S.purple,armH:6,legH:5,legW:3,pants:S.greyDark,shoe:S.black,glasses:!0},proctor:{head:[8,8,8],hair:S.greyDark,style:"short",torso:[6,6,4],shirt:S.cream,vest:S.leaf,sleeve:S.cream,armH:6,legH:5,legW:3,pants:S.greyDark,shoe:S.black},player:{head:[5,5,5],hair:S.hair,style:"short",torso:[6,5,3],shirt:S.uniWhite,collar:S.uniBlue,stripe:S.uniBlue,sleeve:S.uniBlue,armH:5,legH:4,legW:3,pants:S.navy,shoe:S.chalk}},Xc=["normal","squint","shock","drool","cry"];function br(s,e,t){const n=new ct(Ei(s,e,{origin:t}),si);return n.castShadow=!0,n.receiveShadow=!0,n}function qi(s){const e=ix[s],[t,n,i]=e.head,[r,o,a]=e.torso,l=new ot,c=new ot,h=new ot;l.add(c),c.add(h);const u=e.legH*vn;h.position.y=u,h.add(br(`${s}:torso`,()=>z_(r,o,a,e.shirt,{vest:e.vest,collar:e.collar,tie:e.tie,stripe:e.stripe}),[r/2,0,a/2]));const d=new ot;d.position.y=o*vn,h.add(d);const m=e.style==="pony"?2:0;d.add(br(`${s}:head`,()=>Xh(t,n,i,S.skin,e.hair,e.style),[t/2,0,m+i/2]));const g={};for(const M of Xc){const v=new ct(Ei(`${s}:face:${M}`,()=>B_(t,n,M,e.glasses),{origin:[t/2,0,0]}),si);v.position.z=i/2*vn+.002,v.scale.z=.25,v.visible=M==="normal",d.add(v),g[M]=v}const _=new ct(new Ht(.2,.2,.2),new Qi({color:14262899}));_.position.set(0,n*vn*.32,i/2*vn+.02),_.scale.setScalar(.5),d.add(_);const p=M=>{const v=new ot;return v.position.set(M*(r/2+1)*vn,o*vn-.05,0),v.add(br(`${s}:arm${M>0&&e.chalk?"c":""}`,()=>Vc(2,e.armH,2,e.sleeve,S.skin,1,M>0&&e.chalk?S.chalk:void 0),[1,e.armH+(M>0&&e.chalk?2:0),1])),h.add(v),v},f=M=>{const v=new ot;return v.position.set(M*(e.legW/2)*vn,u,0),v.add(br(`${s}:leg`,()=>Vc(e.legW,e.legH,3,e.pants,e.shoe),[e.legW/2,e.legH,1.5])),c.add(v),v};return{kind:s,root:l,proc:c,glb:null,glbHead:null,body:h,head:d,armL:p(-1),armR:p(1),legL:f(-1),legR:f(1),faces:g,nose:_,height:(e.legH+o+n)*vn,face:"normal",setFace(M){if(this.face!==M){this.face=M;for(const v of Xc)this.faces[v].visible=v===M}}}}function Mr(s,e,t){const n=Math.sin(e*9)*.7*t;s.legL.rotation.x=n,s.legR.rotation.x=-n,s.armL.rotation.x=-n*.8,s.armR.rotation.x=n*.8,s.body.position.y=s.legL.position.y+Math.abs(Math.sin(e*9))*.04*t,s.glb&&(s.glb.position.y=Math.abs(Math.sin(e*9))*.05*t)}function qc(s){s.legL.rotation.x=-Math.PI/2,s.legR.rotation.x=-Math.PI/2}function $c(s,e){if(e===od)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===ba||e===vh){let t=s.getIndex();if(t===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===ba)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class sx extends gs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new cx(t)}),this.register(function(t){return new hx(t)}),this.register(function(t){return new vx(t)}),this.register(function(t){return new yx(t)}),this.register(function(t){return new bx(t)}),this.register(function(t){return new dx(t)}),this.register(function(t){return new fx(t)}),this.register(function(t){return new px(t)}),this.register(function(t){return new mx(t)}),this.register(function(t){return new lx(t)}),this.register(function(t){return new gx(t)}),this.register(function(t){return new ux(t)}),this.register(function(t){return new xx(t)}),this.register(function(t){return new _x(t)}),this.register(function(t){return new ox(t)}),this.register(function(t){return new Mx(t)}),this.register(function(t){return new Sx(t)})}load(e,t,n,i){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=Os.extractUrlBase(e);o=Os.resolveURL(c,this.path)}else o=Os.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Gh(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===qh){try{o[ze.KHR_BINARY_GLTF]=new Tx(e)}catch(u){i&&i(u);return}r=JSON.parse(o[ze.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Fx(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case ze.KHR_MATERIALS_UNLIT:o[u]=new ax;break;case ze.KHR_DRACO_MESH_COMPRESSION:o[u]=new Ex(r,this.dracoLoader);break;case ze.KHR_TEXTURE_TRANSFORM:o[u]=new wx;break;case ze.KHR_MESH_QUANTIZATION:o[u]=new Ax;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function rx(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const ze={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class ox{constructor(e){this.parser=e,this.name=ze.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new Se(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Ot);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new wa(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new M_(h),c.distance=u;break;case"spot":c=new y_(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,On(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class ax{constructor(){this.name=ze.KHR_MATERIALS_UNLIT}getMaterialType(){return Yt}extendParams(e,t,n){const i=[];e.color=new Se(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Ot),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,At))}return Promise.all(i)}}class lx{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class cx{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ge(a,a)}return Promise.all(r)}}class hx{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class ux{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class dx{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Se(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Ot)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,At)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class fx{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class px{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Se().setRGB(a[0],a[1],a[2],Ot),Promise.all(r)}}class mx{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class gx{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Se().setRGB(a[0],a[1],a[2],Ot),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,At)),Promise.all(r)}}class _x{constructor(e){this.parser=e,this.name=ze.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class xx{constructor(e){this.parser=e,this.name=ze.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Tn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class vx{constructor(e){this.parser=e,this.name=ze.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class yx{constructor(e){this.parser=e,this.name=ze.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class bx{constructor(e){this.parser=e,this.name=ze.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Mx{constructor(e){this.name=ze.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(m){return m.buffer}):o.ready.then(function(){const m=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(m),h,u,d,i.mode,i.filter),m})})}else return null}}class Sx{constructor(e){this.name=ze.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==sn.TRIANGLES&&c.mode!==sn.TRIANGLE_STRIP&&c.mode!==sn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,m=[];for(const g of u){const _=new Pe,p=new L,f=new bn,E=new L(1,1,1),M=new Ti(g.geometry,g.material,d);for(let v=0;v<d;v++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&f.fromBufferAttribute(l.ROTATION,v),l.SCALE&&E.fromBufferAttribute(l.SCALE,v),M.setMatrixAt(v,_.compose(p,f,E));for(const v in l)if(v==="_COLOR_0"){const O=l[v];M.instanceColor=new Ta(O.array,O.itemSize,O.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&g.geometry.setAttribute(v,l[v]);mt.prototype.copy.call(M,g),this.parser.assignFinalMaterial(M),m.push(M)}return h.isGroup?(h.clear(),h.add(...m),h):m[0]}))}}const qh="glTF",As=12,Yc={JSON:1313821514,BIN:5130562};class Tx{constructor(e){this.name=ze.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,As),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==qh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-As,r=new DataView(e,As);let o=0;for(;o<i;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===Yc.JSON){const c=new Uint8Array(e,As+o,a);this.content=n.decode(c)}else if(l===Yc.BIN){const c=As+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Ex{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ze.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=Ra[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=Ra[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],m=es[d.componentType];c[u]=m.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(m){for(const g in m.attributes){const _=m.attributes[g],p=l[g];p!==void 0&&(_.normalized=p)}u(m)},a,c,Ot,d)})})}}class wx{constructor(){this.name=ze.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class Ax{constructor(){this.name=ze.KHR_MESH_QUANTIZATION}}class $h extends Xs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,m=d*u,g=e*c,_=g-c,p=-2*m+3*d,f=m-d,E=1-p,M=f-d+u;for(let v=0;v!==a;v++){const O=o[_+v+a],R=o[_+v+l]*h,A=o[g+v+a],P=o[g+v]*h;r[v]=E*O+M*R+p*A+f*P}return r}}const Rx=new bn;class Cx extends $h{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return Rx.fromArray(r).normalize().toArray(r),r}}const sn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},es={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},jc={9728:It,9729:$t,9984:ch,9985:wr,9986:Cs,9987:Bn},Kc={33071:ni,33648:Fr,10497:ss},Ro={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ra={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Jn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Px={CUBICSPLINE:void 0,LINEAR:Vs,STEP:Hs},Co={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Lx(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new el({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Vn})),s.DefaultMaterial}function _i(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function On(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Ix(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;a.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function Dx(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Ux(s){let e;const t=s.extensions&&s.extensions[ze.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Po(t.attributes):e=s.indices+":"+Po(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Po(s.targets[n]);return e}function Po(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Ca(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function kx(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Nx=new Pe;class Fx{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new rx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?this.textureLoader=new __(this.options.manager):this.textureLoader=new T_(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Gh(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return _i(r,a,i),On(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())r(h,a.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ze.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load(Os.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Ro[i.type],a=es[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Ft(c,o,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=Ro[i.type],c=es[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,m=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,p;if(m&&m!==u){const f=Math.floor(d/m),E="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+f+":"+i.count;let M=t.cache.get(E);M||(_=new c(a,f*m,i.count*m/h),M=new K0(_,m/h),t.cache.add(E,M)),p=new Za(M,l,d%m/h,g)}else a===null?_=new c(i.count*l):_=new c(a,d,i.count*l),p=new Ft(_,l,g);if(i.sparse!==void 0){const f=Ro.SCALAR,E=es[i.sparse.indices.componentType],M=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,O=new E(o[1],M,i.sparse.count*f),R=new c(o[2],v,i.sparse.count*l);a!==null&&(p=new Ft(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let A=0,P=O.length;A<P;A++){const T=O[A];if(p.setX(T,R[A*l]),l>=2&&p.setY(T,R[A*l+1]),l>=3&&p.setZ(T,R[A*l+2]),l>=4&&p.setW(T,R[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=g}return p})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const i=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[o.sampler]||{};return h.magFilter=jc[d.magFilter]||$t,h.minFilter=jc[d.minFilter]||Bn,h.wrapS=Kc[d.wrapS]||ss,h.wrapT=Kc[d.wrapT]||ss,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==It&&h.minFilter!==$t,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,m){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const p=new wt(_);p.needsUpdate=!0,d(p)}),t.load(Os.resolveURL(u,r.path),g,void 0,m)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),On(u,o),u.userData.mimeType=o.mimeType||kx(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[ze.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[ze.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[ze.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new zh,_n.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Bh,_n.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return el}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[ze.KHR_MATERIALS_UNLIT]){const u=i[ze.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{const u=r.pbrMetallicRoughness||{};if(a.color=new Se(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Ot),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,At)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=dn);const h=r.alphaMode||Co.OPAQUE;if(h===Co.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===Co.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Yt&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Ge(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==Yt&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Yt){const u=r.emissiveFactor;a.emissive=new Se().setRGB(u[0],u[1],u[2],Ot)}return r.emissiveTexture!==void 0&&o!==Yt&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,At)),Promise.all(c).then(function(){const u=new o(a);return r.name&&(u.name=r.name),On(u,r),t.associations.set(u,{materials:e}),r.extensions&&_i(i,u,r),u})}createUniqueName(e){const t=st.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[ze.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Zc(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=Ux(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[ze.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Zc(new Zt,c,t),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?Lx(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let m=0,g=h.length;m<g;m++){const _=h[m],p=o[m];let f;const E=c[m];if(p.mode===sn.TRIANGLES||p.mode===sn.TRIANGLE_STRIP||p.mode===sn.TRIANGLE_FAN||p.mode===void 0)f=r.isSkinnedMesh===!0?new J0(_,E):new ct(_,E),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),p.mode===sn.TRIANGLE_STRIP?f.geometry=$c(f.geometry,vh):p.mode===sn.TRIANGLE_FAN&&(f.geometry=$c(f.geometry,ba));else if(p.mode===sn.LINES)f=new t_(_,E);else if(p.mode===sn.LINE_STRIP)f=new Qa(_,E);else if(p.mode===sn.LINE_LOOP)f=new n_(_,E);else if(p.mode===sn.POINTS)f=new i_(_,E);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(f.geometry.morphAttributes).length>0&&Dx(f,r),f.name=t.createUniqueName(r.name||"mesh_"+e),On(f,r),p.extensions&&_i(i,f,p),t.assignFinalMaterial(f),u.push(f)}for(let m=0,g=u.length;m<g;m++)t.associations.set(u[m],{meshes:e,primitives:m});if(u.length===1)return r.extensions&&_i(i,u[0],r),u[0];const d=new ot;r.extensions&&_i(i,d,r),t.associations.set(d,{meshes:e});for(let m=0,g=u.length;m<g;m++)d.add(u[m]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Nt(Ud.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ya(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),On(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new Pe;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Ja(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const m=i.channels[u],g=i.samplers[m.sampler],_=m.target,p=_.node,f=i.parameters!==void 0?i.parameters[g.input]:g.input,E=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",p)),a.push(this.getDependency("accessor",f)),l.push(this.getDependency("accessor",E)),c.push(g),h.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],m=u[1],g=u[2],_=u[3],p=u[4],f=[];for(let E=0,M=d.length;E<M;E++){const v=d[E],O=m[E],R=g[E],A=_[E],P=p[E];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const T=n._createAnimationTracks(v,O,R,A,P);if(T)for(let y=0;y<T.length;y++)f.push(T[y])}return new h_(r,void 0,f)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(m){m.isSkinnedMesh&&m.bind(d,Nx)});for(let m=0,g=u.length;m<g;m++)h.add(u[m]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new Fh:c.length>1?h=new ot:c.length===1?h=c[0]:h=new mt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),On(h,r),r.extensions&&_i(n,h,r),r.matrix!==void 0){const u=new Pe;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new ot;n.name&&(r.name=i.createUniqueName(n.name)),On(r,n),n.extensions&&_i(t,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,m]of i.associations)(d instanceof _n||d instanceof wt)&&u.set(d,m);return h.traverse(d=>{const m=i.associations.get(d);m!=null&&u.set(d,m)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const o=[],a=e.name?e.name:e.uuid,l=[];Jn[r.path]===Jn.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(Jn[r.path]){case Jn.weights:c=cs;break;case Jn.rotation:c=hs;break;case Jn.position:case Jn.scale:c=us;break;default:switch(n.itemSize){case 1:c=cs;break;case 2:case 3:default:c=us;break}break}const h=i.interpolation!==void 0?Px[i.interpolation]:Vs,u=this._getArrayFromAccessor(n);for(let d=0,m=l.length;d<m;d++){const g=new c(l[d]+"."+Jn[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Ca(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof hs?Cx:$h;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Ox(s,e,t){const n=e.attributes,i=new Mn;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new L(l[0],l[1],l[2]),new L(c[0],c[1],c[2])),a.normalized){const h=Ca(es[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new L,l=new L;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],m=d.min,g=d.max;if(m!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(m[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(m[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(m[2]),Math.abs(g[2]))),d.normalized){const _=Ca(es[d.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new Sn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function Zc(s,e,t){const n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(const o in n){const a=Ra[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){const o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return Ve.workingColorSpace!==Ot&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ve.workingColorSpace}" not supported.`),On(s,e),Ox(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Ix(s,e.targets,t):s})}const Bx=["teacher","director","student_player","student_npc","desk","food_latiao","food_chips","food_noodles","food_hotpot","food_lamb","blackboard"],rl=new Map,zx=[];function Rs(){return rl.size}async function Hx(){try{const s=await fetch("./models/manifest.json",{cache:"no-store"}),e=s.ok?await s.json():[],t=new sx;await Promise.all(Bx.filter(n=>e.includes(`${n}.glb`)).map(async n=>{try{const i=await t.loadAsync(`./models/${n}.glb`);rl.set(n,i.scene)}catch{}}))}catch{}zx.forEach(s=>s())}const Jc=new Map;function Vx(s){s.traverse(e=>{const t=e;if(!t.isMesh)return;t.castShadow=!0,t.receiveShadow=!0;const n=i=>{let r=Jc.get(i);if(!r){const o=i;r=new Qi({color:o.color??16777215,map:o.map??null,vertexColors:!!t.geometry.getAttribute("color")}),o.map&&(o.map.magFilter=It),Jc.set(i,r)}return r};t.material=Array.isArray(t.material)?t.material.map(n):n(t.material)})}function Dr(s,e,t=0){const n=rl.get(s);if(!n)return null;const i=n.clone(!0);Vx(i);const r=new Mn().setFromObject(i),o=r.getSize(new L),a=r.getCenter(new L),l=o.y>1e-6?e/o.y:1;i.position.set(-a.x,-r.min.y,-a.z);const c=new ot;c.add(i),c.scale.setScalar(l),c.rotation.y=t;const h=new ot;return h.add(c),h.name=`glb:${s}`,h}function Gx(s){let e=null;return s.traverse(t=>{!e&&/head|头/i.test(t.name)&&(e=t)}),e}function Qc(s,e,t,n=0){const i=Dr(s,e,n);if(!i)return null;i.updateMatrixWorld(!0);const r=new ot,o=new Pe;return i.traverse(a=>{const l=a;if(!l.isMesh)return;const c=new Ti(l.geometry,l.material,t.length);t.forEach((h,u)=>c.setMatrixAt(u,o.multiplyMatrices(h,l.matrixWorld))),c.castShadow=!0,c.receiveShadow=!0,c.frustumCulled=!1,r.add(c)}),r}const Lo=.4,Wx=.7,Sr=new Pe,Io=new bn,eh=new L,xi=new L,Xx=new Kt,Qn=new L;function qx(s){const e=s*Math.PI/180,t=16,n=[0,0,0],i=[];for(let o=0;o<=t;o++){const a=-e+2*e*o/t;n.push(Math.sin(a),0,Math.cos(a))}for(let o=1;o<=t;o++)i.push(0,o,o+1);const r=new Zt;return r.setAttribute("position",new jt(n,3)),r.setIndex(i),r}const $x={};function Yx(){const s=new ct(new Zt,new Yt({color:16732224,transparent:!0,opacity:.14,depthWrite:!1,side:dn}));return s.visible=!1,s.renderOrder=2,s}function Tr(s,e,t,n,i,r,o,a,l){if(s.visible=e,!e)return;s.geometry=$x[o]??=qx(o),s.position.set(t,n+.76,i),s.rotation.y=r,s.scale.set(a,1,a);const c=s.material;c.color.set(l?16724e3:16756784),c.opacity=l?.24:.1}function jx(){const s=ei("bang",()=>new pt(2,8,2).box(0,3,0,1,7,1,S.red).box(0,0,0,1,1,1,S.red));return s.castShadow=!1,s.visible=!1,s}class Kx{renderer;scene=new j0;camera=new Nt(50,1,.1,80);particles=new U_;root=new ot;kind="";reduceMotion=!1;tripo=!0;t=0;frameMs=16.7;slow=0;fast=0;pixelRatio=1;frame=0;sun;teacher;extras=[];player;director;cones=[];bangs=[];foodHolder=new ot;foodMeshes=new Map;curFood="";book;chalk;warn;camLight=null;fans=[];npcBody=null;npcHeads=[];npcList=[];slotPairs=[];camBase=new L;camLook=new L;baseFov=50;squash=0;turnT=0;noseT=0;drool=!1;bangT=[0,0];bangPos=[new L,new L];closeT=0;pushT=0;smellT=0;smellColor=Nn(S.red);podiumOff=.8;shameIdx=-1;shameT=0;dish=null;dishKey="";sysPanel=null;pan=null;bow=0;hands=new ot;wrists=[];sleeves=[];morsel=new ot;foodReach=0;foodScale=.43;gripWidth=.125;flatPacket=!0;teacherHead=new L;constructor(e){this.renderer=new Y0({canvas:e,antialias:!0,powerPreference:"high-performance"}),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Na,this.renderer.shadowMap.autoUpdate=!1,this.pixelRatio=Math.min(2,window.devicePixelRatio||1),this.scene.background=new Se(12575733),this.scene.fog=new Ka(15326400,10,30),this.scene.add(new x_(16773596,10126440,1.5)),this.sun=new wa(16768154,2.6),this.sun.position.set(-11,8.5,2.5),this.sun.target.position.set(0,0,4.5),this.sun.castShadow=!0;const t=this.sun.shadow.camera;t.left=-9,t.right=9,t.top=9,t.bottom=-9,t.near=1,t.far=34,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=.03,this.scene.add(this.sun,this.sun.target);const n=new wa(14674687,.55);n.position.set(5,6,10),this.scene.add(n),this.scene.add(this.root,this.particles.mesh),this.resize()}resize(){const e=window.innerWidth,t=window.innerHeight;this.renderer.setPixelRatio(this.pixelRatio),this.renderer.setSize(e,t,!1);const n=e/t;this.camera.aspect=n;const i=2*Math.atan(Math.tan(this.baseFov*Math.PI/360)*1.6);this.camera.fov=n>=1.6?this.baseFov:Mt(2*Math.atan(Math.tan(i/2)/n)*180/Math.PI,this.baseFov,92),this.camera.updateProjectionMatrix()}perfTick(e){this.frameMs+=(e-this.frameMs)*.05,e>22?this.slow++:this.slow=Math.max(0,this.slow-1),e<14?this.fast++:this.fast=0,this.slow>45&&this.pixelRatio>.75&&(this.pixelRatio=Math.max(.75,this.pixelRatio-.25),this.slow=0,this.resize())}screenPos(e){return Qn.copy(e).project(this.camera),{x:(Qn.x*.5+.5)*window.innerWidth,y:(-Qn.y*.5+.5)*window.innerHeight,visible:Qn.z<1&&Math.abs(Qn.x)<1.1&&Math.abs(Qn.y)<1.1}}setScene(e,t){this.root.traverse(n=>{n.isInstancedMesh&&n.dispose()}),this.root.clear(),this.particles.clear(),this.kind=e,this.extras=[],this.cones=[],this.bangs=[],this.fans=[],this.slotPairs=[],this.foodMeshes.clear(),this.curFood="",this.npcBody=null,this.npcHeads=[],this.npcList=[],this.camLight=null,this.dish=null,this.dishKey="",this.sysPanel=null,this.pan=null,this.closeT=0,this.pushT=0,this.shameT=0,this.turnT=0,this.noseT=0,e==="bedroom"?this.buildBedroom():e==="office"?this.buildOffice():this.buildClass(e,t);for(let n=0;n<3;n++){const i=Yx();this.cones.push(i),this.root.add(i)}for(let n=0;n<2;n++){const i=jx();this.bangs.push(i),this.root.add(i)}this.applyModels(),this.renderer.shadowMap.needsUpdate=!0}room(e,t,n){const i=ei(`room:${e}`,t,{origin:n,jitterCell:2});return this.root.add(i),i}buildClass(e,t){this.room(e,()=>j_(e),K_);const n=new ct(new Ht(10.6,.2,11.4),new Qi({color:15721416}));n.position.set(0,3.4,4),n.castShadow=!0,this.root.add(n,Wc());const i=[];for(let _=0;_<wi;_++)for(let p=0;p<ri;p++)i.push(new Pe().makeTranslation(qt(p),0,zt(_)));const r=new Ti(Ei(`desk:${e==="exam"?0:1}`,()=>V_(e!=="exam"),{origin:G_}),si,i.length);i.forEach((_,p)=>r.setMatrixAt(p,_)),r.castShadow=r.receiveShadow=!0,r.frustumCulled=!1,this.root.add(r);const o=Qc("desk",1,i.map(_=>_.clone().multiply(Sr.makeTranslation(0,0,-.35))),Math.PI);o&&(this.root.add(o),this.slotPairs.push({proc:r,glb:o}));const a=t.npcs.length;this.npcBody=new Ti(Ei("npc:body",H_,{origin:[5,1,7.5]}),si,a),this.npcBody.castShadow=!0,this.npcBody.frustumCulled=!1;const l=t.npcs.filter(_=>!_.girl).length;this.npcHeads=[new Ti(Ei("npc:head0",()=>Gc(!1),{origin:[2.5,0,2.5]}),si,Math.max(1,l)),new Ti(Ei("npc:head1",()=>Gc(!0),{origin:[2.5,0,4.5]}),si,Math.max(1,a-l))];const c=[0,0],h=new Se,u=[];t.npcs.forEach((_,p)=>{const f=_.girl?1:0;this.npcList.push({i:p,h:f,hi:c[f]++});const E=new Pe().makeTranslation(qt(_.col),Lo,zt(_.row));u.push(new Pe().makeTranslation(qt(_.col),0,zt(_.row))),this.npcBody.setMatrixAt(p,E),this.npcBody.setColorAt(p,h.setScalar(_.tint))});const d=new ot;d.add(this.npcBody,...this.npcHeads),this.npcHeads.forEach(_=>{_.castShadow=!0,_.frustumCulled=!1}),this.root.add(d);const m=Qc("student_npc",1.5,u,Math.PI);m&&(this.root.add(m),this.slotPairs.push({proc:d,glb:m})),this.player=qi("player"),qc(this.player),this.player.root.position.set(je,0,He),this.player.root.rotation.y=Math.PI,this.root.add(this.player.root),this.attachGlb(this.player,"student_player",1.5),this.book=ei("book",W_,{origin:[3.5,0,1]}),this.root.add(this.book),this.book.visible=e!=="exam",this.foodHolder=new ot,this.root.add(this.foodHolder),this.foodHolder.position.set(je,.41,He-.73),this.foodHolder.scale.setScalar(.48),this.bow=0,this.foodReach=0,this.buildHands(),this.teacher=qi(e==="library"?"librarian":e==="exam"?"proctor":"teacher"),this.root.add(this.teacher.root),this.attachGlb(this.teacher,"teacher",1.9);for(const _ of t.extras){const p=qi(_.kind==="librarian"?"proctor":"teacher");this.extras.push(p),this.root.add(p.root)}const g=Dr("blackboard",1.9,0);g&&e!=="library"&&(g.position.set(0,.75,-1.38),this.root.add(g),this.slotPairs.push({proc:new ot,glb:g})),this.chalk=new ct(new Ht(.1,.1,.2),new Yt({color:16777215})),this.chalk.visible=!1,this.warn=new ct(new Ht(.12,.02,1),new Yt({color:16722458,transparent:!0,opacity:.8,depthTest:!1})),this.warn.visible=!1,this.warn.renderOrder=5,this.root.add(this.chalk,this.warn);for(const _ of[2.5,6.5]){const p=ei("fan",()=>new pt(21,2,21).box(0,0,9,20,0,11,S.wood).box(9,0,0,11,0,20,S.wood).box(9,0,9,11,1,11,S.greyDark),{origin:[10.5,0,10.5]});p.position.set(0,3,_),p.castShadow=!1,this.fans.push(p),this.root.add(p)}t.cam&&(this.camLight=new ct(new Ht(.12,.12,.12),new Yt({color:5574929})),this.camLight.position.set(-4.6,2.65,-1),this.root.add(this.camLight)),this.baseFov=68,this.camera.near=.025,this.camBase.set(je+.12,1.78,He+.12),this.camLook.set(je+1.35,1.36,He-5),this.fogFor(15326400,10,30),this.resize()}buildHands(){this.hands=new ot,this.wrists=[],this.sleeves=[];const e=(n,i,r,o)=>{const a=new ct(new Ht(n,i,r),new Qi({color:o}));return a.castShadow=!0,a.receiveShadow=!0,a};for(const n of[-1,1]){const i=new ot;i.add(e(.105,.075,.12,Nn(S.skin)));const r=e(.12,.085,.065,Nn(S.uniWhite));r.position.z=.075,i.add(r);const o=e(.045,.055,.075,Nn(S.skinDark));o.position.set(-n*.055,.025,-.02),i.add(o);for(let c=0;c<3;c++){const h=e(.029,.04,.047,Nn(S.skin));h.position.set((c-1)*.033,.006,-.07),i.add(h)}const a=e(.115,.115,1,Nn(S.uniBlue));this.hands.add(i,a),this.wrists.push(i),this.sleeves.push(a);const l=e(.23,.15,.42,Nn(S.navy));l.position.set(je+n*.16,.37,He-.03),this.hands.add(l)}this.morsel=new ot;const t=e(.035,.09,.025,Nn(S.orange));this.morsel.add(t),this.hands.add(this.morsel),this.root.add(this.hands)}poseHands(e,t,n){const i=this.foodHolder,r=e&&this.foodReach>.85?Math.pow(Math.sin(Math.PI*Mt((n-.15)/.85,0,1)),2):0;for(let o=0;o<2;o++){const a=o===0?-1:1,l=this.wrists[o],c=t?1-this.foodReach:0;l.position.set(i.position.x+a*this.gripWidth,i.position.y+.085,i.position.z+.055),o===1&&(l.position.y+=r*.23,l.position.z+=r*.23,l.position.x-=r*.09),l.position.lerp(xi.set(je+a*.27,.48,He-.13),c),l.rotation.set(-.15-r*(o===1?.65:0),0,a*.12);const h=Qn.set(je+a*.34,.49,He+.21),u=xi.set(l.position.x,l.position.y,l.position.z+.1),d=this.sleeves[o];d.position.copy(h).lerp(u,.5),d.scale.z=h.distanceTo(u),d.lookAt(u)}this.morsel.visible=e&&r>.08&&this.foodReach>.85,this.morsel.position.copy(this.wrists[1].position).add(xi.set(-.025,.06,-.07))}buildOffice(){this.room("office",Z_,J_);const e=new ct(new Ht(8.2,.2,9.4),new Qi({color:15721416}));e.position.set(0,3.2,3),e.castShadow=!0;const t=Wc();t.position.x=-4.4,this.root.add(e,t);const n=ei("cooktable",Q_,{origin:[8,0,4.5]});n.position.set(0,0,4),this.root.add(n),this.pan=ei("pan",ex,{origin:[3,0,3]}),this.pan.position.set(-.45,.9,4),this.root.add(this.pan),this.player=qi("player"),this.player.root.position.set(0,0,4.75),this.player.root.rotation.y=Math.PI,this.root.add(this.player.root),this.attachGlb(this.player,"student_player",1.5),this.director=qi("director"),this.director.root.position.set(0,0,.1),this.root.add(this.director.root),this.attachGlb(this.director,"director",1.9),this.teacher=this.director,this.baseFov=52,this.camBase.set(1.25,2.25,6.9),this.camLook.set(-.1,.95,1.6),this.fogFor(15326400,12,30),this.resize()}buildBedroom(){this.room("bedroom",tx,nx),this.player=qi("player"),this.player.root.position.set(.2,0,.6),this.player.root.rotation.y=.5,this.root.add(this.player.root),this.teacher=this.player,this.sysPanel=new ct(new Ht(1.1,.7,.04),new Yt({color:5227519,transparent:!0,opacity:.45})),this.sysPanel.position.set(1.2,1.6,.2),this.sysPanel.rotation.y=-.5,this.root.add(this.sysPanel),this.baseFov=48,this.camBase.set(1.6,2.5,4.9),this.camLook.set(0,.9,-.4),this.fogFor(14674674,12,30),this.resize()}fogFor(e,t,n){const i=this.scene.fog;i.color.set(e),i.near=t,i.far=n}attachGlb(e,t,n){const i=Dr(t,n,0);i&&(e.glb=i,e.glbHead=Gx(i),e.root.add(i),this.slotPairs.push({proc:e.proc,glb:i}))}applyModels(){for(const e of this.slotPairs)e.glb.visible=this.tripo,e.proc.visible=!this.tripo}setTripo(e){this.tripo=e,this.applyModels()}rebuildSlots(e){if(this.kind){const t=this.kind;this.setScene(t,e)}}foodMesh(e){let t=this.foodMeshes.get(e);if(!t){const n=new ot,i=ei(`food:${e}`,X_[e]);n.add(i);const r=Dr(`food_${e}`,i.geometry.boundingBox.max.y-i.geometry.boundingBox.min.y,0);r&&(n.add(r),r.visible=this.tripo,i.visible=!this.tripo,this.slotPairs.push({proc:i,glb:r})),t=n,this.foodMeshes.set(e,t),this.foodHolder.add(t)}return t}onLessonEvent(e,t){const n=this.particles,i=je,r=He-.3;switch(e.type){case"bite":this.squash=.28,this.smellColor=Nn(S[nh[e.food].color]);for(let o=0;o<2;o++)n.spawn({x:i,y:1.2,z:r,vx:Math.random()-.5,vy:1,vz:-.5,g:6,life:.6,size:.05,color:this.smellColor});break;case"prep":e.key==="fire"&&n.burst(6,{x:je,y:.9,z:He-.75,color:16742938,size:.08,life:.6,g:-1},1);break;case"serving":n.burst(8,{x:je,y:1.1,z:He-.6,color:16767050,size:.07,life:.8,g:4},2.5);break;case"perfect":n.burst(6,{x:je,y:1.5,z:He,color:7331962,size:.07,life:.7,g:2},2);break;case"chalkBlock":n.burst(12,{x:je,y:1.1,z:He-.9,color:16777215,size:.06,life:.7,g:3},2.5);break;case"chalkHit":n.burst(12,{x:je,y:1.4,z:He-.2,color:16777215,size:.06,life:.8,g:3},2.5);break;case"classmateTurn":this.turnT=1.6;break;case"sniff":this.noseT=oe.teacher.sniff,this.drool=!!e.drool;break;case"npcCaught":case"frame":{this.bangT[1]=2.4,this.bangPos[1].set(qt(e.col),2,zt(e.row)),this.shameIdx=t.npcs.findIndex(o=>o.col===e.col&&o.row===e.row),this.shameT=3;break}case"caught":if(this.bangT[0]=1.2,this.closeT=oe.caughtFreeze,this.pushT=.3,!this.reduceMotion)for(const o of[13145679,11039802,15922423,4157380,this.smellColor])n.burst(7,{x:je,y:.9,z:He-.5,color:o,size:.1,life:1.2,g:7},4);break;case"item":if(e.id==="decoy"&&n.spawn({x:je,y:1.3,z:He,vx:5,vy:2.5,vz:-1,g:5,life:1.3,size:.12,color:16777215}),e.id==="fan")for(let o=0;o<6;o++)n.spawn({x:je,y:1+o*.05,z:He-.3,vx:1.6,vy:.2,life:.9,size:.09,color:this.smellColor,spread:.2});if(e.id==="playdead")for(let o=0;o<3;o++)n.spawn({x:je+.2,y:1.5,z:He,vx:.2,vy:.4+o*.15,life:1.6+o*.4,size:.07+o*.02,color:16777215});break}}shatter(e,t,n){if(!this.reduceMotion)for(const i of[16174908,14169386,15922423,6270538])this.particles.burst(10,{x:e,y:t,z:n,color:i,size:.11,life:1.3,g:6},4.5)}syncLesson(e,t,n=!1){this.t+=t;const i=this.t,r=e.teacher,o=this.teacher,a=r.onPodium;this.podiumOff+=((a?.8:0)-this.podiumOff)*Math.min(1,t*4);const l=r.z-this.podiumOff,c=l<.85&&Math.abs(r.x)<3.6?.2:0;o.root.visible=!0,o.root.position.set(r.x,c,l),o.root.rotation.y=r.yaw,this.resetPose(o);const h=r.state==="patrol"&&r.pauseT<=0?1:0;Mr(o,i,h);let u=0,d=e.alert?"squint":"normal";if(r.state==="write")o.armR.rotation.x=-2.5+Math.sin(i*13)*.18,o.armR.rotation.z=Math.sin(i*5)*.2;else if(r.state==="turning")u=Mt(-r.yaw*.5,-1,1);else if(r.state==="looking")u=Math.sin(r.t*2.2)*.3;else if(r.state==="patrolPrep"){o.armL.rotation.x=o.armR.rotation.x=-1.3;const D=Math.abs(Math.sin(r.t*8))*.5;o.armL.rotation.z=-D+.5,o.armR.rotation.z=D-.5}else r.state==="rollPrep"||r.state==="rollcall"?(o.armL.rotation.x=-1.3,o.head.rotation.x=r.callingYou?0:.3,r.callingYou&&(d="squint")):r.state==="chalkAim"&&(o.armR.rotation.x=-3-r.t/r.dur*.6,d="squint");if(r.state==="sniff"||this.noseT>0?(this.noseT-=t,o.body.rotation.x=.3,d=this.drool?"drool":"squint",o.nose.scale.setScalar(.5+(.9+Math.sin(i*16)*.35)*Mt(this.noseT*3,0,1))):o.nose.scale.setScalar(.5),this.closeT>0&&(d="shock"),o.head.rotation.y=u,o.glbHead&&(o.glbHead.rotation.y=u),o.setFace(d),this.teacherHead.set(r.x,c+o.height+.35,l),Tr(this.cones[0],!n&&r.visionOn&&e.distractT<=0,r.x,(r.onPodium,0),r.z,r.visionYaw,r.visionHalf,oe.vision.range,e.seen&&e.foodState!=="hidden"),e.extras.forEach((D,ee)=>{const ne=this.extras[ee];ne.root.visible=!0,ne.root.position.set(D.x,0,D.z),ne.root.rotation.y=D.yaw,this.resetPose(ne),Mr(ne,i+ee,D.sniffing?0:1),D.sniffing?(ne.body.rotation.x=.3,ne.nose.scale.setScalar(1.3+Math.sin(i*16)*.35),ne.setFace(e.scene==="classroom"?"squint":"drool")):(ne.nose.scale.setScalar(.5),ne.setFace("normal")),Tr(this.cones[1+ee],!n&&D.sees&&e.distractT<=0,D.x,0,D.z,D.yaw,oe.vision.patrolHalf,oe.vision.proctorRange,e.seen)}),e.cam&&this.camLight){this.camLight.visible=!n;const D=e.cam.phase;this.camLight.material.color.set(D==="on"||D==="warn"&&Math.floor(i*8)%2?16719904:5574929),Tr(this.cones[2],!n&&D==="on",e.cam.x,0,e.cam.z,e.cam.yaw,30,12,e.foodState!=="hidden")}const m=this.player;this.resetPose(m),qc(m),m.root.visible=!1;const g=e.foodState,_=g==="eating",p=e.sleepT>0?-1.2:_?-2.35+Math.sin(i*16)*.12:g==="desk"?-1.35:-.75;m.armL.rotation.x=m.armR.rotation.x=p,m.armL.rotation.z=_?-.25:0,m.armR.rotation.z=_?.25:0,e.bookUp&&(m.armL.rotation.x=-1.6),this.squash=Math.max(0,this.squash-t);const f=Math.sin(this.squash/.28*Math.PI),E=_?Math.abs(Math.sin(i*15))*.06:e.mouthT>0?Math.abs(Math.sin(i*15))*.03:0;if(m.head.scale.set(1+f*.18,1-f*.3-E,1+f*.18),m.head.rotation.x=e.sleepT>0?-.9:_?-.15:0,m.head.rotation.z=e.stunT>0?Math.sin(i*20)*.3:0,m.glb&&m.glb.scale.set(1+f*.1,1-f*.15-E,1+f*.1),e.food&&e.food.def.id!==this.curFood){this.curFood=e.food.def.id;for(const[ne,re]of this.foodMeshes)re.visible=ne===this.curFood;const D=this.foodMesh(this.curFood);D.visible=!0;const ee=D.children[0].geometry.boundingBox.getSize(new L);this.flatPacket=this.curFood==="latiao"||this.curFood==="chips",this.foodScale=Math.min(.48,.3/ee.x,(this.flatPacket?.3:.18)/ee.y,.27/ee.z),this.gripWidth=ee.x*this.foodScale/2+.025}const M=this.foodHolder;M.visible=e.phase!=="over"&&!!e.food;const v=e.stowT>0||g==="hidden",O=v?0:1,R=v?4:2.8;this.foodReach+=Mt(O-this.foodReach,-t*R,t*R);const A=this.foodReach*this.foodReach*(3-2*this.foodReach),P=Math.min(1,A*2),T=Mt((A-.5)*2,0,1),y=g==="desk"&&!v&&!n,C=this.flatPacket?.455:.405,W=this.flatPacket?-.55:-.7,V=y?.71:C+T*(.54-C),Y=y?He-.7:He+W+P*(-.21-W),j=1-Math.exp(-t*20);if(y?M.position.lerp(xi.set(je-.035,V,Y),j):M.position.set(je-.035,V,Y),M.scale.setScalar(this.foodScale),M.rotation.set(this.flatPacket?-Math.PI/2*(1-T):0,0,this.flatPacket?-.09*A:0),this.poseHands(_&&!e.prepping,v,e.biteProg),this.book.visible){const D=e.bookUp?1:0,ee=this.book;ee.scale.setScalar(.6),ee.rotation.x+=((D?0:Math.PI/2)-ee.rotation.x)*Math.min(1,t*20),ee.position.set(je-(1-D)*.2,Wx+ee.rotation.x/(Math.PI/2)*.06,He-.9)}if(e.smoking&&Math.random()<t*5&&this.particles.spawn({x:je,y:.9,z:He-.7,vy:.6,life:1.6,size:.1,grow:.16,color:14277081,spread:.15}),this.smellT-=t,this.smellT<=0){this.smellT=.11;const D=e.smell,ee=D.total();if(ee>.05){let ne=Math.random()*ee,re=0;for(;re<D.c.length-1&&(ne-=D.c[re],!(ne<=0));re++);const Ee=D.c[re];Ee>.03&&this.particles.spawn({x:qt(re%ri),y:1.1,z:zt(re/ri|0)-.3,vy:.3+Ee*.2,life:1.5,size:.05+Math.min(.14,Ee*.12),color:this.smellColor,spread:.35})}}const q=r.state==="chalkAim";if(this.warn.visible=!n&&(q||!!e.chalk),this.warn.material.opacity=.55+Math.sin(i*30)*.35,this.warn.visible){const D=je-r.x,ee=He-l,ne=Math.hypot(D,ee);this.warn.position.set(r.x+D/2,1.25,l+ee/2),this.warn.rotation.y=Math.atan2(D,ee),this.warn.scale.z=ne}if(this.chalk.visible=!!e.chalk,e.chalk){const D=e.chalk.t/e.chalk.dur;this.chalk.position.set(e.chalk.from.x+(je-e.chalk.from.x)*D,1.7+(1.2-1.7)*D+Math.sin(D*Math.PI)*.7,e.chalk.from.z-.8+(He-.3-e.chalk.from.z+.8)*D),this.chalk.rotation.x=D*14}if(this.syncNpcs(e,t),this.syncBangs(t,e),n)for(const D of this.bangs)D.visible=!1;for(const D of this.fans)D.rotation.y+=t*2.2;this.closeT=Math.max(0,this.closeT-t),this.pushT=Math.max(0,this.pushT-t),this.bow+=Mt((n?1:0)-this.bow,-t*3.6,t*3.6);const J=this.bow*this.bow*(3-2*this.bow);if(this.hands.visible=this.closeT<=0,this.closeT>0&&!this.reduceMotion){const D=Qn.set(Math.sin(r.yaw),0,Math.cos(r.yaw));this.camera.position.set(r.x+D.x*1.7,c+1.75,l+D.z*1.7),this.camera.lookAt(r.x,c+1.5,l)}else{this.camera.position.copy(this.camBase).lerp(xi.set(je+.015,1.1,He+.22),J);const D=.245*(1-J),ee=.1+J*.9;this.camera.rotation.set(-ee,-D,0,"YXZ")}this.renderer.shadowMap.needsUpdate=h>0||this.frame%4===0}resetPose(e){for(const t of[e.armL,e.armR,e.legL,e.legR,e.head,e.body])t.rotation.set(0,0,0);e.head.scale.set(1,1,1)}idleCam(e,t){const n=this.reduceMotion?0:1;this.camera.position.set(this.camBase.x+Math.sin(e*.7)*.015*n,this.camBase.y+Math.sin(e*1.1)*.012*n*(1+t),this.camBase.z),this.camera.lookAt(this.camLook)}syncNpcs(e,t){if(!this.npcBody)return;const n=this.t;this.turnT=Math.max(0,this.turnT-t),this.shameT=Math.max(0,this.shameT-t);const i=Mt(Math.min(this.turnT,1.6-this.turnT)*5,0,1);for(const r of this.npcList){const o=e.npcs[r.i];let a=0,l=0,c=0,h=1;o.anim==="doze"?a=-.45-Math.sin(n*1.3+o.phase)*.18:o.anim==="note"?l=Math.sin(n*.6+o.phase)>.6?.7:0:o.anim==="pen"?(a=-.12,l=Math.sin(n*2+o.phase)*.08):c=Math.sin(n*1.5+o.phase)*.008,i>0&&o.row<it.row&&o.col<=2&&(l=Math.PI*i*(o.col===0?-1:1),a=0),this.shameT>0&&r.i===this.shameIdx&&(a=-.7,c=-.06),e.shieldT>0&&o.col===it.col&&o.row===it.row-1&&(h=1.25,a=0,l=0),Io.setFromEuler(Xx.set(a,Math.PI+l,0,"YXZ")),Sr.compose(xi.set(qt(o.col),Lo+.6*h+c,zt(o.row)),Io,eh.set(1,1,1)),this.npcHeads[r.h].setMatrixAt(r.hi,Sr),this.npcBody.setMatrixAt(r.i,Sr.compose(xi.set(qt(o.col),Lo,zt(o.row)),Io.identity(),eh.set(1,h,1)))}this.npcBody.instanceMatrix.needsUpdate=!0,this.npcHeads.forEach(r=>r.instanceMatrix.needsUpdate=!0)}syncBangs(e,t){this.bangPos[0].copy(this.teacherHead),this.bangPos[0].y+=.15;for(let n=0;n<2;n++){this.bangT[n]=Math.max(0,this.bangT[n]-e);const i=this.bangs[n];i.visible=this.bangT[n]>0,i.visible&&(i.position.copy(this.bangPos[n]),i.position.y+=Math.abs(Math.sin(this.t*10))*.08,i.rotation.y=this.t*3)}}syncFinale(e,t){this.t+=t;const n=this.t,i=this.director;this.resetPose(i),this.resetPose(this.player);let r=0,o=.1,a=Math.PI,l=0,c="normal";const h=g=>{const _=[[0,.1],[1.9,.1],[1.9,2.7],[0,3.1]],p=Mt(g,0,1)*3,f=Math.min(2,Math.floor(p)),E=p-f;r=_[f][0]+(_[f+1][0]-_[f][0])*E,o=_[f][1]+(_[f+1][1]-_[f][1])*E,a=Math.atan2(_[f+1][0]-_[f][0],_[f+1][1]-_[f][1])};e.phase==="cook"?(e.dState==="work"?(a=Math.PI,i.armR.rotation.x=-1.2+Math.sin(n*6)*.1):e.dState==="turning"?a=Math.PI*(1-Mt(e.dT/e.dDur,0,1)):(a=0,i.head.rotation.y=Math.sin(n*2)*.3,c="squint"),e.crave>55&&(c="drool")):e.phase==="approach"?(h(e.phaseT/oe.finale.approach),l=1,c="drool"):e.phase==="serve"?(r=0,o=3.1,a=0,c="drool",i.body.rotation.x=.2,i.nose.scale.setScalar(1.2+Math.sin(n*14)*.3)):(e.phase==="react"||e.phase==="done")&&(r=0,o=3.1,a=0,c=e.lastReact>=3?"cry":e.lastReact===2?"normal":"squint",i.armR.rotation.x=-2.2+Math.sin(n*12)*.3,i.head.rotation.x=Math.sin(n*12)*.08),e.phase!=="serve"&&i.nose.scale.setScalar(e.crave>55&&e.phase==="cook"?.8+Math.sin(n*8)*.15:.5),i.root.position.set(r,0,o),i.root.rotation.y=a,Mr(i,n,l),i.setFace(c),this.teacherHead.set(r,i.height+.35,o),Tr(this.cones[0],e.watching,0,0,.1,0,40,9,e.active);const u=this.player,d=e.active?1:0;u.armR.rotation.x=-1.3+Math.sin(n*14)*.35*d,u.armL.rotation.x=-1.1,this.pan&&(this.pan.position.y=.9+Math.abs(Math.sin(n*7))*.05*d,this.pan.rotation.z=Math.sin(n*7)*.12*d),e.active&&Math.random()<t*6&&this.particles.spawn({x:-.45,y:1.05,z:4,vy:.7,life:1.2,size:.07,grow:.1,color:16771504,spread:.15}),e.crave>30&&Math.random()<t*e.crave*.04&&this.particles.spawn({x:.3-Math.random()*.3,y:1.1,z:3.7,vy:.25,vz:-.9,life:2.6,size:.06,color:16763243,spread:.2});const m=`${Math.min(2,e.dishI)}:${e.phase==="done"?4:Math.round(e.completion*4)}`;if(m!==this.dishKey&&(this.dishKey=m,this.dish&&this.root.remove(this.dish),this.dish=ei(`dish:${m}`,()=>$_(Math.min(2,e.dishI),e.completion),{origin:[4.5,0,4.5]}),this.dish.scale.setScalar(.6),this.root.add(this.dish)),this.dish){const g=e.phase==="react";this.dish.position.set(.4,.8,g?3.75:4),this.dish.rotation.y=g?n*2:0}this.idleCam(n,0),this.syncBangs(t),this.renderer.shadowMap.needsUpdate=l>0||this.frame%4===0}syncBedroom(e){this.t+=e;const t=this.t,n=this.player;this.resetPose(n),Mr(n,t,0),n.head.rotation.y=Math.sin(t*.8)*.3,n.armR.rotation.x=-.3+Math.sin(t*1.5)*.1,this.sysPanel&&(this.sysPanel.position.y=1.6+Math.sin(t*1.6)*.06,this.sysPanel.material.opacity=.35+Math.sin(t*3)*.08);const i=this.reduceMotion?0:1;this.camera.position.set(this.camBase.x+Math.sin(t*.25)*.35*i,this.camBase.y,this.camBase.z),this.camera.lookAt(this.camLook),this.renderer.shadowMap.needsUpdate=this.frame%6===0}bang(e=0,t=1.2){this.bangT[e]=t}render(e){this.frame++,this.particles.update(e),this.renderer.render(this.scene,this.camera)}}class Zx{ctx=null;master;musicGain;volume=.6;muted=!1;tempo=1;musicOn=!1;musicTimer=0;step=0;nextT=0;beatT=0;heartRate=0;listening=!1;capture=null;walkers=new WeakMap;unlock(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.ctx=new e;const t=this.ctx.createDynamicsCompressor();t.threshold.value=-14,t.ratio.value=12,t.attack.value=.003,this.master=this.ctx.createGain(),this.musicGain=this.ctx.createGain(),this.musicGain.gain.value=this.listening?.018:.22,this.musicGain.connect(this.master),this.master.connect(t),t.connect(this.ctx.destination),this.capture=this.ctx.createMediaStreamDestination(),t.connect(this.capture),this.applyVolume()}setVolume(e,t){this.volume=e,this.muted=t,this.applyVolume()}applyVolume(){this.ctx&&(this.master.gain.value=this.muted?0:Math.min(.9,this.volume))}tone(e,t,n="sine",i=.2,r=0,o=0,a){const l=this.ctx;if(!l)return;const c=l.currentTime+o,h=l.createOscillator(),u=l.createGain();h.type=n,h.frequency.setValueAtTime(e,c),r&&h.frequency.exponentialRampToValueAtTime(Math.max(20,e+r),c+t),u.gain.setValueAtTime(1e-4,c),u.gain.exponentialRampToValueAtTime(i,c+.01),u.gain.exponentialRampToValueAtTime(1e-4,c+t),h.connect(u),u.connect(a??this.master),h.start(c),h.stop(c+t+.02)}noise(e,t=.2,n=2e3,i=1,r="bandpass",o=0,a){const l=this.ctx;if(!l)return;const c=l.currentTime+o,h=Math.floor(l.sampleRate*e),u=l.createBuffer(1,h,l.sampleRate),d=u.getChannelData(0);for(let p=0;p<h;p++)d[p]=Math.random()*2-1;const m=l.createBufferSource();m.buffer=u;const g=l.createBiquadFilter();g.type=r,g.frequency.value=n,g.Q.value=i;const _=l.createGain();return _.gain.setValueAtTime(t,c),_.gain.exponentialRampToValueAtTime(1e-4,c+e),m.connect(g),g.connect(_),_.connect(a??this.master),m.start(c),m}chalkSqueak(){this.noise(.075,.1,2900,2.8),this.tone(2250+Math.random()*500,.07,"triangle",.045,160)}chalkTap(){this.noise(.045,.3,2300,1.4),this.tone(740,.085,"triangle",.18,-340),this.noise(.025,.12,1600,1,"bandpass",.065)}listenForTeacher(e){e!==this.listening&&(this.listening=e,this.ctx&&this.musicGain.gain.setTargetAtTime(e?.018:.22,this.ctx.currentTime,.035))}trackFootsteps(e,t,n){const i=this.walkers.get(e);if(!i){this.walkers.set(e,{x:e.x,z:e.z,travel:0});return}const r=Nr(i.x,i.z,e.x,e.z);if(i.x=e.x,i.z=e.z,!t||r>.6){i.travel=0;return}i.travel+=r,!(i.travel<.62)&&(i.travel-=.62,this.footstep(Mt((e.x-n.x)/4,-.9,.9),Nr(e.x,e.z,n.x,n.z)))}footstep(e,t){const n=this.ctx;if(!n)return;const i=n.createStereoPanner();i.pan.value=e,i.connect(this.master);const r=1/(1+t/2.6);this.tone(115,.09,"sine",.4*r,-55,0,i);const o=this.noise(.11,.32*r,850,1.6,"bandpass",.01,i);o&&(o.onended=()=>i.disconnect())}warn(){this.tone(660,.12,"square",.12),this.tone(880,.16,"square",.12,0,.12)}look(){this.tone(220,.25,"sawtooth",.1,-80)}heartbeat(){this.tone(60,.12,"sine",.35,-20),this.tone(55,.12,"sine",.25,-20,.16)}chew(e){e==="crunch"?(this.noise(.09,.16,3500,1.5,"highpass"),this.noise(.06,.1,5e3,2,"highpass",.07)):e==="slurp"?(this.noise(.25,.12,900,3),this.tone(300,.22,"sine",.05,500)):e==="sizzle"?(this.noise(.3,.12,6e3,1,"highpass"),this.tone(140,.08,"triangle",.1)):(this.tone(180,.07,"triangle",.14,-60),this.noise(.06,.06,700,2))}sizzle(){this.noise(.4,.05,6500,1,"highpass")}burp(){this.tone(110,.4,"sawtooth",.25,-50),this.tone(90,.35,"square",.1,-30,.05)}pageTurn(){this.noise(.24,.14,1200,.7),this.noise(.12,.09,700,1,"bandpass",.16)}rustle(){this.noise(.12,.06,4e3,1,"highpass")}whoosh(){this.noise(.4,.14,1200,2),this.tone(900,.4,"sine",.04,-600)}slap(){this.noise(.12,.45,1800,1),this.tone(160,.1,"square",.2,-80)}block(){this.noise(.08,.35,900,2),this.tone(520,.09,"square",.15)}ding(){this.tone(1320,.5,"sine",.18),this.tone(1980,.6,"sine",.1,0,.04)}type(){this.tone(1500+Math.random()*300,.025,"square",.03)}click(){this.tone(700,.04,"triangle",.08)}good(){[523,659,784].forEach((e,t)=>this.tone(e,.14,"triangle",.14,0,t*.07))}bad(){this.tone(200,.3,"sawtooth",.14,-100)}caught(){this.tone(880,.1,"square",.2),this.tone(440,.5,"sawtooth",.2,-300,.1),this.noise(.3,.2,300,1,"lowpass",.1)}clap(){this.noise(.05,.3,1500,1),this.noise(.05,.3,1500,1,"bandpass",.25)}sniff(){this.noise(.18,.08,2500,3),this.noise(.18,.08,2800,3,"bandpass",.28)}bell(){for(let e=0;e<4;e++)this.tone(784,.35,"sine",.16,0,e*.4),this.tone(1175,.35,"sine",.08,0,e*.4)}roll(){this.tone(392,.18,"triangle",.14),this.tone(330,.25,"triangle",.14,0,.18)}horn(){[392,523,659,784].forEach((e,t)=>this.tone(e,.22,"sawtooth",.12,0,t*.12)),this.tone(1046,.6,"sawtooth",.14,0,.5)}trumpet(){[523,523,523,698,880,784,1046].forEach((e,t)=>this.tone(e,.22,"square",.1,0,t*.2))}update(e){if(!this.ctx||(this.heartRate>0&&(this.beatT-=e,this.beatT<=0&&(this.beatT=1/this.heartRate,this.heartbeat())),!this.musicOn))return;const t=this.ctx;for(;this.nextT<t.currentTime+.15;){const n=[262,294,330,392,440,523,587,659],i=[0,2,4,2,5,4,2,1,0,2,4,6,5,4,2,4],r=.26/this.tempo,o=Math.max(0,this.nextT-t.currentTime);this.tone(n[i[this.step%16]],r*.9,"triangle",.1,0,o,this.musicGain),this.step%4===0&&this.tone(n[i[this.step%16]]/4,r*1.8,"sine",.16,0,o,this.musicGain),this.step++,this.nextT+=r}}music(e){this.musicOn=e,e&&this.ctx&&(this.nextT=this.ctx.currentTime+.05),this.musicTimer}}const Jx={title:"课桌下的米其林",subtitle:"在老师眼皮底下，吃出米其林三星","intro.1":"按住空格低头偷吃，松手抬头；低头也能按 S 藏食物","intro.2":"留意粉笔停下和靠近的脚步，及时停手","intro.3":"B 立书挡视线和粉笔，点名按 Enter；记名三次叫家长",start:"开始偷吃",continue:"继续",settings:"设置",back:"返回",retry:"再来一局",toHub:"回卧室",resume:"继续游戏",quit:"放弃本局",paused:"已暂停",ok:"好",close:"关闭",locked:"未解锁",cleared:"已通关",enter:"进入",skipHold:"按住跳过","scene.classroom":"普通教室","scene.library":"图书馆","scene.exam":"考场","scene.office":"教导主任办公室","scene.bedroom":"卧室","scene.classroom.rule":"基础规则：回头、巡视、点名、粉笔头","scene.library.rule":"声音阈值减半；管理员在书架间巡逻，只听只闻","scene.exam.rule":"两个监考 + 摄像头；不能立书，没有粉笔但会被盯","scene.office.rule":"终局：做三道菜，把教导主任吃服","scene.need.library":"通关普通教室后解锁","scene.need.exam":"通关图书馆后解锁","scene.need.office":"通关考场并解锁「主厨之路」","hud.lesson":"第 {n} 节课","hud.quota":"份额 {a}/{b}","hud.strikes":"记名","hud.score":"得分","hud.combo":"连击 ×{n}","hud.sight":"视线","hud.sound":"声音","hud.smell":"气味","hud.susp":"怀疑","hud.bites":"剩 {n} 口","hud.cam":"摄像头","hud.behind":"⚠ 有人在你身后","hud.proc":"程序化","hud.tripo":"Tripo 模型","hud.noglb":"（未放入 GLB）","sig.safe.classroom":"安全 · 在写板书","sig.safe.library":"安全 · 在整理书架","sig.safe.exam":"安全 · 在看报纸","sig.safe.office":"安全 · 在批文件","sig.turn":"要回头了","sig.look":"在看你","sig.patrol":"巡视中","sig.roll":"点名中","sig.chalk":"瞄准你！","sig.sniff":"在闻味","sig.come":"馋得走过来了","sig.serve":"上菜时机！","btn.eat":"按住吃","btn.hide":"藏","btn.book":"书","btn.here":"到！","btn.serve":"上菜","btn.pause":"暂停","state.hidden":"藏在桌肚","state.desk":"拿在桌面","state.eating":"正在吃","state.stun":"眩晕中","state.sleep":"装睡中","prep.soak":"泡面中…","prep.peel1":"剥壳 1/2","prep.peel2":"剥壳 2/2","prep.setpot":"架锅","prep.fire":"开火","food.latiao":"辣条","food.chips":"薯片","food.jelly":"果冻","food.noodles":"泡面","food.luosifen":"螺蛳粉","food.durian":"榴莲","food.hotpot":"课桌火锅","food.teppan":"铁板烧","food.lamb":"烤全羊","ng.latiao":"整只烤鸭","ng.chips":"帝王蟹","ng.jelly":"佛跳墙","ng.noodles":"兰州拉面（现拉）","ng.luosifen":"臭鳜鱼","ng.durian":"鲱鱼罐头","ng.hotpot":"九宫格大火锅","ng.teppan":"战斧牛排","ng.lamb":"烤骆驼","trait.noiseHi":"🔊吵","trait.smellHi":"👃臭","trait.prep":"⏳要准备","trait.smoke":"💨冒烟","trait.sizzle":"♨滋啦","trait.spread":"🌫飘邻座","toast.perfect":"完美收手！+{n}","toast.serving":"吃完一份 +{n}","toast.quota":"份额达成！继续吃有额外分","toast.heard":"被听到了！","toast.block":"格挡！","toast.reflect":"反弹命中黑板 +{n}","toast.hit":"被粉笔头命中！","toast.rollYou":"点到你了！按 Enter 答「到」","toast.rollOk":"「到！」","toast.monitor":"班长替你答了「到」","toast.rollMiss":"走神了！-{n} 分","toast.mumble":"「唔…到…」嘴里有东西！","toast.tattle":"被打小报告了！","toast.frame":"嫁祸成功：邻座背锅","toast.npcCaught":"有同学偷吃被抓了…","toast.burp":"嗝——！","toast.turn":"前排回头看你了","toast.stare":"监考盯上你了","toast.free":"逃过一次记名","toast.sniff":"老师闻到你这边了！","toast.cant":"现在用不了","toast.chalk":"粉笔头！立书格挡（B）","toast.caught":"被抓现行！","toast.interrupt":"被看到了，这一步重做","toast.cam":"摄像头亮了！","toast.shield":"前排挡住了讲台视线","toast.models":"已加载 {n} 个 Tripo 模型","count.go":"上课！","bell.title":"下课铃响了","bell.gain":"本节得分 {n}","bell.under":"份额没吃完：得分 ×0.6，不能选升级","bell.next":"下一节课","pick.title":"课间：三选一","pick.cost":"代价：{cost}","pick.free":"无代价","pick.synergy":"联动：{tag} ×{n}：{effect}","pick.replace":"将替换道具：{name}","pick.active":"主动道具","tag.silent":"静音","tag.gulp":"速吞","tag.frame":"嫁祸","tag.bribe":"贿赂","tag.tough":"硬吃","tag.guard":"防御","tag.score":"分数","tag.cook":"烹饪","tag.duo":"配合","syn.silent":"所有噪音再 -15%/张；3 张时前排不再回头","syn.gulp":"一口时间再 -10%","syn.frame":"嫁祸道具冷却 -30%","syn.bribe":"前排挡视线 +4 秒","syn.tough":"怀疑值衰减 +25%","syn.guard":"被粉笔命中眩晕减半","syn.score":"完美收手奖励翻倍","syn.cook":"香气更浓，得分更高","syn.duo":"同桌越来越默契","up.saliva.name":"口水软化","up.saliva.eff":"薯片类噪音 -60%","up.saliva.cost":"每口时间 +0.2 秒","up.earplug.name":"棉花糖耳塞","up.earplug.eff":"你自己的噪音 -30%","up.earplug.cost":"听不到要回头提示音","up.quietbag.name":"静音包装袋","up.quietbag.eff":"拿出/藏起食物无声","up.quietbag.cost":"","up.snakejaw.name":"蛇类下颌","up.snakejaw.eff":"一口时间 -40%","up.snakejaw.cost":"每 3 口有 20% 打嗝（噪音爆发）","up.chug.name":"一口闷","up.chug.eff":"长按 1.5 秒一次吃 3 口","up.chug.cost":"期间不能松手中断","up.digest.name":"消化神功","up.digest.eff":"「嘴里有东西」窗口 -70%（点名有效）","up.digest.cost":"","up.fan.name":"小电扇","up.fan.eff":"主动：把你格子的气味吹到邻座","up.fan.cost":"冷却 20 秒","up.blame.name":"甩锅大师","up.blame.eff":"老师闻到你时 50% 算在邻座头上","up.blame.cost":"邻座记恨你，会打一次小报告","up.decoy.name":"声东击西","up.decoy.eff":"主动：扔纸团，老师转头看另一边 3 秒","up.decoy.cost":"冷却 25 秒","up.share.name":"前排分一口","up.share.eff":"主动：前排帮你挡讲台视线 10 秒","up.share.cost":"每次消耗 1 口食物","up.monitor.name":"班长同盟","up.monitor.eff":"点名时班长帮你答「到」一次/节","up.monitor.cost":"贿赂超过 3 次有概率被告密","up.bookwall.name":"书本城墙","up.bookwall.eff":"立书不再增加怀疑值","up.bookwall.cost":"立书时吃速度 -20%","up.exhaust.name":"排风扇","up.exhaust.eff":"你的格子气味衰减 ×2","up.exhaust.cost":"常驻低噪音（嗡嗡声）","up.deskkitchen.name":"桌肚厨房","up.deskkitchen.eff":"藏起来的食物仍可继续准备","up.deskkitchen.cost":"桌肚里的火锅冒烟更大","up.steelbook.name":"钢铁课本","up.steelbook.eff":"格挡粉笔后反弹，击中黑板得分","up.steelbook.cost":"","up.playdead.name":"装睡","up.playdead.eff":"主动：视线判定失效 3 秒","up.playdead.cost":"被点名时装睡 = 直接被抓","up.gourmet.name":"美食家之舌","up.gourmet.eff":"离谱等级食物得分 +50%","up.gourmet.cost":"份额 +1","up.combohigh.name":"连击上头","up.combohigh.eff":"连击倍率上限 +3","up.combohigh.cost":"连击断掉时怀疑值 +15","up.heat.name":"火候掌控","up.heat.eff":"准备步骤时间 -50%","up.heat.cost":"气味 +20%","up.spice.name":"秘制调料","up.spice.eff":"所有得分 +25%","up.spice.cost":"气味 +30%","up.knife.name":"快刀手","up.knife.eff":"重口以上食物口数 -2","up.knife.cost":"噪音 +20%","up.lookout.name":"同桌望风","up.lookout.eff":"要回头时间 +0.3 秒","up.lookout.cost":"同桌要分成：得分 -10%","up.relay.name":"接力藏食","up.relay.eff":"藏食物瞬间完成","up.relay.cost":"同桌会咳嗽一声（小噪音）","up.scapegoat.name":"顶包","up.scapegoat.eff":"本局第一次被抓由同桌顶包","up.scapegoat.cost":"之后得分 -15%","over.parents":"叫家长！","over.parents.sub":"记名满 3 次，本局结束","over.clear":"放学啦！","over.clear.sub":"{scene} 通关，额外 +{n} 分","over.score":"本局得分 {n}","over.points":"系统积分 +{n}","over.best":"新纪录！","over.stats":"吃掉 {a} 份 · 完美收手 {b} 次","hub.title":"偷吃系统","hub.points":"系统积分 {n}","hub.best":"最高分 {n}","hub.scenes":"今天去哪吃","hub.story":"系统觉醒","hub.shop":"永久加成","hub.ng":"二周目（更离谱）","hub.unlock":"觉醒（{n}）","hub.buy":"兑换（{n}）","hub.owned":"已拥有","hub.done":"已觉醒","hub.replay":"重看","node.awaken.name":"系统觉醒","node.awaken.cond":"首次通关普通教室","node.awaken.reward":"妈妈多给零花钱 → 开局多带 1 种零食（果冻）","node.bag.name":"装备升级","node.bag.cond":"累计吃掉 50 份（{a}/50）","node.bag.reward":"更大的书包 → 多 1 个道具格","node.mentor.name":"拜师学艺","node.mentor.cond":"通关图书馆","node.mentor.reward":"大排档老板收你当徒弟 → 升级池加入烹饪类","node.network.name":"人脉扩张","node.network.cond":"嫁祸或贿赂成功 30 次（{a}/30）","node.network.reward":"同桌成为同谋 → 升级池加入双人配合类","node.chef.name":"主厨之路","node.chef.cond":"通关考场","node.chef.reward":"神秘主厨的食谱 → 解锁终局 + 烤全羊","perk.goodkid.name":"乖学生人设","perk.goodkid.eff":"老师进入警觉的怀疑值门槛 +10","perk.tell.name":"第六感","perk.tell.eff":"要回头时间 +0.15 秒","perk.decay.name":"面不改色","perk.decay.eff":"怀疑值衰减 +2/秒","perk.chew.name":"大牙口","perk.chew.eff":"一口时间 -0.05 秒","perk.mercy.name":"初犯从宽","perk.mercy.eff":"每局第一次被抓不记名","perk.interest.name":"系统返利","perk.interest.eff":"系统积分获取 +20%","who.sys":"系统","who.me":"我","who.mom":"妈妈","who.boss":"大排档老板","who.mate":"同桌","who.chef":"神秘主厨","who.dir":"教导主任","story.intro.0":"sys|叮！检测到宿主在数学课上咽了 37 次口水。","story.intro.1":"sys|「偷吃系统」绑定成功。目标：在老师眼皮底下，吃出米其林三星。","story.intro.2":"me|……我只是饿了而已。","story.intro.3":"sys|新手任务已发布：普通教室，三节课，别被叫家长。","story.awaken.0":"sys|叮！检测到宿主完成首次全天偷吃。境界：炼气期·零食境。","story.awaken.1":"mom|最近怎么总说学校饭不够吃？来，多给你二十块零花钱。","story.awaken.2":"me|（系统，这也在你的计算之中？）","story.awaken.3":"sys|奖励已发放：零花钱 +20。小卖部新品「果冻」已加入宿主的书包。","story.awaken.4":"sys|温馨提示：果冻无声、无味，乃筑基圣品。","story.awaken.5":"me|把吃果冻说得像修仙一样……","story.bag.0":"sys|叮！累计吞噬 50 份。宿主的胃已突破凡人极限。","story.bag.1":"mom|你这书包怎么鼓成这样？算了，给你换个大的。","story.bag.2":"sys|获得法宝：「乾坤书包」。道具格 +1。","story.bag.3":"me|这就是个普通的大书包吧。","story.bag.4":"sys|心中有乾坤，书包即乾坤。","story.mentor.0":"sys|叮！图书馆静默试炼通过。检测到机缘：楼下大排档。","story.mentor.1":"boss|小子，我看你每天蹲在我摊前闻半小时不买——是块料。","story.mentor.2":"boss|想不想学颠勺？包教包会，学费用洗碗抵。","story.mentor.3":"me|师父在上，请受徒儿一拜！","story.mentor.4":"sys|拜师成功。升级池已加入「烹饪」类功法。","story.mentor.5":"boss|记住：火候，就是人生。还有，别在我摊上偷吃。","story.network.0":"sys|叮！宿主已成功嫁祸 / 贿赂 30 次。人际关系：岌岌可危。","story.network.1":"mate|别装了，我都看见了。锅我背了多少次你心里没数？","story.network.2":"mate|……分我一半，我给你望风。","story.network.3":"me|成交。","story.network.4":"sys|同桌已成为同谋。升级池已加入「配合」类功法。","story.chef.0":"sys|叮！考场试炼通过。宿主已达「金丹期·火锅境」。","story.chef.1":"chef|（一张油渍斑斑的纸条从窗外飘进来）","story.chef.2":"chef|「真正的美食，不该躲在桌肚里。——一个路过的主厨」","story.chef.3":"sys|获得《米其林三星食谱》残卷。新食材：烤全羊。","story.chef.4":"sys|终极任务已开启：教导主任办公室。这一次，不许躲。","story.chef.5":"me|……你是说，当着他的面做？","fin.title":"终局 · 米其林征服教导主任","fin.crave":"馋度","fin.dish.starter":"前菜 · 凉拌三丝","fin.dish.main":"主菜 · 黑椒牛排","fin.dish.dessert":"甜点 · 焦糖布丁","fin.step.chop":"切","fin.step.season":"调味","fin.step.sear":"煎","fin.step.plate":"摆盘","fin.step.whisk":"打发","fin.step.torch":"炙烤","fin.hold":"按住 空格，在绿色区域松手","fin.rhythm":"按 空格 开始，然后跟着节拍点 4 下","fin.drag":"把食材拖到盘子里（或在光标经过盘心时按 空格）","fin.act.hold":"按住","fin.act.rhythm":"轻点","fin.act.drag":"放置","fin.wait":"菜做好了，香气正在飘过去…","fin.served":"上菜！{n} 星","fin.miss":"错过了上菜时机","fin.intro":"主任回头时别开始新步骤：被看到会打断，要重做。馋度满了他会走过来——那是上菜时机。","end.grand.title":"大结局 · 全校改上烹饪课","end.grand.text":"教导主任放下筷子，摘下眼镜，擦了擦眼角。「三十年了……我以为我只是讨厌学生偷吃。原来我只是，没吃过好的。」第二天，全校课表上多了一节「烹饪课」。","end.ok.title":"结局 · 下不为例","end.ok.text":"教导主任默默吃完，把盘子舔得很干净。「……下不为例。」他转过身去，肩膀抖了一下。","end.parents.title":"结局 · 喂，是家长吗","end.parents.text":"教导主任尝了一口，沉默三秒，拿起了电话。「喂？您家孩子在我办公室开火做饭——而且做得很难吃。」","end.stars":"总评 {n} / 9 星","end.ng":"二周目已解锁：老师更警觉，食物更离谱","end.credits":"策划 / 程序 / 美术 / 音效：课程作业小组|体素建模：程序化生成|特别感谢：所有上课偷吃过的人|—— 完 ——","set.lang":"语言","lang.en":"English","lang.zh":"简体中文","set.volume":"音量","set.mute":"静音","set.reduce":"减少动态效果","set.assist":"辅助模式（要回头时间 +50%）","set.clear":"清除存档","set.clear2":"确定清除？再点一次","set.cleared":"存档已清除","dbg.title":"调试面板","dbg.points":"+500 积分","dbg.god":"无敌","dbg.skip":"跳过本节","dbg.unlock":"解锁全部","dbg.quota":"补满份额","dbg.caught":"强制被抓","dbg.chalk":"触发粉笔","dbg.patrol":"触发巡视","dbg.roll":"触发点名","dbg.end":"结局","dbg.seed":"固定种子","dbg.perf":"帧耗时"},Qx={title:"Michelin Under the Desk",subtitle:"Earn three stars right under the teacher's nose","intro.1":"Hold Space to look down and eat. Release to look up. Press S to stash at any time.","intro.2":"Listen for the chalk to stop and for footsteps coming closer.","intro.3":"Hold B to raise your book. Press Enter for roll call. Three strikes and they call your parents.",start:"Start snacking",continue:"Continue",settings:"Settings",back:"Back",retry:"Play again",toHub:"Back to bedroom",resume:"Resume",quit:"Give up run",paused:"Paused",ok:"OK",close:"Close",locked:"Locked",cleared:"Cleared",enter:"Enter",skipHold:"Hold to skip","scene.classroom":"Classroom","scene.library":"Library","scene.exam":"Exam Hall","scene.office":"Dean's Office","scene.bedroom":"Bedroom","scene.classroom.rule":"Base rules: turning, patrols, roll call, chalk","scene.library.rule":"Noise threshold halved; a librarian patrols by ear and nose","scene.exam.rule":"Two proctors + a camera; no book, no chalk, but they stare","scene.office.rule":"Finale: cook three dishes and win the dean over","scene.need.library":"Clear the Classroom to unlock","scene.need.exam":"Clear the Library to unlock","scene.need.office":`Clear the Exam Hall and unlock "Chef's Path"`,"hud.lesson":"Period {n}","hud.quota":"Quota {a}/{b}","hud.strikes":"Strikes","hud.score":"Score","hud.combo":"Combo ×{n}","hud.sight":"Sight","hud.sound":"Sound","hud.smell":"Smell","hud.susp":"Suspicion","hud.bites":"{n} bites left","hud.cam":"Camera","hud.behind":"⚠ Someone is behind you","hud.proc":"Procedural","hud.tripo":"Tripo models","hud.noglb":"(no GLB found)","sig.safe.classroom":"Safe · writing on board","sig.safe.library":"Safe · shelving books","sig.safe.exam":"Safe · reading paper","sig.safe.office":"Safe · signing papers","sig.turn":"About to turn","sig.look":"Watching you","sig.patrol":"Patrolling","sig.roll":"Roll call","sig.chalk":"Aiming at you!","sig.sniff":"Sniffing","sig.come":"Coming over, drooling","sig.serve":"Serve now!","btn.eat":"Hold to eat","btn.hide":"Hide","btn.book":"Book","btn.here":"Here!","btn.serve":"Serve","btn.pause":"Pause","state.hidden":"Stashed","state.desk":"On desk","state.eating":"Eating","state.stun":"Stunned","state.sleep":"Playing dead","prep.soak":"Soaking…","prep.peel1":"Peel 1/2","prep.peel2":"Peel 2/2","prep.setpot":"Set pot","prep.fire":"Light stove","food.latiao":"Spicy strips","food.chips":"Chips","food.jelly":"Jelly","food.noodles":"Cup noodles","food.luosifen":"Snail noodles","food.durian":"Durian","food.hotpot":"Desk hotpot","food.teppan":"Teppanyaki","food.lamb":"Whole roast lamb","ng.latiao":"Whole roast duck","ng.chips":"King crab","ng.jelly":"Buddha Jumps Over the Wall","ng.noodles":"Hand-pulled noodles","ng.luosifen":"Stinky mandarin fish","ng.durian":"Surströmming","ng.hotpot":"Nine-grid hotpot","ng.teppan":"Tomahawk steak","ng.lamb":"Roast camel","trait.noiseHi":"🔊loud","trait.smellHi":"👃smelly","trait.prep":"⏳prep","trait.smoke":"💨smoke","trait.sizzle":"♨sizzle","trait.spread":"🌫spreads","toast.perfect":"Perfect stash! +{n}","toast.serving":"Serving done +{n}","toast.quota":"Quota met! Keep eating for bonus","toast.heard":"They heard that!","toast.block":"Blocked!","toast.reflect":"Ricochet hits the board +{n}","toast.hit":"Hit by chalk!","toast.rollYou":'Your name! Press Enter to say "Here"',"toast.rollOk":'"Here!"',"toast.monitor":"The class monitor answered for you","toast.rollMiss":"Spaced out! -{n}","toast.mumble":'"Mmph… here…" — mouth full!',"toast.tattle":"Someone snitched!","toast.frame":"Framed: your neighbor takes the blame","toast.npcCaught":"A classmate got caught snacking…","toast.burp":"BUUURP!","toast.turn":"The front row turned to look","toast.stare":"The proctor is onto you","toast.free":"Dodged a strike","toast.sniff":"The teacher smells your corner!","toast.cant":"Can't use that now","toast.chalk":"Chalk incoming! Raise your book (B)","toast.caught":"Caught red-handed!","toast.interrupt":"Spotted — redo this step","toast.cam":"Camera is live!","toast.shield":"Front row is blocking the podium view","toast.models":"Loaded {n} Tripo model(s)","count.go":"Class!","bell.title":"The bell rings","bell.gain":"Period score {n}","bell.under":"Quota missed: score ×0.6, no upgrade","bell.next":"Next period","pick.title":"Break: pick one","pick.cost":"Cost: {cost}","pick.free":"No cost","pick.synergy":"Synergy: {tag} ×{n} — {effect}","pick.replace":"Replaces item: {name}","pick.active":"Active item","tag.silent":"Silent","tag.gulp":"Gulp","tag.frame":"Frame","tag.bribe":"Bribe","tag.tough":"Brazen","tag.guard":"Guard","tag.score":"Score","tag.cook":"Cooking","tag.duo":"Duo","syn.silent":"All noise -15% per extra card; at 3 the front row never turns","syn.gulp":"Bite time -10% more","syn.frame":"Frame item cooldowns -30%","syn.bribe":"Front-row cover +4s","syn.tough":"Suspicion decay +25%","syn.guard":"Chalk stun halved","syn.score":"Perfect stash bonus doubled","syn.cook":"Stronger aroma, higher score","syn.duo":"Your deskmate gets sharper","up.saliva.name":"Saliva Softening","up.saliva.eff":"Crunchy food noise -60%","up.saliva.cost":"Each bite +0.2s","up.earplug.name":"Marshmallow Earplugs","up.earplug.eff":"Your own noise -30%","up.earplug.cost":"No audio cue before the teacher turns","up.quietbag.name":"Silent Wrapper","up.quietbag.eff":"Taking out / stashing is silent","up.quietbag.cost":"","up.snakejaw.name":"Snake Jaw","up.snakejaw.eff":"Bite time -40%","up.snakejaw.cost":"Every 3rd bite: 20% burp (noise burst)","up.chug.name":"One Gulp","up.chug.eff":"Hold 1.5s to eat 3 bites at once","up.chug.cost":"Cannot release midway","up.digest.name":"Speed Digestion","up.digest.eff":'"Mouth full" window -70% (roll call)',"up.digest.cost":"","up.fan.name":"Pocket Fan","up.fan.eff":"Active: blow your smell onto your neighbor","up.fan.cost":"20s cooldown","up.blame.name":"Blame Master","up.blame.eff":"50% of sniffs get pinned on your neighbor","up.blame.cost":"Neighbor holds a grudge and snitches once","up.decoy.name":"Decoy Toss","up.decoy.eff":"Active: paper ball makes them look away 3s","up.decoy.cost":"25s cooldown","up.share.name":"Share a Bite","up.share.eff":"Active: front row blocks podium view 10s","up.share.cost":"Costs 1 bite each time","up.monitor.name":"Monitor Alliance","up.monitor.eff":"Monitor answers roll call for you once/period","up.monitor.cost":"Over 3 bribes may get you snitched on","up.bookwall.name":"Book Fortress","up.bookwall.eff":"Raised book no longer adds suspicion","up.bookwall.cost":"Eat 20% slower behind the book","up.exhaust.name":"Exhaust Fan","up.exhaust.eff":"Smell on your tile decays ×2","up.exhaust.cost":"Constant low hum","up.deskkitchen.name":"Desk Kitchen","up.deskkitchen.eff":"Stashed food keeps prepping","up.deskkitchen.cost":"Stashed hotpot smokes more","up.steelbook.name":"Steel Textbook","up.steelbook.eff":"Blocked chalk ricochets for points","up.steelbook.cost":"","up.playdead.name":"Play Dead","up.playdead.eff":"Active: immune to sight for 3s","up.playdead.cost":"Asleep during roll call = caught","up.gourmet.name":"Gourmet Tongue","up.gourmet.eff":"Absurd-tier food scores +50%","up.gourmet.cost":"Quota +1","up.combohigh.name":"Combo Rush","up.combohigh.eff":"Combo cap +3","up.combohigh.cost":"Breaking a combo adds 15 suspicion","up.heat.name":"Heat Control","up.heat.eff":"Prep time -50%","up.heat.cost":"Smell +20%","up.spice.name":"Secret Spice","up.spice.eff":"All score +25%","up.spice.cost":"Smell +30%","up.knife.name":"Fast Knife","up.knife.eff":"Heavy foods need 2 fewer bites","up.knife.cost":"Noise +20%","up.lookout.name":"Deskmate Lookout","up.lookout.eff":"Turn warning +0.3s","up.lookout.cost":"They take a cut: score -10%","up.relay.name":"Relay Stash","up.relay.eff":"Stashing is instant","up.relay.cost":"Deskmate coughs (small noise)","up.scapegoat.name":"Fall Guy","up.scapegoat.eff":"Your deskmate takes the first catch","up.scapegoat.cost":"Score -15% afterwards","over.parents":"Parents called!","over.parents.sub":"Three strikes — the run is over","over.clear":"School's out!","over.clear.sub":"{scene} cleared, bonus +{n}","over.score":"Run score {n}","over.points":"System points +{n}","over.best":"New record!","over.stats":"{a} servings · {b} perfect stashes","hub.title":"Snack System","hub.points":"System points {n}","hub.best":"Best {n}","hub.scenes":"Where to eat today","hub.story":"Awakening","hub.shop":"Permanent perks","hub.ng":"New Game+ (more absurd)","hub.unlock":"Awaken ({n})","hub.buy":"Redeem ({n})","hub.owned":"Owned","hub.done":"Awakened","hub.replay":"Replay","node.awaken.name":"System Awakening","node.awaken.cond":"Clear the Classroom once","node.awaken.reward":"Mom raises your allowance → start with an extra snack (jelly)","node.bag.name":"Gear Upgrade","node.bag.cond":"Eat 50 servings total ({a}/50)","node.bag.reward":"A bigger backpack → +1 item slot","node.mentor.name":"Apprenticeship","node.mentor.cond":"Clear the Library","node.mentor.reward":"The food-stall boss takes you in → Cooking upgrades","node.network.name":"Connections","node.network.cond":"Frame or bribe 30 times ({a}/30)","node.network.reward":"Your deskmate joins in → Duo upgrades","node.chef.name":"Chef's Path","node.chef.cond":"Clear the Exam Hall","node.chef.reward":"A mysterious chef's recipe → finale + roast lamb","perk.goodkid.name":"Model Student Act","perk.goodkid.eff":"Teacher alert threshold +10","perk.tell.name":"Sixth Sense","perk.tell.eff":"Turn warning +0.15s","perk.decay.name":"Poker Face","perk.decay.eff":"Suspicion decay +2/s","perk.chew.name":"Strong Jaw","perk.chew.eff":"Bite time -0.05s","perk.mercy.name":"First Offense","perk.mercy.eff":"First catch each run is free","perk.interest.name":"System Cashback","perk.interest.eff":"System points +20%","who.sys":"SYSTEM","who.me":"Me","who.mom":"Mom","who.boss":"Stall Boss","who.mate":"Deskmate","who.chef":"Mystery Chef","who.dir":"Dean","story.intro.0":"sys|Ding! Host swallowed saliva 37 times during math class.","story.intro.1":`sys|"Snack System" bound. Goal: earn three Michelin stars under the teacher's nose.`,"story.intro.2":"me|…I was just hungry.","story.intro.3":"sys|Tutorial quest issued: Classroom, three periods, don't get your parents called.","story.awaken.0":"sys|Ding! Host completed a full day of snacking. Realm: Qi Refining · Snack Stage.","story.awaken.1":"mom|You keep saying school lunch isn't enough. Here, twenty more for pocket money.","story.awaken.2":"me|(System, was this part of your calculations?)","story.awaken.3":`sys|Reward issued: allowance +20. New item "Jelly" added to host's bag.`,"story.awaken.4":"sys|Tip: jelly is silent and scentless — a foundation-building treasure.","story.awaken.5":"me|You make eating jelly sound like cultivation…","story.bag.0":"sys|Ding! 50 servings devoured. Host's stomach has surpassed mortal limits.","story.bag.1":"mom|Why is your bag bulging like that? Fine, here's a bigger one.","story.bag.2":'sys|Artifact obtained: "Universe Backpack". Item slots +1.',"story.bag.3":"me|It's just a big backpack.","story.bag.4":"sys|With a universe in your heart, any backpack holds a universe.","story.mentor.0":"sys|Ding! Library trial of silence passed. Opportunity detected: the food stall downstairs.","story.mentor.1":"boss|Kid, you sniff at my stall for half an hour every day and buy nothing. You've got talent.","story.mentor.2":"boss|Wanna learn to toss a wok? Tuition is paid in dishwashing.","story.mentor.3":"me|Master, accept this disciple's bow!","story.mentor.4":'sys|Apprenticeship formed. "Cooking" techniques added to the upgrade pool.',"story.mentor.5":"boss|Remember: heat is life. And don't snack at my stall.","story.network.0":"sys|Ding! Host framed / bribed 30 times. Social standing: precarious.","story.network.1":"mate|Drop the act. Do you know how many times I've taken the blame for you?","story.network.2":"mate|…Give me half and I'll be your lookout.","story.network.3":"me|Deal.","story.network.4":'sys|Deskmate is now an accomplice. "Duo" techniques added to the upgrade pool.',"story.chef.0":'sys|Ding! Exam trial passed. Host reached "Golden Core · Hotpot Stage".',"story.chef.1":"chef|(A grease-stained note drifts in through the window.)","story.chef.2":`chef|"Real food shouldn't hide under a desk." — a passing chef`,"story.chef.3":"sys|Obtained: fragment of the Three-Star Recipe. New ingredient: whole roast lamb.","story.chef.4":"sys|Final quest unlocked: the Dean's Office. This time, no hiding.","story.chef.5":"me|…You mean cook right in front of him?","fin.title":"Finale · Conquer the Dean","fin.crave":"Craving","fin.dish.starter":"Starter · Three-shred salad","fin.dish.main":"Main · Pepper steak","fin.dish.dessert":"Dessert · Crème caramel","fin.step.chop":"Chop","fin.step.season":"Season","fin.step.sear":"Sear","fin.step.plate":"Plate","fin.step.whisk":"Whisk","fin.step.torch":"Torch","fin.hold":"Hold SPACE, release in the green zone","fin.rhythm":"Press SPACE to start, then tap the 4 beats","fin.drag":"Drag items onto the plate (or press SPACE when the cursor crosses the centre)","fin.act.hold":"HOLD","fin.act.rhythm":"TAP","fin.act.drag":"PLACE","fin.wait":"The dish is ready — the aroma is drifting over…","fin.served":"Served! {n} star(s)","fin.miss":"Missed the serving window","fin.intro":"Don't start a step while the dean is turning: being seen interrupts it. When his craving is full he walks over — that's your moment to serve.","end.grand.title":"Grand Ending · Cooking Class for All","end.grand.text":'The dean put down his chopsticks, took off his glasses and wiped his eyes. "Thirty years… I thought I hated students snacking. Turns out I had just never eaten anything good." The next day, every timetable had a new subject: Cooking.',"end.ok.title":"Ending · Just This Once","end.ok.text":'The dean ate in silence and licked the plate clean. "…Just this once." He turned away. His shoulders shook a little.',"end.parents.title":"Ending · Hello, Is This the Parent?","end.parents.text":'The dean took one bite, paused three seconds and picked up the phone. "Hello? Your child lit a stove in my office — and the food is terrible."',"end.stars":"Total {n} / 9 stars","end.ng":"New Game+ unlocked: sharper teachers, wilder food","end.credits":"Design / Code / Art / Audio: course project team|Voxel models: procedurally generated|Special thanks: everyone who ever snacked in class|— THE END —","set.lang":"Language","lang.en":"English","lang.zh":"Simplified Chinese","set.volume":"Volume","set.mute":"Mute","set.reduce":"Reduce motion","set.assist":"Assist mode (turn warning +50%)","set.clear":"Clear save","set.clear2":"Really clear? Click again","set.cleared":"Save cleared","dbg.title":"Debug panel","dbg.points":"+500 points","dbg.god":"God mode","dbg.skip":"Skip period","dbg.unlock":"Unlock all","dbg.quota":"Fill quota","dbg.caught":"Force caught","dbg.chalk":"Trigger chalk","dbg.patrol":"Trigger patrol","dbg.roll":"Trigger roll call","dbg.end":"Ending","dbg.seed":"Fixed seed","dbg.perf":"Frame time"},ev={zh:Jx,en:Qx};let ol="en";function tv(s){ol=s,document.documentElement.lang=s==="zh"?"zh-CN":"en",document.title=N("title")}function Ur(){return ol}function N(s,e){let t=ev[ol][s]??s;if(e)for(const n in e)t=t.replace(`{${n}}`,String(e[n]));return t}function Ae(s,e="",t=""){const n=document.createElement(s);return e&&(n.className=e),t&&(n.innerHTML=t),n}function yt(s,e,t=""){const n=Ae("button",`btn ${t}`,s);return n.type="button",n.addEventListener("click",e),n}function Yh(s,e){const t=n=>{n.preventDefault(),e(!1)};s.addEventListener("pointerdown",n=>{n.preventDefault();try{s.setPointerCapture(n.pointerId)}catch{}e(!0)}),s.addEventListener("pointerup",t),s.addEventListener("pointercancel",t),s.addEventListener("lostpointercapture",t),s.addEventListener("contextmenu",n=>n.preventDefault())}const $i=s=>s.replace(/[&<>]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;"})[e]);function nv(s,e){return N(`${e?"ng":"food"}.${s}`)}function iv(s){const e=[];return s.noise>=oe.noise.high&&e.push(N("trait.noiseHi")),s.smell>=oe.smell.high&&e.push(N("trait.smellHi")),s.spread&&e.push(N("trait.spread")),s.prep&&e.push(N("trait.prep")),s.smoke&&e.push(N("trait.smoke")),s.sizzle&&e.push(N("trait.sizzle")),e.join(" ")}class sv{constructor(e,t){this.cb=t,this.root.id="hud",this.root.innerHTML=`
      <div class="tl panel"><div class="row"><b data-q="scene"></b><span data-q="lesson"></span></div>
        <div class="row"><span class="timer" data-q="timer">90</span><span data-q="score"></span></div>
        <div data-q="quotaTxt"></div><div class="bar"><i data-q="quota"></i></div></div>
      <div class="signal s-safe" data-q="signal" hidden role="status" aria-live="polite"></div>
      <div class="topbtns"><button class="btn small ghost" data-q="model" hidden></button></div>
      <button class="btn small pausebtn" data-q="pause">⏸</button>
      <div class="campill" data-q="cam"></div>
      <div class="bars panel" data-q="testPanel" hidden><div class="vrow">
        <div class="vcol"><div class="vbar sight"><i data-q="sight"></i></div><span>👁</span><span data-q="lSight"></span></div>
        <div class="vcol"><div class="vbar sound"><i data-q="sound"></i></div><span>🔊</span><span data-q="lSound"></span></div>
        <div class="vcol"><div class="vbar smell"><i data-q="smell"></i></div><span>👃</span><span data-q="lSmell"></span></div></div>
        <canvas width="96" height="80" data-q="map"></canvas></div>
      <div class="susp" data-q="susp"><i data-q="suspFill"></i><b data-q="suspTxt"></b></div>
      <div class="bl panel"><span data-q="lStrikes"></span><div class="strike" data-q="s0">✕</div><div class="strike" data-q="s1">✕</div><div class="strike" data-q="s2">✕</div></div>
      <div class="br"><div class="item panel pe" data-q="i0"></div><div class="item panel pe" data-q="i1"></div>
        <div class="food panel"><div class="name" data-q="fname"></div><div class="pips" data-q="pips"></div><div data-q="ftrait"></div><div class="st" data-q="fstate"></div><div class="bar"><i data-q="fprog"></i></div></div></div>
      <div class="behind" data-q="behind"></div>
      <button class="btn herebtn" data-q="here"></button>
      <div class="count" data-q="count"></div>
      <div class="touch"><button class="btn tb" data-q="tHide"></button><button class="btn tb eat" data-q="tEat"></button><button class="btn tb" data-q="tBook"></button></div>
      <div class="comic" data-q="comic"><b>!</b><span data-q="comicTxt"></span></div>`,this.root.querySelectorAll("[data-q]").forEach(i=>this.q[i.dataset.q]=i),this.map=this.q.map.getContext("2d"),this.toasts.id="toasts",e.append(this.root,this.toasts);const n=(i,r)=>Yh(this.q[i],o=>{this.q[i].classList.toggle("down",o),t.hold(r,o)});n("tEat","eat"),n("tHide","hide"),n("tBook","book"),this.q.i0.addEventListener("pointerdown",i=>{i.preventDefault(),t.item(0)}),this.q.i1.addEventListener("pointerdown",i=>{i.preventDefault(),t.item(1)}),this.q.here.addEventListener("pointerdown",i=>{i.preventDefault(),t.here()}),this.q.pause.addEventListener("click",()=>t.pause()),this.q.model.addEventListener("click",()=>t.toggleModel()),this.relabel()}root=Ae("div");q={};headDown=!1;map;toasts=Ae("div");lastPips="";lastSig="";relabel(){const e=this.q;e.lSight.textContent=N("hud.sight"),e.lSound.textContent=N("hud.sound"),e.lSmell.textContent=N("hud.smell"),e.lStrikes.textContent=N("hud.strikes"),e.tEat.textContent=N("btn.eat"),e.tHide.textContent=N("btn.hide"),e.tBook.textContent=N("btn.book"),e.here.textContent=N("btn.here"),e.behind.textContent=N("hud.behind"),e.pause.setAttribute("aria-label",N("btn.pause")),this.lastPips="",this.lastSig=""}show(e){this.root.classList.toggle("on",e),e||this.q.comic.classList.remove("on")}toggleTestPanel(){this.q.testPanel.hidden=!this.q.testPanel.hidden,this.q.signal.hidden=this.q.testPanel.hidden,this.q.model.hidden=this.q.testPanel.hidden}clearNotices(){this.toasts.replaceChildren(),this.q.comic.classList.remove("on"),this.q.comicTxt.textContent=""}setModelLabel(e,t){this.q.model.textContent=`${e?"● "+N("hud.tripo"):"○ "+N("hud.proc")}${t?"":" "+N("hud.noglb")}`}toast(e,t="",n=1600,i=!1){const r=Ae("div",`toast ${t}`);for(r.textContent=e,i&&r.classList.add("teacher-cue"),this.toasts.append(r);this.toasts.children.length>4;)this.toasts.firstChild.remove();setTimeout(()=>r.remove(),n)}comic(e,t){this.q.comicTxt.textContent=e,this.q.comic.classList.add("on"),setTimeout(()=>this.q.comic.classList.remove("on"),t)}update(e,t,n,i=!1){i&&!this.headDown&&this.toasts.querySelectorAll(".teacher-cue").forEach(p=>p.remove()),this.headDown=i;const r=this.q,o=e.teacher,a=!i||!r.testPanel.hidden;r.scene.textContent=N(`scene.${e.scene}`),r.lesson.textContent="· "+N("hud.lesson",{n:e.lessonIdx+1});const l=Math.ceil(e.timeLeft);r.timer.textContent=String(l),r.timer.classList.toggle("rush",l<=oe.lastRush),r.score.textContent=`${N("hud.score")} ${e.score}${e.combo?"  "+N("hud.combo",{n:(1+e.combo*oe.score.comboStep).toFixed(2)}):""}`,r.quotaTxt.textContent=N("hud.quota",{a:Math.min(e.servings,e.quota),b:e.quota})+(e.servings>e.quota?` (+${e.servings-e.quota})`:""),r.quota.style.width=`${Math.min(1,e.servings/e.quota)*100}%`;let c="s-safe",h=N(`sig.safe.${e.scene}`);o.state==="turning"?(c="s-turn",h=N("sig.turn")):o.state==="looking"?(c="s-look",h=N("sig.look")):o.state==="chalkAim"?(c="s-look",h=N("sig.chalk")):o.state==="sniff"?(c="s-patrol",h=N("sig.sniff")):o.state==="patrol"||o.state==="patrolPrep"?(c="s-patrol",h=N("sig.patrol")):(o.state==="rollPrep"||o.state==="rollcall")&&(c="s-roll",h=N("sig.roll")),c+h!==this.lastSig&&(this.lastSig=c+h,r.signal.className=`signal ${c}`,r.signal.textContent=h);const u=t.screenPos(t.teacherHead);r.susp.style.display=a&&u.visible?"block":"none",r.susp.style.left=`${u.x}px`,r.susp.style.top=`${u.y}px`;const d=e.susp/2,m=e.susp>=100?"#e23b2e":e.alert?"#f0a020":"#6fe07a";r.suspFill.style.background=`conic-gradient(from -90deg at 50% 100%, ${m} 0 ${d}%, transparent ${d}% 100%)`,r.suspTxt.textContent=String(Math.round(e.susp));for(let p=0;p<3;p++)r[`s${p}`].classList.toggle("on",e.strikes>p);const g=e.food;if(g){r.fname.textContent=`${q_[g.def.id]??""} ${nv(g.def.id,n)}`;const p=`${g.def.id}:${g.bitesLeft}:${g.total}`;p!==this.lastPips&&(this.lastPips=p,r.pips.innerHTML=Array.from({length:g.total},(E,M)=>`<i class="${M<g.bitesLeft?"":"off"}"></i>`).join(""),r.ftrait.textContent=iv(g.def));const f=e.stunT>0?"stun":e.sleepT>0?"sleep":e.foodState;r.fstate.className=`st ${e.foodState}`,r.fstate.textContent=e.prepping&&e.foodState==="eating"?N(`prep.${g.def.prep[g.prepStep].key}`):N(`state.${f}`),r.fprog.style.width=`${(e.prepping?g.prepProg/g.def.prep[g.prepStep].time:e.biteProg)*100}%`}for(let p=0;p<2;p++){const f=e.slots[p],E=r[`i${p}`],M=e.cds[p];E.classList.toggle("empty",!f);const v=f?`${N(`up.${f}.name`)}<b>${p?"E":"Q"}</b>${M>0?`<div class="cd">${Math.ceil(M)}</div>`:""}`:`<b>${p?"E":"Q"}</b>—`;E.dataset.h!==v&&(E.dataset.h=v,E.innerHTML=v),E.style.display=p===1&&e.slots.length<2&&!f?"none":""}const _=(o.state==="patrol"||o.state==="sniff")&&o.z>He+.4||e.extras.some(p=>p.z>He+.4&&Math.abs(p.x-qt(0))<4);if(r.behind.classList.toggle("on",a&&_&&e.phase==="play"),r.here.classList.toggle("on",a&&e.rollPending),r.count.textContent=e.phase==="countdown"?String(Math.ceil(e.countdown)):e.time<.7?N("count.go"):"",e.cam&&a){const p=e.cam.phase;r.cam.className=`campill on ${p==="on"?"live":p==="warn"?"warn":""}`,r.cam.textContent=`📹 ${N("hud.cam")}${p==="on"?" ● REC":""}`}else r.cam.className="campill";r.testPanel.hidden||(r.sight.style.height=`${e.sight*100}%`,r.sound.style.height=`${Math.min(1,e.sound)*100}%`,r.smell.style.height=`${Math.min(1,e.smell.at(it.col,it.row)/oe.smell.max)*100}%`,this.drawMap(e))}drawMap(e){const t=this.map,n=96,i=80,r=n/ri,o=(i-12)/wi;t.clearRect(0,0,n,i),t.fillStyle="#2f5d46",t.fillRect(8,0,n-16,6);for(let h=0;h<wi;h++)for(let u=0;u<ri;u++){const d=Math.min(1,e.smell.at(u,h)/1);t.fillStyle=`rgba(95,174,74,${d})`,t.fillRect(u*r+1,12+h*o+1,r-2,o-2),t.strokeStyle=u===it.col&&h===it.row?"#e23b2e":"#0003",t.lineWidth=u===it.col&&h===it.row?2:1,t.strokeRect(u*r+1.5,12+h*o+1.5,r-3,o-3)}const a=h=>(h-qt(0))/(qt(ri-1)-qt(0))*(n-r)+r/2,l=h=>12+(h-zt(0))/(zt(wi-1)-zt(0))*(i-12-o)+o/2,c=(h,u,d,m,g)=>{const _=a(h),p=Math.max(3,l(u));g&&(t.fillStyle=m+"55",t.beginPath(),t.moveTo(_,p),t.arc(_,p,26,Math.PI/2-d-.6,Math.PI/2-d+.6),t.fill()),t.fillStyle=m,t.beginPath(),t.arc(_,p,4,0,7),t.fill()};c(e.teacher.x,e.teacher.z,e.teacher.visionYaw,"#e23b2e",e.teacher.visionOn);for(const h of e.extras)c(h.x,h.z,h.yaw,"#8a5fd0",h.sees)}}const th=[{id:"en",name:"English",locale:"en"},{id:"zh",name:"简体中文",locale:"zh-CN"}];class rv{constructor(e,t){this.app=t,this.root.id="screen",e.append(this.root)}root=Ae("div");onEsc=null;storyTimer=0;get open(){return this.root.classList.contains("on")}clear(){cancelAnimationFrame(this.storyTimer),this.root.innerHTML="",this.root.className="",this.onEsc=null}mount(e,t=!0){return this.clear(),this.root.className=`on${t?" dim":""}`,this.root.append(e),e.querySelector("button:not(:disabled)")?.focus(),e}title(e,t){const n=Ae("div","titlebox panel");n.innerHTML=`<h1>${$i(N("title"))}</h1><div class="sub">${$i(N("subtitle"))}</div><ol><li>${$i(N("intro.1"))}</li><li>${$i(N("intro.2"))}</li><li>${$i(N("intro.3"))}</li></ol>`;const i=Ae("div","rowb");i.append(yt(N("start"),e),yt(N("settings"),()=>this.settings(()=>this.title(e)),"ghost"));const r=Ae("div","title-languages");r.setAttribute("role","group"),r.setAttribute("aria-label",N("set.lang"));const o=th.map(({id:a,name:l,locale:c})=>{const h=yt(l,()=>{a!==Ur()&&(this.app.save.settings.lang=a,this.app.applySettings(),this.title(e,a))},"small ghost");return h.lang=c,h.dataset.lang=a,h.setAttribute("aria-pressed",String(a===Ur())),h});r.append(Ae("span","",N("set.lang")),...o),n.append(i,r),this.mount(n,!1),o.find(a=>a.dataset.lang===t)?.focus()}settings(e){const t=this.app.save.settings,n=Ae("div","card panel");n.innerHTML=`<h2>${N("settings")}</h2>`;const i=(m,g)=>{const _=Ae("label","opt");_.append(g,document.createTextNode(m)),n.append(_)},r=Ae("select");for(const{id:m}of th)r.add(new Option(N(`lang.${m}`),m));r.value=Ur(),r.onchange=()=>{t.lang=r.value,this.app.applySettings(),this.settings(e)};const o=Ae("label","opt");o.append(document.createTextNode(N("set.lang")),r),n.append(o);const a=Ae("input");a.type="range",a.min="0",a.max="1",a.step="0.05",a.value=String(t.volume),a.oninput=()=>{t.volume=Number(a.value),this.app.applySettings(),this.app.sfx.click()};const l=Ae("label","opt");l.append(document.createTextNode(N("set.volume")),a),n.append(l);const c=(m,g)=>{const _=Ae("input");_.type="checkbox",_.checked=t[m],_.onchange=()=>{t[m]=_.checked,this.app.applySettings()},i(g,_)};c("muted",N("set.mute")),c("reduceMotion",N("set.reduce")),c("assist",N("set.assist"));let h=!1;const u=yt(N("set.clear"),()=>{if(!h){h=!0,u.textContent=N("set.clear2");return}this.app.clearSave(),u.textContent=N("set.cleared"),u.disabled=!0},"ghost small"),d=Ae("div","rowb");d.append(yt(N("back"),e),u),n.append(d),this.mount(n),this.onEsc=e}pause(){const e=Ae("div","card panel");e.innerHTML=`<h2>${N("paused")}</h2>`;const t=Ae("div","rowb");t.append(yt(N("resume"),()=>this.app.resume()),yt(N("settings"),()=>this.settings(()=>this.pause()),"ghost"),yt(N("quit"),()=>this.app.quitRun(),"ghost")),e.append(t),this.mount(e),this.onEsc=()=>this.app.resume()}hub(){const{save:e}=this.app,t=Ae("div","card panel");t.innerHTML=`<h2>${N("hub.title")}</h2><p><b>${N("hub.points",{n:e.points})}</b> · ${N("hub.best",{n:e.best})}</p><h3>${N("hub.scenes")}</h3>`;const n=Ae("div","grid");for(const a of Uo){const l=Tu(e,a),c=Ae("div",`tile ${l?"":"locked"}`);c.innerHTML=`<b>${N(`scene.${a}`)} ${e.cleared[a]?"✅":""}</b><span>${N(`scene.${a}.rule`)}</span>${l?"":`<span class="cn">🔒 ${N(`scene.need.${a}`)}</span>`}`;const h=yt(N(l?"enter":"locked"),()=>this.app.startScene(a),"small");h.disabled=!l,h.dataset.scene=a,c.append(h),n.append(c)}if(t.append(n),e.ngUnlocked){const a=Ae("input");a.type="checkbox",a.checked=e.ngOn,a.onchange=()=>{e.ngOn=a.checked,this.app.persist()};const l=Ae("label","opt");l.append(a,document.createTextNode(N("hub.ng"))),t.append(l)}t.append(Ae("h3","",N("hub.story")));const i=Ae("div","grid");for(const a of oh){const l=e.nodes.includes(a.id),c=a.cond(e),h=Ae("div",`tile ${l||c?"":"locked"}`);if(h.innerHTML=`<b>${N(`node.${a.id}.name`)} ${l?"✅":""}</b><span class="cn">${N(`node.${a.id}.cond`,{a:a.id==="bag"?e.stats.servings:e.stats.frames})}</span><span class="rw">${N(`node.${a.id}.reward`)}</span>`,l)h.append(yt(N("hub.replay"),()=>this.story(a.id,()=>this.hub()),"small ghost"));else{const u=yt(N("hub.unlock",{n:a.cost}),()=>{wu(e,a)&&(this.app.persist(),this.app.sfx.ding(),this.story(a.id,()=>this.hub()))},"small");u.disabled=!ah(e,a),u.dataset.node=a.id,h.append(u)}i.append(h)}t.append(i,Ae("h3","",N("hub.shop")));const r=Ae("div","grid");for(const a of Eu){const l=e.perks.includes(a.id),c=Ae("div","tile");c.innerHTML=`<b>${N(`perk.${a.id}.name`)}</b><span class="rw">${N(`perk.${a.id}.eff`)}</span>`;const h=yt(l?N("hub.owned"):N("hub.buy",{n:a.cost}),()=>{Au(e,a)&&(this.app.persist(),this.app.sfx.good(),this.hub())},"small");h.disabled=l||e.points<a.cost,h.dataset.perk=a.id,c.append(h),r.append(c)}const o=Ae("div","rowb");o.append(yt(N("settings"),()=>this.settings(()=>this.hub()),"ghost")),t.append(r,o),this.mount(t,!1)}story(e,t){const n=[];for(let P=0;P<20;P++){const T=`story.${e}.${P}`,y=N(T);if(y===T)break;n.push(y)}const i=Ae("div","sys");i.innerHTML='<div class="who"></div><div class="txt"></div><div class="rowb"></div><div class="skip"><i></i></div>';const r=i.querySelector(".who"),o=i.querySelector(".txt"),a=i.querySelector(".rowb"),l=i.querySelector(".skip i");let c=0,h=0,u="",d=performance.now(),m=0,g=!1,_=!1;const p=()=>{_||(_=!0,cancelAnimationFrame(this.storyTimer),window.removeEventListener("keydown",O),window.removeEventListener("keyup",R),this.clear(),t())},f=()=>{const[P,...T]=n[c].split("|");u=T.join("|"),h=0,r.textContent=N(`who.${P}`),i.classList.toggle("plain",P!=="sys"),P==="sys"&&this.app.sfx.ding()},E=()=>{if(h<u.length){h=u.length;return}c++,c>=n.length?p():f()},M=yt(N("continue")+" ▶",E,"small"),v=yt(N("skipHold"),()=>{},"small ghost");v.addEventListener("pointerdown",()=>g=!0);for(const P of["pointerup","pointerleave","pointercancel"])v.addEventListener(P,()=>g=!1);const O=P=>{P.code==="Escape"?g=!0:(P.code==="Space"||P.code==="Enter")&&!P.repeat&&document.activeElement!==M&&(P.preventDefault(),E())},R=P=>{P.code==="Escape"&&(g=!1)};window.addEventListener("keydown",O),window.addEventListener("keyup",R),a.append(M,v);const A=()=>{const P=performance.now(),T=(P-d)/1e3;if(d=P,h<u.length){const y=Math.floor(h);h=Math.min(u.length,h+T*32),Math.floor(h)>y&&Math.floor(h)%2===0&&this.app.sfx.type()}if(o.textContent=u.slice(0,Math.floor(h)),m=g?m+T:0,l.style.width=`${Math.min(1,m/.8)*100}%`,m>=.8){p();return}this.storyTimer=requestAnimationFrame(A)};if(!n.length){t();return}this.mount(i,!1),f(),M.focus(),this.storyTimer=requestAnimationFrame(A)}bell(e,t,n,i){if(n&&i.length)return this.pick(e,i);const r=Ae("div","card panel");r.innerHTML=`<h2>🔔 ${N("bell.title")}</h2><p>${N("bell.gain",{n:e})}</p>${t?"":`<p style="color:#c0392b">${N("bell.under")}</p>`}`;const o=Ae("div","rowb");o.append(yt(N("bell.next"),()=>this.app.nextLesson())),r.append(o),this.mount(r)}pick(e,t){const n=this.app.run,i=Ae("div","card panel");i.innerHTML=`<h2>🔔 ${N("pick.title")}</h2><p>${N("bell.gain",{n:e})}</p>`;const r=Ae("div","cards3");for(const o of t){const a=Ae("button","ucard");a.type="button",a.dataset.up=o.id;const l=uu(n.upgrades,o),c=N(`up.${o.id}.cost`);let h=`<span class="tag">${N(`tag.${o.tag}`)}${o.active?" · "+N("pick.active"):""}</span><span class="nm">${N(`up.${o.id}.name`)}</span><span>${N(`up.${o.id}.eff`)}</span>`;h+=c?`<span class="cost">${N("pick.cost",{cost:c})}</span>`:`<span class="free">${N("pick.free")}</span>`,l>=2&&(h+=`<span class="syn">★ ${N("pick.synergy",{tag:N(`tag.${o.tag}`),n:l,effect:N(`syn.${o.tag}`)})}</span>`),o.active&&n.slots.length>=n.maxSlots&&(h+=`<span class="syn">${N("pick.replace",{name:N(`up.${n.slots[0]}.name`)})}</span>`),a.innerHTML=h,a.onclick=()=>this.app.pickUpgrade(o.id),r.append(a)}i.append(r),this.mount(i)}over(e,t,n,i){const r=Ae("div","card panel");r.innerHTML=`<h2>${e==="parents"?"📞 "+N("over.parents"):"🎒 "+N("over.clear")}</h2>
      <p>${e==="parents"?N("over.parents.sub"):N("over.clear.sub",{scene:N(`scene.${t.scene}`),n:oe.score.dayClear})}</p>
      <p><b>${N("over.score",{n:t.score})}</b> ${i?"🏆 "+N("over.best"):""}</p><p>${N("over.stats",{a:t.servings,b:t.perfects})}</p><p>${N("over.points",{n})}</p>
      <p style="font-size:12px;opacity:.7">${t.upgrades.map(a=>N(`up.${Da[a].id}.name`)).join(" · ")}</p>`;const o=Ae("div","rowb");o.append(yt(N("toHub"),()=>this.app.toHub()),yt(N("retry"),()=>this.app.retry(),"ghost")),r.append(o),this.mount(r)}ending(e,t,n){const i=Ae("div","card panel");if(i.innerHTML=`<h2>${e==="grand"?"🏆":e==="ok"?"🍽️":"📞"} ${N(`end.${e}.title`)}</h2><p>${N(`end.${e}.text`)}</p><p><b>${"★".repeat(t)}${"☆".repeat(Math.max(0,9-t))}</b> ${N("end.stars",{n:t})}</p>${n?`<p style="color:#6a3fc0"><b>${N("end.ng")}</b></p>`:""}`,e==="grand"){const o=Ae("div","credits");o.innerHTML=`<div>${N("end.credits").split("|").map($i).join("<br>")}</div>`,i.append(o)}const r=Ae("div","rowb");r.append(yt(N("toHub"),()=>this.app.toHub())),e!=="grand"&&r.append(yt(N("retry"),()=>this.app.retry(),"ghost")),i.append(r),this.mount(i)}}const ov=["🥬","🥩","🍒"];class av{constructor(e,t){this.cb=t,this.root.id="fin",this.root.innerHTML=`<div class="stars panel" data-q="stars"></div><div class="signal s-safe" data-q="signal" role="status" aria-live="polite"></div>
      <button class="btn small pausebtn" data-q="pause">⏸</button>
      <div class="crave panel"><span data-q="craveL"></span><div class="bar"><i data-q="crave"></i></div></div>
      <div class="finbox panel"><div class="hd"><span data-q="dish"></span><span class="dots" data-q="dots"></span></div><div data-q="hint" style="font-size:13px;margin-top:4px"></div><div data-q="w"></div>
      <div class="rowb" style="justify-content:center"><button class="btn" data-q="act"></button><button class="btn" data-q="serve" style="background:#6fc3ff;font-size:20px"></button></div></div>`,this.root.querySelectorAll("[data-q]").forEach(n=>this.q[n.dataset.q]=n),e.append(this.root),Yh(this.q.act,n=>n?this.space(!0):this.space(!1)),this.q.serve.addEventListener("click",()=>t.serve()),this.q.pause.addEventListener("click",()=>t.pause())}root=Ae("div");q={};key="";placedLocal=0;cur=0;sig="";show(e){this.root.classList.toggle("on",e),this.key=""}relabel(){this.key="",this.sig="",this.q.pause.setAttribute("aria-label",N("btn.pause"))}f=null;space(e){const t=this.f;if(!t||t.phase!=="cook")return;const n=t.step_;if(n)if(n.kind==="drag"){if(e){const i=Math.abs(this.cur-.78);this.cb.place(Math.max(.2,1-i*5))}}else e?this.cb.press():this.cb.release()}update(e,t){this.f=e;const n=this.q,i=e.dish,r=e.step_;n.stars.textContent=`${N("fin.title")}  ${e.stars.map(c=>"★".repeat(c)+"☆".repeat(3-c)).join(" | ")}`,n.craveL.textContent=`${N("fin.crave")} ${Math.round(e.crave)}`,n.crave.style.width=`${e.crave}%`;let o="s-safe",a=N("sig.safe.office");if(e.phase==="approach"?(o="s-patrol",a=N("sig.come")):e.phase==="serve"?(o="s-roll",a=N("sig.serve")):e.dState==="turning"?(o="s-turn",a=N("sig.turn")):e.dState==="looking"&&(o="s-look",a=N("sig.look")),o+a!==this.sig&&(this.sig=o+a,n.signal.className=`signal ${o}`,n.signal.textContent=a),n.serve.style.display=e.phase==="serve"?"":"none",n.serve.textContent=`${N("btn.serve")} (Enter)`,!i){n.dish.textContent="",n.w.innerHTML="",n.act.style.display="none";return}n.dish.textContent=`${N(`fin.dish.${i.key}`)}${r?" · "+N(`fin.step.${r.key}`):""}`,n.dots.innerHTML=i.steps.map((c,h)=>`<i class="${h<e.stepI?"done":h===e.stepI?"cur":""}"></i>`).join("");const l=`${e.dishI}:${e.stepI}:${e.phase==="cook"?"c":"x"}:${r?.kind==="drag"&&e.placed<this.placedLocal?"r"+t:""}`;if(r?.kind==="drag"&&e.placed<this.placedLocal&&(this.placedLocal=e.placed),l!==this.key&&(this.key=l,this.build(e)),n.act.style.display=e.phase==="cook"&&r?"":"none",e.phase!=="cook"||!r){n.hint.textContent=e.phase==="react"?N("fin.served",{n:e.lastReact}):e.dishDone||e.phase!=="cook"?N("fin.wait"):"";return}if(n.hint.textContent=N(`fin.${r.kind}`),r.kind==="hold")n.w.querySelector(".fill").style.width=`${Math.min(1,e.prog)*100}%`;else if(r.kind==="rhythm"){const c=(Si+.5)*ks;n.w.querySelector(".mk").style.left=`${Math.min(1,e.prog/c)*100}%`,n.w.querySelectorAll(".beats i").forEach((h,u)=>{h.classList.toggle("hit",e.active&&u<e.beat&&u<e.hits+(e.beat-e.hits>0,0)),e.active||(h.className="")})}else this.cur=.5+Math.sin(t*2.4)*.45,n.w.querySelector(".kcur").style.left=`${this.cur*100}%`,n.w.querySelectorAll(".dragitem").forEach((c,h)=>c.classList.toggle("done",h<e.placed))}build(e){const t=this.q.w,n=e.step_;if(t.innerHTML="",this.q.act.textContent=n?N(`fin.act.${n.kind}`):"",!(e.phase!=="cook"||!n))if(n.kind==="hold")t.innerHTML=`<div class="hbar"><div class="zone" style="left:${Er[0]*100}%;width:${(Er[1]-Er[0])*100}%"></div><div class="fill"></div></div>`;else if(n.kind==="rhythm"){const i=(Si+.5)*ks;t.innerHTML=`<div class="beats">${Array.from({length:Si},(r,o)=>`<i style="position:absolute;left:calc(${(o+1)*ks/i*100}% - 17px)"></i>`).join("")}<div class="mk"></div></div>`}else{this.placedLocal=0;const i=Ae("div","dragbox pe");i.innerHTML='<div class="plate"></div><div class="kcur"></div>';for(let r=0;r<Fo;r++){const o=Ae("div","dragitem pe");o.textContent=ov[r];const a=14+r*46,l=42;o.style.left=`${a}px`,o.style.top=`${l}px`;let c=0,h=0,u=!1;o.addEventListener("pointerdown",m=>{m.preventDefault(),u=!0,c=m.clientX-a,h=m.clientY-l,o.setPointerCapture(m.pointerId),this.cb.dragStart()}),o.addEventListener("pointermove",m=>{u&&(o.style.left=`${m.clientX-c}px`,o.style.top=`${m.clientY-h}px`)});const d=()=>{if(!u)return;u=!1;const m=i.querySelector(".plate").getBoundingClientRect(),g=o.getBoundingClientRect(),_=g.left+g.width/2-(m.left+m.width/2),p=g.top+g.height/2-(m.top+m.height/2),f=Math.hypot(_,p);f<m.width/2+6?(this.placedLocal++,o.style.pointerEvents="none",this.cb.place(Math.max(.3,1-f/(m.width*.9)))):(o.style.left=`${a}px`,o.style.top=`${l}px`)};o.addEventListener("pointerup",d),o.addEventListener("pointercancel",d),i.append(o)}t.append(i)}}static dishCount=No.length}class lv{save=bu(localStorage);sfx=new Zx;world;hud;screens;fin;ui=document.getElementById("ui");hold=new xu;clock=new vu;run=null;lesson=null;finale=null;demo=null;mode="title";paused=!1;noAutoPause=!1;god=!1;fixedSeed=null;lastScene="classroom";last=performance.now();squeakT=0;heardT=0;frames=[];dbg=Ae("div","panel");dbgPerf=Ae("div");swipe=new Map;listener={x:je,z:He};get headDown(){const e=this.lesson;return this.mode==="lesson"&&!this.paused&&e!==null&&(e.phase==="play"||e.phase==="freeze")&&(this.hold.input.eat||e.locked)}constructor(){const e=document.getElementById("game");this.world=new Kx(e),this.hud=new sv(this.ui,{hold:(t,n)=>{this.sfx.unlock(),this.mode==="lesson"&&!this.paused&&this.hold.set(t,"touch",n)},item:t=>this.useItem(t),here:()=>this.lesson?.answerRoll(),pause:()=>this.togglePause(),toggleModel:()=>this.toggleModel()}),this.fin=new av(this.ui,{press:()=>this.finale?.press(),release:()=>this.finale?.release(),place:t=>this.finale?.place(t),dragStart:()=>this.finale?.dragStart(),serve:()=>this.finale?.serve(),pause:()=>this.togglePause()}),this.screens=new rv(this.ui,this),this.applySettings(),this.bindInput(e),this.showTitle(),Hx().then(()=>{Rs()>0&&(this.world.rebuildSlots(this.lesson??this.demo??void 0),this.hud.toast(N("toast.models",{n:Rs()}),"good",2500)),this.hud.setModelLabel(this.save.settings.tripo,Rs())}),requestAnimationFrame(t=>this.frame(t))}persist(){Mu(localStorage,this.save)}applySettings(){const e=this.save.settings,t=Ur()!==e.lang;tv(e.lang),this.sfx.setVolume(e.volume,e.muted),this.world.reduceMotion=e.reduceMotion,this.world.setTripo(e.tripo),document.body.classList.toggle("reduce",e.reduceMotion),t&&this.hud.clearNotices(),(t||!this.dbg.isConnected)&&this.buildDebug(),this.hud.relabel(),this.fin.relabel(),this.hud.setModelLabel(e.tripo,Rs()),this.hold.cancelAll(),this.persist()}clearSave(){Su(localStorage);const e=this.save.settings;this.save=Bs(),this.save.settings=e,this.persist()}toggleModel(){const e=this.save.settings;e.tripo=!e.tripo,this.world.setTripo(e.tripo),this.hud.setModelLabel(e.tripo,Rs()),this.persist()}seed(){return this.fixedSeed??(Math.random()*2**31|0)+1}showTitle(){this.mode="title",this.hud.show(!1),this.fin.show(!1),this.demo=new ko({scene:"classroom",lessonIdx:0,seed:1}),this.world.setScene("classroom",this.demo),this.screens.title(()=>{this.sfx.unlock(),this.sfx.click(),this.save.seenIntro?this.toHub():(this.save.seenIntro=!0,this.persist(),this.screens.story("intro",()=>this.startScene("classroom")))})}toHub(){this.mode="hub",this.paused=!1,this.run=null,this.lesson=null,this.finale=null,this.demo=null,this.hold.cancelAll(),this.hud.show(!1),this.fin.show(!1),this.sfx.music(!1),this.sfx.heartRate=0,this.world.setScene("bedroom"),this.screens.hub()}startScene(e){if(this.sfx.unlock(),this.lastScene=e,this.demo=null,this.paused=!1,e==="office")return this.startFinale();this.run=new fu({scene:e,seed:this.seed(),perks:this.save.perks,nodes:this.save.nodes,assist:this.save.settings.assist,ng:this.save.ngOn,god:this.god}),this.beginLesson()}beginLesson(){const e=this.run;this.lesson=e.startLesson(),this.world.setScene(e.scene,this.lesson),this.screens.clear(),this.fin.show(!1),this.hud.show(!0),this.mode="lesson",this.hold.cancelAll(),this.clock.acc=0,this.squeakT=0,this.sfx.music(!0),this.sfx.tempo=1}nextLesson(){this.run.next(),this.beginLesson()}pickUpgrade(e){this.sfx.good(),this.run.pick(e),this.nextLesson()}retry(){this.startScene(this.lastScene)}quitRun(){this.toHub()}endLesson(){const e=this.run;this.hold.cancelAll(),this.sfx.heartRate=0,this.sfx.music(!1);const t=e.endLesson();if(e.over)return this.finishRun();this.mode="bell",this.sfx.bell(),this.screens.bell(t.gained,t.quotaMet,t.canPick,t.canPick?e.choices():[])}finishRun(){const e=this.run,t=this.save;this.mode="over";const n=lu(e.score,t.perks.includes("interest")?1.2:1),i=e.score>t.best;t.points+=n,t.best=Math.max(t.best,e.score),t.stats.servings+=e.servings,t.stats.frames+=e.frames,t.stats.runs++,e.over==="clear"?(t.cleared[e.scene]=!0,this.sfx.trumpet()):this.sfx.bad(),this.persist(),this.world.shatter(je,1,He-.5),this.screens.over(e.over,e,n,i)}startFinale(){this.finale=new _u(this.seed(),this.save.settings.assist),this.lesson=null,this.run=null,this.world.setScene("office"),this.screens.clear(),this.hud.show(!1),this.fin.show(!0),this.mode="finale",this.clock.acc=0,this.sfx.music(!0),this.sfx.tempo=1.1,this.hud.toast(N("fin.intro"),"warn",7e3)}showEnding(e){const t=gu(e),n=this.save;this.mode="ending",this.sfx.music(!1);const i=t==="grand"&&!n.ngUnlocked;n.ending=t,t==="grand"?(n.cleared.office=!0,n.ngUnlocked=!0,this.sfx.trumpet(),this.world.shatter(0,1.2,3.8)):t==="ok"?this.sfx.good():this.sfx.bad(),this.persist(),this.fin.show(!1),this.screens.ending(t,e,i)}togglePause(){if(!(this.mode!=="lesson"&&this.mode!=="finale")){if(this.paused)return this.resume();this.paused=!0,this.hold.cancelAll(),this.finale?.release(),this.sfx.heartRate=0,this.screens.pause()}}resume(){this.paused=!1,this.hold.cancelAll(),this.screens.clear(),this.last=performance.now()}useItem(e){this.mode!=="lesson"||this.paused||!this.lesson||!this.lesson.useItem(e)&&this.lesson.slots[e]&&this.hud.toast(N("toast.cant"),"warn",700)}bindInput(e){const t={Space:"eat",KeyS:"hide",ArrowDown:"hide",KeyB:"book"};window.addEventListener("keydown",o=>{if(o.code==="Backquote"){this.dbg.classList.toggle("on");return}const a=o.target?.tagName;if(this.screens.open){o.code==="Escape"&&!o.repeat&&this.screens.onEsc?.();return}if(!(a==="INPUT"||a==="SELECT")){if(this.sfx.unlock(),o.code==="Escape"||o.code==="KeyP"){o.repeat||this.togglePause();return}if(!this.paused)if(this.mode==="lesson"){if(o.code==="Period"||o.key==="。"||o.key==="."){!o.repeat&&!o.ctrlKey&&!o.metaKey&&!o.altKey&&(o.preventDefault(),this.hud.toggleTestPanel());return}const l=t[o.code];if(l)o.preventDefault(),this.hold.set(l,o.code,!0);else{if(o.repeat)return;o.code==="KeyQ"?this.useItem(0):o.code==="KeyE"?this.useItem(1):(o.code==="Enter"||o.code==="KeyF")&&this.lesson?.answerRoll()}}else this.mode==="finale"&&(o.code==="Space"?(o.preventDefault(),o.repeat||this.fin.space(!0)):(o.code==="Enter"||o.code==="KeyF")&&!o.repeat&&this.finale?.serve())}}),window.addEventListener("keyup",o=>{const a=t[o.code];a&&this.hold.set(a,o.code,!1),o.code==="Space"&&this.mode==="finale"&&!this.paused&&this.fin.space(!1)}),e.addEventListener("pointerdown",o=>{this.sfx.unlock(),!(this.mode!=="lesson"||this.paused)&&(o.preventDefault(),o.button===2?this.hold.set("book",`p${o.pointerId}`,!0):(this.hold.set("eat",`p${o.pointerId}`,!0),this.swipe.set(o.pointerId,o.clientY)))}),e.addEventListener("pointermove",o=>{const a=this.swipe.get(o.pointerId);a!==void 0&&o.pointerType==="touch"&&o.clientY-a>44&&(this.swipe.delete(o.pointerId),this.hold.set("eat",`p${o.pointerId}`,!1),this.hold.set("hide","swipe",!0),setTimeout(()=>this.hold.set("hide","swipe",!1),350))});const n=o=>{this.hold.set("eat",`p${o.pointerId}`,!1),this.hold.set("book",`p${o.pointerId}`,!1),this.swipe.delete(o.pointerId)};window.addEventListener("pointerup",n),window.addEventListener("pointercancel",n),e.addEventListener("contextmenu",o=>o.preventDefault());const i=()=>{this.hold.cancelAll(),this.finale?.release(),!this.noAutoPause&&(this.mode==="lesson"||this.mode==="finale")&&!this.paused&&!this.screens.open&&this.togglePause()};window.addEventListener("blur",i),document.addEventListener("visibilitychange",()=>{document.hidden&&i()});const r=()=>{this.world.resize(),document.body.classList.toggle("touchmode",matchMedia("(pointer: coarse)").matches||innerWidth<700)};window.addEventListener("resize",r),r()}onEvents(e,t){const n=this.hud,i=this.sfx,r=this.headDown,o=(a,l="warn",c)=>{r||n.toast(N(a),l,c,!0)};for(const a of e)switch(this.world.onLessonEvent(a,t),a.type){case"start":i.good();break;case"bite":i.chew(a.chew);break;case"burp":i.burp(),n.toast(N("toast.burp"),"warn");break;case"takeout":case"stow":t.has("quietbag")||i.rustle();break;case"heard":this.heardT<=0&&(this.heardT=1.2,o("toast.heard","warn",900));break;case"classmateTurn":o("toast.turn");break;case"turnWarn":a.from==="write"&&t.scene==="classroom"&&i.chalkTap(),!r&&!a.silent&&i.warn();break;case"look":r||i.look();break;case"clap":r||i.clap();break;case"rollStart":case"rollName":r||i.roll();break;case"rollYou":r||(i.roll(),i.warn(),o("toast.rollYou"));break;case"rollOk":i.good(),n.toast(N(a.monitor?"toast.monitor":"toast.rollOk"),"good");break;case"rollMiss":i.bad(),n.toast(N("toast.rollMiss",{n:oe.score.rollMiss}),"bad");break;case"mumble":n.toast(N("toast.mumble"),"bad",2e3);break;case"chalkAim":r||i.warn(),o(t.cfg.book?"toast.chalk":"toast.stare","bad",900);break;case"chalkThrow":r||i.whoosh();break;case"chalkBlock":i.block(),n.toast(a.reflect?N("toast.reflect",{n:oe.score.reflect}):N("toast.block"),"good");break;case"chalkHit":i.slap(),n.toast(N("toast.hit"),"bad");break;case"sniff":r||i.sniff(),a.me&&o("toast.sniff","bad");break;case"frame":n.toast(N("toast.frame"),"good");break;case"npcCaught":o("toast.npcCaught","",2200),r||i.look();break;case"tattle":r||i.bad(),o("toast.tattle","bad");break;case"stare":o("toast.stare","bad");break;case"serving":i.good(),n.toast(N("toast.serving",{n:a.bonus}),"good"),a.quotaMet&&(i.ding(),n.toast(N("toast.quota"),"good",2400));break;case"perfect":i.ding(),n.toast(N("toast.perfect",{n:a.bonus}),"good");break;case"prep":i.click();break;case"sizzle":i.sizzle();break;case"item":i.whoosh(),a.id==="share"&&n.toast(N("toast.shield"),"good");break;case"caught":i.caught(),n.comic(N(a.why==="roll"?"toast.mumble":"toast.caught"),oe.caughtFreeze*1e3),a.free&&n.toast(N("toast.free"),"good",2200);break}}onFinaleEvents(e){const t=this.hud,n=this.sfx;for(const i of e)switch(i.type){case"turnWarn":n.warn();break;case"look":n.look();break;case"stepStart":n.click();break;case"beatHit":n.chew("crunch");break;case"beatMiss":n.bad();break;case"placed":n.click();break;case"stepDone":i.q>.7?n.good():n.click();break;case"interrupt":n.bad(),t.toast(N("toast.interrupt"),"bad");break;case"approach":n.sniff();break;case"serveWindow":n.ding();break;case"served":n.horn(),this.world.bang(0,0),t.toast(N("fin.served",{n:i.stars}),"good",2e3);break;case"serveMiss":n.bad(),t.toast(N("fin.miss"),"bad");break;case"finaleDone":this.showEnding(i.total);break}}frame(e){requestAnimationFrame(r=>this.frame(r));const t=e-this.last;this.last=e;const n=Math.min(.1,t/1e3);this.world.perfTick(t),this.frames.push(t),this.frames.length>600&&this.frames.shift(),this.clock.paused=this.paused,this.heardT-=n;const i=!this.paused;if(this.mode==="title"&&this.demo)this.clock.tick(n,r=>{this.demo.step(r,{eat:!1,hide:!1,book:!1}),this.demo.drain()}),this.demo.phase==="over"&&(this.demo=new ko({scene:"classroom",lessonIdx:0,seed:1})),this.world.syncLesson(this.demo,n);else if((this.mode==="lesson"||this.mode==="bell"||this.mode==="over")&&this.lesson){const r=this.lesson;if(this.mode==="lesson"){if(this.clock.tick(n,a=>{r.step(a,this.hold.input),this.onEvents(r.drain(),r)}),i){const a=r.teacher,l=r.phase==="play";this.sfx.heartRate=l&&!this.headDown&&r.susp>=60?1.3+(r.susp-60)/40*1.7:0,this.sfx.tempo=r.timeLeft<=oe.lastRush?1.4:1,l&&a.state==="write"&&(this.squeakT-=n,this.squeakT<=0&&(this.squeakT=.18+Math.random()*.16,r.scene==="classroom"?this.sfx.chalkSqueak():this.sfx.pageTurn())),this.sfx.trackFootsteps(a,l&&a.state==="patrol"&&a.pauseT<=0,this.listener);for(const c of r.extras)this.sfx.trackFootsteps(c,l&&!c.sniffing,this.listener)}r.phase==="over"&&this.endLesson()}const o=this.headDown;i&&this.world.syncLesson(r,n,o),this.hud.update(r,this.world,this.save.ngOn,o)}else if(this.mode==="hub")this.world.syncBedroom(n);else if((this.mode==="finale"||this.mode==="ending")&&this.finale){const r=this.finale;this.mode==="finale"&&this.clock.tick(n,o=>{r.step(o),this.onFinaleEvents(r.drain())}),i&&this.world.syncFinale(r,n),this.mode==="finale"&&this.fin.update(r,e/1e3)}this.sfx.listenForTeacher(this.headDown),this.sfx.update(i?n:0),this.world.render(i?n:0),this.dbg.classList.contains("on")&&(this.dbgPerf.textContent=`${N("dbg.perf")}: ${this.perf().avg.toFixed(1)} ms (p95 ${this.perf().p95.toFixed(1)}) · PR ${this.world.pixelRatio}`)}perf(){const e=this.frames.slice().sort((n,i)=>n-i);return{avg:e.reduce((n,i)=>n+i,0)/Math.max(1,e.length),p95:e[Math.floor(e.length*.95)]??0,n:e.length}}buildDebug(){const e=this.dbg;e.id="debug",e.innerHTML=`<b>${N("dbg.title")}</b>`,e.append(this.dbgPerf);const t=(...o)=>{const a=Ae("div","rowb");a.append(...o),e.append(a)},n=(o,a)=>yt(o,a,"small ghost"),i=Ae("input");i.type="number",i.placeholder=N("dbg.seed"),i.style.width="90px",i.value=this.fixedSeed===null?"":String(this.fixedSeed),i.onchange=()=>this.fixedSeed=i.value?Number(i.value):null;const r=n(N("dbg.god"),()=>{this.god=!this.god,this.lesson&&(this.lesson.god=this.god),r.style.background=this.god?"#6fe07a":""});r.style.background=this.god?"#6fe07a":"",t(i,r,n(N("dbg.points"),()=>{this.save.points+=500,this.persist(),this.mode==="hub"&&this.screens.hub()})),t(n(N("dbg.unlock"),()=>{for(const o of Uo)o!=="office"&&(this.save.cleared[o]=!0);for(const o of oh)this.save.nodes.includes(o.id)||this.save.nodes.push(o.id);this.persist(),this.mode==="hub"&&this.screens.hub()}),...Uo.map(o=>n(N(`scene.${o}`),()=>this.startScene(o)))),t(n(N("dbg.quota"),()=>{this.lesson&&(this.lesson.servings=this.lesson.quota)}),n(N("dbg.skip"),()=>{this.lesson&&(this.lesson.time=oe.lessonTime-.5)}),n(N("dbg.caught"),()=>this.lesson?.caught("sight")),n(N("dbg.chalk"),()=>{const o=this.lesson;o&&(o.chalkCd=0,o.teacher.startChalk())}),n(N("dbg.patrol"),()=>{const o=this.lesson?.teacher;o&&(o.patrols++,o.enter("patrolPrep",oe.teacher.patrolPrep))}),n(N("dbg.roll"),()=>{const o=this.lesson?.teacher;o&&o.enter("rollPrep",oe.teacher.rollPrep)}),n("👃",()=>{const o=this.lesson;o&&o.smell.emit(0,3,1.2)})),t(...[9,5,3].map(o=>n(`${N("dbg.end")} ${o}★`,()=>{this.finale||this.startFinale(),this.showEnding(o)}))),this.ui.append(e)}}window.__game=new lv;
