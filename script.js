
function getdata() {
    let countryname = document.getElementById('countrysearchbox').value;
    let datasection = document.getElementsByClassName('country-data')[0];
    let startsection = document.getElementsByClassName('intro-section')[0];
    let loader = document.getElementById('loader');
    let heading = document.getElementById('info-heading');
    let nextbtn = document.getElementById('nextButton');
    startsection.style.display = 'none'
    heading.style.display = 'none';

    loader.style.display = 'flex';
    let data = fetch(`https://restcountries.com/v3.1/name/${countryname}`)
        .then((response) => response.json())
        .then((data) => {
            let currentIndex = 0;
            if (data.length > 1) {
                nextbtn.style.display = 'block'
            }

            function updateUI(index) {
                let item = data[index];
                loader.style.display = 'none';
                datasection.style.display = 'flex';

                // Data in table
                document.getElementById('countryName').innerHTML = item.name.common;
                document.getElementById('commonName').innerHTML = item.name.common;
                document.getElementById('officialName').innerHTML = item.name.official;
                document.getElementById('tld').innerHTML = item.tld[0];
                document.getElementById('Independent').innerHTML = item.independent;
                document.getElementById('currency').innerHTML = Object.keys(item.currencies);
                document.getElementById('dialingcode').innerHTML = `${item.idd.root} ${item.idd.suffixes[0]}`;
                document.getElementById('capital').innerHTML = item.capital[0];
                document.getElementById('region').innerHTML = `${item.region}, ${item.subregion}`;
                document.getElementById('language').innerHTML = Object.keys(item.languages); // Use the Arabic language
                document.getElementById('population').innerHTML = item.population;
                document.getElementById('timezone').innerHTML = item.timezones[0]; // Use the first timezone
                document.getElementById('continent').innerHTML = item.continents[0]; // Use the first continent
                document.getElementById('borders').innerHTML = item.borders ? item.borders.join(', ') : '-'; // Convert borders array to string
                document.getElementById('area').innerHTML = `${item.area} SqKm`;
                document.getElementById('startday').innerHTML = item.startOfWeek;
                document.getElementById('flag').src = item.flags.png;
                document.getElementById('viewmap').href = item.maps.googleMaps;
            }

            // Initial call
            updateUI(currentIndex);

            // Next button click event
            nextbtn.addEventListener('click', () => {
                if (currentIndex < data.length - 1) {
                    currentIndex++;
                    updateUI(currentIndex);
                }
            });

        })
        .catch(error => {
            console.error('Error fetching country data:', error);
        });

}
