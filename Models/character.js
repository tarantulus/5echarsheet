function character() {
    var self = this;
    self.playername = ko.observable(),
    self.race = ko.observable(),
    self.alignment = ko.observable(),
    self.background = ko.observable(),
    self.classlevel = ko.observable(),
    self.name = ko.observable(),
    self.xp = ko.observable(),
    self.traits = ko.observable(),
    self.ideals = ko.observable(),
    self.bonds = ko.observable(),
    self.flaws = ko.observable(),
    self.classfeatures = ko.observable(),
    self.proficiencyBonus = ko.observable(2),
    self.proficiencies = ko.observableArray(['light weapons']),
    self.languages = ko.observableArray(['common']),
    self.ac = ko.observable(0),
    self.init = ko.observable(0),
    self.speed = ko.observable(0),
    self.hpMax = ko.observable(0),
    self.hpCurrent = ko.observable(0),
    self.hpTemp = ko.observable(0),
    self.hd = ko.observable(0),
    self.deathSaves = ko.observableArray([0, 1, 2]),
    self.deathSave = ko.observableArray([0]),
    self.weapons = ko.observableArray([]),
    self.selectedWeapon = ko.observable(),
    self.armour = ko.observableArray([]),
    self.equipment = ko.observableArray([]),
    self.money = ko.observableArray([{ key: "cp", value: 0 }, { key: "sp", value: 0 }, { key: "ep", value: 0 }, { key: "gp", value: 0 }, { key: "pp", value: 0 }]),
    self.weaponSet = ko.observableArray([
            new weapon('Club', 'd4', 'str', 'light weapons', self),
            new weapon('Dagger', 'd4', 'str', 'finesse weapons', self),
            new weapon('Greatclub', 'd8', 'str', 'two-handed weapons', self),
            new weapon('Hand-axe', 'd6', 'str', 'light weapons', self),
            new weapon('Javelin', 'd6', 'str', 'thrown weapons', self),
            new weapon('Light Hammer', 'd4', 'str', 'light weapons', self),
            new weapon('Mace', 'd6', 'str', '---', self),
            new weapon('Quarterstaff', 'd6', 'str', 'versatile', self),
            new weapon('Sickle', 'd4', 'str', 'light weapons', self),
            new weapon('Spear', 'd6', 'str', 'light weapons', self),
            new weapon('Unarmed', '1', 'str', '---', self),
            new weapon('Light Crossbow', 'd8', 'dex', 'ranged', self),
            new weapon('Dart', 'd4', 'dex', 'finesse weapons', self),
            new weapon('ShortBow', 'd6', 'dex', 'two-handed weapons', self),
            new weapon('Sling', 'd4', 'dex', 'light weapons', self),
            new weapon('Battleaxe', 'd8', 'str', 'versatile', self),
            new weapon('Flail', 'd8', 'str', '---', self),
            new weapon('Glaive', 'd10', 'str', 'two-handed weapons', self),
            new weapon('Greataxe', 'd12', 'str', 'two-handed weapons', self),
            new weapon('Greatsword', '2d6', 'str', 'two-handed weapons', self),
            new weapon('Halberd', 'd10', 'str', 'two-handed weapons', self),
            new weapon('Lance', 'd12', 'str', '---', self),
            new weapon('Longsword', 'd8', 'str', 'versatile', self),
            new weapon('Maul', '2d6', 'str', '---', self),
            new weapon('Morningstar', 'd8', 'str', '---', self),
            new weapon('Pike', 'd10', 'str', 'two-handed weapons', self),
            new weapon('Rapier', 'd8', 'dex', 'finesse weapons', self),
            new weapon('Scimitar', 'd6', 'str', 'light weapons', self),
            new weapon('Shortsword', 'd6', 'str', 'light weapons', self),
            new weapon('Trident', 'd6', 'str', 'thrown weapons', self),
            new weapon('War Pick', 'd8', 'str', '---', self),
            new weapon('WarHammer', 'd8', 'str', 'versatile', self),
            new weapon('Whip', 'd4', 'str', 'finesse weapons', self),
            new weapon('Blowgun', '1', 'dex', '---', self),
            new weapon('Crossbow(hand)', 'd6', 'str', 'light weapons', self),
            new weapon('Crossbow(heavy)', 'd10', 'str', 'two-handed weapons', self),
            new weapon('Longbow', 'd8', 'str', 'two-handed weapons', self),
            new weapon('Net', '-', 'str', 'thrown weapons', self)
        ]
    ),
    self.mapping = {
        'ignore': ["mod", "shorthand", "save"]
    }
    self.store = function () {
        // store a clean copy to local storage, which also creates a dependency on the observableArray and all observables in each item
        localStorage.setItem('5e-knockoutjs', JSON.stringify(ko.toJS(self)));
    },
    self.load = function (saved) {
        if (saved !== null) {
            self.proficiencyBonus(saved.proficiencyBonus),
        self.proficiencies(saved.proficiencies),
        self.languages(saved.languages),
        self.ac(saved.ac),
        self.init(saved.init),
        self.speed(saved.speed),
        self.hpMax(saved.hpMax),
        self.hpCurrent(saved.hpCurrent),
        self.hpTemp(saved.hpTemp),
        self.hd(saved.hd),
        self.deathSaves(saved.deathSaves),
        self.deathSave(saved.deathSave),
        self.armour(saved.armour),
        self.equipment(saved.equipment),
            self.money([]);
            for (var i = 0; i < saved.money.length; i++) {
                self.money.push({ key: saved.money[i].key, value: saved.money[i].value })
            };
            self.weapons([]);
            for (var i = 0; i < saved.weapons.length; i++) {
                self.weapons.push(new weapon(saved.weapons[i].name, saved.weapons[i].die, saved.weapons[i].stat, saved.weapons[i].category, self))
            };
            self.stats([]);
            for (var i = 0; i < saved.stats.length; i++) {
                self.stats.push(new primaryStat(saved.stats[i].name, saved.stats[i].value, self))
                for (var j = 0; j < self.stats().length; j++) {
                    if (self.stats()[j].name() == saved.stats[i].name) {
                        self.stats()[j].proficiency(saved.stats[i].proficiency)
                    }
                }
            };
            for (var i = 0; i < saved.skills.length; i++) {
                for (var j = 0; j < self.skills().length; j++) {
                    if (self.skills()[j].name() == saved.skills[i].name) {
                        self.skills()[j].proficiency(saved.skills[i].proficiency);
                        self.skills()[j].expertise(saved.skills[i].expertise);
                    }
                };                
            };
        }
    },
    self.stats = ko.observableArray([
        new primaryStat('strength', 10, self),
        new primaryStat('dexterity', 10, self),
        new primaryStat('constitution', 10, self),
        new primaryStat('intelligence', 10, self),
        new primaryStat('wisdom', 10, self),
        new primaryStat('charisma', 10, self),
    ]),
    self.skills = ko.observableArray([
        new skill('climbing', 'dex', self),
        new skill('perception', 'wis', self)
    ]),

    self.passivePerception = ko.computed(function () {
        return utils.lookup(self.skills(), "perception", "name").value() + 10;
    }),
    self.dropProficiency = function (prof) {
        self.proficiencies.remove(prof);
    },

    self.dropLanguage = function (lang) {
        self.languages.remove(lang);
    },
    self.equip = function (item) {
        self.equipment.push(item);
    },
    self.unequip = function (item) {
        self.equipment.remove(item);
    },
    self.currency = function (key) {
        return ko.utils.unwrapObservable(key) + ':';
    },
    self.addWeapon = function () {
        self.weapons.push(utils.lookup(self.weaponSet(), self.selectedWeapon().name(), "name"));
    },
    self.removeWeapon = function () {
        self.weapons.remove(
            function (weapon) {
                return weapon.name() == self.selectedWeapon().name()
            });
    }

    self.editing = ko.observable(false);
};
