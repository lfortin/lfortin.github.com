(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();const h=Backbone.Model.extend({defaults:{title:"",description:"",link:null,hasCounter:!1,counter:0},sync:function(){const e=Backbone.sync.apply(this,arguments);return this._xhr=e,e.always(()=>{this._xhr=null}),e},abort:function(){this._xhr&&(this._xhr.abort(),this._xhr=null,this.trigger("abort"))}}),u=Backbone.Collection.extend({model:h,sync:function(){const e=Backbone.sync.apply(this,arguments);return this._xhr=e,e.always(()=>{this._xhr=null}),e},abort:function(){this._xhr&&(this._xhr.abort(),this._xhr=null,this.trigger("abort"))}}),p=`
<div class="container mt-4">
  <h2 class="mb-4">vite-backbone Starter Template: Use Cases</h2>
  <div class="row">
    {{#each usecases}}
      <div class="col-md-4 mb-3">
        <div class="card h-100 shadow-sm" data-model-id="{{id}}">
          <div class="card-body usecase-card">
            <h5 class="card-title"><i class="bi bi-check-circle"></i> {{title}}</h5>
            <p class="card-text">{{description}}</p>
            {{#if link}}
              <a href="{{link}}" class="btn btn-primary learn-more" target="_blank">Learn More</a>
            {{/if}}
            {{#if hasCounter}}
              <a href="#" class="btn btn-success button-counter">count is {{counter}}</a>
            {{/if}}
          </div>
        </div>
      </div>
    {{/each}}
  </div>
</div>
`,b=Backbone.View.extend({id:"home",tagName:"div",events:{"click a.button-counter":"onCounterClick"},onCounterClick(e){e.stopPropagation(),e.preventDefault();const n=$(e.target).closest(".card").attr("data-model-id"),s=this.collection.get(n);s.set("counter",s.get("counter")+1)},initialize(){this.collection=new u,this.listenTo(this.collection,"update reset change",this.render)},template:Handlebars.compile(p),render(){const e=this.template({usecases:this.collection.toJSON()});return this.$el.html(e),this}}),m=Backbone.View.extend({id:"about",tagName:"div",render(){return this.$el.html(`
      <div class="container mt-4">
        <h2>About</h2>
        <p>This is a Vite + Backbone starter template using Bootstrap, Handlebars, and more.</p>
        <p>Released under the MIT-0 License.</p>
      </div>
    `),this}}),f=Backbone.View.extend({id:"help",tagName:"div",render(){return this.$el.html(`
      <div class="container mt-4">
        <h2>Help</h2>
        <p>Need help? Create an issue on the <a href="https://github.com/lfortin/vite-backbone" target="_blank">GitHub repo</a> or check the <a href="https://backbonejs.org/#Getting-started" target="_blank">Backbone.js docs</a>.</p>
      </div>
    `),this}}),g=Backbone.View.extend({id:"not-found",tagName:"div",render(){return this.$el.html(`
      <div class="container mt-4">
        <h2 class="text-danger"><i class="bi bi-exclamation-triangle"></i> 404 Not Found</h2>
        <p>The page you requested could not be found.</p>
      </div>
    `),this}}),k=[{id:"cc895078-2ab0-45e8-b346-2a4d025647c0",title:"Component-Based Views",description:"Backbone lets you structure your app into small reusable views.",link:"https://backbonejs.org/#View"},{id:"eae3cb6c-d6fb-4007-8afd-7d2e32c5b759",title:"Logic + Layout Separation",description:"Handlebars templating keeps your HTML clean and logic-free.",link:"https://handlebarsjs.com/"},{id:"5916615a-0fca-4854-bfc4-c1ffdbea9337",title:"Quick Styling",description:"Bootstrap helps rapidly layout components with minimal CSS.",link:"https://getbootstrap.com/docs/5.3/components/card/"},{id:"177aa50c-a466-4c56-987c-c3c794e4fb8d",title:"Data Binding & Events",description:"Backbone’s models and collections support change events and syncing with RESTful APIs.",link:"https://backbonejs.org/#Model"},{id:"fabe99de-cc77-4d37-9e97-decc3e73fa15",title:"Client-Side Routing",description:"Use Backbone.Router to manage application state and navigation.",link:"https://backbonejs.org/#Router"},{id:"03b7a643-52db-4daa-a5b0-f276782cfcca",title:"Unit Testing",description:"Vitest is a fast, powerful, and easy-to-use JavaScript test runner.",link:"https://vitest.dev/"},{id:"77ed2189-0949-45cd-9746-3ad82b1df137",title:"Fast Dev with Vite",description:"Vite enables blazing fast HMR and optimized production builds.",link:"https://vitejs.dev/"},{id:"dd6eaa1e-f0dc-4f9c-87cc-3f9423a901e6",title:"ESLint for Code Quality",description:"ESLint statically analyzes your code to find problems and enforce style.",link:"https://eslint.org/"},{id:"b975384c-6294-4d51-a87d-b5092078ad2f",title:"Single Page App Foundation",description:"Backbone is ideal for small to medium SPAs with clear structure.",hasCounter:!0}],a=new b,c=new m,l=new f,d=new g,y=Backbone.Router.extend({routes:{"":"home",about:"about",help:"help","*path":"notFound"},initialize(){$("#app").empty(),$("#app").append(a.$el),$("#app").append(c.$el),$("#app").append(l.$el),$("#app").append(d.$el)},_showView(e){e?.$el&&($("#app > div").not(e.el).hide(),e.$el.show())},home(){a.collection.reset(k),this._showView(a)},about(){this._showView(c.render())},help(){this._showView(l.render())},notFound(){this._showView(d.render())}});new y;Backbone.history.start();$(function(){});
