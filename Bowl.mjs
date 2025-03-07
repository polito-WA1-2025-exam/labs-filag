function Bowl (size, base, proteins, ingredients, extraIngredinets, price) {
  this.size = size;
  this.base = base;
  this.proteins = proteins;
  this.ingredients = ingredients;
  this.extraIngredinets = extraIngredinets;
  this.price = price;

  this.addProtein = function (protein) {
    this.proteins.push(protein);
  }

  this.addIngredient = function (ingredient) {
    this.ingredients.push(ingredient);
  }

}