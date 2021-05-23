function updatedata(){
  console.log("update");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://corona-api.com/countries", requestOptions)
        .then(response => response.json())
        .then(rsp => {
            //console.log(rsp.data);
            rsp.data.forEach(function(marker) {
                longitude=marker.coordinates.longitude;
                latitude=marker.coordinates.latitude;
                confirm_cases=marker.latest_data.confirmed;
                
                var el = document.createElement('div');
                el.className = 'marker';
                var active=(confirm_cases-marker.latest_data.recovered- marker.latest_data.deaths);
                var c=255;
                if(active <1000)
                c=active*(255/1000);
                color=`rgb(${c},0,0)`;
                
                 new mapboxgl.Marker({color:color})
                   .setLngLat([longitude,latitude])
                   .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML('<h3 style="color:white;">' +"COUNTRY: "+    marker.name + '</h3><h3 style="color:red;">'+
                     "CONFIRMED: "+ confirm_cases + '</h3><h3 style="color: green;">'+
                     "RECOVERED: "+ marker.latest_data.recovered + '</h3><h3>'+
                     "DEATH: "+ marker.latest_data.deaths + '</h3><h3 style="color:red;">'+
                     "ACTIVE CASES: "+ active + '</h3>'))
                    .addTo(map);
               });
        })
        .catch(error => console.log('error', error));

        
}
updatedata();
setInterval(updatedata, 20000);