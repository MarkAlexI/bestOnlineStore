"use strict";(self.webpackChunkfront_end=self.webpackChunkfront_end||[]).push([[93],{6093:(z,l,a)=>{a.r(l),a.d(l,{HomePageComponent:()=>F});var i=a(6814),t=a(4946);const g=function(e){return{active:e}};function m(e,c){if(1&e&&(t.TgZ(0,"div",10),t._UZ(1,"img",11),t.qZA()),2&e){const o=c.$implicit,n=c.index,r=t.oxw();t.Q6J("ngClass",t.VKq(3,g,n===r.slideIndex)),t.xp6(1),t.Q6J("src",o.url,t.LSH)("alt",o.alt)}}const f=function(e){return{"active-dot":e}};function C(e,c){if(1&e){const o=t.EpF();t.TgZ(0,"span",12),t.NdJ("click",function(){const s=t.CHM(o).index,j=t.oxw();return t.KtG(j.goToSlide(s))}),t.qZA()}if(2&e){const o=c.index,n=t.oxw();t.Q6J("ngClass",t.VKq(1,f,o===n.slideIndex))}}let h=(()=>{var e;class c{constructor(){this.photos=[{url:"assets/pics/png/carusel1.jpg",alt:""},{url:"assets/pics/png/carusel2.jpg",alt:""},{url:"assets/pics/png/carusel3.jpg",alt:""},{url:"assets/pics/png/carusel4.jpg",alt:""}],this.slideIndex=0,this.isMouseOverSlide=!1}ngOnInit(){this.startAutoPlay()}ngOnDestroy(){this.stopAutoPlay()}nextSlide(){this.slideIndex=(this.slideIndex+1)%this.photos.length}prevSlide(){this.slideIndex=(this.slideIndex-1+this.photos.length)%this.photos.length}goToSlide(n){this.slideIndex=n}startAutoPlay(){this.autoPlayInterval=setInterval(()=>{this.isMouseOverSlide||this.nextSlide()},7e3)}stopAutoPlay(){clearInterval(this.autoPlayInterval)}handleMouseEnter(){this.isMouseOverSlide=!0,this.stopAutoPlay()}handleMouseLeave(){this.isMouseOverSlide=!1,this.startAutoPlay()}}return(e=c).\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-carousel"]],standalone:!0,features:[t.jDz],decls:11,vars:2,consts:[[1,"carousel",3,"mouseenter","mouseleave"],[1,"arrow","arrow-left",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","48","height","48","viewBox","0 0 48 48","fill","none"],["d","M30 36L18 24L30 12","stroke","#05020E","stroke-linecap","round","stroke-linejoin","round"],[1,"slide-container"],["class","slide",3,"ngClass",4,"ngFor","ngForOf"],[1,"arrow","arrow-right",3,"click"],["d","M18 36L30 24L18 12","stroke","#05020E","stroke-linecap","round","stroke-linejoin","round"],[1,"dots"],["class","dot",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"slide",3,"ngClass"],[3,"src","alt"],[1,"dot",3,"ngClass","click"]],template:function(n,r){1&n&&(t.TgZ(0,"div",0),t.NdJ("mouseenter",function(){return r.handleMouseEnter()})("mouseleave",function(){return r.handleMouseLeave()}),t.TgZ(1,"a",1),t.NdJ("click",function(){return r.prevSlide()}),t.O4$(),t.TgZ(2,"svg",2),t._UZ(3,"path",3),t.qZA()(),t.kcU(),t.TgZ(4,"div",4),t.YNc(5,m,2,5,"div",5),t.qZA(),t.TgZ(6,"a",6),t.NdJ("click",function(){return r.nextSlide()}),t.O4$(),t.TgZ(7,"svg",2),t._UZ(8,"path",7),t.qZA()()(),t.kcU(),t.TgZ(9,"div",8),t.YNc(10,C,1,3,"span",9),t.qZA()),2&n&&(t.xp6(5),t.Q6J("ngForOf",r.photos),t.xp6(5),t.Q6J("ngForOf",r.photos))},dependencies:[i.ez,i.mk,i.sg],styles:[".carousel[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;position:relative}.slide-container[_ngcontent-%COMP%]{position:relative;width:1166px;height:740px;overflow:hidden}.slide[_ngcontent-%COMP%]{opacity:0;position:absolute;top:0;left:0;transition:opacity .5s;width:100%;height:100%}.slide.active[_ngcontent-%COMP%]{opacity:1}.arrow[_ngcontent-%COMP%]{position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px;display:flex;justify-content:center;align-items:center;cursor:pointer;fill:#05020e;background-color:#ffffff80;border-radius:50%;transition:background-color .3s}.arrow-left[_ngcontent-%COMP%]{left:0}.arrow-right[_ngcontent-%COMP%]{right:0}.arrow[_ngcontent-%COMP%]:hover{background-color:#fffc}.dots[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin-top:24px;gap:16px}.dot[_ngcontent-%COMP%]{display:inline-block;width:15px;height:15px;border:1px solid #000;border-radius:50%;cursor:pointer;transition:all .3s ease}.active-dot[_ngcontent-%COMP%]{background-color:#000}"]}),c})(),x=(()=>{var e;class c{}return(e=c).\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-advices"]],standalone:!0,features:[t.jDz],decls:8,vars:0,consts:[[1,"advices__container"],[1,"advices__title"],[1,"advices__images"],[1,"temp__image__wide","temp__image-one"],[1,"temp__image","temp__image-two"],[1,"temp__image","temp__image-three"],[1,"temp__image__wide","temp__image-four"]],template:function(n,r){1&n&&(t.TgZ(0,"div",0)(1,"div",1),t._uU(2,"\u041f\u043e\u0440\u0430\u0434\u0438 \u0434\u0438\u0437\u0430\u0439\u043d\u0435\u0440\u0430"),t.qZA(),t.TgZ(3,"div",2),t._UZ(4,"div",3)(5,"div",4)(6,"div",5)(7,"div",6),t.qZA()())},dependencies:[i.ez],styles:[".advices__container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center}.advices__title[_ngcontent-%COMP%]{margin-bottom:100px;font-size:40px;font-style:normal;font-weight:400;line-height:130%;color:#000}.advices__images[_ngcontent-%COMP%]{display:flex;width:100%;flex-wrap:wrap;gap:100px;justify-content:space-between;align-items:center}.temp__image[_ngcontent-%COMP%]{width:28%;height:471px;background-color:#d9d9d9}.temp__image__wide[_ngcontent-%COMP%]{width:64%;height:471px;background-color:#d9d9d9}.temp__image-one[_ngcontent-%COMP%]{background-image:url(advice1.89425923895f6182.jpg)}.temp__image-two[_ngcontent-%COMP%]{background-image:url(advice2.1646ed701f391919.jpg)}.temp__image-three[_ngcontent-%COMP%]{background-image:url(advice4.7a62a38a0998ad15.jpg)}.temp__image-four[_ngcontent-%COMP%]{background-image:url(advice3.eee36675a044aa7b.jpg)}"]}),c})();var v=a(8980);function P(e,c){1&e&&(t.TgZ(0,"span",13),t._uU(1,"\u0410\u043a\u0446\u0456\u044f"),t.qZA())}function O(e,c){if(1&e&&(t.TgZ(0,"p",14),t._uU(1),t.ALo(2,"transformPrice"),t.qZA()),2&e){const o=t.oxw();t.xp6(1),t.hij(" ",t.lcZ(2,1,.8*o.product.price)," ")}}const M=function(e){return{"product-card__crossed-price":e}};let w=(()=>{var e;class c{}return(e=c).\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-product-card"]],inputs:{product:"product"},standalone:!0,features:[t.jDz],decls:16,vars:9,consts:[[1,"product-card"],[1,"product-card__caption"],["class","product-card__action",4,"ngIf"],[1,"product-card__like"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 40 40",1,"like"],["d","M27.8125 5.625C24.4625 5.625 21.575 7.21719 20 9.85469C18.425 7.21719 15.5375 5.625 12.1875 5.625C9.78486 5.62789 7.48146 6.58362 5.78254 8.28254C4.08362 9.98146 3.12789 12.2849 3.125 14.6875C3.125 19.1547 5.9375 23.8234 11.4688 28.5609C14.0227 30.7342 16.7802 32.6561 19.7031 34.3C19.7943 34.3492 19.8964 34.375 20 34.375C20.1036 34.375 20.2057 34.3492 20.2969 34.3C23.2198 32.6561 25.9773 30.7342 28.5312 28.5609C34.0625 23.8234 36.875 19.1547 36.875 14.6875C36.8721 12.2849 35.9164 9.98146 34.2175 8.28254C32.5185 6.58362 30.2151 5.62789 27.8125 5.625ZM20 33.0344C17.8125 31.7906 4.375 23.7609 4.375 14.6875C4.37748 12.6163 5.20138 10.6306 6.66597 9.16597C8.13056 7.70138 10.1163 6.87748 12.1875 6.875C15.4859 6.875 18.2578 8.64219 19.4219 11.4859C19.469 11.6006 19.5491 11.6986 19.652 11.7676C19.7549 11.8366 19.8761 11.8735 20 11.8735C20.1239 11.8735 20.2451 11.8366 20.348 11.7676C20.4509 11.6986 20.531 11.6006 20.5781 11.4859C21.7422 8.64219 24.5141 6.875 27.8125 6.875C29.8837 6.87748 31.8694 7.70138 33.334 9.16597C34.7986 10.6306 35.6225 12.6163 35.625 14.6875C35.625 23.75 22.1875 31.7906 20 33.0344Z","fill","#DA3838"],["xmlns","http://www.w3.org/2000/svg","viewBox","0 0 24 24","fill","none",1,"like-hover"],["d","M22.5 8.8125C22.5 15.375 12.7697 20.6869 12.3553 20.9062C12.2461 20.965 12.124 20.9958 12 20.9958C11.876 20.9958 11.7539 20.965 11.6447 20.9062C11.2303 20.6869 1.5 15.375 1.5 8.8125C1.50174 7.27146 2.11468 5.79404 3.20436 4.70436C4.29404 3.61468 5.77146 3.00174 7.3125 3C9.24844 3 10.9434 3.8325 12 5.23969C13.0566 3.8325 14.7516 3 16.6875 3C18.2285 3.00174 19.706 3.61468 20.7956 4.70436C21.8853 5.79404 22.4983 7.27146 22.5 8.8125Z","fill","#DA3838"],[1,"product-card__picture"],[1,"product-card__placeholder"],[1,"product-card__name"],["class","product-card__sale",4,"ngIf"],[1,"product-card__price",3,"ngClass"],[1,"product-card__action"],[1,"product-card__sale"]],template:function(n,r){1&n&&(t.TgZ(0,"figure",0)(1,"figcaption",1),t.YNc(2,P,2,0,"span",2),t.TgZ(3,"span",3),t.O4$(),t.TgZ(4,"svg",4),t._UZ(5,"path",5),t.qZA(),t.TgZ(6,"svg",6),t._UZ(7,"path",7),t.qZA()(),t.kcU(),t.TgZ(8,"div",8),t._UZ(9,"div",9),t.qZA(),t.TgZ(10,"h3",10),t._uU(11),t.qZA(),t.YNc(12,O,3,3,"p",11),t.TgZ(13,"p",12),t._uU(14),t.ALo(15,"transformPrice"),t.qZA()()()),2&n&&(t.xp6(2),t.Q6J("ngIf",r.product.discount),t.xp6(9),t.Oqu(r.product.name),t.xp6(1),t.Q6J("ngIf",r.product.discount),t.xp6(1),t.Q6J("ngClass",t.VKq(7,M,r.product.discount)),t.xp6(1),t.Oqu(t.lcZ(15,5,r.product.price)))},dependencies:[i.ez,i.mk,i.O5,v.s],styles:[".product-card[_ngcontent-%COMP%]{position:relative;width:360px;text-align:center;line-height:130%;cursor:pointer}.product-card__action[_ngcontent-%COMP%]{position:absolute;left:0;top:16px;color:#fff;padding:8px 12px;background-color:#da3838}.product-card__like[_ngcontent-%COMP%]{position:absolute;right:16px;top:16px;width:40px;height:40px;cursor:pointer}.product-card__like[_ngcontent-%COMP%]   .like[_ngcontent-%COMP%], .product-card__like[_ngcontent-%COMP%]   .like-hover[_ngcontent-%COMP%]{position:absolute;top:0;left:0}.product-card__like[_ngcontent-%COMP%]   .like-hover[_ngcontent-%COMP%]{opacity:0;transition:opacity .3s ease}.product-card__like[_ngcontent-%COMP%]:hover   .like-hover[_ngcontent-%COMP%]{opacity:1}.product-card__image[_ngcontent-%COMP%], .product-card__placeholder[_ngcontent-%COMP%]{width:360px;height:360px;object-fit:contain;background-color:#d9d9d9;margin-bottom:32px}.product-card__name[_ngcontent-%COMP%]{font-size:18px;font-weight:400;margin-bottom:8px}.product-card__sale[_ngcontent-%COMP%], .product-card__price[_ngcontent-%COMP%]{font-size:20px}.product-card__crossed-price[_ngcontent-%COMP%]{color:#da3838;font-size:16px;text-decoration:line-through}"]}),c})();function y(e,c){1&e&&t._UZ(0,"app-product-card",3),2&e&&t.Q6J("product",c.$implicit)}let Z=(()=>{var e;class c{constructor(){}}return(e=c).\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-card"]],inputs:{mockData:"mockData"},standalone:!0,features:[t.jDz],decls:4,vars:1,consts:[[1,"top__title"],[1,"card__wrap"],[3,"product",4,"ngFor","ngForOf"],[3,"product"]],template:function(n,r){1&n&&(t.TgZ(0,"div",0),t._uU(1,"\u041a\u0430\u0442\u0435\u0433\u043e\u0440\u0456\u044f"),t.qZA(),t.TgZ(2,"div",1),t.YNc(3,y,1,1,"app-product-card",2),t.qZA()),2&n&&(t.xp6(3),t.Q6J("ngForOf",r.mockData))},dependencies:[i.ez,i.sg,w],styles:[".top[_ngcontent-%COMP%], .advices[_ngcontent-%COMP%], .actions[_ngcontent-%COMP%], .new[_ngcontent-%COMP%]{padding:80px 0}.top__box[_ngcontent-%COMP%], .advices__box[_ngcontent-%COMP%], .actions__box[_ngcontent-%COMP%], .new__box[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center}.top__title[_ngcontent-%COMP%]{text-align:center;margin-bottom:100px;font-size:40px;font-style:normal;font-weight:400;line-height:130%;color:#000}.card__wrap[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:flex-start}.card__title[_ngcontent-%COMP%]{margin-top:32px;text-align:center;font-size:18px;font-style:normal;font-weight:400;line-height:130%;color:#000}.card__price[_ngcontent-%COMP%]{text-align:center;font-size:20px;font-style:normal;font-weight:400;line-height:130%;color:#000}.card__price__discount[_ngcontent-%COMP%]{text-align:center;font-size:16px;font-style:normal;font-weight:400;line-height:130%;text-decoration-line:line-through;color:#da3838}"]}),c})();var k=a(2413),T=a(9862),d=a(347),u=a(7398),_=a(6306),b=a(4009);let A=(()=>{var e;class c{constructor(){this.http=(0,t.f3M)(T.eN),this.errorHandler=(0,t.f3M)(b.G)}getProductsApi(){return this.http.get(`${d.rH.URL}/product`).pipe((0,u.U)(n=>n.payload),(0,_.K)(this.errorHandler.handleError("\u041d\u0435 \u0432\u0434\u0430\u043b\u043e\u0441\u044f \u043e\u0442\u0440\u0438\u043c\u0430\u0442\u0438 \u0434\u0430\u043d\u0456!")))}getProductByIdApi(n){return this.http.get(`${d.rH.URL}/product/${n}`).pipe((0,u.U)(r=>r.payload),(0,_.K)(this.errorHandler.handleError("\u041d\u0435 \u0432\u0434\u0430\u043b\u043e\u0441\u044f \u043e\u0442\u0440\u0438\u043c\u0430\u0442\u0438 \u0434\u0430\u043d\u0456!")))}}return(e=c).\u0275fac=function(n){return new(n||e)},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),c})();const p=function(e,c,o){return[e,c,o]};function U(e,c){if(1&e){const o=t.EpF();t.ynx(0),t.TgZ(1,"section",2),t._UZ(2,"app-carousel"),t.qZA(),t.TgZ(3,"section",3),t._UZ(4,"app-card",4),t.TgZ(5,"div",5)(6,"button",6),t.NdJ("click",function(){t.CHM(o);const r=t.oxw();return t.KtG(r.redirect("/catalog"))}),t._uU(7," \u041f\u0415\u0420\u0415\u0419\u0422\u0418 \u0412 \u041a\u0410\u0422\u0410\u041b\u041e\u0413 "),t.qZA()()(),t.TgZ(8,"section",7),t._UZ(9,"app-card",8),t.TgZ(10,"div",5)(11,"button",6),t.NdJ("click",function(){t.CHM(o);const r=t.oxw();return t.KtG(r.redirect("/catalog"))}),t._uU(12," \u043f\u0435\u0440\u0435\u0433\u043b\u044f\u043d\u0443\u0442\u0438 \u0432\u0441\u0456 "),t.qZA()()(),t.TgZ(13,"section",9),t._UZ(14,"app-card",10),t.TgZ(15,"div",5)(16,"button",6),t.NdJ("click",function(){t.CHM(o);const r=t.oxw();return t.KtG(r.redirect("/catalog"))}),t._uU(17," \u043f\u0435\u0440\u0435\u0433\u043b\u044f\u043d\u0443\u0442\u0438 \u0432\u0441\u0456 "),t.qZA()()(),t.TgZ(18,"section",11),t._UZ(19,"app-advices",12),t.qZA(),t.BQk()}if(2&e){const o=c.ngIf;t.xp6(4),t.Q6J("mockData",t.kEZ(3,p,o,o,o)),t.xp6(5),t.Q6J("mockData",t.kEZ(7,p,o,o,o)),t.xp6(5),t.Q6J("mockData",t.kEZ(11,p,o,o,o))}}function I(e,c){1&e&&(t.TgZ(0,"div",13),t._uU(1,"Loading..."),t.qZA())}let F=(()=>{var e;class c{constructor(n,r){this.router=n,this.productService=r}ngOnInit(){this.product$=this.productService.getProductByIdApi("64ed1077cfa17b039820db9d"),this.productService.getProductsApi().subscribe(n=>console.log(n))}redirect(n,r){this.router.navigate(r?[n,r]:[n])}}return(e=c).\u0275fac=function(n){return new(n||e)(t.Y36(k.F0),t.Y36(A))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-home-page"]],standalone:!0,features:[t.jDz],decls:4,vars:4,consts:[[4,"ngIf","ngIfElse"],["loading",""],[1,"carousel","wrapper"],[1,"top","wrapper"],[1,"top__box",3,"mockData"],[1,"top__btn"],[1,"btn__card",3,"click"],[1,"new","wrapper"],[1,"new__box",3,"mockData"],[1,"actions","wrapper"],[1,"actions__box",3,"mockData"],[1,"advices","wrapper"],[1,"advices__box"],[1,"wrapper"]],template:function(n,r){if(1&n&&(t.YNc(0,U,20,15,"ng-container",0),t.ALo(1,"async"),t.YNc(2,I,2,0,"ng-template",null,1,t.W1O)),2&n){const s=t.MAs(3);t.Q6J("ngIf",t.lcZ(1,2,r.product$))("ngIfElse",s)}},dependencies:[i.ez,i.O5,i.Ov,h,x,Z],styles:['@import"https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Roboto:ital,wght@0,400;0,500;1,300&family=Satisfy&family=Titan+One&display=swap";@import"https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Manrope&family=Roboto:ital,wght@0,400;0,500;1,300&family=Satisfy&family=Titan+One&display=swap";.name[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:70px 0 32px}.name__shop[_ngcontent-%COMP%]{font-family:Satisfy,cursive;margin:0;font-size:52px;font-style:normal;font-weight:400;line-height:130%;color:#000}.top[_ngcontent-%COMP%], .new[_ngcontent-%COMP%], .carousel[_ngcontent-%COMP%], .actions[_ngcontent-%COMP%], .advices[_ngcontent-%COMP%]{padding:80px 0}.carousel[_ngcontent-%COMP%]{padding-top:0}.top__btn[_ngcontent-%COMP%]{display:flex}.btn__card[_ngcontent-%COMP%]{margin-top:64px;margin-left:auto;margin-right:auto;width:274px;padding:16px 30px;gap:10px;border-radius:8px;border:1px solid #000;color:#000;font-size:20px;font-style:normal;font-weight:300;line-height:130%;text-transform:uppercase;background:transparent}']}),c})()}}]);