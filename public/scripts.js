const BASE_URL_API= "http://localhost:5000/api/v1/persons/";

const app = new Vue({
    el: '#main',

    data: {
        result: "",
        responseAvailable: false,
        responseAvailableCreation: false,
        responseAvailableSearch: false,
        personData: {
            id: 0,
            firstName: "de voornaam",
            lastName: "de familienaam",
            eMailAddress: "email@adres.com"
        }
    },
    methods: {
        fetchAPIData( ) {
            this.responseAvailable = false;
            this.responseAvailableCreation = false;
            this.responseAvailableSearch = false

            fetch(BASE_URL_API, {
                "method": "GET",
                "headers": {
                }
            })
            .then(response => {
                if(response.ok){
                    return response.json()
                } else{
                    alert("Server returned " + response.status + " : " + response.statusText);
                }
            })
            .then(response => {
                this.result = response.listPersons;
                this.responseAvailable = true;
            })
            .catch(err => {
                console.log(err);
            });
        },
        submitForm( ) {
            this.responseAvailable = false;
            this.responseAvailableCreation = false;
            this.responseAvailableSearch = false

            fetch(BASE_URL_API, {
                "method": "POST",
                 headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                 },
                "body": JSON.stringify(this.personData),
            })
            .then(response => {
                if(response.ok){
                    return response.json()
                } else{
                    alert("Server returned " + response.status + " : " + response.statusText);
                }
            })
            .then(response => {
                this.result = response;
                this.responseAvailableCreation = true;
            })
            .catch(err => {
                console.log(err);
            });
        },
        searchForm( ) {
            this.responseAvailable = false;
            this.responseAvailableCreation = false;
            this.responseAvailableSearch = false

            fetch(BASE_URL_API+this.personData.eMailAddress, {
                "method": "GET",
                "headers": {
                }
            })
            .then(response => {
                if(response.ok){
                    return response.json()
                } else {
                    alert("Server returned " + response.status + " : " + response.statusText);
                }
            })
            .then(response => {
                this.result = response.foundPerson;
                this.responseAvailableSearch = true;
            })
            .catch(err => {
                console.log(err);
            });

        }
    }
})