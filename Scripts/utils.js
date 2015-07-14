var utils = {
    lookup: function (source, id, prop) {
       
            return source.filter(function (obj) {
                return ko.utils.unwrapObservable(obj[prop]) === id;
            })[0]
        }
}

ko.bindingHandlers.not = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        //expects a single, truthy/falsy binding, 
        //    such as checked, visible, enable, etc.
        var binding = valueAccessor();
        var observable = binding[Object.keys(binding)[0]];
        var notComputed = ko.computed({
            read: function () {
                return !observable();
            },
            write: function (newValue) {
                observable(!newValue);
            }
        });
        var newBinding = {};
        newBinding[Object.keys(binding)[0]] = notComputed;
        ko.applyBindingsToNode(element, newBinding, viewModel);
    }
};

