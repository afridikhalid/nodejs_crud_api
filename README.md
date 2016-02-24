#NODEJS_CRUD_API

A simple CRUD API for NODEJS with CRUD functionality I have uploaded mongoDB files folder where i have dumped the database files so you can use it for testing purposes or if you want you can directly enter new data and test it without those files. I have used expressjs as well I have changed the default view rendering engine to handlebars but you can easily change it back to jade if you wish just remove my code from app.js for handlebars. I have commented inside the code as well which will give you the idea what each line of code is doing. hope you like it.

##Author:
Khalid Afridi

##Starting the server  
After you clone this project just simple run the following shell command to install all the dependencies 

```
$ npm install
$ npm start
```
That's all. the server will be up and listening


##How to interact with the API

I have used **Postman* so you can do all the CRUD commands.

**Fetch all**  
The route for the `Get` should be `htt://localhost:3000/cars`  

**Fetch by Id*  
The route for the `Get` should be `htt://localhost:3000/cars/carid`


**Post a Car*  
The route for the `Post` should be `htt://localhost:3000/cars`   
check the port in your terminal as well to be sure  
I pretend that you're using `Postman` you have to select `post` for the action then `body` and `raw` and then `json` 

```
{
    "make": "Benz",
    "model": "C220",
    "year": 2014,
    "color": "silver",
    "condition": "used",
    "gearbox": "manual",
    "fuel": "petrol",
    "price": 1500000,
    "mileage": 10000,
    "vehicletype": "sedan",
    "generalinfo": "Lorem ipsum dolor"
    
}

```

**Query fields*  

The following query will display all silver cars.
if you type a wrong filed name it will just skip it and returns the full list of the cars without query.  

The route for `Get` should be `htt://localhost:3000/cars?color=silver&make=benz`

*What else can be done with the query?

* `limit=5'
* `offeset=3`
* `make=benz`
* `color=silver`
* `model=c220`
* `gearbox=manual`
* `fuel=petrol`
* `vehicletype=sedan`
* `condition=used`

**Get specific fields*

The route for `Get` should be `htt://localhost:3000/cars?colorfield=color&makefield=make`  
You can get as many fields as you which just by adding the `field` word to the field you want to be displaied.

* `makefield=make`
* `modelfield=model`
* `yearfield=year`
* `conditionfield=condition`
* `gearboxfield=gearbox`
* `fullnamefield=fullname`
* `fuelfield=fuel`
* `pricefield=price`
* `mileagefield=mileage`
* `vehicletypefield=vehicletype`
* `generalinfofield=generalinfo`

**Delete a car by id* 
Simple send a delete request with the carid to API and that's all the item has been deleted...  
The route for `Delete` should be `htt://localhost:3000/cars/carid`



##LICENCE `MIT`  
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

