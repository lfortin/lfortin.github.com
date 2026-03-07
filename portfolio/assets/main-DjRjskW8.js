(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=Backbone.Model.extend({defaults:{title:``,description:``,link:null,hasCounter:!1,counter:0},sync:function(){let e=Backbone.sync.apply(this,arguments);return this._xhr=e,e.always(()=>{this._xhr=null}),e},abort:function(){this._xhr&&(this._xhr.abort(),this._xhr=null,this.trigger(`abort`))}}),t=Backbone.Collection.extend({model:e,sync:function(){let e=Backbone.sync.apply(this,arguments);return this._xhr=e,e.always(()=>{this._xhr=null}),e},abort:function(){this._xhr&&(this._xhr.abort(),this._xhr=null,this.trigger(`abort`))}}),n=`
<div class="container mt-4">
  <div class="row">
    {{#each usecases}}
      <div class="col-md-4 mb-3">
        <div class="card h-100 shadow-sm" data-model-id="{{id}}">
          <div class="card-body usecase-card">
            <h5 class="card-title">{{title}}</h5>
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
`,r=Backbone.View.extend({id:`home`,tagName:`div`,events:{"click a.button-counter":`onCounterClick`},onCounterClick(e){e.stopPropagation(),e.preventDefault();let t=$(e.target).closest(`.card`).attr(`data-model-id`),n=this.collection.get(t);n.set(`counter`,n.get(`counter`)+1)},initialize(){this.collection=new t,this.listenTo(this.collection,`update reset change`,this.render)},template:Handlebars.compile(n),render(){let e=this.template({usecases:this.collection.toJSON()});return this.$el.html(e),this}}),i=`
<div class="container mt-4">
  <h2>About</h2>
  <p>This portfolio is built using <a href="https://github.com/lfortin/vite-backbone#readme" target="_blank">vite-backbone</a>, a Vite + Backbone starter template using Bootstrap, Handlebars, and more.</p>
  <p> <a href="https://github.com/lfortin/vite-backbone#readme" target="_blank">vite-backbone</a> is released under the MIT-0 License.</p>
</div>
`,a=Backbone.View.extend({id:`about`,tagName:`div`,render(){return this.$el.html(i),this}}),o=Backbone.Model.extend({defaults:{name:``,description:``,icon:null},sync:function(){let e=Backbone.sync.apply(this,arguments);return this._xhr=e,e.always(()=>{this._xhr=null}),e},abort:function(){this._xhr&&(this._xhr.abort(),this._xhr=null,this.trigger(`abort`))}}),s=Backbone.Collection.extend({model:o,sync:function(){let e=Backbone.sync.apply(this,arguments);return this._xhr=e,e.always(()=>{this._xhr=null}),e},abort:function(){this._xhr&&(this._xhr.abort(),this._xhr=null,this.trigger(`abort`))}}),c=Backbone.View.extend({id:`skills`,tagName:`div`,initialize(){this.collection=new s,this.listenTo(this.collection,`update reset change`,this.render)},template:Handlebars.compile(`
<div class="container mt-4">
  <div class="row">
    <div class="col-12">
      <h2>Skills</h2>
      <p class="lead">Technical and professional skills.</p>
    </div>
    {{#each skills}}
      <div class="col-md-4 mb-3">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            {{#if icon}}
              <div class="mb-2">
                <i class="{{icon}} fs-2" aria-hidden="true" title="{{name}}"></i>
              </div>
            {{/if}}
            <h5 class="card-title">{{name}}</h5>
            <p class="card-text">{{description}}</p>
            {{#if level}}
              <span class="badge bg-secondary">{{level}}</span>
            {{/if}}
          </div>
        </div>
      </div>
    {{/each}}
  </div>
</div>
`),render(){let e=this.template({skills:this.collection.toJSON()});return this.$el.html(e),this}}),l=`
  <div class="container mt-4">
    <h2 class="text-danger"><i class="bi bi-exclamation-triangle"></i> 404 Not Found</h2>
    <p>The page you requested could not be found.</p>
  </div>
`,u=Backbone.View.extend({id:`not-found`,tagName:`div`,render(){return this.$el.html(l),this}}),d=Backbone.Model.extend({idAttribute:`slug`,defaults:{slug:``,title:``,date:``,excerpt:``,content:``,tags:[]}}),f=Backbone.Collection.extend({model:d}),p=5,m=`
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
              <a class="page-link" href="#" data-page="prev" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            {{#each pages}}
              <li class="page-item {{#if isCurrent}}active{{/if}}">
                <a class="page-link" href="#" data-page="{{number}}">{{number}}</a>
              </li>
            {{/each}}

            <li class="page-item {{#if isLastPage}}disabled{{/if}}">
              <a class="page-link" href="#" data-page="next" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      {{/if}}
    </div>
  </div>
</div>
`,h=Backbone.View.extend({id:`blog`,tagName:`div`,events:{"click .pagination .page-link":`onPageClick`},initialize(){this.collection=new f,this.currentPage=1,this.listenTo(this.collection,`update reset`,this.render)},setPage(e){let t=this._getTotalPages();this.currentPage=Math.min(Math.max(e,1),t||1),this.render()},_getTotalPages(){if(!this.collection)return 1;let e=this.collection.length;return e>0?Math.ceil(e/p):1},onPageClick(e){e.preventDefault();let t=$(e.currentTarget).data(`page`),n=this._getTotalPages(),r=this.currentPage;if(t===`prev`)r=this.currentPage-1;else if(t===`next`)r=this.currentPage+1;else{let e=parseInt(t,10);Number.isNaN(e)||(r=e)}r<1||r>n||(this.currentPage=r,this.render(),Backbone.history.navigate(`blog/page/${r}`,{trigger:!1,replace:!1}))},template:Handlebars.compile(m),render(){let e=this._getTotalPages(),t=this.currentPage||1,n=(t-1)*p,r=n+p,i=(this.collection?this.collection.slice(n,r):[]).map(e=>e.toJSON()),a=[];for(let n=1;n<=e;n+=1)a.push({number:n,isCurrent:n===t});let o=this.template({posts:i,hasPagination:e>1,pages:a,isFirstPage:t===1,isLastPage:t===e});return this.$el.html(o),this}}),g=Backbone.View.extend({id:`blog-post`,tagName:`div`,initialize(){this.collection=new f,this.currentPost=null},showBySlug(e){if(!this.collection)return!1;let t=this.collection.get(e);return t?(this.currentPost=t,this.render(),!0):(this.currentPost=null,this.render(),!1)},template:Handlebars.compile(`
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
`),render(){let e=this.template({post:this.currentPost?this.currentPost.toJSON():null});return this.$el.html(e),this}});const _=[{id:`cc895078-2ab0-45e8-b346-2a4d025647c0`,title:`os-monitor`,description:`A very simple monitor for Node.js that allows you to observe some OS parameters, such as free memory available, load average or free disk space.`,link:`/os-monitor`},{id:`eae3cb6c-d6fb-4007-8afd-7d2e32c5b759`,title:`cgi-core`,description:`A lightweight, zero-dependency middleware for hosting CGI scripts with HTTP/1.1 support.`,link:`/cgi-core`},{id:`5916615a-0fca-4854-bfc4-c1ffdbea9337`,title:`react-floorlamp`,description:`Straightforward state management for React.`,link:`https://www.npmjs.com/package/react-floorlamp`},{id:`177aa50c-a466-4c56-987c-c3c794e4fb8d`,title:`vite-backbone`,description:`A starter template for building Backbone.js applications with Vite.`,link:`https://github.com/lfortin/vite-backbone#readme`},{id:`fabe99de-cc77-4d37-9e97-decc3e73fa15`,title:`mock-os`,description:`Testing module for the os built-in module in Node.js.`,link:`https://www.npmjs.com/package/mock-os`},{id:`03b7a643-52db-4daa-a5b0-f276782cfcca`,title:`jquery-drive`,description:`A jQuery plugin to construct the DOM using basic jQuery selectors. (deprecated)`,link:`https://www.npmjs.com/package/jquery-drive`},{id:`77ed2189-0949-45cd-9746-3ad82b1df137`,title:`stream-tk`,description:`Experimental toolkit for handling Node.js data streams.`,link:`https://www.npmjs.com/package/stream-tk`}],v=[{name:`Node.js`,description:`Server-side JavaScript and tooling.`,icon:`bi bi-hexagon-fill`},{name:`TypeScript`,description:`Typed JavaScript and tooling.`,icon:`bi bi-file-earmark`},{name:`Version control ( Git / GitHub )`,description:`Source control and collaboration.`,icon:`bi bi-git`},{name:`Unit testing ( Jest, Vitest )`,description:`Unit and component testing.`,icon:`bi bi-check2-square`},{name:`RESTful APIs testing ( Postman )`,description:`API design and testing.`,icon:`bi bi-plug`},{name:`E2E testing ( Cypress, Vitest )`,description:`End-to-end and browser testing.`,icon:`bi bi-browser-chrome`},{name:`Code quality ( ESLint, Oxlint )`,description:`Linting and code standards.`,icon:`bi bi-code-slash`},{name:`AWS ( Lambda, API Gateway, etc. )`,description:`Cloud services and serverless.`,icon:`bi bi-cloud`},{name:`AI-driven tools ( Cursor, etc. )`,description:`AI-assisted development.`,icon:`bi bi-robot`},{name:`Project management tools ( Jira, Confluence )`,description:`Agile and documentation.`,icon:`bi bi-kanban`},{name:`Front-end development ( Backbone.js, React, Vue.js, Angular, etc. )`,description:`SPAs and modern UI frameworks.`,icon:`bi bi-window-stack`},{name:`Build tooling ( Vite )`,description:`Build tooling and dev experience.`,icon:`bi bi-lightning-charge`}],y=[{slug:`2026-03-03-first-blog-post`,date:`2026-03-03`,title:`Hello, World! Welcome to My Portfolio`,excerpt:`A quick hello and a look at what to expect from this blog.`,content:`
    <p>
      Welcome to my corner of the web!
      I finally decided to carve out a space to document my projects, share some technical deep-dives, and keep track of what I'm learning.
      Whether you're a recruiter, a fellow developer, or just lost on the internet—I'm glad you're here.
      Stay tuned for more updates soon!
    </p>
  `,tags:[`welcome`,`webdev`,`2026`]}];var b=new r,x=new a,S=new c,C=new h,w=new g,T=new u;new(Backbone.Router.extend({routes:{"":`home`,about:`about`,skills:`skills`,blog:`blogIndex`,"blog/page/:page":`blogIndex`,"blog/:slug":`blogPost`,"*path":`notFound`},initialize(){$(`#app`).empty(),$(`#app`).append(b.$el),$(`#app`).append(x.$el),$(`#app`).append(S.$el),$(`#app`).append(C.$el),$(`#app`).append(w.$el),$(`#app`).append(T.$el)},_showView(e){e?.$el&&($(`#app > div`).not(e.el).hide(),e.$el.show())},home(){b.collection.reset(_),this._showView(b)},about(){this._showView(x.render())},skills(){S.collection.reset(v),this._showView(S)},blogIndex(e=1){C.collection.reset(y),C.setPage(e),this._showView(C)},blogPost(e){if(w.collection.reset(y),!w.showBySlug(e)){this.notFound();return}this._showView(w)},notFound(){this._showView(T.render())}})),Backbone.history.start(),$(function(){});