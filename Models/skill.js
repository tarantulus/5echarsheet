var skill = function (name, ability, character) {
    this.ability = ko.observable(ability);
    this.name = ko.observable(name);
    this.mod = ko.computed(function () {
        var lookup = utils.lookup(character.stats(), this.ability(), "shorthand");
        if (typeof lookup === 'undefined') {
            return 0;
        }
        else
        {
            return lookup.mod();
        }
    }, this);
    this.proficiency = ko.observable(false);
    this.expertise = ko.observable(false);
    this.proficiencyBonus = ko.observable(character.proficiencyBonus());
    this.value = ko.computed(function () {
        if (this.proficiency()) {
            var prof = this.expertise() ? this.proficiencyBonus() * 2 : this.proficiencyBonus();
            return (this.mod() + prof)
        }
        else {
            return this.mod()
        }
    }, this);

}