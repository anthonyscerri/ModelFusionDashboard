
new Vue ({
    el: '#app',
    data:{
        
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
          {
            id: 1,
            name: 'Pappy\'s Smokehouse',
            type: 'marker',
            coords: [38.6350008, -90.2261532],
          },
          {
            id: 2,
            name: 'Broadway Oyster Bar',
            type: 'marker',
            coords: [38.6188362, -90.1947098],
          },
        ],
      }]
    },

	mounted()
    	{
	this.loading = true
        axios.get('http://40.89.191.77:8080/Anomaly')
        .then(response => {
		this.data = response
		this.loading = false
	}).catch(error => console.error(error));
    	
                this.initMap()
                this.initLayers()

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
        
        markerFeatures.forEach((feature) => {
          feature.leafletObject = L.marker(feature.coords)
            .bindPopup(feature.name);
        });
        
      });
    },
    initMap() {
      this.map = L.map('map').setView([35.91, 14.43], 12);
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

