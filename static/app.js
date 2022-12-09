new Vue({
  el: '#app',
  data: {
    map: null,
    tileLayer: null,
    layers: [
      {
        id: 0,
        name: 'IMU Potholes',
        active: false,
        features: [
          {
            id: 0,
            name: 'Dummy1',
            type: 'marker',
            lat: "38.6109607",
            lon: "-90.2050322",
	    predicted: "",
          },
        ],
      },
      {
        id: 1,
        name: 'IMU Speed Bump',
        active: false,
        features: [
          {
            id: 0,
            name: 'Dummy2',
            type: 'marker',
            lat: "39.61096072",
            lon: "-90.2050322",
	    predicted: "",
          },
        ],
      }
    ],
  },
  async mounted() {
       console.log('1')
     await axios.get('http://maltaroadanomaly.info:8080/Anomaly')
        .then(response => {
                this.layers = response.data
                this.initMap()
                this.initLayers()
	}).catch(error => console.error(error));
  },
  methods: {
    layerChanged(layerId, active) {
	     console.log('InitLayerChanged')

      const layer = this.layers.find(layer => layer.id === layerId);
      
      layer.features.forEach((feature) => {
	      console.log(feature.predicted)
        if (active) {
          feature.leafletObject.addTo(this.map);
        } else {
          feature.leafletObject.removeFrom(this.map);
        }
      });
    },
    initLayers() {
	    
	    var redIcon = L.icon({
		iconUrl: 'http://maltaroadanomaly.info:8080/marker-icon-2x-red.png',
		iconSize: [38, 95],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76],
		shadowUrl: '',
		shadowSize: [68, 95],
		shadowAnchor: [22, 94]
		});


	    var blueIcon = L.icon({
		    iconUrl: 'http://maltaroadanomaly.info:8080/marker-icon-2x-blue.png',
		iconSize: [38, 95],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76],
		shadowUrl: '',
		shadowSize: [68, 95],
		shadowAnchor: [22, 94]
		});


	    var goldIcon = L.icon({
		iconUrl: 'http://maltaroadanomaly.info:8080/marker-icon-2x-gold.png',
		iconSize: [38, 95],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76],
		shadowUrl: '',
		shadowSize: [68, 95],
		shadowAnchor: [22, 94]
		});

	    var violetIcon = L.icon({
		iconUrl: 'http://maltaroadanomaly.info:8080/marker-icon-2x-violet.png',
		iconSize: [38, 95],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76],
		shadowUrl: '',
		shadowSize: [68, 95],
		shadowAnchor: [22, 94]
		});


	    var orangeIcon = L.icon({
		iconUrl: 'http://maltaroadanomaly.info:8080/marker-icon-2x-orange.png',
		iconSize: [38, 95],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76],
		shadowUrl: '',
		shadowSize: [68, 95],
		shadowAnchor: [22, 94]
		});

	    var greyIcon = L.icon({
		iconUrl: 'http://maltaroadanomaly.info:8080/marker-icon-2x-grey.png',
		iconSize: [38, 95],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76],
		shadowUrl: '',
		shadowSize: [68, 95],
		shadowAnchor: [22, 94]
		});



	    var blackIcon = L.icon({
		iconUrl: 'http://maltaroadanomaly.info:8080/marker-icon-2x-black.png',
		iconSize: [38, 95],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76],
		shadowUrl: '',
		shadowSize: [68, 95],
		shadowAnchor: [22, 94]
		});


	    var greenIcon = L.icon({
		iconUrl: 'http://maltaroadanomaly.info:8080/marker-icon-2x-green.png',
		iconSize: [38, 95],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76],
		shadowUrl: '',
		shadowSize: [68, 95],
		shadowAnchor: [22, 94]
		});

	    var yellowIcon = L.icon({
		iconUrl: 'http://maltaroadanomaly.info:8080/marker-icon-2x-yellow.png',
		iconSize: [38, 95],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76],
		shadowUrl: '',
		shadowSize: [68, 95],
		shadowAnchor: [22, 94]
		});

	    this.layers.forEach((layer) => {
        const markerFeatures = layer.features.filter(feature => feature.type === 'marker');
        
        markerFeatures.forEach((feature) => {
		if (feature.predicted == 3){
          		feature.leafletObject = L.marker([feature.lat , + feature.lon], {icon: redIcon})
	            	.bindPopup(feature.name);
			feature.leafletObject.on('click',function(evt){window.open('/static/images/' + feature.name + '.png');})
        }

		if (feature.predicted == 4){
          		feature.leafletObject = L.marker([feature.lat , + feature.lon], {icon: goldIcon})
            		.bindPopup(feature.name);
			feature.leafletObject.on('click',function(evt){window.open('/static/images/' + feature.name + '.png');})

        }

		if (feature.predicted == 5){
          		feature.leafletObject = L.marker([feature.lat , + feature.lon], {icon: blueIcon})
            		.bindPopup(feature.name);
			feature.leafletObject.on('click',function(evt){window.open('/static/images/' + feature.name + '.png');})

        }
	
		if (feature.predicted == 'SB'){
          		feature.leafletObject = L.marker([feature.lat , + feature.lon], {icon: orangeIcon})
            		.bindPopup(feature.name);
			feature.leafletObject.on('click',function(evt){window.open('/static/images/' + feature.name + '.png');})
			console.log(feature.name)
        }


		if (feature.predicted == 'crack'){
          		feature.leafletObject = L.marker([feature.lat , + feature.lon], {icon: greyIcon})
            		.bindPopup(feature.name);
			feature.leafletObject.on('click',function(evt){window.open('/static/images/' + feature.name + '.png');})
        }

		if (feature.predicted == 'pothole'){
          		feature.leafletObject = L.marker([feature.lat , + feature.lon], {icon: greyIcon})
            		.bindPopup(feature.name);
			feature.leafletObject.on('click',function(evt){window.open('/static/images/' + feature.name + '.png');})
	}



		if (feature.predicted == 'anomalyMatch'){
          		feature.leafletObject = L.marker([feature.lat , + feature.lon], {icon: blackIcon})
            		.bindPopup(feature.name);
			feature.leafletObject.on('click',function(evt){window.open('/static/images/' + feature.name + '.png');})
	}

		
		if (feature.predicted == 'depressionMatch'){
          		feature.leafletObject = L.marker([feature.lat , + feature.lon], {icon: greenIcon})
            		.bindPopup(feature.name);
			feature.leafletObject.on('click',function(evt){window.open('/static/images/' + feature.name + '.png');})
	}


		if (feature.predicted == 'SBMatch'){
          		feature.leafletObject = L.marker([feature.lat , + feature.lon], {icon: yellowIcon})
            		.bindPopup(feature.name);
			feature.leafletObject.on('click',function(evt){window.open('/static/images/' + feature.name + '.png');})
	}


	}
	);	
      });
    },

	onClick(e) {
	window.open(this.options.win_url)
	},

     initMap() {
	console.log('InitMap')
      this.map = L.map('map').setView([35.89, 14.45], 13);
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

