Vue.component('pagination-bar', {
  props: ['pagesPerQuery', 'queryCount', 'path', 'elemPerPage','reqTime'],
  template: `
    <nav aria-label="pagination-label">
        <ul class="pagination">
          
          <li class="page-item" 
             :class="{disabled: parseInt($route.query.page || 0) === 0}">
            <router-link class="page-link"  :to="{ 
              path,
              query: { 
                page: 0,
                ord: $route.query.ord,
                name: $route.query.name}}"> 
              <div> < </div>
            </router-link>
          </li>

          <li class="page-item" 
             :class="{disabled: parseInt($route.query.page || 0) <= 0}">
            <router-link class="page-link" 
              :to="{ path, 
                     query: { 
                        page: parseInt($route.query.page || 0) - 1,
                        ord: $route.query.ord,
                        name: $route.query.name}}">
                <div> Prev </div>
            </router-link>
          </li>


          <li class="page-item disabled">  
            <div class="page-link"> Pg: {{($route.query.page || 0) + 1}} /  {{pagesPerQuery}} </div>  
          </li>

          <li  class="page-item" :class="{disabled: parseInt($route.query.page) === pagesPerQuery}">
            <router-link  class="page-link" 
              :to="{ path, 
                     query: { 
                      page: parseInt($route.query.page || 0) + 1,
                      ord: $route.query.ord,
                      name: $route.query.name}}">
              <div> Next </div>
            </router-link>
          </li>

          <li class="page-item"
             :class="{disabled: parseInt(($route.query.page || 0) - 1 ) === pagesPerQuery }">
            <router-link class="page-link"  :to="{ 
              path,
              query: { 
                page: pagesPerQuery - 1,
                ord: $route.query.ord,
                name: $route.query.name }}"> 
              <div> > </div>
            </router-link>
          </li>

        </ul>

        <div> {{elemPerPage}} of {{ queryCount }} results retrieved in {{ reqTime/1000 }} sec </div>

      </nav>
    `
});

