"use strict";(self.webpackChunkfront_end=self.webpackChunkfront_end||[]).push([[162],{7403:(O,C,i)=>{i.d(C,{N:()=>x});var e=i(9862),d=i(4946),n=i(347);let x=(()=>{var u;class m{constructor(){this.http=(0,d.f3M)(e.eN)}getCart(){this.http.get(`${n.rH.URL}/cart/get-cart`).subscribe(c=>console.log(c))}makeOrder(c,f){this.http.post(`${n.rH.URL}/cart/add-to-cart`,{id:c,quantity:f}).subscribe(h=>console.log(h))}}return(u=m).\u0275fac=function(c){return new(c||u)},u.\u0275prov=d.Yz7({token:u,factory:u.\u0275fac}),m})()},8493:(O,C,i)=>{i.d(C,{K:()=>c});var e=i(9862),d=i(4946),n=i(347),x=i(4009),u=i(7398),m=i(6306),g=i(9397);let c=(()=>{var f;class h{constructor(){this.http=(0,d.f3M)(e.eN),this.httpErrorHandler=(0,d.f3M)(x.G)}getUsers(){return this.http.get(`${n.rH.URL}/user/all`).pipe((0,u.U)(_=>_.payload),(0,m.K)(this.httpErrorHandler.handleError("\u041d\u0435\u0432\u0434\u0430\u043b\u043e\u0441\u044f \u043e\u0442\u0440\u0438\u043c\u0430\u0442\u0438 \u043a\u043e\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0456\u0432!")))}getUserById(_){return this.http.get(`${n.rH.URL}/user/${_}`).pipe((0,u.U)(y=>y),(0,m.K)(this.httpErrorHandler.handleError("\u041d\u0435\u0432\u0434\u0430\u043b\u043e\u0441\u044f \u043e\u0442\u0440\u0438\u043c\u0430\u0442\u0438 \u043a\u043e\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430!")))}updateUser(_){return this.http.put(`${n.rH.URL}/user/profile`,_).pipe((0,g.b)(y=>{localStorage.setItem("user",JSON.stringify(y.payload)),localStorage.setItem("update","user was updated")}),(0,m.K)(this.httpErrorHandler.handleError("\u041d\u0435\u0432\u0434\u0430\u043b\u043e\u0441\u044f \u043e\u043d\u043e\u0432\u0438\u0442\u0438 \u0434\u0430\u043d\u0456!")))}}return(f=h).\u0275fac=function(_){return new(_||f)},f.\u0275prov=d.Yz7({token:f,factory:f.\u0275fac,providedIn:"root"}),h})()},9162:(O,C,i)=>{i.d(C,{I:()=>I});var e=i(4946),d=i(6814),n=i(95),x=i(2413),u=i(8493),m=i(1230),g=i(5693);const c=(o,a)=>{const s=JSON.parse(localStorage.getItem("user"));if(a)for(const r in a)o.get(r)?.setValue(""),(0,m.J)(o,r);console.log(s);for(const r in s)o.get(r)&&s[r]&&(o.get(r)?.setValue(s[r]),(0,m.J)(o,r))};var f=i(5516);const h="https://api.novaposhta.ua/v2.0/json/",M=(o,a)=>fetch(o,{method:"POST",headers:{"Content-type":"application/json"},body:JSON.stringify(a)});var P=i(6247),Z=i(7403);function F(o,a){if(1&o){const s=e.EpF();e.TgZ(0,"li",47),e.NdJ("click",function(){const l=e.CHM(s).$implicit,p=e.oxw(2);return e.KtG(p.chosenAddress(l))}),e._uU(1),e.qZA()}if(2&o){const s=a.$implicit;e.xp6(1),e.HOy(" ",s.SettlementTypeDescription," ",s.Description," ",s.RegionsDescription," ",s.AreaDescription," ")}}function A(o,a){if(1&o&&(e.TgZ(0,"div",44)(1,"ul",45),e.YNc(2,F,2,4,"li",46),e.qZA()()),2&o){const s=e.oxw();e.xp6(2),e.Q6J("ngForOf",s.addresses)}}function T(o,a){if(1&o){const s=e.EpF();e.TgZ(0,"li",51),e.NdJ("click",function(){const l=e.CHM(s).$implicit,p=e.oxw(2);return e.KtG(p.chosenDepartment(l))}),e._uU(1),e.qZA()}if(2&o){const s=a.$implicit;e.xp6(1),e.AsE(" ",s.city," ",s.description," ")}}function w(o,a){if(1&o&&(e.TgZ(0,"div",48)(1,"ul",49),e.YNc(2,T,2,2,"li",50),e.qZA()()),2&o){const s=e.oxw();e.xp6(2),e.Q6J("ngForOf",s.departments)}}const E=function(o){return{hidden:o}},k=["*"];let I=(()=>{var o;class a{constructor(){this.fb=(0,e.f3M)(n.qu),this.router=(0,e.f3M)(x.F0),this.route=(0,e.f3M)(x.gz),this.userService=(0,e.f3M)(u.K),this.cartService=(0,e.f3M)(Z.N),this.phoneHolder="+380",this.addresses=[],this.isChosen=!1,this.isDepartment=!1,this.isValid=m.J,this.isCart=!1,this.infoForm=this.fb.group({name:["",[n.kI.required,n.kI.minLength(3),n.kI.maxLength(30),(0,g.qg)()]],lastName:["",[n.kI.required,n.kI.minLength(3),n.kI.maxLength(30),(0,g.qg)()]],email:["",[n.kI.required,n.kI.email,(0,g.Le)()]],address:["",[n.kI.required]],phone:["",[n.kI.required,n.kI.minLength(9),n.kI.maxLength(9),(0,g.tH)()]],password:["",[n.kI.required,n.kI.minLength(8),n.kI.maxLength(16),(0,g.ym)()]],department:[""],deliveryMethod:["",[n.kI.required]]})}ngOnInit(){c(this.infoForm),this.route.url.subscribe(r=>{r[0]&&(this.path=r[0].path)})}ngAfterViewChecked(){"\u041d\u043e\u0432\u0430 \u043f\u043e\u0448\u0442\u0430"===this.infoForm.get("deliveryMethod")?.value&&(this.infoForm.get("department")?.addValidators(n.kI.required),this.infoForm.get("department")?.updateValueAndValidity()),"\u041d\u043e\u0432\u0430 \u043f\u043e\u0448\u0442\u0430"!==this.infoForm.get("deliveryMethod")?.value&&(this.infoForm.get("department")?.removeValidators(n.kI.required),this.infoForm.get("department")?.updateValueAndValidity())}getAddress(r){r&&((o=>(console.log(o),M(h,{apiKey:f.N.novaPoshta,modelName:"Address",calledMethod:"getSettlements",methodProperties:{FindByString:o}})))(r).then(t=>t.json()).then(t=>this.addresses=t.data),this.isChosen=!0)}chosenAddress(r){const{Description:t,AreaDescription:l,SettlementTypeDescription:p,RegionsDescription:v,Ref:U}=r;this.infoForm.get("address")?.setValue(`${p} ${t} ${v} ${l}`),this.getDepartments(t,U),this.isDepartment=!1,this.isChosen=!1}updateUser(){this.userService.updateUser(this.infoForm.value).subscribe(()=>{c(this.infoForm,this.infoForm.controls)})}makeOrder(){this.cartService.makeOrder("",3)}onSubmit(){}cancel(){c(this.infoForm,this.infoForm.controls)}getDepartments(r,t=""){r&&((o,a)=>M(h,{apiKey:f.N.novaPoshta,modelName:"Address",calledMethod:"getWarehouses",methodProperties:{CityName:o,SettlementRef:a}}))(r,t).then(l=>l.json()).then(l=>(this.isDepartment=!0,this.departments=l.data.filter(p=>"Postomat"!==p.CategoryOfWarehouse).map(p=>({city:p.CityDescription,description:p.Description})))).catch(l=>{console.error(l)})}chosenDepartment(r){r&&(this.infoForm.get("department")?.setValue(`${r.city} ${r.description}`),this.isDepartment=!1)}redirectToContact(){this.router.navigate(["/about/contact"])}onblur(){this.clearTimeOut=setTimeout(()=>{clearTimeout(this.clearTimeOut),this.isChosen=!1,this.isDepartment=!1},100)}ngOnDestroy(){clearTimeout(this.clearTimeOut)}}return(o=a).\u0275fac=function(r){return new(r||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-info-form"]],inputs:{isCart:"isCart"},standalone:!0,features:[e.jDz],ngContentSelectors:k,decls:84,vars:23,consts:[[1,"user__info-title"],["autocomplete","on",1,"user__form",3,"formGroup","ngSubmit"],[1,"user__wrap-input",3,"ngClass"],["type","text","formControlName","name","placeholder","\u0406\u043c'\u044f *",1,"user__input"],[3,"control"],["type","text","formControlName","lastName","placeholder","\u041f\u0440\u0456\u0437\u0432\u0438\u0449\u0435 *",1,"user__input"],["type","email","formControlName","email","placeholder","Email *",1,"user__input"],["xmlns","http://www.w3.org/2000/svg","width","23","height","23","viewBox","0 0 23 23","fill","none"],["clip-path","url(#clip0_421_659)"],["d","M20.4444 3.19446H2.55556C1.87778 3.19446 1.22776 3.4637 0.748505 3.94296C0.269245 4.42222 0 5.07224 0 5.75001L0 11.5H23V5.75001C23 5.07224 22.7308 4.42222 22.2515 3.94296C21.7722 3.4637 21.1222 3.19446 20.4444 3.19446Z","fill","#005BBB"],["d","M23 17.25C23 17.9278 22.7308 18.5778 22.2515 19.0571C21.7722 19.5363 21.1222 19.8056 20.4444 19.8056H2.55556C1.87778 19.8056 1.22776 19.5363 0.748505 19.0571C0.269245 18.5778 0 17.9278 0 17.25V11.5H23V17.25Z","fill","#FFD500"],["id","clip0_421_659"],["width","23","height","23","fill","white"],[1,"phone-holder"],["type","text","formControlName","phone",1,"user__input"],["type","text","formControlName","address","placeholder","\u0410\u0434\u0440\u0435\u0441\u0430 *",1,"user__input",3,"value","keyup","blur"],["addr",""],[3,"ngClass"],["type","password","formControlName","password","placeholder","\u041f\u0430\u0440\u043e\u043b\u044c *",1,"user__input"],["class","address__list",4,"ngIf"],[1,"delivery"],[1,"delivery__title"],[1,"delivery__options"],[1,"delivery__options-checkbox"],["for","novaposhta"],["type","radio","name","deliveryMethod","id","novaposhta","formControlName","deliveryMethod","value","\u041d\u043e\u0432\u0430 \u043f\u043e\u0448\u0442\u0430"],[1,"checkbox__custom"],[1,"logo-company"],[1,"text-company"],[1,"delivery__options-select",3,"ngClass"],["type","text","formControlName","department","placeholder","\u041e\u0431\u0435\u0440\u0456\u0442\u044c \u0432\u0456\u0434\u0434\u0456\u043b\u0435\u043d\u043d\u044f",1,"input-select",3,"keyup","blur","focus"],["city",""],[1,"icon",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","11","height","7","viewBox","0 0 11 7","fill","none"],["d","M5 6.49999C4.93442 6.50079 4.86941 6.48786 4.80913 6.46202C4.74885 6.43619 4.69465 6.39803 4.65 6.34999L0.15 1.84999C-0.05 1.64999 -0.05 1.33999 0.15 1.13999C0.35 0.93999 0.66 0.93999 0.86 1.13999L5.01 5.28999L9.15 1.14999C9.35 0.94999 9.66 0.94999 9.86 1.14999C10.06 1.34999 10.06 1.65999 9.86 1.85999L5.36 6.35999C5.26 6.45999 5.13 6.50999 5.01 6.50999L5 6.49999Z","fill","#6A6A6A"],["class","department__list",4,"ngIf"],[1,"delivery__options-btn"],["for","uapost"],["type","radio","name","deliveryMethod","id","uapost","formControlName","deliveryMethod","value","\u0423\u043a\u0440\u043f\u043e\u0448\u0442\u0430"],["for","onmyown"],["type","radio","name","deliveryMethod","id","onmyown","formControlName","deliveryMethod","value","\u0421\u0430\u043c\u043e\u0432\u0438\u0432\u0456\u0437"],["for","postman"],["type","radio","name","deliveryMethod","id","postman","formControlName","deliveryMethod","value","\u041a\u0443\u0440'\u0454\u0440\u0441\u044c\u043a\u0430 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430"],[1,"delivery__actions"],[1,"address__list"],[1,"address__list-items"],["class","address__list-item",3,"click",4,"ngFor","ngForOf"],[1,"address__list-item",3,"click"],[1,"department__list"],[1,"department__list-items"],["class","department__list-item",3,"click",4,"ngFor","ngForOf"],[1,"department__list-item",3,"click"]],template:function(r,t){if(1&r){const l=e.EpF();e.F$t(),e.TgZ(0,"div",0),e._uU(1,"\u041e\u0441\u043e\u0431\u0438\u0441\u0442\u0430 \u0456\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0456\u044f"),e.qZA(),e.TgZ(2,"form",1),e.NdJ("ngSubmit",function(){return"cart"==t.path?t.makeOrder():t.updateUser()}),e.TgZ(3,"div",2),e._UZ(4,"input",3)(5,"app-error-validation",4),e.qZA(),e.TgZ(6,"div",2),e._UZ(7,"input",5)(8,"app-error-validation",4),e.qZA(),e.TgZ(9,"div",2),e._UZ(10,"input",6)(11,"app-error-validation",4),e.qZA(),e.TgZ(12,"div",2)(13,"span"),e.O4$(),e.TgZ(14,"svg",7)(15,"g",8),e._UZ(16,"path",9)(17,"path",10),e.qZA(),e.TgZ(18,"defs")(19,"clipPath",11),e._UZ(20,"rect",12),e.qZA()()()(),e.kcU(),e.TgZ(21,"span",13),e._uU(22),e.qZA(),e._UZ(23,"input",14)(24,"app-error-validation",4),e.qZA(),e.TgZ(25,"div",2)(26,"input",15,16),e.NdJ("keyup",function(){e.CHM(l);const v=e.MAs(27);return e.KtG(t.getAddress(v.value))})("blur",function(){return t.onblur()}),e.qZA(),e._UZ(28,"app-error-validation",4),e.qZA(),e.TgZ(29,"div",17)(30,"div",2),e._UZ(31,"input",18)(32,"app-error-validation",4),e.qZA()(),e.YNc(33,A,3,1,"div",19),e.TgZ(34,"div",20)(35,"div",21),e._uU(36,"\u0421\u043f\u043e\u0441\u043e\u0431\u0438 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438"),e.qZA(),e.TgZ(37,"div",22)(38,"div",23)(39,"label",24),e._UZ(40,"input",25)(41,"span",26),e.TgZ(42,"span",27),e._uU(43,"logo"),e.qZA(),e.TgZ(44,"span",28),e._uU(45,"\u041d\u043e\u0432\u0430 \u041f\u043e\u0448\u0442\u0430"),e.qZA()(),e.TgZ(46,"div",29)(47,"input",30,31),e.NdJ("keyup",function(){e.CHM(l);const v=e.MAs(48);return e.KtG(t.getDepartments(v.value))})("blur",function(){return t.onblur()})("focus",function(){return t.isDepartment=!0}),e.qZA(),e.TgZ(49,"div",32),e.NdJ("click",function(){return t.isDepartment=!t.isDepartment}),e.O4$(),e.TgZ(50,"svg",33),e._UZ(51,"path",34),e.qZA(),e.kcU(),e._UZ(52,"app-error-validation",4),e.qZA(),e.YNc(53,w,3,1,"div",35),e.qZA(),e.TgZ(54,"div",36)(55,"span"),e._uU(56,"\u0417\u0430\u0431\u0435\u0440\u0456\u0442\u044c \u043f\u043e\u0441\u0438\u043b\u043a\u0443 \u0443 \u043d\u0430\u0439\u0431\u043b\u0438\u0436\u0447\u043e\u043c\u0443 \u0432\u0456\u0434\u0434\u0456\u043b\u0435\u043d\u043d\u0456 \u041d\u043e\u0432\u043e\u0457 \u041f\u043e\u0448\u0442\u0438"),e.qZA()()(),e.TgZ(57,"div",23)(58,"label",37),e._UZ(59,"input",38)(60,"span",26),e.TgZ(61,"span",27),e._uU(62,"logo"),e.qZA(),e.TgZ(63,"span",28),e._uU(64,"\u0423\u043a\u0440\u041f\u043e\u0448\u0442\u0430"),e.qZA()()(),e.TgZ(65,"div",23)(66,"label",39),e._UZ(67,"input",40)(68,"span",26),e.TgZ(69,"span",27),e._uU(70,"logo"),e.qZA(),e.TgZ(71,"span",28),e._uU(72,"\u0421\u0430\u043c\u043e\u0432\u0438\u0432\u0456\u0437"),e.qZA()()(),e.TgZ(73,"div",23)(74,"label",41),e._UZ(75,"input",42)(76,"span",26),e.TgZ(77,"span",27),e._uU(78,"logo"),e.qZA(),e.TgZ(79,"span",28),e._uU(80,"\u041a\u0443\u0440\u2019\u0454\u0440\u0441\u044c\u043a\u0430 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430"),e.qZA()(),e._UZ(81,"app-error-validation",4),e.qZA()(),e.TgZ(82,"div",43),e.Hsn(83),e.qZA()()()}if(2&r){let l;e.xp6(2),e.Q6J("formGroup",t.infoForm),e.xp6(1),e.Q6J("ngClass",t.isValid(t.infoForm,"name")),e.xp6(2),e.Q6J("control",t.infoForm.get("name")),e.xp6(1),e.Q6J("ngClass",t.isValid(t.infoForm,"lastName")),e.xp6(2),e.Q6J("control",t.infoForm.get("lastName")),e.xp6(1),e.Q6J("ngClass",t.isValid(t.infoForm,"email")),e.xp6(2),e.Q6J("control",t.infoForm.get("email")),e.xp6(1),e.Q6J("ngClass",t.isValid(t.infoForm,"phone")),e.xp6(10),e.Oqu(t.phoneHolder),e.xp6(2),e.Q6J("control",t.infoForm.get("phone")),e.xp6(1),e.Q6J("ngClass",t.isValid(t.infoForm,"address")),e.xp6(1),e.Q6J("value",null==(l=t.infoForm.get("address"))?null:l.value),e.xp6(2),e.Q6J("control",t.infoForm.get("address")),e.xp6(1),e.Q6J("ngClass",e.VKq(21,E,t.isCart)),e.xp6(1),e.Q6J("ngClass",t.isValid(t.infoForm,"password")),e.xp6(2),e.Q6J("control",t.infoForm.get("password")),e.xp6(1),e.Q6J("ngIf",t.addresses.length&&t.isChosen),e.xp6(13),e.Q6J("ngClass",t.isValid(t.infoForm,"department")),e.xp6(6),e.Q6J("control",t.infoForm.get("department")),e.xp6(1),e.Q6J("ngIf",(null==t.departments?null:t.departments.length)&&t.isDepartment),e.xp6(28),e.Q6J("control",t.infoForm.get("deliveryMethod"))}},dependencies:[d.ez,d.mk,d.sg,d.O5,n.UX,n._Y,n.Fj,n._,n.JJ,n.JL,n.sg,n.u,P.k],styles:['@import"https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Roboto:ital,wght@0,400;0,500;1,300&family=Satisfy&family=Titan+One&display=swap";@import"https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Manrope&family=Roboto:ital,wght@0,400;0,500;1,300&family=Satisfy&family=Titan+One&display=swap";@import"https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap";.btn[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;border:none;background:transparent;border-radius:8px;flex-shrink:0;cursor:pointer}.btn__login[_ngcontent-%COMP%]{font-family:Montserrat,sans-serif;font-size:20px;font-weight:500;font-style:normal;line-height:130%;width:570px;height:60px;padding:16px 12px;gap:8;background:#272727;color:#fafafa}.btn__login[_ngcontent-%COMP%]:hover{box-shadow:0 4px 4px #09090966}.btn__login[_ngcontent-%COMP%]:active{box-shadow:none}.btn__buy[_ngcontent-%COMP%]{font-family:Montserrat,sans-serif;font-size:24px;font-weight:400;font-style:normal;line-height:130%;height:64px;padding:8px 16px;text-transform:uppercase;gap:8;background:#272727;color:#fff}.btn__buy[_ngcontent-%COMP%]:hover{box-shadow:0 4px 4px #09090966}.btn__buy[_ngcontent-%COMP%]:active{box-shadow:none}.btn__add[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:20px;font-weight:300;font-style:normal;line-height:130%;color:#000;height:64px;padding:16px 32px;text-transform:uppercase;gap:16px;border:1px solid #05020e;color:#05020e}.btn__add[_ngcontent-%COMP%]:hover{background:#05020e;color:#fff}.btn__add[_ngcontent-%COMP%]:active{background:transparent;color:#05020e}.btn__reply[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:22px;font-weight:400;font-style:normal;line-height:130%;color:#000;padding:16px;gap:16px;border:1px solid #646464;color:#05020e}.disabled[_ngcontent-%COMP%], .btn__add[_ngcontent-%COMP%]:disabled, .btn__reply[_ngcontent-%COMP%]:disabled{border:1px solid #949494;color:#949494;box-shadow:none;background:transparent}.disabled-grey[_ngcontent-%COMP%], .btn__login[_ngcontent-%COMP%]:disabled, .btn__buy[_ngcontent-%COMP%]:disabled{background:#949494;color:#fafafa;box-shadow:none}.errorMessage[_ngcontent-%COMP%]{font-family:Inter;font-size:14px;font-weight:400;font-style:normal;line-height:normal;position:relative;top:40px;color:#da3838}app-error-validation[_ngcontent-%COMP%]{position:absolute}input[type=radio][_ngcontent-%COMP%]{font-family:Roboto,sans-serif;-webkit-appearance:none;appearance:none;background-color:var(--form-background);margin:0;width:20px;height:20px;border:1px solid #000;border-radius:.15em;transform:translateY(-.075em);display:grid;place-content:center;z-index:0}input[type=radio][_ngcontent-%COMP%]:before{content:"";width:18px;height:18px;clip-path:polygon(0% 27%,0 25%,50% 95%,80% 16%,80% 0%,43% 62%);transform:scale(0);transform-origin:bottom left;transition:.12s transform ease-in-out;box-shadow:inset 5px 5px var(--form-control-color);background-color:CanvasText;z-index:0}input[type=radio][_ngcontent-%COMP%]:checked:before{transform:scale(1);z-index:0}.user__info[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:100px}.user__info-title[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:28px;font-weight:400;font-style:normal;line-height:130%;color:#000;text-align:center;padding-bottom:72px}.user__form[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:space-between;gap:32px;width:837px}.user__wrap-input[_ngcontent-%COMP%]{display:flex;padding:12px 16px;align-items:center;gap:8px;border-radius:8px;border:1px solid #949494;width:402px}.user__input[_ngcontent-%COMP%]{width:536px;height:29px;border:none;outline:none;font-size:18px;font-style:normal;font-weight:400;line-height:130%}.user__input[_ngcontent-%COMP%]::placeholder{color:#949494}.delivery[_ngcontent-%COMP%]{display:inline-flex;padding-right:0;flex-direction:column;justify-content:center;align-items:flex-start;gap:51px;padding-top:120px;width:829px}.delivery__title[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:28px;font-weight:400;font-style:normal;line-height:130%;color:#000;width:100%;text-align:center}.delivery__options[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;gap:56px}.delivery__options-select[_ngcontent-%COMP%]{display:flex;align-items:center;margin-bottom:32px;margin-top:32px;margin-left:72px;width:332px;padding:12px 16px;gap:8px;border-radius:8px;border:1px solid #949494}.delivery__options-select[_ngcontent-%COMP%]   .select[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:18px;font-weight:400;font-style:normal;line-height:130%;color:#000;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;outline:none;border:none;background:transparent;color:#6a6a6a}.delivery__options-btn[_ngcontent-%COMP%]{display:flex;align-items:center;width:757px;padding:16px;margin-left:72px;gap:10px;border-radius:8px;background:#efeeee}.delivery__options-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:16px;font-weight:400;font-style:normal;line-height:130%;color:#000}.delivery__actions[_ngcontent-%COMP%]{display:flex;justify-content:space-between;width:100%;gap:80px;padding-top:80px}.delivery__btn[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:18px;font-weight:300;font-style:normal;line-height:130%;color:#000;text-transform:none}.delivery__options-checkbox[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-start}.logo-company[_ngcontent-%COMP%]{padding-left:48px;padding-right:24px}.phone-holder[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:18px;font-weight:400;font-style:normal;line-height:130%;color:#000;text-align:center;color:#5d5d5d}.text-company[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;color:#000;font-size:20px;font-style:normal;font-weight:400;line-height:130%}.list[_ngcontent-%COMP%], .address__list[_ngcontent-%COMP%], .department__list[_ngcontent-%COMP%]{position:relative;border:1px solid #4c4c4c;border-top:none;border-bottom-left-radius:8px;border-bottom-right-radius:8px;border-top-right-radius:none;border-top-left-radius:none;background:#fff}.department__list[_ngcontent-%COMP%]{z-index:100}.department__list-item[_ngcontent-%COMP%]{position:relative;border-radius:8px;padding:0 20px 10px 10px;cursor:pointer}.department__list-item[_ngcontent-%COMP%]:hover{background:#efeeee}.department__list-items[_ngcontent-%COMP%]{display:block;position:absolute;list-style:none;border:1px solid #000;border-top:none;border-bottom-right-radius:8px;border-bottom-left-radius:8px;top:30px;left:-311px;width:330px;overflow-y:auto;max-height:50vh;background:#fff;z-index:100}.address__list[_ngcontent-%COMP%]{top:-35px;left:-1px;max-width:402px;z-index:1}.address__list-item[_ngcontent-%COMP%]{position:relative;border-radius:8px;padding:0 20px 10px 10px;cursor:pointer}.address__list-item[_ngcontent-%COMP%]:hover{background:#efeeee}.address__list-items[_ngcontent-%COMP%]{display:block;position:absolute;list-style:none;border:1px solid #000;border-top:none;border-bottom-right-radius:8px;border-bottom-left-radius:8px;width:402px;overflow-y:auto;max-height:50vh;background:#fff}.input-select[_ngcontent-%COMP%]{width:536px;height:29px;border:none;outline:none;font-family:Roboto,sans-serif;font-size:18px;font-weight:400;font-style:normal;line-height:130%;color:#000;color:#6a6a6a}.input-select[_ngcontent-%COMP%]::placeholder{color:#949494}.icon[_ngcontent-%COMP%]{cursor:pointer}.hidden[_ngcontent-%COMP%]{visibility:hidden}']}),a})()}}]);