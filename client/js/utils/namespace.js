function setUp (parent, modules) {
    modules.forEach(function (module) {
        parent[module] = {};
    });
}