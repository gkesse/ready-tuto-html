//===============================================
// GTree.js
//===============================================
class GTree {
    //===============================================
    static m_instance = null;
    //===============================================
    constructor() {

    }
    //===============================================
    static Instance() {
        if(this.m_instance == null) {
            this.m_instance = new GTree();
        }
        return this.m_instance;
    }
    //===============================================
    init() {
        this.initTree();
    }
    //===============================================
    initTree() {
        var lCarets = document.getElementsByClassName("tree3");
        for(var i = 0; i < lCarets.length; i++) {
            lCarets[i].addEventListener("click", function() {
                this.parentElement.querySelector(".tree2").classList.toggle("active");
                this.classList.toggle("down");
            });
        }
    }
    //===============================================
}
//===============================================
GTree.Instance().init();
//===============================================
