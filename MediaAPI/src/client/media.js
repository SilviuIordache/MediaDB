Vue.component('media', {
  props: ['_id', 'UsageClass','CheckoutType','MaterialType', 'CheckoutYear', 'Checkouts', 'Title', 'Creator', 'Subjects', 'Publisher', 'PublicationYear'],
  template: `
  <article class="card mt-5"> 
    <section class="card-header"> 
     creator: {{ Creator }}
    </section>
    <section class="card-body">
      <h5 class="card-title text-center text-truncate"> {{ trimTitle(Title) }} </h5>
      <p class="card-text"> 
        <span class="font-weight-bold"> Type:</span> 
        <span class="font-weight-normal"> {{ MaterialType }} </span>
      </p>
      <p class="card-text"> 
        <span class="font-weight-bold"> Publisher:</span> 
        <span class="font-weight-normal"> {{ Publisher }} </span>
      </p>
      <p class="card-text"> 
        <span class="font-weight-bold"> Subjects:</span> 
        <span class="font-weight-normal"> {{ Subjects }} </span>
      </p>
      <p class="card-text"> 
        <span class="font-weight-bold"> PublicationYear:</span> 
        <span class="font-weight-normal"> {{ PublicationYear }} </span>
      </p>
      <p class="card-text"> 
        <span class="font-weight-bold"> CheckoutYear:</span> 
        <span class="font-weight-normal"> {{ CheckoutYear }} </span>
      </p>
    </section>

    <div class="card-footer text-muted">
     id: {{ _id }}
    </div>

  </article>
    `,
    methods: {
       trimTitle: (str) => {
        let arr = [];
        let newStr = '';
      
        if (str && str.includes('/')) {
          arr = str.split(' / ');
          newStr = arr[0];
          //newStr = newStr.slice(1);
          if (newStr.includes('[')) {
            arr = newStr.split(' [');
            newStr = arr[0];
          }
          str = newStr;
        }
        return str;
      },
    }
});

Vue.component('media-list', {
  props: ['mediaItems'],
  template: `
  <div class="row">
    <media class="col-4" 
      v-for="media in mediaItems"
      :_id ="media._id" 
      :UsageClass="media.UsageClass" 
      :CheckoutType="media.CheckoutType" 
      :MaterialType="media.MaterialType" 
      :CheckoutYear="media.CheckoutYear"
      :Checkouts="media.Checkouts" 
      :Title="media.Title"
      :Creator="media.Creator" 
      :Subjects="media.Subjects"  
      :Publisher="media.Publisher" 
      :PublicationYear="media.PublicationYear"> 
    </media>
  </div>
  `
})

const filterBar = Vue.component('filter-bar', {
  props: ['mediaItems'],
  template: `
  <div class="border-right"> 
    <div class="sidebar-heading">Filters</div>

    <div class="list-group list-group-flush">
      <a href="#" class="list-group-item list-group-item-action bg-light">
        Order 
        <div class="btn-group list-group-item" id="sort-order" role="group" aria-label="Basic example">
          <button v-on:click="changeOrder('asc')"  type="button" class="btn btn-secondary">asc</button>
          <button v-on:click="changeOrder('desc')" type="button" class="btn btn-secondary">desc</button>
        </div>
      </a>
      <a href="#" class="list-group-item list-group-item-action bg-light">Shortcuts</a>
    </div> 
  </div>
  `,
  methods : {
    changeOrder: function(val) {
      // emit event
      this.$parent.$emit('filter-bar:orderChanged', val);
    }
  }
})

const mediaComp = Vue.component('mediaItems', {
  created: function () {
    // change order event listener
    this.$on('filter-bar:orderChanged', (ord) => {
      // this.ord gets value from event listener
      this.ord = ord;
      this.getMediaItems();
    })
  },
  mounted: function () {
    //get mediaItems
    this.getMediaItems();
  },
  data: () => {
    return {
      ord: 'asc',
      mediaItems: []
    };
  },
  methods: {
    getMediaItems : function() {
      axios(`/media/page/0?ord=${this.ord}`)
      .then((resp) => {
        this.mediaItems = resp.data;
      });
    }
  },
  template: `
    <article>
      <div class="row">

        <div class="col-3">
          <filter-bar></filter-bar>
        </div> 

        <div class="col-9">
          <media-list :mediaItems='mediaItems'></media-list>
        </div> 

      </div> 
    </article>
  `
})

