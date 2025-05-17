# `poke-server`
## ENTITIES
## APIs
### Show Toppings
url: http://localhost:3000/show/Type
Type : {Protein, Bases, Ingredients, Bowls}
Will show the list of all possible toppings and the bowls descriptor
### Insert new Order
url: http://localhost:3000/InsertUser
Require a Json file, after checking the json it will insert the new user 
### Insert new Topping
Require json, will verify its validity, if results positive will add a new topping.
Does not apply to Bowl Descriptor.

POST http://localhost:3000/NewTopping 

{
  "Name": "NameTopping",
  "TypeIngr": "Type"
}

## needs to implement
Functions needed:
    -Insert New Order    
    -Make a bowl composition