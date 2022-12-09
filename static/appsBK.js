
new Vue ({
    el: '#app',
    data:{
        claimCode: null,
        jsonData: null
        
    },
    methods: {

        formSubmitted: function() {
          axios
          //.put('http://sv27-mgmt:8000/submit', this.jsonData)
          .put('http://it01-lt:8000/submit', this.jsonData)
          console.log('----->')
          console.log(this.jsonData)
        }
        
    },
    async mounted()
    {
      let uri = window.location.href.split('?');
      if (uri.length == 2)
      {
        let vars = uri[1].split('&');
        let getVars = {};
        let tmp = '';
        vars.forEach(function(v){
          tmp = v.split('=');
          if(tmp.length == 2)
          getVars[tmp[0]] = tmp[1];
         
        });
        
      //const response = await axios.get('http://sv27-mgmt:8000/claim_code/' + tmp[1])
      const response = await axios.get('http://it01-lt:8000/claim_code/' + tmp[1])
      
      this.jsonData = response.data

      }

    }
});

