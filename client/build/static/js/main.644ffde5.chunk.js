(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{37:function(e,a,t){"use strict";t.r(a);var n=t(0),s=t.n(n),c=t(17),o=t.n(c),l=t(11),r=t(9),i=t(10),b=t(13),m=t(12),d=t(24),u=t(3),h=t(14),p=t(1),j=function(e){Object(b.a)(t,e);var a=Object(m.a)(t);function t(e){var n;return Object(r.a)(this,t),(n=a.call(this,e)).state={campaigns_name:"",email_subject:"",email_body:"",status:"",schedule_time:"",attachments:[]},n.handleSubmit=n.handleSubmit.bind(Object(h.a)(n)),n.changeHandler=n.changeHandler.bind(Object(h.a)(n)),n.handleInputChanged=n.handleInputChanged.bind(Object(h.a)(n)),n}return Object(i.a)(t,[{key:"handleInputChanged",value:function(e){console.log(e.target.value,e.target.name)}},{key:"handleSubmit",value:function(){}},{key:"changeHandler",value:function(e){var a=this.state.attachments.push(e.target.files[0]);this.setState({selectedFile:a})}},{key:"render",value:function(){return Object(p.jsx)("div",{className:"row",children:Object(p.jsx)("div",{className:"col-md-6",children:Object(p.jsxs)("form",{onSubmit:this.handleSubmit,children:[Object(p.jsxs)("div",{className:"mb-3",children:[Object(p.jsx)("label",{htmlFor:"exampleInputEmail1",className:"form-label",children:"Campain Name"}),Object(p.jsx)("input",{type:"text",className:"form-control",onChange:this.handleInputChanged,"aria-describedby":"emailHelp"})]}),Object(p.jsxs)("div",{class:"mb-3",children:[Object(p.jsx)("label",{htmlFor:"exampleInputPassword1",className:"form-label",children:"Email Subject"}),Object(p.jsx)("input",{type:"text",name:"email_subject",className:"form-control",id:"exampleInputPassword1"})]}),Object(p.jsxs)("div",{className:"mb-3",children:[Object(p.jsx)("label",{htmlFor:"exampleInputPassword1",className:"form-label",children:"Email Body"}),Object(p.jsx)("textarea",{name:"email_body",className:"form-control",id:"exampleFormControlTextarea1",rows:"3"})]}),Object(p.jsxs)("div",{className:"mb-3",children:[Object(p.jsx)("label",{htmlFor:"exampleInputPassword1",className:"form-label",children:"Add contact CSV"}),Object(p.jsx)("input",{onChange:this.changeHandler,type:"file",className:"form-control-file",id:"exampleFormControlFile1"})]}),Object(p.jsxs)("div",{className:"mb-3 form-check",children:[Object(p.jsx)("input",{name:"status",type:"checkbox",className:"form-check-input",id:"exampleCheck1",value:"1"}),Object(p.jsx)("label",{className:"form-check-label",htmlFor:"exampleCheck1",children:"Enable"})]}),Object(p.jsx)("button",{type:"submit",className:"btn btn-primary",children:"Submit"})]})})})}}]),t}(s.a.Component);var x=Object(l.b)((function(e){console.log(e);var a=e.campaign,t=a.campaigns;return{loading:a.loading,campaigns:t}}))(j),O="CAMPAIGN_LIST_SUCCESS",g="LOADING",f="CAMPAIGN_SUBMIT_SUCCESS",v="AVAILABLE_SUCCESS",y="AVAILABLE_LOADING",N="MESSAGE_SET",k="CAMPAIGN_SUBMIT_LOADING",A={loadDashboard:function(){return function(e){fetch(S+"/campaign/lists").then((function(e){return e.json()})).then((function(a){var t;e((t=a.payload,{type:O,payload:t}))})).catch((function(e){console.log(e)}))}},bookRoom:function(e,a){var t={method:"POST",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest",Accept:"application/json"},body:JSON.stringify({first_name:e.firstname,last_name:e.lastname,email:e.email,reservation_date:e.reservation_date})};return function(e){e({type:k,payload:{buttonText:"Please wait & Processing...."}}),fetch(S+"book/room",t).then((function(t){return t.text().then((function(n){var s=n&&JSON.parse(n);if(!t.ok){var c=s&&s.message||t.statusText;return Promise.reject(c)}e({type:f,payload:{isAvailable:!1,buttonText:"Check Availability",message:"Your room has been successfully booked, Thanks."}}),a()}))}))}},checkAvailable:function(e){var a={method:"POST",headers:{"Content-Type":"application/json","X-Requested-With":"XMLHttpRequest",Accept:"application/json"},body:JSON.stringify({reservation_date:e.reservation_date})};return function(e){e({type:y,payload:{buttonText:"Checking..."}}),fetch(S+"check/room-available",a).then((function(a){return a.text().then((function(t){var n=t&&JSON.parse(t);if(!a.ok){var s=n&&n.message||a.statusText;return Promise.reject(s)}var c="free"===n.payload;e(function(e,a,t){return{type:v,payload:{isAvailable:e,buttonText:a,message:t}}}(c,c?"Book Now":"Check Availability",c?"Yes you can Book Now.":"Sorry!! Room has been Already Booked."))}))}))}},setMessage:function(e){return function(a){a(function(e){return{type:N,payload:{message:e}}}(e))}}},S="http://localhost:3000";var C=function(e){return Object(p.jsx)("div",{className:"col-xl-3 col-md-6 mb-4",children:Object(p.jsx)("div",{className:"card border-left-primary shadow h-100 py-2",children:Object(p.jsx)("div",{className:"card-body",children:Object(p.jsxs)("div",{className:"row no-gutters align-items-center",children:[Object(p.jsxs)("div",{className:"col mr-2",children:[Object(p.jsx)("div",{className:"text-xs font-weight-bold text-primary text-uppercase mb-1",children:e.data.campaigns_name}),Object(p.jsx)("div",{className:"h5 mb-0 font-weight-bold text-gray-800",children:1===e.data.status?"Enable":"Disable"})]}),Object(p.jsx)("div",{className:"col-auto",children:Object(p.jsx)("i",{className:"fas fa-envelope-open-text fa-2x text-gray-300"})})]})})})})},T=function(e){Object(b.a)(t,e);var a=Object(m.a)(t);function t(e){var n;return Object(r.a)(this,t),(n=a.call(this,e)).state={},n}return Object(i.a)(t,[{key:"componentDidMount",value:function(){this.props.loadDashBoard()}},{key:"render",value:function(){var e=[];return this.props.campaigns.map((function(a){return e.push(Object(p.jsx)(C,{data:a}))})),Object(p.jsx)("div",{className:"row",children:e})}}]),t}(s.a.Component);var _=Object(l.b)((function(e){console.log(e);var a=e.campaign,t=a.campaigns;return{loading:a.loading,campaigns:t}}),(function(e){return{loadDashBoard:function(a){return e(A.loadDashboard(a))}}}))(T),I=function(e){Object(b.a)(t,e);var a=Object(m.a)(t);function t(e){var n;return Object(r.a)(this,t),(n=a.call(this,e)).state={firstname:"",lastname:"",email:"",errors:[]},n}return Object(i.a)(t,[{key:"render",value:function(){return Object(p.jsxs)(d.a,{children:[Object(p.jsx)(u.a,{path:"/",exact:!0,component:_}),Object(p.jsx)(u.a,{path:"/campaign-lists",component:w}),Object(p.jsx)(u.a,{path:"/campaign-add",component:x})]})}}]),t}(s.a.Component);function w(){return Object(p.jsx)("h1",{className:"h3 mb-4 text-gray-800",children:"Blank Page"})}var E=t(22),P=t(15),B=t(26),L=t(27),M={loading:!1,campaigns:[],isAvailable:!1,buttonText:"Check Availability",message:""};var D=Object(P.b)({campaign:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case g:return Object.assign({},e,{loading:a.payload});case O:return Object.assign({},e,{campaigns:a.payload});case v:return Object.assign({},e,{isAvailable:a.payload.isAvailable,buttonText:a.payload.buttonText,message:a.payload.message});case k:return Object.assign({},e,{buttonText:a.payload.buttonText});case f:return Object.assign({},e,{isAvailable:a.payload.isAvailable,buttonText:a.payload.buttonText,message:a.payload.message});case y:return Object.assign({},e,{buttonText:a.payload.buttonText});case N:return Object.assign({},e,{message:a.payload.message});default:return e}}}),F=(Object(L.createLogger)(),[]);F=[].concat(Object(E.a)(F),[B.a]);var G=Object(P.d)(D,Object(P.c)(P.a.apply(void 0,Object(E.a)(F)))),H=document.getElementById("root");o.a.render(Object(p.jsx)(l.a,{store:G,children:Object(p.jsx)(I,{})}),H)}},[[37,1,2]]]);
//# sourceMappingURL=main.644ffde5.chunk.js.map