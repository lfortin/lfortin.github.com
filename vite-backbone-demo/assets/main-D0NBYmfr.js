(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function a(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(s){if(s.ep)return;s.ep=!0;const i=a(s);fetch(s.href,i)}})();const w=Backbone.Model.extend({defaults:{title:"",description:"",link:null,hasCounter:!1,counter:0},sync:function(){const e=Backbone.sync.apply(this,arguments);return this._xhr=e,e.always(()=>{this._xhr=null}),e},abort:function(){this._xhr&&(this._xhr.abort(),this._xhr=null,this.trigger("abort"))}}),v=Backbone.Collection.extend({model:w,sync:function(){const e=Backbone.sync.apply(this,arguments);return this._xhr=e,e.always(()=>{this._xhr=null}),e},abort:function(){this._xhr&&(this._xhr.abort(),this._xhr=null,this.trigger("abort"))}}),k=`
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
`,y=Backbone.View.extend({id:"home",tagName:"div",events:{"click a.button-counter":"onCounterClick"},onCounterClick(e){e.stopPropagation(),e.preventDefault();const t=$(e.target).closest(".card").attr("data-model-id"),a=this.collection.get(t);a.set("counter",a.get("counter")+1)},initialize(){this.collection=new v,this.listenTo(this.collection,"update reset change",this.render)},template:Handlebars.compile(k),render(){const e=this.template({usecases:this.collection.toJSON()});return this.$el.html(e),this}}),x=`
  <div class="container mt-4">
    <h2>About</h2>
    <p>This is a Vite + Backbone starter template using Bootstrap, Handlebars, and more.</p>
    <p>Released under the MIT-0 License.</p>
  </div>
`,B=Backbone.View.extend({id:"about",tagName:"div",render(){return this.$el.html(x),this}}),P=`
  <div class="container mt-4">
    <h2>Help</h2>
    <p>Need help? Create an issue on the <a href="https://github.com/lfortin/vite-backbone" target="_blank">GitHub repo</a> or check the <a href="https://backbonejs.org/#Getting-started" target="_blank">Backbone.js docs</a>.</p>
  </div>
`,V=Backbone.View.extend({id:"help",tagName:"div",render(){return this.$el.html(P),this}}),S=`
  <div class="container mt-4">
    <h2 class="text-danger"><i class="bi bi-exclamation-triangle"></i> 404 Not Found</h2>
    <p>The page you requested could not be found.</p>
  </div>
`,C=Backbone.View.extend({id:"not-found",tagName:"div",render(){return this.$el.html(S),this}}),T=Backbone.Model.extend({idAttribute:"slug",defaults:{slug:"",title:"",date:"",excerpt:"",content:"",tags:[]}}),m=Backbone.Collection.extend({model:T}),d=5,_=`
<div class="container mt-4 blog-list">
  <div class="row">
    <div class="col-lg-8">
      <h2 class="mb-4">Blog</h2>

      {{#if posts.length}}
        {{#each posts}}
          <article class="card mb-3 shadow-sm">
            <div class="card-body">
              <h5 class="card-title mb-1">
                <a href="#blog/{{slug}}" class="blog-post-link text-decoration-none">
                  {{title}}
                </a>
              </h5>
              <p class="text-muted small mb-2">{{date}}</p>
              <p class="card-text mb-0">{{excerpt}}</p>
            </div>
          </article>
        {{/each}}
      {{else}}
        <p>No blog posts available yet.</p>
      {{/if}}

      {{#if hasPagination}}
        <nav aria-label="Blog pagination">
          <ul class="pagination justify-content-center mt-4">
            <li class="page-item {{#if isFirstPage}}disabled{{/if}}">
              <a class="page-link" href="#blog/page/{{prevPage}}" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            {{#each pages}}
              <li class="page-item {{#if isCurrent}}active{{/if}}">
                <a class="page-link" href="#blog/page/{{number}}">{{number}}</a>
              </li>
            {{/each}}

            <li class="page-item {{#if isLastPage}}disabled{{/if}}">
              <a class="page-link" href="#blog/page/{{nextPage}}" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      {{/if}}
    </div>
  </div>
</div>
`,I=Backbone.View.extend({id:"blog",tagName:"div",initialize(){this.collection=new m,this.currentPage=1,this.listenTo(this.collection,"update reset",this.render)},setPage(e){const t=this._getTotalPages(),a=Math.min(Math.max(e,1),t||1);this.currentPage=a,this.render()},_getTotalPages(){if(!this.collection)return 1;const e=this.collection.length;return e>0?Math.ceil(e/d):1},template:Handlebars.compile(_),render(){const e=this._getTotalPages(),t=this.currentPage||1,a=(t-1)*d,l=a+d,i=(this.collection?this.collection.slice(a,l):[]).map(n=>n.toJSON()),o=[];for(let n=1;n<=e;n+=1)o.push({number:n,isCurrent:n===t});const f=this.template({posts:i,hasPagination:e>1,pages:o,isFirstPage:t===1,isLastPage:t===e,prevPage:t-1,nextPage:t+1});return this.$el.html(f),this}}),H=`
<div class="container mt-4 blog-post">
  <div class="row">
    <div class="col-lg-8">
      {{#if post}}
        <article>
          <h1 class="mb-1">{{post.title}}</h1>
          <p class="text-muted small mb-3">{{post.date}}</p>

          <div class="blog-content">
            {{{post.content}}}
          </div>

          {{#if post.tags.length}}
            <p class="mt-3">
              <strong>Tags:</strong>
              {{#each post.tags}}
                <span class="badge bg-secondary me-1">{{this}}</span>
              {{/each}}
            </p>
          {{/if}}

          <p class="mt-4">
            <a href="#blog" class="btn btn-outline-primary">
              &laquo; Back to blog
            </a>
          </p>
        </article>
      {{else}}
        <p>That blog post could not be found.</p>
        <p>
          <a href="#blog" class="btn btn-outline-primary">
            &laquo; Back to blog
          </a>
        </p>
      {{/if}}
    </div>
  </div>
</div>
`,L=Backbone.View.extend({id:"blog-post",tagName:"div",initialize(){this.collection=new m,this.currentPost=null},showBySlug(e){if(!this.collection)return!1;const t=this.collection.get(e);return t?(this.currentPost=t,this.render(),!0):(this.currentPost=null,this.render(),!1)},template:Handlebars.compile(H),render(){const e=this.template({post:this.currentPost?this.currentPost.toJSON():null});return this.$el.html(e),this}}),R=[{id:"cc895078-2ab0-45e8-b346-2a4d025647c0",title:"Minimal View Convention",description:"Backbone lets you structure your app into small reusable views.",link:"https://backbonejs.org/#View"},{id:"eae3cb6c-d6fb-4007-8afd-7d2e32c5b759",title:"Logic + Layout Separation",description:"Handlebars templating keeps your HTML clean and logic-free.",link:"https://handlebarsjs.com/"},{id:"5916615a-0fca-4854-bfc4-c1ffdbea9337",title:"Quick Styling",description:"Bootstrap helps rapidly layout components with minimal CSS.",link:"https://getbootstrap.com/docs/5.3/components/card/"},{id:"177aa50c-a466-4c56-987c-c3c794e4fb8d",title:"Data Binding & Events",description:"Backbone’s models and collections support change events and syncing with RESTful APIs.",link:"https://backbonejs.org/#Model"},{id:"fabe99de-cc77-4d37-9e97-decc3e73fa15",title:"Client-Side Routing",description:"Use Backbone.Router to manage application state and navigation.",link:"https://backbonejs.org/#Router"},{id:"03b7a643-52db-4daa-a5b0-f276782cfcca",title:"Unit Testing",description:"Vitest is a fast, powerful, and easy-to-use JavaScript test runner.",link:"https://vitest.dev/"},{id:"77ed2189-0949-45cd-9746-3ad82b1df137",title:"Fast Dev with Vite",description:"Vite enables blazing fast HMR and optimized production builds.",link:"https://vitejs.dev/"},{id:"dd6eaa1e-f0dc-4f9c-87cc-3f9423a901e6",title:"ESLint for Code Quality",description:"ESLint statically analyzes your code to find problems and enforce style.",link:"https://eslint.org/"},{id:"b975384c-6294-4d51-a87d-b5092078ad2f",title:"Single Page App Foundation",description:"Backbone is ideal for small to medium SPAs with clear structure.",hasCounter:!0}],h=[{slug:"2026-02-28-getting-started-with-vite-backbone",date:"2026-02-28",title:"Getting Started with Vite + Backbone",excerpt:"Learn how this starter template wires together Vite, Backbone, Handlebars, jQuery, and Bootstrap to build small SPAs.",content:`
      <p>
        This starter template is designed to give you a modern build setup for
        classic Backbone applications. Vite handles fast bundling and HMR,
        while Backbone keeps your app structure simple and understandable.
      </p>
      <p>
        The core ideas are:
      </p>
      <ul>
        <li>Use <strong>Backbone.Router</strong> for hash-based navigation.</li>
        <li>Render views with <strong>Backbone.View</strong> and <strong>Handlebars</strong> templates.</li>
        <li>Style everything quickly with <strong>Bootstrap 5</strong> and <strong>Bootstrap Icons</strong>.</li>
      </ul>
      <p>
        You can extend this blog with more posts, or replace it with your own
        content loaded from an API.
      </p>
    `,tags:["vite","backbone","starter"]},{slug:"2026-02-20-structuring-views-and-templates",date:"2026-02-20",title:"Structuring Views and Templates",excerpt:"A quick overview of how to keep your Backbone views small and reusable, while using Handlebars for layout.",content:`
      <p>
        In this starter, each page is represented by a dedicated
        <code>Backbone.View</code> class under <code>src/views</code>.
        Handlebars templates are defined as template strings and compiled once.
      </p>
      <p>
        This separation makes it easy to:
      </p>
      <ul>
        <li>Reuse views in different routes.</li>
        <li>Swap templates without changing view logic.</li>
        <li>Test view behavior in isolation.</li>
      </ul>
    `,tags:["views","handlebars"]},{slug:"2026-02-10-client-side-routing-with-backbone",date:"2026-02-10",title:"Client-Side Routing with Backbone.Router",excerpt:"Use Backbone.Router to keep your navigation in sync with the URL, including simple blog routes.",content:`
      <p>
        Backbone.Router gives you a light-weight way to handle navigation in
        small single-page applications. Routes map URL fragments to handler
        functions that show or hide views.
      </p>
      <p>
        In this example blog, routes such as
        <code>#blog</code> and <code>#blog/:slug</code> are used to show the
        blog index and individual posts.
      </p>
    `,tags:["router","spa"]},{slug:"2026-02-05-working-with-backbone-collections",date:"2026-02-05",title:"Working with Backbone.Collections",excerpt:"Learn how collections help you manage groups of models and keep your UI in sync.",content:`
      <p>
        Collections are ordered sets of models with helpful APIs for filtering,
        sorting, and syncing with a server.
      </p>
      <p>
        In this starter, both the home view and the blog use collections to
        manage lists of items.
      </p>
    `,tags:["collections"]},{slug:"2026-02-01-rendering-with-handlebars",date:"2026-02-01",title:"Rendering with Handlebars",excerpt:"Handlebars keeps your templates declarative while letting Backbone handle the logic.",content:`
      <p>
        Handlebars templates in this project are defined as template strings
        and compiled once per view.
      </p>
      <p>
        Your views simply pass JSON data to the template and inject the
        resulting HTML into the DOM.
      </p>
    `,tags:["handlebars","templating"]},{slug:"2026-01-25-bootstrap-layout-basics",date:"2026-01-25",title:"Bootstrap Layout Basics",excerpt:"Use Bootstrap’s grid and utility classes to quickly build responsive layouts.",content:`
      <p>
        Both the home and blog pages use Bootstrap's grid system to stay
        responsive with minimal custom CSS.
      </p>
      <p>
        You can extend these layouts with more components like alerts, badges,
        and navs as needed.
      </p>
    `,tags:["bootstrap","layout"]},{slug:"2026-01-15-testing-with-vitest",date:"2026-01-15",title:"Testing with Vitest",excerpt:"Vitest makes it easy to test Backbone models, collections, and simple views.",content:`
      <p>
        This starter includes a minimal Vitest setup so you can add unit tests
        as your app grows.
      </p>
      <p>
        Start with model and collection tests, then add view tests for critical
        UI behavior.
      </p>
    `,tags:["testing","vitest"]}],p=new y,u=new B,g=new V,r=new I,c=new L,b=new C,M=Backbone.Router.extend({routes:{"":"home",about:"about",help:"help",blog:"blogIndex","blog/page/:page":"blogIndex","blog/:slug":"blogPost","*path":"notFound"},initialize(){$("#app").empty(),$("#app").append(p.$el),$("#app").append(u.$el),$("#app").append(g.$el),$("#app").append(r.$el),$("#app").append(c.$el),$("#app").append(b.$el)},_showView(e){e?.$el&&($("#app > div").not(e.el).hide(),e.$el.show())},home(){p.collection.reset(R),this._showView(p)},about(){this._showView(u.render())},help(){this._showView(g.render())},blogIndex(e=1){r.collection.reset(h),r.setPage(e),this._showView(r)},blogPost(e){if(c.collection.reset(h),!c.showBySlug(e)){this.notFound();return}this._showView(c)},notFound(){this._showView(b.render())}});new M;Backbone.history.start();$(function(){});
