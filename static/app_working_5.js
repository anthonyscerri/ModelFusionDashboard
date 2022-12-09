new Vue({
  el: '#app',
  data: {
    map: null,
    tileLayer: null,
    layers: [
      {
        id: 0,
        name: 'Restaurants',
        active: false,
        features: [
          {
            id: 0,
            name: 'Bogart\'s Smokehouse',
            type: 'marker',
            lat: "38.6109607",
            lon: "-90.2050322",
          },
        ],
      },
      {
        id: 1,
        name: 'Restaurants2',
        active: false,
        features: [
          {
            id: 0,
            name: 'Bogart\'s Smokehouse',
            type: 'marker',
            lat: "39.61096072",
            lon: "-90.2050322",
          },
        ],
      }
    ],
  },
  async mounted() {
       console.log('1')
     await axios.get('http://40.89.191.77:8080/Anomaly')
        .then(response => {
                this.data = response.data
                this.initMap()
                this.initLayers()


	}).catch(error => console.error(error));
	  console.log(this.data)
  },
  methods: {
    layerChanged(layerId, active) {
	     console.log('InitLayerChanged')

      const layer = this.layers.find(layer => layer.id === layerId);
      
      layer.features.forEach((feature) => {
        if (active) {
          feature.leafletObject.addTo(this.map);
        } else {
          feature.leafletObject.removeFrom(this.map);
        }
      });
    },
    initLayers() {
	     console.log('InitLayer')

	    this.data.layers.forEach((layer) => {
        const markerFeatures = layer.features.filter(feature => feature.type === 'marker');
        
        markerFeatures.forEach((feature) => {
		console.log(feature.lat)
          feature.leafletObject = L.marker([feature.lat , + feature.lon])
            .bindPopup(feature.name);
        });
      });
    },
     initMap() {
	console.log('InitMap')
      this.map = L.map('map').setView([38.63, -90.23], 2);
      this.tileLayer = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        }
      );

      this.tileLayer.addTo(this.map);



        
    },
  },
});

