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
            coords: [38.6109607, -90.2050322],
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
            coords: [39.6109607, -90.2050322],
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
		this.loading = false
		console.log('2')
	}).catch(error => console.error(error));
    	
                this.initMap()
                this.initLayers()
	  console.log('3')
	  console.log(this.data)
    
  },
  methods: {
    layerChanged(layerId, active) {
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
      this.layers.forEach((layer) => {
        const markerFeatures = layer.features.filter(feature => feature.type === 'marker');
        const polygonFeatures = layer.features.filter(feature => feature.type === 'polygon');
        
        markerFeatures.forEach((feature) => {
          feature.leafletObject = L.marker(feature.coords)
            .bindPopup(feature.name);
        });
        
        polygonFeatures.forEach((feature) => {
          feature.leafletObject = L.polygon(feature.coords)
            .bindPopup(feature.name);
        });
      });
    },
    initMap() {
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

