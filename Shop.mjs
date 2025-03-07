function Shop (name, maxR, maxM, maxL, bases, proteins, ingredients){
    this.name = name;
    this.availableR = maxR;
    this.availableM = maxM;   
    this.availableL = maxL;
    this.bases = bases;
    this.proteins = proteins;
    this.ingredients = ingredients;

    this.getBases = function(){
        return this.bases;
    }

    this.getProteins = function(){
        return this.proteins;
    }

    this.getIngredients = function(){
        return this.ingredients;
    }

}