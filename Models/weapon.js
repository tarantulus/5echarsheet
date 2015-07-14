var weapon = function (name, die, stat, category, character) {
    var self = this;
    self.name = ko.observable(name),
    self.die = ko.observable(die),
    self.stat = ko.observable(stat),
    self.category = ko.observable(category),
    self.proficient = ko.computed(function () {
        return character.proficiencies.indexOf(category) !== '-1' || character.proficiencies.indexOf(name) !== '-1';
    }),
    self.proficiencyBonus = ko.observable(character.proficiencyBonus())
}