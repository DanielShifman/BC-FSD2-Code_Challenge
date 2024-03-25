(function(){"use strict";var e={5686:function(e,t,s){var n=s(5130),r=s(6768);function a(e,t,s,n,a,o){const i=(0,r.g2)("router-view");return(0,r.uX)(),(0,r.Wv)(i)}var o={name:"App"},i=s(1241);const l=(0,i.A)(o,[["render",a]]);var u=l,d=s(1387),c=s(4232),h=s.p+"img/logo.7bb97497.png";const m=e=>((0,r.Qi)("data-v-70d982b7"),e=e(),(0,r.jt)(),e),p={class:"login-page"},k=m((()=>(0,r.Lk)("img",{alt:"BC Paint Co. Logo",src:h},null,-1))),L={key:0,class:"error-message"},g={key:1,class:"success-message"},y=m((()=>(0,r.Lk)("label",null,"Username:",-1))),v=m((()=>(0,r.Lk)("br",null,null,-1))),b=m((()=>(0,r.Lk)("label",null,"Password:",-1))),f=m((()=>(0,r.Lk)("br",null,null,-1))),w=m((()=>(0,r.Lk)("button",{type:"submit"},"Sign In",-1)));function M(e,t,s,a,o,i){return(0,r.uX)(),(0,r.CE)("div",p,[k,(0,r.Lk)("h1",null,(0,c.v_)(o.greeting),1),o.errorMessage?((0,r.uX)(),(0,r.CE)("div",L,(0,c.v_)(o.errorMessage),1)):(0,r.Q3)("",!0),o.successMessage?((0,r.uX)(),(0,r.CE)("div",g,(0,c.v_)(o.successMessage),1)):(0,r.Q3)("",!0),(0,r.Lk)("form",{onSubmit:t[2]||(t[2]=(0,n.D$)(((...e)=>i.signin&&i.signin(...e)),["prevent"]))},[y,(0,r.bo)((0,r.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>o.username=e),required:""},null,512),[[n.Jo,o.username]]),v,b,(0,r.bo)((0,r.Lk)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>o.password=e),required:""},null,512),[[n.Jo,o.password]]),f,w],32)])}s(4114);const C="http://localhost:8080";var U={name:"SignIn",data(){return{greeting:"BC Paint Co. Internal Portal!",username:"",password:"",errorMessage:"",successMessage:""}},methods:{signin(){this.clearMessages(),fetch(`${C}/signin`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({username:this.username,password:this.password})}).then((e=>{e.ok?(this.successMessage="Successfully signed in!",this.$router.push("/inventory")):this.errorMessage="Invalid username or password. Please try again."})).catch((e=>{console.error("Error:",e),this.errorMessage="An error occurred while signing in. Please try again."}))},clearMessages(){this.errorMessage="",this.successMessage=""}}};const D=(0,i.A)(U,[["render",M],["__scopeId","data-v-70d982b7"]]);var I=D;const E=e=>((0,r.Qi)("data-v-78e8f48a"),e=e(),(0,r.jt)(),e),P={class:"inventory-page"},S={class:"tab-list"},T=E((()=>(0,r.Lk)("br",null,null,-1))),O=["disabled"],N=E((()=>(0,r.Lk)("br",null,null,-1))),A={id:"user-info",style:{"text-align":"left"}},_={style:{"list-style":"none"}},q=E((()=>(0,r.Lk)("li",null,[(0,r.Lk)("strong",null,"Can"),(0,r.eW)(" Read")],-1))),$=E((()=>(0,r.Lk)("strong",null,"Can",-1))),J=["hidden"],j=E((()=>(0,r.Lk)("strong",null,"Can",-1))),F=["hidden"],Q={id:"inv-options"},x={key:0,class:"error-message"},G={key:1,class:"success-message"},V={id:"paint-inv",class:"stock-types"},X=["onDrop"],W={class:"droppable-area"},R=["draggable","onDragstart"],B=E((()=>(0,r.Lk)("br",null,null,-1))),K=["onClick"],H=["onClick"],z=["onClick"],Y={id:"new-item",class:"table-wrapper"},Z={id:"new-item-table",class:"tbl"},ee=E((()=>(0,r.Lk)("thead",null,[(0,r.Lk)("tr",null,[(0,r.Lk)("th",null,"Field"),(0,r.Lk)("th",null,"Value")])],-1))),te=E((()=>(0,r.Lk)("td",null,"Item Type:",-1))),se=E((()=>(0,r.Lk)("option",{value:"paint"},"Paint",-1))),ne=E((()=>(0,r.Lk)("option",{value:"other",disabled:""},"Other",-1))),re=[se,ne],ae={key:0},oe={key:1},ie=E((()=>(0,r.Lk)("td",null,"Quantity:",-1))),le=E((()=>(0,r.Lk)("td",null,"Stock Type:",-1))),ue=E((()=>(0,r.Lk)("option",{value:"Available"},"Available",-1))),de=E((()=>(0,r.Lk)("option",{value:"Running Low"},"Running Low",-1))),ce=E((()=>(0,r.Lk)("option",{value:"Out of Stock"},"Out of Stock",-1))),he=[ue,de,ce],me=E((()=>(0,r.Lk)("td",null,null,-1)));function pe(e,t,s,a,o,i){return(0,r.uX)(),(0,r.CE)(r.FK,null,[(0,r.Lk)("div",P,[(0,r.Lk)("h1",null,(0,c.v_)(o.greeting),1)]),(0,r.Lk)("div",S,[(0,r.eW)(" Signed in as: "+(0,c.v_)(o.userData.username),1),T,(0,r.Lk)("button",{type:"button",id:"signout-button",onClick:t[0]||(t[0]=(...e)=>i.signOut&&i.signOut(...e))}," Sign Out "),(0,r.Lk)("button",{type:"button",id:"user-info-button",onClick:t[1]||(t[1]=(...e)=>i.displayUserInfo&&i.displayUserInfo(...e)),disabled:"user-info"===o.tab}," User Info ",8,O),(0,r.bo)((0,r.Lk)("button",{type:"button",id:"manage-users-button",onClick:t[2]||(t[2]=(...e)=>i.manageUsers&&i.manageUsers(...e))}," Manage Users ",512),[[n.aG,o.muButton]]),N,(0,r.bo)((0,r.Lk)("button",{type:"button",id:"inventory-button",onClick:t[3]||(t[3]=e=>{this.clearMessages(),o.tab="inventory"})}," Return to Inventory ",512),[[n.aG,"inventory"!==o.tab]])]),(0,r.bo)((0,r.Lk)("div",A,[(0,r.Lk)("h2",null,(0,c.v_)(o.userData.username)+" Details",1),(0,r.Lk)("ul",_,[(0,r.Lk)("li",null,"Username: "+(0,c.v_)(o.userData.username),1),(0,r.Lk)("li",null,"Name: "+(0,c.v_)(o.userData.name),1),(0,r.Lk)("li",null,"Email: "+(0,c.v_)(o.userData.email),1),(0,r.Lk)("li",null,"Role: "+(0,c.v_)(o.userData.role),1),(0,r.Lk)("li",null,[(0,r.eW)(" Permissions: "),(0,r.Lk)("ul",null,[q,(0,r.Lk)("li",null,[$,(0,r.Lk)("strong",{hidden:o.userData.permLevel>1},"not",8,J),(0,r.eW)(" Write")]),(0,r.Lk)("li",null,[j,(0,r.Lk)("strong",{hidden:o.userData.permLevel>2},"not",8,F),(0,r.eW)(" Admin")])])])])],512),[[n.aG,"user-info"===o.tab]]),(0,r.bo)((0,r.Lk)("h2",null,(0,c.v_)(o.paintStockHeader),513),[[n.aG,"inventory"===o.tab]]),(0,r.bo)((0,r.Lk)("div",Q,[o.errorMessage?((0,r.uX)(),(0,r.CE)("div",x,(0,c.v_)(o.errorMessage),1)):(0,r.Q3)("",!0),o.successMessage?((0,r.uX)(),(0,r.CE)("div",G,(0,c.v_)(o.successMessage),1)):(0,r.Q3)("",!0),(0,r.Lk)("button",{type:"button",id:"refresh-inv-button",onClick:t[4]||(t[4]=(...e)=>i.refreshInventory&&i.refreshInventory(...e))}," Refresh List "),i.canModify()?(0,r.bo)(((0,r.uX)(),(0,r.CE)("button",{key:2,type:"button",id:"add-inv-button",onClick:t[5]||(t[5]=(...e)=>i.newItem&&i.newItem(...e))}," Add New Item ",512)),[[n.aG,"new-item"!==o.tab]]):(0,r.Q3)("",!0)],512),[[n.aG,"inventory"===o.tab]]),(0,r.bo)((0,r.Lk)("p",null,"Drag items to move them",512),[[n.aG,"inventory"===o.tab&&i.canModify()]]),(0,r.bo)((0,r.Lk)("div",V,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(o.paintStockCats,(e=>((0,r.uX)(),(0,r.CE)("div",{key:e,class:"stock-type",onDragover:t[6]||(t[6]=(0,n.D$)((()=>{}),["prevent"])),onDrop:t=>i.dropItem(e,t)},[(0,r.Lk)("div",W,[(0,r.Lk)("h3",null,(0,c.v_)(e),1),((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(i.getPaintByStock(e),(e=>((0,r.uX)(),(0,r.CE)("div",{class:"inventory-item",key:e.id,draggable:i.canModify(),onDragstart:t=>i.dragStart(e,t)},[(0,r.eW)((0,c.v_)(e.colour)+": "+(0,c.v_)(e.quantity)+" available",1),B,i.canModify()?((0,r.uX)(),(0,r.CE)("button",{key:0,type:"button",onClick:t=>i.modifyQuantity(e,"decrement")},"-",8,K)):(0,r.Q3)("",!0),i.canModify()?((0,r.uX)(),(0,r.CE)("button",{key:1,type:"button",onClick:t=>i.deleteItem(e.id)},"Delete",8,H)):(0,r.Q3)("",!0),i.canModify()?((0,r.uX)(),(0,r.CE)("button",{key:2,type:"button",onClick:t=>i.modifyQuantity(e,"increment")},"+",8,z)):(0,r.Q3)("",!0)],40,R)))),128))])],40,X)))),128))],512),[[n.aG,"inventory"===o.tab]]),(0,r.bo)((0,r.Lk)("div",Y,[(0,r.bo)((0,r.Lk)("table",Z,[ee,(0,r.Lk)("tbody",null,[(0,r.Lk)("tr",null,[te,(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("select",{id:"item-type",name:"item-type",required:"","onUpdate:modelValue":t[7]||(t[7]=e=>o.newItemType=e)},re,512),[[n.u1,o.newItemType]])])]),(0,r.Lk)("tr",null,["paint"!==o.newItemType?((0,r.uX)(),(0,r.CE)("td",ae,"Name:")):(0,r.Q3)("",!0),"paint"===o.newItemType?((0,r.uX)(),(0,r.CE)("td",oe,"Colour:")):(0,r.Q3)("",!0),(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("input",{type:"text",id:"item-name",name:"item-name",required:"","onUpdate:modelValue":t[8]||(t[8]=e=>o.newItemName=e)},null,512),[[n.Jo,o.newItemName]])])]),(0,r.Lk)("tr",null,[ie,(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("input",{type:"number",id:"item-quantity",name:"item-quantity",min:"0",required:"","onUpdate:modelValue":t[9]||(t[9]=e=>o.newItemQuantity=e)},null,512),[[n.Jo,o.newItemQuantity]])])]),(0,r.Lk)("tr",null,[le,(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("select",{id:"item-stock",name:"item-stock",required:"","onUpdate:modelValue":t[10]||(t[10]=e=>o.newItemStock=e)},he,512),[[n.u1,o.newItemStock]])])]),(0,r.Lk)("tr",null,[me,(0,r.Lk)("td",null,[(0,r.Lk)("button",{type:"button",id:"submit-item",onClick:t[11]||(t[11]=(...e)=>i.submitNewItem&&i.submitNewItem(...e))}," Add Item ")])])])],512),[[n.aG,"new-item"===o.tab]])],512),[[n.aG,"new-item"===o.tab]])],64)}s(4979);var ke={name:"InventoryPage",data(){return{greeting:"BC Paint Co. Inventory!",paintStockHeader:"Paint Stock Chart",paintStockCats:["Available","Running Low","Out of Stock"],userData:{},inventoryData:[],muButton:!1,tab:"inventory",errorMessage:"",successMessage:"",newItemType:"paint",newItemName:"",newItemQuantity:0,newItemStock:"Available"}},mounted(){this.fetchUserData(),this.fetchInventoryData()},methods:{fetchUserData(){fetch(`${C}/data?user`,{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"}).then((e=>{if(e.ok)return e.json();this.errorMessage="Unable to retrieve user data!"})).then((e=>{void 0!==e?(this.userData=e,3===this.userData.permLevel&&(this.muButton=!0)):(this.userData={username:"USERNAME UNKNOWN"},this.$router.push("/"))})).catch((e=>{console.error("Error:",e),this.errorMessage="An error occurred!"}))},fetchInventoryData(){fetch(`${C}/data?inventory`,{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"}).then((e=>{if(e.ok)return e.json();this.errorMessage="Unable to retrieve inventory data!"})).then((e=>{if(void 0!==e){console.log(e);for(let t=0;t<e.length;t++)this.inventoryData.push(e[t])}else this.inventoryData={},this.$router.push("/")})).catch((e=>{console.error("Error:",e),this.errorMessage="An error occurred!"}))},signOut(){this.clearMessages(),fetch(`${C}/signout`,{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"}).then((e=>{e.ok?(this.successMessage="Signed out successfully!",this.$router.push("/")):this.errorMessage="Failed to sign out!"})).catch((e=>{console.error("Error:",e),this.errorMessage="An error occurred!"}))},getPaintByStock(e){return this.inventoryData.filter((t=>"paint"===t.item&&e===t.stockType))},dragStart(e,t){t.dataTransfer.setData("text/plain",JSON.stringify(e))},dropItem(e,t){t.preventDefault();const s=JSON.parse(t.dataTransfer.getData("text/plain")),n=s.stockType;s.stockType=e;const r=this.inventoryData.findIndex((e=>e.id===s.id));this.inventoryData[r]=s,fetch(`${C}/data?paintStock`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(s)}).then((e=>{202===e.status?(console.log("Updated stock successfully"),this.inventoryData.sort(((e,t)=>e.colour.localeCompare(t.colour)))):(this.errorMessage="Failure to update stock",s.stockType=n)})).catch((e=>{console.error("Error:",e),this.errorMessage="An error occurred!",s.stockType=n,this.inventoryData[r]=s}))},canModify(){return this.userData.permLevel>=2},displayUserInfo(){this.clearMessages(),this.tab="user-info"},manageUsers(){this.clearMessages();const e=JSON.stringify(this.userData);this.$router.push("/admin?loggedInUserData="+btoa(e))},clearMessages(){this.errorMessage="",this.successMessage=""},modifyQuantity(e,t){this.clearMessages();const s=this.inventoryData.findIndex((t=>t.id===e.id));if("increment"===t)e.quantity++;else if("decrement"===t){if(0===e.quantity)return void(this.errorMessage="Cannot have negative stock!");e.quantity--}this.inventoryData[s]=e,fetch(`${C}/data?paintQuantity`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(e)}).then((n=>{202===n.status?console.log("Updated stock successfully"):(this.errorMessage="Failure to update stock","increment"===t?e.quantity--:"decrement"===t&&e.quantity++,this.inventoryData[s]=e)})).catch((n=>{console.error("Error:",n),this.errorMessage="An error occurred!","increment"===t?e.quantity--:"decrement"===t&&e.quantity++,this.inventoryData[s]=e}))},refreshInventory(){this.clearMessages(),this.inventoryData=[],this.fetchInventoryData()},clearFields(){this.newItemType="paint",this.newItemQuantity=0,this.newItemStock="Available"},newItem(){this.clearMessages(),this.clearFields(),this.tab="new-item",console.log("New Item")},submitNewItem(){if(this.clearMessages(),"paint"!==this.newItemType)return void(this.errorMessage="Only paint items can be added at this time!");if(this.newItemQuantity<0)return void(this.errorMessage="Cannot have negative stock!");const e={item:this.newItemType,colour:this.newItemName,quantity:this.newItemQuantity,stockType:this.newItemStock};fetch(`${C}/data?addPaint`,{method:"PUT",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(e)}).then((t=>{201===t.status?(this.successMessage="Successfully added new item!",this.clearFields(),this.tab="inventory",t.text().then((t=>{e.id=t})),this.inventoryData.push(e),this.inventoryData.sort(((e,t)=>e.colour.localeCompare(t.colour)))):this.errorMessage="Failure to add new item"})).catch((e=>{console.error("Error:",e),this.errorMessage="An error occurred!"}))},deleteItem(e){if(this.clearMessages(),!confirm('Are you sure you want to delete this item?\nPress "OK" to confirm, or "Cancel" to abort.'))return;const t=this.inventoryData.findIndex((t=>t.id===e)),s=this.inventoryData[t];fetch(`${C}/data?deleteInventoryItem=${e}`,{method:"DELETE",headers:{"Content-Type":"application/json"},credentials:"include"}).then((e=>{202===e.status?(console.log("Deleted item successfully"),this.inventoryData.splice(t,1)):(this.errorMessage="Failure to delete item",this.inventoryData.push(s),this.inventoryData.sort(((e,t)=>e.colour.localeCompare(t.colour))))})).catch((e=>{console.error("Error:",e),this.errorMessage="An error occurred!"}))}}};const Le=(0,i.A)(ke,[["render",pe],["__scopeId","data-v-78e8f48a"]]);var ge=Le;const ye=e=>((0,r.Qi)("data-v-144f425d"),e=e(),(0,r.jt)(),e),ve={class:"admin-page"},be={class:"tab-list"},fe=ye((()=>(0,r.Lk)("br",null,null,-1))),we={key:0,class:"error-message"},Me={key:1,class:"success-message"},Ce={class:"table-wrapper"},Ue={id:"user-table",class:"tbl"},De=ye((()=>(0,r.Lk)("thead",null,[(0,r.Lk)("tr",null,[(0,r.Lk)("th",null,"Username"),(0,r.Lk)("th",null,"Email"),(0,r.Lk)("th",null,"Name"),(0,r.Lk)("th",null,"Role"),(0,r.Lk)("th",null,"Permission Level"),(0,r.Lk)("th",null,"Modify"),(0,r.Lk)("th",null,"Delete")])],-1))),Ie=["onClick","disabled"],Ee=["onClick","disabled"],Pe={id:"new-user-table",class:"tbl"},Se=ye((()=>(0,r.Lk)("thead",null,[(0,r.Lk)("tr",null,[(0,r.Lk)("th",null,"Field"),(0,r.Lk)("th",null,"Value")])],-1))),Te=ye((()=>(0,r.Lk)("td",null,"Username:",-1))),Oe=ye((()=>(0,r.Lk)("td",null,"Password:",-1))),Ne=ye((()=>(0,r.Lk)("td",null,"Confirm Password:",-1))),Ae=ye((()=>(0,r.Lk)("td",null,"Email:",-1))),_e=ye((()=>(0,r.Lk)("td",null,"Name:",-1))),qe=ye((()=>(0,r.Lk)("td",null,"Role:",-1))),$e=ye((()=>(0,r.Lk)("td",null,"Permission Level:",-1))),Je=ye((()=>(0,r.Lk)("td",null,"Permissions:",-1))),je={id:"perm-list",style:{"list-style":"none"}},Fe=ye((()=>(0,r.Lk)("li",null,[(0,r.Lk)("strong",null,"Can"),(0,r.eW)(" Read")],-1))),Qe=ye((()=>(0,r.Lk)("strong",null,"Can",-1))),xe=["hidden"],Ge=ye((()=>(0,r.Lk)("strong",null,"Can",-1))),Ve=["hidden"],Xe=ye((()=>(0,r.Lk)("td",null,null,-1))),We={id:"modify-user-table",class:"tbl"},Re=ye((()=>(0,r.Lk)("thead",null,[(0,r.Lk)("tr",null,[(0,r.Lk)("th",null,"Field"),(0,r.Lk)("th",null,"Value")])],-1))),Be=ye((()=>(0,r.Lk)("td",null,"Username:",-1))),Ke=ye((()=>(0,r.Lk)("td",null,"New Password:",-1))),He=ye((()=>(0,r.Lk)("td",null,"Confirm New Password:",-1))),ze=ye((()=>(0,r.Lk)("td",null,"Email:",-1))),Ye=ye((()=>(0,r.Lk)("td",null,"Name:",-1))),Ze=ye((()=>(0,r.Lk)("td",null,"Role:",-1))),et=ye((()=>(0,r.Lk)("td",null,"Permission Level:",-1))),tt=ye((()=>(0,r.Lk)("td",null,"Permissions:",-1))),st={id:"perm-list",style:{"list-style":"none"}},nt=ye((()=>(0,r.Lk)("li",null,[(0,r.Lk)("strong",null,"Can"),(0,r.eW)(" Read")],-1))),rt=ye((()=>(0,r.Lk)("strong",null,"Can",-1))),at=["hidden"],ot=ye((()=>(0,r.Lk)("strong",null,"Can",-1))),it=["hidden"],lt=ye((()=>(0,r.Lk)("td",null,null,-1)));function ut(e,t,s,a,o,i){return(0,r.uX)(),(0,r.CE)(r.FK,null,[(0,r.Lk)("div",ve,[(0,r.Lk)("h1",null,(0,c.v_)(o.greeting),1),(0,r.Lk)("h2",null,(0,c.v_)(o.adminPageHeader),1)]),(0,r.Lk)("div",be,[(0,r.eW)(" Signed in as: "+(0,c.v_)(o.loggedInUserData.username),1),fe,(0,r.Lk)("button",{type:"button",id:"signout-button",onClick:t[0]||(t[0]=(...e)=>i.signOut&&i.signOut(...e))}," Sign Out "),(0,r.bo)((0,r.Lk)("button",{type:"button",id:"add-user-button",onClick:t[1]||(t[1]=e=>{i.clearFields(),o.tab="new-user"})}," New User ",512),[[n.aG,"new-user"!==o.tab]]),(0,r.bo)((0,r.Lk)("button",{type:"button",id:"list-users-button",onClick:t[2]||(t[2]=e=>o.tab="user-list")}," List Users ",512),[[n.aG,"user-list"!==o.tab]]),(0,r.bo)((0,r.Lk)("button",{type:"button",id:"refresh-list-button",onClick:t[3]||(t[3]=(...e)=>i.refreshUserList&&i.refreshUserList(...e))}," Refresh List ",512),[[n.aG,"user-list"===o.tab]]),(0,r.bo)((0,r.Lk)("button",{type:"button",id:"inventory-button",onClick:t[4]||(t[4]=e=>this.$router.push("/inventory"))}," Return to Inventory ",512),[[n.aG,"inventory"!==o.tab]])]),o.errorMessage?((0,r.uX)(),(0,r.CE)("div",we,(0,c.v_)(o.errorMessage),1)):(0,r.Q3)("",!0),o.successMessage?((0,r.uX)(),(0,r.CE)("div",Me,(0,c.v_)(o.successMessage),1)):(0,r.Q3)("",!0),(0,r.Lk)("div",Ce,[(0,r.bo)((0,r.Lk)("table",Ue,[De,(0,r.Lk)("tbody",null,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(o.userData,(e=>((0,r.uX)(),(0,r.CE)("tr",{key:e.username},[(0,r.Lk)("td",null,(0,c.v_)(e.username),1),(0,r.Lk)("td",null,(0,c.v_)(e.email),1),(0,r.Lk)("td",null,(0,c.v_)(e.name),1),(0,r.Lk)("td",null,(0,c.v_)(e.role),1),(0,r.Lk)("td",null,(0,c.v_)(e.permLevel),1),(0,r.Lk)("td",null,[(0,r.Lk)("button",{onClick:t=>i.modifyUser(e.id),disabled:o.loggedInUserData.id===e.id},"Modify",8,Ie)]),(0,r.Lk)("td",null,[(0,r.Lk)("button",{onClick:t=>i.deleteUser(e.id),disabled:o.loggedInUserData.id===e.id},"Delete",8,Ee)])])))),128))])],512),[[n.aG,"user-list"===o.tab]]),(0,r.bo)((0,r.Lk)("table",Pe,[Se,(0,r.Lk)("tbody",null,[(0,r.Lk)("tr",null,[Te,(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("input",{type:"text","onUpdate:modelValue":t[5]||(t[5]=e=>o.username=e),required:""},null,512),[[n.Jo,o.username]])])]),(0,r.Lk)("tr",null,[Oe,(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("input",{type:"password","onUpdate:modelValue":t[6]||(t[6]=e=>o.password=e),required:""},null,512),[[n.Jo,o.password]])])]),(0,r.Lk)("tr",null,[Ne,(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("input",{type:"password","onUpdate:modelValue":t[7]||(t[7]=e=>o.confirmPassword=e),required:""},null,512),[[n.Jo,o.confirmPassword]])])]),(0,r.Lk)("tr",null,[Ae,(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("input",{type:"text","onUpdate:modelValue":t[8]||(t[8]=e=>o.email=e),required:""},null,512),[[n.Jo,o.email]])])]),(0,r.Lk)("tr",null,[_e,(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("input",{type:"text","onUpdate:modelValue":t[9]||(t[9]=e=>o.name=e),required:""},null,512),[[n.Jo,o.name]])])]),(0,r.Lk)("tr",null,[qe,(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("input",{type:"text","onUpdate:modelValue":t[10]||(t[10]=e=>o.role=e),required:""},null,512),[[n.Jo,o.role]])])]),(0,r.Lk)("tr",null,[$e,(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("input",{type:"number","onUpdate:modelValue":t[11]||(t[11]=e=>o.permLevel=e),required:"",min:"1",max:"3"},null,512),[[n.Jo,o.permLevel]])])]),(0,r.Lk)("tr",null,[Je,(0,r.Lk)("td",null,[(0,r.Lk)("ul",je,[Fe,(0,r.Lk)("li",null,[Qe,(0,r.Lk)("strong",{hidden:o.permLevel>1},"not",8,xe),(0,r.eW)(" Write")]),(0,r.Lk)("li",null,[Ge,(0,r.Lk)("strong",{hidden:o.permLevel>2},"not",8,Ve),(0,r.eW)(" Admin")])])])]),(0,r.Lk)("tr",null,[Xe,(0,r.Lk)("td",null,[(0,r.Lk)("button",{onClick:t[12]||(t[12]=(...e)=>i.createUser&&i.createUser(...e))},"Create User")])])])],512),[[n.aG,"new-user"===o.tab]]),(0,r.bo)((0,r.Lk)("table",We,[Re,(0,r.Lk)("tbody",null,[(0,r.Lk)("tr",null,[Be,(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("input",{type:"text","onUpdate:modelValue":t[13]||(t[13]=e=>o.username=e),required:""},null,512),[[n.Jo,o.username]])])]),(0,r.Lk)("tr",null,[Ke,(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("input",{type:"password","onUpdate:modelValue":t[14]||(t[14]=e=>o.password=e),required:""},null,512),[[n.Jo,o.password]])])]),(0,r.Lk)("tr",null,[He,(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("input",{type:"password","onUpdate:modelValue":t[15]||(t[15]=e=>o.confirmPassword=e),required:""},null,512),[[n.Jo,o.confirmPassword]])])]),(0,r.Lk)("tr",null,[ze,(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("input",{type:"text","onUpdate:modelValue":t[16]||(t[16]=e=>o.email=e),required:""},null,512),[[n.Jo,o.email]])])]),(0,r.Lk)("tr",null,[Ye,(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("input",{type:"text","onUpdate:modelValue":t[17]||(t[17]=e=>o.name=e),required:""},null,512),[[n.Jo,o.name]])])]),(0,r.Lk)("tr",null,[Ze,(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("input",{type:"text","onUpdate:modelValue":t[18]||(t[18]=e=>o.role=e),required:""},null,512),[[n.Jo,o.role]])])]),(0,r.Lk)("tr",null,[et,(0,r.Lk)("td",null,[(0,r.bo)((0,r.Lk)("input",{type:"number","onUpdate:modelValue":t[19]||(t[19]=e=>o.permLevel=e),required:"",min:"1",max:"3"},null,512),[[n.Jo,o.permLevel]])])]),(0,r.Lk)("tr",null,[tt,(0,r.Lk)("td",null,[(0,r.Lk)("ul",st,[nt,(0,r.Lk)("li",null,[rt,(0,r.Lk)("strong",{hidden:o.permLevel>1},"not",8,at),(0,r.eW)(" Write")]),(0,r.Lk)("li",null,[ot,(0,r.Lk)("strong",{hidden:o.permLevel>2},"not",8,it),(0,r.eW)(" Admin")])])])]),(0,r.Lk)("tr",null,[lt,(0,r.Lk)("td",null,[(0,r.Lk)("button",{onClick:t[20]||(t[20]=(...e)=>i.updateUser&&i.updateUser(...e))},"Modify User")])])])],512),[[n.aG,"modify-user"===o.tab]])])],64)}var dt={name:"AdminPage",data(){return{greeting:"BC Paint Co. Inventory!",adminPageHeader:"Administration",loggedInUserData:{},userData:[],tab:"user-list",username:"",password:"",confirmPassword:"",name:"",email:"",role:"",permLevel:1,errorMessage:"",successMessage:""}},created(){const e=this.$route.query.loggedInUserData;if(void 0===e)return void this.fetchUserData();const t=atob(e);this.loggedInUserData=JSON.parse(t)},mounted(){this.fetchUserDataList()},methods:{fetchUserData(){fetch(`${C}/data?user`,{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"}).then((e=>{if(e.ok)return e.json();this.errorMessage="Unable to retrieve user data!"})).then((e=>{void 0!==e?this.loggedInUserData=e:(this.loggedInUserData={username:"USERNAME UNKNOWN"},this.$router.push("/"))})).catch((e=>{console.error("Error:",e),this.errorMessage="An error occurred!"}))},fetchUserDataList(){fetch(`${C}/data?users`,{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"}).then((e=>{if(e.ok)return e.json();this.errorMessage="Unable to retrieve user data!"})).then((e=>{if(void 0!==e)for(let t=0;t<e.length;t++)this.userData.push(e[t]),console.log(e[t]);else this.loggedInUserData={username:"USERNAME UNKNOWN"},this.$router.push("/")})).catch((e=>{console.error("Error:",e),this.errorMessage="An error occurred!"}))},signOut(){fetch(`${C}/signout`,{method:"GET",headers:{"Content-Type":"application/json"},credentials:"include"}).then((e=>{e.ok?(this.successMessage="Signed out successfully",this.$router.push("/")):this.errorMessage="Failed to sign out"})).catch((e=>{console.error("Error:",e),this.errorMessage="An error occurred!"}))},createUser(){if(this.errorMessage="",this.successMessage="",!this.username||!this.password||!this.confirmPassword||!this.email||!this.name||!this.role)return void(this.errorMessage="Please fill in all fields");if(this.password!==this.confirmPassword)return void(this.errorMessage="Passwords do not match");if(this.permLevel<1||this.permLevel>3)return void(this.errorMessage="Permission level must be between 1 and 3");const e={username:this.username,password:this.password,email:this.email,name:this.name,role:this.role,permLevel:this.permLevel};fetch(`${C}/data?addUser`,{method:"PUT",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(e)}).then((e=>{201===e.status?(this.successMessage="User created successfully",this.clearFields()):this.errorMessage="Failed to create user"})).catch((e=>{console.error("Error:",e),this.errorMessage="An error occurred while creating user"}))},modifyUser(e){console.log(`Modify: ${e}`),this.errorMessage="",this.successMessage="",this.clearFields(),this.tab="modify-user";const t=this.userData.find((t=>t.id===e));this.username=t.username,this.email=t.email,this.name=t.name,this.role=t.role,this.permLevel=t.permLevel},updateUser(){if(this.errorMessage="",this.successMessage="",!this.username||!this.email||!this.name||!this.role)return void(this.errorMessage="Please fill in all fields");if(this.password&&!this.confirmPassword||!this.password&&this.confirmPassword)return void(this.errorMessage="Both password fields must be filled to update password");if(this.password&&this.password!==this.confirmPassword)return void(this.errorMessage="Passwords do not match");const e={id:this.userData.find((e=>e.username===this.username)).id,username:this.username,password:this.password,email:this.email,name:this.name,role:this.role,permLevel:this.permLevel};fetch(`${C}/data?updateUser`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify(e)}).then((t=>{202===t.status?(this.successMessage="User updated successfully",this.clearFields(),this.userData=this.userData.map((t=>t.username===e.username?e:t)),this.tab="user-list"):this.errorMessage="Failed to update user"})).catch((e=>{console.error("Error:",e),this.errorMessage="An error occurred while updating user"}))},deleteUser(e){fetch(`${C}/data?deleteUser=${e}`,{method:"DELETE",credentials:"include"}).then((t=>{202===t.status?(this.successMessage="User deleted successfully",this.userData=this.userData.filter((t=>t.id!==e))):this.errorMessage="Failed to delete user"})).catch((e=>{console.error("Error:",e),this.errorMessage="An error occurred while deleting user"}))},refreshUserList(){this.userData=[],this.fetchUserDataList()},clearFields(){this.username="",this.password="",this.confirmPassword="",this.email="",this.name="",this.role="",this.permLevel=1}}};const ct=(0,i.A)(dt,[["render",ut],["__scopeId","data-v-144f425d"]]);var ht=ct;const mt=(0,d.aE)({history:(0,d.LA)(),routes:[{path:"/",component:I},{path:"/inventory",component:ge},{path:"/admin",component:ht}]});(0,n.Ef)(u).use(mt).mount("#app")}},t={};function s(n){var r=t[n];if(void 0!==r)return r.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,s),a.exports}s.m=e,function(){var e=[];s.O=function(t,n,r,a){if(!n){var o=1/0;for(d=0;d<e.length;d++){n=e[d][0],r=e[d][1],a=e[d][2];for(var i=!0,l=0;l<n.length;l++)(!1&a||o>=a)&&Object.keys(s.O).every((function(e){return s.O[e](n[l])}))?n.splice(l--,1):(i=!1,a<o&&(o=a));if(i){e.splice(d--,1);var u=r();void 0!==u&&(t=u)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[n,r,a]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){s.p=""}(),function(){var e={57:0};s.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,a,o=n[0],i=n[1],l=n[2],u=0;if(o.some((function(t){return 0!==e[t]}))){for(r in i)s.o(i,r)&&(s.m[r]=i[r]);if(l)var d=l(s)}for(t&&t(n);u<o.length;u++)a=o[u],s.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return s.O(d)},n=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=s.O(void 0,[504],(function(){return s(5686)}));n=s.O(n)})();
//# sourceMappingURL=index.1f8768a1.js.map