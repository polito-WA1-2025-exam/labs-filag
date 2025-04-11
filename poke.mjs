import './dao.mjs'
import { createDB, populateEmptyDB } from './dao.mjs'
import './models.mjs'
import { retreiveInfoSize, retreiveFoodByCat } from './dao.mjs'

/*
let listInfoSize = []

retreiveInfoSize().
    then ( (rows) => {
        listInfoSize = rows.map (
            (row) => new InfoSize (row.Size, row.NProteins, row.MaxIngredients, row.InitialPrice, row.MaxQtyDaily)
        );
        console.log (listInfoSize);
    })
    .catch ( (err) => { console.error (err); });

let listIngredients = []

retreiveFoodByCat('Ingredient')
    .then( (list) => { 
        listIngredients = list
        console.log (listIngredients);
     })
    .catch( (err) => { console.log(err)})

//createNewBowl('M', 4);
*/

/*
function Bowl (size) {
    this.bowlID = 'B'+ (++allBowlsEver)
    this.size = size
    this.base = null
    this.proteins = []
    this.ingredients = []
    this.quantity = 1

    if (size === 'R') {
        this.nProteins = 1
        this.maxIngredients = 4
        this.initialPrice = 9
    } else if (size == 'M') {
        this.nProteins = 2
        this.maxIngredients = 4
        this.initialPrice = 11
    } else {
        this.nProteins = 3
        this.maxIngredients = 6
        this.initialPrice = 14
    }

    this.chooseBase = function (choice) {
        this.base = choice
    }

    this.addProtein = function (choice) {
        if (this.proteins.length < this.nProteins) {
            this.proteins.push (choice)
        }
        else {
            console.log ('You can only add', this.nProteins, 'proteins to a bowl of size', this.size)
        }
    }

    this.addIngredients = function (choice) {
        this.ingredients.push (choice)
    }

    this.increaseQuantity = function () {
        this.quantity++
    }

    this.decreaseQuantity = function () {
        if (this.quantity > 1) {
            this.quantity--
        }
    }

    this.computePrice = function () {
        let price = this.initialPrice
        if (this.ingredients.length > this.maxIngredients){
            let extraIngredients = this.ingredients.length - this.maxIngredients
            price += extraIngredients * 0.2 * this.initialPrice
        }
        return price*this.quantity
    }
}

function Order () {
    this.orderID = 'O'+ (++allOrdersEver)
    this.bowls = []
    this.specialRequests = null

    this.addBowls = function (bowls) {
        this.bowls.push (bowls)
    }

    this.computeTotalPrice = function () {
        let tot = 0
        let numBowls = 0
        for (const bowl of this.bowls) {
            tot += bowl.computePrice()
            numBowls += bowl.quantity
        }
        if (numBowls > 4) {
            tot *= 0.9
        }
        return tot
    }

    this.removeBowls = function (bowlID) {
        this.bowls = this.bowls.filter (bowl => bowl.bowlID !== bowlID)
    }

}
*/

/*
const o1 = new Order()
const b1 = new Bowl ('R')
b1.increaseQuantity()
b1.decreaseQuantity()
console.log(b1.computePrice())
console.log(b1.computePrice())

o1.addBowls (b1)
console.log(o1.computeTotalPrice())
console.log(b1.bowlID)
console.log(o1.orderID)
console.log(o1)
o1.removeBowls (b1.bowlID)
console.log(o1)
*/