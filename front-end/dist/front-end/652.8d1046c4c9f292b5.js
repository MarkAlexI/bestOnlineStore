"use strict";(self.webpackChunkfront_end=self.webpackChunkfront_end||[]).push([[652],{9652:(h,u,a)=>{a.r(u),a.d(u,{CartComponent:()=>w});var t=a(4946),f=a(2413),l=a(9862),m=a(347);let g=(()=>{var n;class r{constructor(){this.http=(0,t.f3M)(l.eN)}getCart(){this.http.get(`${m.rH.URL}/get-cart`).subscribe(e=>console.log(e))}}return(n=r).\u0275fac=function(e){return new(e||n)},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),r})();var d=a(6814),_=a(8980),p=a(95);function y(n,r){if(1&n){const o=t.EpF();t.TgZ(0,"div",2)(1,"div",3),t._UZ(2,"img",4),t.qZA(),t.TgZ(3,"div",5)(4,"div",6)(5,"div",7),t._uU(6),t.qZA(),t.TgZ(7,"div",8),t.NdJ("click",function(){const s=t.CHM(o).$implicit,c=t.oxw();return t.KtG(c.delete(null==s?null:s.id))}),t.O4$(),t.TgZ(8,"svg",9),t._UZ(9,"path",10)(10,"path",11)(11,"path",12)(12,"path",13),t.qZA()()(),t.kcU(),t.TgZ(13,"div",14)(14,"div",15)(15,"span",16),t.NdJ("click",function(){const s=t.CHM(o).index,c=t.oxw();return t.KtG(c.decrease(s))}),t.O4$(),t.TgZ(16,"svg",17),t._UZ(17,"path",18),t.qZA()(),t.kcU(),t.TgZ(18,"input",19),t.NdJ("ngModelChange",function(i){const c=t.CHM(o).$implicit;return t.KtG(c.quantity=i)})("keyup",function(){const i=t.CHM(o),s=i.$implicit,c=i.index,b=t.oxw();return t.KtG(b.checkQuantity(s,c))}),t.qZA(),t.TgZ(19,"span",20),t.NdJ("click",function(){const s=t.CHM(o).index,c=t.oxw();return t.KtG(c.increase(s))}),t.O4$(),t.TgZ(20,"svg",17),t._UZ(21,"path",21),t.qZA()()(),t.kcU(),t.TgZ(22,"div",22)(23,"p",23,24),t._uU(25),t.ALo(26,"transformPrice"),t.qZA(),t.TgZ(27,"p",25),t._uU(28),t.ALo(29,"transformPrice"),t.qZA()()()()()}if(2&n){const o=r.$implicit,e=t.oxw();t.xp6(2),t.Q6J("src",o.image,t.LSH),t.xp6(4),t.Oqu(o.description),t.xp6(12),t.Q6J("min",e.minQuantity)("max",e.maxQuantity)("ngModel",o.quantity),t.xp6(7),t.hij(" ",t.lcZ(26,7,o.price)," "),t.xp6(3),t.hij(" ",t.lcZ(29,9,o.discount)," ")}}let x=(()=>{var n;class r{constructor(){this.maxQuantity=100,this.minQuantity=1,this.total=0,this.orders=[{id:1,image:"https://img.freepik.com/premium-photo/blue-color-chair-product-image-web-page-scandinavian-design-clean-soft-chair-comfortable-with-copy-space-generatiev-ai_834602-16335.jpg",description:"\u041a\u0430\u0432\u043e\u0432\u0438\u0439 \u0441\u0442\u043e\u043b\u0438\u043a \u041a\u0430\u0432\u043e\u0432\u0438\u0439 \u0441\u0442\u043e\u043b\u0438\u043a\u041a\u0430\u0432\u043e\u0432\u0438\u0439 \u0441\u0442\u043e\u043b\u0438\u043a",quantity:1,price:5500,discount:6500,summa:5500},{id:2,image:"https://img.freepik.com/premium-photo/blue-color-chair-product-image-web-page-scandinavian-design-clean-soft-chair-comfortable-with-copy-space-generatiev-ai_834602-16335.jpg",description:"\u041a\u0430\u0432\u043e\u0432\u0438\u0439 \u0441\u0442\u043e\u043b\u0438\u043a ",quantity:1,price:5500,summa:5500}]}ngOnInit(){this.countTotal()}increase(e){this.orders[e].quantity<this.maxQuantity&&(this.orders[e].quantity+=1,this.orders[e].summa=this.orders[e].price*this.orders[e].quantity),this.checkQuantity(this.orders[e],e)}decrease(e){this.orders[e].quantity>this.minQuantity&&(this.orders[e].quantity-=1,this.orders[e].summa=this.orders[e].price*this.orders[e].quantity),this.checkQuantity(this.orders[e],e)}checkQuantity(e,i){(e.quantity>=this.maxQuantity||e.quantity>this.orders[i].quantity)&&(e.quantity=this.maxQuantity,this.orders[i].quantity=e.quantity),(e.quantity<=this.minQuantity||e.quantity<this.orders[i].quantity)&&(e.quantity=this.minQuantity,this.orders[i].quantity=e.quantity),this.countTotal()}countTotal(){let e=0;this.orders.forEach(i=>e+=i.summa),this.total=e,console.log(this.total)}delete(e){this.orders=this.orders.filter(i=>i.id!==e),this.countTotal()}}return(n=r).\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-cart-orders"]],standalone:!0,features:[t.jDz],decls:5,vars:4,consts:[["class","cart__order",4,"ngFor","ngForOf"],[1,"cart__order-total"],[1,"cart__order"],[1,"cart__order-img"],["alt","",3,"src"],[1,"cart__order-text"],[1,"cart__order-description"],[1,"text"],[1,"btn-delete",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","24","height","25","viewBox","0 0 24 25","fill","none"],["d","M3 6.5H5H21","stroke","black","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["d","M19 6.5V20.5C19 21.0304 18.7893 21.5391 18.4142 21.9142C18.0391 22.2893 17.5304 22.5 17 22.5H7C6.46957 22.5 5.96086 22.2893 5.58579 21.9142C5.21071 21.5391 5 21.0304 5 20.5V6.5M8 6.5V4.5C8 3.96957 8.21071 3.46086 8.58579 3.08579C8.96086 2.71071 9.46957 2.5 10 2.5H14C14.5304 2.5 15.0391 2.71071 15.4142 3.08579C15.7893 3.46086 16 3.96957 16 4.5V6.5","stroke","black","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["d","M10 11.5V17.5","stroke","black","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],["d","M14 11.5V17.5","stroke","black","stroke-width","2","stroke-linecap","round","stroke-linejoin","round"],[1,"cart__order-data"],[1,"cart__order-amount"],[1,"decrease",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","26","height","27","viewBox","0 0 26 27","fill","none"],["d","M6.5 13.5H19.5","stroke","#676767","stroke-width","1.5","stroke-linecap","round","stroke-linejoin","round"],["type","number",1,"cart__input",3,"min","max","ngModel","ngModelChange","keyup"],[1,"increase",3,"click"],["d","M6.5 13.5H13M13 13.5H19.5M13 13.5V7M13 13.5V20","stroke","#676767","stroke-width","1.5","stroke-linecap","round","stroke-linejoin","round"],[1,"cart__order-price"],[1,"price"],["price",""],[1,"price__discount"]],template:function(e,i){1&e&&(t.YNc(0,y,30,11,"div",0),t.TgZ(1,"div",1)(2,"p"),t._uU(3),t.ALo(4,"transformPrice"),t.qZA()()),2&e&&(t.Q6J("ngForOf",i.orders),t.xp6(3),t.hij("\u0417\u0430\u0433\u0430\u043b\u044c\u043d\u0430 \u0441\u0443\u043c\u0430: ",t.lcZ(4,2,i.total),""))},dependencies:[d.ax,_.s,p.u5,p.Fj,p.wV,p.JJ,p.qQ,p.Fd,p.On],styles:['@import"https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Roboto:ital,wght@0,400;0,500;1,300&family=Satisfy&family=Titan+One&display=swap";@import"https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Manrope&family=Roboto:ital,wght@0,400;0,500;1,300&family=Satisfy&family=Titan+One&display=swap";@charset "UTF-8";.cart__order-img[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:170px;height:122px;flex-shrink:0;background-size:contain;background-repeat:no-repeat}.cart__order[_ngcontent-%COMP%]{display:flex;width:100%;padding:8px 16px 20px;align-items:center;gap:20px;border-bottom:1px solid #ababab}.cart__order-text[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;gap:27px;width:100%}.cart__order-description[_ngcontent-%COMP%], .cart__order-data[_ngcontent-%COMP%]{display:flex;align-items:flex-start;justify-content:space-between;width:100%}.cart__order-amount[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;width:auto}.cart__order-total[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:24px;font-weight:400;font-style:normal;line-height:130%;color:#000;display:flex;justify-content:flex-end;width:100%;padding:8px 26px 27px 0}.cart__input[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:20px;font-weight:400;font-style:normal;line-height:130%;color:#000;width:56px;padding:8px;text-align:center;outline:none;border-radius:2px;border:1px solid #cdcdcd;background:#fafafa}input[type=number][_ngcontent-%COMP%]::-webkit-inner-spin-button, input[type=number][_ngcontent-%COMP%]::-webkit-outer-spin-button{-webkit-appearance:none;appearance:none;margin:0}input[type=number][_ngcontent-%COMP%]{-moz-appearance:textfield}.price[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:20px;font-weight:400;font-style:normal;line-height:130%;color:#000}.price__discount[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:14px;font-weight:400;font-style:normal;line-height:130%;color:#000;text-decoration-line:line-through;color:#da3838}.text[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:18px;font-weight:400;font-style:normal;line-height:130%;color:#000}.btn__close[_ngcontent-%COMP%], .btn-delete[_ngcontent-%COMP%], .increase[_ngcontent-%COMP%], .decrease[_ngcontent-%COMP%]{cursor:pointer}']}),r})();function C(n,r){if(1&n&&(t.TgZ(0,"div",4)(1,"div"),t._UZ(2,"img",5),t.qZA(),t.TgZ(3,"div",6)(4,"div",7),t._uU(5),t.qZA(),t.TgZ(6,"div",8),t._uU(7,"\u0417\u0430\u043b\u0438\u0448\u0438\u0442\u0438 \u0432\u0456\u0434\u0433\u0443\u043a"),t.qZA(),t.TgZ(8,"div",9),t._uU(9),t.ALo(10,"transformPrice"),t.qZA()()()),2&n){const o=r.$implicit;t.xp6(2),t.Q6J("src",o.image,t.LSH),t.xp6(3),t.hij(" ",o.description," "),t.xp6(4),t.Oqu(t.lcZ(10,3,5500))}}let v=(()=>{var n;class r{constructor(){this.advs=[{image:"https://img.freepik.com/premium-photo/blue-color-chair-product-image-web-page-scandinavian-design-clean-soft-chair-comfortable-with-copy-space-generatiev-ai_834602-16335.jpg",description:"\u041a\u0430\u0432\u043e\u0432\u0438\u0439 \u0441\u0442\u043e\u043b\u0438\u043a ",quantity:1,price:5500}]}}return(n=r).\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-cart-ad"]],standalone:!0,features:[t.jDz],decls:5,vars:1,consts:[[1,"adv"],[1,"adv__title"],[1,"adv__wrap"],["class","adv__body",4,"ngFor","ngForOf"],[1,"adv__body"],["alt","",1,"adv__img",3,"src"],[1,"adv__text"],[1,"adv__description"],[1,"adv__review"],[1,"adv__price"]],template:function(e,i){1&e&&(t.TgZ(0,"div",0)(1,"div",1),t._uU(2,"\u0412\u0430\u043c \u043c\u043e\u0436\u0435 \u0441\u043f\u043e\u0434\u043e\u0431\u0430\u0442\u0438\u0441\u044f:"),t.qZA(),t.TgZ(3,"div",2),t.YNc(4,C,11,5,"div",3),t.qZA()()),2&e&&(t.xp6(4),t.Q6J("ngForOf",i.advs))},dependencies:[d.ax,_.s],styles:['@import"https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Roboto:ital,wght@0,400;0,500;1,300&family=Satisfy&family=Titan+One&display=swap";@import"https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Manrope&family=Roboto:ital,wght@0,400;0,500;1,300&family=Satisfy&family=Titan+One&display=swap";.adv[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%;gap:16px;padding:40px 16px 16px}.adv__title[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:32px;font-weight:400;font-style:normal;line-height:130%;color:#000}.adv__img[_ngcontent-%COMP%]{width:214px;height:214px;flex-shrink:0;background-size:cover;background-repeat:no-repeat;padding-bottom:20px}.adv__wrap[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;gap:28px}.adv__body[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.adv__text[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:8px}.adv__description[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:16px;font-weight:400;font-style:normal;line-height:130%;color:#000}.adv__review[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:12px;font-weight:400;font-style:normal;line-height:130%;color:#000;color:#595959;cursor:pointer}.adv__review[_ngcontent-%COMP%]:hover{color:#000}.adv__price[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:18px;font-weight:400;font-style:normal;line-height:130%;color:#000}']}),r})(),w=(()=>{var n;class r{constructor(){this.router=(0,t.f3M)(f.F0),this.route=(0,t.f3M)(f.gz),this.cartService=(0,t.f3M)(g)}close(){this.router.navigate([{outlets:{cart:null}}],{relativeTo:this.route.parent})}submit(){this.cartService.getCart()}}return(n=r).\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-cart"]],standalone:!0,features:[t._Bn([{provide:g}]),t.jDz],decls:17,vars:0,consts:[[1,"shadow"],[1,"cart"],[1,"cart__wrap"],[1,"cart__title"],[1,"cart__title-text"],[1,"btn__close",3,"click"],["xmlns","http://www.w3.org/2000/svg","width","44","height","45","viewBox","0 0 44 45","fill","none"],["d","M12.833 13.3333L31.1663 31.6667M12.833 31.6667L31.1663 13.3333","stroke","black","stroke-width","1.5","stroke-linecap","round","stroke-linejoin","round"],[1,"cart__orders"],[1,"cart__order-actions"],["type","button",1,"cart__btn",3,"click"],["type","button",1,"cart__btn-dark-grey",3,"click"]],template:function(e,i){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),t._uU(5,"\u041a\u043e\u0448\u0438\u043a"),t.qZA(),t.TgZ(6,"div",5),t.NdJ("click",function(){return i.close()}),t.O4$(),t.TgZ(7,"svg",6),t._UZ(8,"path",7),t.qZA()()(),t.kcU(),t.TgZ(9,"div",8),t._UZ(10,"app-cart-orders",8),t.TgZ(11,"div",9)(12,"button",10),t.NdJ("click",function(){return i.close()}),t._uU(13," \u041f\u0440\u043e\u0434\u043e\u0432\u0436\u0438\u0442\u0438 \u043f\u043e\u043a\u0443\u043f\u043a\u0438 "),t.qZA(),t.TgZ(14,"button",11),t.NdJ("click",function(){return i.submit()}),t._uU(15," \u041e\u0444\u043e\u0440\u043c\u0438\u0442\u0438 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f "),t.qZA()()(),t._UZ(16,"app-cart-ad"),t.qZA()()())},dependencies:[x,v],styles:['@import"https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Roboto:ital,wght@0,400;0,500;1,300&family=Satisfy&family=Titan+One&display=swap";@import"https://fonts.googleapis.com/css2?family=Inter:wght@900&family=Manrope&family=Roboto:ital,wght@0,400;0,500;1,300&family=Satisfy&family=Titan+One&display=swap";.shadow[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;position:fixed;top:0;left:0;width:100vw;height:100vh;overflow-x:hidden;background:rgba(0,0,0,.2);z-index:800}.cart[_ngcontent-%COMP%]{width:984px;height:1132px;flex-shrink:0;overflow-x:auto;background:#f4f4f4;z-index:900}.cart__orders[_ngcontent-%COMP%]{display:flex;flex-direction:column;width:100%;padding:8px 0 20px;margin:0;align-items:center;gap:20px}.cart__title[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;width:984px;padding:20px 39px 8px 16px;border-bottom:1px solid #ababab}.cart__title-text[_ngcontent-%COMP%]{font-family:Manrope,sans-serif;font-size:36px;font-weight:500;font-style:normal;line-height:normal;color:#000}.cart__order-actions[_ngcontent-%COMP%]{display:inline-flex;justify-content:space-between;align-items:center;width:100%;padding-left:16px;padding-right:26px}.btn__close[_ngcontent-%COMP%]{cursor:pointer}.cart__btn[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:18px;font-weight:400;font-style:normal;line-height:130%;color:#000;display:flex;padding:14px 8px;justify-content:center;align-items:center;gap:8px;border:1px solid #636363;border-radius:8px;color:#1a1a1a}.cart__btn-dark-grey[_ngcontent-%COMP%]{font-family:Roboto,sans-serif;font-size:20px;font-weight:400;font-style:normal;line-height:130%;color:#000;display:flex;padding:16px 12px;justify-content:center;align-items:center;gap:8px;border:none;border-radius:8px;background:#4f4f4f;color:#fff}']}),r})()},8980:(h,u,a)=>{a.d(u,{s:()=>f});var t=a(4946);let f=(()=>{var l;class m{transform(d){return d?new Intl.NumberFormat("uk-UA",{style:"decimal",minimumFractionDigits:2,maximumFractionDigits:2}).format(d)+" \u20b4":""}}return(l=m).\u0275fac=function(d){return new(d||l)},l.\u0275pipe=t.Yjl({name:"transformPrice",type:l,pure:!0,standalone:!0}),m})()}}]);