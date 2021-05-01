const search_loc = document.getElementById('searchTextBox').value;

function hideLocation(){
    document.getElementById('locaText').style.display = 'none';
    document.getElementById('degreeValue').textContent = '0';
    document.getElementById('weatherStatus').textContent = '';

    // Bottom Block
    document.getElementById('rainChance').textContent = '0';
    document.getElementById('windSpeed').textContent = '0';
    document.getElementById('humidity').textContent = '0';
    document.getElementById('visiblity').textContent = '0';
    document.getElementById('dwePt').textContent = '0';

    //Bottom Status Texts
    document.getElementById('statusSummary').textContent = '';
}

// function showPosition(position) {
//     console.log(position);
// }

// function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition);
//     } else { 
//         document.getElementById('fullLocation').textContent = "Geolocation is not supported by this browser.";
//     }
// }

function weatherFormSearch(){
    const search_loc = document.getElementById('searchTextBox').value;
    console.log(search_loc);
    // fetch from URL
    fetch('/weather?address='+search_loc+'').then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error);
                document.getElementById('locaText').style.display = 'block';
                document.getElementById('fullLocation').textContent = data.error;
            }
            else
            {
                console.log(data);
                // Top Block
                let cel = (data.forecast.currently.temperature - 32) * 5 / 9;
                document.getElementById('degreeValue').textContent = Math.round(cel);
                document.getElementById('weatherStatus').textContent = data.forecast.currently.summary;
                document.getElementById('fullLocation').textContent = data.location;

                // Bottom Block
                document.getElementById('rainChance').textContent = data.forecast.currently.precipProbability*100;
                document.getElementById('windSpeed').textContent = data.forecast.currently.windSpeed;
                document.getElementById('humidity').textContent = Math.floor(data.forecast.currently.humidity*100);
                document.getElementById('visiblity').textContent = data.forecast.currently.visibility+'+';
                document.getElementById('dwePt').textContent = data.forecast.currently.dewPoint;

                //Bottom Status Texts
                document.getElementById('statusSummary').textContent = data.forecast.hourly.summary;
                document.getElementById('locaText').style.display = 'block';
            }
        });
    });
}