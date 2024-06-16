//===============================================
function call_server() {
    var lTree = new GTree();
    lTree.readTree("#tree");
    console.log(sprintf("serialisation :\n%s", lTree.serialize()));
}
//===============================================
