import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const TempApp = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState();

    const submitHandler = (e) => {
        e.preventDefault()

        if (search === "") {
            alert("Please fill the input box.")
        } else {
            const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=595b65202c2a4b5f0a3d3316ff575b40`;

            fetch(url1).then(async (response) => {
                return response.json();
            }).then((data) => {
                // const search1 = search;
                // const upperresult = search1.toLocaleLowerCase(search1);
                // console.log(upperresult);
                // const newstr = data.name.charAt(0).toUpperCase() + data.name.slice(1);

                if (search === data.name) {
                    setData(data);
                    console.log(data)
                } else {
                    alert("Please enter the valid city name");
                    setSearch("");
                }

            }).catch((error) => {
                console.log(error);
            })
        }

    }

    useEffect(() => {

        const getCurrentlocation = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const url1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=595b65202c2a4b5f0a3d3316ff575b40`
                fetch(url1)
                    .then(async data => {
                        const apiData = await data.json();
                        setData(apiData);
                    }).catch((error) => {
                        console.log(error);
                    })
            });
        }

        getCurrentlocation();

    }, [])






    return (
        <div className='temp_con'>
            <h1>Weather App</h1>


            <div className='inputData'>
                <form onSubmit={submitHandler}>
                    <input className='search' type="search" placeholder='Enter the city name' value={search} onChange={(e) => {
                        let value = e.target.value;
                        const newstr = value.charAt(0).toUpperCase() + value.slice(1);
                        setSearch(newstr);
                    }} />

                    <button type='submit'><FontAwesomeIcon icon={faMagnifyingGlass} /></button>

                </form>
            </div>

            <div className='content'>
                <div className='icon_con'>
                    <div className='icon'>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </div>

                    <div className='cityName'>
                        <h3>{!data ? <p>No Data</p> : data.name}</h3>
                    </div>
                </div>

                <div className='temp'>
                    <h2>Temperature</h2>
                    <h2>{!data ? <p>No Data</p> : data.main.temp}<sup>0</sup>C</h2>
                </div>


            </div>

            <div className='content'>
                <div className='icon_con'>
                    <div className='icon'>
                        <h2>Weather</h2>
                    </div>

                    <div className='cityName'>

                        <h3>{!data ? <p>No Data</p> : data.weather[0].main}</h3>
                    </div>
                </div>

                <div className='temp'>
                    <h2>Wind Speed</h2>
                    <h2>{!data ? <p>No Data</p> : data.wind.speed}</h2>
                </div>


            </div>


        </div>
    )
}

export default TempApp;