var primaryStat = function (name, value, character) {
    var self = this;
    self.value = ko.observable(value);
    self.name = ko.observable(name);
    self.mod = ko.computed(function () {
        return Math.floor((self.value() - 10) / 2)
    }),
    self.shorthand = ko.computed(function () {
        return self.name().substring(0, 3);
    }),
    self.proficiency = ko.observable(false),
    self.proficiencyBonus = ko.observable(character.proficiencyBonus()),
    self.save = ko.computed(function () {
        return self.proficiency() ? (self.mod() + self.proficiencyBonus()) : self.mod()
    })

}